const fs = require("fs");

function readLastLines(filePath, numLines = 10, encoding = "utf8") {
  fs.open(filePath, "r", (err, fd) => {
    if (err) {
      console.error(`Could not open file: ${err}`);
      return;
    }

    const bufferSize = 1024;
    const buffer = Buffer.alloc(bufferSize);
    let fileSize = fs.statSync(filePath).size;
    let position = fileSize;
    let lines = "";
    let lineCount = 0;

    function readChunk() {
      const bytesToRead = Math.min(bufferSize, position);
      position -= bytesToRead;

      fs.read(fd, buffer, 0, bytesToRead, position, (err, bytesRead) => {
        if (err) {
          console.error(`Error reading file: ${err}`);
          fs.close(fd, () => {});
          return;
        }

        const chunk = buffer.toString(encoding, 0, bytesRead);
        lines = chunk + lines;

        // Count the number of newline characters in the accumulated lines
        const newLineMatches = lines.match(/\n/g);
        if (newLineMatches) {
          lineCount += newLineMatches.length;

          if (lineCount >= numLines) {
            const lastLines = lines.split("\n").slice(-numLines - 1);
            fs.close(fd, () => {});
            console.log(`Last ${numLines} lines:\n${lastLines.join("\n")}`);
            return;
          }
        }

        if (position > 0) {
          readChunk();
        } else {
          // In case the file has fewer than numLines lines
          const lastLines = lines
            .trim()
            .split("\n")
            .slice(-numLines - 1);
          fs.close(fd, () => {});
          console.log(`Last ${numLines} lines:\n${lastLines.join("\n")}`);
        }
      });
    }

    readChunk();
  });
}

readLastLines("large_file.csv", 50);
