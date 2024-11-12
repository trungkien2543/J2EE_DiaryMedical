// Hàm mở modal
function openReceiptModal(CCCD) {
    const modal = document.getElementById('receiptModal');
    modal.style.display = 'block';
    document.getElementById("idPatient").value = CCCD

}

// Hàm đóng modal và reset form
function closeReceiptModal() {
    document.getElementById('receiptModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('receiptForm').reset();
    document.getElementById('resultPreview').style.display = 'none';
    document.getElementById('medicinePreview').style.display = 'none';


    $("#idDoctor").removeClass("is-invalid");
    $("#datetime").removeClass("is-invalid");
    $("#reason").removeClass("is-invalid");
    $("#diagnosis").removeClass("is-invalid");
    $("#treat").removeClass("is-invalid");
    $("#remind").removeClass("is-invalid");
    $("#bloodPressure").removeClass("is-invalid");
    $("#heartRate").removeClass("is-invalid");
}
// // Hàm để hiển thị hình ảnh xem trước
// function previewImage(event, previewId) {
//     const previewElement = document.getElementById(previewId);
//     const file = event.target.files[0];
//
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             previewElement.src = e.target.result;
//             previewElement.style.display = 'block';
//         };
//         reader.readAsDataURL(file);
//     } else {
//         previewElement.style.display = 'none';
//     }
// }

function previewImage(event, previewId) {
    const output = document.getElementById(previewId);
    output.src = URL.createObjectURL(event.target.files[0]);
    output.style.display = "block";
    output.onload = function() {
        URL.revokeObjectURL(output.src); // Giải phóng bộ nhớ
    };
}

// Đóng modal khi người dùng nhấp ra ngoài modal
// window.onclick = function(event) {
//     const modal = document.getElementById('receiptModal');
//     if (event.target === modal) {
//         closeReceiptModal();
//     }
// };


$("#idDoctor").on("keydown", function(event) {
    if (event.key === "Enter" || event.keyCode === 13 ) {
        $(".invalid-feedback").remove();
        $("#idDoctor").removeClass("is-invalid"); // Remove invalid class if valid
        event.preventDefault(); // Prevent the default action if needed
        $.ajax({
            type: "get",
            url: "./family/getDetail",
            data: {
                cccd: $("#idDoctor").val(),
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                // Cập nhật giá trị cho các trường thông tin
                $("#idDoctor").val(response.cccd);



                $("#place").val(response.department); // Nếu bạn có trường này trong response
                $("#place").prop("disabled",true);

            },
            error: function () {
                $("#idDoctor").after("<div class='invalid-feedback'>No doctor ID data available</div>");
                $("#idDoctor").addClass("is-invalid"); // Add Bootstrap class for invalid
                $("#place").val(""); // Nếu bạn có trường này trong response





            }
        });

    }
});

// Kiem tra form co du thong tin chua

// Function to validate form fields
function validateFormReceipt() {
    let isValid = true;

    // Clear any previous validation errors
    $(".invalid-feedback").remove();

    // Validate CCCD (required, numeric only, no blanks allowed)
    if ($("#idDoctor").val().trim() === "" || !/^\d+$/.test($("#idDoctor").val())) {
        $("#idDoctor").after("<div class='invalid-feedback'>Doctor ID is required and must contain only numbers</div>");
        $("#idDoctor").addClass("is-invalid"); // Add Bootstrap class for invalid
        isValid = false;
    } else {
        $("#idDoctor").removeClass("is-invalid"); // Remove invalid class if valid
    }


    // Validate Gender (required, valid selection)
    if ($("#datetime").val() === "" || $("#datetime").val() === null) {
        $("#datetime").after("<div class='invalid-feedback'>Please enter the date of medical examination</div>");
        $("#datetime").addClass("is-invalid");
        isValid = false;
    } else {
        $("#datetime").removeClass("is-invalid");
    }

    // Validate Phone (numeric only)
    if ($("#reason").val() === "") {
        $("#reason").after("<div class='invalid-feedback'>Please enter the reason for going to the doctor</div>");
        $("#reason").addClass("is-invalid");
        isValid = false;
    } else {
        $("#reason").removeClass("is-invalid");
    }
    // Validate Department
    if ($("#diagnosis").val() === "") {
        $("#diagnosis").after("<div class='invalid-feedback'>Please enter your doctor's diagnosis</div>");
        $("#diagnosis").addClass("is-invalid");
        isValid = false;
    } else {
        $("#diagnosis").removeClass("is-invalid");
    }

    // Validate Job
    if ($("#treat").val() === "") {
        $("#treat").after("<div class='invalid-feedback'>Please enter how to treat the disease</div>");
        $("#treat").addClass("is-invalid");
        isValid = false;
    } else {
        $("#treat").removeClass("is-invalid");
    }


    // Validate Department
    if ($("#remind").val() === "") {
        $("#remind").after("<div class='invalid-feedback'>Please enter your doctor's diagnosis</div>");
        $("#remind").addClass("is-invalid");
        isValid = false;
    } else {
        $("#remind").removeClass("is-invalid");
    }

    if ($("#bloodPressure").val() === "" || !/^\d+$/.test($("#bloodPressure").val())) {
        $("#bloodPressure").after("<div class='invalid-feedback'>Please enter your blood pressure</div>");
        $("#bloodPressure").addClass("is-invalid");
        isValid = false;
    } else {
        $("#bloodPressure").removeClass("is-invalid");
    }


    if ($("#heartRate").val() === "" || !/^\d+$/.test($("#heartRate").val())) {
        $("#heartRate").after("<div class='invalid-feedback'>Please enter your heart rate</div>");
        $("#heartRate").addClass("is-invalid");
        isValid = false;
    } else {
        $("#heartRate").removeClass("is-invalid");
    }

    return isValid;
}


// Nut them receipt vao he thong
$(document).on("click","#btnSubmitReceipt",function (e){
    const formData = new FormData();

    e.preventDefault();

    // Perform validation
    if (!validateFormReceipt()) {
        console.log("Form validation failed.");
        return;
    }

    // Loai tru kha nang nguoi dung khong nhan phim enter tai cho Doctor ID
    if ($("#place").val().trim() === ""){
        $(".invalid-feedback").remove();
        $("#idDoctor").removeClass("is-invalid"); // Remove invalid class if valid
        event.preventDefault(); // Prevent the default action if needed
        $.ajax({
            type: "get",
            url: "./family/getDetail",
            data: {
                cccd: $("#idDoctor").val(),
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                // Cập nhật giá trị cho các trường thông tin
                $("#idDoctor").val(response.cccd);



                $("#place").val(response.department); // Nếu bạn có trường này trong response
                $("#place").prop("disabled",true);

            },
            error: function () {
                $("#idDoctor").after("<div class='invalid-feedback'>No doctor ID data available</div>");
                $("#idDoctor").addClass("is-invalid"); // Add Bootstrap class for invalid
                $("#place").val(""); // Nếu bạn có trường này trong response
                $("#idDoctor").focus();

            }
        });
        return;
    }

    const patient = {
        cccd: $("#idPatient").val()
    };
    const doctor = {
        cccd: $("#idDoctor").val()

    };
    const receipt = {
        patient: patient,
        doctor: doctor,
        place: $("#place").val(),
        date: $("#datetime").val(),
        reason: $("#reason").val(),
        diagnosis: $("#diagnosis").val(),
        treat: $("#treat").val(),
        remind: $("#remind").val(),
        dateVisit: $("#dateVisit").val(),
        bloodPressure: $("#bloodPressure").val(),
        weight: $("#weight").val(),
        height: $("#height").val(),
        heartRate: $("#heartRate").val(),
        temperature: $("#temperature").val(),
        urlResult: $("#resultPreview").attr("src"),
        urlBill: $("#medicinePreview").attr("src")

    };



    //console.log(receipt);
    let fileResult = $("#resultImage")[0].files[0];

    if (fileResult){
        formData.append("fileResult",fileResult);
    }
    else {
        console.log("No file selected for fileResult.");
        // Có thể quyết định gửi null hoặc không thêm tham số này vào FormData
    }


    let fileBill = $("#medicineImage")[0].files[0];

    // Kiểm tra xem có file được chọn không
    if (fileBill) {
        formData.append("fileBill", fileBill); // Thêm file vào FormData nếu có
    } else {
        console.log("No file selected for fileBill.");
        // Có thể quyết định gửi null hoặc không thêm tham số này vào FormData
    }



    formData.append("receipt", JSON.stringify(receipt)); // Receipt JSON


    console.log(formData)


    Swal.fire({
        html: `
        <style>
            .progress {
                position: relative;
                background: #ddd;
                height: 30px;
                width: 100%;
                border-radius: 20px;
               
            }
            .progress-done {
                font-family: sans-serif;
                font-weight: bolder;
                color: #fff;
                height: 100%;
                background: linear-gradient(to left, rgb(2, 153, 253), rgb(233, 229, 232));
                border-radius: 20px;
                display: grid;
                place-items: center;
                width: 0;
                box-shadow: 0 0 3px -5px rgb(2, 194, 253), 0 3px 150px rgb(0, 204, 255);
                transition: width 0.5s ease;
            }
            .alertReceipt{
                margin-top: 80px; /* Thêm khoảng cách phía trên đoạn văn */
                text-align: center;
            }
        </style>
        
        <div class="progress">
            <div class="progress-done" data-done="100"></div>
        </div>
        <p class="alertReceipt">Please wait until there is a system notification</p>
       
    `,
        icon: 'info',
        showConfirmButton: false, // Loại bỏ nút OK
        didOpen: () => {
            const progressDone = document.querySelector('.progress-done');
            let width = 0;

            // Tăng width dần dần
            const interval = setInterval(() => {
                if (width < 95) { // Giới hạn đến 95% để chờ response từ server
                    width += 0.5;
                    progressDone.style.width = width + '%';
                }
            }, 50); // Cứ sau 50ms thì tăng 1%


            $.ajax({
                url: "/family/addReceipt",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,  // Cần thiết khi gửi FormData
                success: function(response) {

                    clearInterval(interval); // Hàm clearInterval(interval) trong JavaScript được sử dụng để dừng một setInterval đã được bắt đầu trước đó. Khi bạn dùng setInterval, đoạn mã được chỉ định sẽ lặp lại sau một khoảng thời gian nhất định (tính bằng mili giây) cho đến khi bị dừng bằng clearInterval.
                    progressDone.style.width = '100%';

                    setTimeout(() => { // Hàm setTimeout trong JavaScript được dùng để trì hoãn việc thực hiện một đoạn mã nào đó sau một khoảng thời gian nhất định (tính bằng mili giây).
                        Swal.close(); // Tự động đóng thông báo sau khi hoàn thành
                        Swal.fire({
                            title: 'Success',
                            text: 'This receipt is added successfully',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                        closeReceiptModal();
                    }, 500); // Đợi một chút để hoàn thành hiệu ứng
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error("AJAX Error:", textStatus, errorThrown);
                    console.error("Response Text:", jqXHR.responseText);

                    clearInterval(interval);
                    Swal.close();
                    Swal.fire({
                        title: 'Error',
                        text: 'An error occurred: ' + jqXHR.responseText,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            });

        }
    });

});
