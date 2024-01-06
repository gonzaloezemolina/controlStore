document.addEventListener('DOMContentLoaded', () => {
    const comprarButton = document.querySelector('.button-cartBuy');
    comprarButton.addEventListener('click', async () => {
      try {
        const response = await fetch('/api/carts/purchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Puedes enviar datos adicionales si es necesario
          }),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log(result); // Maneja la respuesta según tus necesidades
        } else {
          console.error('Error al realizar la compra');
        }
      } catch (error) {
        console.error('Error al realizar la compra:', error);
      }
    });
  });