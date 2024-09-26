// Danh sách các id mà người dùng đã thực hiện check vào
const list_id_check = []

// Lấy giá trị của trạng thái từ thẻ td và chuyển đổi thành "chưa xử lý" hoặc "đã xử lý"
// Lấy tất cả các phần tử có class là 'trang_thaixl'
var elements = document.getElementsByClassName("trang_thaixl");
// Lặp qua từng phần tử để xử lý
for (var i = 0; i < elements.length; i++) {
    var trangThai = elements[i].innerText;
    if (trangThai === "0") {
        elements[i].innerText = "Chưa xử lý";
    } else if (trangThai === "1") {
        elements[i].innerText = "Đã xử lý";
    } else {
        elements[i].innerText = "Không xác định";
    }
}




//Hiện giờ ngày tháng năm lên form:
document.addEventListener("DOMContentLoaded", function() {
    // Lấy thẻ input của trường ngày xử lý
    var ngayXuLyInput = document.getElementById("NgayXL");

    // Hàm để lấy ngày và giờ hiện tại
    function getCurrentDateTime() {
        var now = new Date();
        var year = now.getFullYear();
        var month = (now.getMonth() + 1).toString().padStart(2, "0");
        var day = now.getDate().toString().padStart(2, "0");
        var hours = now.getHours().toString().padStart(2, "0");
        var minutes = now.getMinutes().toString().padStart(2, "0");
        var seconds = now.getSeconds().toString().padStart(2, "0");
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    }

    // Hiển thị ngày và giờ hiện tại trong trường nhập liệu khi form được mở
    function showCurrentDateTime() {
        ngayXuLyInput.value = getCurrentDateTime();
    }

    // Gọi hàm hiển thị ngày và giờ khi form được mở
    showCurrentDateTime();
});
                                    
// Hiện form lên 
function openFormEdit() {
    document.getElementById("editXLVP").style.display = "block";
}

// Tắt form
function closeFormEdit() {
    document.getElementById("editXLVP").style.display = "none";
}




// thực hiện đổ dữ liệu lên
document.addEventListener('DOMContentLoaded', function () {
    // Lấy tất cả các nút "Sửa"
    var editButtons = document.querySelectorAll('.openFormEditXLVP');

    // Lặp qua từng nút "Sửa"
    editButtons.forEach(function (button) {
        // Bắt sự kiện click
        button.addEventListener('click', function () {

            // Lấy ID của thiết bị từ thuộc tính data
            var maxl = button.closest('tr').getAttribute('maxl');
            var matv = button.closest('tr').getAttribute('matv');
            var hinh_thucxl = button.closest('tr').getAttribute('hinh_thucxl');
            var so_tien = button.closest('tr').getAttribute('so_tien');
            var ngayxl = button.closest('tr').getAttribute('ngayxl');
            var trang_thaixl = button.closest('tr').getAttribute('trang_thaixl');

            openFormEdit();
            // Lấy phần tử input bằng id

            var MaXLInput = document.getElementById('edit_MaXL');
            var MaTVInput = document.getElementById('edit_MaTV');
            var HTXLInput = document.getElementById('edit_HTXL');
            var SoTienInput = document.getElementById('edit_SoTien');
            var NgayXLInput = document.getElementById('edit_NgayXL');
            var TrangThaiXLInput = document.getElementById('edit_TrangThaiXL');

            // Kiểm tra xem phần tử có tồn tại không
            if (MaXLInput && MaTVInput && HTXLInput && SoTienInput && NgayXLInput && TrangThaiXLInput) {
                // Set giá trị mới cho trường input
                MaXLInput.value = maxl;
                MaTVInput.value = matv;
                HTXLInput.value = hinh_thucxl;
                SoTienInput.value = so_tien;
                NgayXLInput.value = ngayxl;
                if (trang_thaixl === "0") {
                    TrangThaiXLInput.value = "Chưa xử lý";
                } else if (trang_thaixl === "1") {
                    TrangThaiXLInput.value = "Đã xử lý";
                } else {
                    TrangThaiXLInput.value = "Không xác định";
                }
            }

        });
    });
});

