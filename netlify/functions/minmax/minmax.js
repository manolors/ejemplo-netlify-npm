const handler = async (event) => {
  try {
    let min, max
    min = null
    max = null
    console.log(event.queryStringParameters)
    //let numerosString = event.queryStringParameters.num.split(", ")
    let numeros = JSON.parse(event.body).numeros;
    // numerosString.forEach(element => {
    //   numeros.push(parseInt(element))
    // });

    //numeros = numerosString.map(a => Number(a))
    min = Math.min(...numeros)
    max = Math.max(...numeros)

    // numeros.forEach(element => {
    //   if (min === null && max === null) {
    //     max = element
    //     min = element
    //   } else {
    //     // buscar mínimo
    //     if (element < min)  {
    //       min = element
    //     }

    //     // buscar máximo
    //     if (element > max) {
    //       max = element
    //     }
    //   }



    // })

    return {
      statusCode: 200,
      body: JSON.stringify({ max, min }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
