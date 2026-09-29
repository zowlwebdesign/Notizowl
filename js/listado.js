/* listado.js - Listado de noticias con búsqueda, filtro por categoría, orden y paginación */
const POR_PAGINA = 6;
const estado = { texto: '', categoria: 'Todas', orden: 'recientes', pagina: 1 };
let catalogo = [];

/** Aplica búsqueda + filtro + orden y devuelve el arreglo resultante. */
function filtrar() {
  const t = estado.texto.trim().toLowerCase();
  let lista = catalogo.filter((n) =>
    (estado.categoria === 'Todas' || n.categoria === estado.categoria) &&
    (n.titulo + ' ' + n.descripcion).toLowerCase().includes(t));
  lista.sort((a, b) => estado.orden === 'recientes' ? b.fecha.localeCompare(a.fecha)
                     : estado.orden === 'antiguas' ? a.fecha.localeCompare(b.fecha)
                     : a.titulo.localeCompare(b.titulo));
  return lista;
}

function pintar() {
  const lista = filtrar();
  const paginas = Math.max(1, Math.ceil(lista.length / POR_PAGINA));
  estado.pagina = Math.min(estado.pagina, paginas);
  const visibles = lista.slice((estado.pagina - 1) * POR_PAGINA, estado.pagina * POR_PAGINA);

  document.getElementById('tarjetas').innerHTML = visibles.length
    ? visibles.map(tarjetaHTML).join('')
    : '<p class="text-muted">No se encontraron noticias con esos criterios.</p>';
  document.getElementById('resultados').textContent = `${lista.length} noticia(s) encontrada(s)`;

  // Paginación sencilla: Anterior, números y Siguiente
  let html = `<li class="page-item ${estado.pagina === 1 ? 'disabled' : ''}"><button class="page-link" data-p="${estado.pagina - 1}">Anterior</button></li>`;
  for (let i = 1; i <= paginas; i++)
    html += `<li class="page-item ${i === estado.pagina ? 'active' : ''}"><button class="page-link" data-p="${i}">${i}</button></li>`;
  html += `<li class="page-item ${estado.pagina === paginas ? 'disabled' : ''}"><button class="page-link" data-p="${estado.pagina + 1}">Siguiente</button></li>`;
  document.getElementById('paginacion').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', async () => {
  catalogo = await obtenerNoticias();
  document.getElementById('buscar').addEventListener('input', (e) => { estado.texto = e.target.value; estado.pagina = 1; pintar(); });
  document.getElementById('orden').addEventListener('change', (e) => { estado.orden = e.target.value; pintar(); });
  document.getElementById('filtros').addEventListener('click', (e) => {
    if (!e.target.dataset.cat) return;
    estado.categoria = e.target.dataset.cat; estado.pagina = 1;
    document.querySelectorAll('.filtro').forEach((b) => b.classList.toggle('activo', b === e.target));
    pintar();
  });
  document.getElementById('paginacion').addEventListener('click', (e) => {
    if (e.target.dataset.p) { estado.pagina = Number(e.target.dataset.p); pintar(); }
  });
  pintar();
});
