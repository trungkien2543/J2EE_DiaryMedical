
//Xu ly bat form nhap thong tin nguoi nha
function showForm(text) {
    document.getElementById('familyForm').style.display = 'block';
    document.querySelector('.modal-backdrop').style.display = 'block';
    document.body.classList.add('modal-open'); // Dòng document.body.classList.add('modal-open'); trong JavaScript có chức năng thêm class modal-open vào thẻ <body> của trang HTML khi bạn gọi hàm showForm().

    if (text == 'add'){
        document.getElementById('btn-updates').style.display = 'none'
        document.getElementById('btn-saves').style.display = 'block'
    }else{
        document.getElementById('btn-saves').style.display = 'none'
        document.getElementById('btn-updates').style.display = 'block'
    }


}

function hideForm() {
    document.getElementById('familyForm').style.display = 'none';
    document.querySelector('.modal-backdrop').style.display = 'none';
    document.body.classList.remove('modal-open');

    // Xóa giá trị của các trường để nhập thành viên tiếp theo
    document.getElementById('familyFormedit').reset();

}

// Danh sach nguoi dung se them
const members = [];


let indexUser = 0;





// Hàm thêm thành viên vào bảng
function renderMembers(members) {
    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = ''; // Xóa nội dung hiện tại của tbody

    members.forEach((member, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${member.cccd}</td>
            <td>${member.name}</td>
            <td>${member.gender === '1' ? 'Nam' : 'Nữ'}</td>
            <td>${member.healthInsurance}</td>
            <td>${member.phone}</td>
            <td>${member.job}</td>
            <td>${member.department}</td>
            <td>${member.address}</td>
            <td>${member.medicalHistory}</td>
            <td>
                <button data-id="${member.cccd}" class="btn btn-datatable btn-icon btn-transparent-dark me-2 px-1 family-edit" data-placement="top" title="Sửa" data-toggle="modal" data-target="#AddQuanTam">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                </button>
                <button data-id="${member.cccd}" class="btn btn-datatable btn-icon btn-transparent-dark px-1 family-delete" data-placement="top" title="Xoá">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </button>
            </td>
        `;

        tbody.appendChild(row);

        // Gán sự kiện cho nút sửa
        row.querySelector('.family-edit').addEventListener('click', function() {
            var cccd = this.getAttribute('data-id');
            console.log('Sửa với CCCD:', cccd);
            // Thực hiện các hành động cần thiết với cccd

            editInfo(cccd)
        });

        // Gán sự kiện cho nút xóa
        row.querySelector('.family-delete').addEventListener('click', function() {
            var cccd = this.getAttribute('data-id');
            console.log('Xóa với CCCD:', cccd);
            // Thực hiện các hành động cần thiết với cccd

            deleteInfo(cccd)

        });

        tbody.appendChild(row);
    });


}



// Xu ly them thong tin nguoi dung tu form

document.getElementById('btn-saves').addEventListener('click', function () {
    const member = {
        name: document.getElementById('HoTen').value,
        cccd: document.getElementById('CCCD').value,
        gender: document.getElementById('Gender').value,
        healthInsurance: document.getElementById('BHYT').value,
        phone: document.getElementById('Phone').value,
        job: document.getElementById('Job').value,
        department: document.getElementById('Department').value,
        address: document.getElementById('Address').value,
        medicalHistory: document.getElementById('Medical_History').value
    };

    for (let index = 0; index < membersList.length; index++) {
        const memberInDB = membersList[index];
        if (memberInDB.cccd == member.cccd) {
            Swal.fire({
                title: 'Error',
                text: 'User information registered to another family',
                icon: 'error',
                confirmButtonText: 'OK',
            }).then((result) => {
                // Thoát khỏi hàm sau khi thông báo được hiển thị
                return; // Kết thúc hàm

            });
            return; // Ngừng thực hiện hàm nếu thông báo lỗi được hiển thị

        }
    }

    members.push(member);

    // Hiển thị danh sách đã thêm
    renderMembers(members);

    // Xóa giá trị của các trường để nhập thành viên tiếp theo
    document.getElementById('familyFormedit').reset();

    hideForm();
});

document.getElementById('btn-updates').addEventListener('click', function () {


    Swal.fire({
        title: 'Warning',
        text: 'Are you sure you want to correct the information?',
        icon: 'warning',
        showCancelButton: true,    // Hiển thị nút hủy
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Nếu người dùng nhấn OK, thực hiện cập nhật thông tin
            const member = {
                name: document.getElementById('HoTen').value,
                cccd: document.getElementById('CCCD').value,
                gender: document.getElementById('Gender').value,
                healthInsurance: document.getElementById('BHYT').value,
                phone: document.getElementById('Phone').value,
                job: document.getElementById('Job').value,
                department: document.getElementById('Department').value,
                address: document.getElementById('Address').value,
                medicalHistory: document.getElementById('Medical_History').value
            };

            members[indexUser] = member;

            // Hiển thị danh sách đã thêm
            renderMembers(members);

            // Xóa giá trị của các trường để nhập thành viên tiếp theo
            document.getElementById('familyFormedit').reset();

            hideForm();
        } else {
            // Nếu người dùng nhấn Cancel, không làm gì cả
            console.log('Action canceled by user');
        }
    });



});


// Xu ly sua thong tin

function editInfo (id){

    for (let index = 0; index < members.length; index++) {
        const member = members[index];
        if (member.cccd == id) {

            document.getElementById('CCCD').value = member.cccd
            document.getElementById('HoTen').value = member.name
            document.getElementById('Gender').value = member.gender
            document.getElementById('BHYT').value = member.healthInsurance
            document.getElementById('Phone').value = member.phone
            document.getElementById('Job').value = member.job
            document.getElementById('Department').value = member.department
            document.getElementById('Address').value = member.address
            document.getElementById('Medical_History').value = member.medicalHistory

            showForm('edit')

            indexUser = index;

            return true
        }
    }
}

function deleteInfo(id){
    for (let index = 0; index < members.length; index++) {
        const member = members[index];
        if (member.cccd == id) {

            Swal.fire({
                title: 'Warning',
                text: 'Are you sure you want to delete the information?',
                icon: 'warning',
                showCancelButton: true,    // Hiển thị nút hủy
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    members.splice(index,1)

                }

                renderMembers(members)

            });


            return true
        }
    }



}





document.getElementById('submitBtn').addEventListener('click', function () {
    fetch('/api/saveFamilyMembers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(members)
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            // Xóa danh sách sau khi gửi thành công
            members.length = 0; // Xóa mảng members
            document.getElementById('membersList').innerHTML = ''; // Xóa danh sách hiển thị
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
