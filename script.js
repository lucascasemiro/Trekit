const btnSubir = document.getElementById("btn-subir");
const btnDescer = document.getElementById("btn-descer");
const rodape = document.getElementById("rodape");

// Ao clicar em subir
btnSubir.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Ao clicar em descer
btnDescer.addEventListener("click", () => {
    rodape.scrollIntoView({ behavior: "smooth" });
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');

    hamburgerBtn.addEventListener('click', function() {
        // Alterna a classe 'active' no container dos links
        navLinks.classList.toggle('active');
    });
});