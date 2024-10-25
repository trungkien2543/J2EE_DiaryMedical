package com.project.MedicalDiary.Service;

import com.project.MedicalDiary.Entity.Receipt;
import com.project.MedicalDiary.Repository.ReceiptRepository;
import com.project.MedicalDiary.Service.Imp.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReceiptServiceImp implements ReceiptService {

    private final ReceiptRepository receiptRepository;

    @Autowired
    public ReceiptServiceImp(ReceiptRepository receiptRepository) {
        this.receiptRepository = receiptRepository;
    }

    @Override
    public List<Receipt> getListReceipt() {
        return receiptRepository.findAll();
    }

    @Override
    public List<Receipt> getListReceiptByIdPatient(String idPatient) {
        return receiptRepository.findByPatient_CCCD(idPatient);
    }

    @Override
    public Optional<Receipt> getReceiptById(String idReceipt) {
        return receiptRepository.findById(idReceipt);
    }

    @Override
    public Receipt createReceipt(Receipt receipt) {
        return receiptRepository.save(receipt);
    }

    @Override
    public boolean deleteReceipt(Receipt receipt) {
        if (receiptRepository.existsById(String.valueOf(receipt.getIDReceipt()))) {
            receiptRepository.delete(receipt);
            return true; // Deletion successful
        }
        return false; // Receipt does not exist
    }

    @Override
    public boolean updateReceipt(Receipt receipt) {
        if (receiptRepository.existsById(String.valueOf(receipt.getIDReceipt()))) {
            receiptRepository.save(receipt);
            return true; // Update successful
        }
        return false; // Receipt does not exist
    }
}