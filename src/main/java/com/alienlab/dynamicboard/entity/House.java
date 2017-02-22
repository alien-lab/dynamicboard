package com.alienlab.dynamicboard.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2017/2/22.
 */
@Entity
@Table(name = "")
public class House {
    private Long id;
    private String houseNo;//房号
    private float houseSquare;//面积
    private String houseStyle;//户型
    private float unitPrice;//单价
    private float totalPrice;//总价
    private String houseStatus;//状态
    private Building buliding;//所属楼栋
    private String unitNo;//单元号
    private String floorNo;//楼层号
    private Premise premise;//所属楼盘

    public House() {
    }

    public House(String houseNo, float houseSquare, String houseStyle, float unitPrice, float totalPrice, String houseStatus, Building buliding, String unitNo, String floorNo, Premise premise) {
        this.houseNo = houseNo;
        this.houseSquare = houseSquare;
        this.houseStyle = houseStyle;
        this.unitPrice = unitPrice;
        this.totalPrice = totalPrice;
        this.houseStatus = houseStatus;
        this.buliding = buliding;
        this.unitNo = unitNo;
        this.floorNo = floorNo;
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
    @Column(name = "houseno")
    public String getHouseNo() {
        return houseNo;
    }

    public void setHouseNo(String houseNo) {
        this.houseNo = houseNo;
    }
    @Basic
    @Column(name = "housesquare")
    public float getHouseSquare() {
        return houseSquare;
    }

    public void setHouseSquare(float houseSquare) {
        this.houseSquare = houseSquare;
    }
    @Basic
    @Column(name = "housestyle")
    public String getHouseStyle() {
        return houseStyle;
    }

    public void setHouseStyle(String houseStyle) {
        this.houseStyle = houseStyle;
    }
    @Basic
    @Column(name = "unitprice")
    public float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(float unitPrice) {
        this.unitPrice = unitPrice;
    }
    @Basic
    @Column(name = "totalprice")
    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }
    @Basic
    @Column(name = "housestatus")
    public String getHouseStatus() {
        return houseStatus;
    }

    public void setHouseStatus(String houseStatus) {
        this.houseStatus = houseStatus;
    }
    @Basic
    @Column(name = "building")
    public Building getBuliding() {
        return buliding;
    }

    public void setBuliding(Building buliding) {
        this.buliding = buliding;
    }
    @Basic
    @Column(name = "unitno")
    public String getUnitNo() {
        return unitNo;
    }

    public void setUnitNo(String unitNo) {
        this.unitNo = unitNo;
    }
    @Basic
    @Column(name = "floorno")
    public String getFloorNo() {
        return floorNo;
    }

    public void setFloorNo(String floorNo) {
        this.floorNo = floorNo;
    }
    @Basic
    @Column(name = "premise")
    public Premise getPremise() {
        return premise;
    }

    public void setPremise(Premise premise) {
        this.premise = premise;
    }

    @Override
    public String toString() {
        return "House{" +
                "id=" + id +
                ", houseNo='" + houseNo + '\'' +
                ", houseSquare=" + houseSquare +
                ", houseStyle='" + houseStyle + '\'' +
                ", unitPrice=" + unitPrice +
                ", totalPrice=" + totalPrice +
                ", houseStatus='" + houseStatus + '\'' +
                ", buliding='" + buliding + '\'' +
                ", unitNo='" + unitNo + '\'' +
                ", floorNo='" + floorNo + '\'' +
                ", premise='" + premise + '\'' +
                '}';
    }
}
