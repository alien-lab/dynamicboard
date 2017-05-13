/**
 * Created by Administrator on 2017/3/3.
 */
(function () {
    'use strict';
    var houseModule = angular.module("dynamicboard.house", ['ui.router']);
    houseModule.factory("houseInstance", function () {
        return {}
    });
    houseModule.config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('dynamicboard.house', {
            url: '/house',
            title: '动态销控房源管理',
            templateUrl: "dynamicboard/house/house.html",
            controller: "houseController"
        });
    }]);
    houseModule.value("houseValue", {"buildingName": ""}, {"premiseName": ""}, {"selects": ""}, {"selectsOld": ""}, {"houseStyles": ""});
    houseModule.controller("houseController", ["$scope", "houseService", "$uibModal", "houseInstance", "houseValue", "$cookieStore", function ($scope, houseService, $uibModal, houseInstance, houseValue, $cookieStore) {
        $scope.user = $cookieStore.get("staff");
        $scope.premiseName = "请选择楼盘";
        houseValue.premiseName = $scope.premiseName;
        $scope.buildingName = "请选择楼栋";
        houseValue.buildingName = $scope.buildingName;
        $scope.pagePremise = "yes";//是否存在楼盘
        $scope.pageBuilding = "yes";//是否存在楼栋
        $scope.selectedAll = "no";//是否已都选择
        $scope.editable = "no";//是否可编辑
        //获取所有楼盘
        houseService.getAllPremise(function (data) {
            $scope.allPremise = data;
            if ($scope.allPremise.length == 0) {
                $scope.pagePremise = "no";
            } else {
                $scope.pagePremise = "yes";
            }
        });
        //premise下拉框ng-change事件
        $scope.premiseChanged = premiseChanged;
        function premiseChanged(premiseName) {
            $scope.premiseName = premiseName;
            houseValue.premiseName = $scope.premiseName;
            $scope.buildingName = "请选择楼栋";
            houseValue.buildingName = $scope.buildingName;
            $scope.selectedAll = "no";
            $scope.house_data = [];
            if ($scope.premiseName != "请选择楼盘") {
                houseService.getBuildingByPremise($scope.premiseName, function (data) {
                    $scope.buildings = data;
                    if ($scope.buildings.length > 0) {
                        $scope.pageBuilding = "yes";
                    } else {
                        $scope.pageBuilding = "no";
                    }
                })
            } else {
                $scope.pageBuilding = "yes";
                $scope.buildings = [];
                $scope.house_data = [];
            }
        }

        //building下拉框ng-change事件
        $scope.buildingChanged = buildingChanged;
        function buildingChanged(buildingName) {
            $scope.editable = 'no';
            $scope.buildingName = buildingName;
            houseValue.buildingName = $scope.buildingName;
            if ($scope.buildingName != "请选择楼栋") {
                $scope.selectedAll = "yes";
                houseService.getByBuildingName($scope.buildingName, function (data) {
                    $scope.building = data;
                    $scope.premiseName = $scope.building.premise.premiseName;
                    houseValue.premiseName = $scope.premiseName;
                    houseService.getAllAsTable($scope.buildingName, function (data) {
                        $scope.house_data = data;
                        console.log($scope.premiseName + "-" + $scope.buildingName + "的房源数据：" + data);
                    });
                });
            } else {
                $scope.selectedAll = "no";
                $scope.house_data = [];
            }
        }

        //添加顶层房源模态框
        $scope.showAddHouse = showAddHouse;
        function showAddHouse() {
            if ($scope.user.staffGarde < 2) {//不满足权限要求
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
                    $scope.house_data.splice(0, 0, newHouses);//往json数组第一个元素位置添加newHouses数据
                    console.log($scope.house_data);
                }, function () {
                    console.log("取消添加房源");
                })
            }
        }

        //区别各种状态
        $scope.setStatusColor = setStatusColor;
        function setStatusColor(houseStatus) {
            if ("可售" == houseStatus) {
                return "saleable";
            } else if ("意向" == houseStatus) {
                return "intention";
            } else if ("认购" == houseStatus) {
                return "subscription";
            } else if ("成交" == houseStatus) {
                return "deal";
            } else if ("抵押" == houseStatus) {
                return "mortgage";
            } else if ("退房" == houseStatus) {
                return "out";
            } else if ("销控" == houseStatus) {
                return "saleCtrl";
            } else if ("选中" == houseStatus) {
                return "choose";
            } else {
                return "null";
            }
        }

        $scope.getSelects = function () {
            $scope.thisBuilding = $scope.house_data[0][0].building;
            $scope.floorNu = $scope.thisBuilding.floorNu;
            $scope.floorHouses = $scope.thisBuilding.unitNu * $scope.thisBuilding.unitHouseNu;
            $scope.selects = [];
            for (var i = 0; i < $scope.floorNu; i++) {
                for (var j = 0; j < $scope.floorHouses; j++) {
                    if ($scope.house_data[i][j].houseStatus == "选中") {
                        $scope.selects.push($scope.house_data[i][j]);
                    }
                }
            }
            return $scope.selects;
        };
        // $scope.getSelectsOld=function () {
        //     $scope.getSelects();
        //     console.log($scope.selects);
        //     houseValue.selectsOld = [];
        //     for (var i=0;i<$scope.selects.length;i++){
        //         houseService.getHouseById($scope.selects[i].id,function (data) {
        //             houseValue.selectsOld.push(data);
        //         })
        //     }
        // };
        //切换是否批量操作
        $scope.changeEdit = changeEdit;
        function changeEdit() {
            if ($scope.user.staffGarde < 2) {//不满足权限要求
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
                if ($scope.editable == 'no') {
                    $scope.editable = "yes";
                } else if ($scope.editable == 'yes') {
                    //判断是否存在被选中的，存在就取消选中
                    $scope.getSelects();
                    // $scope.getSelectsOld();
                    // console.log($scope.selects);
                    // console.log(houseValue.selectsOld);
                    if ($scope.selects.length > 0) {
                        console.log("存在被选中的没有被取消选中");
                        var promitInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'system/common/warning.html',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.title = "操作提示";
                                $scope.text = "存在被选中的没有被取消选中,请先取消选中";
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
                            // for (var i=0;i<$scope.selects.length;i++){
                            //     for (var j=0;j<houseValue.selectsOld.length;j++){
                            //         console.log($scope.selects[i].houseNo);
                            //         console.log(houseValue.selectsOld[j].houseNo);
                            //         if ($scope.selects[i].id==houseValue.selectsOld[j].id){
                            //             $scope.selects[i].houseStatus=houseValue.selectsOld[j].houseStatus;
                            //         }
                            //     }
                            // }
                            // $scope.editable="no";
                        });
                    } else {
                        console.log("不存在被选中的没有被取消选中");
                        $scope.editable = "no";
                    }
                }
            }
        }

        //修改房源模态框
        $scope.showUpdateHouse = showUpdateHouse;
        function showUpdateHouse(house) {
            if ($scope.user.staffGarde < 2) {//不满足权限要求

            } else {//满足权限要求
                houseInstance.modify = house;
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'dynamicboard/house/updateHouse.html',
                    controller: 'updateHouseController',
                    bindToController: true,
                    size: "lg",
                    backdrop: false
                });
                modalInstance.result.then(function () {
                    //修改保存成功
                    console.log("正常关闭修改房源模态框");
                }, function () {
                    console.log("取消修改房源");
                })
            }
        }

        //批量选择时状态切换
        $scope.selectHouses = selectHouses;
        function selectHouses(house) {
            if (house.houseStatus != "选中") {
                house.houseStatus = "选中";
            } else {
                houseService.getHouseById(house.id, function (data) {
                    var oldHouse = data;
                    house.houseStatus = oldHouse.houseStatus;
                });
            }
        }

        //批量删除房源
        $scope.deleteHouses = deleteHouses;
        function deleteHouses() {
            $scope.thisBuilding = $scope.house_data[0][0].building;
            $scope.floorNu = $scope.thisBuilding.floorNu;
            $scope.floorHouses = $scope.thisBuilding.unitNu * $scope.thisBuilding.unitHouseNu;
            var selects = [];
            for (var i = 0; i < $scope.floorNu; i++) {
                for (var j = 0; j < $scope.floorHouses; j++) {
                    if ($scope.house_data[i][j].houseStatus == "选中") {
                        selects.push($scope.house_data[i][j]);
                    }
                }
            }
            if (selects.length == 0) {
                console.log("还没选择需要删除的房源");
                return;
            }
            var promitInstance = $uibModal.open({
                animation: true,
                templateUrl: 'system/common/promit.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.title = "操作确认";
                    $scope.text = "确认删除选中的房源吗？";
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
                for (var i = 0; i < $scope.floorNu; i++) {
                    for (var j = 0; j < $scope.floorHouses; j++) {
                        if ($scope.house_data[i][j].houseStatus == "选中") {
                            $scope.house_data[i][j].houseStatus = "已删除";
                            houseService.updateHouse($scope.house_data[i][j], function (data) {
                                $scope.newHouse = data;
                            })
                        }
                    }
                }
            });
        }

        //批量修改房源户型
        $scope.showUpdateHouses = showUpdateHouses;
        function showUpdateHouses() {
            $scope.thisBuilding = $scope.house_data[0][0].building;
            $scope.floorNu = $scope.thisBuilding.floorNu;
            $scope.floorHouses = $scope.thisBuilding.unitNu * $scope.thisBuilding.unitHouseNu;
            var selects = [];
            for (var i = 0; i < $scope.floorNu; i++) {
                for (var j = 0; j < $scope.floorHouses; j++) {
                    if ($scope.house_data[i][j].houseStatus == "选中") {
                        selects.push($scope.house_data[i][j]);
                    }
                }
            }
            if (selects.length == 0) {
                console.log("还没选择需要修改的房源");
                return;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'dynamicboard/house/updateHouses.html',
                controller: 'updateHousesController',
                bindToController: true,
                size: "md",
                backdrop: false,
                resolve: {
                    selects: function () {
                        $scope.thisBuilding = $scope.house_data[0][0].building;
                        $scope.floorNu = $scope.thisBuilding.floorNu;
                        $scope.floorHouses = $scope.thisBuilding.unitNu * $scope.thisBuilding.unitHouseNu;
                        var selects = [];
                        for (var i = 0; i < $scope.floorNu; i++) {
                            for (var j = 0; j < $scope.floorHouses; j++) {
                                if ($scope.house_data[i][j].houseStatus == "选中") {
                                    selects.push($scope.house_data[i][j]);
                                }
                            }
                        }
                        return selects;
                    }
                }
            });
            modalInstance.result.then(function () {
                //修改保存成功
                console.log("正常关闭批量修改户型模态框");
            }, function () {
                console.log("取消批量修改户型");
            })
        }
    }]);
    houseModule.controller("addHouseController", ["$scope", "houseService", "$uibModalInstance", "houseValue", function ($scope, houseService, $uibModalInstance, houseValue) {
        $scope.pagetitle = "添加顶层房源";
        $scope.house_statuss = ["可售", "意向", "认购", "成交", "抵押", "退房", "销控"];
        $scope.buildingName = houseValue.buildingName;
        $scope.premiseName = houseValue.premiseName;
        console.log($scope.premiseName + "-" + $scope.buildingName);
        houseService.getHouseStyleByPremise($scope.premiseName, function (data) {
            $scope.housestyles = data;
        });
        houseService.getByBuildingName($scope.buildingName, function (data) {
            $scope.building = data;
        });
        //保存添加
        $scope.save = function save() {
            $scope.form.building = $scope.building;
            $scope.form.premise = $scope.building.premise;
            $scope.form.floorNo = $scope.building.floorNu + 1;
            houseService.getByHsName($scope.form.houseStyle, function (data) {
                $scope.houseStyle = data;
                $scope.form.houseStyle = $scope.houseStyle;
                $scope.form.houseSquare = $scope.form.houseStyle.hsSquare;
                $scope.form.totalPrice = $scope.form.unitPrice * $scope.form.houseSquare;
                console.log($scope.form);//所需的数据
                houseService.addHouse($scope.form, function (data) {
                    if (data != null) {
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
            });
        };
        //取消添加
        $scope.cancel = function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }]);
    houseModule.controller("updateHouseController", ["$scope", "houseService", "$uibModalInstance", "houseInstance", "$window", function ($scope, houseService, $uibModalInstance, houseInstance, $window) {
        $scope.pagetitle = "修改房源信息";
        $scope.house_statuss = ["可售", "意向", "认购", "成交", "抵押", "退房", "销控"];
        $scope.form = houseInstance.modify;
        houseService.getHouseStyleByPremise($scope.form.premise.premiseName, function (data) {
            $scope.housestyles = data;
            console.log($scope.housestyles);
        });
        //保存修改
        $scope.save = function save() {
            houseService.getByPremiseName($scope.form.premise.premiseName, function (data) {
                $scope.premise = data;
                $scope.form.premise = $scope.premise;
            });
            houseService.getByBuildingName($scope.form.building.buildingName, function (data) {
                $scope.building = data;
                $scope.form.building = $scope.building;
            });
            houseService.getByHsName($scope.form.houseStyle.hsName, function (data) {
                $scope.houseStyle = data;
                $scope.form.houseStyle = $scope.houseStyle;
                $scope.form.houseSquare = $scope.form.houseStyle.hsSquare;
                $scope.form.totalPrice = $scope.form.houseSquare * $scope.form.unitPrice;
                houseService.updateHouse($scope.form, function (data) {
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
        };
        //取消修改
        $scope.cancel = function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }]);
    houseModule.controller("updateHousesController", ["$scope", "houseService", "$uibModalInstance", "selects", "houseValue", function ($scope, houseService, $uibModalInstance, selects, houseValue) {
        $scope.pagetitle = "批量修改房源信息";
        $scope.house_statuss = ["可售", "意向", "认购", "成交", "抵押", "退房", "销控"];
        $scope.premiseName = houseValue.premiseName;
        houseValue.houseStyles = [];
        houseService.getHouseStyleByPremise($scope.premiseName, function (data) {
            $scope.housestyle_data = data;
            var houseStyles = data;
            for (i = 0; i < houseStyles.length; i++) {
                houseValue.houseStyles.push(houseStyles[i]);
            }
        });
        $scope.selects = selects;
        console.log($scope.selects);
        houseValue.selects = [];
        for (var i = 0; i < $scope.selects.length; i++) {
            houseService.getHouseById($scope.selects[i].id, function (data) {
                var oldHouse = data;
                houseValue.selects.push(oldHouse);
            });
        }
        //保存修改
        $scope.save = function save() {
            console.log(houseValue.selects);
            console.log(houseValue.houseStyles);
            if ($scope.form.houseStatus == null && $scope.form.unitPrice == null && $scope.form.houseStyle == null) {
                $uibModalInstance.dismiss('cancel');
            }
            if ($scope.form.houseStatus == null) {
                console.log("状态为空");
                for (var i = 0; i < $scope.selects.length; i++) {
                    for (var j = 0; j < houseValue.selects.length; j++) {
                        if ($scope.selects[i].id == houseValue.selects[j].id) {
                            $scope.selects[i].houseStatus = houseValue.selects[j].houseStatus;
                        }
                    }
                }
            } else {
                for (var i = 0; i < $scope.selects.length; i++) {
                    $scope.selects[i].houseStatus = $scope.form.houseStatus;
                }
            }
            if ($scope.form.unitPrice == null) {
                console.log("单价为空");
                for (var i = 0; i < $scope.selects.length; i++) {
                    for (var j = 0; j < houseValue.selects.length; j++) {
                        if ($scope.selects[i].id == houseValue.selects[j].id) {
                            $scope.selects[i].unitPrice = houseValue.selects[j].unitPrice;
                        }
                    }
                }
            } else {
                for (var i = 0; i < $scope.selects.length; i++) {
                    $scope.selects[i].unitPrice = $scope.form.unitPrice;
                }
            }
            if ($scope.form.houseStyle == null) {
                console.log("户型为空");
                for (var i = 0; i < $scope.selects.length; i++) {
                    for (var j = 0; j < houseValue.selects.length; j++) {
                        if ($scope.selects[i].id == houseValue.selects[j].id) {
                            $scope.selects[i].houseStyle = houseValue.selects[j].houseStyle;
                        }
                    }
                }
            } else {
                for (var i = 0; i < $scope.selects.length; i++) {
                    for (var j = 0; j < houseValue.houseStyles.length; j++) {
                        if (houseValue.houseStyles[j].hsName == $scope.form.houseStyle) {
                            $scope.selects[i].houseStyle = houseValue.houseStyles[j];
                        }
                    }
                }
            }
            for (var i = 0; i < $scope.selects.length; i++) {
                if ($scope.selects[i].houseStyle == null) {
                    $scope.selects[i].houseSquare = 0;
                } else {
                    $scope.selects[i].houseSquare = $scope.selects[i].houseStyle.hsSquare;
                }
                $scope.selects[i].totalPrice = $scope.selects[i].unitPrice * $scope.selects[i].houseSquare;
                houseService.updateHouse($scope.selects[i], function (data) {
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
            $uibModalInstance.dismiss('cancel');
        }
    }]);
    houseModule.service("houseService", ["$http", function ($http) {
        //获得所有房源
        this.getAllHouse = function (callback) {
            $http({
                url: '/house/getAll',
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
        //获取所有楼栋
        this.getAllBuilding = function (callback) {
            $http({
                url: '/building/getAll',
                method: 'GET'
            }).then(function (data) {
                callback(data.data.data);
            });
        };
        //获得所有户型
        this.getAllHousestyle = function (callback) {
            $http({
                url: '/housestyle/getAll',
                method: 'GET'
            }).then(function (data) {
                callback(data.data.data);
            });
        };
        //添加房源
        this.addHouse = function (house, callback) {
            $http({
                url: "/house/addHouse",
                method: "POST",
                data: house
            }).then(function (response) {
                callback(response.data.data);
            });
        };
        //修改房源信息
        this.updateHouse = function (house, callback) {
            $http({
                url: "/house/updateHouse",
                method: "POST",
                data: house
            }).then(function (response) {
                callback(response.data.data);
            });
        };
        //删除当前房源
        this.deleteHouse = function (houseId, callback) {
            $http({
                url: "/house/deleteHouse/" + houseId,
                method: "DELETE",
                data: {
                    id: houseId
                }
            }).then(function (response) {
                callback(response.data, houseId);
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
        //根据hsName查询户型
        this.getByHsName = function (hsName, callback) {
            $http({
                url: "/housestyle/getByHsName/" + hsName,
                method: "GET",
                data: {
                    hsName: hsName
                }
            }).then(function (response) {
                callback(response.data);
            });
        };
        //根据buildingName查询楼栋
        this.getByBuildingName = function (buildingName, callback) {
            $http({
                url: "/building/getByBuildingName/" + buildingName,
                method: "GET",
                data: {
                    buildingName: buildingName
                }
            }).then(function (response) {
                console.log(response.data);
                callback(response.data);
            });
        };
        //根据BuildingAndFloorNo查房源
        this.getAllAsTable = function (buildingName, callback) {
            $http({
                url: "/house/getAllAsTable/" + buildingName,
                method: "GET",
                data: {
                    buildingName: buildingName
                }
            }).then(function (response) {
                callback(response.data.data);
            });
        };
        //根据premise查building
        this.getBuildingByPremise = function (premiseName, callback) {
            $http({
                url: "/building/getByPremise/" + premiseName,
                method: "GET",
                data: {
                    premiseName: premiseName
                }
            }).then(function (response) {
                callback(response.data);
            });
        };
        //根据premise查houseStyle
        this.getHouseStyleByPremise = function (premiseName, callback) {
            $http({
                url: "/housestyle/getByPremise/" + premiseName,
                method: "GET",
                data: {
                    premiseName: premiseName
                }
            }).then(function (response) {
                callback(response.data);
            });
        };
        //根据building查house
        this.getByBuilding = function (buildingName, callback) {
            $http({
                url: "/house/getByBuilding/" + buildingName,
                method: "GET",
                data: {
                    buildingName: buildingName
                }
            }).then(function (response) {
                callback(response.data);
            });
        };
        //根据id查house
        this.getHouseById = function (houseId, callback) {
            $http({
                url: "/house/getHouseById/" + houseId,
                method: "GET",
                data: {
                    id: houseId
                }
            }).then(function (response) {
                callback(response.data)
            });
        }
    }]);
})();