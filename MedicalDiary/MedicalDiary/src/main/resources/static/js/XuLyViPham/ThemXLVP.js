function openFormAdd() {
    document.getElementById("addXLVP").style.display = "block";
}

function closeFormAdd() {
    document.getElementById("addXLVP").style.display = "none";
}
var addButton = document.getElementById('openFormButton');

$(document).ready(function() {
    $('#MaTV').select2();
});

function saveAdd() {
    // Lấy phần tử input bằng id

    var MaTV = document.getElementById('MaTV');
    var HTXL = document.getElementById('HTXL');
    var SoTien = document.getElementById('SoTien');
    var NgayXL = document.getElementById('NgayXL');
    var TrangThaiXL = document.getElementById('TrangThaiXL');

    

    if (MaTV && HTXL && SoTien && NgayXL && TrangThaiXL) {

        const matv = MaTV.value;
        const htxl = HTXL.value; 
        const sotien = SoTien.value; 
        const ngayxl = NgayXL.value;
        const trangthaixl = TrangThaiXL.selectedIndex;
        console.log(typeof(matv))
        if (matv.trim() === '' || sotien.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Vui lòng nhập đầy đủ thông tin!',
            });
            return;
        }
        fetch('/XuLyViPham.html?MaTV=' + matv + '&HTXL=' + htxl + '&SoTien=' + sotien + '&NgayXL=' + ngayxl+ '&TrangThaiXL=' + trangthaixl, {
            method: 'POST'
        })
        .then(response => {
            if (response.ok) {
                // // Sau khi lưu xong, bạn có thể đóng form bằng cách gọi hàm closeForm()
                closeFormAdd();

                Swal.fire({
                    text: "Thêm thành công !",
                    icon: "success"
                 }).then((result) => {
                      if (result.isConfirmed) {
                          window.location.reload();
                      }
                   });
                
            } else {
                console.error('Lỗi khi thêm xử lý vi phạm');
            }
        })
        .catch(error => {
            console.error('Lỗi khi gửi yêu cầu: ', error);
        });
    }
}

// Thêm trình nghe sự kiện cho sự kiện nhấp chuột
addButton.addEventListener('click', function(event) {
    openFormAdd();
});