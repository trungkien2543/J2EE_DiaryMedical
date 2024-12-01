document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('multiAxisChart').getContext('2d');

    // Khai báo biến myChart toàn cục
    let myChart;

    // Hàm tạo biểu đồ ban đầu
    function createChart(statistics) {
        let datasets = [];
        statistics.forEach(person => {
            person.datasets.forEach(dataset => {
                datasets.push({
                    label: `${person.label} - ${dataset.year}`,
                    data: dataset.data,
                    borderColor: person.borderColor,
                    tension: 0.4
                });
            });
        });

        const chartData = {
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            datasets: datasets
        };

        myChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'top' }
                },
                scales: {
                    x: { title: { display: true, text: 'Tháng' } },
                    y: { title: { display: true, text: 'Số lần đi khám' }, ticks: { beginAtZero: true } }
                }
            }
        });
    }

    // Khởi tạo biểu đồ với dữ liệu ban đầu
    createChart(statistics);

    // Hiển thị ngày hôm nay
    const today = new Date();
    const formattedDate = today.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
    let currentYear = new Date().getFullYear(); // Năm hiện tại
    document.getElementById('currentYear').innerHTML = `Hôm nay: <b>${formattedDate}</b> - Hiển thị dữ liệu cho năm: <b>${currentYear}</b>`;

    // Hàm cập nhật biểu đồ
    function updateChart() {
        const filteredDatasets = [];
        statistics.forEach(person => {
            person.datasets.forEach(dataset => {
                if (dataset.year === currentYear) {
                    filteredDatasets.push({
                        label: `${person.label} - ${dataset.year}`,
                        data: dataset.data,
                        borderColor: person.borderColor,
                        tension: 0.4
                    });
                }
            });
        });

        // Cập nhật dữ liệu biểu đồ
        myChart.data.datasets = filteredDatasets;
        myChart.update();

        // Cập nhật thông tin năm hiển thị
        document.getElementById('currentYear').innerHTML = `Hôm nay: <b>${formattedDate}</b> - Hiển thị dữ liệu cho năm: <b>${currentYear}</b>`;
    }

    // Chuyển năm
    document.getElementById('prevYear').addEventListener('click', () => {
        currentYear--;
        updateChart();
    });

    document.getElementById('nextYear').addEventListener('click', () => {
        currentYear++;
        updateChart();
    });
});
