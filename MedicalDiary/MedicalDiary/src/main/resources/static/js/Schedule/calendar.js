
let selectedCheckboxValues = [];
let calendar;
function updateSelectedCheckboxValues(checkbox) {
        const checkboxValue = checkbox.value;
        if (checkbox.checked) {
            selectedCheckboxValues.push(checkboxValue);
        } else {
            const index = selectedCheckboxValues.indexOf(checkboxValue);
            if (index > -1) {
                selectedCheckboxValues.splice(index, 1);
            }
        }
        sendSelectedValuesToController(selectedCheckboxValues, checkbox.checked ? "add" : "remove", checkboxValue);
    }

document.addEventListener('DOMContentLoaded', function () {
        const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
        console.log("Danh sách checkbox: ", checkboxes);

        checkboxes.forEach(checkbox => {
            console.log("Checkbox: ", checkbox);
            checkbox.addEventListener('click', function() {
                updateSelectedCheckboxValues(checkbox);
            });
        });
    // Khởi tạo calendar chính
    var calendarEl = document.getElementById('calendar');

    // Lấy ngày đầu tiên của tháng hiện tại
    const today = new Date();
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    calendar = new FullCalendar.Calendar(calendarEl, {
        height: 'auto',
        expandRows: true,
        slotMinTime: '08:00',
        slotMaxTime: '20:00',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listYear'
        },
        initialView: 'dayGridMonth',
        initialDate: currentMonthStart,
        navLinks: true,
        views: {
                    listYear: {
                        type: 'list',
                        duration: { years: 1 }, // Hiển thị tất cả các sự kiện trong 1 năm
                        buttonText: 'Year' // Đặt tên nút là 'Year'
                    }
                },

        editable: true,
        dayMaxEvents: 3,  // Giới hạn số sự kiện hiển thị và hiển thị "+ more"
        selectable: true,
        nowIndicator: true,
        eventLimitClick: 'day', // Hoặc xóa dòng này để tắt tính năng popover
        events: window.events || [],

        eventClick: function (info) {
            info.jsEvent.preventDefault();
            var groupId = info.event.groupId;
            var isFollowUp = info.event.title.startsWith('Follow-up visit for:');

            console.log(isFollowUp);

            // Ẩn popover
            document.querySelectorAll('.fc-popover').forEach(popover => popover.style.display = 'none');

            // Hàm lấy và hiển thị thông tin receipt
            const showReceipt = (groupId) => {
                return fetch(`/getReceiptInfo`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ groupId: groupId })
                })
                .then(response => {
                    if (!response.ok) throw new Error('Failed to fetch receipt information');
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    Swal.fire({
                        html: `
                        <div style="display: flex; flex-direction: column; font-size: 16px; padding: 10px;">
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: start; text-align: justify; padding-left: 20px;">
                                <p><i class="fas fa-receipt"></i> <strong>Receipt ID:</strong> ${data.IDReceipt}</p>
                                <p><i class="fas fa-user"></i> <strong>Patient:</strong> ${data.patient.name}</p>
                                <p><i class="fas fa-user-md"></i> <strong>Doctor:</strong> ${data.doctor.name}</p>
                                <p><i class="fas fa-map-marker-alt"></i> <strong>Place:</strong> ${data.place}</p>
                                <p><i class="fas fa-calendar-alt"></i> <strong>Date:</strong> ${data.date}</p>
                                <p><i class="fas fa-clock"></i> <strong>Reason:</strong> ${data.reason}</p>
                                <p><i class="fas fa-envelope"></i> <strong>Remind:</strong> ${data.remind}</p>
                                <p><i class="fas fa-file-invoice-dollar"></i> <strong>Treat:</strong> ${data.treat}</p>
                                <p><i class="fas fa-procedures"></i> <strong>Date Visit:</strong> ${data.dateVisit}</p>
                                <p><i class="fas fa-clinic-medical"></i> <strong>Blood Pressure:</strong> ${data.bloodPressure}</p>
                                <p><i class="fas fa-notes-medical"></i> <strong>Diagnosis:</strong> ${data.diagnosis}</p>
                                <p><i class="fas fa-phone-alt"></i> <strong>Weight:</strong> ${data.weight}</p>
                                <p><i class="fas fa-envelope"></i> <strong>Height:</strong> ${data.height}</p>
                                <p><i class="fas fa-envelope"></i> <strong>Heart Rate:</strong> ${data.heartRate}</p>
                                <p><i class="fas fa-envelope"></i> <strong>Temperature:</strong> ${data.temperature}</p>

                            </div>
                            <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 20px;">
                                <div>
                                    <p>Image Result</p>
                                    <img src="${data.urlResult}" alt="Image 1" style="width: 350px; object-fit: cover; border-radius: 8px;">
                                </div>
                                <div>
                                    <p>Image bill</p>
                                    <img src="${data.urlBill}" alt="Image 2" style="width: 350px; object-fit: cover; border-radius: 8px;">
                                </div>
                            </div>
                        
                            <div class="mb-2 mx-3" style="margin-top: 42px;">
                                <button class="btn btn-primary family-add" type="button" data-toggle="modal" onclick="openReceiptModal(${data.patient.cccd})">Edit Receipt</button>
                            </div>
                        
                        
                            <div id="receiptModal" class="modal" tabindex="-1" style="display: none; z-index: max()">
                                <div class="modal-dialog" style="max-width: 600px;">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title">Receipt Form</h5>
                                      <button type="button" class="btn btn-close" onclick="closeReceiptModal()" aria-label="Close">
                                        <i class="fas fa-times-circle" style="color: #dc3545; font-size: 1.5rem;"></i>
                                      </button>
                        
                                    </div>
                                    <div class="modal-body" style="max-height: 85vh; overflow-y: auto;">
                                      <form id="receiptForm" method="post" enctype="multipart/form-data">
                                        
                                        <!-- Input ẩn chứa idReceipt -->
                                        <input type="hidden" id="idReceipt" name="idReceipt" value="${data.IDReceipt}">
                                        
                                        
                                        <div class="mb-3">
                                          <label for="idPatient"><strong>Patient ID:</strong></label>
                                          <input type="text" id="idPatient" name="idPatient" class="form-control" readonly value="${data.patient.cccd}">
                                        </div>
                                        <div class="mb-3">
                                          <label for="idDoctor"><strong>Doctor ID:</strong></label>
                                          <input type="number" id="idDoctor" name="idDoctor" class="form-control" value="${data.doctor.cccd}">
                                        </div>
                                        <div class="mb-3">
                                          <label for="place"><strong>Place:</strong></label>
                                          <input type="text" id="place" name="place" class="form-control" readonly value="${data.place}">
                                        </div>
                        
                                        <div class="mb-3">
                                          <label for="datetime"><strong>Date and Time:</strong></label>
                                          <input type="datetime-local" id="datetime" name="datetime" class="form-control" value="${data.date}">
                                        </div>
                        
                                        <div class="mb-3">
                                          <label for="reason"><strong>Reason:</strong></label>
                                          <input type="text" id="reason" name="idService" class="form-control" value="${data.reason}">
                                        </div>
                                        <div class="mb-3">
                                          <label for="diagnosis"><strong>Diagnosis:</strong></label>
                                          <textarea id="diagnosis" name="diagnosis" class="form-control" rows="2" >${data.diagnosis}</textarea>
                                        </div>
                                        <div class="mb-3">
                                          <label for="treat"><strong>Treat:</strong></label>
                                          <input type="text" id="treat" name="treat" class="form-control" value="${data.treat}">
                                        </div>
                                        <div class="mb-3">
                                          <label for="remind"><strong>Remind:</strong></label>
                                          <input type="text" id="remind" name="remind" class="form-control" value="${data.remind}">
                                        </div>
                        
                                        <div class="row">
                                          <div class="col-md-6">
                                          <div class="mb-3">
                                                <label for="dateVisit"><strong>Date of Visit:</strong></label>
                                                <input type="datetime-local" id="dateVisit" name="dateVisit" class="form-control" 
                                                       value="${data.dateVisit}">
                                            </div>
    
                                            <div class="mb-3">
                                              <label for="weight"><strong>Weight (kg):</strong></label>
                                              <input type="number" id="weight" name="weight" class="form-control" value="${data.weight}">
                                            </div>
                                            <div class="mb-3">
                                              <label for="height"><strong>Height (cm):</strong></label>
                                              <input type="number" id="height" name="height" class="form-control" value="${data.height}">
                                            </div>
                                          </div>
                                          <div class="col-md-6">
                                            <div class="mb-3">
                                              <label for="bloodPressure"><strong>Blood Pressure:</strong></label>
                                              <input type="number" id="bloodPressure" name="bloodPressure" class="form-control" value="${data.bloodPressure}">
                                            </div>
                                            <div class="mb-3">
                                              <label for="heartRate"><strong>Heart Rate:</strong></label>
                                              <input type="number" id="heartRate" name="heartRate" class="form-control" value="${data.heartRate}">
                                            </div>
                                            <div class="mb-3">
                                              <label for="temperature"><strong>Temperature (°C):</strong></label>
                                              <input type="number" id="temperature" name="temperature" class="form-control" value="${data.temperature}">
                                            </div>
                                          </div>
                                        </div>
                        
                                        <div class="mb-3">
                                          <label for="resultImage"><strong>Result Image:</strong></label>
                                          <input type="file" id="resultImage" name="resultImage" class="form-control" accept="image/*" onchange="previewImage(event, 'resultPreview')">
                                          <img id="resultPreview" alt="Preview Result Image" class="img-fluid mt-2" style="display: block; max-height: 200px; border-radius: 8px;"  src="${data.urlResult}">
                                        </div>
                                        <div class="mb-3">
                                          <label for="medicineImage"><strong>Medicine Image:</strong></label>
                                          <input type="file" id="medicineImage" name="medicineImage" class="form-control" accept="image/*" onchange="previewImage(event, 'medicinePreview')">
                                          <img id="medicinePreview" alt="Preview Medicine Image" class="img-fluid mt-2" style="display: block; max-height: 200px; border-radius: 8px;"  src="${data.urlBill}">
                                        </div>
                                        <div class="text-center mt-4">
                                          <button type="button" class="btn btn-success" id="btnEditReceipt">Submit</button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                            </div>    
                        </div>
                         `, footer: '<button type="button" class="btn btn-success" id="btnCustomClose">OK</button>',
                        showConfirmButton: false, // Tắt nút xác nhận mặc định của SweetAlert2
                        background: '#f9f9f9',
                        width: '825px',
                        didRender: () => {
                            document.getElementById('btnCustomClose').addEventListener('click', () => {
                                    Swal.close();
                                }
                            );
                        },
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Không thể lấy thông tin của receipt!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
            };

            // Xử lý sự kiện Follow-up
            if (isFollowUp) {
                Swal.fire({
                    title: 'Follow-up Visit Details',
                    html: `
                    <div style="display: flex; flex-direction: column; font-size: 16px; padding: 10px;">
                        <div style="display: grid; grid-template-columns: 1fr; gap: 10px; text-align: center;">
                            <p><strong>This is a Follow-up Visit</strong></p>
                            <p><i class="fas fa-calendar-check"></i> Follow-up Date: ${info.event.start ? info.event.start.toLocaleDateString() : 'N/A'}</p>
                            <p><i class="fas fa-notes-medical"></i> Original Reason: ${info.event.title.replace('Follow-up visit for: ', '')}</p>
                        </div>
                    </div>
                    `,
                    showCancelButton: true,
                    confirmButtonText: 'Show Detail',
                    cancelButtonText: 'Close',
                    preConfirm: () => showReceipt(groupId)
                });
            } else {
                showReceipt(groupId);
            }
        }




    });
    calendar.render();


    // Khởi tạo mini-calendar
    var miniCalendarEl = document.getElementById('mini-calendar');
    if (miniCalendarEl) {
        var miniCalendar = new FullCalendar.Calendar(miniCalendarEl, {
            headerToolbar: {
                left: 'title',
                right: 'prev,next'
            },
            initialView: 'dayGridMonth',
            initialDate: currentMonthStart,
            selectable: false,
            editable: false,
            dayMaxEvents: true,
            dayHeaderFormat: { weekday: 'narrow' },  // Hiển thị chỉ 1 chữ cái đầu
            dateClick: function(info) {
                // Xóa tất cả các ngày đã có lớp "active"
                var allActiveDays = miniCalendarEl.querySelectorAll('.fc-daygrid-day.active');
                allActiveDays.forEach(function(day) {
                    day.classList.remove('active');
                });

                // Thêm lớp "active" vào ngày được click
                var clickedDay = info.dayEl;
                clickedDay.classList.add('active');

                // Chuyển đến tháng của ngày được click trên lịch chính
                calendar.gotoDate(info.date);
            }
        });
        miniCalendar.render();
    }
        var toggleArrows = document.querySelectorAll('.toggle-arrow');
        toggleArrows.forEach(function(toggleArrow) {
            toggleArrow.addEventListener('click', function() {
                var checkboxContainer = toggleArrow.nextElementSibling;
                checkboxContainer.classList.toggle('hidden');
                toggleArrow.classList.toggle('collapsed');
            });
        });


});


