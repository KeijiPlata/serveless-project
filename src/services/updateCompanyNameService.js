const databaseQuery = require("../middlewares/databaseQuery").databaseQuery
module.exports.updateCompanyNameService = async(company_id, company_name) => {
    try {
        const result = await databaseQuery(`UPDATE companies SET company_name = '${company_name}', modified_at = CURRENT_TIMESTAMP WHERE id = ${company_id}`)
        return{
            result: null,
            statusCode: 200
        }
    } catch (error) {
        console.log(error)

        return{
          body: JSON.stringify({ message: error }),
          statusCode: 500
        }
    }
}