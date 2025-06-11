document.addEventListener('DOMContentLoaded', () => {
  cargarCategorias();
  cargarProductos();

  document.getElementById('formProducto').addEventListener('submit', function(e){
    e.preventDefault();

    const producto = {
      nombre: document.getElementById('nombreProducto').value,
      precio: document.getElementById('precioProducto').value,
      categoria: { id: document.getElementById('categoriaProducto').value }
    };

    const id = this.getAttribute('data-id');
    const url = id ? `http://localhost:8080/api/productos/${id}` : 'http://localhost:8080/api/productos';
    const method = id ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    }).then(() => {
      this.reset();
      this.removeAttribute('data-id');
      cargarProductos();
    });
  });
});

function cargarCategorias() {
  fetch('http://localhost:8080/api/categorias')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('categoriaProducto');
      select.innerHTML = '';
      data.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.nombre;
        select.appendChild(opt);
      });
    });
}

function cargarProductos() {
  fetch('http://localhost:8080/api/productos')
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('tablaProductos');
      tbody.innerHTML = '';
      data.forEach((p, index) => {
        const row = `<tr>
          <td>${index + 1}</td>
          <td>${p.nombre}</td>
          <td>$${p.precio}</td>
          <td>${p.categoria ? p.categoria.nombre : ''}</td>
          <td>
            <button class="btn btn-outline-primary btn-sm" onclick="agregarAlCarrito('${p.nombre}', ${p.precio})">Agregar 🛒</button>
          </td>
          <td>
            <button class='btn btn-sm btn-warning me-2' onclick='editarProducto(${p.id}, "${p.nombre}", ${p.precio}, ${p.categoria.id})'>Editar</button>
            <button class='btn btn-sm btn-danger' onclick='eliminarProducto(${p.id})'>Eliminar</button>
          </td>
        </tr>`;
        tbody.innerHTML += row;
      });
    });
}

function editarProducto(id, nombre, precio, categoriaId) {
  const form = document.getElementById('formProducto');
  form.setAttribute('data-id', id);
  document.getElementById('nombreProducto').value = nombre;
  document.getElementById('precioProducto').value = precio;
  document.getElementById('categoriaProducto').value = categoriaId;
}

function eliminarProducto(id) {
  if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

  fetch(`http://localhost:8080/api/productos/${id}`, {
    method: 'DELETE'
  }).then(() => cargarProductos());
}

function agregarAlCarrito(nombre, precio) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const productoExistente = carrito.find(p => p.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarMensajeCarrito(`"${nombre}" agregado al carrito`);
}

function mostrarMensajeCarrito(mensaje) {
  const contenedor = document.getElementById("mensajeCarrito");
  contenedor.textContent = mensaje;
  contenedor.classList.remove("d-none");

  setTimeout(() => {
    contenedor.classList.add("d-none");
  }, 2500);
}


