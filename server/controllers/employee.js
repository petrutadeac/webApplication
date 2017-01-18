Employee = require('../models/').Employee;
Bill = require('../models/').Bill;


module.exports={

    index(req, res)
    {
    Employee.findAll({

         include: Bill
    })
        .then(function (employees) {
            res.status(200).json(employees);
        })
        .catch(function (error) {
            res.status(500).json(error);
        });
    },


    create(req, res)
    {
        Employee.create(req.body)
            .then(function (newEmployee) {
                res.status(200).json(newEmployee);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },

    update(req, res)
    {
    Employee.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(function (updatedRecords) {
            res.status(200).json(updatedRecords);
        })
        .catch(function (error){
            res.status(500).json(error);
        });
},

    delete(req, res)
    {
    Employee.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(function (deletedRecords) {
            res.status(200).json(deletedRecords);
        })
        .catch(function (error){
            res.status(500).json(error);
        });
},
    show(req, res)
    {
    Employee.findById(req.params.id, {
        //Return all books that have a matching author_id for the author
        include: Bill
    })
        .then(function (employee) {
            res.status(200).json(employee);
        })
        .catch(function (error){
            res.status(500).json(error);
        });
}


};