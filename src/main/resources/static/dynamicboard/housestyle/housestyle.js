/**
 * Created by Administrator on 2017/3/3.
 */
(function () {
    'use strict';
    var housestyleModule = angular.module("dynamicboard.housestyle", ['ui.router']);
    housestyleModule.factory("housestyleInstance", function () {
        return {}
    });
    housestyleModule.config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('dynamicboard.housestyle', {
            url: '/housestyle',
            title: '动态销控户型管理',
            templateUrl: "dynamicboard/housestyle/housestyle.html",
            controller: "housestyleController"
        });
    }]);
    housestyleModule.value("housestyleValue", {"thisPage": ""}, {"premiseName": ""});
    housestyleModule.controller("housestyleController", ["$scope", "housestyleService", "$uibModal", "housestyleInstance", "housestyleValue", "$cookieStore", function ($scope, housestyleService, $uibModal, housestyleInstance, housestyleValue, $cookieStore) {
        $scope.user = $cookieStore.get("staff");
        $scope.image = null;//当前图片
        $scope.housestyle_data = [];
        $scope.housestyle_data.content = [];
        $scope.premiseName = "所有";
        housestyleValue.premiseName = "所有";//初始值
        // $scope.page=true;
        //显示所有户型（不分页）
        // housestyleService.getAllHousestyle(function (data) {
        //     $scope.housestyle_data=data;
        //     console.log(data);
        // });

        //判断登录者的身份
        $scope.ifAdmin = ifAdmin;
        function ifAdmin() {
            if ($scope.user.staffGarde > 4) {//此时管理员登录
                loadAllData(0, 5);//可以看到所有楼盘的户型
            } else {//其余人登录
                loadData($scope.user.premise.premiseName, 0, 5);//只能看到自己楼盘户型
            }
        }

        ifAdmin();

        //获得所有楼盘（admin用）
        housestyleService.getAllPremise(function (data) {
            $scope.premises = data;
        });
        //所有户型的分页显示（admin用）
        $scope.loadAllData = loadAllData;
        function loadAllData(index, size) {
            if (index > 0 && index < $scope.housestyle_data.totalPages) {
                housestyleService.getHouseStylePage(index, size, function (data) {
                    $scope.housestyle_data = data;
                    housestyleValue.thisPage = $scope.housestyle_data.number;
                    $scope.$isselectall = false;
                    // if ($scope.housestyle_data.content.length==0){
                    //     $scope.page=false;
                    // }else {
                    //     $scope.page=true;
                    // }
                });
            } else if (index == 0) {
                housestyleService.getHouseStylePage(index, size, function (data) {
                    $scope.housestyle_data = data;
                    housestyleValue.thisPage = $scope.housestyle_data.number;
                    $scope.$isselectall = false;
                    // if ($scope.housestyle_data.content.length==0){
                    //     $scope.page=false;
                    // }else {
                    //     $scope.page=true;
                    // }
                });
            }
        }

        //分页显示指定楼盘的户型
        $scope.loadData = loadData;
        function loadData(premiseName, index, size) {
            if (index > 0 && index < $scope.housestyle_data.totalPages) {
                housestyleService.getHouseStyleByPremisePage(premiseName, index, size, function (data) {
                    $scope.housestyle_data = data;
                    housestyleValue.thisPage = $scope.housestyle_data.number;
                    $scope.$isselectall = false;
                    // if ($scope.housestyle_data.content.length==0){
                    //     $scope.page=false;
                    // }else {
                    //     $scope.page=true;
                    // }
                });
            } else if (index == 0) {
                housestyleService.getHouseStyleByPremisePage(premiseName, index, size, function (data) {
                    $scope.housestyle_data = data;
                    housestyleValue.thisPage = $scope.housestyle_data.number;
                    $scope.$isselectall = false;
                    // if ($scope.housestyle_data.content.length==0){
                    //     $scope.page=false;
                    // }else{
                    //     $scope.page=true;
                    // }
                });
            }
        }

        //premise的ng-change事件（admin登录才显示）
        $scope.premiseChanged = premiseChanged;
        function premiseChanged(premiseName) {
            housestyleValue.premiseName = premiseName;
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
                if (housestyleValue.premiseName == "所有") {
                    loadAllData(index, size);
                } else {
                    loadData(housestyleValue.premiseName, index, size);
                }
            } else {//其余
                loadData($scope.user.premise.premiseName, index, size);
            }
        }

        //全选当前页数据
        $scope.selectAll = function selectAll() {
            for (var i = 0; i < $scope.housestyle_data.content.length; i++) {
                if ($scope.$isselectall) {
                    $scope.housestyle_data.content[i].$isselected = true;
                } else {
                    $scope.housestyle_data.content[i].$isselected = false;
                }
            }
        };
        //添加户型模态框
        $scope.showAddHousestyle = showAddHousestyle;
        function showAddHousestyle() {
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
                // var housestyle = data;
                // $scope.housestyle_data.push(housestyle);
                if ($scope.user.staffGarde > 4) {//admin
                    if (housestyleValue.premiseName == "所有") {
                        loadAllData(housestyleValue.thisPage, 5);
                    } else {
                        loadData(housestyleValue.premiseName, housestyleValue.thisPage, 5);
                    }
                } else {//其余
                    loadData($scope.user.premise.premiseName, housestyleValue.thisPage, 5);
                }
            }, function () {
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
            modalInstance.result.then(function () {
                //修改保存成功
                console.log("正常关闭修改户型模态框");
            }, function () {
                console.log("取消修改户型");
            })
        }

        //删除当前户型
        $scope.deleteHousestyle = deleteHousestyle;
        function deleteHousestyle(houseStyleId) {
            var promitInstance = $uibModal.open({
                animation: true,
                templateUrl: 'system/common/promit.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.title = "操作确认";
                    $scope.text = "确认删除该户型吗？";
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                    $scope.save = function () {
                        housestyleService.getHouseStyleById(houseStyleId, function (data) {
                            $scope.hsdata = data;
                            housestyleService.getHouseByHouseStyle($scope.hsdata.hsName, function (data) {
                                $scope.housedata = data;
                                if ($scope.housedata.length > 0) {
                                    var warningInstance = $uibModal.open({
                                        animation: true,
                                        templateUrl: 'system/common/warning.html',
                                        controller: function ($scope, $uibModalInstance) {
                                            $scope.title = "删除提醒";
                                            $scope.text = "该户型已被应用暂不可删除";
                                            $scope.save = function () {
                                                $uibModalInstance.close("ok");
                                            };
                                        },
                                        backdrop: true
                                    });
                                    warningInstance.result.then(function () {
                                        $uibModalInstance.dismiss('cancel');
                                    });
                                } else {
                                    $uibModalInstance.close("ok");
                                }
                            });
                        });
                    };
                },
                backdrop: true
            });
            promitInstance.result.then(function () {
                housestyleService.deleteHousestyle(houseStyleId, function (data) {
                    if (data != null) {
                        // for(var i=0;i<$scope.housestyle_data.length;i++) {
                        //     if($scope.housestyle_data[i].id == houseStyleId) {
                        //         //刷新户型页面
                        //         $scope.housestyle_data.splice(i,1);
                        //         break;
                        //     }
                        // }
                        if ($scope.user.staffGarde > 4) {//admin
                            if (housestyleValue.premiseName == "所有") {
                                loadAllData(housestyleValue.thisPage, 5);
                            } else {
                                loadData(housestyleValue.premiseName, housestyleValue.thisPage, 5);
                            }
                        } else {//其余
                            loadData($scope.user.premise.premiseName, housestyleValue.thisPage, 5);
                        }
                    }
                });
            });
        }

        //批量删除户型
        $scope.getSelects = function () {
            var selects = [];
            for (var i = 0; i < $scope.housestyle_data.content.length; i++) {
                if ($scope.housestyle_data.content[i].$isselected) {
                    selects.push($scope.housestyle_data.content[i]);
                }
            }
            return selects;
        };
        $scope.deleteHousestyles = deleteHousestyles;
        function deleteHousestyles() {
            if ($scope.getSelects().length == 0) {
                console.log("还没选择需要删除的户型");
                return;
            }
            var promitInstance = $uibModal.open({
                animation: true,
                templateUrl: 'system/common/promit.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.title = "操作确认";
                    $scope.text = "确认删除这些户型吗？";
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
                for (var i = 0; i < $scope.housestyle_data.content.length; i++) {
                    if ($scope.housestyle_data.content[i].$isselected) {
                        housestyleService.deleteHousestyle($scope.housestyle_data.content[i].id, function (data) {
                            if (data != null) {
                                // for(var k=0;k<$scope.housestyle_data.length;k++) {
                                //     for(var j=0;j<deletedHousestyleId.length;j++) {
                                //         if($scope.housestyle_data[k].id == deletedHousestyleId[j]) {
                                //             $scope.housestyle_data.splice(k,1);
                                //         }
                                //     }
                                // }
                                if ($scope.user.staffGarde > 4) {//admin
                                    if (housestyleValue.premiseName == "所有") {
                                        loadAllData(housestyleValue.thisPage, 5);
                                    } else {
                                        loadData(housestyleValue.premiseName, housestyleValue.thisPage, 5);
                                    }
                                } else {//其余
                                    loadData($scope.user.premise.premiseName, housestyleValue.thisPage, 5);
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
                backdrop: true
            });
            modalInstance.result.then(function () {
                //正常关闭模态框
            }, function () {
            })
        }
    }]);
    housestyleModule.controller("addHousestyleController", ["$scope", "housestyleService", "$uibModalInstance", function ($scope, housestyleService, $uibModalInstance) {
        $scope.pagetitle = "添加户型";
        $scope.premise_names = [];
        $scope.image = "app/img/addimage.jpg";
        housestyleService.getAllPremise(function (data) {
            $scope.premise_data = data;
            for (var i = 0; i < $scope.premise_data.length; i++) {
                $scope.premise_names.push($scope.premise_data[i].premiseName);
            }
        });
        //保存添加
        $scope.save = function save() {
            if ($scope.form.hsIntroduction == null || $scope.form.hsIntroduction == "") {
                $scope.form.hsIntroduction = "（待录入）";
            }
            if ($scope.image == "app/img/addimage.jpg") {
                $scope.form.hsPicture = "（待录入）";
            } else {
                $scope.form.hsPicture = $scope.image;
            }
            if ($scope.form.premise == null) {//非admin操作
                $scope.form.premise = $scope.user.premise.premiseName;
            }
            housestyleService.addHousestyle($scope.form, function (data) {
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
    housestyleModule.controller("updateHousestyleController", ["$scope", "housestyleService", "$uibModalInstance", "housestyleInstance", function ($scope, housestyleService, $uibModalInstance, housestyleInstance) {
        $scope.pagetitle = "修改户型";
        $scope.premise_names = [];
        $scope.image = "";
        housestyleService.getAllPremise(function (data) {
            $scope.premise_data = data;
            for (var i = 0; i < $scope.premise_data.length; i++) {
                $scope.premise_names.push($scope.premise_data[i].premiseName);
            }
        });
        $scope.form = housestyleInstance.modify;
        var oldForm = angular.copy($scope.form);
        if ($scope.form.hsIntroduction == "（待录入）") {
            $scope.form.hsIntroduction = null;
        }
        if ($scope.form.hsPicture == "（待录入）") {
            $scope.image = "app/img/addimage.jpg";
        } else {
            $scope.image = $scope.form.hsPicture;
        }
        if ($scope.form.premise == null) {
            $scope.form.premise = $scope.user.premise;
        }
        //保存修改
        $scope.save = function save() {
            if ($scope.form.hsIntroduction == null || $scope.form.hsIntroduction == "") {
                $scope.form.hsIntroduction = "（待录入）";
            }
            if ($scope.image == "app/img/addimage.jpg") {
                $scope.form.hsPicture = "（待录入）";
            } else {
                $scope.form.hsPicture = $scope.image;
            }
            console.log($scope.form);//所需的数据
            housestyleService.updateHousestyle($scope.form, function (data) {
                if (data != null) {
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
        $scope.cancel = function cancel() {
            $uibModalInstance.dismiss('cancel');
            $scope.form.hsName = oldForm.hsName;
            $scope.form.hsCode = oldForm.hsCode;
            $scope.form.hsSquare = oldForm.hsSquare;
            $scope.form.premise = oldForm.premise;
            $scope.form.hsIntroduction = oldForm.hsIntroduction;
            if ($scope.form.hsIntroduction == null || $scope.form.hsIntroduction == "") {
                $scope.form.hsIntroduction = "（待录入）";
            }
            if ($scope.form.hsPicture == null) {
                $scope.form.hsPicture = "（待录入）";
            }
        }
    }]);
    housestyleModule.controller("housestyleItemController", ["$scope", "housestyleService", "$uibModalInstance", "housestyleInstance", function ($scope, housestyleService, $uibModalInstance, housestyleInstance) {
        $scope.pagetitle = "户型详情";
        $scope.form = housestyleInstance.modify;
        console.log($scope.form.hsPicture);
        $scope.cancel = function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }]);
    housestyleModule.service("housestyleService", ["$http", function ($http) {
        //获得所有户型
        this.getAllHousestyle = function (callback) {
            $http({
                url: '/housestyle/getAll',
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
        //添加户型
        this.addHousestyle = function (housestyle, callback) {
            $http({
                url: "/housestyle/addHouseStyle",
                method: "POST",
                data: housestyle
            }).then(function (response) {
                callback(response.data.data);
            });
        };
        //修改户型
        this.updateHousestyle = function (housestyle, callback) {
            $http({
                url: "/housestyle/updateHouseStyle",
                method: "POST",
                data: housestyle
            }).then(function (response) {
                callback(response.data.data);
            });
        };
        //删除当前户型
        this.deleteHousestyle = function (houseStyleId, callback) {
            $http({
                url: "/housestyle/deleteHouseStyle/" + houseStyleId,
                method: "DELETE",
                data: {
                    id: houseStyleId
                }
            }).then(function (response) {
                callback(response.data, houseStyleId);
            });
        };
        //根据id查户型
        this.getHouseStyleById = function (houseStyleId, callback) {
            $http({
                url: "/housestyle/getById/" + houseStyleId,
                method: "GET",
                data: {
                    id: houseStyleId
                }
            }).then(function (response) {
                callback(response.data);
            });
        };
        //根据houseStyle查房源
        this.getHouseByHouseStyle = function (hsName, callback) {
            $http({
                url: "/house/getByHouseStyle/" + hsName,
                method: "GET",
                data: {
                    hsName: hsName
                }
            }).then(function (response) {
                callback(response.data);
            });
        };
        //分页查询所有户型
        this.getHouseStylePage = function (index, size, callback) {
            $http({
                url: "/housestyle/getHouseStylePage/" + index + "-" + size,
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
        this.getHouseStyleByPremisePage = function (premiseName, index, size, callback) {
            $http({
                url: "/housestyle/getHouseStyleByPremisePage/" + premiseName + "-" + index + "-" + size,
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
    housestyleModule.directive("imagepreview", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                console.log("参数scope", scope);
                console.log("参数element", element);
                console.log("参数attributes", attributes);
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    console.log("changeEvent", changeEvent);
                    reader.onload = function (loadEvent) {
                        console.log("loadEvent", loadEvent);
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                            console.log(scope.fileread);
                            //scope.fileinfo=changeEvent.target.files[0];
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);
})();