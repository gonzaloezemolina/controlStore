let navBar = document.getElementById("navBar");
console.log(navBar.className);
navBar.className = navBar.className + " ocultarElemento";
const form = document.getElementById('registerForm');

form.addEventListener("submit",async (e)=>{
    console.log(e);
    e.preventDefault();
    const data = new  FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    try {
        const response = await fetch('api/sessions/register', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        
        console.log(result);
        return window.location.replace("/login");
    } catch (error) {
        console.error('Error:', error);
    }
});

