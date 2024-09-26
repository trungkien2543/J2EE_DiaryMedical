document.getElementById('excelFileInput').addEventListener('change', handleExcelFileSelection);

function handleExcelFileSelection() {
    var fileInput = document.getElementById('excelFileInput');

    if (fileInput.files.length > 0) {
        var selectedFile = fileInput.files[0];
        console.log('File được chọn:', selectedFile.name);
        // Thêm bất kỳ xử lý nào bạn muốn ở đây

        AddExcel(selectedFile)
    } else {
        console.log('Không có file nào được chọn.');
    }
}


function AddExcel(selectedFile){
    var formData = new FormData();
    formData.append('file', selectedFile); // Thêm file vào FormData object

    fetch('/ThanhVien.html', {
        method: 'PATCH', // Sử dụng phương thức PATCH
        body: formData, // Dữ liệu gửi đi là FormData object

    })
    .then(response => {
        if (response.ok) {
           console.log("Gửi yêu cầu thành công")
        } else {
            console.error('Lỗi khi thêm thành viên');
        }

    })
    .then(data => {
        Swal.fire({
                                      title: "~Tuyệt~",
                                      text: "Thêm thành công !!",
                                      icon: "success"
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        window.location.reload();
                                      }
                                    })
    })
    .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
    });


}