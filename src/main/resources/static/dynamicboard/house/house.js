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
            title: '动态销控房源管理',
            templateUrl:"dynamicboard/house/house.html",
            controller:"houseController"
        });
    }]);
    houseModule.value("houseValue",{"buildingName":""});
    houseModule.controller("houseController",["$scope","houseService","$uibModal","houseInstance","houseValue",function ($scope,houseService,$uibModal,houseInstance,houseValue) {
        $scope.pagetitle="房源管理";
        $scope.editable = "no";
        //获得所有楼栋
        houseService.getAllBuilding(function (data) {
            $scope.building_data=data;
            $scope.currentbuilding=$scope.building_data[0];
            $scope.buildingName=$scope.currentbuilding.buildingName;
            houseValue.buildingName=$scope.buildingName;
            houseService.getAllAsTable($scope.buildingName,function (data) {
                $scope.house_data=data;
                console.log("初始房源数据："+data);
            });
        });
        //下拉框ng-change事件
        $scope.selectChanged=selectChanged;
        function selectChanged(buildingName) {
            houseService.getAllAsTable(buildingName,function (data) {
                $scope.house_data=data;
                console.log("下拉框选择楼栋后的房源数据："+data);
                houseValue.buildingName=buildingName;
            });
        }
        //添加房源模态框
        $scope.showAddHouse = showAddHouse;
        function showAddHouse(){
            var modalInstance = $uibModal.open({
                animation: true,//打开时的动画开关
                templateUrl: 'dynamicboard/house/addHouse.html',
                controller: 'addHouseController',
                bindToController: true,
                size: "lg",
                backdrop: false
            });
            modalInstance.result.then(function (data) {
                //添加保存成功
                console.log("正常关闭添加房源模态框");
                var newHouses = data;
                $scope.house_data.splice(0,0,newHouses);//往json数组第一个元素位置添加newHouses数据
                console.log($scope.house_data);
            }, function() {
                console.log("取消添加房源");
            })
        }
        //区别各种状态
        $scope.setStatusColor=setStatusColor;
        function setStatusColor(houseStatus) {
            if ("不是房源" == houseStatus){
                return "null";
            }else if ("可售" == houseStatus){
                return "green";
            }else if ("意向" == houseStatus){
                return "yellow";
            }else if ("认购" == houseStatus){
                return "blue";
            }else if ("成交" == houseStatus){
                return "pink";
            }else if ("抵押" == houseStatus){
                return "black";
            }else if ("退房" == houseStatus){
                return "tuifang";
            }else if ("销控" == houseStatus){
                return "red";
            }else if ("已删除" == houseStatus){
                return "yishan";
            }else {
                return "white";
            }
        }
        //切换成可以批量操作
        $scope.changeEdit=changeEdit;
        function changeEdit() {
            $scope.editable="yes";
        }
        //切换成不可以批量操作
        $scope.changeNoEdit=changeNoEdit;
        function changeNoEdit() {
            $scope.editable="no";
        }
        //修改房源模态框
        $scope.showUpdateHouse = showUpdateHouse;
        function showUpdateHouse(house) {
            houseInstance.modify = house;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'dynamicboard/house/updateHouse.html',
                controller: 'updateHouseController',
                bindToController: true,
                size: "lg",
                backdrop: false
            });
            modalInstance.result.then(function() {
                //修改保存成功
                console.log("正常关闭修改房源模态框");
            }, function() {
                console.log("取消修改房源");
            })
        }
        //删除当前房源
        $scope.deleteHouse = deleteHouse;
        function deleteHouse(houseId){
            var promitInstance = $uibModal.open({
                animation: true,
                templateUrl: 'system/common/promit.html',
                controller:function($scope,$uibModalInstance){
                    $scope.title="操作确认";
                    $scope.text="确认删除该房源吗？";
                    $scope.cancel=function(){
                        $uibModalInstance.dismiss('cancel');
                    };
                    $scope.save=function(){
                        $uibModalInstance.close("ok");
                    };
                },
                backdrop:true
            });
            promitInstance.result.then(function(){
                houseService.deleteHouse(houseId,function(data){
                    if(data != null) {
                        for(var i=0;i<$scope.house_data.length;i++) {
                            if($scope.house_data[i].id == houseId) {
                                //刷新房源页面
                                $scope.house_data.splice(i,1);
                                break;
                            }
                        }
                    }
                });
            });
        }
        //批量删除房源
        $scope.getSelects = function() {
            var selects = [];
            for(var i=0;i<$scope.house_data.length;i++) {
                if($scope.house_data[i].$isselected) {
                    selects.push($scope.house_data[i]);
                }
            }
            return selects;
        };
        $scope.deleteHouses = deleteHouses;
        function deleteHouses() {
            if($scope.getSelects().length == 0) {
                console.log("还没选择需要删除的房源");
                return;
            }
            var promitInstance = $uibModal.open({
                animation: true,
                templateUrl: 'system/common/promit.html',
                controller: function($scope,$uibModalInstance){
                    $scope.title="操作确认";
                    $scope.text="确认删除该房源吗？";
                    $scope.cancel=function(){
                        $uibModalInstance.dismiss('cancel');
                    };
                    $scope.save=function(){
                        $uibModalInstance.close("ok");
                    };
                },
                backdrop:true
            });
            promitInstance.result.then(function(){
                var deletedHouseId = [];
                for(var i=0;i<$scope.house_data.length;i++) {
                    if($scope.house_data[i].$isselected) {
                        houseService.deleteHouse($scope.house_data[i].id,function(data,houseId){
                            if(data!=null) {
                                deletedHouseId.push(houseId);
                                for(var k=0;k<$scope.house_data.length;k++) {
                                    for(var j=0;j<deletedHouseId.length;j++) {
                                        if($scope.house_data[k].id == deletedHouseId[j]) {
                                            $scope.house_data.splice(k,1);
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
        //批量修改房源户型
        $scope.showUpdateHouseStyles = showUpdateHouseStyles;
        function showUpdateHouseStyles() {
            if($scope.getSelects().length == 0) {
                console.log("还没选择需要修改的房源");
                return;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'dynamicboard/house/updateHouseStyles.html',
                controller: 'updateHouseStylesController',
                bindToController: true,
                size: "sm",
                backdrop: false,
                resolve: {
                    selects : function() {
                        var selects = [];
                        for(var i=0;i<$scope.house_data.length;i++) {
                            if($scope.house_data[i].$isselected) {
                                selects.push($scope.house_data[i]);
                            }
                        }
                        return selects;
                    }
                }
            });
            modalInstance.result.then(function() {
                //修改保存成功
                console.log("正常关闭批量修改户型模态框");
            }, function() {
                console.log("取消批量修改户型");
            })
        }
        //批量修改房源单价
        $scope.showUpdateUnitPrices = showUpdateUnitPrices;
        function showUpdateUnitPrices() {
            if($scope.getSelects().length == 0) {
                console.log("还没选择需要修改的房源");
                return;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'dynamicboard/house/updateUnitPrices.html',
                controller: 'updateUnitPricesController',
                bindToController: true,
                size: "sm",
                backdrop: false,
                resolve: {
                    selects : function() {
                        var selects = [];
                        for(var i=0;i<$scope.house_data.length;i++) {
                            if($scope.house_data[i].$isselected) {
                                selects.push($scope.house_data[i]);
                            }
                        }
                        return selects;
                    }
                }
            });
            modalInstance.result.then(function() {
                //修改保存成功
                console.log("正常关闭批量修改单价模态框");
            }, function() {
                console.log("取消批量修改单价");
            })
        }
        //批量修改房源状态
        $scope.showUpdateHouseStatuss = showUpdateHouseStatuss;
        function showUpdateHouseStatuss() {
            if($scope.getSelects().length == 0) {
                console.log("还没选择需要修改的房源");
                return;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'dynamicboard/house/updateHouseStatuss.html',
                controller: 'updateHouseStatussController',
                bindToController: true,
                size: "sm",
                backdrop: false,
                resolve: {
                    selects : function() {
                        var selects = [];
                        for(var i=0;i<$scope.house_data.length;i++) {
                            if($scope.house_data[i].$isselected) {
                                selects.push($scope.house_data[i]);
                            }
                        }
                        return selects;
                    }
                }
            });
            modalInstance.result.then(function() {
                //修改保存成功
                console.log("正常关闭批量修改单价模态框");
            }, function() {
                console.log("取消批量修改单价");
            })
        }
    }]);
    houseModule.controller("addHouseController",["$scope","houseService","$uibModalInstance","houseValue",function($scope,houseService,$uibModalInstance,houseValue){
        $scope.pagetitle = "添加房源";
        $scope.house_statuss = ["可售","意向","认购","成交","抵押","退房","销控"];
        $scope.buildingName = houseValue.buildingName;
        $scope.housestyle_names = [];
        houseService.getAllHousestyle(function (data) {
            $scope.housestyle_data=data;
            for (var i=0;i<$scope.housestyle_data.length;i++){
                $scope.housestyle_names.push($scope.housestyle_data[i].hsName);
            }
        });
        console.log($scope.buildingName);
        houseService.getByBuildingName($scope.buildingName,function (data) {
            $scope.building=data;
        });
        //保存添加
        $scope.save = function save() {
            console.log($scope.building);
            $scope.form.building=$scope.building;
            $scope.form.premise=$scope.building.premise;
            houseService.getByHsName($scope.form.houseStyle,function (data) {
                $scope.houseStyle = data;
                $scope.form.houseStyle = $scope.houseStyle;
            });
            console.log($scope.form);//所需的数据
            houseService.addHouse($scope.form,function(data) {
                if(data != null) {
                    console.log("添加成功");
                    console.log(data);
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
    houseModule.controller("updateHouseController",["$scope","houseService","$uibModalInstance","houseInstance","$window",function($scope,houseService,$uibModalInstance,houseInstance,$window){
        $scope.pagetitle = "修改房源信息";
        $scope.house_statuss = ["可售","意向","认购","成交","抵押","退房","销控"];
        $scope.premise_names = [];
        $scope.building_names = [];
        $scope.housestyle_names = [];
        houseService.getAllPremise(function (data) {
            $scope.premise_data=data;
            for (var i=0;i<$scope.premise_data.length;i++){
                $scope.premise_names.push($scope.premise_data[i].premiseName);
            }
        });
        houseService.getAllBuilding(function (data) {
            $scope.building_data=data;
            for (var i=0;i<$scope.building_data.length;i++){
                $scope.building_names.push($scope.building_data[i].buildingName);
            }
        });
        houseService.getAllHousestyle(function (data) {
            $scope.housestyle_data=data;
            for (var i=0;i<$scope.housestyle_data.length;i++){
                $scope.housestyle_names.push($scope.housestyle_data[i].hsName);
            }
        });
        $scope.form = houseInstance.modify;
        console.log($scope.form);
        //保存修改
        $scope.save = function save() {
            houseService.getByPremiseName($scope.form.premise.premiseName,function (data) {
                $scope.premise = data;
                $scope.form.premise = $scope.premise;
                console.log($scope.form.premise);
            });
            houseService.getByHsName($scope.form.houseStyle.hsName,function (data) {
                $scope.houseStyle = data;
                $scope.form.houseStyle = $scope.houseStyle;
                console.log($scope.form.houseStyle);
            });
            houseService.getByBuildingName($scope.form.building.buildingName,function (data) {
                $scope.building = data;
                $scope.form.building = $scope.building;
                console.log($scope.form.building);
            });
            houseService.updateHouse($scope.form,function(data) {
                console.log($scope.form);
                if(data != null) {
                    $uibModalInstance.close(data);
                    $window.location.reload();//刷新页面
                } else {
                    $scope.error = {
                        haserror: true,
                        errormsg : "修改失败，您可以再试一次！"
                    }
                }
            });
        };
        //取消修改
        $scope.cancel=function cancel(){
            $uibModalInstance.dismiss('cancel');
        }
    }]);
    houseModule.controller("updateHouseStylesController",["$scope","houseService","$uibModalInstance","selects",function ($scope,houseService,$uibModalInstance,selects) {
        $scope.pagetitle = "批量修改户型";
        $scope.housestyle_names = [];
        $scope.selects = selects;
        console.log($scope.selects);
        //显示所有房源
        houseService.getAllHouse(function (data) {
            $scope.house_data=data;
        });
        houseService.getAllHousestyle(function (data) {
            $scope.housestyle_data=data;
            for (var i=0;i<$scope.housestyle_data.length;i++){
                $scope.housestyle_names.push($scope.housestyle_data[i].hsName);
            }
        });
        //保存修改
        $scope.save = function save() {
            houseService.getByHsName($scope.form.houseStyle.hsName,function (data) {
                $scope.houseStyle = data;
                $scope.form.houseStyle = $scope.houseStyle;
                console.log($scope.form.houseStyle);
            });
            for(var i=0;i<$scope.selects.length;i++) {
                $scope.selects[i].houseStyle = $scope.form.houseStyle;
                houseService.updateHouse($scope.selects[i],function(data){
                    if(data!=null) {
                        $uibModalInstance.close(data);
                    } else {
                        $scope.error = {
                            haserror: true,
                            errormsg : "修改失败，您可以再试一次！"
                        }
                    }
                });
            }
        };
        //取消修改
        $scope.cancel=function cancel(){
            $uibModalInstance.dismiss('cancel');
        }
    }]);
    houseModule.controller("updateUnitPricesController",["$scope","houseService","$uibModalInstance","selects",function ($scope,houseService,$uibModalInstance,selects) {
        $scope.pagetitle = "批量修改单价";
        $scope.selects = selects;
        console.log($scope.selects);
        //保存修改
        $scope.save = function save() {
            for(var i=0;i<$scope.selects.length;i++) {
                $scope.selects[i].unitPrice = $scope.form.unitPrice;
                houseService.updateHouse($scope.selects[i],function(data){
                    if(data!=null) {
                        $uibModalInstance.close(data);
                    } else {
                        $scope.error = {
                            haserror: true,
                            errormsg : "修改失败，您可以再试一次！"
                        }
                    }
                });
            }
        };
        //取消修改
        $scope.cancel=function cancel(){
            $uibModalInstance.dismiss('cancel');
        }
    }]);
    houseModule.controller("updateHouseStatussController",["$scope","houseService","$uibModalInstance","selects",function ($scope,houseService,$uibModalInstance,selects) {
        $scope.pagetitle = "批量修改状态";
        $scope.house_statuss = ["可售","意向","认购","成交","抵押","退房","销控"];
        $scope.selects = selects;
        console.log($scope.selects);
        //保存修改
        $scope.save = function save() {
            for(var i=0;i<$scope.selects.length;i++) {
                $scope.selects[i].houseStatus = $scope.form.houseStatus;
                houseService.updateHouse($scope.selects[i],function(data){
                    if(data!=null) {
                        $uibModalInstance.close(data);
                    } else {
                        $scope.error = {
                            haserror: true,
                            errormsg : "修改失败，您可以再试一次！"
                        }
                    }
                });
            }
        };
        //取消修改
        $scope.cancel=function cancel(){
            $uibModalInstance.dismiss('cancel');
        }
    }]);
    houseModule.service("houseService",["$http",function ($http) {
        //获得所有房源
        this.getAllHouse=function(callback){
            $http({
                url:'/house/getAll',
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
        //获取所有楼栋
        this.getAllBuilding=function(callback){
            $http({
                url:'/building/getAll',
                method:'GET'
            }).then(function(data){
                callback(data.data.data);
                console.log(data.data.data);
            });
        };
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
        //添加房源
        this.addHouse = function (house,callback) {
            $http({
                url:"/house/addHouse",
                method:"POST",
                data:house
            }).then(function (response) {
                callback(response.data.data);
                console.log(response.data.data);
            });
        };
        //修改房源信息
        this.updateHouse = function (house,callback) {
            $http({
                url:"/house/updateHouse",
                method:"POST",
                data:house
            }).then(function (response) {
                callback(response.data.data);
                console.log(response.data.data);
            });
        };
        //删除当前房源
        this.deleteHouse = function (houseId,callback) {
            $http({
                url:"/house/deleteHouse/"+houseId,
                method:"DELETE",
                data:{
                    id:houseId
                }
            }).then(function (response) {
                callback(response.data,houseId);
                console.log(response.data,houseId);
            });
        };
        //根据premiseName查询楼盘
        this.getByPremiseName = function (premiseName,callback) {
            $http({
                url:"/premise/getByPremiseName/"+premiseName,
                method:"GET",
                data:{
                    premiseName:premiseName
                }
            }).then(function (response) {
                callback(response.data);
                console.log(response.data);
            });
        };
        //根据hsName查询户型
        this.getByHsName = function (hsName,callback) {
            $http({
                url:"/housestyle/getByHsName/"+hsName,
                method:"GET",
                data:{
                    hsName:hsName
                }
            }).then(function (response) {
                callback(response.data);
                console.log(response.data);
            });
        };
        //根据buildingName查询楼栋
        this.getByBuildingName = function (buildingName,callback) {
            $http({
                url:"/building/getByBuildingName/"+buildingName,
                method:"GET",
                data:{
                    buildingName:buildingName
                }
            }).then(function (response) {
                callback(response.data);
                console.log(response.data);
            });
        };
        //根据BuildingAndFloorNo查房源
        this.getAllAsTable = function (buildingName,callback) {
            $http({
                url:"/house/getAllAsTable/"+buildingName,
                method:"GET",
                data:{
                    buildingName:buildingName
                }
            }).then(function (response) {
                callback(response.data.data);
                console.log(response.data.data);
            });
        };
    }]);
})();