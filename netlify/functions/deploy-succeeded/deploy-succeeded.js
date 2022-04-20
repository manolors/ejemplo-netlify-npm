// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const fetch = require('node-fetch')

function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
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
  }).catch(function(error) {
    console.log('Hubo un problema con la petición Fetch:' + error.message);
  })
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

