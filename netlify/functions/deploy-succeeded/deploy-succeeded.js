// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const fetch = require('node-fetch')

function handleErrors(response) {
  console.log("Obtuvimos respuesta!")
  console.log(JSON.stringify(response))
  if (!response.ok) {
      console.log("Obtuvimos respuesta fallida!")
      throw Error(response.statusText);
  }
  console.log("Obtuvimos respuesta OK!")
  return response;
}

function sendDiscordWebhook(url, message) {
  console.log("sending message to " + url)
  fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify(message)
  }).then(handleErrors)
  .then(() => {
    console.log("mensaje enviado")
  }).catch(error => console.log(error))
}

const handler = async (event) => {
  try {
    console.log("deploy succeeded!")
    sendDiscordWebhook(process.env.WEBHOOK_URL, { content: JSON.stringify(event) })
    sendDiscordWebhook(process.env.WEBHOOK_URL, { content: JSON.stringify(process.env) })
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Message sent` }),
    }
  } catch (error) {
    console.log(error)
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }

