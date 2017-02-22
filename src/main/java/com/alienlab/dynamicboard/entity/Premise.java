package com.alienlab.dynamicboard.entity;

import javax.persistence.*;

/**
 * 楼盘
 * Created by Administrator on 2017/2/22.
 */
@Entity
@Table(name = "")
public class Premise {
    private Long id;
    private String premiseName;//楼盘名称
    private String premiseAddress;//楼盘地点
    private Integer buildingNu;//楼栋数
    private float premiseSquare;//面积
    private float premiseFar;//容积率
    private float premiseGsp;//绿化率
    private String premisePhone;//售楼处电话

    public Premise() {
    }

    public Premise(String premiseName, String premiseAddress, Integer buildingNu, float premiseSquare, float premiseFar, float premiseGsp, String premisePhone) {
        this.premiseName = premiseName;
        this.premiseAddress = premiseAddress;
        this.buildingNu = buildingNu;
        this.premiseSquare = premiseSquare;
        this.premiseFar = premiseFar;
        this.premiseGsp = premiseGsp;
        this.premisePhone = premisePhone;
    }

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    @Basic
    @Column(name = "")
    public String getPremiseName() {
        return premiseName;
    }

    public void setPremiseName(String premiseName) {
        this.premiseName = premiseName;
    }
    @Basic
    @Column(name = "")
    public String getPremiseAddress() {
        return premiseAddress;
    }

    public void setPremiseAddress(String premiseAddress) {
        this.premiseAddress = premiseAddress;
    }
    @Basic
    @Column(name = "")
    public Integer getBuildingNu() {
        return buildingNu;
    }

    public void setBuildingNu(Integer buildingNu) {
        this.buildingNu = buildingNu;
    }
    @Basic
    @Column(name = "")
    public float getPremiseSquare() {
        return premiseSquare;
    }

    public void setPremiseSquare(float premiseSquare) {
        this.premiseSquare = premiseSquare;
    }
    @Basic
    @Column(name = "")
    public float getPremiseFar() {
        return premiseFar;
    }

    public void setPremiseFar(float premiseFar) {
        this.premiseFar = premiseFar;
    }
    @Basic
    @Column(name = "")
    public float getPremiseGsp() {
        return premiseGsp;
    }

    public void setPremiseGsp(float premiseGsp) {
        this.premiseGsp = premiseGsp;
    }
    @Basic
    @Column(name = "")
    public String getPremisePhone() {
        return premisePhone;
    }

    public void setPremisePhone(String premisePhone) {
        this.premisePhone = premisePhone;
    }

    @Override
    public String toString() {
        return "Premise{" +
                "id=" + id +
                ", premiseName='" + premiseName + '\'' +
                ", premiseAddress='" + premiseAddress + '\'' +
                ", buildingNu=" + buildingNu +
                ", premiseSquare=" + premiseSquare +
                ", premiseFar=" + premiseFar +
                ", premiseGsp=" + premiseGsp +
                ", premisePhone='" + premisePhone + '\'' +
                '}';
    }
}
