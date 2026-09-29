# Noti Zowl - Plataforma web de noticias (Entrega previa 2)
Prototipo funcional en HTML, CSS y JavaScript (Bootstrap 5). Módulo Desarrollo de Front-end.

## Cómo ejecutarlo
Abrir la carpeta con un servidor local (necesario para que `fetch` lea `data/noticias.json`):
- VS Code: extensión *Live Server* > "Open with Live Server", o
- Terminal: `python -m http.server 8000` y abrir http://localhost:8000

## Estructura
index.html, noticias.html, detalle.html, favoritos.html, contacto.html, administrar.html
css/estilos.css | js/ (almacen, ui y un script por página) | data/noticias.json | img/

## Personalización
- **Video del hero:** reemplaza `video/hero.mp4` por tu video (recomendado: MP4/H.264, sin audio o silenciado, 10-20 s, menos de 5 MB).
- **Imágenes de noticias:** coloca `img/noticia-1.jpg` ... `img/noticia-6.jpg` (16:9, aprox. 800x450 px). Si falta alguna, se usa la ilustración de su categoría.
- **Logo:** `img/logo.png` (header) y `img/favicon.png`.
