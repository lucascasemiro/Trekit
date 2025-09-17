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
        navLinks.classList.toggle('active');
    });
});

// abrir e fechar botão filtrar
document.addEventListener('DOMContentLoaded', function() {

    const toggleButton = document.getElementById('btn-toggle-filtros');
    const filtrosContainer = document.getElementById('container-filtros');

    if (toggleButton && filtrosContainer) {

        toggleButton.addEventListener('click', function() {
            filtrosContainer.classList.add('filtros-visiveis');
        });
    }

    const limparButton = document.querySelector('.btn-limpar-filtros');
    if (limparButton && filtrosContainer) {
        limparButton.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                filtrosContainer.classList.remove('filtros-visiveis');
            }
        });
    }

});