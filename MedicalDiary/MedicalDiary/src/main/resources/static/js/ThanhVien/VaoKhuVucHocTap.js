function openFormEnter() {
    document.getElementById("enterForm").style.display = "block";
}

function closeFormEnter() {
    document.getElementById("enterForm").style.display = "none";
}

$(document).ready(function() {
    $('#enterPersonCode').select2();
});

var enterPersonCodeInput = document.getElementById('enterPersonCode');
enterPersonCodeInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        var maTV = enterPersonCodeInput.value.trim();

        checkAndDisplayInfo(maTV);
    }
});



// Hàm kiểm tra và hiển thị thông tin Thành viên
function checkAndDisplayInfo(maTV) {
    const requestBody = {
        maTV: maTV
    };

    fetch('/ThanhVien.html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                if (data.isViolating) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Cảnh báo!',
                        text: 'Sinh viên đang bị vi phạm!',
                    });
                } else{
                    document.getElementById('enterPersonName').value = data.thanhVien.ten;
                    document.getElementById('enterPersonKhoa').value = data.thanhVien.khoa;
                    document.getElementById('enterPersonNganh').value = data.thanhVien.nganh;
                    document.getElementById('enterPersonSDT').value = data.thanhVien.sdt;
                    document.getElementById('enterPersonEmail').value = data.thanhVien.email;
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Mã thành viên không đúng!',
            });
        }
    })
    .catch(error => {
        console.error('Lỗi khi gửi yêu cầu: ', error);
        Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: 'Đã xảy ra lỗi khi gửi yêu cầu!',
        });
    });
}

