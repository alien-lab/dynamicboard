package com.alienlab.dynamicboard.service;

import com.alienlab.dynamicboard.common.Base64;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.UUID;

@Service
public class PicService {
    public String  base64ToImage(String base64str,String filepath){
        String imageDataBytes = base64str.substring(base64str.indexOf(",")+1);
        InputStream in = new ByteArrayInputStream(Base64.decode(imageDataBytes));
        String picname=  UUID.randomUUID().toString().replace("-","")+".jpg";
        try{
            File f=new File(filepath);
            if(!f.exists()) {
                f.mkdir();
            }
            FileOutputStream fo = new FileOutputStream(new File(filepath+File.separator+picname));
            byte[] buf = new byte[1024];
            int length = 0;
            while ((length = in.read(buf, 0, buf.length)) != -1) {
                fo.write(buf, 0, length);
            }
            in.close();
            fo.close();
        }catch(Exception e){
            e.printStackTrace();
        }
        return "/uploadimages/"+picname;
    }
}

