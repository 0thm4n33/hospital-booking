package com.chu.Reservation.models;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
@Table(name = "prerdv")
public class PreRdv {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String ficheReference;
	private String fichePresciption;
	private String etat="encours";
	private LocalDateTime createdAt = LocalDateTime.now();
	private String motifRefus;
	
	

	@ManyToOne @JsonProperty(access = Access.READ_WRITE)
	private Patient patient;
	
	@ManyToOne @JsonProperty(access = Access.WRITE_ONLY)
	private Secretaire secretaire;
	
	@OneToOne(mappedBy = "preRendezVous") @JsonProperty(access = Access.READ_ONLY)
	private RendezVous rendezVous;
	
	@ManyToOne
	private Services service;

	public PreRdv() {
	}

	public PreRdv(int id, String ficheReference, String fichePresciption, Patient patient, Secretaire secretaire,
			RendezVous rendezVous, Services service) {
		super();
		this.id = id;
		this.ficheReference = ficheReference;
		this.fichePresciption = fichePresciption;
		this.patient = patient;
		this.secretaire = secretaire;
		this.rendezVous = rendezVous;
		this.service = service;
		this.etat = "en attente";
	}
	


	public PreRdv(int id, String ficheReference, String fichePresciption, Patient patient, Services service,
			LocalDateTime createdAt) {
		super();
		this.id = id;
		this.ficheReference = ficheReference;
		this.fichePresciption = fichePresciption;
		this.patient = patient;
		this.service = service;
		this.createdAt = createdAt;
	}



	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFicheRefernce() {
		return ficheReference;
	}

	public void setFicheRefernce(String ficheRefernce) {
		this.ficheReference = ficheRefernce;
	}

	public String getPrescription() {
		return fichePresciption;
	}

	public void setPrescription(String prescription) {
		this.fichePresciption = prescription;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public Secretaire getSecretaire() {
		return secretaire;
	}

	public void setSecretaire(Secretaire secretaire) {
		this.secretaire = secretaire;
	}
	public RendezVous getRendezVous() {
		return rendezVous;
	}
	
	public void setRendezVous(RendezVous rendezVous) {
		this.rendezVous = rendezVous;
	}
	
	public Services getService() {
		return service;
	}

	public void setService(Services service) {
		this.service = service;
	}
	
	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}
	
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public String getMotifRefus() {
		return motifRefus;
	}

	public void setMotifRefus(String motifRefus) {
		this.motifRefus = motifRefus;
	}

	@Override
	public String toString() {
		return "PreRdv [id=" + id + ", ficheRefernce=" + ficheReference + ", prescription=" + fichePresciption + ", patient="
				+ patient + ", secretaire=" + secretaire + ", rendezVous=" + rendezVous + ", service=" + service + "]";
	}

}
