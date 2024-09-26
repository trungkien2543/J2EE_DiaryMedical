
function searchTable(filter, tableId) {
    const table = document.getElementById(tableId);
    const tr = table.getElementsByTagName('tr');
    if (filter === "all")
    	filter = "";
    
    for (let i = 1; i < tr.length; i++) {
        const tdArray = tr[i].getElementsByTagName('td');
        let found = false;
        for (let j = 0; j < tdArray.length; j++) {
            if (tdArray[j]) {
                const txtValue = tdArray[j].textContent || tdArray[j].innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }
        tr[i].style.display = found ? '' : 'none';
    }
}

document.getElementById('searchTable2').addEventListener('keyup', function() {
    const input = document.getElementById('searchTable2');
    const filter = input.value.toLowerCase();
    searchTable(filter, 'xulyTable');
});

function handleContentChange_trangthai() {
    var selectedSpan = document.getElementById("choiceXL");
    var currentContent = selectedSpan.innerText;
    //console.log("Nội dung thay đổi thành: " + currentContent);
    if (currentContent === "All"){
		loadDataToTable("/loadXulyData");
	} else if (currentContent === "Đã xử lý"){
		loadDataToTable("/loadDaXulyData");
	}
	else {
		loadDataToTable("/loadChuaXulyData");
	}
}
function handleContentChange_hinhthuc() {
    var selectedSpan = document.getElementById("choiceHTXL");
    var currentContent = selectedSpan.innerText;
    const filter = currentContent.toLowerCase();
    searchTable(filter, 'xulyTable');
    calculateTotal();
    
}

function loadDataToTable(urll) {
    $.ajax({
        url: urll,
        type: "GET",
        success: function(data) {
            // Xử lý dữ liệu nhận được từ controller
            // Đẩy dữ liệu vào bảng
            var tableBody = $("#xulyTable tbody");
            tableBody.empty(); // Xóa dữ liệu cũ trong bảng trước khi thêm dữ liệu mới

            $.each(data, function(index, xulyData) {
                var row = "<tr>" +
                          "<td>" + xulyData[0] + "</td>" +
                          "<td>" + xulyData[1] + "</td>" +
                          "<td>" + xulyData[2] + "</td>" +
                          "<td>" + xulyData[3] + "</td>" +
                          "<td>" + xulyData[4] + "</td>" +
                          "<td>" + xulyData[5] + "</td>" +
                          "<td>" + xulyData[6] + "</td>" +
                          "<td>" + xulyData[7] + "</td>" +
                          "</tr>";
                tableBody.append(row);
            });
            
			handleContentChange_hinhthuc();
			calculateTotal();
        },
        error: function(xhr, status, error) {
            //console.error("Error loading data: " + error);
        }
    });
}

function handleSearchXuly() {
	var theogi = document.getElementById('khoahaynganh').textContent;
	
    // This function will be called when the user clicks the search button
    var searchText = searchInput.value;
    var search = searchText;
    var url = ""

	if (theogi === 'Theo Khoa') {
		url = "/ThongKeXuly?chon=khoa&search=";
	} else {
		url = "/ThongKeXuly?chon=nganh&search=";
	}
	fetch(url + search, {
        method: 'PUT'
    })
    .then(response => {
		if (!response.ok) {
			//alert("Không tìm thấy dữ liệu!")
  			//throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(data => {
	    var tableBody = $("#xulyTable tbody");
        tableBody.empty(); // Xóa dữ liệu cũ trong bảng trước khi thêm dữ liệu mới
		if (data.length != null) {
	        $.each(data, function(index, xulyData) {
	            var row = "<tr>" +
	                      "<td>" + xulyData[0] + "</td>" +
	                      "<td>" + xulyData[1] + "</td>" +
	                      "<td>" + xulyData[2] + "</td>" +
	                      "<td>" + xulyData[3] + "</td>" +
	                      "<td>" + xulyData[4] + "</td>" +
	                      "<td>" + xulyData[5] + "</td>" +
	                      "<td>" + xulyData[6] + "</td>" +
	                      "<td>" + xulyData[7] + "</td>" +
	                      "</tr>";
	            tableBody.append(row);
	        });
	        
        }
     	document.getElementById('choiceXL').innerHTML = "All";
     	document.getElementById('choiceHTXL').innerHTML = "All";
		calculateTotal();
	})
    .catch(error => {
        console.error('Lỗi ', error);
    });
}


function calculateTotal() {
    const table = document.getElementById('xulyTable');
    let total = 0;
	let num = 0;
    // Bắt đầu từ hàng đầu tiên của tbody
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        console.log(row.style.display);
        if (row.parentElement.nodeName === 'TBODY' && row.style.display !== 'none') {
            const cellValue = parseFloat(row.cells[5].innerText);
            if (!isNaN(cellValue)) {
                total += cellValue;
                num += 1;
            }
        }
    }
	
	document.getElementById('hanhnumber').innerText = num + " hàng";
    document.getElementById('tongTienPhat').innerText = total;
}

calculateTotal();


function xulybangDate(startDateInput,endDateInput) {
	const table = document.getElementById('xulyTable');
    // Bắt đầu từ hàng đầu tiên của tbody
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        console.log(row.style.display);
        if (row.parentElement.nodeName === 'TBODY' && row.style.display !== 'none') {
            const cellValue = row.cells[6].innerText;
            if (isNaN(cellValue)) {
				if (startDateInput === "") {
		            if (!isDateBetween(endDateInput, endDateInput, cellValue)) {
						table.getElementsByTagName('tr')[i].style.display = 'none';
		            }
	           	} else if (endDateInput === "") {
				   	if (!isDateBetween(startDateInput, startDateInput, cellValue)) {
				   		table.getElementsByTagName('tr')[i].style.display = 'none';
		            }
			   	} else {
				  	if (!isDateBetween(startDateInput, endDateInput, cellValue)) {
					  	table.getElementsByTagName('tr')[i].style.display = 'none';
		            }
			   	} 
            } 
            
        }
    }
    calculateTotal();
}