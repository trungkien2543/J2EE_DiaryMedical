Notify = function(text, callback, close_callback, style) {

    var time = '10000';
    var $container = $('#notifications');
    var icon = '<i class="fa fa-info-circle "></i>';

    if (typeof style == 'undefined' ) style = 'warning'

    var html = $('<div class="alert alert-' + style + '  hide">' + icon +  " " + text + '</div>');

    $('<a>',{
        text: '×',
        class: 'button close',
        style: 'padding-left: 10px;',
        href: '#',
        click: function(e){
            e.preventDefault()
            close_callback && close_callback()
            remove_notice()
        }
    }).prependTo(html)

    $container.prepend(html)
    html.removeClass('hide').hide().fadeIn('slow')

    function remove_notice() {
        html.stop().fadeOut('slow').remove()
    }

    var timer =  setInterval(remove_notice, time);

    $(html).hover(function(){
        clearInterval(timer);
    }, function(){
        timer = setInterval(remove_notice, time);
    });

    html.on('click', function () {
        clearInterval(timer)
        callback && callback()
        remove_notice()
    });


}
function validateFormChangPIN() {
    let isValid = true;

    // Clear any previous validation errors
    $(".invalid-feedback").remove();

    // Validate OLD (required, numeric only, no blanks allowed)
    if ($("#idPinOld").val().trim() === "" || !/^\d+$/.test($("#idPinOld").val())) {
        $("#idPinOld").after("<div class='invalid-feedback'>Old PIN is required and must contain only numbers</div>");
        $("#idPinOld").addClass("is-invalid"); // Add Bootstrap class for invalid
        isValid = false;
    } else {
        $("#idPinOld").removeClass("is-invalid"); // Remove invalid class if valid

    }

    // Validate IDPIN (required)
    if ($("#idPin").val().trim() === "") {
        $("#idPin").after("<div class='invalid-feedback'>PIN is required</div>");
        $("#idPin").addClass("is-invalid");
        isValid = false;
    } else {
        $("#idPin").removeClass("is-invalid");
    }
    // Validate Comfirm PIN (required)
    if ($("#comfirmPin").val().trim() === "") {
        $("#comfirmPin").after("<div class='invalid-feedback'>Comfirm PIN is required</div>");
        $("#comfirmPin").addClass("is-invalid");
        isValid = false;
    } else {
        $("#comfirmPin").removeClass("is-invalid");
    }
    return isValid;
}
function clearInputFields(){
    $('#inputGroupSelect').prop('selectedIndex',0);
    $('#idPinOld').val("");
    $('#idPin').val("");
    $('#comfirmPin').val("");
}
function InputFieldsAdd(){
    clearInputFields();
    $('#AddRoomsModalLabel').text('Add New Room');
    $('.inputPinOld').hide();
    $('.inputSelect').show();
    $('.inputText').show();
}
function openModal(actionType) {
    // Set data attribute for the action type
    $('#AddRoomsModal').data('action-type', actionType);
    console.log("Data action type : " + $('#AddRoomsModal').data('action-type'));
    // Open the modal
    $(".pin-feedback").remove();
    $('#AddRoomsModal').modal('show');
}
function InputFieldsChange(){
    clearInputFields();
    $('#AddRoomsModalLabel').text('Change PIN password');
    $('.inputPinOld').show();
    $('.inputSelect').show();
    $('.inputText').show();
    $(".pin-feedback").remove();

}
function InputFirldsJoin(name){
    clearInputFields();
    $('#AddRoomsModalLabel').text('Joim Room of ' + name);
    $('.inputPinOld').hide();
    $('.inputSelect').hide();
    $('.inputText').hide();
    $(".pin-feedback").remove();
}
$(document).on('click','.add-room',function (){
    InputFieldsAdd();
    $('#btn-save-room').show();
    $('#btn-update-room').hide();
    $('#btn-join-room').hide();
    $('#forgotPIN').hide();
    openModal("add-room");
});
//Write method validateFormRoom() 
function validateFormRoom() {
    let isValid = true;

        // Clear any previous validation errors
        $(".invalid-feedback").remove();


    // Validate Gender (required, valid selection)
    if ($("#inputGroupSelect").val() === "" || $("#Gender").val() === null) {
        $("#inputGroupSelect").after("<div class='invalid-feedback'>Please select a name</div>");
        $("#inputGroupSelect").addClass("is-invalid");
        isValid = false;
    } else {
        $("#inputGroupSelect").removeClass("is-invalid");
    }
    // Validate IDPIN (required)
    if ($("#idPin").val().trim() === "") {
        $("#idPin").after("<div class='invalid-feedback'>PIN is required</div>");
        $("#idPin").addClass("is-invalid");
        isValid = false;
    } else {
        $("#idPin").removeClass("is-invalid");
    }
    // Validate Comfirm PIN (required)
    if ($("#comfirmPin").val().trim() === "") {
        $("#comfirmPin").after("<div class='invalid-feedback'>Comfirm PIN is required</div>");
        $("#comfirmPin").addClass("is-invalid");
        isValid = false;
    } else {
        $("#comfirmPin").removeClass("is-invalid");
    }

        return isValid;

}

