package com.warehouse.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.warehouse.Service.StorageBinService;
import com.warehouse.dto.StorageBindto;

@RestController
@RequestMapping("/api")
public class StorageBinController {

    @Autowired
    private StorageBinService storageBinService;

    @PostMapping("/storage-bin")
    public ResponseEntity<StorageBindto> crateLocation(@RequestBody StorageBindto storageBindto){
           StorageBindto storageBindto1 = storageBinService.createLocation(storageBindto);
              return new ResponseEntity<>(storageBindto1,HttpStatus.CREATED);
    }
    
}
