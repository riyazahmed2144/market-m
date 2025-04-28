// frontend/dashboard.js
function dashboardInit() {
    fetch('http://localhost:5000/api/analytics')
      .then(res => res.json())
      .then(data => {
        document.getElementById('profitValue').innerText = data.totalProfit.toFixed(2);
        document.getElementById('earnedValue').innerText = data.totalEarned.toFixed(2);
        document.getElementById('soldValue').innerText = data.totalSold;
      });
  
    fetch('http://localhost:5000/api/billing')
      .then(res => res.json())
      .then(billings => {
        const table = document.getElementById('billingTable');
        table.innerHTML = '';
        billings.slice(-5).reverse().forEach(bill => {
          const row = `
            <tr>
              <td>${bill.billNumber}</td>
              <td>$${bill.totalAmount.toFixed(2)}</td>
              <td>${new Date(bill.createdAt).toLocaleString()}</td>
            </tr>`;
          table.innerHTML += row;
        });
      });
  }
  