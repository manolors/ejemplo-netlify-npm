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

const handler = async (event) => {
  try {
    console.log("deploy failed!")
    const site = JSON.parse(event.body).site.name

    await sendDiscordWebhook(process.env.WEBHOOK_URL, {
      "username": "Deploy Bot Failure",
      "avatar_url": "https://cdn-icons-png.flaticon.com/512/148/148766.png",
      "content": `The site "*${site}*" deploy has failed!`,
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

