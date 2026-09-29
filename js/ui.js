/* ==========================================================
   ui.js - Componentes reutilizables: header, footer y tarjetas
   ========================================================== */

const PAGINAS = [
  { clave: 'inicio', texto: 'Inicio', url: 'index.html' },
  { clave: 'noticias', texto: 'Noticias', url: 'noticias.html' },
  { clave: 'favoritos', texto: 'Favoritos', url: 'favoritos.html' },
  { clave: 'contacto', texto: 'Contacto', url: 'contacto.html' },
  { clave: 'administrar', texto: 'Administrar', url: 'administrar.html' },
];

/** Evita inyección de HTML en textos escritos por el usuario (formulario del CRUD).
 *  Escapa también las comillas, porque estos textos se usan dentro de atributos (src, alt). */
function escapar(texto) {
  return String(texto ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** "Educación" -> "educacion" (para la clase CSS de color de la etiqueta). */
function slugCategoria(categoria) {
  return categoria.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function formatearFecha(iso) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Dibuja header y footer; la página activa se toma de <body data-pagina="..."> */
function pintarLayout() {
  const activa = document.body.dataset.pagina;
  const enlaces = PAGINAS.map((p) =>
    `<li class="nav-item"><a class="nav-link ${p.clave === activa ? 'active' : ''}" href="${p.url}"
       ${p.clave === activa ? 'aria-current="page"' : ''}>${p.texto}${p.clave === 'favoritos'
       ? ` <span class="badge badge-fav rounded-pill" id="contador-fav">${obtenerFavoritos().length}</span>` : ''}</a></li>`).join('');

  document.getElementById('header').innerHTML = `
    <header class="site-header"><nav class="navbar navbar-expand-md navbar-light"><div class="container">
      <a class="navbar-brand" href="index.html"><img src="img/logo.png" alt="Logo de Noti Zowl: búho y zorro"><span>Noti Zowl<small>Plataforma web de noticias</small></span></a>
      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu" aria-label="Abrir menú"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse justify-content-end" id="menu"><ul class="navbar-nav gap-md-3">${enlaces}</ul></div>
    </div></nav></header>`;

  // Footer: datos del autor y enlaces rápidos
  document.getElementById('footer').innerHTML = `
    <footer class="site-footer"><div class="container d-flex flex-wrap justify-content-between gap-3">
      <div class="autor"><strong>Noti Zowl © 2026</strong><br>
        Carlos Andrés Ovalle Marín<br>
        <a href="mailto:politecnicograncolombiano@gmail.com">politecnicograncolombiano@gmail.com</a><br>
        Front End - Presentado a: John Olarte Ramos</div>
      <div><a href="index.html">Inicio</a><a href="noticias.html">Noticias</a><a href="favoritos.html">Favoritos</a><a href="contacto.html">Contacto</a><br>
      <a href="#">Política de privacidad</a><a href="#">Términos de uso</a><br>Politécnico Grancolombiano | Bogotá, Colombia</div>
    </div></footer>`;
}

/** Actualiza el contador de favoritos del menú. */
function actualizarContador() {
  const c = document.getElementById('contador-fav');
  if (c) c.textContent = obtenerFavoritos().length;
}

/** Tarjeta de noticia (RF-01): imagen, categoría, nombre, descripción breve y botón "Ver más". */
function tarjetaHTML(n) {
  return `<div class="col-12 col-md-6 col-lg-4"><article class="tarjeta">
      <img src="${escapar(n.imagen)}" alt="Imagen de la noticia: ${escapar(n.titulo)}" onerror="this.onerror=null;this.src='img/${slugCategoria(n.categoria)}.svg'">
      <div class="cuerpo">
        <span class="etiqueta cat-${slugCategoria(n.categoria)}">${escapar(n.categoria)}</span>
        <h3>${escapar(n.titulo)}</h3>
        <p>${escapar(n.descripcion)}</p>
        <a class="btn btn-sm btn-primario align-self-start" href="detalle.html?id=${n.id}">Ver más</a>
      </div></article></div>`;
}

document.addEventListener('DOMContentLoaded', pintarLayout);
