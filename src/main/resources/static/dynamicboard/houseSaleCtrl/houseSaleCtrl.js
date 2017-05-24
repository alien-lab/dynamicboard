/**
 * Created by 鸠小浅 on 2017/5/22.
 */
(function () {
    'use strict';
    var houseSaleCtrlModule = angular.module("dynamicboard.houseSaleCtrl", ['ui.router']);
    houseSaleCtrlModule.factory("houseSaleCtrlInstance", function () {
        return {}
    });
    houseSaleCtrlModule.config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('dynamicboard.houseSaleCtrl', {
            url: '/houseSaleCtrl',
            title: '动态销控操作记录',
            templateUrl: "dynamicboard/houseSaleCtrl/houseSaleCtrl.html",
            controller: "houseSaleCtrlController"
        });
    }]);
    houseSaleCtrlModule.value("houseSaleCtrlValue", {"thisPage": ""});
    houseSaleCtrlModule.controller("houseSaleCtrlController", ["$scope", "houseSaleCtrlService", "$uibModal", "houseSaleCtrlInstance", "houseSaleCtrlValue", "$cookieStore", function ($scope, houseSaleCtrlService, $uibModal, houseSaleCtrlInstance, houseSaleCtrlValue, $cookieStore) {
        $scope.user = $cookieStore.get("staff");
        $scope.pagetitle = "操作记录";
        $scope.houseSaleCtrl_data = [];
        $scope.loading = true;
        if ($scope.user.staffGarde != 5) {
            houseSaleCtrlService.findHouseSaleCtrlByPremise($scope.user.premise.premiseName, function (data) {
                $scope.houseSaleCtrl_data = data;
                $scope.loading = false;
                for (var i = 0; i < $scope.houseSaleCtrl_data.length; i++) {
                    if ($scope.houseSaleCtrl_data[i].salerStatusTime != null) {
                        var newDate = new Date();
                        newDate.setTime($scope.houseSaleCtrl_data[i].salerStatusTime);
                        $scope.houseSaleCtrl_data[i].salerStatusTime = newDate.toLocaleString();
                    } else if ($scope.houseSaleCtrl_data[i].salectrlStatusTime != null) {
                        var newDate = new Date();
                        newDate.setTime($scope.houseSaleCtrl_data[i].salectrlStatusTime);
                        $scope.houseSaleCtrl_data[i].salectrlStatusTime = newDate.toLocaleString();
                    }
                }
            })
        } else if ($scope.user.staffGarde == 5) {
            houseSaleCtrlService.findAllHouseSaleCtrl(function (data) {
                $scope.houseSaleCtrl_data = data;
                $scope.loading = false;
                if ($scope.houseSaleCtrl_data!=null){
                    for (var i = 0; i < $scope.houseSaleCtrl_data.length; i++) {
                        if ($scope.houseSaleCtrl_data[i].salerStatusTime != null) {
                            var newDate = new Date();
                            newDate.setTime($scope.houseSaleCtrl_data[i].salerStatusTime);
                            $scope.houseSaleCtrl_data[i].salerStatusTime = newDate.toLocaleString();
                        } else if ($scope.houseSaleCtrl_data[i].salectrlStatusTime != null) {
                            var newDate = new Date();
                            newDate.setTime($scope.houseSaleCtrl_data[i].salectrlStatusTime);
                            $scope.houseSaleCtrl_data[i].salectrlStatusTime = newDate.toLocaleString();
                        }
                    }
                }else {
                    $scope.loading=true;
                }
            })
        }
    }]);

    houseSaleCtrlModule.service("houseSaleCtrlService", ["$http", function ($http) {
        //获取该楼盘所有操作记录
        this.findHouseSaleCtrlByPremise = function (premiseName, callback) {
            $http({
                url: '/houseSaleCtrl/findHouseSaleCtrlByPremise/' + premiseName,
                method: 'GET',
                premiseName: premiseName
            }).then(function (response) {
                console.log(response.data);
                callback(response.data);
            });
        };
        ////获取所有记录（管理员用）
        this.findAllHouseSaleCtrl = function (callback) {
            $http({
                url: '/houseSaleCtrl/findAllHouseSaleCtrl',
                method: 'GET'
            }).then(function (response) {
                console.log(response.data);
                callback(response.data);
            });
        };
    }]);
})();