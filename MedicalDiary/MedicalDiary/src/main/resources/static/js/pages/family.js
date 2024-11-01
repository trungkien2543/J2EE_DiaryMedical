
$(document).on("click", ".family-detail", function () {
    let cccd = $(this).data("id");
    $("#titleModal").text("Xem chi tiết");
    $("#btn-saves").hide();
    $("#btn-updates").hide();
    $.ajax({
        type: "get",
        url: "./family/getDetail",
        data: {
            cccd: cccd,
        },
        dataType: "json",
        success: function (response) {
            console.log(response);
            // Cập nhật giá trị cho các trường thông tin
            $("#CCCD").val(response.cccd);
            $("#CCCD").prop("disabled", true);
            $("#HoTen").val(response.name);
            $("#HoTen").prop("disabled", true);
            // Cập nhật giới tính trong select
            if (response.gender === 1) {
                $("#Gender").val(1); // Nam
            } else {
                $("#Gender").val(0); // Nữ
            }
            $("#Gender").change();
            $("#Gender").prop("disabled", true);
            // Cập nhật các thông tin khác
            $("#BHYT").val(response.bhyt); // Nếu bạn có trường này trong response
            $("#BHYT").prop("disabled",true);
            $("#Phone").val(response.phone); // Nếu bạn có trường này trong response
            $("#Phone").prop("disabled",true);
            $("#Job").val(response.job); // Nếu bạn có trường này trong response
            $("#Job").prop("disabled",true);

            $("#Department").val(response.department); // Nếu bạn có trường này trong response
            $("#Department").prop("disabled",true);

            $("#Address").val(response.address); // Nếu bạn có trường này trong response
            $("#Address").prop("disabled",true);

            $("#Medical_History").val(response.medicalHistory); // Nếu bạn có trường này trong response
            $("#Medical_History").prop("disabled",true);
            // $.ajax({
            //     type : "get",
            //     url: "./family/getFamilyByID",
            //     data: {
            //         iD_Family: response.idfamily,
            //     },
            //     dataType: "json",
            //     success: function (res) {
            //         $("#IDFamily").val(response.idfamily +" - " + res.name); // Nếu bạn có trường này trong response
            //         $("#IDFamily").prop("disabled",true);
            //         $("#idfml").val(response.idfamily);
            //         $("#namefml").val(res.name);
            //     }
            //
            // });
            $("#IDFamily").val(response.family.idfamily +" - " + response.family.name); // Nếu bạn có trường này trong response
            $("#IDFamily").prop("disabled",true);
            $("#idfml").val(response.family.idfamily);
            $("#namefml").val(respone.family.name);
            // Hiển thị modal
            $("#AddQuanTam").modal("show");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX Error:", textStatus, errorThrown);
            console.error("Response Text:", jqXHR.responseText);
        }
    });

});
function clearInputFields() {
        // Clear input fields and enable them
        $("#CCCD").val("").prop("disabled", false);
        $("#HoTen").val("").prop("disabled", false);

        // Reset Gender field to default (e.g., first option) and enable it
        $("#Gender").val("").prop("disabled", false).change(); // Trigger change if needed

        // Clear and enable other input fields
        $("#BHYT").val("").prop("disabled", false); // If you have this field
        $("#Phone").val("").prop("disabled", false); // If you have this field
        $("#Job").val("").prop("disabled", false); // If you have this field
        $("#Department").val("").prop("disabled", false); // If you have this field
        $("#Address").val("").prop("disabled", false); // If you have this field
        $("#Medical_History").val("").prop("disabled", false); // If you have this field
        $("#IDFamily").val("").prop("disabled", false); // If you have this field
}

$(document).on("click",".family-add",function (){
    clearInputFields();
    $("#titleModal").text("Add Family Member");
    $("#btn-saves").show();
    $("#btn-updates").hide();
    let idFML = $("#idfml").val();
    let nameFML = $("#namefml").val();
    $("#IDFamily").val(idFML + " - " + nameFML);
    $("#IDFamily").prop("disabled",true);
});

