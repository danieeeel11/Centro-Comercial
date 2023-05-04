package com.cc.centroscomerciales.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/demo")
public class demo {
    @GetMapping
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Hola, funcionando");
    }
}
