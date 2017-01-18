Bill=require('../models/').Bill;

module.exports={

    index(req, res) {
        Bill.findAll()
            .then(function (bills) {
                res.status(200).json(bills);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },

    create(req, res)
    {

        Bill.create(req.body)
            .then(function (newBill) {
                res.status(200).json(newBill);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },

    show(req, res)
    {
        Bill.findById(req.params.id)
            .then(function (bill) {
                res.status(200).json(bill);
            })
            .catch(function (error){
                res.status(500).json(error);
            });
    },

    delete (req,res){

        Bill.destroy({
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






}