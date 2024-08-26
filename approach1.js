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

tail(filePath, numLinesToDisplay);
