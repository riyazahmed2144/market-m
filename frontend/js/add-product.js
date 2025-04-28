// Run this function on page load
function addProductInit() {
    const form = document.getElementById('addProductForm');
  
    form.onsubmit = function (e) {
      e.preventDefault();
  
      const data = {
        name: form.name.value.trim(),
        quantity: Number(form.quantity.value),
        sellingPrice: parseFloat(form.sellingPrice.value),
        retailPrice: parseFloat(form.retailPrice.value)
      };
  
      // Post to backend
      fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(response => {
        alert('Product added successfully!');
        form.reset(); // Clear form
      })
      .catch(err => {
        console.error('Error adding product:', err);
        alert('Failed to add product.');
      });
    };
  }
  
  // Initialize on page load
  window.onload = addProductInit;
  