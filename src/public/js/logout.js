const logOutButton = document.getElementById("logout");

if (logOutButton) {
    logOutButton.addEventListener("click", salir);
  }

async function salir() {
    try {
      const response = await fetch("/api/sessions/logout", {
        method: "GET",
      });
  
      if (response.status === 200) {
        window.location = "/";
      }
    } catch (error) {
      console.error(error);
    }
  }
