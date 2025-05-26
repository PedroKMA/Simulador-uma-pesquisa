async function buscarRepos() {
  const username = document.getElementById('username').value;
  const perfilDiv = document.getElementById('perfil');
  const reposDiv = document.getElementById('repositorios');

  perfilDiv.innerHTML = '';
  reposDiv.innerHTML = '';

  try {
    const userResp = await fetch(`https://api.github.com/users/${username}`);
    if (!userResp.ok) throw new Error('Usuário não encontrado');

    const userData = await userResp.json();

    perfilDiv.innerHTML = `
      <img src="${userData.avatar_url}" alt="Avatar">
      <div class="perfil-info">
        <h2>${userData.name || userData.login}</h2>
        <p>${userData.bio || 'Desenvolvedor de Software'}</p>
        <p class="stats">👥 ${userData.followers} seguidores • ${userData.following} seguindo • 📁 ${userData.public_repos} repositórios</p>
        <a href="https://www.linkedin.com/in/${userData.login}" target="_blank">🔗 linkedin.com/in/${userData.login}</a>
      </div>
    `;

    const reposResp = await fetch(userData.repos_url);
    const reposData = await reposResp.json();

    reposData.forEach(repo => {
      const card = `
        <div class="repo-card">
          <strong>${repo.name}</strong>
          <p>${repo.description || 'Sem descrição'}</p>
          <span>⭐ Estrelas: ${repo.stargazers_count}</span>
          <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
        </div>
      `;
      reposDiv.innerHTML += card;
    });

  } catch (error) {
    perfilDiv.innerHTML = `<p style="color:red;">Erro: ${error.message}</p>`;
  }
}
