package com.chu.Reservation.dao;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Repository;

@Repository
public class FileSystemRepository {
	private String RESOURCES_DIR = "C:\\Users\\othma\\OneDrive\\Bureau\\chuImage\\";
	
	public String save(byte[] content,String imageName) {
		try {
			Path newFile = Paths.get(RESOURCES_DIR+new Date().getTime()+imageName+".jpeg");
			Files.createDirectories(newFile.getParent());
			Files.write(newFile, content);
			return newFile.toAbsolutePath().toString();
		} catch (Exception e) {
			System.err.println(e);
			return "null";
		}
	}
	
	public byte[] findInFileSystem(String location) {
		try {
			File file = new File(location);
			Path path = Paths.get(file.toURI());
			return Files.readAllBytes(path);
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}
	
}
