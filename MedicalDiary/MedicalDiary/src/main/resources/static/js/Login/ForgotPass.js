function confirmEmail() {
    const emailInput = document.getElementById("exampleInputEmail").value;
    console.log(emailInput);

    fetch('/QuenMatKhau.html?Email=' + emailInput, {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            document.querySelector(".InputEmail").style.display = "none";
            document.querySelector(".InputCode").style.display = "block";
            swal.fire({
                title: 'Thành công!',
                text: 'Email reset mật khẩu đã được gửi thành công!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } else {
            swal.fire({
                title: 'Lỗi!',
                text: 'Email không tồn tại. Vui lòng thử lại.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    })
    .catch(error => {
        console.error('Lỗi khi gửi yêu cầu: ', error);
        swal.fire({
            title: 'Lỗi!',
            text: 'Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });
}

function confirmCode() {
    const codeInput = document.getElementById("exampleInputCode").value;

    fetch('/VerifyCode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: codeInput })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const maTV = data.maTV;  // Lấy mã thành viên từ phản hồi
            swal.fire({
                title: 'Thành công!',
                text: 'Mã xác thực đúng! Đang chuyển hướng...',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = '/ThongTinTV.html?maTV=' + maTV;
            });
        } else {
            swal.fire({
                title: 'Lỗi!',
                text: 'Mã không hợp lệ. Vui lòng thử lại.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    })
    .catch(error => {
        console.error('Lỗi khi gửi yêu cầu: ', error);
        swal.fire({
            title: 'Lỗi!',
            text: 'Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });
}
