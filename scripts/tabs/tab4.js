function verificarAcessoTab4() {
  const urlHash = window.location.hash;
  const errorDiv = document.getElementById('tab4-error');
  const contentDiv = document.getElementById('tab4-content');

  // Verifica se o hash na URL é exatamente '#tab4'
  if (urlHash === '#tab4') {
    if (errorDiv) errorDiv.style.display = 'none';
    if (contentDiv) contentDiv.style.display = 'block';
  } else {
    if (errorDiv) errorDiv.style.display = 'flex';
    if (contentDiv) contentDiv.style.display = 'none';
  }
}

// Executa a verificação assim que a página carrega
window.addEventListener('load', verificarAcessoTab4);

// Executa a verificação caso o usuário digite o hash na URL sem recarregar a página
window.addEventListener('hashchange', verificarAcessoTab4);