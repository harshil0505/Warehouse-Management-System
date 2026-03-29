package com.warehouse.Service;

import java.util.List;

import org.jspecify.annotations.Nullable;

import com.warehouse.dto.StorageBindto;
import com.warehouse.model.StorageBin;

public interface StorageBinService {

    StorageBindto createLocation(StorageBindto dto);

     List<StorageBin> getAllBins();

}
