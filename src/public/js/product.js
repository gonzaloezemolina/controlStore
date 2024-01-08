const obj = {};
console.log("Cadena de datos antes de la solicitud:", JSON.stringify(obj));

async function addToCart(id) {
  const cart = getCookie("cart");

  if (cart) {
    const response = await fetch(`/api/carts/${cart}/products/${id}`, {
      method: "PUT",
    });
    const result = await response.json();
  } else {
    const response = await fetch(`/api/carts/products/${id}`, {
      method: "PUT",
    });
    const result = await response.json();
    console.log(result);
  }
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
        }


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
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


