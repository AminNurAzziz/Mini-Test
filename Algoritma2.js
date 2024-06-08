const apiKey = '7394bbd5565e170c5f3caf0e609ca953';
const cityName = 'Jakarta';
const countryCode = 'ID';
const limit = 1;

const getGeoUrl = (cityName, countryCode, limit, apiKey) => {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=${limit}&appid=${apiKey}`;
};

const getForecastUrl = (lat, lon, apiKey) => {
    return `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&units=metric&appid=${apiKey}`;
};

const getWeatherForecast = async () => {
    try {
        const geoResponse = await fetch(getGeoUrl(cityName, countryCode, limit, apiKey));
        const geoData = await geoResponse.json();

        if (geoData.length > 0) {
            const { lat, lon } = geoData[0];
            const forecastResponse = await fetch(getForecastUrl(lat, lon, apiKey));
            const forecastData = await forecastResponse.json();

            console.log("Weather Forecast:");

            const forecasts = forecastData.list.filter(forecast => {
                const forecastDate = new Date(forecast.dt * 1000);
                const currentDate = new Date();
                return forecastDate.getDate() !== currentDate.getDate();
            });

            const dailyForecasts = {};
            forecasts.forEach(forecast => {
                const date = new Date(forecast.dt * 1000);
                const dateString = date.toDateString();
                const temperature = forecast.main.temp;
                if (!dailyForecasts[dateString]) {
                    dailyForecasts[dateString] = temperature;
                }
            });

            for (const date in dailyForecasts) {
                const temperature = dailyForecasts[date];
                console.log(`${date}: ${temperature}°C`);
            }
        } else {
            throw new Error(`Koordinat untuk kota ${cityName} tidak ditemukan.`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

getWeatherForecast();
