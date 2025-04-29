# LegajoRH · Sistema de Gestión de Legajos para Recursos Humanos

**LegajoRH** es una aplicación de escritorio desarrollada con Electron, Next.js, Express y SQLite que permite a una consultora de Recursos Humanos gestionar legajos completos del personal de manera local, segura y eficiente.

---

## 🔧 Funcionalidades principales

- ✅ Panel de administración para registrar y gestionar usuarios con diferentes roles
- ✅ CRUD completo para cada sección del legajo (datos personales, grupo familiar, licencias, etc.)
- ✅ Formulario validado con React Hook Form para garantizar integridad y facilidad de uso
- ✅ Sistema de búsquedas y filtros avanzados (por apellido, cursos, cargo, y más)
- ✅ Exportación a Excel con toda la información cargada
- ✅ Descarga en PDF del legajo completo de cada persona
- ✅ Gráficos interactivos y visuales para análisis estadístico del personal
- ✅ Interfaz moderna y responsive, pensada para usabilidad real
- ✅ Autenticación segura con JWT
- ✅ Aplicación de escritorio 100% offline (Electron + SQLite)

---

## 🧱 Tecnologías utilizadas

- **Frontend**: Next.js, React, TailwindCSS  
- **Backend**: Node.js, Express, TypeORM, JWT  
- **Base de datos**: SQLite (local)  
- **App de escritorio**: Electron  
- **Estado global**: Zustand  
- **PDFs**: jsPDF  
- **Validaciones**: react-hook-form

---

## 🧩 Estructura del legajo

Cada legajo incluye:

- **Información personal**: DNI, CUIL, contacto, dirección, etc.  
- **Datos laborales**: cargo, departamento, antigüedad  
- **Grupo familiar**: carga dinámica de miembros  
- **Cursos realizados**: capacitaciones y formaciones internas o externas  
- **Evaluaciones médicas**: aptitud psicofísica  
- **Licencias y solicitudes**: parte médico, junta médica

---

## 📦 Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/ABengelsdorff/legajo-rh.git
cd legajo-rh

# Instalar dependencias del backend
cd back
npm install

# Instalar dependencias del frontend
cd ../front
npm install

# Construir el frontend exportado
npm run build  # ejecutado dentro de /front

# Volver a la raíz y entrar a la carpeta Electron
cd ../electron

# Construir la aplicación de escritorio y backend
npm install
npm run build
```

## 🎬 Demostración
Ver video de presentación en YouTube
https://youtu.be/hjgjQO_xigg

---

## 📥 Instalador
Descargar instalador (.exe) desde Google Drive
https://drive.google.com/uc?export=download&id=1kAVZRdtwEDRsC0lK0jodrpNHC5iGvGDa

---

Google Drive puede mostrar una advertencia al descargar archivos .exe. Es seguro proceder con la descarga.

## 👩‍💻 Autor/a

Desarrollado por [Angélica Bengelsdorff](https://www.linkedin.com/in/angelica-bengelsdorff)

---

## 📄 Licencia

Este proyecto se encuentra bajo la licencia MIT.


