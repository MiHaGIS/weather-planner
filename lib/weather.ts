import { config } from "https://deno.land/x/dotenv/mod.ts";

const getWeatherData = (city) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?' + 
        `id=${city}&` + 
        `appid=${config().WEATHER_KEY}&` + 
        'units=metric';
    const json = fetch(url);
    return json.then((response) => {
        return response.json();
    }).then((data) => {
        return extractData(data)
    });
}

const extractData = (json) => {
    console.log(json)
    return {
        ...json.main, 
        ...json.wind,
        ...json.clouds,
        ...json.rain
    }
}

export default {
    getWeatherData
}