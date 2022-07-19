package com.chu.Reservation.models;

import java.util.List;
import java.util.Vector;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
public class Batiment {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(unique = true)
	private char label;
	private int numero;
	
	@OneToMany(mappedBy = "batiment") 
	@JsonProperty(access = Access.WRITE_ONLY)
	private List<Services> services = new Vector<Services>();
	
	@ManyToOne 
	@JsonIgnore
	private Hopital hopital;
	
	public Batiment() {
	}
	
	public Batiment(char label,List<Services> services,Hopital hopital) {
		this.label = label;
		this.services = services;
		this.hopital = hopital;
	}


	public Batiment(int id, char label, int numero, List<Services> services, Hopital hopital) {
		super();
		this.id = id;
		this.label = label;
		this.numero = numero;
		this.services = services;
		this.hopital = hopital;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getNumero() {
		return numero;
	}

	public void setNumero(int numero) {
		this.numero = numero;
	}

	public char getLabel() {
		return label;
	}

	public void setLabel(char label) {
		this.label = label;
	}

	public List<Services> getServices() {
		return services;
	}

	public void setServices(List<Services> services) {
		this.services = services;
	}

	public Hopital getHopital() {
		return hopital;
	}

	public void setHopital(Hopital hopital) {
		this.hopital = hopital;
	}

	@Override
	public String toString() {
		return "Batiment [id=" + id + ", label=" + label + ", numero=" + numero + ", services=" + services
				+ ", hopital=" + hopital + "]";
	}
}
