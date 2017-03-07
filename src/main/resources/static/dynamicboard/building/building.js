/**
 * Created by Administrator on 2017/3/3.
 */
(function(){
    'use strict';
    var buildingModule=angular.module("dynamicboard.building",['ui.router']);
    buildingModule.factory("buildingInstance",function(){return {}});
    buildingModule.config(["$stateProvider",function($stateProvider){
        $stateProvider.state('dynamicboard.building', {
            url: '/building',
            title: '动态销控楼栋管理',
            templateUrl:"dynamicboard/building/building.html",
            controller:"buildingController"
        });
    }]);
    buildingModule.controller("buildingController",["$scope","buildingService","$uibModal",function ($scope,buildingService,$uibModal) {
        $scope.pagetitle="楼栋管理";
        //显示所有楼盘
        buildingService.getAllBuilding(function (data) {
            $scope.building_data=data;
            console.log(data);
        })
    }]);
    buildingModule.service("buildingService",["$http",function ($http) {
        this.getAllBuilding=function(callback){
            console.log("aaaaa");
            $http({
                url:'/building/getAll',
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