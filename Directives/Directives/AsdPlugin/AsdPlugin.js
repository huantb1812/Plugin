angular.module('AsdPlugin', [])
.controller('NaomiController', ['$scope', function ($scope) {
    $scope.customer1 = {
        name: 'Naomi',
        address: '1600 Amphitheatre'
    };
    $scope.customer2 = {
        name: 'Igor',
        address: '123 Somewhere'
    };

}])
 
.directive('myCustomer', function () {
    return {
        restrict: 'E',
        scope:{
            customer:'=customer'
        },
        templateUrl: 'AsdPlugin/AsdGrid.html'
    };
});