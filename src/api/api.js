const API_KEY = 'AK6FBKUB6NT2Q3FX8L6ABMYRS';
const API_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const API_QUERY = `unitGroup=metric&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp
                  %2Cicon&include=days&key=${API_KEY}&contentType=json`;

export function getCurrentWeather(city) {
  return fetch(`${API_URL}/${city}/today?${API_QUERY}`)
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
}

export function getFutureWeather(city, startDate, endDate) {
  return fetch(`${API_URL}/${city}/${startDate}/${endDate}?${API_QUERY}`)
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
}
