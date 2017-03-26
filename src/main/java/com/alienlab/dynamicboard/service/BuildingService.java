package com.alienlab.dynamicboard.service;

import com.alienlab.dynamicboard.entity.Building;
import com.alienlab.dynamicboard.entity.House;
import com.alienlab.dynamicboard.entity.HouseStyle;
import com.alienlab.dynamicboard.entity.Premise;
import com.alienlab.dynamicboard.repository.BuildingRepository;
import com.alienlab.dynamicboard.repository.HouseRepository;
import com.alienlab.dynamicboard.repository.HouseStyleRepository;
import com.alienlab.dynamicboard.repository.PremiseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017/2/24.
 */
@Service
public class BuildingService {
    @Autowired
    private BuildingRepository buildingRepository;
    @Autowired
    private HouseRepository houseRepository;
    @Autowired
    private HouseStyleRepository houseStyleRepository;
    @Autowired
    private PremiseRepository premiseRepository;
    //添加楼栋
    public Building addBuilding(Building building){
        Building saveBuilding = buildingRepository.save(building);
        int i,j,k,a,b;
        List<String> houseNos = new ArrayList<>();
        List<Integer> unitNos = new ArrayList<>();
        List<Integer> floorNos = new ArrayList<>();
        for (i=0;i<building.getFloorNu();i++) {
            for (a = 0; a < building.getUnitNu() * building.getUnitHouseNu(); a++) {
                if (a + 1 < 10) {
                    String houseNo = String.valueOf(i + 1) + "0" + String.valueOf(a + 1);
                    houseNos.add(houseNo);
                } else {
                    String houseNo = String.valueOf(i + 1) + String.valueOf(a + 1);
                    houseNos.add(houseNo);
                }
            }
            for (j=0;j<building.getUnitNu();j++){
                for (k=0;k<building.getUnitHouseNu();k++){
                    int unitNo = j+1;
                    unitNos.add(unitNo);
                    int floorNo = i+1;
                    floorNos.add(floorNo);
                }
            }
        }
        for (b=0;b<building.getFloorNu()*building.getUnitNu()*building.getUnitHouseNu();b++){
            House house = new House(houseNos.get(b),null,0,0,"销控",building, unitNos.get(b),floorNos.get(b),building.getPremise());
            houseRepository.save(house);
        }
        return saveBuilding;
    }
    //删除楼栋
    public boolean deleteBuilding(Long id){
        try{
            Building building = buildingRepository.getOne(id);
            List<House> houses= houseRepository.findByBuilding(building);
            for (House house:houses){
                houseRepository.delete(house);
            }
            buildingRepository.delete(id);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
    //新修改楼栋信息(重新生成房源)
    public Building newUpdateBuilding(Building building){
        try{
            List<House> houses= houseRepository.findByBuilding(building);
            for (House house:houses){
                houseRepository.delete(house);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        int i,j,k,a,b;
        List<String> houseNos = new ArrayList<>();
        List<Integer> unitNos = new ArrayList<>();
        List<Integer> floorNos = new ArrayList<>();
        for (i=0;i<building.getFloorNu();i++) {
            for (a = 0; a < building.getUnitNu() * building.getUnitHouseNu(); a++) {
                if (a + 1 < 10) {
                    String houseNo = String.valueOf(i + 1) + "0" + String.valueOf(a + 1);
                    houseNos.add(houseNo);
                } else {
                    String houseNo = String.valueOf(i + 1) + String.valueOf(a + 1);
                    houseNos.add(houseNo);
                }
            }
            for (j=0;j<building.getUnitNu();j++){
                for (k=0;k<building.getUnitHouseNu();k++){
                    int unitNo = j+1;
                    unitNos.add(unitNo);
                    int floorNo = i+1;
                    floorNos.add(floorNo);
                }
            }
        }
        for (b=0;b<building.getFloorNu()*building.getUnitNu()*building.getUnitHouseNu();b++){
            House house = new House(houseNos.get(b),null,0,0,"销控",building, unitNos.get(b),floorNos.get(b),building.getPremise());
            houseRepository.save(house);
        }
        return buildingRepository.save(building);
    }
    //旧修改楼栋信息
    public Building oldUpdateBuilding(Building building){

        Premise premise = building.getPremise();
        List<House> houses = houseRepository.findByBuilding(building);
        for (House house:houses){
            house.setPremise(premise);
        }
        return buildingRepository.save(building);
    }
    //查所有楼栋
    public List<Building> getAll(){
        return buildingRepository.findAll();
    }
    //根据id查楼栋
    public Building getBuildingById(Long id){
        return buildingRepository.findOne(id);
    }
    //根据buildingName楼栋
    public Building getBuildingByBuildingName(String buildingName){
        return buildingRepository.findByBuildingName(buildingName);
    }
}
