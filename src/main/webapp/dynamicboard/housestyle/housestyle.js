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
            title: '动态销控楼栋管理',
            templateUrl:"dynamicboard/housestyle/housestyle.html",
            controller:"housestyleController"
        });
    }]);
    housestyleModule.controller("housestyleController",["$scope","housestyleService","$uibModal",function ($scope,housestyleService,$uibModal) {
        $scope.pagetitle="楼栋管理";
        //显示所有楼盘
        housestyleService.getAllHousestyle(function (data) {
            $scope.housestyle_data=data;
            console.log(data);
        })
    }]);
    housestyleModule.service("housestyleService",["$http",function ($http) {
        this.getAllHousestyle=function(callback){
            console.log("aaaaa");
            $http({
                url:'/housestyle/getAll',
                method:'GET'
            }).then(function(data){
                console.log("aaaaa");
                callback(data.data);
                console.log("aaaaa");
                console.log(data.data);
            });
        }
    }]);
})();