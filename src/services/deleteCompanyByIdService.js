const databaseQuery = require("../middlewares/databaseQuery").databaseQuery;

module.exports.deleteCompanyByIdService = async (company_id) => {
  try {
    const result = await databaseQuery(
      `DELETE FROM companies WHERE id = ${company_id}`
    );

    return {
      result: JSON.stringify({ result: result }),
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      body: JSON.stringify({ message: error }),
      statusCode: 500,
    };
  }
};
