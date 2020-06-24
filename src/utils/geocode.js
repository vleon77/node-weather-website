const request = require('request');

const geocode = ((location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoidmxlb243NyIsImEiOiJja2Jsem0weTExZHJqMnNxdjgwYmo2bjBrIn0.KkBhuJLJv457BY47TmUbJg&limit=1`;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the server!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find a location try with other term!', undefined);
        } else {
            callback(undefined, {
                latitud: body.features[0].center[1],
                longitud: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
});

module.exports = geocode;