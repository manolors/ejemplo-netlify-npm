// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const fetch = require('node-fetch')

function sendDiscordWebhook(url, message) {
  message = {
    // the username to be displayed
    username: 'webhook',
    // the avatar to be displayed
    avatar_url:
      'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png',
    // contents of the message to be sent
    content:
      'user mention: <@279098137484722176>, role mention: <@&496160161459863552>, channel mention: <#508500699458306049>',
    // enable mentioning of individual users or roles, but not @everyone/@here
    allowed_mentions: {
      parse: ['users', 'roles'],
    },
    // embeds to be sent
    embeds: [
      {
        // decimal number colour of the side of the embed
        color: 11730954,
        // author
        // - icon next to text at top (text is a link)
        author: {
          name: 'dragonwocky',
          url: 'https://dragonwocky.me/',
          icon_url: 'https://dragonwocky.me/assets/avatar.jpg',
        },
        // embed title
        // - link on 2nd row
        title: 'title',
        url:
          'https://gist.github.com/dragonwocky/ea61c8d21db17913a43da92efe0de634',
        // thumbnail
        // - small image in top right corner.
        thumbnail: {
          url:
            'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png',
        },
        // embed description
        // - text on 3rd row
        description: 'description',
        // custom embed fields: bold title/name, normal content/value below title
        // - located below description, above image.
        fields: [
          {
            name: 'field 1',
            value: 'value',
          },
          {
            name: 'field 2',
            value: 'other value',
          },
        ],
        // image
        // - picture below description(and fields)
        image: {
          url:
            'http://tolkiengateway.net/w/images/thumb/7/75/J.R.R._Tolkien_-_Ring_verse.jpg/300px-J.R.R._Tolkien_-_Ring_verse.jpg',
        },
        // footer
        // - icon next to text at bottom
        footer: {
          text: 'footer',
          icon_url:
            'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png',
        },
      },
    ],
  }
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

const handler = async (event) => {
  console.log("deploy building!")
  try {
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

