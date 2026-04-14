package com.warehouse.Service;

import java.util.List;

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



    @Autowired
    private StorageBinRepository repository;

    public StorageBindto createLocation(StorageBindto dto) {

        if (dto.getStorageBinId() == null ||
            dto.getZone() == null ||
            dto.getRow() == null ||
            dto.getRack() == null ||
            dto.getShelf() == null ||
            dto.getBin() == null) {
            throw new RuntimeException("All fields required");
        }

        StorageBin entity = new StorageBin();
        entity.setStorageBinId(dto.getStorageBinId());
        entity.setZone(dto.getZone());
        entity.setRow(dto.getRow());
        entity.setRack(dto.getRack());
        entity.setShelf(dto.getShelf());
        entity.setBin(dto.getBin());
        entity.setLocationcodeType(LocationcodeType.BIN);

      
        StorageBin saved = repository.save(entity);

        
        String code = generateLocationCode(
            saved.getStorageBinId(),
            saved.getZone(),
            saved.getRow(),
            saved.getRack(),
            saved.getShelf(),
            saved.getBin()
        );

        saved.setLocationcode(code);
        repository.save(saved);

        dto.setStorageBinId(saved.getStorageBinId());
        dto.setLocationcode(code);

        return dto;
    }

    public String generateLocationCode(Long storageBinId, String zone,
                                       Integer row, Integer rack, Integer shelf, Integer bin) {

        return String.format(
            "%d-%s-R%02d-K%02d-S%02d-B%02d",
            storageBinId,
            zone.toLowerCase(),
            row,
            rack,
            shelf,
            bin
        );
    }

    @Override
    public List<StorageBin> getAllBins() {
        return storageBinRepository.findAll();
    }

}

