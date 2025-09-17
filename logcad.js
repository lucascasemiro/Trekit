document.addEventListener("DOMContentLoaded", () => {
  // Mostrar/esconder senha
  function toggleSenha(inputId, toggleId) {
    const senhaInput = document.getElementById(inputId);
    const toggleBtn = document.getElementById(toggleId);

    if (senhaInput && toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const tipo = senhaInput.type === "password" ? "text" : "password";
        senhaInput.type = tipo;
      });
    }
  }

  toggleSenha("senhaCadastro", "toggleSenhaCadastro");
  toggleSenha("senhaLogin", "toggleSenhaLogin");

  // ---------------- MODAL TERMOS ----------------
  const abrirModal = document.getElementById("abrirModal");
  const fecharModal = document.getElementById("fecharModal");
  const modal = document.getElementById("modal");

  if (abrirModal && fecharModal && modal) {
    abrirModal.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    fecharModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // ---------------- LOGIN ----------------
  const form = document.getElementById("loginForm");
  const erroMsg = document.getElementById("erro");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const senha = document.getElementById("senhaLogin").value;
      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (!savedUser) {
        erroMsg.textContent = "Nenhum usuário encontrado. Cadastre-se primeiro!";
        erroMsg.style.display = "block";
        return;
      }

      if (savedUser.email === email && savedUser.senha === senha) {
        erroMsg.style.display = "none";
        window.location.href = "home.html"; 
      } else {
        erroMsg.textContent = "E-mail ou senha incorretos!";
        erroMsg.style.display = "block";
      }
    });
  }
});
