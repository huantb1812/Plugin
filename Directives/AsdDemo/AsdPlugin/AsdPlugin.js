/// <reference path="AsdPlugin.js" />
/// <reference path="" />
var domain = 'http://localhost:59046/';
angular.module('AsdPlugin', [])
.controller('AsdController', ['$scope', function ($scope) {

    $scope.gridOption = {

        dataSource: {
            //type: "json",
            transport: {
                read: domain + 'api/values/Gets',
                delete: domain + 'api/values/Delete'
            },
            pageSize: 3
        },
        //height: 550,
        // groupable: true,
        //sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 3
        },
        columns: [{
            field: "Id",
            title: "Mã sản phẩm",
            width: 240
        },
         {
             field: "Name",
             title: "Tên sản phẩm"
         },
        {
            field: "Producer",
            title: "Nhà sản suất"
        },
        {
            field: "Count",
            title: "Số lượng"
        }
        ],
        LoadPage: function (e) {
            alert('page = ' + e);
        }
    };

}])


.directive('asdGrid', ['$http', function ($http) {

    return {
        restrict: 'E',
        scope: {
            GridOption: '=gridOption'
        },
        controller: function ($scope) {
            $scope.skip = 0;
            $scope.take = $scope.GridOption.dataSource.pageSize;
            $scope.page = 0;//trang hiện tại
            $scope.pageSize = $scope.GridOption.dataSource.pageSize;
            $scope.Count = 0;
            $scope.SortField = null;//sắp xếp theo trường nào
            $scope.SortType = 0;//Sắp xếp theo kiểu nào(0:  không xắp xếp, 1: tăng, 2: giảm)


            var LoadData = function () {
                var url = $scope.GridOption.dataSource.transport.read + '?&skip=' + $scope.skip + '&take=' + $scope.take + '&page=' + $scope.page + '&pageSize=' + $scope.pageSize;
                $http.get(url).then(function (result) {

                    $scope.GridOption.Data = result.data.data;
                    $scope.Count = result.data.Count;
                    $scope.GridOption.pages = [];
                    console.log(result);
                    for (var i = 0; i < Math.ceil(result.data.Count / $scope.pageSize) ; i++) {
                        $scope.GridOption.pages.push(i);
                    }
                }, function (result) {
                    alert("Error: Không có dữ liệu trả về");
                });
            }

            LoadData();
            $scope.ReloadData = function (page) {
                $scope.skip = $scope.pageSize * page;
                $scope.take = $scope.pageSize;
                $scope.page = page;
                LoadData();
            }
            $scope.Refresh = function () {
                $scope.GridOption.Data = {};
                LoadData();
            }

            $scope.CheckAll_Click = function () {
                angular.forEach($scope.GridOption.Data, function (value) {
                    value.Checked = $scope.IsCheckAll;
                });
            }
            $scope.Delete = function () {
                var items = [];
                angular.forEach($scope.GridOption.Data, function (value) {
                    if (value.Checked) items.push(value.Id);
                });
                if (confirm('Xác nhận xóa các sản phẩm có mã ' + items)) {

                    $http.post($scope.GridOption.dataSource.transport.delete, JSON.stringify(items))
                        .then(function (response) {

                            $scope.Refresh();
                            alert('xóa thành công');
                        }, function (response) {
                            alert('Không xóa đc!');
                        });
                }


            }
            $scope.Create = function () {

            }
            $scope.Sort = function (f) {
                $scope.SortField = f;

                $scope.SortType = (t == 0 ? 1 : (t == 1 ? 2 : 0));

            }
        },
        templateUrl: '/AsdPlugin/AsdGrid.html'
    };
}])
;
