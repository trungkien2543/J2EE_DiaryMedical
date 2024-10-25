package com.project.MedicalDiary.Service.Imp;

import com.project.MedicalDiary.Entity.Receipt;

import java.util.List;
import java.util.Optional;

public interface ReceiptService {
    List<Receipt> getListReceipt();
    List<Receipt> getListReceiptByIdPatient(String idPatient);
    Optional<Receipt> getReceiptById(String idReceipt);
    Receipt createReceipt(Receipt receipt);
    boolean deleteReceipt(Receipt receipt);
    boolean updateReceipt(Receipt receipt);
}
