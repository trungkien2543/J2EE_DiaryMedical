function openFormAdd() {
    document.getElementById("addForm").style.display = "block";
}

function closeFormAdd() {
    document.getElementById("addForm").style.display = "none";

    var deviceId = document.getElementById('adddeviceCode');
    var deviceName = document.getElementById('adddeviceName');
    var deviceDescription = document.getElementById('adddeviceDescription');

    deviceId.selectedIndex = 0;
    deviceName.value = '';
    deviceDescription.value = '';
}


function saveAdd() {
    // Lấy phần tử input bằng id

    var deviceId = document.getElementById('adddeviceCode');
    var deviceName = document.getElementById('adddeviceName');
    var deviceDescription = document.getElementById('adddeviceDescription');
    if (deviceId && deviceName && deviceDescription) {

        const loaiTBIndex = deviceId.selectedIndex;
        const tenTB = deviceName.value; // Giá trị TenTB
        const moTaTB = deviceDescription.value; // Giá trị MoTaTB

        if (tenTB == '' || moTaTB == ''){
            Swal.fire({
                title: "Cảnh báo",
                text: "Không để trống thông tin",
                icon: "error"
              })
            return;
        }

        fetch('/ThietBi.html?LoaiTBIndex=' + loaiTBIndex + '&TenTB=' + tenTB + '&MoTaTB=' + moTaTB, {
            method: 'POST'
        })
        .then(response => {
            if (response.ok) {
                // // Sau khi lưu xong, bạn có thể đóng form bằng cách gọi hàm closeForm()
                closeFormAdd();

                Swal.fire({
                    title: "~Tuyệt~",
                    text: "Thêm thành công",
                    icon: "success"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  })
                
            } else {
                console.error('Lỗi khi thêm thiết bị');
            }
        })
        .catch(error => {
            console.error('Lỗi khi gửi yêu cầu: ', error);
        });
    }
}
var addButton = document.getElementById('addButton');

// Thêm trình nghe sự kiện cho sự kiện nhấp chuột
addButton.addEventListener('click', function(event) {
    openFormAdd();
});


