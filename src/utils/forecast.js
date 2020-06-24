const request = require("request");

const forecast = ((latitud, longitud, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=39aca0df8fb1e6ce1b21e553bc6ae70b&query=${latitud},${longitud}`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the server!', undefined);
        } else if (body.error) {
            callback('Error,Unable to find location', undefined);
        } else {
            callback(undefined, {
                data: `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. It feel like ${body.current.feelslike} degress out.`
            });
        }
    });
});

module.exports = forecast;