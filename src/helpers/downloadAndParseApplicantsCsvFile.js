import fs from "fs";
import csv from "csvtojson";
import download from "download";
import { CSV_DOWNLOAD_URL, CSV_HEADER } from "../constants";

export const downloadAndParseApplicantsCsvFile = async () => {
  // Delete existing csv file if it exists, before download it again.
  fs.unlink("./download/applicant_data.csv", (err) => {
    if (err && err.code === "ENOENT") {
      console.log("File doesn't exist.");
    } else {
      console.log("Deleted applicant data csv file.");
    }
  });

  await download(CSV_DOWNLOAD_URL, "download", {
    filename: "applicant_data.csv",
  });

  const file = fs.readFileSync("./download/applicant_data.csv", "utf8");
  const csvToParse = CSV_HEADER + file;

  return csv().fromString(csvToParse);
};
