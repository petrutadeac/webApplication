var employees = require('../controllers/employee'),
    bills = require('../controllers/bill');

module.exports = function (router) {
    router.get('/employees', employees.index);
    router.get('/employees/:id', employees.show);
    router.post('/employees', employees.create);
    router.put('/employees', employees.update);
    router.delete('/employees/:id', employees.delete);

    router.get('/bills', bills.index);
    router.get('/bills/:id', bills.show);
    router.post('/bills', bills.create);
    router.put('/bills/:id', bills.update);
    router.delete('/bills/:id', bills.delete);

    return router
};