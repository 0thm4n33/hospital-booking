package com.chu.Reservation.models;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Vector;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
public class Patient implements Serializable {
	@Transient
	private static final long serialVersionUID = 1L;
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(unique = true,nullable = true)
	private Integer ipp;
	@Column(unique = true)
	private String cin;
	private String cinUploaded;
	private String nom;
	private String prenom;
	@Column(unique = true)
	private String numeroTelephone;
	private String ville;
	private String adresse;
	@OneToMany(mappedBy = "patient") @JsonProperty(access = Access.WRITE_ONLY)
	private List<PreRdv> preRendezVous = new Vector<PreRdv>();
	
	@OneToOne @JsonProperty(access = Access.WRITE_ONLY)
	private Compte compte;
	
	public Patient() {
		
	}
	
	public Patient(Integer ipp, String cin, String cinUploaded,String nom, String prenom, String numeroTelephone, String ville,
			String adresse,Compte compte) {
		this(cin,cinUploaded,nom,prenom,numeroTelephone,ville,adresse,compte);
		this.ipp = ipp;
	}

	public Patient(String cin,String cinUploaded ,String nom, String prenom, String numeroTelephone, String ville,String adresse,Compte compte) {
		this.cin = cin;
		this.nom = nom;
		this.prenom = prenom;
		this.numeroTelephone = numeroTelephone;
		this.ville = ville;
		this.adresse = adresse;
		this.compte = compte;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getIpp() {
		return ipp;
	}

	public void setIpp(Integer ipp) {
		this.ipp = ipp;
	}

	public String getCin() {
		return cin;
	}

	public void setCin(String cin) {
		this.cin = cin;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getNumeroTelephone() {
		return numeroTelephone;
	}

	public void setNumeroTelephone(String numeroTelephone) {
		this.numeroTelephone = numeroTelephone;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}
	
	public List<PreRdv> getPreRendezVous() {
		return preRendezVous;
	}	
	
	public String getVille() {
		return ville;
	}

	public void setVille(String ville) {
		this.ville = ville;
	}
	
	public Compte getCompte() {
		return compte;
	}

	public void setCompte(Compte compte) {
		this.compte = compte;
	}

	public void setPreRendezVous(List<PreRdv> preRendezVous) {
		this.preRendezVous = preRendezVous;
	}
	
	public String getCinUploaded() {
		return cinUploaded;
	}

	public void setCinUploaded(String cinUploaded) {
		this.cinUploaded = cinUploaded;
	}

	@Override
	public String toString() {
		return "Patient [id=" + id + ", ipp=" + ipp + ", cin=" + cin + ", cinUploaded=" + cinUploaded + ", nom=" + nom
				+ ", prenom=" + prenom + ", numeroTelephone=" + numeroTelephone + ", ville=" + ville + ", adresse="
				+ adresse + ", preRendezVous=" + preRendezVous + ", compte=" + compte + "]";
	}
}
