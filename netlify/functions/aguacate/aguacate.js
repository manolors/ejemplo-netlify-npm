// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import fetch from 'node-fetch';

function sendMessage(url, message) {
  console.log("Y por aca dentro también!")
  fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify(message)
  })
}

const handler = async (event) => {
  try {
    const subject = event.queryStringParameters.name || 'World'
    console.log("Hola mama, estamos aqui!")
    sendMessage(process.env.WEBHOOK_URL, { content: JSON.stringify(event) })
    sendMessage(process.env.WEBHOOK_URL, { content: JSON.stringify(process.env) })
    console.log("Y aqui también!")
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}`, hookUrl: process.env.WEBHOOK_URL }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }

