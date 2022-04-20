// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const fetch = require('node-fetch')

function sendDiscordWebhook(url, message) {
  console.log("sending message to " + url)
  fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify(message)
  }).then(() => {
    console.log("mensaje enviado")
  }).catch(function(error) {
    console.log('Hubo un problema con la petición Fetch:' + error.message);
  })
}

const handler = async (event, payload) => {
  console.log("deploy building!")
  try {
    sendDiscordWebhook(process.env.WEBHOOK_URL, { content: JSON.stringify(event) })
    sendDiscordWebhook(process.env.WEBHOOK_URL, { content: JSON.stringify(process.env) })
    sendDiscordWebhook(process.env.WEBHOOK_URL, { content: JSON.stringify(payload) })

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

