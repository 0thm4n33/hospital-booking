package com.chu.Reservation.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chu.Reservation.models.Secretaire;

public interface SecretaireDAO extends JpaRepository<Secretaire, Integer> {

}
