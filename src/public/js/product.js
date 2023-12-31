//Cart 
const obj = {};
console.log("Cadena de datos antes de la solicitud:", JSON.stringify(obj));

function addToCart(productId) {
    // Realiza una solicitud al servidor para agregar el producto al carrito
    fetch(`/api/cart/add/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
    .then(response => response.json())
    .then(result => {
      console.log('Producto agregado al carrito:', result);
      Toastify({
        text: "Se añadio producto al carrito",
        duration: 3000,
        destination: "/cart",
        newWindow: false,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right,  black 50%, rgb(209, 11, 11))",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    })
    .catch(error => console.error('Error al agregar al carrito:', error));
  }
  



document.addEventListener("DOMContentLoaded", function () {
    const adminElement = document.getElementById("adminElement");
    const adminModal = document.getElementById("adminModal");
    const closeModal = document.getElementById("closeModal");

    adminElement.addEventListener("click", function () {
        adminModal.style.display = "block";
    });

    closeModal.addEventListener("click", function () {
        adminModal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === adminModal) {
            adminModal.style.display = "none";
        }
    });
});


