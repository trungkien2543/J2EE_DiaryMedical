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
    InputFirldsJoin(name);
    $('#btn-save-room').hide();
    $('#btn-update-room').hide();
    $('#btn-join-room').show();
});