/* detalle.js - Detalle de una noticia (?id=N), botón de favoritos y noticias relacionadas */
document.addEventListener('DOMContentLoaded', async () => {
  const id = new URLSearchParams(location.search).get('id');
  const n = await obtenerNoticiaPorId(id);
  const cont = document.getElementById('detalle');
  if (!n) { cont.innerHTML = '<div class="alert alert-warning">La noticia no existe o fue eliminada. <a href="noticias.html">Volver al listado</a></div>'; return; }

  document.title = `${n.titulo} | Noti Zowl`;
  cont.innerHTML = `
    <nav aria-label="breadcrumb" class="mb-3 text-muted small"><a href="index.html">Inicio</a> &gt; <a href="noticias.html">Noticias</a> &gt; ${escapar(n.titulo)}</nav>
    <img class="detalle-img mb-3" src="${escapar(n.imagen)}" alt="Imagen de la noticia: ${escapar(n.titulo)}" onerror="this.onerror=null;this.src='img/${slugCategoria(n.categoria)}.svg'">
    <span class="etiqueta cat-${slugCategoria(n.categoria)}">${escapar(n.categoria)}</span>
    <h1 class="h2 mt-2">${escapar(n.titulo)}</h1>
    <p class="text-muted small">Publicado el ${formatearFecha(n.fecha)} | Por ${escapar(n.autor)}</p>
    <p>${escapar(n.contenido)}</p>
    <div class="d-flex flex-wrap gap-2 mt-3">
      <button class="btn btn-primario" id="btn-fav"></button>
      <a class="btn btn-secundario" href="contacto.html">Contactar</a>
    </div><div id="aviso" class="mt-3" role="status"></div>`;

  // Botón de favoritos: alterna entre agregar y quitar, y refleja el estado actual
  const btn = document.getElementById('btn-fav');
  const refrescar = () => { btn.textContent = esFavorito(n.id) ? '★ Quitar de favoritos' : '☆ Agregar a favoritos'; actualizarContador(); };
  btn.addEventListener('click', () => {
    const estabaGuardada = esFavorito(n.id);
    estabaGuardada ? quitarFavorito(n.id) : agregarFavorito(n.id);
    document.getElementById('aviso').innerHTML =
      `<div class="msg-exito">${estabaGuardada ? 'Noticia quitada de tus favoritos.' : 'Noticia guardada en tus favoritos.'}</div>`;
    refrescar();
  });
  refrescar();

  // Relacionadas: primero de la misma categoría, luego las demás (máx. 3)
  const otras = (await obtenerNoticias()).filter((x) => x.id !== n.id)
    .sort((a, b) => (b.categoria === n.categoria) - (a.categoria === n.categoria)).slice(0, 3);
  document.getElementById('relacionadas').innerHTML = otras.map((x) =>
    `<a class="relacionada" href="detalle.html?id=${x.id}"><strong>${escapar(x.titulo)}</strong><br><small class="text-muted">${escapar(x.categoria)}</small></a>`).join('');
});
