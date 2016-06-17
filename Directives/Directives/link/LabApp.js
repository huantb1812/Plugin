var modules = angular.module('LabApp', []);
modules.controller('LabCtrl', function ($scope, $http) {
});

modules.directive('daoChieuNoiDung', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var words = elem.text().split(' ');
            var l = words.length;
            var str = "";
            for (var i = l - 1; i > 0; i--) {
                str += " " + words[i];
            }
            elem.text(str);
        }
    }
});