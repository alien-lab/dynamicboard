package com.alienlab.dynamicboard.entity;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * 员工账户
 * Created by Administrator on 2017/2/22.
 */
@Entity
@Table(name = "tb_staff")
public class Staff {
    private Long id;
    private String staffName;//姓名
    private String staffPhone;//号码
    private Integer staffGarde;//权限等级
    private String staffStatus;//账户状态
    private String account;//PC端登录帐号
    private String password;//PC端登录密码
    private String openid;
    private String nickName;
    private String icon;
    private Premise premise;//所属楼盘

    public Staff() {
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
    @Column(name = "staffname")
    public String getStaffName() {
        return staffName;
    }

    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }
    @Basic
    @Column(name = "staffphone")
    public String getStaffPhone() {
        return staffPhone;
    }

    public void setStaffPhone(String staffPhone) {
        this.staffPhone = staffPhone;
    }
    @Basic
    @Column(name = "staffgrade")
    public Integer getStaffGarde() {
        return staffGarde;
    }

    public void setStaffGarde(Integer staffGarde) {
        this.staffGarde = staffGarde;
    }
    @Basic
    @Column(name = "staffstatus")
    public String getStaffStatus() {
        return staffStatus;
    }

    public void setStaffStatus(String staffStatus) {
        this.staffStatus = staffStatus;
    }
    @Basic
    @Column(name = "account")
    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }
    @Basic
    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "openid")
    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }
    @Basic
    @Column(name = "nickname")
    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }
    @Basic
    @Column(name = "icon")
    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
    @ManyToOne
    @JoinColumn(name = "premise")
    public Premise getPremise() {
        return premise;
    }

    public void setPremise(Premise premise) {
        this.premise = premise;
    }

}
