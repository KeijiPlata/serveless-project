const insertCompanyService =
  require("../services/insertCompanyService").insertCompanyService;

module.exports.insertCompanyHandler = async (event) => {
  const { company_name, company_email } = JSON.parse(event.body);
  const { result, statusCode } = await insertCompanyService(
    company_name,
    company_email
  );

  return {
    body: result,
    statusCode: statusCode,
  };
};
