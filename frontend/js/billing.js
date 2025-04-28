// frontend/billing.js
let productList = [];

function billingInit() {
  fetch('http://localhost:5000/api/products')
    .then(res => res.json())
    .then(data => {
      productList = data;
      addBillingRow(); // add one row by default
    });

  document.getElementById('billingForm').onsubmit = function (e) {
    e.preventDefault();
    const rows = document.querySelectorAll('.billing-row');
    const items = [];

    rows.forEach(row => {
      const productName = row.querySelector('.product-select').value;
      const quantity = parseInt(row.querySelector('.quantity-input').value);
      if (productName && quantity > 0) {
        items.push({ productName, quantity });
      }
    });

    fetch('http://localhost:5000/api/billing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    })
      .then(res => res.json())
      .then(result => {
        alert('Bill submitted!');
        document.getElementById('billingForm').reset();
        document.getElementById('billingItems').innerHTML = '';
        addBillingRow();
        billingInit(); // refresh data
      });
  };
}

function addBillingRow() {
  const container = document.getElementById('billingItems');
  const row = document.createElement('div');
  row.className = 'billing-row';

  const options = productList.map(p => `<option value="${p.name}">${p.name}</option>`).join('');
  row.innerHTML = `
    <select class="product-select" onchange="updatePreview()">
      <option value="">Select Product</option>
      ${options}
    </select>
    <input type="number" class="quantity-input" value="1" min="1" onchange="updatePreview()" />
    <br><br>
  `;

  container.appendChild(row);
  updatePreview();
}

function updatePreview() {
  const preview = document.getElementById('currentBillPreview');
  const totalSpan = document.getElementById('totalAmount');
  const rows = document.querySelectorAll('.billing-row');

  let total = 0;
  preview.innerHTML = '';

  rows.forEach(row => {
    const name = row.querySelector('.product-select').value;
    const qty = parseInt(row.querySelector('.quantity-input').value);
    const product = productList.find(p => p.name === name);

    if (product && qty > 0) {
      const subtotal = qty * product.sellingPrice;
      total += subtotal;
      preview.innerHTML += `
        <tr>
          <td>${name}</td>
          <td>${qty}</td>
          <td>$${subtotal.toFixed(2)}</td>
        </tr>`;
    }
  });

  totalSpan.innerText = total.toFixed(2);
}
