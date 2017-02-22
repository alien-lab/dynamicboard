package com.alienlab.dynamicboard.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 楼栋
 * Created by Administrator on 2017/2/22.
 */
@Entity
@Table(name = "tb_building")
public class Building implements Serializable {
    private Long id;
    private String buildingName;//楼栋名
    private String buildingNo;//楼栋号
    private Integer floorNu;//楼层数
    private Integer unitNu;//单元数
    private Integer unitHouseNu;//每单元户数
    private String buildingStatus;//楼栋状态（已售罄、未开盘、热卖中）
    private Premise premise;//所属楼盘

    public Building() {
    }

    public Building(String buildingName, String buildingNo, Integer floorNu, Integer unitNu, Integer unitHouseNu, String buildingStatus, Premise premise) {
        this.buildingName = buildingName;
        this.buildingNo = buildingNo;
        this.floorNu = floorNu;
        this.unitNu = unitNu;
        this.unitHouseNu = unitHouseNu;
        this.buildingStatus = buildingStatus;
        this.premise = premise;
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
    @Column(name = "buildingname")
    public String getBuildingName() {
        return buildingName;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
    }
    @Basic
    @Column(name = "buildingno")
    public String getBuildingNo() {
        return buildingNo;
    }

    public void setBuildingNo(String buildingNo) {
        this.buildingNo = buildingNo;
    }
    @Basic
    @Column(name = "floornu")
    public Integer getFloorNu() {
        return floorNu;
    }

    public void setFloorNu(Integer floorNu) {
        this.floorNu = floorNu;
    }
    @Basic
    @Column(name = "unitnu")
    public Integer getUnitNu() {
        return unitNu;
    }

    public void setUnitNu(Integer unitNu) {
        this.unitNu = unitNu;
    }
    @Basic
    @Column(name = "unithousenu")
    public Integer getUnitHouseNu() {
        return unitHouseNu;
    }

    public void setUnitHouseNu(Integer unitHouseNu) {
        this.unitHouseNu = unitHouseNu;
    }
    @Basic
    @Column(name = "buildingstatus")
    public String getBuildingStatus() {
        return buildingStatus;
    }

    public void setBuildingStatus(String buildingStatus) {
        this.buildingStatus = buildingStatus;
    }

    @ManyToOne
    @JoinColumn(name="premise")
    public Premise getPremise() {
        return premise;
    }

    public void setPremise(Premise premise) {
        this.premise = premise;
    }

    @Override
    public String toString() {
        return "Building{" +
                "id=" + id +
                ", buildingName='" + buildingName + '\'' +
                ", buildingNo='" + buildingNo + '\'' +
                ", floorNu=" + floorNu +
                ", unitNu=" + unitNu +
                ", unitHouseNu=" + unitHouseNu +
                ", buildingStatus='" + buildingStatus + '\'' +
                ", premise='" + premise + '\'' +
                '}';
    }
}
