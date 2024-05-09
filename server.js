const express = require('express')  // import express library
const apiRoutes = require('./routes/api.js')

const app = express()  // create web application server

app.use(express.json())  // make app able to handle JSON

app.use('/api', apiRoutes)  // have app use apiRoutes to work with the DB

// error handling functions
app.use(function (req, res, next) {
    res.status(404).send('Not Found')
})

app.use(function(req, res, next, err) {
    console.error(err.stack) // for server developers
    res.status(500).send('Internal Server Error')  // for client
})

// start server
const server = app.listen(process.env.PORT || 3000, function() {  // use specific port OR 3000
    console.log('Server is running on port ' + server.address().port)
})