// Thực hiện thay đổi thông tin xử lý vi phạm
function saveEdit() {

    // Lấy phần tử input bằng id
    var MaXLInput = document.getElementById('edit_MaXL');
    var MaTVInput = document.getElementById('edit_MaTV');
    var HTXLInput = document.getElementById('edit_HTXL');
    var SoTienInput = document.getElementById('edit_SoTien');
    var NgayXLInput = document.getElementById('edit_NgayXL');
    var TrangThaiXLInput = document.getElementById('edit_TrangThaiXL');

    if (MaXLInput && MaTVInput && HTXLInput && SoTienInput && NgayXLInput && TrangThaiXLInput) {
        const MaXL = MaXLInput.value; 
        const MaTV = MaTVInput.value; 
        const HTXL = HTXLInput.value; 
        const SoTien = SoTienInput.value; 
        const NgayXL = NgayXLInput.value; 
        const TrangThaiXL = TrangThaiXLInput.selectedIndex; 

        fetch('/XuLyViPham.html?MaXL=' + MaXL + '&MaTV=' + MaTV + '&HTXL=' + HTXL + '&SoTien=' + SoTien + '&NgayXL=' + NgayXL + '&TrangThaiXL=' + TrangThaiXL, {
            method: 'PUT'
        })
        .then(response => {
            if (response.ok) {
                closeFormEdit();
                Swal.fire({
                    text: "Sửa thành công !!",
                    icon: "success"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  })
                
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
                    text: "Vui lòng nhập số tiền!",
                });
            }
        })
        .catch(error => {
            console.error('Lỗi khi gửi yêu cầu: ', error);
        });
    }
}

function deleteXLVP() {

    if (list_id_check.length == 0){
        alert("Vui lòng chọn thiết bị muốn xóa");

        return;
    }

    const confirmation = confirm("Bạn có chắc chắn muốn xóa không?");

    if (confirmation) {
        fetch('/XuLyViPham.html', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(list_id_check) // Chuyển danh sách ID thành JSON và gửi đi
        })
        .then(response => {
            if (response.ok) {
                alert("Hệ thống sẽ không xóa các vi phạm chưa được xử lý");
                window.location.reload(); // Làm mới trang sau khi hiển thị thông báo
                
            } else {
                console.error('Lỗi khi xóa xử lý vi phạm');
            }
            
        })
        .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        });
    } else {
        console.log("Không xóa")
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả check box
    var checkbox = document.querySelectorAll(".checkbox_ID");

    console.log(checkbox.length)

    // Lặp qua từng checkbox
    checkbox.forEach(function (check){
        check.addEventListener('change', function(){

            var id = check.value

            if (check.checked){

                // Thêm id vào danh sách check
                list_id_check.push(id)

                console.log(list_id_check)


            }
            else{
                const indexToRemove = list_id_check.indexOf(id);

                if (indexToRemove !== -1) {
                    list_id_check.splice(indexToRemove, 1);
                }

                console.log(list_id_check)

            }

        });
    });


})



$('#dataTable').dataTable({
    "bPaginate": false
});


var checkAll = document.getElementById("checkAll");

// Lấy tất cả check box
var checkboxesInTable = document.querySelectorAll(".checkbox_ID");


// bắt sự kiện của thanh search
var dataTableFilter = document.getElementById("dataTable_filter");
var searchInput = dataTableFilter.querySelector('input[type="search"]');


searchInput.addEventListener("input", function() {

    // Xóa check trước khi search

    checkboxesInTable.forEach(function (check) {
            
        check.checked = false
        
        list_id_check.length = 0;
        
    });

    // Lấy tất cả các checkbox có ID trong bảng
    checkboxesInTable = document.querySelectorAll(".checkbox_ID");

    checkAll.checked = false;
    
});



checkAll.addEventListener('change', function() {


    // Xóa toàn bộ nội dung của mảng
    list_id_check.length = 0;

    if (this.checked) {
        console.log('CheckboxAll is checked');
        // Thực hiện các hành động khi checkbox được chọn


        checkboxesInTable.forEach(function (check) {
            
            check.checked = true

            var id = check.value
            
            list_id_check.push(id)
            
        });

    } else {
        console.log('CheckboxAll is unchecked');
        // Thực hiện các hành động khi checkbox không được chọn

        checkboxesInTable.forEach(function (check) {
                
            check.checked = false


        });

    }

    console.log(list_id_check)

});