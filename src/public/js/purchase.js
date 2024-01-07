document.addEventListener('DOMContentLoaded', () => {
    const btnComprar = document.getElementById('btnComprar');

    btnComprar.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/carts/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
                console.log(response);
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                alert("Gracias!!!")
            } else {
                console.error('Error al realizar la compra');
            }
        } catch (error) {
            console.error('Error al realizar la compra:', error);
        }
    });
});