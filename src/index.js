
 function getSumaPOST() {
  const a = document.querySelector("#a").value;
  const b = document.querySelector("#b").value;
  data = { a: a, b: b }
  fetch(".netlify/functions/suma", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).catch(function (error) {
    console.log('Hubo un problema con la petición Fetch:' + error.message);
  })
    .then(res => res.json().then(data => alert(data.suma)))
}

function getSumaGET() {
  const a = document.querySelector("#a").value;
  const b = document.querySelector("#b").value;

  fetch(`.netlify/functions/suma?a=${a}&b=${b}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).catch(function (error) {
    console.log('Hubo un problema con la petición Fetch:' + error.message);
  })
    .then(res => res.json().then(data => alert(data.suma)))
}