const productCreator = document.getElementById("addProductForm")

productCreator.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const formData = new FormData(productCreator);
    const productData = {};
    formData.forEach((value, key) => {
      productData[key] = value;
    });
  
    try {
    console.log(productData);
      const responseProduct = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
  
      const result = await responseProduct.json();
      console.log(result)
      if (responseProduct.ok) {
        console.log(result.message);
        productCreator.reset();
        window.location.href = "/products/?page=3&limit=9";
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  });