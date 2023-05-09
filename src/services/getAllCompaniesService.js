// import the middleware and models
const databaseQuery = require("../middlewares/databaseQuery").databaseQuery
const Company = require("../models/Company");

module.exports.getAllCompaniesService = async () => {
    try{
        const result = await databaseQuery(`SELECT * FROM companies WHERE archived = false`)
        const sorted_companies = result.rows.map(item =>{
            const company = new Company(item.id, item.company_name, item.company_email, item.created_at, item.modified_at, item.archived)

            return {
              id: company.id,
              company_name: company.company_name,
              company_email: company.company_email
            }
          })
          return{
            result: JSON.stringify({ item: sorted_companies }),
            statusCode: 200,
          }

    }catch(error){
        console.log(error);

        return {
          result: JSON.stringify({ message: error }),
          statusCode: 500,
        };
    }
}