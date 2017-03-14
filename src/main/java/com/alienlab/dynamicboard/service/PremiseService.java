package com.alienlab.dynamicboard.service;

import com.alienlab.dynamicboard.entity.Building;
import com.alienlab.dynamicboard.entity.House;
import com.alienlab.dynamicboard.entity.HouseStyle;
import com.alienlab.dynamicboard.entity.Premise;
import com.alienlab.dynamicboard.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/2/24.
 */
@Service
public class PremiseService {
    @Autowired
    private PremiseRepository premiseRepository;
    @Autowired
    private BuildingRepository buildingRepository;
    @Autowired
    private HouseRepository houseRepository;
    @Autowired
    private HouseStyleRepository houseStyleRepository;

    //添加楼盘
    public Premise addPremise(Premise premise){
        return premiseRepository.save(premise);
    }
    //删除楼盘
    public boolean deletePremise(Long id){
        try{
            Premise premise = premiseRepository.findOne(id);
            List<House> housesByPremise = houseRepository.findByPremise(premise);
            for (House house:housesByPremise){
                houseRepository.delete(house);
            }
            List<Building> buildings = buildingRepository.findByPremise(premise);
            for (Building building:buildings){
                List<House> housesByBuilding = houseRepository.findByBuilding(building);
                for (House house:housesByBuilding){
                    houseRepository.delete(house);
                }
                buildingRepository.delete(building);
            }
            List<HouseStyle> houseStyles = houseStyleRepository.findByPremise(premise);
            for (HouseStyle houseStyle:houseStyles){
                List<House> housesByHouseStyle = houseRepository.findByHouseStyle(houseStyle);
                for (House house:housesByHouseStyle){
                    houseRepository.delete(house);
                }
                houseStyleRepository.delete(houseStyle);
            }
            premiseRepository.delete(id);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
    //修改楼盘信息
    public Premise updatePremise(Premise premise){
        return premiseRepository.save(premise);
    }
    //查看所有楼盘
    public List<Premise> getAll(){
        List<Premise> premises = premiseRepository.findAll();
        for (Premise premise:premises){
            List<Building> buildings = buildingRepository.findByPremise(premise);
            premise.setBuildingNu(buildings.size());
        }
        return premises;
    }
    //根据id查楼盘
    public Premise getPremiseById(Long id){
        return premiseRepository.findOne(id);
    }
    //根据楼盘名查楼盘
    public Premise getPremiseByPremiseName(String premiseName) {
        return premiseRepository.findByPremiseName(premiseName);
    }
}
