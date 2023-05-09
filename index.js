// import packages
const ServerlessPostgresClient = require("serverless-postgres")
const { client } = require("./database");

const client = new ServerlessPostgresClient({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "keijipogi04",
  port: 5432,
  debug: true, 
  delayMs: 3000
})

module.exports.insertCompanyHandler = async (event) => {

  const { company_name, company_email } = JSON.parse(event.body)

  try {
    await client.connect()
    const result = await client.query(`INSERT INTO companies (company_name, company_email) VALUES('${company_name}', '${company_email}')`)
    await client.clean()
  
    return {
      body: JSON.stringify({ items : result }),
      statusCode: 200
    }
  }
  catch (error){
    console.log(error)

    return{
      body: JSON.stringify({ message: error }),
      statusCode: 500
    }

  }



}

module.exports.getAllCompaniesHandler = async (event) => {
  try {
    await client.connect()
    const result = await client.query(`SELECT * FROM companies WHERE archived = false`)
    await client.clean()

    const sorted_companies = result.map(item =>{
      return {
        id: item.id,
        company_name: item.company_name,
        company_email: item.company_email
      }
    })

    return {
      body: JSON.stringify({ items : sorted_companies }),
      statusCode: 200
    }
  }
  catch(error) {
    console.log(error)

    return{
      body: JSON.stringify({ message: error }),
      statusCode: 500
    }
  }
  
}

module.exports.getCompanyByIdHandler = async (event) => {

  const { company_id } = event.pathParameters

  try {
    await client.connect()
    const result = await client.query(`SELECT * FROM companies WHERE id = ${company_id} AND archived = false`)
    await client.clean()

    return {
          body: JSON.stringify({ items : result }),
          statusCode: 200
        }
  }
  catch(error){
    console.log(error)

    return{
      body: JSON.stringify({ message: error }),
      statusCode: 500
    }
  }

}

module.exports.updateCompanyIdHandler = async (event) => {
  const { company_id } = event.pathParameters
  const { company_name, company_email } = JSON.parse(event.body)

  try{
    await client.connect()
    const result = await client.query(`UPDATE companies SET company_name = '${company_name}', company_email = '${company_email}', modified_at = CURRENT_TIMESTAMP WHERE id = ${company_id}`)
    await client.clean()

    return {
      statusCode: 204
    }
  }catch (error){
    console.log(error)

    return{
      body: JSON.stringify({ message: error }),
      statusCode: 500
    }
  }
}

module.exports.updateCompanyNameHandler = async (event) => {
  const { company_id } = event.pathParameters
  const { company_name } = JSON.parse(event.body)

  try{
    await client.connect()
    const result = await client.query(`UPDATE companies SET company_name = '${company_name}', modified_at = CURRENT_TIMESTAMP WHERE id = ${company_id}`)
    await client.clean()

    return {
      statusCode: 204
    }
  }
  catch(error){
    console.log(error)

    return{
      body: JSON.stringify({ message: error }),
      statusCode: 500
    }

  }
}

module.exports.archiveCompanyByIdHandler = async (event) =>{
  const { company_id } = event.pathParameters

  try{
    await client.connect()
    const result = await client.query(`UPDATE companies SET archived = true, modified_at = CURRENT_TIMESTAMP WHERE id = ${company_id}`)
    await client.clean()

    return {
      statusCode: 204
    }

  }
  catch(error){
    console.log(error)

    return{
      body: JSON.stringify({ message: error }),
      statusCode: 500
    }

  }
}

module.exports.deleteCompanyByIdHandler = async (event) => {
  const { company_id } = event.pathParameters

  try{
    await client.connect()
    const result = await client.query(`DELETE FROM companies WHERE id = ${company_id}`)
    await client.clean()

    return {
      statusCode: 204
    }

  }
  catch(error){
    console.log(error)

    return{
      body: JSON.stringify({ message: error }),
      statusCode: 500
    }

  }
}