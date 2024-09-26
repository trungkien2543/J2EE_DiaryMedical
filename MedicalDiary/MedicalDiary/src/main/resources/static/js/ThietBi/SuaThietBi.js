
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

    // Lấy phần tử input bằng id
    var deviceId = document.getElementById('deviceCode');
    var deviceName = document.getElementById('deviceName');
    var deviceDescription = document.getElementById('deviceDescription');
    
    if (deviceId && deviceName && deviceDescription) {
        const maTB = deviceId.value; // Giá trị MaTB
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

        fetch('/ThietBi.html?MaTB=' + maTB + '&TenTB=' + tenTB + '&MoTaTB=' + moTaTB, {
            method: 'PUT'
        })
        .then(response => {
            if (response.ok) {
                // // Sau khi lưu xong, bạn có thể đóng form bằng cách gọi hàm closeForm()
                closeFormEdit();

                Swal.fire({
                    title: "~Tuyệt~",
                    text: "Dữ liệu đã được sửa thành công",
                    icon: "success"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  })

                
            } else {
                console.error('Lỗi khi lưu thiết bị');
            }
        })
        .catch(error => {
            console.error('Lỗi khi gửi yêu cầu: ', error);
        });
    }
}


function deleteThietBi() {

    if (list_id_check.length == 0){
        alert("Vui lòng chọn thiết bị muốn xóa");

        return;
    }

    const confirmation = confirm("Bạn có chắc chắn muốn xóa không?");

    if (confirmation) {
        fetch('/ThietBi.html', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(list_id_check) // Chuyển danh sách ID thành JSON và gửi đi
        })
        .then(response => {
            if (!response.ok) {
                alert ("Không được");
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then (data =>{
            Swal.fire({
                title: "Thông báo",
                text: data,
                icon: "info"
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              })

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

            // Lấy ID của thiết bị từ thuộc tính data
            var deviceId = button.closest('tr').getAttribute('idtb');
            var deviceName = button.closest('tr').getAttribute('tentb');
            var deviceDescription = button.closest('tr').getAttribute('motatb');

            openFormEdit();
            // Lấy phần tử input bằng id

            var deviceIdInput = document.getElementById('deviceCode');
            var deviceNameInput = document.getElementById('deviceName');
            var deviceDescriptionInput = document.getElementById('deviceDescription');

            // Kiểm tra xem phần tử có tồn tại không
            if (deviceIdInput && deviceNameInput && deviceDescriptionInput) {
                // Set giá trị mới cho trường input
                deviceIdInput.value = deviceId;
                deviceNameInput.value = deviceName;
                deviceDescriptionInput.value = deviceDescription;
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

