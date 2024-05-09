const express = require('express')
const database = require('../models')  // requires index.js file from models directory
const Student = database.Student  // the Student model

const router = express.Router()

router.get('/students', function(req, res, next) {
    // query/get the list of Student objects from DB - returns a promise
    // order by name
    Student.findAll( {order: ['name']} ).then( (students) => {
        return res.json(students)  // return list of Student objects as JSON
    }).catch( err => {  // handle DB errors
        return next(err)
    })
})

router.post('/students', (req, res, next) => {
    const newStudent = req.body  // student data will be in the body of the request
    console.log(newStudent)
    // use student data from req to create and store new Student in the DB - returns a promise
    Student.create(newStudent).then( result => {
        return res.status(201).send('New student created!')  // 201 = successfully created
    }).catch( err => {
        // validate and return status 400 if there are errors
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map( e => e.message )
            return res.status(400).json(messages)
        } else {
            return next(err)  // if other kind of error, pass to error handler in server.js
        }
    })
})

module.exports = router