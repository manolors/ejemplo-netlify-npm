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
    console.log("deploy succeeded!")
    await sendDiscordWebhook(process.env.WEBHOOK_URL, {
      "username": "Webhook",
      "avatar_url": "https://i.imgur.com/4M34hi2.png",
      "content": "Text message. Up to 2000 characters.",
      "embeds": [
        {
          "author": {
            "name": "Birdie♫",
            "url": "https://www.reddit.com/r/cats/",
            "icon_url": "https://i.imgur.com/R66g1Pe.jpg"
          },
          "title": "Title",
          "url": "https://google.com/",
          "description": "Text message. You can use Markdown here. *Italic* **bold** __underline__ ~~strikeout~~ [hyperlink](https://google.com) `code`",
          "color": 15258703,
          "fields": [
            {
              "name": "Text",
              "value": "More text",
              "inline": true
            },
            {
              "name": "Even more text",
              "value": "Yup",
              "inline": true
            },
            {
              "name": "Use `\"inline\": true` parameter, if you want to display fields in the same line.",
              "value": "okay..."
            },
            {
              "name": "Thanks!",
              "value": "You're welcome :wink:"
            }
          ],
          "thumbnail": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/3/38/4-Nature-Wallpapers-2014-1_ukaavUI.jpg"
          },
          "image": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/5/5a/A_picture_from_China_every_day_108.jpg"
          },
          "footer": {
            "text": "Woah! So cool! :smirk:",
            "icon_url": "https://i.imgur.com/fKL31aD.jpg"
          }
        }
      ]
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

