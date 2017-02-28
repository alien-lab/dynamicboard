package com.alienlab.dynamicboard.entity;


import javax.persistence.*;

/**
 * Created by Administrator on 2017/2/27.
 */
@Entity
@Table(name = "tb_pre_bui")
public class Pre_Bui {
    private Long id;
    private Premise premise;
    private Building building;

    public Pre_Bui() {
    }

    public Pre_Bui(Premise premise, Building building) {
        this.premise = premise;
        this.building = building;
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
    @JoinColumn(name = "building")
    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }

}
