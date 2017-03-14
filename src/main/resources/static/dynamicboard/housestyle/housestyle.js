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
    housestyleModule.controller("housestyleController",["$scope","housestyleService","$uibModal","housestyleInstance",function ($scope,housestyleService,$uibModal,housestyleInstance) {
        $scope.pagetitle="户型管理";
        $scope.image=null;//当前图片
        //显示所有户型
        housestyleService.getAllHousestyle(function (data) {
            $scope.housestyle_data=data;
            console.log(data);
        });
        //全选
        $scope.selectAll = function selectAll(){
            for(var i=0; i<$scope.housestyle_data.length; i++) {
                if($scope.$isselectall) {
                    $scope.housestyle_data[i].$isselected = true;
                } else {
                    $scope.housestyle_data[i].$isselected = false;
                }
            }
        };
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
                $scope.housestyle_data.push(housestyle);
                console.log($scope.housestyle_data);
            }, function() {
                console.log("取消添加户型");
            })
        }
        //修改户型模态框
        $scope.showUpdateHousestyle = showUpdateHousestyle;
        function showUpdateHousestyle(housestyle) {
            housestyleInstance.modify = housestyle;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'dynamicboard/housestyle/updateHousestyle.html',
                controller: 'updateHousestyleController',
                bindToController: true,
                size: "lg",
                backdrop: false
            });
            modalInstance.result.then(function() {
                //修改保存成功
                console.log("正常关闭修改户型模态框");
            }, function() {
                console.log("取消修改户型");
            })
        }
        //删除当前户型
        $scope.deleteHousestyle = deleteHousestyle;
        function deleteHousestyle(houseStyleId){
            var promitInstance = $uibModal.open({
                animation: true,
                templateUrl: 'system/common/promit.html',
                controller:function($scope,$uibModalInstance){
                    $scope.title="操作确认";
                    $scope.text="确认删除该户型吗？";
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
                housestyleService.deleteHousestyle(houseStyleId,function(data){
                    if(data != null) {
                        for(var i=0;i<$scope.housestyle_data.length;i++) {
                            if($scope.housestyle_data[i].id == houseStyleId) {
                                //刷新户型页面
                                $scope.housestyle_data.splice(i,1);
                                break;
                            }
                        }
                    }
                });
            });
        }
        //批量删除户型
        $scope.getSelects = function() {
            var selects = [];
            for(var i=0;i<$scope.housestyle_data.length;i++) {
                if($scope.housestyle_data[i].$isselected) {
                    selects.push($scope.housestyle_data[i]);
                }
            }
            return selects;
        };
        $scope.deleteHousestyles = deleteHousestyles;
        function deleteHousestyles() {
            if($scope.getSelects().length == 0) {
                console.log("还没选择需要删除的户型");
                return;
            }
            var promitInstance = $uibModal.open({
                animation: true,
                templateUrl: 'system/common/promit.html',
                controller: function($scope,$uibModalInstance){
                    $scope.title="操作确认";
                    $scope.text="确认删除该户型吗？";
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
                var deletedHousestyleId = [];
                for(var i=0;i<$scope.housestyle_data.length;i++) {
                    if($scope.housestyle_data[i].$isselected) {
                        housestyleService.deleteHousestyle($scope.housestyle_data[i].id,function(data,houseStyleId){
                            if(data!=null) {
                                deletedHousestyleId.push(houseStyleId);
                                for(var k=0;k<$scope.housestyle_data.length;k++) {
                                    for(var j=0;j<deletedHousestyleId.length;j++) {
                                        if($scope.housestyle_data[k].id == deletedHousestyleId[j]) {
                                            $scope.housestyle_data.splice(k,1);
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
        //显示详情
        $scope.toHousestyleItem = toHousestyleItem;
        function toHousestyleItem(housestyle) {
            housestyleInstance.modify = housestyle;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'dynamicboard/housestyle/housestyleItem.html',
                controller: 'housestyleItemController',
                bindToController: true,
                size: "lg",
                backdrop: false
            });
            modalInstance.result.then(function() {
                //修改保存成功
                console.log("正常关闭修改户型模态框");
            }, function() {
                console.log("取消修改户型");
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
            $scope.form.hsPicture = $scope.image.file;
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
    housestyleModule.controller("updateHousestyleController",["$scope","housestyleService","$uibModalInstance","housestyleInstance",function($scope,housestyleService,$uibModalInstance,housestyleInstance){
        $scope.pagetitle = "修改户型";
        $scope.premise_names = [];
        housestyleService.getAllPremise(function (data) {
            $scope.premise_data=data;
            for (var i=0;i<$scope.premise_data.length;i++){
                $scope.premise_names.push($scope.premise_data[i].premiseName);
            }
        });
        $scope.form = housestyleInstance.modify;
        console.log($scope.form);
        //保存修改
        $scope.save = function save() {
            $scope.form.hsPicture = $scope.image.file;
            console.log($scope.form);//所需的数据
            housestyleService.updateHousestyle($scope.form,function(data) {
                if(data != null) {
                    console.log("修改成功");
                    $uibModalInstance.close(data);
                } else {
                    console.log("修改失败");
                    $scope.error = {
                        haserror: true,
                        errormsg: "修改失败，您可以再试一次！"
                    }
                }
            });
        };
        //取消修改
        $scope.cancel = function cancel(){
            $uibModalInstance.dismiss('cancel');
        }
    }]);
    housestyleModule.controller("housestyleItemController",["$scope","housestyleService","$uibModalInstance","housestyleInstance",function($scope,housestyleService,$uibModalInstance,housestyleInstance){
        $scope.pagetitle = "户型详情";
        $scope.form = housestyleInstance.modify;
        $scope.save = function save() {
            $uibModalInstance.dismiss('cancel');
        };
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
        //修改户型
        this.updateHousestyle = function (housestyle,callback) {
            $http({
                url:"/housestyle/updateHouseStyle",
                method:"POST",
                data:housestyle
            }).then(function (response) {
                callback(response.data.data);
                console.log(response.data.data);
            });
        };
        //删除当前户型
        this.deleteHousestyle = function (houseStyleId,callback) {
            $http({
                url:"/housestyle/deleteHouseStyle/"+houseStyleId,
                method:"DELETE",
                data:{
                    id:houseStyleId
                }
            }).then(function (response) {
                callback(response.data,houseStyleId);
                console.log(response.data,houseStyleId);
            });
        };
    }]);
    housestyleModule.directive("imagepreview",[function(){
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    console.log("changeEvent",changeEvent);
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                            //scope.fileinfo=changeEvent.target.files[0];
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);
})();