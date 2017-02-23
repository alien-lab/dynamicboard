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
            houses:[[]]
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
            for(var i=0;i<building.floorcount;i++){
                var floorhouse=[];
                for(var j=0;j<building.unitcount*building.floorhousecount;j++){
                    var no=(i+1)+'-'+(j+1);
                    var h=new house(
                        no,
                        30*((j%4)+1),
                        10000+(Math.abs(i-15)*100),
                        'A'+(j%4)
                    );
                    floorhouse.push(h);

                }
                building.houses.push(floorhouse);
            }
        }

    }]);

})();