
const socket = io();



socket.on('productosActualizados', (productos) => {
    actualizarInterfazDeUsuario(productos);
  });

 function actualizarInterfazDeUsuario(productos) {
    try {
        const containerProducts = document.getElementById("containerProducts")
        containerProducts.innerHTML = '';
        productos.forEach(producto => {
          const productDiv = document.createElement('div');
          productDiv.classList.add('product');
          containerProducts.classList.add("containerProducts")
      
          productDiv.innerHTML = `
            <img class="product__img" src="${producto.thumbnail}" alt="imagen de producto">
            <h3 class="title-products">${producto.title}</h3>
            <span class="price">Stock: ${producto.stock}</span>
            <span class="price">$${producto.price}</span>
      
            <div class="btn-products">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" id="editButton" class="bi bi-pencil" onclick="createEditForm('${producto._id}')" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
      
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" id="eliminateProduct" class="bi bi-trash3"  onclick="deleteProduct('${producto._id}')" viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
        </svg>
            </div>`;
      
          containerProducts.appendChild(productDiv);
        });
    } catch (error) {
        console.log("Error parte front");
    }
  }
  


  const deleteProduct = async (productId) => {
    try {
        console.log('Deleting product with ID:', productId);
        socket.emit("deleteProduct", productId);
    } catch (error) {
        console.error('Error al eliminar producto:', error);
    }
};





function createEditForm(product) {
  const form = document.createElement('form');
  form.id = 'editProductForm';
  form.className = 'EditProductForm';

  const fields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
  fields.forEach(function (field) {
      const label = document.createElement('label');
      label.setAttribute('for', field);
      label.textContent = field.charAt(0).toUpperCase() + field.slice(1) + ':';
      label.classList.add("editLabels");

      const input = document.createElement('input');
      input.type = (field === 'price' || field === 'stock') ? 'number' : 'text';
      input.id = field;
      input.name = field;
      input.placeholder = 'Nuevo ' + field;
      input.value = product[field]; // Cargar el valor del producto en el campo
      input.classList.add("editInputs");

      form.appendChild(label);
      form.appendChild(input);
  });

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.classList.add("confirmEdit");
  submitButton.textContent = 'Editar producto';
  form.appendChild(submitButton);

  form.addEventListener('submit', function (event) {
      event.preventDefault();

  

      const modal = document.getElementById('editProductModal');
      modal.style.display = 'none';
  });

  const modal = document.createElement('div');
  modal.id = 'editProductModal';
  modal.className = 'modal';
  modal.onclick = function (event) {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  };

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const closeButton = document.createElement('span');
  closeButton.className = 'close';
  closeButton.textContent = '×';
  closeButton.onclick = function () {
      modal.style.display = 'none';
  };

  modalContent.appendChild(closeButton);
  modalContent.appendChild(form);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  modal.style.display = 'block';

  return form;
}



