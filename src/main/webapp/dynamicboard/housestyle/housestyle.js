/**
 * Created by Administrator on 2017/3/3.
 */
(function(){
    'use strict';
    var housestyleModule=angular.module("dynamicboard.housestyle",['ui.router']);
    housestyleModule.factory("housestyleInstance",function(){return {}});
    housestyleModule.config(["$stateProvider",function($stateProvider){
        $stateProvider.state('dynamicboard.housestyle', {
            url: '/housestyle',
            title: '动态销控户型管理',
            templateUrl:"dynamicboard/housestyle/housestyle.html",
            controller:"housestyleController"
        });
    }]);
    housestyleModule.controller("housestyleController",["$scope","housestyleService","$uibModal",function ($scope,housestyleService,$uibModal) {
        $scope.pagetitle="户型管理";
        //显示所有户型
        housestyleService.getAllHousestyle(function (data) {
            $scope.housestyle_data=data;
            console.log(data);
        });
        //添加户型模态框
        $scope.showAddHousestyle = showAddHousestyle;
        function showAddHousestyle(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'dynamicboard/housestyle/addHousestyle.html',
                controller: 'addHousestyleController',
                bindToController: true,
                size: "lg",
                backdrop: false
            });
            modalInstance.result.then(function (data) {
                //添加保存成功
                console.log("正常关闭添加户型模态框");
                var housestyle = data;
                $scope.premise_data.push(housestyle);
            }, function() {
                console.log("取消添加户型");
            })
        }
    }]);
    housestyleModule.controller("addHousestyleController",["$scope","housestyleService","$uibModalInstance",function($scope,housestyleService,$uibModalInstance){
        $scope.pagetitle = "添加户型";
        $scope.premise_names = [];
        housestyleService.getAllPremise(function (data) {
            $scope.premise_data=data;
            for (var i=0;i<$scope.premise_data.length;i++){
                $scope.premise_names.push($scope.premise_data[i].premiseName);
            }
        });
        //保存添加
        $scope.save = function save() {
            console.log($scope.form);//所需的数据
            housestyleService.addHousestyle($scope.form,function(data) {
                if(data != null) {
                    console.log("添加成功");
                    $uibModalInstance.close(data);
                } else {
                    console.log("添加失败");
                    $scope.error = {
                        haserror: true,
                        errormsg: "添加失败，您可以再试一次！"
                    }
                }
            });
        };
        //取消添加
        $scope.cancel = function cancel(){
            $uibModalInstance.dismiss('cancel');
        }
    }]);
    housestyleModule.service("housestyleService",["$http",function ($http) {
        //获得所有户型
        this.getAllHousestyle=function(callback){
            $http({
                url:'/housestyle/getAll',
                method:'GET'
            }).then(function(data){
                callback(data.data.data);
                console.log(data.data.data);
            });
        };
        //获得所有楼盘
        this.getAllPremise=function(callback){
            $http({
                url:'/premise/getAll',
                method:'GET'
            }).then(function(response){
                callback(response.data);
                console.log(response.data);
            });
        };
        //添加户型
        this.addHousestyle = function (housestyle,callback) {
            $http({
                url:"/housestyle/addHouseStyle",
                method:"POST",
                data:housestyle
            }).then(function (response) {
                callback(response.data.data);
                console.log(response.data.data);
            });
        };
    }]);
})();