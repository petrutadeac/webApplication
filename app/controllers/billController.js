angular.module("employeeDetails")
    .constant("billUrl", "http://localhost:8080/employees/")
    .config(function($httpProvider) {    $httpProvider.defaults.withCredentials = true; })
    .controller("billCtrl", function ($scope, $resource, billUrl,$routeParams) {

            $scope.billsResource = $resource(billUrl + $routeParams.employeeId+"/bills/"+ ":id", { id: "@id" });
            $scope.listBills = function () {
            $scope.bills = $scope.billsResource.query();
        }



        $scope.deleteBill = function (bill) {
            bill.$delete().then(function () {
                $scope.bills.splice($scope.bills.indexOf(bill), 1);
            });
        }
        $scope.createBill = function (bill) {
            new $scope.billsResource(bill).$save().then(function (newBill) {
                $scope.bills.push(newBill);
                $scope.editedBill = null;
            });
        }


        $scope.updateBill = function (bill) {
            bill.$save();
            $scope.editedBill= null;
        }

        $scope.startEdit = function (bill) {
            $scope.editedBill = bill;    }

        $scope.cancelEdit = function () {
            $scope.editedBill = null;
        }


        $scope.listBills();
    });