function showAlert(button) {
    var checkbox = button.previousElementSibling;
    var cccd = checkbox.value;
    var label = button.parentNode.textContent.trim();
    document.getElementById("alertName").innerText = label;
    var cccdInput = document.getElementById("cccdInput");
    if (!cccdInput) {
        cccdInput = document.createElement("input");
        cccdInput.type = "hidden";
        cccdInput.name = "cccd";
        cccdInput.id = "cccdInput";
        document.querySelector("#customAlert form").appendChild(cccdInput);
    }
    cccdInput.value = cccd;
    document.getElementById("customAlert").style.display = "block";
}

function closeAlert() {
    document.getElementById("customAlert").style.display = "none";
}

function sendSelectedValuesToController(selectedValues, action, changedValue) {
    fetch('/createCalendar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            selectedValues: selectedValues,
            action: action,
            changedValue: changedValue
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response data:", data);

        if (data.status === "success") {
            console.log("Action:", action);
            console.log("Data events:", data.events);

            if (action === "add" && Array.isArray(data.events)) {
                console.log("Adding events to calendar:", data.events);
                data.events.forEach(event => {
                    // Check if the event has a color and apply it
                    console.log("Event Color: " ,event.color);
                    if (event.color) {
                        calendar.addEvent({
                            title: event.title,
                            start: event.start,
                            backgroundColor: event.color,  // Gán màu nền
                            borderColor: event.color,      // Gán màu viền
                            groupId: event.groupId,         // Đảm bảo groupId được gán đúng
                            allDay: true
                        });
                    } else {
                        calendar.addEvent({
                            title: event.title,
                            start: event.start,
                            groupId: event.groupId
                        });
                    }
                    console.log("Added event:", event);
                });
            } else if (action === "remove") {
                console.log("Removing events with groupIds:", data.idRes);
                if (Array.isArray(data.idRes) && data.idRes.length > 0) {
                    data.idRes.forEach(groupId => {
                        const eventsToRemove = calendar.getEvents().filter(event => event.groupId === String(groupId));
                        if (eventsToRemove.length > 0) {
                            eventsToRemove.forEach(event => {
                                console.log("Removing event with groupId:", event.groupId);
                                event.remove();
                            });
                        } else {
                            console.log("No events found with groupId:", groupId);
                        }
                    });
                } else {
                    console.log("No groupIds found in idRes for removal.");
                }
            }
        } else {
            console.log("Error: Unexpected response status", data.status);
        }
    })
    .catch(error => {
        console.error("Error handling response:", error);
    });
}


    document.addEventListener('DOMContentLoaded', function () {
        const exportExcelBtn = document.getElementById('exportExcelBtn');

        exportExcelBtn.addEventListener('click', function () {
            if (selectedCheckboxValues.length === 0) {
                alert('No items selected to export!');
                return;
            }

            // Gửi danh sách idReceipt đến server
            fetch('/exportReceipts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedCheckboxValues),
            })
            .then(response => response.json())
            .then(receiptDetails => {
                // Tạo một Workbook mới
                console.log('Dữ liệu nhận được:', receiptDetails);
                console.log('Số lượng dữ liệu:', receiptDetails.length);
                const workbook = XLSX.utils.book_new();


                selectedCheckboxValues.forEach((id, index) => {

                    const receiptData = receiptDetails.filter(receipt => receipt.patient.cccd === id);
                    console.log("ReceiptDATA :",receiptData);

                    const data = receiptData.map((receipt, index) => ({
                            Index: index + 1,
                            ReceiptID: receipt.IDReceipt,
                            NamePatient: receipt.patient.name,
                            NameDoctor: receipt.doctor.name,
                            Place: receipt.place,
                            Date: receipt.date,
                            Reason: receipt.reason,
                            Diagnosis: receipt.diagnosis,
                            Treat: receipt.treat,
                            Remind: receipt.remind,
                            DateVisit: receipt.dateVisit,
                            BloodPressure: receipt.bloodPressure,
                            Weight: receipt.weight,
                            Height: receipt.height,
                            HeartRate: receipt.heartRate,
                            Temperature: receipt.temperature
                    }));

                    // Tạo một sheet với tên là idReceipt
                    const worksheet = XLSX.utils.json_to_sheet(data);

                    // Thêm sheet vào Workbook
                    XLSX.utils.book_append_sheet(workbook, worksheet, receiptData[0].patient.name);
                });

                // Xuất file Excel
                const excelFileName = 'Receipts.xlsx';
                XLSX.writeFile(workbook, excelFileName);
            })
            .catch(error => {
                console.error('Error exporting data:', error);
                alert('Failed to export receipts!');
            });
        });
    });

