$(document).on("click", ".room-detail-element", function () {
    let cccd = $(this).data("id");
    $("#titleModal").text("View member details");
    $("#btn-saves").hide();
    $("#btn-updates").hide();
    $.ajax({
        type: "get",
        url: "./roomdetail/getDetail",
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

            $("#IDFamily").val(response.family.idfamily +" - " + response.family.name); // Nếu bạn có trường này trong response
            $("#IDFamily").prop("disabled",true);
            $("#idfml").val(response.family.idfamily);
            $("#namefml").val(response.family.name);
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
    $("#HoTen").val("").prop("disabled", true);

    // Reset Gender field to default (e.g., first option) and enable it
    $("#Gender").val("").prop("disabled", true).change(); // Trigger change if needed

    // Clear and enable other input fields
    $("#BHYT").val("").prop("disabled", true); // If you have this field
    $("#Phone").val("").prop("disabled", true); // If you have this field
    $("#Job").val("").prop("disabled", true); // If you have this field
    $("#Department").val("").prop("disabled", true); // If you have this field
    $("#Address").val("").prop("disabled", true); // If you have this field
    $("#Medical_History").val("").prop("disabled", true); // If you have this field
    $("#IDFamily").val("").prop("disabled", true); // If you have this field
    $("#idfml").val("");
    $("#namefml").val("");
    $("#IDFamily").val("").prop("disabled",true);
}

$(document).on("click",".room-detail-add",function (){
    clearInputFields();
    $("#CCCD").attr("placeholder", "Enter your CCCD");
    $("#titleModal").text("Add New People Interested");
    $("#btn-saves").show();
    $("#btn-updates").hide();
});
$("#CCCD").on("keydown", function(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        event.preventDefault(); // Prevent the default action if needed
        $.ajax({
            type: "get",
            url: "./roomdetail/getDetail",
            data: {
                cccd: $("#CCCD").val(),
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                // Cập nhật giá trị cho các trường thông tin
                $("#CCCD").val(response.cccd);
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

                $("#IDFamily").val(response.family.idfamily +" - " + response.family.name); // Nếu bạn có trường này trong response
                $("#IDFamily").prop("disabled",true);
                $("#idfml").val(response.family.idfamily);
                $("#namefml").val(response.family.name);
                },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("AJAX Error:", textStatus, errorThrown);
                console.error("Response Text:", jqXHR.responseText);
            }
        });

    }
});
$(document).on("click","#btn-saves",function (e){
    e.preventDefault();
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
        url: `./roomdetail/add`,
        data: JSON.stringify(information), // Gửi dữ liệu dưới dạng JSON
        contentType: 'application/json', // Đảm bảo rằng bạn đã chỉ định đúng contentType
        dataType: "json", // Thêm header để server biết đây là JSON
        success: function (response) {
            console.log("Information created: :" + response);
            // window.location.href ="/family?add-success-member"
            $("#AddQuanTam").modal("hide");
            // notify('success', 'Message Add sucessfully', 'Add new family member successfully');
            Swal.fire({
                title: 'Follow Request Sent',
                text: 'A follow request was successfully sent to the follower.',
                icon: 'success',
                confirmButtonText: 'Okay'
            }).then((result) => {
                // Redirect after the SweetAlert2 confirmation is closed
                if (result.isConfirmed) {
                    window.location.href = "/roomdetail";
                }
            });

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX Error:", textStatus, errorThrown);
            console.error("Response Text:", jqXHR.responseText);
        }
    });
});
$(document).on("click",".room-edit-element",function (){
    let cccd = $(this).data("id");
    $("#titleModal").text("Update detail");
    $("#btn-saves").hide();
    $("#btn-updates").show();
    $.ajax({
        type: "get",
        url: "./roomdetail/getDetail",
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
    $.ajax({
        type: "post",
        url: "./room/update",
        data: JSON.stringify(information), // Gửi dữ liệu dưới dạng JSON
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            console.log("response :" + response);
            // window.location.href ="/family?update-success-member"
            $("#modal-add-user").modal("hide");
            notify('success', 'Message updated successfully', 'Update family member successfully.');
            Swal.fire({
                title: 'Success!',
                text: 'Update successfully',
                icon: 'success',
                confirmButtonText: 'Okay'
            }).then((result) => {
                // Redirect after the SweetAlert2 confirmation is closed
                if (result.isConfirmed) {
                    window.location.href = "/roomdetail";
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX Error:", textStatus, errorThrown);
            console.error("Response Text:", jqXHR.responseText);
        }
    });
});

$(document).on("click", ".room-delete-element", function (e) {
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
                type: "DELETE",
                url: `./roomdetail/${familyId}`, // Adjust the URL to match your API endpoint
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

function acceptRequest(button) {
    const idRoom = button.getAttribute("data-houseowner-cccd");
    const idIsFollowed = button.getAttribute("data-isfollowed-cccd");
    var roomDetailId = {
        idroom: "000000000016",
        idisFollowed: "000000000001"
    };
    console.log(roomDetailId );
    $.ajax({
        url: '/roomdetail/getRoomDetailByID', // The endpoint URL
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(roomDetailId),
        success: function(response) {
            // Handle success - you can display the room details or process the response
            console.log('Room Detail:', response);
            let cccd =response.id.idroom;
            console.log('Room Detail CCCCD:', cccd);

            $.ajax({
                url: '/roomdetail/acceptRequest',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(response),
                success: function(data) {
                    notify('success', 'Request Accepted', data);
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                    notify('error', 'Error', 'An error occurred while accepting the request.');
                }
            });
        },
        error: function(xhr, status, error) {
            // Handle error - for example, show an error message
            console.error('Error fetching room detail:', error);

        }
    });

}

function cancelRequest(item) {
    const itemId = button.getAttribute("data-item-id");
    console.log("Accept request for item:", itemId);
    // let roomDetail = item;
    // roomDetail.status = 1;
    // $.ajax({
    //     url: '/roomdetail/cancelRequest',
    //     type: 'POST',
    //     contentType: 'application/json',
    //     data: JSON.stringify(roomDetail)
    //     ,
    //     success: function(data) {
    //         notify('success', 'Request Canceled', data);
    //         // Update the UI accordingly
    //     },
    //     error: function(xhr, status, error) {
    //         console.error('Error:', error);
    //         notify('error', 'Error', 'An error occurred while canceling the request.');
    //     }
    // });
}

// const messengerDetail = {
//     "room": {
//         "idroom": "000000000016",
//         "pin": "123",
//         "hibernateLazyInitializer": {}
//     },
//     "isFollowed": {
//         "family": {
//             "name": "Gia đình 3",
//             "idfamily": 3
//         },
//         "name": "Le Van C",
//         "address": "789 Boulevard, City",
//         "bhyt": "BHYT003",
//         "phone": "0112233445",
//         "cccd": "000000000003",
//         "gender": true,
//         "job": "Doctor",
//         "medicalHistory": "Asthma",
//         "department": "Health",
//         "hibernateLazyInitializer": {}
//     },
//     "status": 0,
//     "id": {
//         "idroom": "000000000016",
//         "idisFollowed": "000000000003"
//     }
// };