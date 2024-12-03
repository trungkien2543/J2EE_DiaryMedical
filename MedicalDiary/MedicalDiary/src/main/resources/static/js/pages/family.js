// Regex for Vietnamese letters and spaces
const vietnameseNamePattern = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸỳỵỷỹ\s]+$/;

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

            $("#Email").val(response.email); // Nếu bạn có trường này trong response
            $("#Email").prop("disabled",true);
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
        $("#HoTen").val("").prop("disabled", false);

        // Reset Gender field to default (e.g., first option) and enable it
        $("#Gender").val("").prop("disabled", false).change(); // Trigger change if needed

        // Clear and enable other input fields
        $("#BHYT").val("").prop("disabled", false); // If you have this field
        $("#Phone").val("").prop("disabled", false); // If you have this field
        $("#Email").val("").prop("disabled", false); // If you have this field
        $("#Job").val("").prop("disabled", false); // If you have this field
        $("#Department").val("").prop("disabled", false); // If you have this field
        $("#Address").val("").prop("disabled", false); // If you have this field
        $("#Medical_History").val("").prop("disabled", false); // If you have this field
        $("#IDFamily").val("").prop("disabled", false); // If you have this field
}
function setFieldDisabledStatus(disabled) {
    $("#CCCD, #HoTen, #Gender, #BHYT, #Phone,#Email, #Job, #Department, #Address, #Medical_History, #IDFamily")
        .prop("disabled", disabled);
}

function populateFormFields(data) {
    $("#CCCD").val(data.cccd);
    $("#HoTen").val(data.name);
    $("#Gender").val(data.gender === 1 ? 1 : 0).change();
    $("#BHYT").val(data.bhyt);
    $("#Phone").val(data.phone);
    $("#Email").val(data.email);
    $("#Job").val(data.job);
    $("#Department").val(data.department);
    $("#Address").val(data.address);
    $("#Medical_History").val(data.medicalHistory);
    $("#IDFamily").val(data.family.idfamily + " - " + data.family.name);
}

