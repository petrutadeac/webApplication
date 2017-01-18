'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const sequelize= new Sequelize('demo_schema', 'root', 'niciodata', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },


});

let Employee = sequelize.define('employee', {
    name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    age:{
        allowNull:false,
        type:Sequelize.INTEGER
    },
    phonenumber:{
        allowNull:false,
        type:Sequelize.INTEGER,
        validate:{
            len: {min:10}
        }

    }
})

let Bill = sequelize.define('bill', {
    number: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    amount: {
        allowNull: false,
        type: Sequelize.INTEGER,

    }
})

Employee.hasMany(Bill, {
    foreignKey: 'employeeId'
})
Bill.belongsTo(Employee, {
    foreignKey: 'employeeId'
})

let app = express()

app.use(express.static(__dirname + '/app'))
app.use(bodyParser.json())

app.locals.employees = []

app.get('/create', (req, res) => {
    sequelize
        .sync({
            force: true
        })
        .then(() => {
            res.status(201).send('created')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('not created')
        })
})

app.get('/employees', (req, res) => {
    Employee
        .findAll({
            attributes: ['id', 'name', 'email','age','phonenumber']
        })
        .then((employees) => {
            res.status(200).send(employees)
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

app.get('/employees/:id', (req, res) => {
    Employee
        .find({
            attributes: ['id', 'name', 'email','age','phonenumber'],
            where: {
                id: req.params.id
            }
        })
        .then((employee) => {
            res.status(200).send(employee)
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

app.post('/employees', (req, res) => {
    Employee
        .create(req.body)
        .then(() => {
            res.status(201).send('created')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

app.put('/employees/:id', (req, res) => {
    Employee
        .find({
            where: {
                id: req.params.id
            }
        })
        .then((employee) => {
            return employee.updateAttributes(req.body)
        })
        .then(() => {
            res.status(201).send('modified')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

app.delete('/employees/:id', (req, res) => {
    Employee
        .find({
            where: {
                id: req.params.id
            }
        })
        .then((employee) => {
            return employee.destroy()
        })
        .then(() => {
            res.status(201).send('removed')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

app.get('/employees/:id/bills', (req, res) => {
    Employee
        .find({
            where: {
                id: req.params.id
            },
            include: [Bill]
        })
        .then((employee) => {
            return employee.getBills()
        })
        .then((bills) => {
            res.status(200).send(bills)
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

app.get('/employees/:id/bills/:mId', (req, res) => {
    Bill
        .find({
            attributes: ['id', 'number', 'amount'],
            where: {
                id: req.params.id
            }
        })
        .then((bill) => {
            res.status(200).send(bill)
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

app.post('/employees/:id/bills', (req, res) => {
    Employee
        .find({
            where: {
                id: req.params.id
            }
        })
        .then((employee) => {
            let bill = req.body
            bill.employeeId = employee.id
            return Bill.create(bill)
        })
        .then(() => {
            res.status(201).send('created')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })

})

app.put('/employees/:id/bills/:mId', (req, res) => {
    Bill
        .find({
            where: {
                id: req.params.id
            }
        })
        .then((bill) => {
            bill.number = req.body.number
            bill.content = req.body.amount
            return bill.save()
        })
        .then(() => {
            res.status(201).send('modified')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

app.delete('/employees/:id/bills/:mId', (req, res) => {
    Bill
        .find({
            where: {
                id: req.params.mId
            }
        })
        .then((bill) => {
            return bill.destroy()
        })
        .then(() => {
            res.status(201).send('removed')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });
sequelize.sync();

app.listen(8080)
