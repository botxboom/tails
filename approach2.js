const fs = require("fs");
const readline = require("readline");

function tail(filePath, numLines = 10, follow = false) {
  const stream = fs.createReadStream(filePath, { encoding: "utf8" });
  const rl = readline.createInterface({ input: stream });

  let lines = [];

  rl.on("line", (line) => {
    lines.push(line);
    if (lines.length > numLines) {
      lines.shift(); // Keep only the last numLines in memory
    }
  });

  rl.on("close", () => {
    console.log(lines.join("\n"));
    if (follow) {
      // Monitor the file for new lines
      fs.watch(filePath, (eventType) => {
        if (eventType === "change") {
          fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
              console.error(`Error reading file: ${err.message}`);
              return;
            }
            const updatedLines = data.trim().split("\n").slice(-numLines);
            console.log(updatedLines.join("\n"));
          });
        }
      });
    }
  });

  stream.on("error", (err) => {
    console.error(`Error reading file: ${err.message}`);
  });
}

const args = process.argv.slice(2);
const filePath = args[0];
const numLinesToDisplay = args[1] ? parseInt(args[1], 10) : 10;
const follow = args.includes("-f");

if (!filePath) {
  console.error("Usage: node tailSnippet.js <file-path> [num-lines] [-f]");
  process.exit(1);
}

tail(filePath, numLinesToDisplay, follow);
