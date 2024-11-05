// Hàm mở modal
function openReceiptModal(CCCD) {
    const modal = document.getElementById('receiptModal');
    modal.style.display = 'block';
    document.getElementById("idPatient").value = CCCD
}

// Hàm đóng modal và reset form
function closeReceiptModal() {
    document.getElementById('receiptModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('receiptForm').reset();
    document.getElementById('resultPreview').style.display = 'none';
    document.getElementById('medicinePreview').style.display = 'none';
}

// // Hàm để hiển thị hình ảnh xem trước
// function previewImage(event, previewId) {
//     const previewElement = document.getElementById(previewId);
//     const file = event.target.files[0];
//
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             previewElement.src = e.target.result;
//             previewElement.style.display = 'block';
//         };
//         reader.readAsDataURL(file);
//     } else {
//         previewElement.style.display = 'none';
//     }
// }

function previewImage(event, previewId) {
    const output = document.getElementById(previewId);
    output.src = URL.createObjectURL(event.target.files[0]);
    output.style.display = "block";
    output.onload = function() {
        URL.revokeObjectURL(output.src); // Giải phóng bộ nhớ
    };
}

// Đóng modal khi người dùng nhấp ra ngoài modal
window.onclick = function(event) {
    const modal = document.getElementById('receiptModal');
    if (event.target === modal) {
        closeReceiptModal();
    }
};
