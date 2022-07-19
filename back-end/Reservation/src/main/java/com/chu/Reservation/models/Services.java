package com.chu.Reservation.models;

import java.util.List;
import java.util.Vector;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
public class Services {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int numero;
	private String name;
	@OneToMany(mappedBy = "service") @JsonProperty(access = Access.WRITE_ONLY)
	private List<PreRdv> preRendezVous = new Vector<PreRdv>();
	
	@OneToMany(mappedBy = "service") @JsonProperty(access = Access.WRITE_ONLY)
	private List<Consultation> consultations= new Vector<Consultation>();
	
	@ManyToOne @JsonProperty(access = Access.READ_WRITE)
	private Batiment batiment;
	
	public Services() {
	}
	
	public Services(String name,int numero) {
		this.name = name;
		this.numero = numero;
	}
	
	public Services(int id, String name,int numero,Batiment batiment) {
		super();
		this.id = id;
		this.name = name;
		this.numero = numero;
		this.batiment = batiment;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public int getNumero() {
		return numero;
	}

	public void setNumero(int numero) {
		this.numero = numero;
	}

	public List<PreRdv> getPreRendezVous() {
		return preRendezVous;
	}

	public void setPreRendezVous(List<PreRdv> preRendezVous) {
		this.preRendezVous = preRendezVous;
	}

	public List<Consultation> getConsultations() {
		return consultations;
	}

	public void setConsultations(List<Consultation> consultations) {
		this.consultations = consultations;
	}

	public Batiment getBatiment() {
		return batiment;
	}

	public void setBatiment(Batiment batiment) {
		this.batiment = batiment;
	}

	@Override
	public String toString() {
		return "Service [id=" + id + ", name=" + name + ", preRendezVous=" + preRendezVous + ", consultations="
				+ consultations + ", batiment=" + batiment + "]";
	}

	
	
}
