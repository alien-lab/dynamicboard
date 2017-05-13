/**
 * Created by 鸠小浅 on 2017/5/13.
 */
(function () {
    'use strict';
    var staffModule = angular.module("dynamicboard.staff", ['ui.router']);
    staffModule.factory("staffInstance", function () {
        return {}
    });
    staffModule.config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('dynamicboard.staff', {
            url: '/staff',
            title: '动态销控员工管理',
            templateUrl: "dynamicboard/staff/staff.html",
            controller: "staffController"
        });
    }]);
    staffModule.value("staffValue", {"thisPage": ""}, {"realLikeName": ""});
    staffModule.controller("staffController", ["$scope", "staffService", "$uibModal", "staffInstance", "staffValue", "$cookieStore", function ($scope, staffService, $uibModal, staffInstance, staffValue, $cookieStore) {
        $scope.user = $cookieStore.get("staff");
        $scope.staff_data = [];
        $scope.staff_data.content = [];
        $scope.premiseName = "所有";
        $scope.likeName = '';
        staffValue.realLikeName = '';//重置realLikeName的值
        //获得所有楼盘
        staffService.getAllPremise(function (data) {
            $scope.premises = data;
        });
        //staffGarde转化成staffPosition
        // $scope.toStaffPosition = function (data) {
        //     for (var i = 0; i < data.length; i++) {
        //         if (data[i].staffGarde == 1) {
        //             data[i].staffPosition = "销售员";
        //         } else if (data[i].staffGarde == 2) {
        //             data[i].staffPosition = "销控员";
        //         } else if (data[i].staffGarde == 3) {
        //             data[i].staffPosition = "经理";
        //         } else if (data[i].staffGarde == 4) {
        //             data[i].staffPosition = "总监";
        //         }
        //     }
        // };
        //所有staff的分页显示
        $scope.loadAllData = loadAllData;
        function loadAllData(index, size) {
            if (index > 0 && index < $scope.staff_data.totalPages) {
                staffService.getStaffPage(index, size, function (data) {
                    $scope.staff_data = data;
                    staffValue.thisPage = $scope.staff_data.number;
                    $scope.$isselectall = false;
                });
            } else if (index == 0) {
                staffService.getStaffPage(index, size, function (data) {
                    $scope.staff_data = data;
                    staffValue.thisPage = $scope.staff_data.number;
                    $scope.$isselectall = false;
                });
            }
        }

        loadAllData(0, 5);
        //分页显示指定楼盘的员工
        $scope.loadData = loadData;
        function loadData(premiseName, index, size) {
            if (index > 0 && index < $scope.staff_data.totalPages) {
                staffService.getStaffByPremisePage(premiseName, index, size, function (data) {
                    $scope.staff_data = data;
                    staffValue.thisPage = $scope.staff_data.number;
                    $scope.$isselectall = false;
                });
            } else if (index == 0) {
                staffService.getStaffByPremisePage(premiseName, index, size, function (data) {
                    $scope.staff_data = data;
                    staffValue.thisPage = $scope.staff_data.number;
                    $scope.$isselectall = false;
                });
            }
        }

        //模糊分页查staff
        $scope.getStaffByLikeNamePage = getStaffByLikeNamePage;
        function getStaffByLikeNamePage(likeName, index, size) {
            staffService.getStaffByLikeNamePage(likeName, index, size, function (data) {
                $scope.staff_data = data;
                staffValue.realLikeName = '';//重置realLikeName的值
                staffValue.thisPage = $scope.staff_data.number;
                $scope.$isselectall = false;
            })
        }

        //likeName是否为''
        $scope.ifLike = function () {
            staffValue.realLikeName = $scope.likeName;
            $scope.premiseName = "重置";//重置下拉框选项
            if (staffValue.realLikeName != "" && staffValue.realLikeName != null) {
                getStaffByLikeNamePage(staffValue.realLikeName, 0, 5);
            } else {
                $scope.premiseName = "所有";
                loadAllData(0, 5);
            }
        };

        //premise的ng-change事件
        $scope.premiseChanged = premiseChanged;
        function premiseChanged(premiseName) {
            $scope.likeName = '';//清空输入框likeName
            if ($scope.premiseName == "所有") {
                loadAllData(0, 5);
            } else {
                loadData(premiseName, 0, 5);
            }
        }

        //上一页，下一页
        $scope.changePage = changePage;
        function changePage(index, size) {
            if ($scope.premiseName == "所有" && staffValue.realLikeName == '') {//情况1:所有+""
                loadAllData(index, size);
            } else if ($scope.premiseName == "所有" && staffValue.realLikeName != '') {//情况2:所有+随意
                getStaffByLikeNamePage(staffValue.realLikeName, index, size);
            } else {//情况3:随意+""
                loadData($scope.premiseName, index, size);
            }
        }

        //全选当前页数据
        $scope.selectAll = function selectAll() {
            for (var i = 0; i < $scope.staff_data.content.length; i++) {
                if ($scope.$isselectall) {
                    $scope.staff_data.content[i].$isselected = true;
                } else {
                    $scope.staff_data.content[i].$isselected = false;
                }
            }
        };
        //修改员工状态
        $scope.updateStaffStatus = updateStaffStatus;
        function updateStaffStatus(staff) {
            if ($scope.user.staffGarde < 3) {
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
            } else {
                if (staff.staffStatus == "1") {
                    staff.staffStatus = "0";
                } else {
                    staff.staffStatus = "1"
                }
                staffService.updateStaffStatus(staff, function (data) {
                    if (data != null) {
                        console.log("操作成功");
                    }
                })
            }
        }

        //获取ng-class返回值
        $scope.setBtnColor = setBtnColor;
        function setBtnColor(staffStatus) {
            if (staffStatus == "1") {
                return "mb-sm btn btn-danger";
            } else if (staffStatus == "0") {
                return "mb-sm btn btn-primary";
            }
        }
    }]);

    staffModule.service("staffService", ["$http", function ($http) {
        //获得所有楼盘
        this.getAllPremise = function (callback) {
            $http({
                url: '/premise/getAll',
                method: 'GET'
            }).then(function (response) {
                callback(response.data);
            });
        };
        //分页获取所有staff
        this.getStaffPage = function (index, size, callback) {
            $http({
                url: '/staff/findStaffPage/' + index + '-' + size,
                method: 'GET'
            }).then(function (response) {
                callback(response.data);
            });
        };
        //根据premiseName分页获取所有staff
        this.getStaffByPremisePage = function (premiseName, index, size, callback) {
            $http({
                url: '/staff/findStaffByPremisePage/' + premiseName + '-' + index + '-' + size,
                method: 'GET'
            }).then(function (response) {
                callback(response.data);
            })
        };
        //根据likeName分页获取所有staff
        this.getStaffByLikeNamePage = function (likeName, index, size, callback) {
            $http({
                url: '/staff/findByLikeNamePage/' + likeName + '-' + index + '-' + size,
                method: 'GET'
            }).then(function (response) {
                callback(response.data);
            });
        };
        this.updateStaffStatus = function (staff, callback) {
            $http({
                url: "/staff/updateStaffStatus",
                method: "POST",
                data: staff
            }).then(function (response) {
                callback(response.data.data);
            });
        };
    }]);
})();