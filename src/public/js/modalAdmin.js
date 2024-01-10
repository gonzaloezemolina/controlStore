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
