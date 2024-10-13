document.addEventListener('DOMContentLoaded', function () {
        // Khởi tạo calendar chính
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            height: 'auto',
            expandRows: true,
            slotMinTime: '08:00',
            slotMaxTime: '20:00',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,listWeek'
            },
            initialView: 'dayGridMonth',
            initialDate: '2024-10-10',
            navLinks: true,
            editable: true,
            selectable: true,
            nowIndicator: true,
            dayMaxEvents: true,
            events: window.events || [],

            // Xử lý sự kiện khi click vào ngày
            dateClick: function (info) {
                var eventsOnDate = calendar.getEvents().filter(function (event) {
                    var eventDate = new Date(event.start);
                    var clickedDate = new Date(info.date);
                    eventDate.setHours(0, 0, 0, 0);
                    clickedDate.setHours(0, 0, 0, 0);
                    return eventDate.getTime() === clickedDate.getTime();
                });

                if (eventsOnDate.length > 0) {
                    var groupId = eventsOnDate[0].groupId;
                    fetch(`/getReceiptInfo`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ groupId: groupId })
                    })
                    .then(response => response.json())
                    .then(data => {
                        Swal.fire({
                            html: `
                            <div style="display: flex; flex-direction: column; font-size: 16px; padding: 10px;">
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: start; text-align: justify; padding-left: 20px;">
                                    <p><i class="fas fa-receipt"></i> <strong>Receipt ID:</strong> ${data.idReceipt}</p>
                                    <p><i class="fas fa-user"></i> <strong>Patient ID:</strong> ${data.idPatient}</p>
                                    <p><i class="fas fa-user-md"></i> <strong>Doctor ID:</strong> ${data.idDoctor}</p>
                                    <p><i class="fas fa-map-marker-alt"></i> <strong>Place:</strong> ${data.place}</p>
                                    <p><i class="fas fa-calendar-alt"></i> <strong>Date:</strong> ${data.date}</p>
                                    <p><i class="fas fa-clock"></i> <strong>Time:</strong> ${data.time}</p>
                                    <p><i class="fas fa-file-invoice-dollar"></i> <strong>Total Amount:</strong> ${data.totalAmount}</p>
                                    <p><i class="fas fa-procedures"></i> <strong>Service ID:</strong> ${data.idService}</p>
                                    <p><i class="fas fa-clinic-medical"></i> <strong>Clinic:</strong> ${data.clinic}</p>
                                    <p><i class="fas fa-notes-medical"></i> <strong>Diagnosis:</strong> ${data.diagnosis}</p>
                                    <p><i class="fas fa-phone-alt"></i> <strong>Phone:</strong> ${data.phone}</p>
                                    <p><i class="fas fa-envelope"></i> <strong>Email:</strong> ${data.email}</p>
                                </div>
                                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 20px;">
                                    <div>
                                        <p>Hình ảnh kết quả</p>
                                        <img src="../../img/OIP.jpg" alt="Image 1" style="width: 350px; object-fit: cover; border-radius: 8px;">
                                    </div>
                                    <div>
                                        <p>Hình ảnh thuốc</p>
                                        <img src="../../img/OIP.jpg" alt="Image 2" style="width: 350px; object-fit: cover; border-radius: 8px;">
                                    </div>
                                </div>
                            </div>
                            `,  // Nội dung HTML hiển thị thông tin receipt
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
                } else {
                    Swal.fire({
                        title: 'Không có sự kiện',
                        text: 'Không có sự kiện nào vào ngày này!',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    });
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
                initialDate: '2024-10-10',
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
});