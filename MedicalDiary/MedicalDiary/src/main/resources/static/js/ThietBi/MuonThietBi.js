document.addEventListener('DOMContentLoaded', function (){
    // Lấy thẻ input theo ID
    var borrowDateInput = document.getElementById("borrow-date");


    // Lấy thời gian hiện tại theo múi giờ UTC
    var currentUTCTime = moment.utc();

    // Chuyển múi giờ UTC thành múi giờ Việt Nam
    var currentVNTime = currentUTCTime.utcOffset(7); // Điều chỉnh giờ cho múi giờ Việt Nam

    // Format thời gian thành chuỗi có định dạng phù hợp cho trường <input type="datetime-local">
    var formattedDate = currentVNTime.format("YYYY-MM-DDTHH:mm");

    // Gán giá trị ngày giờ vào trường input
    borrowDateInput.value = formattedDate;

    var button = document.getElementById("btnSubmit");

    button.addEventListener('click', function (){

        var MaTV = document.getElementById('inputMaTV').value;

        var MaTB = document.getElementById('searchID').value;

        var BorrowDate = document.getElementById('borrow-date').value;

        var ReturnTime = document.getElementById('return-date').value;

        // Tạo một đối tượng Moment từ giá trị của input
        var ReturnDate = moment(ReturnTime, 'HH:mm').format("YYYY-MM-DDTHH:mm");



        if (ReturnDate == '' || MaTB == ''){
            alert ("Không để trống thông tin");
            return;
        }


        fetch('/MuonThietBi.html?MaTV=' + MaTV + '&MaTB=' + MaTB + '&NgayMuon=' + BorrowDate + '&NgayTra=' + ReturnDate, {
            method: 'POST'
        })
        .then(response => {
            if (!response.ok) {
                alert ("Không được");
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {

            Swal.fire({
                title: "Thông báo",
                text: data,
                icon: "info"
              }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'http://localhost:8080/ThanhVien.html';
                }
              })
            
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
        
    })
})



document.addEventListener('DOMContentLoaded', function (){
    // Lấy danh sách thiết bị

    ListTB = []

    fetch('/MuonThietBi.html', {
        method: 'PATCH', // Sử dụng phương thức PATCH
    })
    .then(response => {
        if (!response.ok) {
            alert ("Không được");
            throw new Error('Network response was not ok');
        }
        return response.text();
        
    })
    .then(data => {

        // Chuyển đổi chuỗi JSON thành một mảng đối tượng JavaScript
        ListTB = JSON.parse(data);

        // Bây giờ bạn có thể làm việc với mảng thongTinSuDungArray trong JavaScript
        ListTB.forEach(function(item) {
            console.log(item.maTB, item.tenTB, item.moTaTB);
        });
        
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });



    // Code bắt sự kiện và tìm kiếm
    const searchInput = document.getElementById('searchID');
    const NameTB = document.getElementById('NameTB');
    const suggestions = document.getElementById('suggestions');
    
    searchInput.addEventListener('input', function() {
        const query = this.value;
        
        var suggestionList;

        if (query == ''){
            suggestionList = [];
        }
        else{
            // Làm việc của bạn để lấy gợi ý từ cơ sở dữ liệu hoặc API
            suggestionList = getSuggestions(query);
        }
        
        showSuggestions(suggestionList);
    });
    
    function getSuggestions(query) {

        // Đây chỉ là một ví dụ đơn giản, bạn có thể thay đổi nó để phù hợp với nhu cầu của bạn
        const suggestions = [];

        ListTB.forEach(element => {
            if (element.maTB.toString().includes(query.trim())){
                suggestions.push(element.maTB);
            }
        });


        
        return suggestions;
    }
    
    function showSuggestions(suggestionList) {
        suggestions.innerHTML = '';
        if (suggestionList.length === 0) {
        suggestions.style.display = 'none';
        return;
        }
        suggestionList.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('suggestion');
        suggestionElement.textContent = suggestion;
        suggestionElement.addEventListener('click', function() {
            searchInput.value = suggestion;
            
            suggestions.style.display = 'none';
        });
        suggestions.appendChild(suggestionElement);
        });

        suggestions.style.display = 'block';
    }


    // Bắt sự kiện 

    document.getElementById("return-date").addEventListener("focus", function() {
        var ID = document.getElementById("searchID");
        var found = false; // Khởi tạo cờ

        // Kiểm tra xem có để trống không
        if (ID.value == ''){
            alert ("Không để trống mã thiết bị");
            ID.focus();
            return;
        }

    
        ListTB.forEach(element => {
            if (ID.value == element.maTB.toString()){
                NameTB.value = element.tenTB;
                found = true; // Đánh dấu là đã tìm thấy
                return; // Kết thúc vòng lặp
            }
        });

        // Kiểm tra cờ
        if(found){
            return; // Nếu đã tìm thấy, kết thúc sự kiện
        }

        alert("Mã thiết bị này đang được mượn hoặc đã được đặt chỗ bởi người khác. Hoặc mã này không tồn tại");

        ID.value = '';

        ID.focus();



    });

    document.getElementById("return-date").addEventListener("blur", function() {

        var InputDate = document.getElementById('return-date');

        // Lấy giá trị của input "time"
        var timeValue = InputDate.value;

        // Tạo một đối tượng Moment từ giá trị của input
        var ReturnDate = moment(timeValue, 'HH:mm');

        // Lấy thời gian hiện tại theo múi giờ UTC
        var currentUTCTime = moment.utc();

        // Chuyển múi giờ UTC thành múi giờ Việt Nam
        var currentVNTime = currentUTCTime.utcOffset(7);


        // So sánh giữa ReturnDate và currentVNTime
        if (ReturnDate.isBefore(currentVNTime)) {
            alert("Thời gian trả không thể nhỏ hơn thời gian hiện tại.");
            InputDate.value = "";
            InputDate.focus()
        } 

    });



})


