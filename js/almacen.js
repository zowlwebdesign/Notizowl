/* ==========================================================
   almacen.js - Capa de datos de Noti Zowl
   - Carga el catálogo inicial desde el JSON local (data/noticias.json)
   - Persiste cambios del mini CRUD y los favoritos en localStorage
   ========================================================== */

const LLAVE_NOTICIAS = 'notizowl_noticias';   // catálogo (incluye altas y bajas del CRUD)
const LLAVE_FAVORITOS = 'notizowl_favoritos';  // arreglo de IDs guardados como favoritos

/** Devuelve el catálogo. La primera vez lo lee del JSON y lo copia a localStorage. */
async function obtenerNoticias() {
  const guardado = localStorage.getItem(LLAVE_NOTICIAS);
  if (guardado) return JSON.parse(guardado);
  try {
    const respuesta = await fetch('data/noticias.json');
    if (!respuesta.ok) throw new Error(respuesta.status);
    const datos = await respuesta.json();
    guardarNoticias(datos);
    return datos;
  } catch (error) {
    // Ocurre al abrir el archivo con file:// (el navegador bloquea fetch): usar servidor local
    console.error('No se pudo cargar el JSON:', error);
    return [];
  }
}

function guardarNoticias(lista) {
  localStorage.setItem(LLAVE_NOTICIAS, JSON.stringify(lista));
}

/** Busca una noticia por su ID (o undefined si no existe). */
async function obtenerNoticiaPorId(id) {
  const lista = await obtenerNoticias();
  return lista.find((n) => n.id === Number(id));
}

/* ---------- Mini CRUD: crear y eliminar ---------- */

async function crearNoticia(datos) {
  const lista = await obtenerNoticias();
  const nuevoId = lista.length ? Math.max(...lista.map((n) => n.id)) + 1 : 1;
  const nueva = { id: nuevoId, fecha: new Date().toISOString().slice(0, 10), autor: 'Redacción Noti Zowl', ...datos };
  lista.unshift(nueva);              // la más reciente aparece primero
  guardarNoticias(lista);
  return nueva;
}

async function eliminarNoticia(id) {
  const lista = (await obtenerNoticias()).filter((n) => n.id !== Number(id));
  guardarNoticias(lista);
  quitarFavorito(id);                // evita favoritos "huérfanos"
}

/* ---------- Favoritos ---------- */

function obtenerFavoritos() {
  return JSON.parse(localStorage.getItem(LLAVE_FAVORITOS) || '[]');
}
function esFavorito(id) {
  return obtenerFavoritos().includes(Number(id));
}
function agregarFavorito(id) {
  const favs = obtenerFavoritos();
  if (!favs.includes(Number(id))) favs.push(Number(id));
  localStorage.setItem(LLAVE_FAVORITOS, JSON.stringify(favs));
}
function quitarFavorito(id) {
  const favs = obtenerFavoritos().filter((f) => f !== Number(id));
  localStorage.setItem(LLAVE_FAVORITOS, JSON.stringify(favs));
}
function vaciarFavoritos() {
  localStorage.setItem(LLAVE_FAVORITOS, '[]');
}
