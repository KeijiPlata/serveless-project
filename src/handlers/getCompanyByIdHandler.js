const getCompanyByIdService = require("../services/getCompanyByIdService").getCompanyByIdService

module.exports.getCompanyByIdHandler = async (event) => {
    const { company_id } = event.pathParameters
    const { result, statusCode } = await getCompanyByIdService(company_id)

    return{
        body: result,
        statusCode: statusCode
    }
}