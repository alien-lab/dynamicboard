/**
 * Created by juhuiguang on 2017/2/23.
 */
(function(){
    'use strict';
    var house=angular.module("house",[]);
    house.controller("testController",["$scope","$filter",function($scope,$filter){
        $scope.test="tttttt";
        var building={
            no:"17",
            floorcount:30,
            unitcount:3,
            floorhousecount:4,
            houses:[]
        }

        function house(houseno,area,price,type){
            this.no=houseno;
            this.area=area;
            this.price=price;
            this.type=type;
            this.totalprice=this.price*this.area;
        }
        genHouse();
        $scope.building=building;
        function genHouse(){
            for(var i=0;i<building.floorhousecount;i++){
                for(var j=0;j<building.unitcount;j++){
                    for(var k=0;k<building.floorcount;k++){
                        var no=(j+1)+'-'+(k+1)+"-"+(i+1);
                        var h=new house(
                            no,
                            30*(i+1),
                            10000+(Math.abs(k-15)*100),
                            'A'+i
                        );
                        building.houses.push(h);
                    }
                }
            }
        }

    }]);

})();