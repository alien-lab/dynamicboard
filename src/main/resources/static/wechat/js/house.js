/**
 * Created by 橘 on 2017/5/1.
 */
(function(){
    var house=angular.module("house",["ui.router"]);
    house.config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
        function($stateProvider,$locationProvider,$urlRouterProvider){
            $urlRouterProvider.otherwise('/houselist');
            $stateProvider
                .state('houselist', {
                    url: '/houselist',
                    templateUrl: 'houselist.html',
                    controller: 'houseListController'
                })
                .state('houseboard', {
                    url: '/houseboard',
                    templateUrl: 'houseboard.html',
                    controller: 'houseBoardController'
                })
                .state('houseinfo', {
                    url: '/houseinfo',
                    templateUrl: 'houseinfo.html',
                    controller: 'houseInfoController'
                })
                ;
        }
    ]);

    house.service("houseService",[function(){
        this.loadHouseList=function(buildingName){

        }
        this.loadHouseBoard=function(houseNo){

        }
        this.loadDetail=function(no){

        }
    }]);
    // house.factory("houseResource",["$resource",function($resource){
    //     return $resource("/premise/getAll");
    // }]);
})();