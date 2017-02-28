package com.alienlab.dynamicboard.entity;

import javax.persistence.*;

/**
 * 楼盘户型
 * Created by Administrator on 2017/2/22.
 */
@Entity
@Table(name = "tb_house_style")
public class HouseStyle {
    private Long id;
    private String hsCode;//户型代码
    private String hsName;//户型名称
    private String hsIntroduction;//户型介绍
    private String hsPicture;//户型图
    private float hsSquare;//户型面积
    private Premise premise;//所属楼盘

    public HouseStyle() {
    }

    public HouseStyle(String hsCode, String hsName, String hsIntroduction, String hsPicture, float hsSquare, Premise premise) {
        this.hsCode = hsCode;
        this.hsName = hsName;
        this.hsIntroduction = hsIntroduction;
        this.hsPicture = hsPicture;
        this.hsSquare = hsSquare;
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
    @Column(name = "hscode")
    public String getHsCode() {
        return hsCode;
    }

    public void setHsCode(String hsCode) {
        this.hsCode = hsCode;
    }

    @Basic
    @Column(name = "hsname")
    public String getHsName() {
        return hsName;
    }

    public void setHsName(String hsName) {
        this.hsName = hsName;
    }

    @Basic
    @Column(name = "hsintroduction")
    public String getHsIntroduction(String hsIntroduction) {
        return this.hsIntroduction;
    }

    public void setHsIntroduction(String hsIntroduction) {
        this.hsIntroduction = hsIntroduction;
    }

    @Basic
    @Column(name = "hspicture")
    public String getHsPicture(String hsPicture) {
        return this.hsPicture;
    }

    public void setHsPicture(String hsPicture) {
        this.hsPicture = hsPicture;
    }

    @Basic
    @Column(name = "hssquare")
    public float getHsSquare() {
        return hsSquare;
    }

    public void setHsSquare(float hsSquare) {
        this.hsSquare = hsSquare;
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
        return "HouseStyle{" +
                "id=" + id +
                ", hsCode='" + hsCode + '\'' +
                ", hsName='" + hsName + '\'' +
                ", hsIntroduction='" + hsIntroduction + '\'' +
                ", hsPicture='" + hsPicture + '\'' +
                ", hsSquare=" + hsSquare +
                ", premise=" + premise +
                '}';
    }
}
