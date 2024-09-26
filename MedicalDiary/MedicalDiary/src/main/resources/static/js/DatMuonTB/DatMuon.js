
const list_id_check = []

function openFormEdit() {
    document.getElementById("editForm").style.display = "block";
}

function closeFormEdit() {
    document.getElementById("editForm").style.display = "none";
}


// thực hiện đổ dữ liệu lên
document.addEventListener('DOMContentLoaded', function () {
    // Lấy tất cả các nút "Sửa"
    var editButtons = document.querySelectorAll('.openFormButton');

    // Lặp qua từng nút "Sửa"
    editButtons.forEach(function (button) {
        // Bắt sự kiện click
        button.addEventListener('click', function () {

            // Lấy ID của thiết bị từ thuộc tính data
            var deviceId = button.closest('tr').getAttribute('idtb');


            openFormEdit();
            // Lấy phần tử input bằng id

            var deviceIdInput = document.getElementById('MaTB');


            // Kiểm tra xem phần tử có tồn tại không
            if (deviceIdInput) {
                // Set giá trị mới cho trường input
                deviceIdInput.value = deviceId;
            }

        });
    });
});

function AddThongTin() {
    // Lấy phần tử input bằng id

    var MaTV = document.getElementById('MaTV');
    var MaTB = document.getElementById('MaTB');
    var TGianDatCho = document.getElementById('tgianDatCho');


    if (MaTV && MaTB && TGianDatCho) {

        const matv = MaTV.value;
        const matb = MaTB.value; 
        const tgiandatcho = TGianDatCho.value; 


        fetch('/MuonTB.html?MaTV=' + matv + '&MaTB=' + matb + '&TGianDatCho=' + tgiandatcho, {
            method: 'POST'
        })
        .then(response => {
            if (response.ok) {
                // // Sau khi lưu xong, bạn có thể đóng form bằng cách gọi hàm closeForm()
                closeFormEdit();
                
            } else {
                console.error('Lỗi khi thêm thông tin sử dụng');
            }
            return response.json();
        })
        .then(data => {
		    // Xử lý thông báo từ máy chủ
		    if (data && data.message) {
                Swal.fire({
                    title: "Thông báo",
                    text: data.message,
                    icon: "info"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  })
		    } else {
		        console.error('Không có thông báo từ máy chủ');
		    }
  		})
        .catch(error => {
            console.error('Lỗi khi gửi yêu cầu: ', error);
        });
    }
}