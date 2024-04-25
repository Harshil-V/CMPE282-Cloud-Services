package com.sjsu.cloud.travelapp.controller;

import com.sjsu.cloud.travelapp.model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.sjsu.cloud.travelapp.entity.AdminEntity;
import com.sjsu.cloud.travelapp.service.AdminService;

@Controller 
@RequestMapping(path="/admin")
@CrossOrigin(origins = "${server.cors.url}")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@PostMapping(path="/addAdmin")
	public ResponseEntity<?> addAdmin(@RequestBody AdminEntity adminEntity) {
		return adminService.addAdmin(adminEntity);
	}

	@PostMapping(path="/authenticateAdmin")
	public ResponseEntity<String> authenticateAdmin(@RequestBody Admin admin) {
		return adminService.authenticateAdminLogin(admin);
	}

	@PostMapping(path="/updateAdmin")
	public ResponseEntity<?> updateAdmin(@RequestBody AdminEntity adminEntity) {
		return adminService.updateAdmin(adminEntity);
	}

	@PostMapping(path="/deleteAdmin")
	public ResponseEntity<?> deleteAdmin(@RequestBody AdminEntity adminEntity) {
		return adminService.deleteAdmin(adminEntity);
	}

	@GetMapping(value="/health")
	public ResponseEntity<?> healthCheck() {
		return new ResponseEntity<>("Travel App is up and running!", HttpStatus.OK);
	}
}
