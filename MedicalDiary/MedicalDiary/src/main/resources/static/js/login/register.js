
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

    resetForm();

}

function resetForm() {
    document.getElementById('CCCD').value = ''; // Reset CCCD
    document.getElementById('HoTen').value = ''; // Reset Full Name
    document.getElementById('Gender').selectedIndex = 0; // Reset Gender về Male (giá trị 1)
    document.getElementById('BHYT').value = ''; // Reset Health Insurance
    document.getElementById('Phone').value = ''; // Reset Phone
    document.getElementById('Job').value = ''; // Reset Job
    document.getElementById('Department').value = ''; // Reset Department
    document.getElementById('Address').value = ''; // Reset Address
    document.getElementById('Medical_History').value = ''; // Reset Medical History
}





let indexUser = 0;

// Hàm thêm thành viên vào bảng
function renderMembers(members) {
    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = ''; // Xóa nội dung hiện tại của tbody

    members.forEach((member, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <div>${member.cccd}</div>
                <input type="hidden" name="familyMembers[${index}].cccd" value="${member.cccd}" />
            </td>
            <td>
                <div>${member.name}</div>
                <input type="hidden" name="familyMembers[${index}].name" value="${member.name}" />
            </td>
            <td>
                <div>${member.gender === '1' ? 'Nam' : 'Nữ'}</div>
                <input type="hidden" name="familyMembers[${index}].gender" value="${member.gender}" />
            </td>
            <td>
                <div>${member.bhyt}</div>
                <input type="hidden" name="familyMembers[${index}].healthInsurance" value="${member.bhyt}" />
            </td>
            <td>
                <div>${member.phone}</div>
                <input type="hidden" name="familyMembers[${index}].phone" value="${member.phone}" />
            </td>
            <td>
                <div>${member.job}</div>
                <input type="hidden" name="familyMembers[${index}].job" value="${member.job}" />
            </td>
            <td>
                <div>${member.department}</div>
                <input type="hidden" name="familyMembers[${index}].department" value="${member.department}" />
            </td>
            <td>
                <div>${member.address}</div>
                <input type="hidden" name="familyMembers[${index}].address" value="${member.address}" />
            </td>
            <td>
                <div>${member.medicalHistory}</div>
                <input type="hidden" name="familyMembers[${index}].medicalHistory" value="${member.medicalHistory}" />
            </td>
            <td>
                <button type="button" data-id="${member.cccd}" class="btn btn-datatable btn-icon btn-transparent-dark me-2 px-1 family-edit" data-placement="top" title="Sửa" data-toggle="modal" data-target="#AddQuanTam">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                </button>
                <button type="button" data-id="${member.cccd}" class="btn btn-datatable btn-icon btn-transparent-dark px-1 family-delete" data-placement="top" title="Xoá">
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
            editInfo(cccd);
        });

        // Gán sự kiện cho nút xóa
        row.querySelector('.family-delete').addEventListener('click', function() {
            var cccd = this.getAttribute('data-id');
            console.log('Xóa với CCCD:', cccd);
            // Thực hiện các hành động cần thiết với cccd
            deleteInfo(cccd);
        });
    });
}



// Xu ly them thong tin nguoi dung tu form

document.getElementById('btn-saves').addEventListener('click', function () {

    const member = GetandCheck()

    if (member == null){
        return;
    }


    membersRegister.push(member);

    // Hiển thị danh sách đã thêm
    renderMembers(membersRegister);

    resetForm();

    // console.log(members)

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

            const member = GetandCheck()


            if (member == null){
                return;
            }

            membersRegister[indexUser] = member;

            // Hiển thị danh sách đã thêm
            renderMembers(membersRegister);

            resetForm();

            hideForm();
        }
    });



});

// Xu ly sua thong tin

function editInfo (id){

    for (let index = 0; index < membersRegister.length; index++) {
        const member = membersRegister[index];
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
    for (let index = 0; index < membersRegister.length; index++) {
        const member = membersRegister[index];
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


// Tich hop code ngan gon
function GetandCheck() {
    const member = {
        cccd: document.getElementById('CCCD').value,
        name: document.getElementById('HoTen').value,
        gender: document.getElementById('Gender').value,
        healthInsurance: document.getElementById('BHYT').value,
        phone: document.getElementById('Phone').value,
        job: document.getElementById('Job').value,
        department: document.getElementById('Department').value,
        address: document.getElementById('Address').value,
        medicalHistory: document.getElementById('Medical_History').value
    };

    // Kiểm tra các trường có bị bỏ trống hay không
    for (let key in member) {
        if (!member[key]) {
            showError(`Please fill out the ${key} field`);
            return null;
        }
    }

    // Kiểm tra độ dài CCCD và số điện thoại
    if (member.cccd.length !== 12) {
        showError('CCCD must be 12 digits');
        return null;
    }

    if (member.phone.length !== 10) {
        showError('Phone number must be 10 digits');
        return null;
    }

    // Kiểm tra trùng lặp trong danh sách
    if (checkDuplicate(member, membersList) || checkDuplicate(member, membersRegister)) {
        return null;
    }

    return member;
}

// Hàm hiển thị thông báo lỗi
function showError(message) {
    Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK',
    });
}

// Hàm kiểm tra trùng lặp
function checkDuplicate(member, list) {
    for (let index = 0; index < list.length; index++) {
        const memberInList = list[index];

        if (memberInList.cccd === member.cccd) {
            showError('CCCD has already been used');
            return true;
        }

        if (memberInList.phone === member.phone) {
            showError('Phone number has already been used');
            return true;
        }
    }
    return false;
}








