// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const fetch = require('node-fetch')

function sendDiscordWebhook(url, message) {
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
    sendDiscordWebhook(process.env.WEBHOOK_URL, { content: JSON.stringify(event) })
    sendDiscordWebhook(process.env.WEBHOOK_URL, { content: JSON.stringify(process.env) })
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Message sent` }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }

