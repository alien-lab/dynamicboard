/**
 * Created by Administrator on 2017/3/3.
 */
(function () {
    'use strict';
    var buildingModule = angular.module("dynamicboard.building", ['ui.router']);
    buildingModule.factory("buildingInstance", function () {
        return {}
    });
    buildingModule.config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('dynamicboard.building', {
            url: '/building',
            title: '动态销控楼栋管理',
            templateUrl: "dynamicboard/building/building.html",
            controller: "buildingController"
        });
    }]);
    buildingModule.value("buildingValue", {"thisPage": ""}, {"premiseName": ""});
    buildingModule.controller("buildingController", ["$scope", "buildingService", "buildingInstance", "$uibModal", "buildingValue", "$cookieStore", function ($scope, buildingService, buildingInstance, $uibModal, buildingValue, $cookieStore) {
        $scope.user = $cookieStore.get("staff");
        $scope.building_data = [];
        $scope.building_data.content = [];
        $scope.premiseName = "所有";
        buildingValue.premiseName = "所有";//初始值
        // $scope.page=true;
        //显示所有楼栋（不分页）
        // buildingService.getAllBuilding(function (data) {
        //     $scope.building_data=data;
        //     console.log(data);
        // });
        //判断登录者的身份
        $scope.ifAdmin = ifAdmin;
        function ifAdmin() {
            if ($scope.user.staffGarde > 4) {//此时管理员登录
                loadAllData(0, 5);//可以看到所有楼盘的楼栋
            } else {//其余人登录
                loadData($scope.user.premise.premiseName, 0, 5);//只能看到自己楼盘楼栋
            }
        }

        ifAdmin();
        //获得所有楼盘（admin用）
        buildingService.getAllPremise(function (data) {
            $scope.premises = data;
        });
        //分页显示所有楼栋（admin用）
        $scope.loadAllData = loadAllData;
        function loadAllData(index, size) {
            if (index > 0 && index < $scope.building_data.totalPages) {
                buildingService.getBuildingPage(index, size, function (data) {
                    $scope.building_data = data;
                    // if ($scope.building_data.content.length==0){
                    //     $scope.page=false;
                    // }else {
                    //     $scope.page=true;
                    // }
                    buildingValue.thisPage = $scope.building_data.number;
                    $scope.$isselectall = false;
                });
            } else if (index == 0) {
                buildingService.getBuildingPage(index, size, function (data) {
                    $scope.building_data = data;
                    // if ($scope.building_data.content.length==0){
                    //     $scope.page=false;
                    // }else {
                    //     $scope.page=true;
                    // }
                    buildingValue.thisPage = $scope.building_data.number;
                    $scope.$isselectall = false;
                });
            }
        }

        //分页显示指定楼盘的楼栋
        $scope.loadData = loadData;
        function loadData(premiseName, index, size) {
            if (index > 0 && index < $scope.building_data.totalPages) {
                buildingService.getBuildingByPremisePage(premiseName, index, size, function (data) {
                    $scope.building_data = data;
                    // if ($scope.building_data.content.length==0){
                    //     $scope.page=false;
                    // }else {
                    //     $scope.page=true;
                    // }
                    buildingValue.thisPage = $scope.building_data.number;
                    $scope.$isselectall = false;
                });
            } else if (index == 0) {
                buildingService.getBuildingByPremisePage(premiseName, index, size, function (data) {
                    $scope.building_data = data;
                    // if ($scope.building_data.content.length==0){
                    //     $scope.page=false;
                    // }else{
                    //     $scope.page=true;
                    // }
                    buildingValue.thisPage = $scope.building_data.number;
                    $scope.$isselectall = false;
                });
            }
        }

        //premise的ng-change事件（admin用）
        $scope.premiseChanged = premiseChanged;
        function premiseChanged(premiseName) {
            buildingValue.premiseName = premiseName;
            if (premiseName == "所有") {
                loadAllData(0, 5);
            } else {
                loadData(premiseName, 0, 5);
            }
        }

        //上一页，下一页
        $scope.changePage = changePage;
        function changePage(index, size) {
            if ($scope.user.staffGarde > 4) {//admin
                if (buildingValue.premiseName == "所有") {
                    loadAllData(index, size);
                } else {
                    loadData(buildingValue.premiseName, index, size);
                }
            } else {//其余
                loadData($scope.user.premise.premiseName, index, size);
            }
        }

        //全选当前页数据
        $scope.selectAll = function selectAll() {
            for (var i = 0; i < $scope.building_data.content.length; i++) {
                if ($scope.$isselectall) {
                    $scope.building_data.content[i].$isselected = true;
                } else {
                    $scope.building_data.content[i].$isselected = false;
                }
            }
        };
        //添加楼栋模态框
        $scope.showAddBuilding = showAddBuilding;
        function showAddBuilding() {
            if ($scope.user.staffGarde < 3) {//不满足权限要求
                var promitInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'system/common/warning.html',
                    controller: function ($scope, $uibModalInstance) {
                        $scope.title = "警告";
                        $scope.text = "您没有权限访问该操作";
                        $scope.save = function () {
                            $uibModalInstance.close("ok");
                        };
                    },
                    size: "sm",
                    backdrop: true
                });
            } else {//满足权限要求
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'dynamicboard/building/addBuilding.html',
                    controller: 'addBuildingController',
                    bindToController: true,
                    size: "lg",
                    backdrop: false
                });
                modalInstance.result.then(function (data) {
                    //添加保存成功
                    console.log("正常关闭添加楼栋模态框");
                    // var building = data;
                    // $scope.building_data.push(building);
                    if ($scope.user.staffGarde > 4) {//admin
                        if (buildingValue.premiseName == "所有") {
                            loadAllData(buildingValue.thisPage, 5);
                        } else {
                            loadData(buildingValue.premiseName, buildingValue.thisPage, 5);
                        }
                    } else {//其余
                        loadData($scope.user.premise.premiseName, buildingValue.thisPage, 5);
                    }
                }, function () {
                    console.log("取消添加楼栋");
                })
            }
        }

        //修改楼栋模态框
        $scope.showUpdateBuilding = showUpdateBuilding;
        function showUpdateBuilding(building) {
            if ($scope.user.staffGarde < 3) {//不满足权限要求
                var promitInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'system/common/warning.html',
                    controller: function ($scope, $uibModalInstance) {
                        $scope.title = "警告";
                        $scope.text = "您没有权限访问该操作";
                        $scope.save = function () {
                            $uibModalInstance.close("ok");
                        };
                    },
                    size: "sm",
                    backdrop: true
                });
            } else {//满足权限要求
                buildingInstance.modify = building;
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'dynamicboard/building/updateBuilding.html',
                    controller: 'updateBuildingController',
                    bindToController: true,
                    size: "lg",
                    backdrop: false
                });
                modalInstance.result.then(function () {
                    //修改保存成功
                    console.log("正常关闭修改楼栋模态框");
                }, function () {
                    console.log("取消修改楼栋");
                })
            }
        }

        //删除当前楼栋
        $scope.deleteBuilding = deleteBuilding;
        function deleteBuilding(buildingId) {
            if ($scope.user.staffGarde < 3) {//不满足权限要求
                var promitInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'system/common/warning.html',
                    controller: function ($scope, $uibModalInstance) {
                        $scope.title = "警告";
                        $scope.text = "您没有权限访问该操作";
                        $scope.save = function () {
                            $uibModalInstance.close("ok");
                        };
                    },
                    size: "sm",
                    backdrop: true
                });
            } else {//满足权限要求
                var promitInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'system/common/promit.html',
                    controller: function ($scope, $uibModalInstance) {
                        $scope.title = "操作确认";
                        $scope.text = "确认删除该楼栋吗？";
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.save = function () {
                            $uibModalInstance.close("ok");
                        };
                    },
                    backdrop: true
                });
                promitInstance.result.then(function () {
                    buildingService.deleteBuilding(buildingId, function (data) {
                        if (data != null) {
                            // for(var i=0;i<$scope.building_data.length;i++) {
                            //     if($scope.building_data[i].id == buildingId) {
                            //         //刷新楼栋页面
                            //         $scope.building_data.splice(i,1);
                            //         break;
                            //     }
                            // }
                            if ($scope.user.staffGarde > 4) {//admin
                                if (buildingValue.premiseName == "所有") {
                                    loadAllData(buildingValue.thisPage, 5);
                                } else {
                                    loadData(buildingValue.premiseName, buildingValue.thisPage, 5);
                                }
                            } else {//其余
                                loadData($scope.user.premise.premiseName, buildingValue.thisPage, 5);
                            }
                        }
                    });
                });
            }
        }

        //批量删除楼栋
        $scope.getSelects = function () {
            var selects = [];
            for (var i = 0; i < $scope.building_data.content.length; i++) {
                if ($scope.building_data.content[i].$isselected) {
                    selects.push($scope.building_data.content[i]);
                }
            }
            return selects;
        };
        $scope.deleteBuildings = deleteBuildings;
        function deleteBuildings() {
            if ($scope.user.staffGarde < 3) {//不满足权限要求
                var promitInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'system/common/warning.html',
                    controller: function ($scope, $uibModalInstance) {
                        $scope.title = "警告";
                        $scope.text = "您没有权限访问该操作";
                        $scope.save = function () {
                            $uibModalInstance.close("ok");
                        };
                    },
                    size: "sm",
                    backdrop: true
                });
            } else {//满足权限要求
                if ($scope.getSelects().length == 0) {
                    console.log("还没选择需要删除的楼栋");
                    return;
                }
                var promitInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'system/common/promit.html',
                    controller: function ($scope, $uibModalInstance) {
                        $scope.title = "操作确认";
                        $scope.text = "确认删除这些楼栋吗？";
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.save = function () {
                            $uibModalInstance.close("ok");
                        };
                    },
                    backdrop: true
                });
                promitInstance.result.then(function () {
                    for (var i = 0; i < $scope.building_data.content.length; i++) {
                        if ($scope.building_data.content[i].$isselected) {
                            buildingService.deleteBuilding($scope.building_data.content[i].id, function (data) {
                                if (data != null) {
                                    if ($scope.user.staffGarde > 4) {//admin
                                        if (buildingValue.premiseName == "所有") {
                                            loadAllData(buildingValue.thisPage, 5);
                                        } else {
                                            loadData(buildingValue.premiseName, buildingValue.thisPage, 5);
                                        }
                                    } else {//其余
                                        loadData($scope.user.premise.premiseName, buildingValue.thisPage, 5);
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    }]);
    buildingModule.controller("addBuildingController", ["$scope", "buildingService", "$uibModalInstance", function ($scope, buildingService, $uibModalInstance) {
        $scope.pagetitle = "添加楼栋";
        $scope.building_statuss = ["已售罄", "未开盘", "热卖中"];
        $scope.premise_names = [];
        buildingService.getAllPremise(function (data) {
            $scope.premise_data = data;
            for (var i = 0; i < $scope.premise_data.length; i++) {
                $scope.premise_names.push($scope.premise_data[i].premiseName);
            }
        });
        //保存添加
        $scope.save = function save() {
            if ($scope.user.staffGarde > 4) {
                buildingService.getByPremiseName($scope.form.premise.premiseName, function (data) {
                    $scope.premise = data;
                    $scope.form.premise = $scope.premise;
                });
            } else if ($scope.user.staffGarde < 5) {
                $scope.form.premise = $scope.user.premise;
            }
            console.log($scope.form);//所需的数据
            buildingService.addBuilding($scope.form, function (data) {
                if (data != null) {
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
        $scope.cancel = function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }]);
    buildingModule.controller("updateBuildingController", ["$scope", "buildingService", "$uibModalInstance", "buildingInstance", "$uibModal", function ($scope, buildingService, $uibModalInstance, buildingInstance, $uibModal) {
        $scope.pagetitle = "修改楼栋信息";
        $scope.building_statuss = ["已售罄", "未开盘", "热卖中"];
        $scope.premise_names = [];
        buildingService.getAllPremise(function (data) {
            $scope.premise_data = data;
            for (var i = 0; i < $scope.premise_data.length; i++) {
                $scope.premise_names.push($scope.premise_data[i].premiseName);
            }
        });
        $scope.form = buildingInstance.modify;
        var oldForm = angular.copy($scope.form);
        //保存修改
        $scope.save = function save() {
            buildingService.getByPremiseName($scope.form.premise.premiseName, function (data) {
                $scope.premise = data;
                $scope.form.premise = $scope.premise;
            });
            if ($scope.form.premise == null) {
                $scope.form.premise = $scope.user.premise;
            }
            if ((oldForm.floorNu != $scope.form.floorNu) || (oldForm.unitNu != $scope.form.unitNu) || (oldForm.unitHouseNu != $scope.form.unitHouseNu)) {
                var promitInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'system/common/promit.html',
                    controller: function ($scope, $uibModalInstance) {
                        $scope.title = "操作确认";
                        $scope.text = "楼层数或单元数或单元户数有改动，确认修改会为您重新生成房源。";
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.save = function () {
                            $uibModalInstance.close("ok");
                        };
                    },
                    backdrop: true
                });
                promitInstance.result.then(function () {
                    buildingService.newUpdateBuilding($scope.form, function (data) {
                        console.log($scope.form);
                        if (data != null) {
                            $uibModalInstance.close(data);
                        } else {
                            $scope.error = {
                                haserror: true,
                                errormsg: "修改失败，您可以再试一次！"
                            }
                        }
                    });
                });
            } else {
                buildingService.oldUpdateBuilding($scope.form, function (data) {
                    console.log($scope.form);
                    if (data != null) {
                        $uibModalInstance.close(data);
                    } else {
                        $scope.error = {
                            haserror: true,
                            errormsg: "修改失败，您可以再试一次！"
                        }
                    }
                });
            }
        };
        //取消修改
        $scope.cancel = function cancel() {
            $scope.form.buildingName = oldForm.buildingName;
            $scope.form.buildingNo = oldForm.buildingNo;
            $scope.form.floorNu = oldForm.floorNu;
            $scope.form.unitNu = oldForm.unitNu;
            $scope.form.unitHouseNu = oldForm.unitHouseNu;
            $scope.form.buildingStatus = oldForm.buildingStatus;
            $scope.form.premise = oldForm.premise;
            $uibModalInstance.dismiss('cancel');
        }
    }]);
    buildingModule.service("buildingService", ["$http", function ($http) {
        //获取所有楼栋
        this.getAllBuilding = function (callback) {
            $http({
                url: '/building/getAll',
                method: 'GET'
            }).then(function (data) {
                callback(data.data.data);
            });
        };
        //获得所有楼盘
        this.getAllPremise = function (callback) {
            $http({
                url: '/premise/getAll',
                method: 'GET'
            }).then(function (response) {
                callback(response.data);
            });
        };
        //添加楼栋
        this.addBuilding = function (building, callback) {
            $http({
                url: "/building/addBuilding",
                method: "POST",
                data: building
            }).then(function (response) {
                callback(response.data.data);
            });
        };
        //新修改楼栋信息
        this.newUpdateBuilding = function (building, callback) {
            $http({
                url: "/building/newUpdateBuilding",
                method: "POST",
                data: building
            }).then(function (response) {
                callback(response.data.data);
            });
        };
        //旧修改楼栋信息
        this.oldUpdateBuilding = function (building, callback) {
            $http({
                url: "/building/oldUpdateBuilding",
                method: "POST",
                data: building
            }).then(function (response) {
                callback(response.data.data);
            });
        };
        //删除当前楼栋
        this.deleteBuilding = function (buildingId, callback) {
            $http({
                url: "/building/deleteBuilding/" + buildingId,
                method: "DELETE",
                data: {
                    id: buildingId
                }
            }).then(function (response) {
                callback(response.data, buildingId);
            });
        };
        //根据premiseName查询楼盘
        this.getByPremiseName = function (premiseName, callback) {
            $http({
                url: "/premise/getByPremiseName/" + premiseName,
                method: "GET",
                data: {
                    premiseName: premiseName
                }
            }).then(function (response) {
                callback(response.data);
            });
        };
        //分页查询所有楼栋
        this.getBuildingPage = function (index, size, callback) {
            $http({
                url: "/building/getBuildingPage/" + index + "-" + size,
                method: "GET",
                data: {
                    index: index,
                    size: size
                }
            }).then(function (response) {
                callback(response.data);
            });
        };
        //根据premise分页查询
        this.getBuildingByPremisePage = function (premiseName, index, size, callback) {
            $http({
                url: "/building/getBuildingByPremisePage/" + premiseName + "-" + index + "-" + size,
                method: "GET",
                data: {
                    premiseName: premiseName,
                    index: index,
                    size: size
                }
            }).then(function (response) {
                callback(response.data);
            });
        }
    }]);
})();