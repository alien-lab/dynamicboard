/**
 * Created by 橘 on 2017/5/1.
 */
(function(){
    var house=angular.module("house");
    house.controller("houseListController",["$scope","$state",function($scope,$state){
        $scope.title="楼栋选择";
        $scope.goBoard=function(){
            $state.go("houseboard");
        }
    }]);

    house.controller("houseBoardController",["$scope","$state",function($scope,$state){
        $scope.title="楼盘房源";
        $scope.goList=function(){
            $state.go("houselist");
        }
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
            this.status="可售";
        }
        genHouse();
        $scope.building=building;
        function genHouse(){
            for(var i=0;i<building.floorcount;i++){
                var floorhouse=[];
                for(var j=0;j<building.unitcount;j++){
                    for (var k=0;k<building.floorhousecount;k++){
                        var no=(i+1).toString()+(j+1).toString()+(k+1).toString();
                        var h=new house(
                            no,
                            30*(((j+1)*(k+1)%4)+1),
                            10000+(Math.abs(i-15)*100),
                            'A'+((j+1)*(k+1)%4)
                        );
                        h.status=((i==(Math.floor(Math.random()*building.floorcount)))||(j==(Math.floor(Math.random()*building.unitcount)))
                            ?"售控":"可售");
                        floorhouse.push(h);
                    }
                }
                building.houses.push(floorhouse);
            }
        }
    }]);

    house.controller("houseInfoController",["$scope","$state",function($scope,$state){
        $scope.title="房源详情";
        $scope.goBoard=function(){
            $state.go("houseboard");
        }
    }]);
})();
