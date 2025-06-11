Proyecto Tienda Online / Tu Casa, Tu Estilo
 
Es una aplicación web desarrollada con **Spring Boot**, **MySQL**, **HTML**, **CSS** y **Java** **JavaScript**, que permite gestionar productos y categorías de una tienda de artículos para el hogar.
Incluye un sistema de autenticación, operaciones CRUD completas y un carrito de compras funcional.

## 🧰 Para ejecutar el proyecto necesitas tener instalado:

* Apache Maven
* Java JDK 17
* Experto
* MySQL (Workbench o XAMPP)
* Visual Studio Code (con la extensión "Java Extension Pack")
* Navegador web (Chrome o Firefox)

## ✨ Funcionalidades principales

* Inicio de sesión de usuarios (Spring Security)
* CRUD de productos y categorías (crear, listar, editar, eliminar)
* Carrito de compras con subtotal, total y botón de compra
* Integración completa con base de datos MySQL

## ⚙️ Tecnologías utilizadas

* Java + Spring Boot (Backend)
* HTML + CSS + JavaScript (Frontend)
* MySQL (Base de datos)
* Spring Security (Autenticación y protección de rutas)
* Hibernate (Persistencia de datos)

## 🚀 Cómo ejecutar

1️⃣ Crear la Base de Datos
Abra MySQL Workbench o phpMyAdmin
Ejecuta el archivo crear_base_datos_tienda.sql
Se crearán las tablas: usuario, categoria,producto
Usuario por defecto:
usuario: admin
contraseña: admin

2️⃣ Ejecutar el Backend
Abre VS Code y abre la carpetaBackend/
Verifica que el archivo application.propertiestenga los datos de conexión correctos:
spring.datasource.url=jdbc:mysql://localhost:3306/tienda
spring.datasource.username=root
spring.datasource.password=(la contraseña de tu base de datos)
Abre el archivo TiendaApplication.java
Haz clic derecho sobre main()y selecciona Run Java o usa el botón▶️
El backend estará disponible en: http://localhost:8080

3️⃣ Ejecutar el Frontend
Abre la carpetaFrontend/
Haz clic derecho sobre login.htmly selecciona Abrir con Live Server
Alternativamente, puedes abrir el archivo directamente en tu navegador.
Ingresa con:
usuario: admin  
contraseña:admin


Desarrollado por **\María Camila Loaiza García** – Proyecto final | Junio 2025
