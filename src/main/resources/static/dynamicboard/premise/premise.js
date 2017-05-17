/**
 * Created by Administrator on 2017/2/23.
 */
(function () {
    'use strict';
    var premiseModule = angular.module("dynamicboard.premise", ['ui.router']);
    premiseModule.factory("premiseInstance", function () {
        return {}
    });
    premiseModule.config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('dynamicboard.premise', {
            url: '/premise',
            title: '动态销控楼盘管理',
            templateUrl: "dynamicboard/premise/premise.html",
            controller: "premiseController"
        });
    }]);
    premiseModule.value("premiseValue", {"thisPage": ""});
    premiseModule.controller("premiseController", ["$scope", "premiseService", "$uibModal", "premiseInstance", "premiseValue", "$cookieStore", function ($scope, premiseService, $uibModal, premiseInstance, premiseValue, $cookieStore) {
        $scope.user = $cookieStore.get("staff");
        $scope.pagetitle = "楼盘管理";
        $scope.premise_data = [];
        $scope.premise_data.content = [];
        //显示所有楼盘（不分页）
        // premiseService.getAllPremise(function (data) {
        //     $scope.premise_data=data;
        //     console.log(data);
        // });
        //所有premise的分页显示
        $scope.loadData = loadData;
        function loadData(index, size) {
            if (index > 0 && index < $scope.premise_data.totalPages) {
                premiseService.getPremisePage(index, size, function (data) {
                    $scope.premise_data = data;
                    premiseValue.thisPage = $scope.premise_data.number;
                    $scope.$isselectall = false;
                });
            } else if (index == 0) {
                premiseService.getPremisePage(index, size, function (data) {
                    $scope.premise_data = data;
                    premiseValue.thisPage = $scope.premise_data.number;
                    $scope.$isselectall = false;
                });
            }
        }

        loadData(0, 5);
        //全选当前页数据
        $scope.selectAll = function selectAll() {
            for (var i = 0; i < $scope.premise_data.content.length; i++) {
                if ($scope.$isselectall) {
                    $scope.premise_data.content[i].$isselected = true;
                } else {
                    $scope.premise_data.content[i].$isselected = false;
                }
            }
        };
        //添加楼盘模态框
        $scope.showAddPremise = showAddPremise;
        function showAddPremise() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'dynamicboard/premise/addPremise.html',
                controller: 'addPremiseController',
                bindToController: true,
                size: "lg",
                backdrop: false
            });
            modalInstance.result.then(function (data) {
                //添加保存成功
                console.log("正常关闭添加楼盘模态框");
                // var premise = data;
                // $scope.premise_data.push(premise);
                if (data != null) {
                    loadData(premiseValue.thisPage, 5);
                } else {
                    console.log("未执行loadData");
                }
            }, function () {
                console.log("取消添加楼盘");
            })
        }

        //修改楼盘模态框
        $scope.showUpdatePremise = showUpdatePremise;
        function showUpdatePremise(premise) {
            premiseInstance.modify = premise;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'dynamicboard/premise/updatePremise.html',
                controller: 'updatePremiseController',
                bindToController: true,
                size: "lg",
                backdrop: false
            });
            modalInstance.result.then(function () {
                //修改保存成功
                console.log("正常关闭修改楼盘模态框");
            }, function () {
                console.log("取消修改楼盘");
            })
        }

        //删除当前楼盘
        $scope.deletePremise = deletePremise;
        function deletePremise(premiseId) {
            var promitInstance = $uibModal.open({
                animation: true,
                templateUrl: 'system/common/promit.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.title = "操作确认";
                    $scope.text = "将一并删除该楼盘下的所有楼栋和户型，确认删除该楼盘吗？";
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
                premiseService.deletePremise(premiseId, function (data) {
                    if (data != null) {
                        // for(var i=0;i<$scope.premise_data.length;i++) {
                        //     if($scope.premise_data[i].id == premiseId) {
                        //         //刷新楼盘页面
                        //         $scope.premise_data.splice(i,1);
                        //         break;
                        //     }
                        // }
                        loadData(premiseValue.thisPage, 5);
                    }
                });
            });
        }

        //批量删除楼盘
        $scope.getSelects = function () {
            var selects = [];
            for (var i = 0; i < $scope.premise_data.content.length; i++) {
                if ($scope.premise_data.content[i].$isselected) {
                    selects.push($scope.premise_data.content[i]);
                }
            }
            return selects;
        };
        $scope.deletePremises = deletePremises;
        function deletePremises() {
            if ($scope.getSelects().length == 0) {
                console.log("还没选择需要删除的楼盘");
                return;
            }
            var promitInstance = $uibModal.open({
                animation: true,
                templateUrl: 'system/common/promit.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.title = "操作确认";
                    $scope.text = "将一并删除这些楼盘下的所有楼栋，确认删除这些楼盘吗？";
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
                var deletedPremiseId = [];
                for (var i = 0; i < $scope.premise_data.content.length; i++) {
                    if ($scope.premise_data.content[i].$isselected) {
                        premiseService.deletePremise($scope.premise_data.content[i].id, function (data, premiseId) {
                            if (data != null) {
                                deletedPremiseId.push(premiseId);
                                // for(var k=0;k<$scope.premise_data.length;k++) {
                                //     for(var j=0;j<deletedPremiseId.length;j++) {
                                //         if($scope.premise_data[k].id == deletedPremiseId[j]) {
                                //             $scope.premise_data.splice(k,1);
                                //         }
                                //     }
                                // }
                                loadData(premiseValue.thisPage, 5);
                            }
                        });
                    }
                }
            });
        }
    }]);
    premiseModule.controller("addPremiseController", ["$scope", "premiseService", "$uibModalInstance", function ($scope, premiseService, $uibModalInstance) {
        $scope.pagetitle = "添加楼盘";
        //保存添加
        $scope.save = function save() {
            $scope.form.buildingNu = 0;
            if ($scope.form.premiseFar == null) {
                $scope.form.premiseFar = 0;
            }
            if ($scope.form.premiseGsp == null) {
                $scope.form.premiseGsp = 0;
            }
            console.log($scope.form);//所需的数据
            premiseService.addPremise($scope.form, function (data) {
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
    premiseModule.controller("updatePremiseController", ["$scope", "premiseService", "$uibModalInstance", "premiseInstance", function ($scope, premiseService, $uibModalInstance, premiseInstance) {
        $scope.pagetitle = "修改楼盘信息";
        $scope.form = premiseInstance.modify;
        var oldForm = angular.copy($scope.form);
        //保存修改
        $scope.save = function save() {
            premiseService.updatePremise($scope.form, function (data) {
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
            $scope.form.premiseName = oldForm.premiseName;
            $scope.form.premiseAddress = oldForm.premiseAddress;
            $scope.form.premiseSquare = oldForm.premiseSquare;
            $scope.form.premiseFar = oldForm.premiseFar;
            $scope.form.premiseGsp = oldForm.premiseGsp;
            $scope.form.premisePhone = oldForm.premisePhone;
            $uibModalInstance.dismiss('cancel');
        }
    }]);
    premiseModule.service("premiseService", ["$http", function ($http) {
        //显示所有楼盘
        this.getAllPremise = function (callback) {
            $http({
                url: '/premise/getAll',
                method: 'GET'
            }).then(function (response) {
                callback(response.data);
            });
        };
        //添加楼盘
        this.addPremise = function (premise, callback) {
            $http({
                url: "/premise/addPremise",
                method: "POST",
                data: premise
            }).then(function (response) {
                callback(response.data.data);
            });
        };
        //修改楼盘信息
        this.updatePremise = function (premise, callback) {
            $http({
                url: "/premise/updatePremise",
                method: "POST",
                data: premise
            }).then(function (response) {
                callback(response.data.data);
            });
        };
        //删除当前楼盘
        this.deletePremise = function (premiseId, callback) {
            $http({
                url: "/premise/deletePremise/" + premiseId,
                method: "DELETE",
                data: {
                    id: premiseId
                }
            }).then(function (response) {
                callback(response.data, premiseId);
            });
        };
        this.getPremisePage = function (index, size, callback) {
            $http({
                url: "/premise/" + index + "-" + size,
                method: "GET",
                data: {
                    index: index,
                    size: size
                }
            }).then(function (response) {
                callback(response.data);
            });
        }
    }]);
})();