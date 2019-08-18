const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{   // don't need the ".hbs" file extension
        title: 'Weather',
        name: 'Jesse Ginsberg'
    })  
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jesse Ginsberg'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Jesse Ginsberg',
        helpText: "I'm here to help!"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
          })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query)
    console.log(req.query.search)
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help Page Not Found',
        name: 'Jesse Ginsberg',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'General 404',
        name: 'Jesse Ginsberg',
        title: '404'
    })
})

// 3000 common development port
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})  
