document.addEventListener('DOMContentLoaded', () => {
  cargarCategorias();

  document.getElementById('formCategoria').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombreCategoria').value.trim();
    if (!nombre) {
      alert("Por favor, ingresa un nombre válido para la categoría.");
      return;
    }

    const categoria = { nombre };
    const id = this.getAttribute('data-id');

    const url = id 
      ? `http://localhost:8080/api/categorias/${id}` 
      : 'http://localhost:8080/api/categorias';
    const method = id ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoria)
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al guardar la categoría");
        return res.json();
      })
      .then(() => {
        this.reset();
        this.removeAttribute('data-id');
        cargarCategorias();
      })
      .catch(err => alert(err.message));
  });
});

function cargarCategorias() {
  fetch('http://localhost:8080/api/categorias')
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('tablaCategorias');
      tbody.innerHTML = '';
      data.forEach((c, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${c.nombre}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" onclick='editarCategoria(${c.id}, ${JSON.stringify(c.nombre)})'>Editar</button>
              <button class="btn btn-sm btn-danger" onclick='eliminarCategoria(${c.id})'>Eliminar</button>
            </td>
          </tr>`;
        tbody.innerHTML += row;
      });
    })
    .catch(err => {
      console.error("Error al cargar categorías:", err);
      alert("Hubo un error al cargar las categorías.");
    });
}

function editarCategoria(id, nombre) {
  document.getElementById('nombreCategoria').value = nombre;
  document.getElementById('formCategoria').setAttribute('data-id', id);
}

function eliminarCategoria(id) {
  if (!confirm("¿Seguro que quieres eliminar esta categoría?")) return;

  fetch(`http://localhost:8080/api/categorias/${id}`, { method: 'DELETE' })
    .then(res => {
      if (!res.ok) throw new Error("Error al eliminar la categoría");
      cargarCategorias();
    })
    .catch(err => {
      console.error("Error al eliminar categoría:", err);
      alert("No se pudo eliminar la categoría.");
    });
}
