/* home.js - Página de inicio: pinta las 3 noticias destacadas (las más recientes) desde el JSON */
document.addEventListener('DOMContentLoaded', async () => {
  const noticias = await obtenerNoticias();
  const contenedor = document.getElementById('destacadas');
  contenedor.innerHTML = noticias.length
    ? noticias.slice(0, 3).map(tarjetaHTML).join('')
    : '<p class="text-muted">No hay noticias disponibles. Si abriste el archivo con file://, usa un servidor local (ver README).</p>';
});
