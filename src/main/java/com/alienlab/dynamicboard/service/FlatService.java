package com.alienlab.dynamicboard.service;


import com.alienlab.dynamicboard.entity.Flat;
import com.alienlab.dynamicboard.repository.FlatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/2/19.
 */
@Service
public class FlatService {
    @Autowired
    private FlatRepository flatRepository;
    public Flat addFlat(Flat flat){
        if (flat != null){
            return flatRepository.save(flat);
        }else{
            return null;
        }
    }
    public boolean deleteFlat(Long id){
        try{
            flatRepository.delete(id);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
    public List<Flat> getAll(){
        return flatRepository.findAll();
    }
    public Flat updateFlat(Flat flat){
        try{
            return flatRepository.save(flat);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