function addNewRecordRoom(room,name) {
    // Tạo hàng mới với dữ liệu từ newRecordData
    let newRow = `
        <div class="col-md-4 btn element-room" data-id="${room.idroom}">
      <div class="pt-2">
        <div class="two">
          <div class="d-flex justify-content-end px-3 pt-1">
<!--            <i class="mdi mdi-star-outline pr-1 star"></i>-->
<!--            <i class="mdi mdi-dots-horizontal dot"></i>-->
            <div class="dropdown">
              <button class="btn" type="button" data-toggle="dropdown" aria-expanded="false">
                <i class="mdi mdi-dots-horizontal dot"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-dark">
                <li><a  data-id="${room.idroom}" data-name="${name}" class="dropdown-item join-room" data-toggle="modal" data-target="#AddRoomsModal">Join</a></li>
                <li ><a data-id="${room.idroom}" class="dropdown-item change-pin" data-toggle="modal" data-target="#AddRoomsModal">Change PIN</a></li>
                <li><hr class="dropdown-divider border-top border-secondary"></li>
                <li><a data-id="${room.idroom}" class="dropdown-item text-danger delete-room">Delete</a></li>
              </ul>
            </div>
          </div>
<!--          data-toggle="modal" data-target="#DetailRoom"-->
          <div class="px-3 join-room" data-id="${room.idroom}" data-name="${name}" data-toggle="modal" data-target="#AddRoomsModal">
            <div class="round">
              <img width="25" height="25" src="https://img.icons8.com/fluency/48/room.png" alt="room"/>
            </div>
          </div>
          <div class="px-3 pt-3 join-room" data-id="${room.idroom}" data-name="${name}" data-toggle="modal" data-target="#AddRoomsModal">
            <h3 class="name" >${name}</h3>
            <p class="quote2">This is room of  + ${name}</p>
          </div>
<!--          <div class="d-flex justify-content-start px-3 align-items-center">-->
<!--            <i class="mdi mdi-view-comfy task"></i>-->
<!--            <span class="quote2 pl-2">Task: Commercial project</span>-->
<!--          </div>-->
          <div class="d-flex justify-content-between px-3 align-items-center pb-3">
            <div class="d-flex justify-content-start align-items-center">
              <i class="mdi mdi-calendar-clock date"></i>
<!--              <span class="quote2 pl-2">Date: 01.10.2020</span>-->
            </div>
<!--            <div class="d-flex justify-content-end">-->
<!--              <img src="https://img.icons8.com/bubbles/50/000000/short-curly-hair-girl-musical-notes.png" width="20" class="img1" />-->
<!--              <img src="https://img.icons8.com/bubbles/50/000000/girl-and-playing-card.png" width="20" class="img2" />-->
<!--              <img src="https://img.icons8.com/bubbles/50/000000/short-hair-girl-question-mark.png" width="20" class="img3" />-->
<!--            </div>-->
          </div>
        </div>

      </div>
    </div>
    `;

    // Thêm hàng mới vào cuối bảng
    $('#totalRoom').append(newRow);
}
$(document).on('click','#btn-save-room',function (e){
    e.preventDefault();
    let cccd = $("#inputGroupSelect").val();
    let name = $("#inputGroupSelect option:selected").text();

    // Perform validation
    if (!validateFormRoom()) {
        console.log("Form Room validation failed.");
        return;
    }
    $.ajax({
        type: "get",
        url: `./rooms/exitsByIDRoom`,
        contentType: 'application/json', // Đảm bảo rằng bạn đã chỉ định đúng contentType
        dataType: "json", // Thêm header để server biết đây là JSON
        data: {
            IDRoom : cccd,
        }, // Gửi dữ liệu dưới dạng JSON
        success: function (is_exists) {
            console.log("is_exist : " + is_exists);
            if(!is_exists){
                let room = {
                    idroom: cccd,
                    pin: $("#comfirmPin").val(),
                }
                console.log(JSON.stringify(room))
                $.ajax({
                    type: "POST",
                    url: `./rooms/addRoom`,
                    contentType: 'application/json', // Đảm bảo rằng bạn đã chỉ định đúng contentType
                    dataType: "json", // Thêm header để server biết đây là JSON
                    data: JSON.stringify(room), // Gửi dữ liệu dưới dạng JSON
                    success: function (response) {
                        console.log("Information created: :" + response);
                        // window.location.href ="/family?add-success-member"
                        $("#AddRoomsModal").modal("hide");
                        notify('success', 'Message Add sucessfully', 'Add new room successfully');

                        addNewRecordRoom(room,name);


                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.error("AJAX Error:", textStatus, errorThrown);
                        console.error("Response Text:", jqXHR.responseText);
                    }
                });
            } else {
                $("#inputGroupSelect").after("<div class='invalid-feedback'>Duplicate your room with another person or your room has been added</div>");
                $("#inputGroupSelect").addClass("is-invalid"); // Add Bootstrap class for invalid
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX Error:", textStatus, errorThrown);
            console.error("Response Text:", jqXHR.responseText);
        }
    });
})
$(document).on('click','.change-pin',function (){
    InputFieldsChange();
    $('#btn-save-room').hide();
    $('#btn-update-room').show();
    $('#btn-join-room').hide();
    let cccd = $(this).data("id");
    let pinold = $("#idPinOld").val();
    $('#forgotPIN').hide();
    console.log('Data-id : ' + cccd);
    $('#btn-update-room').data('id',cccd);
    openModal("change-pin");
    $('#inputGroupSelect').val(cccd).prop('disabled',true);

});
$(document).on('click','#btn-update-room',function (){
    let cccd = $(this).data("id"); //$('#inputGroupSelect').val()
    if(!validateFormChangPIN()){
        return;
    }
    $.ajax({
        type: "get",
        url: `./rooms/checkRoom`,
        data: {
            IDRoom: cccd,
            PIN: $('#idPinOld').val() },// Gửi dữ liệu dưới dạng JSON
        contentType: 'application/json', // Đảm bảo rằng bạn đã chỉ định đúng contentType
        dataType: "json", // Thêm header để server biết đây là JSON
        success: function (response) {
            console.log("Check Room: :" + response);
            if (response) {
                $("#idPinOld").addClass("is-valid");// Add Bootstrap class for valid
                if (checkComfirmPIN()) {
                    $.ajax({
                        type: "PUT",
                        url: `./rooms/changePIN`,
                        data: {
                            IDRoom: $('#inputGroupSelect').val(),
                            oldPIN: $('#idPinOld').val(),
                            newPIN: $('#comfirmPin').val(),
                        },
                        success: function (res){
                            Swal.fire({
                                title: 'Success',
                                text: 'PIN has been changed successfully!',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }).then( () =>{
                                        $("#AddRoomsModal").modal("hide");
                            });

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.error("AJAX Error:", textStatus, errorThrown);
                            console.error("Response Text:", jqXHR.responseText);
                        }
                    });
                } else {
                    $("#idPinOld").after("<div class='invalid-feedback'>The old PIN does not match the room you need to change</div>");
                    $("#idPinOld").addClass("is-invalid"); // Add Bootstrap class for invalid
                    return;
                }
            } else{
                return;
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX Error:", textStatus, errorThrown);
            console.error("Response Text:", jqXHR.responseText);
        }
    });
});

$(document).ready(function() {
    // Attach an input event to #comfirmPin to check if it matches #idPin
    $("#comfirmPin").on("input", function() {
        const pin = $("#idPin").val();
        const confirmPin = $(this).val();

        // Remove any existing feedback
        $(".pin-feedback").remove();

        // Check if the values match
        if (confirmPin === pin && confirmPin !== "") {
            // Display match feedback
            $(this).after("<div class='pin-feedback text-success small'></div>");
            $(this).removeClass("is-invalid").addClass("is-valid ");
        } else {
            // Display no-match feedback
            $(this).after("<div class='pin-feedback text-danger small'></div>");
            $(this).removeClass("is-valid").addClass("is-invalid");
        }
    });
});
function checkComfirmPIN() {
    const pin = $("#idPin").val();
    const confirmPin = $("#comfirmPin").val();

    // Remove any existing feedback
    $(".pin-feedback").remove();

    // Check if the values match
    if (confirmPin === pin && confirmPin !== "") {
        // Display match feedback
        $("#comfirmPin").after("<div class='pin-feedback text-success small'></div>");
        $("#comfirmPin").removeClass("is-invalid").addClass("is-valid ");
        return true;
    } else {
        // Display no-match feedback
        $("#comfirmPin").after("<div class='pin-feedback text-danger small'></div>");
        $("#comfirmPin").removeClass("is-valid").addClass("is-invalid");
        return false;
    }
}

$(document).on('click','.join-room',function (){
    let name = $(this).data("name");
    $('#btn-join-room').data("id", $(this).data("id"));
    $('#forgot').data("email", $(this).data("email"));
    $('#forgot').data("id", $(this).data("id"));
    InputFirldsJoin(name);
    $('#btn-save-room, #btn-update-room').hide();
    $('#btn-join-room').show();
    $('#forgotPIN').show();
    openModal("join-room");


});

$(document).on("click","#btn-join-room",function (e){
    e.preventDefault();
    let cccd = $(this).data("id");
    let pin = $("#idPin").val();
    // Validate that PIN is numeric
    if (!/^\d+$/.test(pin)) {
        // Show an error message without reloading the page
        Swal.fire({
            title: 'Invalid PIN',
            text: 'PIN must be a 4-digit number.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return; // Stop further execution if PIN is invalid
    }
    $.ajax({
        type: "get",
        url: `./rooms/checkRoom`,
        data: { IDRoom: cccd, PIN: pin },// Gửi dữ liệu dưới dạng JSON
        contentType: 'application/json', // Đảm bảo rằng bạn đã chỉ định đúng contentType
        dataType: "json", // Thêm header để server biết đây là JSON
        success: function (response) {
            console.log("Check Room: :" + response);
            if (response){
                // Show success message, then redirect
                Swal.fire({
                    title: 'Success',
                    text: 'PIN entered successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Redirect to "/roomdetail/{id}" after the user clicks "OK"
                    window.location.href = `/roomdetail`;
                });
            } else  {
                Swal.fire({
                    title: 'Error',
                    text: 'Password is incorrect',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX Error:", textStatus, errorThrown);
            console.error("Response Text:", jqXHR.responseText);
        }
    });
});

$(document).on('click',".delete-room",function (e) {
    e.preventDefault(); // Prevent the default button behavior
    let idroom = $(this).data("id");
    Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            //Check if there are any members in the room?
            $.ajax({
                type: "get",
                url: `./rooms/checkInRoom`,
                data: {
                  IDRoom : idroom,
                },
                success: function (response) {
                    console.log("checkInRoom : " +response)
                    if (response) { //true Need to delete all members in the room
                        $.ajax({
                            type: "delete",
                            url: `./rooms/deleteAll/${idroom}`,
                            success: function () {
                                Swal.fire({
                                    title: 'Deleted!',
                                    text: 'Room has been deleted.',
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                }).then( () =>{
                                        $.ajax({
                                            type: "delete",
                                            url: `./rooms/deleteRoom/${idroom}`,
                                            success: function () {
                                                // Optionally, remove the deleted row from the table
                                                $(`div.element-room[data-id="${idroom}"]`).remove();
                                            },
                                            error: function (jqXHR, textStatus, errorThrown) {
                                                // Handle errors
                                                console.error("AJAX Error:", textStatus, errorThrown);
                                                Swal.fire({
                                                    title: 'Error!',
                                                    text: 'Failed to delete the room.',
                                                    icon: 'error',
                                                    confirmButtonText: 'OK'
                                                });
                                            }
                                        })

                                });
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // Handle errors
                                console.error("AJAX Error:", textStatus, errorThrown);
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Failed to delete the room.',
                                    icon: 'error',
                                    confirmButtonText: 'OK'
                                });
                            }
                        });
                    } else{
                        $.ajax({
                            type: "delete",
                            url: `./rooms/deleteRoom/${idroom}`,
                            success: function () {
                                Swal.fire({
                                    title: 'Deleted!',
                                    text: 'Room has been deleted.',
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                }).then(() => {
                                    // Optionally, remove the deleted row from the table
                                    $(`div.element-room[data-id="${idroom}"]`).remove();
                                });
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // Handle errors
                                console.error("AJAX Error:", textStatus, errorThrown);
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Failed to delete the room.',
                                    icon: 'error',
                                    confirmButtonText: 'OK'
                                });
                            }
                        });
                    }
                }
            });
        }
    });
});

