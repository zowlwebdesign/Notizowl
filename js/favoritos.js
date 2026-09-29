/* favoritos.js - Lista personalizada guardada en localStorage */
async function pintarFavoritos() {
  const ids = obtenerFavoritos();
  const noticias = (await obtenerNoticias()).filter((n) => ids.includes(n.id));
  document.getElementById('contador').textContent = `${noticias.length} noticia(s) guardada(s)`;
  document.getElementById('vaciar').hidden = noticias.length === 0;
  document.getElementById('lista-fav').innerHTML = noticias.length ? noticias.map((n) => `
    <div class="fila-fav">
      <img src="${escapar(n.imagen)}" alt="" onerror="this.onerror=null;this.src='img/${slugCategoria(n.categoria)}.svg'">
      <div><span class="etiqueta cat-${slugCategoria(n.categoria)}">${escapar(n.categoria)}</span>
        <h3 class="h6 mt-1 mb-1">${escapar(n.titulo)}</h3><small class="text-muted">${escapar(n.descripcion)}</small></div>
      <div class="acciones"><a class="btn btn-sm btn-primario" href="detalle.html?id=${n.id}">Ver detalle</a>
        <button class="btn btn-sm btn-secundario" data-quitar="${n.id}">Quitar</button></div>
    </div>`).join('')
    // Estado vacío (definido en el mockup de la Entrega previa 1)
    : `<div class="text-center py-5"><p class="fs-5">Aún no has guardado noticias</p><a class="btn btn-primario" href="noticias.html">Explorar noticias</a></div>`;
  actualizarContador();
}

document.addEventListener('DOMContentLoaded', () => {
  pintarFavoritos();
  document.getElementById('lista-fav').addEventListener('click', (e) => {
    if (e.target.dataset.quitar) { quitarFavorito(e.target.dataset.quitar); pintarFavoritos(); }
  });
  document.getElementById('vaciar').addEventListener('click', () => {
    if (confirm('¿Deseas vaciar toda tu lista de favoritos?')) { vaciarFavoritos(); pintarFavoritos(); }
  });
});
