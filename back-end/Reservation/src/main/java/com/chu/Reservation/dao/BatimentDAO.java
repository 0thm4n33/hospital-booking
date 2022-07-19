package com.chu.Reservation.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chu.Reservation.models.Batiment;

public interface BatimentDAO extends JpaRepository<Batiment, Integer> {

}
