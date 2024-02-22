const BASE_URL = 'https://github.com/ekarpets/weather-forecast-app';
// weather-forecast-app/src/assets/cities.json
// /Users/emmakorovnik/Desktop/udemy/weather-forecast-app/public/cities.json

function wait(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function request (url, method = 'GET', data) {
  const options = { method };
  console.log(data)
  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(600)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }
      console.log(response)
      return response.json();
    });
}

const client = { get: (url) => request(url) };

export const getCities = async () => {
  return client.get('/cities.json');
}
