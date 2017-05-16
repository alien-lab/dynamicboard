package com.alienlab.dynamicboard;

import com.alienlab.dynamicboard.entity.*;
import com.alienlab.dynamicboard.service.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DynamicboardApplicationTests {
    @Autowired
    private PremiseService premiseService;
    @Autowired
    private BuildingService buildingService;
    @Autowired
    private HouseStyleService houseStyleService;
    @Autowired
    private HouseService houseService;
    @Autowired
    private StaffService staffService;

    @Test
    //添加楼盘测试
//	public void TestAddPremise() {
//		Premise premise = new Premise("测试楼盘2","南京",15,200,0.8,0.6,"15711111112");
//		premiseService.addPremise(premise);
//		System.out.println(premise);
//	}
    //添加楼栋测试
//	public void TestAddBuilding(){
//		Premise premise = premiseService.getPremiseById((long) 5);
//		Building building = new Building("测试楼栋","05",3,3,2,"可售",premise);
//		buildingService.addBuilding(building);
//	}
    //添加户型测试
//	public void TestAddHouseStyle(){
//		Premise premise = premiseService.getPremiseById((long) 6);
//		HouseStyle houseStyle = new HouseStyle("D1","测试户型","测试介绍","测试户型图",200,premise);
//		houseStyleService.addHouseStyle(houseStyle);
//	}
    //添加房源测试
//	public void TestAddHouse(){
//		HouseStyle houseStyle = houseStyleService.getHouseStyleById((long) 1);
//		Building building = buildingService.getBuildingById((long) 3);
//		Premise premise = premiseService.getPremiseById((long) 1);
//		House house = new House("01-424",0,houseStyle,1,"可售",building,2,3,premise);
//		houseService.addHouse(house);
//	}
    //查所有楼盘
//	public void TestGetAllPremise(){
//		List<Premise> premises = premiseService.getAll();
//		for (Premise premise:premises){
//			System.out.println(premise);
//		}
//	}
    //查询所有楼栋
//	public void TestGetAllBuilding(){
//		List<Building> buildings = buildingService.getAll();
//		for (Building building:buildings){
//			System.out.println(building);
//		}
//	}
    //查询所有户型
//	public void TestGetAllHouseStyle(){
//		List<HouseStyle> houseStyles = houseStyleService.getAll();
//		for (HouseStyle houseStyle:houseStyles){
//			System.out.println(houseStyle);
//		}
//	}
    //查询所有房源
//	public void TestGetAllHouse(){
//		List<House> houses = houseService.getAll();
//		for (House house:houses){
//			System.out.println(house);
//		}
//	}
    //根据BuildingAndFloorNo查房源
//	public void TestGetAllAsTable(){
//		List<List<House>> finalHouses = houseService.getAllAsTable("A2栋");
//		for (List<House> houses:finalHouses){
//			System.out.println(houses);
//		}
//	}
    //根据id查楼盘
//	public void TestGetPremiseById(){
//		System.out.println(premiseService.getPremiseById((long) 1));
//	}
    //根据id查楼栋
//	public void TestGetBuildingById(){
//		System.out.println(buildingService.getBuildingById((long) 3));
//	}
    //根据id查户型
//	public void TestGetHouseStyleById(){
//		System.out.println(houseStyleService.getHouseStyleById((long) 1));
//	}
    //根据id查房源
//	public void TestGetHouseById(){
//		System.out.println(houseService.getHouseById((long) 39));
//	}
    //根据修改楼盘信息
//	public void TestUpdatePremise(){
//		Premise premise = premiseService.getPremiseById((long) 1);
//		premise.setBuildingNu(14);
//		premiseService.updatePremise(premise);
//	}
    //根据修改楼栋信息
//	public void TestUpdateBuilding(){
//		Building building = buildingService.getBuildingById((long) 3);
//		building.setBuildingStatus("热卖中");
//		buildingService.updateBuilding(building);
//	}
    //根据修改户型信息
//	public void TestUpdateHouseStyle(){
//		HouseStyle houseStyle = houseStyleService.getHouseStyleById((long) 1);
//		houseStyle.setHsCode("A1");
//		houseStyleService.updateHouseStyle(houseStyle);
//	}
    //根据修改房源信息
//	public void TestUpdateHouse(){
//		House house = houseService.getHouseById((long) 40);
//		house.setUnitPrice(35000);
//		houseService.updateHouse(house);
//	}
    //根据id删除楼盘
//	public void TestDeletePremise(){
//		premiseService.deletePremise((long) 6);
//	}
    //根据id删除楼栋
//	public void TestDeleteBuilding(){
//		buildingService.deleteBuilding((long) 4);
//	};
    //根据id删除户型
//	public void TestDeleteHouseStyle(){
//		houseStyleService.deleteHouseStyle((long) 5);
//	}
    //根据id删除房源
//	public void TestDeleteHouse(){
//		houseService.deleteHouse((long) 141);
//	}
    //根据premiseName查楼盘
//	public void TestGetPremiseByPremiseName(){
//	    Premise premise = premiseService.getPremiseByPremiseName("1");
//		System.out.println(premise);
//	}
    //根据hsName查户型
//	public void TestGetHouseStyleByHsName(){
//		HouseStyle houseStyle = houseStyleService.getHouseStyleByHsName("1");
//		System.out.println(houseStyle);
//	}
    //根据buildingName查楼栋
//	public void TestGetBuildingByBuildingName(){
//		Building building = buildingService.getBuildingByBuildingName("1#");
//		System.out.println(building);
//	}
    //根据staffName和premise分页模糊查
    public void TestFindByLikeNameAndPremisePage() {
        Page<Staff> result = staffService.findByLikeNameAndPremisePage("6", "恒盛金陵湾", 0, 5);
        System.out.println(result);
    }
}
