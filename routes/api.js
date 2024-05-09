const express = require('express')
const database = require('../models')  // requires index.js file from models directory
const Student = database.Student  // the Student model

const router = express.Router()

router.get('/students', function(req, res, next) {
    Student.findAll().then( (students) => {  // query/get the list of Student objects from DB - returns a promise
        return res.json(students)  // return list of Student objects as JSON
    })
})

router.post('/students', (req, res, next) => {
    const newStudent = req.body  // student data will be in the body of the request
    // use student data from req to create and store new Student in the DB - returns a promise
    Student.create(newStudent).then( result => {
        return res.status(201).send('New student created!')  // 201 = successfully created
    })
})

module.exports = router