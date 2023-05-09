const deleteCompanyByIdService = require("../services/deleteCompanyByIdService").deleteCompanyByIdService

module.exports.deleteCompanyByIdHandler = async (event) => {
    const { company_id } = event.pathParameters
    const { result, statusCode } = await deleteCompanyByIdService(company_id)

    return {
        body: result,
        statusCode: statusCode
    }
}