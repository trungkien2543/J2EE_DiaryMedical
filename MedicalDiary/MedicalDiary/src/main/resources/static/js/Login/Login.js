// Thay thế alert bằng SweetAlert
function showErrorAlert(message) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
    });
}

function showSuccessAlert(message) {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
    });
}

function login() {
    var maTVInput = document.getElementById('exampleInputMaTV');
    var passwordInput = document.getElementById('exampleInputPassword');

    if (maTVInput && passwordInput) {
        const maTV = maTVInput.value;
        const password = passwordInput.value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(maTV)) {
            fetch('/getMatvFromEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'email=' + encodeURIComponent(maTV)
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else if (response.status === 404) {
                    throw new Error('Email không tồn tại trong hệ thống');
                } else {
                    throw new Error('Lỗi khi gửi yêu cầu lấy mã thành viên');
                }
            })
            .then(data => {
                const maTVNumber = parseInt(data);
                fetch('/DangNhap.html', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'maTV=' + encodeURIComponent(maTVNumber) + '&password=' + encodeURIComponent(password)
                })
                .then(response => {
                    if (response.ok) {
                        window.location.href = '/ThongTinTV.html?maTV=' + maTVNumber;
                    } else {
                        showErrorAlert('Mã thành viên hoặc mật khẩu không đúng');
                    }
                })
                .catch(error => {
                    console.error('Lỗi khi gửi yêu cầu: ', error);
                    showErrorAlert('Lỗi khi gửi yêu cầu đăng nhập');
                });
            })
            .catch(error => {
                console.error('Lỗi khi gửi yêu cầu lấy mã thành viên: ', error);
                showErrorAlert(error.message);
            });
        } else {
            const maTVNumber = parseInt(maTV);
            fetch('/DangNhap.html', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'maTV=' + encodeURIComponent(maTVNumber) + '&password=' + encodeURIComponent(password)
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/ThongTinTV.html?maTV=' + maTVNumber;
                } else {
                    showErrorAlert('Mã thành viên hoặc mật khẩu không đúng');
                }
            })
            .catch(error => {
                console.error('Lỗi khi gửi yêu cầu: ', error);
                showErrorAlert('Lỗi khi gửi yêu cầu đăng nhập');
            });
        }
    }
}
