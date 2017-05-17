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
    staffModule.value("staffValue", {"thisPage": ""}, {"realLikeName": ""}, {"premiseName": ""});
    staffModule.controller("staffController", ["$scope", "staffService", "$uibModal", "staffInstance", "staffValue", "$cookieStore", function ($scope, staffService, $uibModal, staffInstance, staffValue, $cookieStore) {
        $scope.user = $cookieStore.get("staff");
        $scope.staff_data = [];
        $scope.staff_data.content = [];
        $scope.premiseName = "所有";
        $scope.likeName = '';
        staffValue.realLikeName = '';//重置realLikeName的值
        staffValue.premiseName = "所有";
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
        //判断登录者的身份
        $scope.ifAdmin = ifAdmin;
        function ifAdmin() {
            if ($scope.user.staffGarde > 4) {//此时管理员登录
                loadAllData(0, 5);
            } else {//其余人登录
                loadData($scope.user.premise.premiseName, 0, 5);
            }
        }

        ifAdmin();

        //所有staff的分页显示（admin用）
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

        //模糊分页查所有staff（admin用）
        $scope.getStaffByLikeNamePage = getStaffByLikeNamePage;
        function getStaffByLikeNamePage(likeName, index, size) {
            staffService.getStaffByLikeNamePage(likeName, index, size, function (data) {
                $scope.staff_data = data;
                staffValue.realLikeName = '';//重置realLikeName的值
                staffValue.thisPage = $scope.staff_data.number;
                $scope.$isselectall = false;
            })
        }

        //模糊分页查对应楼盘的staff（其余用）
        $scope.findByLikeNamePremisePage = findByLikeNamePremisePage;
        function findByLikeNamePremisePage(likeName, premiseName, index, size) {
            staffService.findByLikeNamePremisePage(likeName, premiseName, index, size, function (data) {
                $scope.staff_data = data;
                staffValue.realLikeName = '';//重置realLikeName的值
                staffValue.thisPage = $scope.staff_data.number;
                $scope.$isselectall = false;
            })
        }

        //likeName是否为''
        $scope.ifLike = function () {
            staffValue.realLikeName = $scope.likeName;
            $scope.premiseName = "所有";//重置下拉框选项
            staffValue.premiseName = $scope.premiseName;
            if ($scope.user.staffGarde > 4) {//admin
                if (staffValue.realLikeName != "" && staffValue.realLikeName != null) {
                    getStaffByLikeNamePage(staffValue.realLikeName, 0, 5);
                } else {
                    loadAllData(0, 5);
                }
            } else {//其余
                if (staffValue.realLikeName != "" && staffValue.realLikeName != null) {
                    findByLikeNamePremisePage(staffValue.realLikeName, $scope.user.premise.premiseName, 0, 5);
                } else {
                    loadData($scope.user.premise.premiseName, 0, 5);
                }
            }
        };

        //premise的ng-change事件
        $scope.premiseChanged = premiseChanged;
        function premiseChanged(premiseName) {
            staffValue.premiseName = premiseName;
            $scope.likeName = '';//清空输入框likeName
            if (staffValue.premiseName == "所有") {
                loadAllData(0, 5);
            } else {
                loadData(premiseName, 0, 5);
            }
        }

        //上一页，下一页
        $scope.changePage = changePage;
        function changePage(index, size) {
            if ($scope.user.staffGarde > 4) {//admin
                if (staffValue.premiseName == "所有" && staffValue.realLikeName == '') {//情况1:所有+""
                    loadAllData(index, size);
                } else if (staffValue.premiseName == "所有" && staffValue.realLikeName != '') {//情况2:所有+随意
                    getStaffByLikeNamePage(staffValue.realLikeName, index, size);
                } else {//情况3:随意+""
                    loadData(staffValue.premiseName, index, size);
                }
            } else {//其余
                loadData($scope.user.premise.premiseName, index, size);
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

        //btn获取ng-class返回值
        $scope.setBtnColor = setBtnColor;
        function setBtnColor(staffStatus) {
            if (staffStatus == "1") {
                return "mb-sm btn btn-danger";
            } else if (staffStatus == "0") {
                return "mb-sm btn btn-primary";
            }
        }

        //匹配员工所在楼盘
        $scope.setStaffPremise = setStaffPremise;
        function setStaffPremise() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'dynamicboard/staff/setStaffPremise.html',
                controller: 'setStaffPremiseController',
                bindToController: true,
                size: "sm",
                backdrop: false
            });
            modalInstance.result.then(function (data) {
                //保存成功
                console.log("正常关闭模态框");
            }, function () {
                console.log("取消操作");
            })
        }

        //text获取ng-class返回值
        $scope.setTextColor = setTextColor;
        function setTextColor() {
            if ($scope.user.staffGarde > 3) {
                return "textBgColor";
            } else {
                return "";
            }
        }

        //判断是否总监以上等级
        $scope.ifHighGarde = ifHighGarde;
        function ifHighGarde(staff) {
            if ($scope.user.staffGarde > 3) {
                setStaffGarde(staff);
            } else {
                return "";
            }
        }

        //修改员工职务(等级)
        $scope.setStaffGarde = setStaffGarde;
        function setStaffGarde(staff) {
            staffInstance.modify = staff;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'dynamicboard/staff/setStaffGarde.html',
                controller: 'setStaffGardeController',
                bindToController: true,
                size: "sm",
                backdrop: false
            });
            modalInstance.result.then(function (data) {
                //保存成功
                console.log("正常关闭模态框");
            }, function () {
                console.log("取消操作");
            })
        }
    }]);
    //调整员工职务controller
    staffModule.controller("setStaffGardeController", ["$scope", "staffService", "staffInstance", "$uibModalInstance", function ($scope, staffService, staffInstance, $uibModalInstance) {
        $scope.staff = staffInstance.modify;
        if ($scope.staff.staffGarde == 1) {
            $scope.staff.position = "销售员";
        } else if ($scope.staff.staffGarde == 2) {
            $scope.staff.position = "销控员";
        } else if ($scope.staff.staffGarde == 3) {
            $scope.staff.position = "经理";
        }
        //保存修改
        $scope.positions = ["销售员", "销控员", "经理"];
        $scope.save = function save() {
            if ($scope.staff.position == "销售员") {
                $scope.staff.staffGarde = 1;
            } else if ($scope.staff.position == "销控员") {
                $scope.staff.staffGarde = 2;
            } else if ($scope.staff.position == "经理") {
                $scope.staff.staffGarde = 3;
            }
            staffService.setStaffPremiseOrGarde($scope.staff, function (data) {
                if (data != null) {
                    $uibModalInstance.close(data);
                } else {
                    $scope.error = {
                        haserror: true,
                        errormsg: "修改失败，您可以再试一次！"
                    }
                }
            });
        };
        //取消修改
        $scope.cancel = function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }]);
    //匹配员工所在楼盘controller
    staffModule.controller("setStaffPremiseController", ["$scope", "staffService", "staffInstance", "$uibModalInstance", function ($scope, staffService, staffInstance, $uibModalInstance) {
        $scope.staff = staffInstance.modify;
        //保存修改
        $scope.save = function save() {
            console.log($scope.staff);
            staffService.setStaffPremiseOrGarde($scope.staff, function (data) {
                console.log(data);
                if (data != null) {
                    $uibModalInstance.close(data);
                } else {
                    $scope.error = {
                        haserror: true,
                        errormsg: "修改失败，您可以再试一次！"
                    }
                }
            });
        };
        //取消修改
        $scope.cancel = function cancel() {
            $uibModalInstance.dismiss('cancel');
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
        //启用停用员工
        this.updateStaffStatus = function (staff, callback) {
            $http({
                url: "/staff/updateStaffStatus",
                method: "POST",
                data: staff
            }).then(function (response) {
                callback(response.data.data);
            });
        };
        //匹配员工所在楼盘
        this.setStaffPremiseOrGarde = function (staff, callback) {
            $http({
                url: "/staff/setStaffPremiseOrGarde",
                method: "POST",
                data: staff
            }).then(function (response) {
                callback(response.data.data);
            });
        };
        //根据staffName和premise分页模糊查
        this.findByLikeNamePremisePage = function (likeName, premiseName, index, size, callback) {
            $http({
                url: '/staff/findByLikeNamePremisePage/' + likeName + "-" + premiseName + '-' + index + '-' + size,
                method: 'GET'
            }).then(function (response) {
                callback(response.data);
            });
        }
    }]);
})();