function resetForgotPinModal() {
    // Reset all input fields
    $('#emailInput').val('');
    // $('#otpInput').val('');
    $('#newPinInput').val('');
    $('#confirmNewPinInput').val('');
    $('#otp-1, #otp-2, #otp-3, #otp-4, #otp-5, #otp-6').val('');

    // Reset step visibility
    $('#step-email').show();
    $('#step-otp').hide();
    $('#step-new-pin').hide();
}
$('#ForgotPinModal').on('hidden.bs.modal', function () {
    resetForgotPinModal();
});

$('#ForgotPinModal').on('show.bs.modal', function () {
    resetForgotPinModal();
});
// Restrict input to numeric values only
$(document).on('input', '#newPinInput, #confirmNewPinInput', function () {
    let value = $(this).val();
    // Replace any non-numeric characters
    $(this).val(value.replace(/\D/g, ''));
});
document.getElementById('forgot').addEventListener('click', function () {
    $('#ForgotPinModal').modal('show');
    $('#AddRoomsModal').modal('hide');
});
$(document).ready(function () {
    $('.toggle-password').on('click', function () {
        const target = $(this).data('target'); // Lấy id của input cần toggle
        const input = $(target);
        const icon = $(this).find('i');

        // Chuyển đổi giữa type "password" và "text"
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash'); // Đổi biểu tượng
        } else {
            input.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye'); // Đổi biểu tượng
        }
    });
});

