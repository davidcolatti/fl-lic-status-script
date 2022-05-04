import fs from "fs";
import csvWriteStream from "csv-write-stream";

export const writeCsv = (obj) => {
  const headers = Object.keys(obj);

  let writer = csvWriteStream();

  if (!fs.existsSync("output.csv")) {
    writer = csvWriteStream({ headers });
  } else {
    writer = csvWriteStream({ sendHeaders: false });
  }

  writer.pipe(fs.createWriteStream("output.csv", { flags: "a" }));

  writer.write(obj);

  writer.end();
};
