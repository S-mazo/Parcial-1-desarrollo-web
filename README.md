# 🎬 Sistema Backend de Usuarios y Películas (Node.js)

Este repositorio contiene un sistema **backend web** desarrollado con  **Node.js** , cuyo objetivo es gestionar usuarios y películas con roles diferenciados (**Administrador** y  **Usuario básico** ). El sistema implementa autenticación con seguridad de contraseñas mediante **hashing** y restricciones de acceso según el rol.

---

## 🚀 Características principales

1. **Gestión de usuarios (1.5 pts)**
   * Crear usuarios con `username`, `password` y `rol`.
   * El `password` se guarda en la base de datos usando **hashing** con bcrypt.
   * Autenticación de usuarios mediante login.
   * Roles disponibles:
     * **admin**
     * **user**
2. **Gestión de películas (1.0 pt)**
   * Solo los usuarios con rol **admin** pueden **crear películas** con:
     * `Título`
     * `Director`
     * `Año lanzamiento`
     * `Productora`
     * `Precio`
   * Si un **user** intenta crear una película, la API devuelve un  **error de autorización `(403 Forbidden)`** .
3. **Consulta de películas (1.0 pt)**
   * Tanto **admin** como **user** (si están logueados) pueden  **consultar todas las películas** .
4. **Consulta avanzada (1.5 pts)**
   * Tanto **admin** como **user** (si están logueados) pueden consultar películas según filtros:
     * `Año de lanzamiento > año ingresado`
     * `Precio <= valor ingresado`

---

## 📂 Estructura del proyecto

```
Parcial 1 desarrollo web
├── controllers  
├── models        
├── helpers        
├── routes  
├── application.js        
├── index.js             
├── package.json
└── README.md
```

---

## ⚙️ Tecnologías utilizadas

* **Node.js** con **Express** (servidor web)
* **JWT** (manejo de autenticación por tokens)
* **bcrypt** (hashing de contraseñas)
* **MongoDB ** (base de datos)
---

## 🔑 Endpoints principales

### 👤 Usuarios

* `POST /api/users/register` → Crear usuario
* `POST /api/users/login` → Autenticar usuario y obtener token

### 🎬 Películas

* `POST /api/movies/create` → Crear película ( **solo admin** )
* `GET /api/movies/see` → Consultar todas las películas ( **logueados** )
* `GET /api/movies/search/:price/:release_year` → Consultar con filtros ( **logueados** )

---

## 🛡️ Autenticación y roles

* Todas las rutas de películas requieren  **token JWT válido** .
---

## ▶️ Instrucciones de instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/S-mazo/Parcial-1-desarrollo-web.git
   cd Parcial-1-desarrollo-web
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar el servidor:
   ```bash
   node index.js
   ```
---

## ✅ Requisitos del sistema

* Node.js >= 18
* Base de datos (MongoDB)
* npm >= 9

---
## Creadores
 - [![Perfil S-mazo](https://img.shields.io/badge/Github-S--mazo-blue)](https://github.com/S-mazo) Samuel Mazo Echeverri
 - [![Perfil ssilva](https://img.shields.io/badge/Github-ssilva7--95-purple)](https://github.com/ssilva7-95) Santiago Silva Carvajal

---

Enlace del Proyecto: [https://github.com/S-mazo/Parcial-1-desarrollo-web](https://github.com/S-mazo/Parcial-1-desarrollo-web)

---

## 📌 Notas

* Las contraseñas  **nunca se almacenan en texto plano** , siempre en  **hash** .
* Las respuestas de error son claras y específicas, por ejemplo:
  * `401 Unauthorized` → Usuario no logueado.
  * `403 Forbidden` → Usuario sin permisos para realizar la acción.

 