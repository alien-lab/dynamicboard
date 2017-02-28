package com.alienlab.dynamicboard.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2017/2/27.
 */
@Entity
@Table(name = "tb_pre_hou")
public class Pre_Hou {
    private Long id;
    private Premise premise;
    private House house;

    public Pre_Hou() {
    }

    public Pre_Hou(Premise premise, House house) {
        this.premise = premise;
        this.house = house;
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
    @ManyToOne
    @JoinColumn(name = "premise")
    public Premise getPremise() {
        return premise;
    }

    public void setPremise(Premise premise) {
        this.premise = premise;
    }
    @OneToOne
    @JoinColumn(name = "house")
    public House getHouse() {
        return house;
    }

    public void setHouse(House house) {
        this.house = house;
    }

    @Override
    public String toString() {
        return "Pre_Hou{" +
                "id=" + id +
                ", premise=" + premise +
                ", house=" + house +
                '}';
    }
}
