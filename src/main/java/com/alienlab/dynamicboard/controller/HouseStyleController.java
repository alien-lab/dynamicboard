package com.alienlab.dynamicboard.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alienlab.dynamicboard.db.ExecResult;
import com.alienlab.dynamicboard.entity.HouseStyle;
import com.alienlab.dynamicboard.entity.Premise;
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
 * Created by Administrator on 2017/2/27.
 */
@RestController
@RequestMapping("/housestyle")
public class HouseStyleController {
    @Autowired
    private PremiseService premiseService;
    @Autowired
    private HouseStyleService houseStyleService;
    //添加户型
    @RequestMapping(value = "/addHouseStyle",method = RequestMethod.POST)
    public String addHouseStyle(HttpServletRequest request){
        try {
            String jsonBody = IOUtils.toString(request.getInputStream(),"UTF-8");
            JSONObject form = JSONObject.parseObject(jsonBody);
            HouseStyle houseStyle = new HouseStyle();
            houseStyle.setHsCode(form.getString("hsCode"));
            houseStyle.setHsName(form.getString("hsName"));
            houseStyle.setHsIntroduction(form.getString("hsIntroduction"));
            houseStyle.setHsPicture(form.getString("hsPicture"));
            houseStyle.setHsSquare(form.getFloatValue("hsSquare"));
            JSONObject premiseJSON = form.getJSONObject("Premise");
            Long id = premiseJSON.getLong("id");
            Premise premise = premiseService.getPremiseById(id);
            houseStyle.setPremise(premise);
            HouseStyle result = houseStyleService.addHouseStyle(houseStyle);
            if (result == null){
                return new ExecResult(false,"户型添加失败").toString();
            }else{
                ExecResult er = new ExecResult();
                er.setResult(true);
                er.setData((JSON) JSON.toJSON(houseStyle));
                return er.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ExecResult(false,"户型添加异常").toString();
        }
    }
    //删除户型
    @RequestMapping(value = "/deleteHouseStyle/{id}",method = RequestMethod.DELETE)
    public String deleteHouseStyle(@PathVariable("id") Long id){
        try{
            if (houseStyleService.deleteHouseStyle(id)){
                return new ExecResult(true,"户型删除成功").toString();
            }else {
                return new ExecResult(false,"户型删除失败").toString();
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ExecResult(false,"户型删除异常").toString();
        }
    }
    //修改户型信息
    @RequestMapping(value = "/updateHouseStyle",method = RequestMethod.POST)
    public String updateHouseStyle(HttpServletRequest request){
        try {
            String jsonBody = IOUtils.toString(request.getInputStream(),"UTF-8");
            JSONObject form = JSONObject.parseObject(jsonBody);
            Long houseStyleId = form.getLong("id");
            HouseStyle houseStyle = houseStyleService.getHouseStyleById(houseStyleId);
            houseStyle.setHsCode(form.getString("hsCode"));
            houseStyle.setHsName(form.getString("hsName"));
            houseStyle.setHsIntroduction(form.getString("hsIntroduction"));
            houseStyle.setHsPicture(form.getString("hsPicture"));
            houseStyle.setHsSquare(form.getFloatValue("hsSquare"));
            JSONObject premiseJSON = form.getJSONObject("Premise");
            Long premiseId = premiseJSON.getLong("id");
            Premise premise = premiseService.getPremiseById(premiseId);
            houseStyle.setPremise(premise);
            HouseStyle result = houseStyleService.updateHouseStyle(houseStyle);
            if (result == null){
                return new ExecResult(false,"户型修改失败").toString();
            }else{
                ExecResult er = new ExecResult();
                er.setResult(true);
                er.setData((JSON) JSON.toJSON(houseStyle));
                return er.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ExecResult(false,"户型修改异常").toString();
        }
    }
    //查看所有户型
    @RequestMapping(value = "/getAll",method = RequestMethod.GET)
    public String getAll(){
        List<HouseStyle> houseStyles = houseStyleService.getAll();
        ExecResult er = new ExecResult();
        er.setResult(true);
        er.setData((JSON) JSON.toJSON(houseStyles));
        return er.toString();
    }
    //根据hsName查询户型
    @RequestMapping(value = "/getByHsName/{hsName}",method = RequestMethod.GET)
    public String getHouseStyleByHsName(@PathVariable("hsName") String hsName){
        HouseStyle houseStyle = houseStyleService.getHouseStyleByHsName(hsName);
        return JSON.toJSONString(houseStyle);
    }
}
