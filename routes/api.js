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

router.patch('/students/:id', function(req, res, next) {
    // identify the student by their ID and then update the student in DB with that ID
    const studentID = req.params.id
    const updatedStudent = req.body
    console.log(studentID, updatedStudent)
    Student.update( updatedStudent, { where: { id: studentID } })
        .then( (result) => {
            const rowsModified = result[0]
            if (rowsModified === 1) {  // if 1 row is updated, the patch request was a success
                return res.send('Student updated!')
            } else {
                return res.status(404).send('Student not found!')
            }
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

router.delete('/students/:id', function(req, res, next) {
    const studentID = req.params.id
    // destroy means delete rows, so delete rows where the student ID is the student to delete
    Student.destroy({where: { id: studentID }})
        .then( (rowsDeleted) => {
            if (rowsDeleted === 1) {
                return res.send('Student deleted!')
            } else {
                return res.status(404).send('Student not found!')
            }
        }).catch( err => {
            return next(err)  // pass to error handler in server.js
    })
})

module.exports = router