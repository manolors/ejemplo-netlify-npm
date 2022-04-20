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

function sendBasic(url) {
  fetch(
    url,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        username: 'webhook',

        avatar_url:
          'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png',

        content:
          'user mention: <@279098137484722176>, role mention: <@&496160161459863552>, channel mention: <#508500699458306049>',

        allowed_mentions: {
          parse: ['users', 'roles'],
        },

        embeds: [
          {

            color: 11730954,


            author: {
              name: 'dragonwocky',
              url: 'https://dragonwocky.me/',
              icon_url: 'https://dragonwocky.me/assets/avatar.jpg',
            },


            title: 'title',
            url:
              'https://gist.github.com/dragonwocky/ea61c8d21db17913a43da92efe0de634',


            thumbnail: {
              url:
                'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png',
            },


            description: 'description',


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


            image: {
              url:
                'http://tolkiengateway.net/w/images/thumb/7/75/J.R.R._Tolkien_-_Ring_verse.jpg/300px-J.R.R._Tolkien_-_Ring_verse.jpg',
            },


            footer: {
              text: 'footer',
              icon_url:
                'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png',
            },
          },
        ],
      }),
    }
  );
}
const handler = async (event) => {
  try {
    const subject = event.queryStringParameters.name || 'World'
    console.log("Hola mama, estamos aqui!")
    sendBasic(url)
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

