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
  console.log("deploy building!")
  const site = JSON.parse(event.body).site.name

  try {
    await sendDiscordWebhook(process.env.WEBHOOK_URL, {
      "username": "Deploy Bot Building!",
      "avatar_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Ambox_warning_yellow.svg/1280px-Ambox_warning_yellow.svg.png",
      "content": `The site "*${site}*" deploy has started!`,
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

