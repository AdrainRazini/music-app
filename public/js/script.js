let musicasCarrossel = [];
let indiceAtual = 0;

function atualizarCarrossel() {
  if (musicasCarrossel.length === 0) return;
  const musica = musicasCarrossel[indiceAtual];
  document.getElementById("carousel-cover").src = musica.album.cover_big;
  document.getElementById("carousel-title").textContent = musica.title;
  document.getElementById("carousel-artist").textContent = musica.artist.name;
  document.getElementById("carousel-audio").src = musica.preview;
  document.getElementById("carousel-audio").load();
  document.getElementById("carousel-audio").play();
}

function musicaAnterior() {
  if (indiceAtual > 0) {
    indiceAtual--;
    atualizarCarrossel();
  }
}

function proximaMusica() {
  if (indiceAtual < musicasCarrossel.length - 1) {
    indiceAtual++;
    atualizarCarrossel();
  }
}

document.getElementById("carousel-audio").addEventListener("ended", () => {
  if (indiceAtual < musicasCarrossel.length - 1) {
    indiceAtual++;
    atualizarCarrossel();
  }
});

function buscarMusicas() {
  const query = document.getElementById("search").value;
  const url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&output=jsonp`;

  fetchJsonp(url)
    .then(response => response.json())
    .then(data => {
      const musicasDiv = document.getElementById("musicas");
      musicasDiv.innerHTML = "";

      musicasCarrossel = data.data;
      indiceAtual = 0;
      atualizarCarrossel();

      data.data.forEach((musica, index) => {
        const card = document.createElement("div");
        card.className = "music-card";
        card.innerHTML = `
          <img src="${musica.album.cover_medium}" alt="${musica.title}" />
          <h4>${musica.title}</h4>
          <p>${musica.artist.name}</p>
        `;
        card.onclick = () => {
          indiceAtual = index;
          atualizarCarrossel();
        };
        musicasDiv.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Erro ao buscar músicas:", error);
    });
}

window.onload = () => {
  document.getElementById("search").value = "ODNOGO ULTRAFUNK";
  buscarMusicas();
}