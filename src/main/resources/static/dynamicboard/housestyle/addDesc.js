/**
 * Created by Administrator on 2017/3/6.
 */
(function(){
    'use strict';
    var desc_module=angular.module("housestyle.desc",[]);
    desc_module.service("descService",['$http',function ($http) {

    }]);

    desc_module.directive("addDesc",["descService","$filter","$http",function(descService,$filter,$http){
        return {
            restrict: 'EA', //E = element, A = attribute, C = class, M = common
            scope: {
                model: '@', //选择模式
                descid: "=",  //被选中的产品
                item:"="
            },
            templateUrl: 'dynamicboard/housestyle/addDesc.html',
            link: function (scope, element, attr, ctrl) {
                scope.loading=false;//是否显示loading
                scope.image=null;//当前图片
                scope.$watch("image",function(newvalue,oldvalue){
                    if(scope.image!=null){
                        scope.type='image';
                    }
                },true);
                scope.type="unknow";
                if(scope.model!=null)scope.type=model;//如果已经指定了类型
                scope.chooseImage=function(){
                    scope.type="image";
                };
                scope.chooseText=function(){
                    scope.type="text";
                }
            }
        }
    }]);
    desc_module.directive("imagepreview1",[function(){
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