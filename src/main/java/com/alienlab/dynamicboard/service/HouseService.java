package com.alienlab.dynamicboard.service;

import com.alienlab.dynamicboard.entity.Building;
import com.alienlab.dynamicboard.entity.House;
import com.alienlab.dynamicboard.entity.HouseStyle;
import com.alienlab.dynamicboard.repository.BuildingRepository;
import com.alienlab.dynamicboard.repository.HouseRepository;
import com.alienlab.dynamicboard.repository.HouseStyleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017/2/25.
 */
@Service
public class HouseService {
    @Autowired
    private HouseRepository houseRepository;
    @Autowired
    private BuildingRepository buildingRepository;
    @Autowired
    private HouseStyleRepository houseStyleRepository;
    //增加房源
    public List<House> addHouse(House house){
        Integer newFloorNu = house.getBuilding().getFloorNu()+1;
        house.getBuilding().setFloorNu(newFloorNu);
        List<House> houses = new ArrayList<>();
        List<String> houseNos = new ArrayList<>();
        List<Integer> unitNos = new ArrayList<>();
        for (int i=0;i<house.getBuilding().getUnitNu()*house.getBuilding().getUnitHouseNu();i++){
            if (i+1<10){
                String houseNo = String.valueOf(house.getBuilding().getFloorNu())+"0"+String.valueOf(i+1);
                houseNos.add(houseNo);
            }else{
                String houseNo = String.valueOf(house.getBuilding().getFloorNu())+String.valueOf(i+1);
                houseNos.add(houseNo);
            }
        }
        for (int j=0;j<house.getBuilding().getUnitNu();j++){
            for (int k=0;k<house.getBuilding().getUnitHouseNu();k++){
                Integer unitNo = j+1;
                unitNos.add(unitNo);
            }
        }
        for (int a=0;a<house.getBuilding().getUnitNu()*house.getBuilding().getUnitHouseNu();a++){
            House newHouse = new House(houseNos.get(a),house.getHouseStyle(),house.getHouseSquare(),house.getUnitPrice(),house.getHouseStatus(),house.getBuilding(),unitNos.get(a),house.getFloorNo(),house.getPremise());
            if (!newHouse.getHouseNo().equals(house.getHouseNo())){
                newHouse.setHouseStatus("不是房源");
                houses.add(newHouse);
                houseRepository.save(newHouse);
            }else {
                houses.add(newHouse);
                houseRepository.save(newHouse);
            }
        }
        return houses;
    }
    //删除房源
    public boolean deleteHouse(Long id){
        try{
            houseRepository.delete(id);
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }
    //修改房源信息
    public House updateHouse(House house){
        return houseRepository.save(house);
    }
    //查询所有
    public List<House> getAll(){
        return houseRepository.findAll();
    }
    //根据id查询一个房源详情
    public House getHouseById(Long id){
        return houseRepository.findOne(id);
    }
    //根据building查房源
    public List<House> getHouseByBuilding(String buildingName){
        Building building = buildingRepository.findByBuildingName(buildingName);
        return houseRepository.findByBuilding(building);
    }
    //根据houseStyle查房源
    public List<House> getHouseByHouseStyle(String hsName){
        HouseStyle houseStyle = houseStyleRepository.findByHsName(hsName);
        return houseRepository.findByHouseStyle(houseStyle);
    }
    //根据BuildingAndFloorNo查房源
    public List<List<House>> getAllAsTable(String buildingName){
        List<List<House>> finalHouses = new ArrayList<>();
        Building building = buildingRepository.findByBuildingName(buildingName);
        for (int i=building.getFloorNu();i>0;i--){
            List<House> houses = houseRepository.findByBuildingAndFloorNo(building,i);
            finalHouses.add(houses);
        }
        return finalHouses;
    }
}
