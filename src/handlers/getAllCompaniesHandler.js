const getAllCompaniesService =
  require("../services/getAllCompaniesService").getAllCompaniesService;

module.exports.getAllCompaniesHandler = async (event) => {
  const { result, statusCode } = await getAllCompaniesService();
  return {
    body: result,
    statusCode: statusCode,
  };
};
