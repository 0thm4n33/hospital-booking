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

import org.hibernate.annotations.Columns;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
public class Consultation {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(unique = true)
	private String nom;
	private double prix;
	@OneToMany(mappedBy = "consultations") @JsonProperty(access = Access.WRITE_ONLY)
	private List<RendezVous> rendezVous = new Vector<RendezVous>();
	
	@ManyToOne @JsonProperty(access = Access.READ_ONLY)
	private Services service;
	
	public Consultation() {
	}

	public Consultation(int id, String nom,double prix,Services service) {
		this(nom,prix,service);
		this.id = id;
	}
	
	public Consultation(String nom,double prix,Services service) {
		super();
		this.setNom(nom);
		this.prix = prix;
		this.service = service;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getPrix() {
		return prix;
	}

	public void setPrix(double prix) {
		this.prix = prix;
	}

	public List<RendezVous> getRendezVous() {
		return rendezVous;
	}

	public void setRendezVous(List<RendezVous> rendezVous) {
		this.rendezVous = rendezVous;
	}

	public Services getService() {
		return service;
	}

	public void setService(Services service) {
		this.service = service;
	}

	@Override
	public String toString() {
		return "Consultation [id=" + id + ", prix=" + prix + ", rendezVous=" + rendezVous + ", service=" + service
				+ "]";
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}
	
}
