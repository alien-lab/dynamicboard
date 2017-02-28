package com.alienlab.dynamicboard.service;

import com.alienlab.dynamicboard.entity.House;
import com.alienlab.dynamicboard.repository.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/2/25.
 */
@Service
public class HouseService {
    @Autowired
    private HouseRepository houseRepository;
    //增加房源
    public House addHouse(House house){
        return houseRepository.save(house);
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
}
