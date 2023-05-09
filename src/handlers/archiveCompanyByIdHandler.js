const archiveCompanyByIdService = require("../services/archiveCompanyByIdService").archiveCompanyByIdService

module.exports.archiveCompanyByIdHandler = async (event) =>{
    const { company_id } = event.pathParameters
    const { result, statusCode } = await archiveCompanyByIdService(company_id)

    return{
        body: result,
        statusCode: statusCode
    }
}