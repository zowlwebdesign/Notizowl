/* contacto.js - Formulario de contacto: validaciones básicas y mensaje de confirmación */
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;   // formato básico nombre@dominio.ext

/** Muestra u oculta el error de un campo. */
function marcar(campo, mensaje) {
  const aviso = document.getElementById('err-' + campo.id);
  campo.classList.toggle('campo-error', Boolean(mensaje));
  aviso.textContent = mensaje || '';
}

function validarContacto(f) {
  let ok = true;
  const reglas = [
    [f.nombre, (v) => (v ? '' : 'El nombre es obligatorio.')],
    [f.correo, (v) => (!v ? 'El correo es obligatorio.' : REGEX_CORREO.test(v) ? '' : 'Ingresa un correo válido (ej. nombre@correo.com).')],
    [f.mensaje, (v) => (v ? '' : 'El mensaje es obligatorio.')],
  ];
  reglas.forEach(([campo, regla]) => { const m = regla(campo.value.trim()); marcar(campo, m); if (m) ok = false; });
  return ok;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-contacto');
  const exito = document.getElementById('exito');
  form.addEventListener('submit', (e) => {
    e.preventDefault();                       // no se envía a ningún servidor (solo front-end)
    exito.hidden = true;
    if (validarContacto(form.elements)) {
      exito.hidden = false;                   // estado de éxito
      form.reset();
    }
  });
  // Limpia el error apenas el usuario corrige el campo
  form.addEventListener('input', (e) => { if (e.target.classList.contains('campo-error')) marcar(e.target, ''); });
});
