document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();
});

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
  const carrito = obtenerCarrito();
  const tabla = document.getElementById("tablaCarrito");
  const total = document.getElementById("totalCarrito");
  tabla.innerHTML = "";

  if (carrito.length === 0) {
    tabla.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-muted">Tu carrito está vacío.</td>
      </tr>`;
    total.textContent = "0";
    return;
  }

  let totalCompra = 0;

  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    totalCompra += subtotal;

    const fila = `
      <tr>
        <td>${producto.nombre}</td>
        <td>$${producto.precio.toFixed(0)}</td>
        <td>${producto.cantidad}</td>
        <td>$${subtotal.toFixed(0)}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">
            <span aria-hidden="true">&times;</span>
          </button>
        </td>
      </tr>
    `;
    tabla.innerHTML += fila;
  });

  total.textContent = totalCompra.toFixed(0);
}

function eliminarProducto(index) {
  const carrito = obtenerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
  mostrarCarrito();
  mostrarToast("Producto eliminado del carrito", "warning");
}

function finalizarCompra() {
  const carrito = obtenerCarrito();
  if (carrito.length === 0) {
    mostrarToast("Tu carrito está vacío.", "danger");
    return;
  }

  if (confirm("¿Deseas finalizar tu compra?")) {
    mostrarToast("¡Gracias por tu compra! 🛒", "success");
    localStorage.removeItem("carrito");
    mostrarCarrito();
  }
}

// Función para mostrar el toast
function mostrarToast(mensaje, tipo = "info") {
  // Crear el contenedor si no existe
  let contenedor = document.getElementById("toastContainer");
  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.id = "toastContainer";
    contenedor.style.position = "fixed";
    contenedor.style.top = "20px";
    contenedor.style.right = "20px";
    contenedor.style.zIndex = "1055";
    document.body.appendChild(contenedor);
  }

  // Crear el toast
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-bg-${tipo} border-0 show`;
  toast.role = "alert";
  toast.ariaLive = "assertive";
  toast.ariaAtomic = "true";
  toast.style.minWidth = "250px";
  toast.style.marginBottom = "10px";

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${mensaje}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button>
    </div>
  `;

  // Cerrar toast al hacer click en el botón
  toast.querySelector("button").addEventListener("click", () => {
    contenedor.removeChild(toast);
  });

  contenedor.appendChild(toast);

  // Desaparecer después de 3.5 segundos
  setTimeout(() => {
    if (contenedor.contains(toast)) {
      contenedor.removeChild(toast);
    }
  }, 3500);
}
