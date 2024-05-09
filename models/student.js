// define DB columns and data types
module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
        },
        starID: {
            type: DataTypes.STRING,
        },
        present: {
            type: DataTypes.BOOLEAN
        }
    })

    // Student.sync() is called to create/update the Student table in the DB
    // force: true - always update every time the app restarts
    // returns a promise
    Student.sync({ force: true }).then( () => {
        console.log('Synced student table')
    })

    return Student
}