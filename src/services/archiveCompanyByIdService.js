const databaseQuery = require("../middlewares/databaseQuery").databaseQuery;

module.exports.archiveCompanyByIdService = async (company_id) => {
  try {
    const result = await databaseQuery(
      `UPDATE companies SET archived = true, modified_at = CURRENT_TIMESTAMP WHERE id = ${company_id}`
    );

    return {
      resutl: JSON.stringify({ result: result }),
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
