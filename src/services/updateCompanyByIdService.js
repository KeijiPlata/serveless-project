const databaseQuery = require("../middlewares/databaseQuery").databaseQuery;

module.exports.updateCompanyByIdService = async (
  company_id,
  company_name,
  company_email
) => {
  try {
    const result = await databaseQuery(
      `UPDATE companies SET company_name = '${company_name}', company_email = '${company_email}', modified_at = CURRENT_TIMESTAMP WHERE id = ${company_id}`
    );

    return {
      result: null,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      result: JSON.stringify({ message: error }),
      statusCode: 500,
    };
  }
};
