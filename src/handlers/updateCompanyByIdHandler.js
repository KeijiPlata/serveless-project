const { updateCompanyByIdService } = require("../services/updateCompanyByIdService")

const updataCompanyByIdService = require("../services/updateCompanyByIdService").updateCompanyByIdService

module.exports.updateCompanyByIdHandler = async (event) => {
    const { company_id } = event.pathParameters
    const { company_name, company_email } = JSON.parse(event.body)

    const{ result, statusCode } = await updateCompanyByIdService(company_id, company_name, company_email)
    return {
        body: result ? JSON.stringify({ body: result }): null,
        statusCode: statusCode
    }
} 