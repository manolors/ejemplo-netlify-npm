// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const fetch = require('node-fetch')

function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}

async function sendDiscordWebhook(url, message) {
  console.log("sending message to " + url)
  try {
    await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(message)
    }).then(handleErrors)
    .then(() => {
      console.log("mensaje enviado")
    }).catch(error => console.log(error))
  } catch(error) {
    console.log("Error sending webhook" + error)
  }
}

const handler = async (event, payload, context) => {
  try {
    console.log("deploy succeeded!")
    console.log(JSON.stringify(event))
    console.log(JSON.stringify(payload))
    console.log(JSON.stringify(context))

    await sendDiscordWebhook(process.env.WEBHOOK_URL, {
      "username": "Deploy Bot OK",
      "avatar_url": "https://www.nicepng.com/png/full/362-3624869_icon-success-circle-green-tick-png.png",
      "content": "The deploy was successful!",
    })

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

