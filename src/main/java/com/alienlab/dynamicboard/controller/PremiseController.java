package com.alienlab.dynamicboard.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alienlab.dynamicboard.db.ExecResult;
import com.alienlab.dynamicboard.entity.Premise;
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
@RequestMapping("/premise")
public class PremiseController {
    @Autowired
    private PremiseService premiseService;
    //添加楼盘
    @RequestMapping(value = "/addPremise",method = RequestMethod.POST)
    public String addPremise(HttpServletRequest request){
        try {
            String jsonBody = IOUtils.toString(request.getInputStream(),"UTF-8");
            JSONObject form = JSONObject.parseObject(jsonBody);
            Premise premise = new Premise();
            premise.setPremiseName(form.getString("premiseName"));
            premise.setPremiseAddress(form.getString("premiseAddress"));
            premise.setBuildingNu(form.getInteger("buildingNu"));
            premise.setPremiseSquare(form.getFloatValue("premiseSquare"));
            premise.setPremiseFar(form.getFloatValue("premiseFar"));
            premise.setPremiseGsp(form.getFloatValue("premiseGsp"));
            premise.setPremisePhone(form.getString("premisePhone"));
            Premise result = premiseService.addPremise(premise);
            if (result == null){
                return new ExecResult(false,"楼盘添加失败").toString();
            }else {
                ExecResult er = new ExecResult();
                er.setResult(true);
                er.setData((JSON) JSON.toJSON(result));
                return er.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ExecResult(false,"楼盘添加出现异常").toString();
        }
    }
    //删除楼盘
    @RequestMapping(value = "/deletePremise/{id}",method = RequestMethod.DELETE)
    public String deletePremise(@PathVariable("id") Long id){
        try{
            if (premiseService.deletePremise(id)){
                return new ExecResult(true,"楼盘删除成功").toString();
            }else {
                return new ExecResult(false,"楼盘删除失败").toString();
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ExecResult(false,"楼盘删除出现异常").toString();
        }
    }
    //修改楼盘信息
    @RequestMapping(value = "/updatePremise",method = RequestMethod.POST)
    public String updatePremise(HttpServletRequest request){
        try {
            String jsonBody = IOUtils.toString(request.getInputStream(),"UTF-8");
            JSONObject form = JSONObject.parseObject(jsonBody);
            Long id = form.getLong("id");
            Premise premise = premiseService.getPremiseById(id);
            premise.setPremiseName(form.getString("premiseName"));
            premise.setPremiseAddress(form.getString("premiseAddress"));
            premise.setBuildingNu(form.getInteger("buildingNu"));
            premise.setPremiseSquare(form.getFloatValue("premiseSquare"));
            premise.setPremiseFar(form.getFloatValue("premiseFar"));
            premise.setPremiseGsp(form.getFloatValue("premiseGsp"));
            premise.setPremisePhone(form.getString("premisePhone"));
            Premise result = premiseService.updatePremise(premise);
            if (result == null){
                return new ExecResult(false,"楼盘修改失败").toString();
            }else {
                ExecResult er = new ExecResult();
                er.setResult(true);
                er.setData((JSON) JSON.toJSON(result));
                return er.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ExecResult(false,"楼盘修改出现异常").toString();
        }
    }
    //查询所有楼盘
    @RequestMapping(value = "/getAll",method = RequestMethod.GET)
    public String getAll(){
        List<Premise> premises = premiseService.getAll();
        ExecResult er = new ExecResult();
        er.setResult(true);
        er.setData((JSON) JSON.toJSON(premises));
        return er.toString();
    }
}
