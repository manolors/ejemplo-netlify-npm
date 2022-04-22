const { IsEmpty } = require("faunadb")

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    let a,b
    if (event.body) {
      let body = JSON.parse(event.body || "")
      a = parseInt(body.a)
      b = parseInt(body.b)
    } else {
      console.log(event.queryStringParameters)
      a = parseInt(event.queryStringParameters.a)
      b = parseInt(event.queryStringParameters.b)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ suma: a + b }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
