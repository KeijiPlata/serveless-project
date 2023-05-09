// import model and middleware

const Company = require("../models/Company");
const databaseQuery = require("../middlewares/databaseQuery").databaseQuery

module.exports.getCompanyByIdService = async (company_id) =>{
   try{
    const [ result ] = (await databaseQuery(`SELECT * FROM companies WHERE id = ${company_id} AND archived = false`)).rows
    const company = new Company(result.id, result.company_name, result.company_email, result.create_at, result.modified_at, result.archived)
    // const result = await databaseQuery(`SELECT * FROM companies WHERE id = ${company_id} AND archived = false`)
    // const sorted_companies = result.rows.map(item =>{
    //     const company = new Company(item.id, item.company_name, item.company_email, item.created_at, item.modified_at, item.archived)

    //     return {
    //         id: company.id,
    //         company_name: company.company_name,
    //         company_email: company.company_email
    //     }
    // })
    
    return{
        // result: JSON.stringify({ result: sorted_companies }),
        result: JSON.stringify({ result: company.getCompanyIdNameEmail }),
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