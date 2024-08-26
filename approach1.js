const fs = require("fs");

// Function to mimic the tail command
function tail(filePath, numLines = 10) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
      return;
    }

    const lines = data.trim().split("\n");
    const tailLines = lines.slice(-numLines);
    console.log(tailLines.join("\n"));
  });
}

// Example usage
const filePath = "./large_file.csv"; // Replace with your file path
const numLinesToDisplay = 50; // Number of lines to display, similar to `tail -n`

const start = performance.now();

tail(filePath, numLinesToDisplay);

const end = performance.now();
const duration = end - start;

console.log(`time take: ${(duration / 1000).toFixed(3)} milliseconds`);
