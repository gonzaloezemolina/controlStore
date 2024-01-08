document.addEventListener('DOMContentLoaded', () => {
    const btnComprar = document.getElementById('btnComprar');

    btnComprar.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/purchases/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}) 
            });
                console.log(response);
            if (response.ok) {
                Toastify({
                    text: "Gracias por comprar!",
                    duration: 5000,
                    destination: "/history",
                    newWindow: false,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "linear-gradient(to right,  rgb(31, 132, 226) 60%, blue)",
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();
                return window.location.replace("/history");
            } else {
                throw new Error('Error al realizar la compra: ' + response.status);
            }
        } catch (error) {
            console.error('Error al realizar la compra:', error);
        }
    });
});