// Function to validate form fields
function validateForm() {
    let isValid = true;

    // Clear any previous validation errors
    $(".invalid-feedback").remove();

    // Validate CCCD (required, numeric only, no blanks allowed)
    if ($("#CCCD").val().trim() === "" || !/^\d+$/.test($("#CCCD").val())) {
        $("#CCCD").after("<div class='invalid-feedback'>CCCD is required and must contain only numbers</div>");
        $("#CCCD").addClass("is-invalid"); // Add Bootstrap class for invalid
        isValid = false;
    } else {
        $("#CCCD").removeClass("is-invalid"); // Remove invalid class if valid
    }

    // Validate HoTen (required)
    if ($("#HoTen").val().trim() === "" || !vietnameseNamePattern.test($("#HoTen").val().trim())) {
        $("#HoTen").after("<div class='invalid-feedback'>Name is required and should contain only letters</div>");
        $("#HoTen").addClass("is-invalid");
        isValid = false;
    } else {
        $("#HoTen").removeClass("is-invalid");
    }

    // Validate Gender (required, valid selection)
    if ($("#Gender").val() === "" || $("#Gender").val() === null) {
        $("#Gender").after("<div class='invalid-feedback'>Please select a gender</div>");
        $("#Gender").addClass("is-invalid");
        isValid = false;
    } else {
        $("#Gender").removeClass("is-invalid");
    }

    // Validate BHYT (optional but must be alphanumeric if provided)
    if ($("#BHYT").val() !== "" && !/^[a-zA-Z0-9]+$/.test($("#BHYT").val())) {
        $("#BHYT").after("<div class='invalid-feedback'>BHYT should be alphanumeric</div>");
        $("#BHYT").addClass("is-invalid");
        isValid = false;
    } else {
        $("#BHYT").removeClass("is-invalid");
    }
    // Validate Email (format)
    if ($("#Email").val() === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("#Email").val())) {
        $("#Email").after("<div class='invalid-feedback'>A valid Email is required</div>");
        $("#Email").addClass("is-invalid");
        isValid = false;
    } else {
        $("#Email").removeClass("is-invalid");
        $("#Email").next(".invalid-feedback").remove();

        // Validate Phone (numeric only)
        if ($("#Phone").val() === "" || !/^[0]{1}[0-9]{9}$/.test($("#Phone").val())) {
            $("#Phone").after("<div class='invalid-feedback'>Phone is required, should start with 0 and contain exactly 10 digits</div>");
            $("#Phone").addClass("is-invalid");
            isValid = false;
        } else {
            $("#Phone").removeClass("is-invalid");
        }

        // Validate Job
        if ($("#Job").val() === "") {
            $("#Job").after("<div class='invalid-feedback'>Job is required</div>");
            $("#Job").addClass("is-invalid");
            isValid = false;
        } else {
            $("#Job").removeClass("is-invalid");
        }

        // Validate Department
        if ($("#Department").val() === "") {
            $("#Department").after("<div class='invalid-feedback'>Department is required</div>");
            $("#Department").addClass("is-invalid");
            isValid = false;
        } else {
            $("#Department").removeClass("is-invalid");
        }
        // Validate Address
        if ($("#Address").val() === "") {
            $("#Address").after("<div class='invalid-feedback'>Address is required</div>");
            $("#Address").addClass("is-invalid");
            isValid = false;
        } else {
            $("#Address").removeClass("is-invalid");
        }

        return isValid;
    }
}

    $(document).on("click", ".family-add", function () {
        clearInputFields();
        $("#titleModal").text("Add Family Member");
        $("#btn-saves").show();
        $("#btn-updates").hide();
        let idFML = $("#idfml").val();
        let nameFML = $("#namefml").val();
        $("#IDFamily").val(idFML + " - " + nameFML);
        $("#IDFamily").prop("disabled", true);
    });

    function addNewRecord(newRecordData) {
        // Tạo hàng mới với dữ liệu từ newRecordData
        let newRow = `
        <tr data-id="${newRecordData.information.cccd}">
            <td data-id="${newRecordData.information.cccd}">
                <button class="btn btn-datatable btn-icon btn-transparent-dark me-2"><i class='far fa-eye' ></i></button>
                <button class="btn btn-datatable btn-icon btn-transparent-dark me-2"><i class='far fa-plus-square'></i></button>
            </td>
            <td>${newRecordData.information.cccd}</td>
            <td>${newRecordData.information.name}</td>
            <td>${newRecordData.information.gender ? 'Nam' : 'Nữ'}</td>
            <td>${newRecordData.information.job}</td>
            <td>${newRecordData.information.department}</td>
            <td>${newRecordData.information.address}</td>
            <td>
                <button class="btn btn-datatable btn-icon btn-transparent-dark me-2 px-1 family-detail" 
                    data-id="${newRecordData.information.cccd}" title="Xem chi tiết">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
                </button>
                <button class="btn btn-datatable btn-icon btn-transparent-dark me-2 px-1 family-edit" 
                    data-id="${newRecordData.information.cccd}" title="Sửa">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
                </button>
                <button class="btn btn-datatable btn-icon btn-transparent-dark px-1 family-delete" 
                    data-id="${newRecordData.information.cccd}" title="Xoá">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
                </button>
            </td>
        </tr>
    `;

        // Thêm hàng mới vào cuối bảng
        $('#dataTable tbody').append(newRow);
    }

    $(document).on("click", "#btn-saves", function (e) {
        e.preventDefault();
        const family = {
            idfamily: parseInt($("#idfml").val(), 10),
            name: $("#namefml").val()
        };
        const information = {
            "information": {
                cccd: $("#CCCD").val(),
                name: $("#HoTen").val(),
                gender: parseInt($("#Gender").val(), 10),
                bhyt: $("#BHYT").val(),
                email: $("#Email").val(),
                phone: $("#Phone").val(),
                job: $("#Job").val(),
                department: $("#Department").val(),
                address: $("#Address").val(),
                medicalHistory: $("#Medical_History").val(),
            },
            "family": {
                idfamily: parseInt($("#idfml").val(), 10),
                name: $("#namefml").val()
            }
        };
        console.log(information);
        // Perform validation
        if (!validateForm()) {
            console.log("Form validation failed.");
            return;
        }
        $.ajax({
            type: "get",
            url: `./family/existsByCCCD`,
            contentType: 'application/json', // Đảm bảo rằng bạn đã chỉ định đúng contentType
            dataType: "json", // Thêm header để server biết đây là JSON
            data: {
                cccd: $("#CCCD").val(),
            }, // Gửi dữ liệu dưới dạng JSON
            success: function (is_exists) {
                if (!is_exists) {
                    $.ajax({
                        type: "get",
                        url: `./family/existsByEmail`,
                        contentType: 'application/json', // Đảm bảo rằng bạn đã chỉ định đúng contentType
                        dataType: "json", // Thêm header để server biết đây là JSON
                        data: {
                            Email: $("#Email").val(),
                        }, // Gửi dữ liệu dưới dạng JSON
                        success: function (is_exists_email) {
                            if(!is_exists_email){
                                $.ajax({
                                    type: "POST",
                                    url: `./family/add`,
                                    contentType: 'application/json', // Đảm bảo rằng bạn đã chỉ định đúng contentType
                                    dataType: "json", // Thêm header để server biết đây là JSON
                                    data: JSON.stringify(information), // Gửi dữ liệu dưới dạng JSON
                                    success: function (response) {
                                        console.log("Information created: :" + response);
                                        // window.location.href ="/family?add-success-member"
                                        $("#AddQuanTam").modal("hide");
                                        notify('success', 'Message Add sucessfully', 'Add new family member successfully');

                                        addNewRecord(information);


                                    },
                                    error: function (jqXHR, textStatus, errorThrown) {
                                        console.error("AJAX Error:", textStatus, errorThrown);
                                        console.error("Response Text:", jqXHR.responseText);
                                    }
                                });
                            } else {
                                $("#Email").after("<div class='invalid-feedback'>Duplicate Email with another person or your Email has been added</div>");
                                $("#Email").addClass("is-invalid"); // Add Bootstrap class for invalid
                            }
                        }
                    });
                } else {
                    $("#CCCD").after("<div class='invalid-feedback'>Duplicate CCCD with another person or your CCCD has been added</div>");
                    $("#CCCD").addClass("is-invalid"); // Add Bootstrap class for invalid
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("AJAX Error:", textStatus, errorThrown);
                console.error("Response Text:", jqXHR.responseText);
            }
        });

    });
    $(document).on("click", ".family-edit", function () {
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
                $("#BHYT").prop("disabled", false);
                $("#Phone").val(response.phone); // Nếu bạn có trường này trong response
                $("#Phone").prop("disabled", false);
                $("#Email").val(response.email); // Nếu bạn có trường này trong response
                $("#Email").prop("disabled", false);
                $("#Job").val(response.job); // Nếu bạn có trường này trong response
                $("#Job").prop("disabled", false);

                $("#Department").val(response.department); // Nếu bạn có trường này trong response
                $("#Department").prop("disabled", false);

                $("#Address").val(response.address); // Nếu bạn có trường này trong response
                $("#Address").prop("disabled", false);

                $("#Medical_History").val(response.medicalHistory); // Nếu bạn có trường này trong response
                $("#Medical_History").prop("disabled", false);

                $("#IDFamily").val(response.family.idfamily + " - " + response.family.name); // Nếu bạn có trường này trong response
                $("#IDFamily").prop("disabled", true);
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
    // $(document).on("click", "#btn-updates", function (e) {
    //     e.preventDefault();
    //     const information = {
    //         "information": {
    //             cccd: $("#CCCD").val(),
    //             name: $("#HoTen").val(),
    //             gender: parseInt($("#Gender").val(), 10),
    //             bhyt: $("#BHYT").val(),
    //             phone: $("#Phone").val(),
    //             email: $("#Email").val(),
    //             job: $("#Job").val(),
    //             department: $("#Department").val(),
    //             address: $("#Address").val(),
    //             medicalHistory: $("#Medical_History").val(),
    //         },
    //         "family": {
    //             idfamily: parseInt($("#idfml").val(), 10),
    //             name: $("#namefml").val()
    //         }
    //     };
    //
    //     $.ajax({
    //         type: "post",
    //         url: "./family/update",
    //         data: JSON.stringify(information), // Gửi dữ liệu dưới dạng JSON
    //         contentType: "application/json",
    //         dataType: "json",
    //         success: function (response) {
    //             console.log("response :" + response);
    //             // window.location.href ="/family?update-success-member"
    //             $("#AddQuanTam").modal("hide");
    //             notify('success', 'Message updated successfully', 'Update family member successfully.');
    //
    //             // Update the existing row in the table without changing its position
    //             const cccdObjUpdate = information.information.cccd; // Get the CCCD of the family member to be updated
    //             const row = $(`tr[data-id="${cccdObjUpdate}"]`); // Locate the row by data-id
    //
    //             console.log("Updating row with CCCD:", cccdObjUpdate);
    //
    //             if (row.length) {
    //                 console.log("Row found:", row);
    //                 row.find("td:nth-child(2)").text(information.information.cccd);
    //                 row.find("td:nth-child(3)").text(information.information.name);
    //                 row.find("td:nth-child(4)").text(information.information.gender ? 'Nam' : 'Nữ');
    //                 row.find("td:nth-child(5)").text(information.information.job);
    //                 row.find("td:nth-child(6)").text(information.information.department);
    //                 row.find("td:nth-child(7)").text(information.information.address);
    //             } else {
    //                 console.error("Row not found for CCCD:", cccdObjUpdate);
    //             }
    //
    //         },
    //         error: function (jqXHR, textStatus, errorThrown) {
    //             console.error("AJAX Error:", textStatus, errorThrown);
    //             console.error("Response Text:", jqXHR.responseText);
    //         }
    //     });
    // });
$(document).on("click", "#btn-updates", function (e) {
    e.preventDefault();

    const newEmail = $("#Email").val();
    const currentCCCD = $("#CCCD").val();

    // Kiểm tra email trùng lặp trước khi gửi dữ liệu cập nhật
    $.ajax({
        type: "get",
        url: `./family/existsByEmail`,
        data:{
            Email: newEmail
        },
        contentType: "application/json",
        dataType: "json",
        success: function (isDuplicate) {
            if (isDuplicate) {
                // Nếu trùng lặp, kiểm tra xem có phải cùng CCCD không
                $.ajax({
                    type: "get",
                    url: `./family/getByEmail`,
                    data:{
                        Email: newEmail
                    },
                    contentType: "application/json",
                    dataType: "json",
                    success: function (existingData) {
                        if (existingData.cccd === currentCCCD) {
                            console.log("Updating with the same email as the current user.");
                            // Gọi hàm cập nhật nếu email thuộc về người dùng hiện tại
                            updateInformation();
                        } else {
                            console.error("Email already exists for another user.");
                            notify('error', 'Email Error', 'This email belongs to another user.');
                        }
                    }
                });
            } else {
                // Không trùng lặp, tiếp tục cập nhật
                updateInformation();
            }
        }
    });
});

// Hàm cập nhật thông tin
function updateInformation() {
    const information = {
        "information": {
            cccd: $("#CCCD").val(),
            name: $("#HoTen").val(),
            gender: parseInt($("#Gender").val(), 10),
            bhyt: $("#BHYT").val(),
            phone: $("#Phone").val(),
            email: $("#Email").val(),
            job: $("#Job").val(),
            department: $("#Department").val(),
            address: $("#Address").val(),
            medicalHistory: $("#Medical_History").val(),
        },
        "family": {
            idfamily: parseInt($("#idfml").val(), 10),
            name: $("#namefml").val()
        }
    };

    $.ajax({
        type: "post",
        url: "./family/update",
        data: JSON.stringify(information),
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            console.log("response :", response);
            $("#AddQuanTam").modal("hide");
            notify('success', 'Update Success', 'Family member updated successfully.');

            // Update table logic here (unchanged)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX Error:", textStatus, errorThrown);
            console.error("Response Text:", jqXHR.responseText);
        }
    });
}

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
