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
                            })
                                .then( () =>{
                                        $("#AddRoomsModal").modal("hide");
                                }
                                );

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