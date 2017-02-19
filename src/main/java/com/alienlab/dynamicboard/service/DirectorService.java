package com.alienlab.dynamicboard.service;

import com.alienlab.dynamicboard.entity.Saler;
import com.alienlab.dynamicboard.repository.DirectorRepository;
import com.alienlab.dynamicboard.repository.SalerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2017/2/19.
 */
@Service
public class DirectorService {
    @Autowired
    private DirectorRepository directorRepository;
    @Autowired
    private SalerRepository salerRepository;
    public Saler addAccount(Saler saler){
        return salerRepository.save(saler);
    }
}
