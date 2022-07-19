package com.chu.Reservation.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chu.Reservation.models.Services;

public interface ServiceDAO extends JpaRepository<Services, Integer> {
	
}
