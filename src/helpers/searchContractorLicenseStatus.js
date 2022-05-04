import fetch from "node-fetch";

export const searchContractorLicenseStatus = async ({
  city,
  lastName,
  firstName,
  middleName,
}) => {
  try {
    const result = await fetch(
      "https://www.myfloridalicense.com/wl11.asp?mode=2&search=Name&SID=&brd=&typ=",
      {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        body: `hSID=&hSearchType=Name&hLastName=&hFirstName=&hMiddleName=&hOrgName=&hSearchOpt=&hSearchOpt2=&hSearchAltName=&hSearchPartName=&hSearchFuzzy=&hDivision=ALL&hBoard=&hLicenseType=&hSpecQual=&hAddrType=&hCity=&hCounty=&hState=&hLicNbr=&hAction=&hCurrPage=&hTotalPages=&hTotalRecords=&hPageAction=&hDDChange=&hBoardType=&hLicTyp=&hSearchHistoric=&hRecsPerPage=&LastName=${lastName}&FirstName=${firstName}&MiddleName=${middleName}&OrgName=&Board=%A0&City=${city}&County=&State=&RecsPerPage=10&Search1=Search`,
      }
    );

    const data = await result.text();
    const isLicenseActive = data.includes("Current, Active");

    return isLicenseActive;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
