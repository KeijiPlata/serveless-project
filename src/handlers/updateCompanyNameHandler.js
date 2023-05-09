const { updateCompanyNameService } = require("../services/updateCompanyNameService")

const updateCompanyByIdService = require("../services/updateCompanyNameService").updateCompanyNameService

module.exports.updateCompanyNameHandler = async(event) =>{
    const { company_id } = event.pathParameters
    const { company_name } = JSON.parse(event.body)

    const {result, statusCode} = await updateCompanyNameService(company_id, company_name)
    return {
        body: result ? JSON.stringify({ body: result }) : null,
        statusCode: statusCode
    }
    
}