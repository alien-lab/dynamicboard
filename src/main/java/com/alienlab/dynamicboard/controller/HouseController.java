package com.alienlab.dynamicboard.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alienlab.dynamicboard.db.ExecResult;
import com.alienlab.dynamicboard.entity.Building;
import com.alienlab.dynamicboard.entity.House;
import com.alienlab.dynamicboard.entity.HouseStyle;
import com.alienlab.dynamicboard.entity.Premise;
import com.alienlab.dynamicboard.service.BuildingService;
import com.alienlab.dynamicboard.service.HouseService;
import com.alienlab.dynamicboard.service.HouseStyleService;
import com.alienlab.dynamicboard.service.PremiseService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

/**
 * Created by Administrator on 2017/2/25.
 */
@RestController
@RequestMapping("/house")
public class HouseController {
    @Autowired
    private PremiseService premiseService;
    @Autowired
    private BuildingService buildingService;
    @Autowired
    private HouseStyleService houseStyleService;
    @Autowired
    private HouseService houseService;
    //添加房源
    @RequestMapping(value = "/addHouse",method = RequestMethod.POST)
    public String addHouse(HttpServletRequest request){
        try {
            String jsonBody = IOUtils.toString(request.getInputStream(),"UTF-8");
            JSONObject form = JSONObject.parseObject(jsonBody);
            House house = new House();
            System.out.println(form);
            house.setHouseNo(form.getString("houseNo"));
            house.setUnitPrice(form.getDoubleValue("unitPrice"));
            house.setHouseStatus(form.getString("houseStatus"));
            house.setFloorNo(form.getInteger("floorNo"));
            house.setUnitNo(form.getInteger("unitNo"));
            JSONObject premiseJSON = form.getJSONObject("premise");
            String premiseName = premiseJSON.getString("premiseName");
            Premise premise = premiseService.getPremiseByPremiseName(premiseName);
            house.setPremise(premise);
            JSONObject buildingJSON = form.getJSONObject("building");
            String buildingName = buildingJSON.getString("buildingName");
            Building building = buildingService.getBuildingByBuildingName(buildingName);
            house.setBuilding(building);
            JSONObject houseStyleJSON = form.getJSONObject("houseStyle");
            String hsName = houseStyleJSON.getString("hsName");
            HouseStyle houseStyle = houseStyleService.getHouseStyleByHsName(hsName);
            house.setHouseStyle(houseStyle);
            house.setHouseSquare(form.getFloatValue("houseSquare"));
            house.setTotalPrice(form.getDoubleValue("totalPrice"));
            List<House> result = houseService.addHouse(house);
            if (result == null){
                return new ExecResult(false,"房源添加失败").toString();
            }else {
                ExecResult er = new ExecResult();
                er.setResult(true);
                er.setData((JSON) JSON.toJSON(result));
                return er.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ExecResult(false,"房源添加异常").toString();
        }
    }
    //删除房源
    @RequestMapping(value = "/deleteHouse/{id}",method = RequestMethod.DELETE)
    public String deleteHouse(@PathVariable("id") Long id){
        try{
            if (houseService.deleteHouse(id)){
                return new ExecResult(true,"房源删除成功").toString();
            }else {
                return new ExecResult(false,"房源删除失败").toString();
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ExecResult(false,"房源删除异常").toString();
        }
    }
    //修改房源信息
    @RequestMapping(value = "/updateHouse",method = RequestMethod.POST)
    public String updateHouse(HttpServletRequest request){
        try {
            String jsonBody = IOUtils.toString(request.getInputStream(),"UTF-8");
            JSONObject form = JSONObject.parseObject(jsonBody);
            System.out.println(form);
            Long houseId = form.getLong("id");
            House house = houseService.getHouseById(houseId);
            house.setHouseNo(form.getString("houseNo"));
            house.setUnitPrice(form.getDoubleValue("unitPrice"));
            house.setUnitPrice(form.getDoubleValue("unitPrice"));
            JSONObject houseStyleJSON = form.getJSONObject("houseStyle");
            if (houseStyleJSON==null){
                house.setHouseStyle(null);
                house.setHouseSquare(0);
            }else {
                String hsName = houseStyleJSON.getString("hsName");
                HouseStyle houseStyle = houseStyleService.getHouseStyleByHsName(hsName);
                house.setHouseStyle(houseStyle);
                house.setHouseSquare(houseStyle.getHsSquare());
            }
            house.setTotalPrice(form.getDoubleValue("totalPrice"));
            house.setHouseStatus(form.getString("houseStatus"));
            JSONObject buildingJSON = form.getJSONObject("building");
            String buildingName = buildingJSON.getString("buildingName");
            Building building = buildingService.getBuildingByBuildingName(buildingName);
            house.setBuilding(building);
            house.setUnitNo(form.getInteger("unitNo"));
            house.setFloorNo(form.getInteger("floorNo"));
            JSONObject premiseJSON = form.getJSONObject("premise");
            String premiseName = premiseJSON.getString("premiseName");
            Premise premise = premiseService.getPremiseByPremiseName(premiseName);
            house.setPremise(premise);
            House result = houseService.updateHouse(house);
            if (result == null){
                return new ExecResult(false,"房源修改失败").toString();
            }else {
                ExecResult er = new ExecResult();
                er.setResult(true);
                er.setData((JSON) JSON.toJSON(house));
                return er.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ExecResult(false,"房源修改异常").toString();
        }
    }
    //查询所有房源
    @RequestMapping(value = "/getAll",method = RequestMethod.GET)
    public String getAll(){
        List<House> houses = houseService.getAll();
        ExecResult er = new ExecResult();
        er.setResult(true);
        er.setData((JSON) JSON.toJSON(houses));
        return er.toString();
    }
    //根据BuildingAndFloorNo查房源
    @RequestMapping(value = "/getAllAsTable/{buildingName}",method = RequestMethod.GET)
    public String getAllAsTable(@PathVariable("buildingName") String buildingName){
        List<List<House>> finalHouses = houseService.getAllAsTable(buildingName);
        ExecResult er = new ExecResult();
        er.setResult(true);
        er.setData((JSON) JSON.toJSON(finalHouses));
        return er.toString();
    }
    //根据HouseStyle查房源
    @RequestMapping(value = "/getByHouseStyle/{hsName}",method = RequestMethod.GET)
    public String getByHouseStyle(@PathVariable("hsName") String hsName){
        List<House> houses = houseService.getHouseByHouseStyle(hsName);
        return JSON.toJSONString(houses);
    }
    //根据building查house
    @RequestMapping(value = "/getByBuilding/{buildingName}",method = RequestMethod.GET)
    public String getHouseByBuilding(@PathVariable("buildingName") String buildingName){
        List<House> houses = houseService.getHouseByBuilding(buildingName);
        return JSON.toJSONString(houses);
    }
    //根据id查house
    @RequestMapping(value = "/getHouseById/{id}",method = RequestMethod.GET)
    public String getHouseById(@PathVariable("id") Long id){
        House house = houseService.getHouseById(id);
        return JSON.toJSONString(house);
    }
}
