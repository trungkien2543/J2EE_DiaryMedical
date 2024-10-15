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

            $("#Medical_History").val(response.medical_history); // Nếu bạn có trường này trong response
            $("#Medical_History").prop("disabled",true);
            $.ajax({
                type : "get",
                url: "./family/getFamilyByID",
                data: {
                    iD_Family: response.id_Family,
                },
                dataType: "json",
                success: function (res) {
                    $("#ID_Family").val(response.id_Family +" - " + res.name); // Nếu bạn có trường này trong response
                    $("#ID_Family").prop("disabled",true);
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
function clearInputFields() {
    function clearAndEnableInputFields() {
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
        $("#ID_Family").val("").prop("disabled", false); // If you have this field
    }

}
$(document).on("click",".family-add",function (){
    clearInputFields();
    $("#titleModal").text("Thêm người nhà");
    $("#btn-saves").show();
    $("#btn-updates").hide();
});

$(document).on("click",".family-add",function (){

    let cccd = $(this).data("id");
    $("#titleModal").text("Chỉnh sửa chi tiết");
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

            $("#Medical_History").val(response.medical_history); // Nếu bạn có trường này trong response
            $("#Medical_History").prop("disabled",false);
            $.ajax({
                type : "get",
                url: "./family/getFamilyByID",
                data: {
                    iD_Family: response.id_Family,
                },
                dataType: "json",
                success: function (res) {
                    $("#ID_Family").val(response.id_Family +" - " + res.name); // Nếu bạn có trường này trong response
                    $("#ID_Family").prop("disabled",true);
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