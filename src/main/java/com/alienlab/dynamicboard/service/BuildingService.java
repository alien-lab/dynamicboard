package com.alienlab.dynamicboard.service;

import com.alienlab.dynamicboard.entity.Building;
import com.alienlab.dynamicboard.entity.House;
import com.alienlab.dynamicboard.repository.BuildingRepository;
import com.alienlab.dynamicboard.repository.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    //添加楼栋
    public Building addBuilding(Building building){
        for (int i=0;i<building.getFloorNu();i++){
            for (int j=0;j<building.getUnitNu();j++){
                for (int k=0;k<building.getUnitHouseNu();k++){
                    String houseNo = building.getBuildingNo()+"-"+String.valueOf(i+1)+String.valueOf(j+1)+String.valueOf(k+1);
                    House house = new House(houseNo,building,String.valueOf(j+1),String.valueOf(i+1),building.getPremise());
                    houseRepository.save(house);
                }
            }
        }
        return buildingRepository.save(building);
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
    //修改楼栋信息
    public Building updateBuilding(Building building){
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
}
