/**
 * Created by Administrator on 2017/3/3.
 */
(function(){
    'use strict';
    var houseModule=angular.module("dynamicboard.house",['ui.router']);
    houseModule.factory("houseInstance",function(){return {}});
    houseModule.config(["$stateProvider",function($stateProvider){
        $stateProvider.state('dynamicboard.house', {
            url: '/house',
            title: '动态销控楼栋管理',
            templateUrl:"dynamicboard/house/house.html",
            controller:"houseController"
        });
    }]);
    houseModule.controller("houseController",["$scope","houseService","$uibModal",function ($scope,houseService,$uibModal) {
        $scope.pagetitle="楼栋管理";
        //显示所有楼盘
        houseService.getAllHouse(function (data) {
            $scope.house_data=data;
            console.log(data);
        })
    }]);
    houseModule.service("houseService",["$http",function ($http) {
        this.getAllHouse=function(callback){
            console.log("aaaaa");
            $http({
                url:'/house/getAll',
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