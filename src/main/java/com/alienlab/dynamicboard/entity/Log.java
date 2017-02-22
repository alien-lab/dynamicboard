package com.alienlab.dynamicboard.entity;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * 销控日志
 * Created by Administrator on 2017/2/22.
 */
@Entity
@Table(name = "tb_log")
public class Log {
    private Long id;
    private Timestamp logTime;//日志时间
    private StaffInfo staff;//操作员工
    private House house;//操作房源
    private String housestatus;//状态

    public Log() {
    }

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    @Basic
    @Column(name = "logtime")
    public Timestamp getLogTime() {
        return logTime;
    }

    public void setLogTime(Timestamp logTime) {
        this.logTime = logTime;
    }
    @ManyToOne
    @JoinColumn(name = "staff")
    public StaffInfo getStaff() {
        return staff;
    }

    public void setStaff(StaffInfo staff) {
        this.staff = staff;
    }
    @ManyToOne
    @JoinColumn(name = "house")
    public House getHouse() {
        return house;
    }

    public void setHouse(House house) {
        this.house = house;
    }
    @Basic
    @Column(name = "housestatus")
    public String getHousestatus() {
        return housestatus;
    }

    public void setHousestatus(String housestatus) {
        this.housestatus = housestatus;
    }

}
