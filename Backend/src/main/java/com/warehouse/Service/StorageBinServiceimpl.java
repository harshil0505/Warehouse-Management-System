package com.warehouse.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.warehouse.Repository.StorageBinRepository;
import com.warehouse.dto.StorageBindto;
import com.warehouse.model.LocationcodeType;
import com.warehouse.model.StorageBin;

@Service
public class StorageBinServiceimpl  implements StorageBinService {

    @Autowired
    private StorageBinRepository storageBinRepository;

    @Override
    public StorageBindto createLocation(StorageBindto storageBindto) {
        String locationcode = generateLocationCode(
            storageBindto.getId(),
            storageBindto.getZone(),
            storageBindto.getRow(),
            storageBindto.getRack(),
            storageBindto.getShelf(),
            storageBindto.getBin()
        );
        storageBindto.setLocationcode(locationcode);

        StorageBin entity = new StorageBin();
        entity.setLocationcode(locationcode);
        entity.setLocationcodeType(LocationcodeType.BIN);
        storageBinRepository.save(entity);
        return storageBindto;
     
    }
    public String generateLocationCode(Long Id,String zone, int row, int rack, int shelf, int bin) {

        return String.format(
            "%d-%s-R%02d-K%02d-S%02d-B%02d",
            Id,
            zone,
            row,
            rack,
            shelf,
            bin
        );
    }
}
