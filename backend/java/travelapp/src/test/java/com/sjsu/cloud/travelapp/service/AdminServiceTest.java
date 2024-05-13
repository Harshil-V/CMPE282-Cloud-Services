package com.sjsu.cloud.travelapp.service;

import com.sjsu.cloud.travelapp.entity.AdminEntity;
import com.sjsu.cloud.travelapp.repository.AdminRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class AdminServiceTest {

    @Mock
    private AdminRepository adminRepository;

    @InjectMocks
    private AdminService adminService;

    private AdminEntity adminEntity;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        adminEntity = new AdminEntity();
        adminEntity.setAdminEmail("test@admin.com");
        adminEntity.setAdminPassword("password");
    }

    @Test
    void addAdmin_Successful() {
        when(adminRepository.save(any())).thenReturn(adminEntity);
        ResponseEntity<?> response = adminService.addAdmin(adminEntity);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Admin added successfully!", response.getBody());
    }

    @Test
    void deleteAdmin_Successful() {
        doNothing().when(adminRepository).delete(any());
        ResponseEntity<?> response = adminService.deleteAdmin(adminEntity);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Admin deleted successfully!", response.getBody());
    }
}
