// frontend/products.js
function productsInit() {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(products => {
        const table = document.getElementById('productTable');
        table.innerHTML = '';
        products.forEach(prod => {
          const row = `
            <tr>
              <td>${prod.name}</td>
              <td>${prod.quantity}</td>
              <td>$${prod.sellingPrice.toFixed(2)}</td>
              <td>$${prod.retailPrice.toFixed(2)}</td>
            </tr>`;
          table.innerHTML += row;
        });
      });
  }
// frontend/products.js (continued)
function addProductInit() {
    document.getElementById('addProductForm').onsubmit = function(e) {
      e.preventDefault();
      const form = e.target;
      const data = {
        name: form.name.value,
        quantity: Number(form.quantity.value),
        sellingPrice: parseFloat(form.sellingPrice.value),
        retailPrice: parseFloat(form.retailPrice.value)
      };
  
      fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(result => {
        alert('Product added successfully!');
        form.reset();
      });
    };
  }
  