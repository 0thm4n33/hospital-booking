package com.chu.Reservation.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chu.Reservation.models.Consultation;

public interface ConsultationDAO extends JpaRepository<Consultation, Integer> {

}
