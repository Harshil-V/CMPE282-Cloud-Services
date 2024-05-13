package com.sjsu.cloud.travelapp.service;

import com.sjsu.cloud.travelapp.entity.UserEntity;
import com.sjsu.cloud.travelapp.model.User;
import com.sjsu.cloud.travelapp.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private UserEntity userEntity;
    private User user;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userEntity = new UserEntity();
        userEntity.setUserEmail("user@example.com");
        userEntity.setUserPassword("securepassword");
        user = new User();
        user.setUserEmail("user@example.com");
        user.setUserPassword("securepassword");
    }

    @Test
    void authenticateUserLogin_Success() {
        when(userRepository.findByUserEmail(anyString())).thenReturn(userEntity);
        ResponseEntity<String> response = userService.authenticateUserLogin(user);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Login successful!", response.getBody());
    }

    @Test
    void authenticateUserLogin_NotFound() {
        when(userRepository.findByUserEmail(anyString())).thenReturn(null);
        ResponseEntity<String> response = userService.authenticateUserLogin(user);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Email or password not found!", response.getBody());
    }

    @Test
    void addUser_Successful() {
        when(userRepository.save(any())).thenReturn(userEntity);
        ResponseEntity<?> response = userService.addUser(userEntity);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("User added successfully!", response.getBody());
    }

    @Test
    void deleteUser_Successful() {
        doNothing().when(userRepository).delete(any());
        ResponseEntity<?> response = userService.deleteUser(userEntity);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User deleted successfully!", response.getBody());
    }
}
