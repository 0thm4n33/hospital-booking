package com.chu.Reservation.models;

import java.io.Serializable;
import java.util.List;
import java.util.Vector;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
@Entity
public class Hopital implements Serializable {
	@Transient
	private static final long serialVersionUID = 1L;
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String nom;
	@OneToMany(mappedBy = "hopital")
	private List<Batiment> batiments = new Vector<Batiment>();
	
	public Hopital() {
	}
	
	public Hopital(String nom) {
		this.nom = nom;
	}
	public Hopital(int id, String nom, List<Batiment> batiments) {
		super();
		this.id = id;
		this.nom = nom;
		this.batiments = batiments;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getNom() {
		return nom;
	}
	
	public void setNom(String nom) {
		this.nom = nom;
	}
	
	public List<Batiment> getBatiments() {
		return batiments;
	}
	
	public void setBatiments(List<Batiment> batiments) {
		this.batiments = batiments;
	}
	
	@Override
	public String toString() {
		return "Hopital [id=" + id + ", nom=" + nom + ", batiments=" + batiments + "]";
	}
}
