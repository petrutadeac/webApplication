angular.module("employeeDetails")
    .constant("employeeUrl", "http://localhost:8080/employees/")
    .config(function($httpProvider) {    $httpProvider.defaults.withCredentials = true; })
        .controller("employeeCtrl", function ($scope, $resource, employeeUrl) {

        $scope.employeesResource = $resource(employeeUrl + ":id", { id: "@id" });

        $scope.listEmployees = function () {
            $scope.employees = $scope.employeesResource.query();
        }

        $scope.deleteEmployee = function (employee) {
            employee.$delete().then(function () {
                $scope.employees.splice($scope.employees.indexOf(employee), 1);
            });
        }

        $scope.createEmployee = function (employee) {
            new $scope.employeesResource(employee).$save().then(function (newEmployee) {
                $scope.employees.push(newEmployee);
                $scope.editedEmployee = null;
            });
        }

        $scope.updateEmployee = function (employee) {

            employee.$save();
            $scope.editedEmployee= null;
        }

        $scope.startEdit = function (employee) {
            $scope.editedEmployee = employee;    }

        $scope.cancelEdit = function () {
            $scope.editedEmployee = null;
        }

        $scope.listEmployees();


        $scope.formURL=function(b){
            var c="#/"+"employees"+"/"+b;
            return c;
        }

        $scope.getError = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                    return "Please enter a value";
                } else if (error.email) {
                    return "Please enter a valid email address";
                }
            }
        }



    });
