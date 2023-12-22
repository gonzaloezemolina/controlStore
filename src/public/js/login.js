let navBar = document.getElementById("navBar");
console.log(navBar);
navBar.className = navBar.className + " ocultarElemento";


const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
  console.log(event);
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => obj[key] = value);
  console.log("Cadena de datos antes de la solicitud:", JSON.stringify(obj));
  try {
    const response = await fetch("/api/sessions/login", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
     console.log("Respuesta completa del servidor:", response);
    const result = await response.json();
    console.log("Respuesta del servidor:", result);
    if (response.status === 200) {
      console.log(result);
      console.log("Redirigiendo al perfil del usuario");
      return window.location.replace("/profile");
    }
  } catch (error) {
   console.log("Error en solicitud", error); 
  }

});