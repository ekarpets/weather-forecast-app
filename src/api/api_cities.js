const BASE_URL = 'api';

function wait(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function request (url, method = 'GET') {
  const options = { method };

  return wait(600)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

const client = { get: (url) => request(url) };

export const getCities = async () => {
  return client.get('/cities.json');
}
