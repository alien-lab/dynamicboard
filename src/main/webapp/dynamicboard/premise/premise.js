/**
 * Created by Administrator on 2017/2/23.
 */
(function () {
    'use strict';
    var premiseModule=angular.module("dynamicboard.premise",[]);
    premiseModule.factory("premiseDescinstance",function(){return {}});
    premiseModule.config(["$stateProvider",function($stateProvider){
        $stateProvider.state('dynamicboard.premise', {
            url: '/premise',
            title: '楼盘管理',
            templateUrl: "dynamicboard/premise/premise.html",
            controller:"premiseController"
        });
    }]);
    premiseModule.controller("premiseController",["$scope","premiseService","$uibModal",function ($scope,premiseService,$uibModal) {
        $scope.pagetitle="楼盘管理";
        function showAddPremise(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'dynamicboard/premise/addPremise.html',
                controller: 'addPremiseController',
                bindToController: true,
                size: "lg",
                backdrop: false
            });

            modalInstance.result.then(function (data) {
                //添加保存成功
                if(data.result > 0) {
                    loaddata(0,15);
                } else {

                }
            }, function(flag) {
                if(flag.indexOf("back") >= 0) {
                    return false;
                }
            })
        }
    }]);
    premiseModule.controller("addPremiseController",["$scope","premiseService","premiseDescinstance","$uibModalInstance",function($scope,premiseService,premiseDescinstance,$uibModalInstance){
        $scope.pagetitle = "添加楼盘";
        $scope.save = function save(premise) {
            $scope.loading = true;
            premiseService.addPremise($scope.form,function(data) {
                $scope.loading = false;
                if(data.result >0) {
                    $uibModalInstance.close(data);
                } else {
                    $scope.error = {
                        haserror: true,
                        errormsg: "添加失败，您可以再试一次！"
                    }
                }
            });
        }
        $scope.cancel = function cancel(flag){
            $uibModalInstance.dismiss('cancel');
        }
    }]);
    premiseModule.service("premiseService",["$http",function ($http) {
        this.addPremise = function (premise,callback) {
            $http({
                url:"/premise/addPremise",
                method:"POST",
                data:premise
            }).then(function (response) {
                callback(response.date);
            });
        }
        this.deletePremise = function (premiseId,callback) {
            $http({
                url:"/premise/deletePremise/"+premiseId,
                method:"DELETE",
                data:"id"
            }).then(function (response) {
                callback(response.date);
            });
        }
    }]);
})