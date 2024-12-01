
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
                    Swal.fire({
                        html: `
                        <div style="display: flex; flex-direction: column; font-size: 16px; padding: 10px;">
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: start; text-align: justify; padding-left: 20px;">
                                <p><i class="fas fa-receipt"></i> <strong>Receipt ID:</strong> ${data.idreceipt}</p>
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
                                    <p>Hình ảnh kết quả</p>
                                    <img src="${data.urlResult}" alt="Image 1" style="width: 350px; object-fit: cover; border-radius: 8px;">
                                </div>
                                <div>
                                    <p>Hình ảnh thuốc</p>
                                    <img src="${data.urlBill}" alt="Image 2" style="width: 350px; object-fit: cover; border-radius: 8px;">
                                </div>
                            </div>
                        </div>
                        `,
                        confirmButtonText: '<i class="fas fa-check-circle"></i> OK',
                        confirmButtonColor: '#4CAF50',
                        background: '#f9f9f9',
                        width: '825px',
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