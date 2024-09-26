function openFormGive() {
    document.getElementById("giveForm").style.display = "block";
}

function closeFormGive() {
    document.getElementById("giveForm").style.display = "none";
}


//
// thực hiện đổ dữ liệu lên
document.addEventListener('DOMContentLoaded', function () {
    // Lấy tất cả các nút "Sửa"
    var editButtons = document.querySelectorAll('.openFormTra');

    // Lặp qua từng nút "Sửa"
    editButtons.forEach(function (button) {
        // Bắt sự kiện click
        button.addEventListener('click', function () {
            // Lấy dữ liệu từ các thuộc tính của hàng
            var personIdtt = button.closest('tr').getAttribute('idtt');
//            var personIdtv = button.closest('tr').getAttribute('idtv');
//            var personIdtb = button.closest('tr').getAttribute('idtb');
//            var personTgmuon = button.closest('tr').getAttribute('tgmuon');
//            var personTgtra = button.closest('tr').getAttribute('tgtra');

            const requestBody = {
                        personIdtt: personIdtt
                    };


                // Gửi yêu cầu kiểm tra Mã Thành viên và lấy thông tin từ máy chủ (server)
                fetch('/ThanhVien.html', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                })
                .then(response => {
                        if (response.ok) {

                            Swal.fire({
                                  title: "~Tuyệt~",
                                  text: "Trả thiết bị thành công !!",
                                  icon: "success"
                               }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.reload();
                                    }
                                 });

                        } else {
                            // Nếu mã Thành viên không đúng, hiển thị thông báo lỗi
                            Swal.fire({
                                icon: 'error',
                                title: 'Lỗi!',
                                text: 'Trả thiết bị thất bại!',
                            });
                        }
                })




        });
    });
});


