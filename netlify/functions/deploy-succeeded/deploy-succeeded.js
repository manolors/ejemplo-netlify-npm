// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

function sendMessage(url, message) {
  console.log("Y por aca dentro también!")
  var request = new XMLHttpRequest();
  request.open("POST", url);
  request.setRequestHeader('Content-type', 'application/json');
  request.send(JSON.stringify(message));
}

const handler = async (event) => {
  try {
    const subject = event.queryStringParameters.name || 'World'
    console.log("Hola mama, estamos aqui!")
    sendMessage(process.env.WEBHOOK_URL, { events: event, processenv: process.env })
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

