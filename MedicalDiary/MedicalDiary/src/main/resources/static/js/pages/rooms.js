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
function setUpDetailModal(){

}
function InputFieldsChange(){
    clearInputFields();
    $('#AddRoomsModalLabel').text('Change PIN password');
    $('.inputPinOld').show();
    $('.inputSelect').show();
    $('.inputText').show();

}
function InputFirldsJoin(name){
    clearInputFields();
    $('#AddRoomsModalLabel').text('Joim Room of ' + name);
    $('.inputPinOld').hide();
    $('.inputSelect').hide();
    $('.inputText').hide();
}
$(document).on('click','.add-room',function (){
    InputFieldsAdd();
    $('#btn-save-room').show();
    $('#btn-update-room').hide();
    $('#btn-join-room').hide();
});
$(document).on('click','.edit-room',function (){
    InputFieldsChange();
    $('#inputGroupSelect').prop('disabled',true);
    $('#btn-save-room').hide();
    $('#btn-update-room').show();
    $('#btn-join-room').hide();
});
$(document).on('click','.join-room',function (){
    let name = $(this).data("name");
    $('#btn-join-room').data("id", $(this).data("id"));
    // $('#btn-join-room').data("id", cccd);
    InputFirldsJoin(name);
    $('#btn-save-room, #btn-update-room').hide();
    $('#btn-join-room').show();

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
                    // Redirect to "/roomDetail/{id}" after the user clicks "OK"
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