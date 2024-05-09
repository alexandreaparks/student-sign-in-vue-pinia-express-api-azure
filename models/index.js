// sequelize setup
// uses config.json file and creates Student model

const { Sequelize, DataTypes } = require("sequelize")  // import Sequelize
const configJson = require("../config.json")
const createStudentModel = require('./student')

// look for env variable and read its value
// when deployed to Azure, will create env variable for server called NODE_ENV and set it to 'production'
// so, env is either production or development
const env = process.env.NODE_ENV || 'development'

const config = configJson[env]  // use config.json file and get DB settings based off of env value (prod or dev)

const sequelize = new Sequelize(config)  // create a Sequelize object based off of config settings

const database = {
    sequelize: sequelize,
    Sequelize: Sequelize
}

const studentModel = createStudentModel(sequelize, DataTypes)
const studentModelName = studentModel.name  // 'Student'
database[studentModelName] = studentModel  // add a new property to the database object containing the student model

module.exports = database