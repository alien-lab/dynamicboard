package com.alienlab.dynamicboard.service;

import com.alienlab.dynamicboard.entity.House;
import com.alienlab.dynamicboard.entity.HouseStyle;
import com.alienlab.dynamicboard.entity.Premise;
import com.alienlab.dynamicboard.repository.HouseRepository;
import com.alienlab.dynamicboard.repository.HouseStyleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/2/26.
 */
@Service
public class HouseStyleService {
    @Autowired
    private HouseStyleRepository houseStyleRepository;
    @Autowired
    private HouseRepository houseRepository;
    //添加户型
    public HouseStyle addHouseStyle(HouseStyle houseStyle){
        return houseStyleRepository.save(houseStyle);
    }
    //删除户型
    public boolean deleteHouseStyle(Long id){
        try{
            houseStyleRepository.delete(id);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("删除失败");
            return false;
        }
    }
    //修改户型信息
    public HouseStyle updateHouseStyle(HouseStyle houseStyle){
        Premise premise = houseStyle.getPremise();
        List<House> houses = houseRepository.findByHouseStyle(houseStyle);
        for (House house:houses){
            house.setPremise(premise);
        }
        return houseStyleRepository.save(houseStyle);
    }
    //查询所有
    public List<HouseStyle> getAll(){
        return houseStyleRepository.findAll();
    }
    //根据id查户型
    public HouseStyle getHouseStyleById(Long id){
        return houseStyleRepository.findOne(id);
    }
    //根据hsName查户型
    public HouseStyle getHouseStyleByHsName(String hsName){
        return houseStyleRepository.findByHsName(hsName);
    }
}
