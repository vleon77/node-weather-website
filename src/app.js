const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paht for Express config
const publicPathDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicPathDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Wheather',
        name: 'Victor León'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Victor León'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help page!',
        name: 'Victor León'
    });
});

app.get('/help/*', (req, res) => {
    res.render('page404', {
        title: '404 Page',
        message: 'Article not found!',
        name: 'Victor León'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You must provide a location'
        });
    }
    geocode(req.query.location, (error, { latitud, longitud, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }
        forecast(latitud, longitud, (error, { data }) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            res.send({
                location: location,
                temperature: data
            });
        });
    });

});

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search'
        });
    }
    res.send({
        products: []
    })
});

app.get('*', (req, res) => {
    res.render('page404', {
        title: '404 Page',
        message: 'Page not found!',
        name: 'Victor León'
    });
});

app.listen({ port: 3000 }, () => {
    console.log('Server Listen port:3000');
});