$(document).on("click","#btn-saves",function (e){
    e.preventDefault();
    // const information = {
    //     cccd: $("#CCCD").val(),
    //     name: $("#HoTen").val(),
    //     gender: parseInt($("#Gender").val(), 10),
    //     bhyt: $("#BHYT").val(),
    //     phone: $("#Phone").val(),
    //     job: $("#Job").val(),
    //     department: $("#Department").val(),
    //     address: $("#Address").val(),
    //     medicalHistory: $("#Medical_History").val(),
    //     // idfamily: parseInt($("#idfml").val(), 10),
    //
    //     // family : {
    //     //     idfamily: parseInt($("#idfml").val(), 10),
    //     //     name: $("#namefml").val()
    //     // }
    //
    // };
    const family = {
        idfamily: parseInt($("#idfml").val(), 10),
        name: $("#namefml").val()
    };
    const information = {
        "information" : {
            cccd: $("#CCCD").val(),
            name: $("#HoTen").val(),
            gender: parseInt($("#Gender").val(), 10),
            bhyt: $("#BHYT").val(),
            phone: $("#Phone").val(),
            job: $("#Job").val(),
            department: $("#Department").val(),
            address: $("#Address").val(),
            medicalHistory: $("#Medical_History").val(),
        },
        "family" :{
            idfamily: parseInt($("#idfml").val(), 10),
            name: $("#namefml").val()
        }
    };
    console.log(information);
    $.ajax({
        type: "POST",
        url: `./family/add`,
        contentType: 'application/json', // Đảm bảo rằng bạn đã chỉ định đúng contentType
        dataType: "json", // Thêm header để server biết đây là JSON
        data: JSON.stringify(information), // Gửi dữ liệu dưới dạng JSON
        success: function (response) {
            console.log("Information created: :" + response);
            // window.location.href ="/family?add-success-member"
            $("#modal-add-user").modal("hide");
            notify('success', 'Message Add sucessfully', 'Add new family member successfully');

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX Error:", textStatus, errorThrown);
            console.error("Response Text:", jqXHR.responseText);
        }
    });
});
$(document).on("click",".family-edit",function (){
    let cccd = $(this).data("id");
    $("#titleModal").text("Update detail");
    $("#btn-saves").hide();
    $("#btn-updates").show();
    $.ajax({
        type: "get",
        url: "./family/getDetail",
        data: {
            cccd: cccd,
        },
        dataType: "json",
        success: function (response) {
            // Cập nhật giá trị cho các trường thông tin
            $("#CCCD").val(response.cccd);
            $("#CCCD").prop("disabled", true);
            $("#HoTen").val(response.name);
            $("#HoTen").prop("disabled", false);
            // Cập nhật giới tính trong select
            if (response.gender === 1) {
                $("#Gender").val(1); // Nam
            } else {
                $("#Gender").val(0); // Nữ
            }
            $("#Gender").change();
            $("#Gender").prop("disabled", false);
            // Cập nhật các thông tin khác
            $("#BHYT").val(response.bhyt); // Nếu bạn có trường này trong response
            $("#BHYT").prop("disabled",false);
            $("#Phone").val(response.phone); // Nếu bạn có trường này trong response
            $("#Phone").prop("disabled",false);
            $("#Job").val(response.job); // Nếu bạn có trường này trong response
            $("#Job").prop("disabled",false);

            $("#Department").val(response.department); // Nếu bạn có trường này trong response
            $("#Department").prop("disabled",false);

            $("#Address").val(response.address); // Nếu bạn có trường này trong response
            $("#Address").prop("disabled",false);

            $("#Medical_History").val(response.medicalHistory); // Nếu bạn có trường này trong response
            $("#Medical_History").prop("disabled",false);
            $.ajax({
                type : "get",
                url: "./family/getFamilyByID",
                data: {
                    iD_Family: response.idfamily,
                },
                dataType: "json",
                success: function (res) {
                    $("#IDFamily").val(response.idfamily +" - " + res.name); // Nếu bạn có trường này trong response
                    $("#IDFamily").prop("disabled",true);
                    $("#idfml").val(response.idfamily);
                    $("#namefml").val(res.name);
                }

            });

            // Hiển thị modal
            $("#AddQuanTam").modal("show");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX Error:", textStatus, errorThrown);
            console.error("Response Text:", jqXHR.responseText);
        }
    });

});
$(document).on("click","#btn-updates",function (e){
    e.preventDefault();
    const information = {
        cccd: $("#CCCD").val(),
        name: $("#HoTen").val(),
        gender: parseInt($("#Gender").val(), 10),
        bhyt: $("#BHYT").val(),
        phone: $("#Phone").val(),
        job: $("#Job").val(),
        department: $("#Department").val(),
        address: $("#Address").val(),
        medicalHistory: $("#Medical_History").val(),
        idfamily: parseInt($("#idfml").val(), 10),
    };
    $.ajax({
        type: "post",
        url: "./family/update",
        data: JSON.stringify(information), // Gửi dữ liệu dưới dạng JSON
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            console.log("response :" + response);
            // window.location.href ="/family?update-success-member"
            $("#AddQuanTam").modal("hide");
            notify('success', 'Message updated successfully', 'Update family member successfully.');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX Error:", textStatus, errorThrown);
            console.error("Response Text:", jqXHR.responseText);
        }
    });
});
$(document).on("click", ".family-delete", function (e) {
    e.preventDefault(); // Prevent the default button behavior
    const familyId = $(this).data("id"); // Get the family ID from data attribute

    // Show a confirmation dialog
    Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Send the delete request to the server
            $.ajax({
                type: "PUT",
                url: `./family/${familyId}`, // Adjust the URL to match your API endpoint
                success: function (response) {
                    // Handle successful deletion
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Family member has been deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // Optionally, remove the deleted row from the table
                        $(`tr[data-id="${familyId}"]`).remove();
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // Handle errors
                    console.error("AJAX Error:", textStatus, errorThrown);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete the family member.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            });
        }
    });
});
