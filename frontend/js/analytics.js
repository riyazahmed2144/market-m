// frontend/analytics.js
function analyticsInit() {
    fetch('http://localhost:5000/api/billing')
      .then(res => res.json())
      .then(bills => {
        const profits = {};
        const units = {};
  
        bills.forEach(bill => {
          bill.items.forEach(item => {
            if (!profits[item.productName]) {
              profits[item.productName] = 0;
              units[item.productName] = 0;
            }
            profits[item.productName] += item.total * 0.2; // simple profit estimate
            units[item.productName] += item.quantity;
          });
        });
  
        renderChart('profitChart', 'Profit ($)', profits);
        renderChart('unitsChart', 'Units Sold', units);
      });
  }
  
  function renderChart(canvasId, label, dataObj) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(dataObj),
        datasets: [{
          label: label,
          data: Object.values(dataObj),
          backgroundColor: '#e91e63'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  