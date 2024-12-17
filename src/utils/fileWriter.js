const fs = require('fs');
const path = require('path');

async function writeToFile(filePath, data) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filePath);

    // Ensure the directory exists
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) {
        return reject(`Failed to create directory: ${err.message}`);
      }

      // Write the data to the file
      const formattedData = JSON.stringify(data, null, 2);
      fs.writeFile(filePath, formattedData, (err) => {
        if (err) {
          return reject(`Failed to write to file: ${err.message}`);
        }
        resolve();
      });
    });
  });
}

module.exports = writeToFile;
