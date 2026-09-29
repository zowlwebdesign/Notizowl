/* administrar.js - Mini CRUD: crear y eliminar noticias (persisten en localStorage) */
const IMAGEN_POR_CATEGORIA = { 'Educación': 'img/educacion.svg', 'Tecnología': 'img/tecnologia.svg', 'Turismo': 'img/turismo.svg', 'Comercial': 'img/comercial.svg' };

async function pintarTabla() {
  const lista = await obtenerNoticias();
  document.getElementById('filas').innerHTML = lista.map((n) => `
    <tr><td>${String(n.id).padStart(2, '0')}</td><td>${escapar(n.titulo)}</td><td>${escapar(n.categoria)}</td>
      <td><button class="btn btn-sm btn-eliminar" data-eliminar="${n.id}">Eliminar</button></td></tr>`).join('');
  document.getElementById('total').textContent = `Mostrando ${lista.length} de ${lista.length} noticias`;
}

document.addEventListener('DOMContentLoaded', () => {
  pintarTabla();
  const form = document.getElementById('form-noticia');

  // CREAR: valida campos obligatorios antes de guardar
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const campos = ['titulo', 'categoria', 'descripcion', 'contenido'].map((c) => form.elements[c]);
    let ok = true;
    campos.forEach((c) => { const vacio = !c.value.trim(); c.classList.toggle('campo-error', vacio); document.getElementById('err-' + c.id).textContent = vacio ? 'Este campo es obligatorio.' : ''; if (vacio) ok = false; });
    if (!ok) return;

    const f = form.elements;
    await crearNoticia({
      titulo: f.titulo.value.trim(), categoria: f.categoria.value,
      descripcion: f.descripcion.value.trim(), contenido: f.contenido.value.trim(),
      imagen: f.imagen.value.trim() || IMAGEN_POR_CATEGORIA[f.categoria.value],
    });
    form.reset();
    document.getElementById('exito').hidden = false;
    pintarTabla();
  });

  // ELIMINAR: pide confirmación previa (prevención de errores)
  document.getElementById('filas').addEventListener('click', async (e) => {
    const id = e.target.dataset.eliminar;
    if (id && confirm('¿Seguro que deseas eliminar esta noticia? Esta acción no se puede deshacer.')) {
      await eliminarNoticia(id);
      pintarTabla();
      actualizarContador();
    }
  });
});