$(document).ready(function () {
    $(".otp-box").on("input", function () {
        const $current = $(this);
        const $next = $current.next(".otp-box");
        const $prev = $current.prev(".otp-box");

        // Chỉ cho phép nhập số, xóa các ký tự không hợp lệ
        this.value = this.value.replace(/[^0-9]/g, "");

        // Chuyển sang ô tiếp theo nếu nhập xong
        if ($current.val().length == $current.attr("maxlength")) {
            $next.focus();
        }

        // Quay lại ô trước nếu nhấn Backspace và ô hiện tại rỗng
        $current.on("keydown", function (event) {
            if (event.key === "Backspace" && $current.val() === "") {
                $prev.focus();
            }
        });
    });

    // Ngăn nhập các ký tự không phải số
    $(".otp-box").on("keydown", function (event) {
        // Các phím được phép: Backspace, Tab, Delete, mũi tên
        const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
        if (
            allowedKeys.includes(event.key) || // Cho phép phím đặc biệt
            (event.key >= "0" && event.key <= "9") // Cho phép số
        ) {
            return; // Không ngăn chặn
        }

        // Ngăn các phím khác
        event.preventDefault();
    });
});
var YourCode = -1;

$(document).ready(function () {
    const $stepEmail = $('#step-email');
    const $stepOtp = $('#step-otp');
    const $stepNewPin = $('#step-new-pin');

    const $btnSendOtp = $('#btn-send-otp');
    const $btnVerifyOtp = $('#btn-verify-otp');
    const $btnSaveNewPin = $('#btn-save-new-pin');
    let IDRoomisCCCD;

    // Xử lý sự kiện khi bấm nút Gửi OTP
    $btnSendOtp.on('click', function () {
        const email = $('#emailInput').val();
        let emailOwner = $('#forgot').data("email");
        IDRoomisCCCD = $('#forgot').data("id");
        let isValid = true;
        if (validateEmail(email)) {
            // Gửi yêu cầu OTP tới backend
            // Validate Email (format)
            // $stepEmail.hide();
            // $stepOtp.show();
            $("#emailInput").removeClass("is-invalid");
            $("#emailInput").next(".invalid-feedback").remove();
            if (!(emailOwner === email)) {
                $("#emailInput").after("<div class='invalid-feedback'>A valid Email is required</div>");
                $("#emailInput").addClass("is-invalid");
                isValid = false;
            } else {
                $("#emailInput").removeClass("is-invalid");
                $("#emailInput").next(".invalid-feedback").remove();
            }
            if(isValid){
                console.log(`Sending OTP to ${email}`);
                $.ajax({
                    type: "post",
                    url: "./rooms/forgotPIN",
                    data: {
                        email : email,
                    },
                    dataType: "json",
                    success : function (isExist){
                        if(isExist !== -1){
                            $stepEmail.hide();
                            $stepOtp.show();
                            YourCode = isExist;
                            notify('success', 'Send OTP Email', 'OTP has been sent to your email');
                            console.log(YourCode);
                        }

                    }
                });

            }


        } else {
            // Notify("Please enter a valid email!", null, null, 'danger');
            notify('danger', 'Message Change Error', 'Please enter a valid email!');
        }
    });
    $btnSaveNewPin.on('click', function () {
        const newPin = $('#newPinInput').val();
        const confirmNewPin = $('#confirmNewPinInput').val();
        let oldPIN; // Ví dụ, mật khẩu cũ cần thay bằng giá trị thực tế
        $.ajax({
            type: "get",
            url: "./rooms/getRoom",
            data: {
                IDRoom: IDRoomisCCCD,
            },
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                oldPIN = response.pin;
                // Biến lưu mật khẩu cũ - cần có sẵn từ server hoặc frontend

                if (!newPin || !confirmNewPin) {
                    notify('warning', 'Message Change Error', 'PIN fields cannot be empty!');
                    return;
                }

                if (newPin == oldPIN) {
                    notify('error', 'Invalid PIN', 'New PIN must be different from the old PIN.');
                    return;
                }

                if (newPin != confirmNewPin) {
                    notify('warning', 'Message Change Error', 'PINs do not match!');
                    return;
                }

                // Nếu mọi thứ hợp lệ, gửi yêu cầu AJAX
                $.ajax({
                    type: "POST",
                    url: "./rooms/setup-pin",
                    data: {
                        IDRoom: IDRoomisCCCD,
                        newPIN: confirmNewPin,
                    },
                    dataType: "json",
                    success: function (response) {
                        if (response) {
                            Swal.fire({
                                title: 'Success',
                                text: 'PIN has been changed successfully!',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }).then(() => {
                                $("#ForgotPinModal").modal("hide");
                            });
                        } else {
                            notify('error', 'Change Failed', 'Unable to change PIN. Please try again.');
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        notify('error', 'Error', 'An unexpected error occurred.');
                    }
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("AJAX Error:", textStatus, errorThrown);
                console.error("Response Text:", jqXHR.responseText);
            }
        });


    });


    // Xử lý sự kiện khi bấm nút Xác minh OTP
    $('#btn-verify-otp').on('click', function () {
        // Lấy giá trị OTP từ các ô nhập
        let otp = '';
        $('.otp-box').each(function () {
            otp += $(this).val(); // Ghép giá trị từ từng ô
        });

        // Kiểm tra độ dài OTP
        if (otp.length === 6) {
            if(otp == YourCode){
                console.log(`Verifying OTP: ${otp}`);
                $('#step-otp').hide();
                $('#step-new-pin').show();

                $('#newPinInput').val('');
                $('#confirmNewPinInput').val('');
            } else{
                notify('danger', 'Message Change Error', 'Incorrect PIN please re-enter');

            }
            // Gửi OTP đến backend để xác minh

        } else {
            // alert('Please enter a valid 6-digit OTP!');
            notify('warning', 'Message Change Error', 'Please enter a valid 6-digit OTP!');
        }
    });


    // Xử lý sự kiện khi bấm nút Lưu PIN mới


    // Hàm kiểm tra định dạng email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});


