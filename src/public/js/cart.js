//Para estos eventos hubiera estado bueno emplear websocket para evitar tener que actualizar la interfaz del usuario de esta manera

document.addEventListener('DOMContentLoaded', () => {
    const vaciarCarritoButton = document.getElementById('vaciarCarrito');
    const cartList = document.getElementById('cartList');

    if (vaciarCarritoButton) {
        vaciarCarritoButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/api/carts/${cartId}', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    console.log('Carrito vaciado exitosamente');
                    cartList.style.display = 'none';
                    Toastify({
                        text: "Se eliminaron todos los productos del carrito",
                        duration: 3000,
                        destination: "/cart",
                        newWindow: false,
                        close: true,
                        gravity: "bottom", // `top` or `bottom`
                        position: "center", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                          background: "linear-gradient(to right,  black 50%, rgb(209, 11, 11))",
                        },
                        onClick: function(){} // Callback after click
                      }).showToast();
                } else {
                    console.error('Error al vaciar el carrito');
                }
            } catch (error) {
                console.error('Error al vaciar el carrito:', error);
            }
        });
    }
});



async function eliminarProducto(pid) {
    try {
        const response = await fetch(`/api/carts/delete/${pid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log(response);
            location.reload()
            Toastify({
                text: "Se eliminó el producto del carrito",
                duration: 3000,
                destination: "/cart",
                newWindow: false,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right,  black 50%, rgb(209, 11, 11))",
                },
                onClick: function(){} // Callback after click
              }).showToast();
            console.log('Producto eliminado del carrito con éxito');
        } else {
            console.error('Error al eliminar producto del carrito');
        }
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
    }
}