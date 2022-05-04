import {
  writeCsv,
  searchContractorLicenseStatus,
  downloadAndParseApplicantsCsvFile,
} from "./helpers";

const main = async () => {
  const applicants = await downloadAndParseApplicantsCsvFile();

  for (const applicant of applicants) {
    try {
      const isLicenseActive = await searchContractorLicenseStatus(applicant);

      if (isLicenseActive) {
        writeCsv(applicant);
      }
    } catch (error) {
      console.log(`Error | ID: ${applicant.id} | ${error.message}`);
    }
  }

  console.log("Completed");
};

main();
