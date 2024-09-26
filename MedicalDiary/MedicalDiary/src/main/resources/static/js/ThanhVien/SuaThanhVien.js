
// Danh sách các id mà người dùng đã thực hiện check vào
const list_id_check = []

// Hiện form lên
function openFormEdit() {
    document.getElementById("editForm").style.display = "block";
}

// Tắt form
function closeFormEdit() {
    document.getElementById("editForm").style.display = "none";
}




// Thực hiện thay đổi thông tin thiết bị
function saveChanges() {

    // Lấy phần tử input bằng i
        var personId = document.getElementById('personCode');
        var personName = document.getElementById('personName');
        var personKhoa = document.getElementById('personKhoa');
        var personNganh = document.getElementById('personNganh');
        var personSDT = document.getElementById('personSDT');
        var personEmail = document.getElementById('personEmail');
        var personPassword = document.getElementById('personPassword');

        // Kiểm tra xem các phần tử input có tồn tại không
        if (personId && personName && personKhoa && personNganh && personSDT && personEmail && personPassword) {
            // Lấy giá trị từ các phần tử input
            const maTV = personId.value;
            const tenTV = personName.value;
            const khoa = personKhoa.value;
            const nganh = personNganh.value;
            const sdt = personSDT.value;
            const email = personEmail.value;
            const password = personPassword.value;

            fetch('/ThanhVien.html?MaTV=' + maTV + '&Ten=' + tenTV + '&Khoa=' + khoa + '&Nganh=' + nganh + '&SDT=' + sdt + '&Email=' + email + '&Password=' + password , {
                method: 'PUT'
            })
            .then(response => {
                        if (response.ok) {
                            // // Sau khi lưu xong, bạn có thể đóng form bằng cách gọi hàm closeForm()
                            closeFormEdit();
//                            window.location.reload(); // Làm mới trang sau khi hiển thị thông báo
                            Swal.fire({
                              title: "~Tuyệt~",
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
                                                            text: 'Sửa thất bại!',
                                                        });
                        }
                    })
                    .catch(error => {
                        console.error('Lỗi khi gửi yêu cầu: ', error);
                    });



        }
}

function deleteThanhVien() {

    if (list_id_check.length == 0){
        alert("Vui lòng chọn thành viên muốn xóa");

        return;
    }

    const confirmation = confirm("Bạn có chắc chắn muốn xóa không?");

    if (confirmation) {
        fetch('/ThanhVien.html', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(list_id_check) // Chuyển danh sách ID thành JSON và gửi đi
        })
        .then(response => {
            if (response.ok) {
//                alert("Hệ thống sẽ không xóa thiết bị đang được mượn hoặc đang được đặt chỗ");
//                window.location.reload(); // Làm mới trang sau khi hiển thị thông báo
                Swal.fire({
                  icon: "warning",
                  title: "Warning",
                  text: "Hệ thống sẽ không xóa thiết bị đang được mượn hoặc đang được đặt chỗ",
                }).then((result) => {
                                                if (result.isConfirmed) {
                                                  window.location.reload();
                                                }
                                              })

            } else {
                console.error('Lỗi khi xóa thiết bị');
            }

        })
        .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        });
    } else {
        console.log("Không xóa")
    }


}


// thực hiện đổ dữ liệu lên
document.addEventListener('DOMContentLoaded', function () {
    // Lấy tất cả các nút "Sửa"
    var editButtons = document.querySelectorAll('.openFormButton');

    // Lặp qua từng nút "Sửa"
    editButtons.forEach(function (button) {
        // Bắt sự kiện click
        button.addEventListener('click', function () {
            // Lấy dữ liệu từ các thuộc tính của hàng
            var personId = button.closest('tr').getAttribute('idtv');
            var personName = button.closest('tr').getAttribute('tentv');
            var personKhoa = button.closest('tr').getAttribute('khoa');
            var personNganh = button.closest('tr').getAttribute('nganh');
            var personSDT = button.closest('tr').getAttribute('sdt');
            var personEmail = button.closest('tr').getAttribute('email');
            var personPassword = button.closest('tr').getAttribute('password');

            openFormEdit();

            // Gán dữ liệu vào các input trong form chỉnh sửa
            var personIdInput = document.getElementById('personCode');
            var personNameInput = document.getElementById('personName');
            var personKhoaInput = document.getElementById('personKhoa');
            var personNganhInput = document.getElementById('personNganh');
            var personSDTInput = document.getElementById('personSDT');
            var personEmailInput = document.getElementById('personEmail');
            var personPasswordInput = document.getElementById('personPassword');

            // Kiểm tra xem các input có tồn tại không và gán giá trị
            if (personIdInput && personNameInput && personKhoaInput && personNganhInput && personSDTInput && personEmailInput && personPasswordInput) {
                personIdInput.value = personId;
                personNameInput.value = personName;
                personKhoaInput.value = personKhoa;
                personNganhInput.value = personNganh;
                personSDTInput.value = personSDT;
                personEmailInput.value = personEmail;
                personPasswordInput.value = personPassword;
            } else {
                console.error("Các input không tồn tại.");
            }
        });
    });
});





document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả check box
    var checkbox = document.querySelectorAll(".checkbox_ID");



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

