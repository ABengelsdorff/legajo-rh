# LegajoRH · Sistema de Gestión de Legajos para Recursos Humanos

**LegajoRH** es una aplicación de escritorio desarrollada con Electron, Next.js, Express y SQLite que permite a una consultora de Recursos Humanos gestionar legajos completos del personal de manera local, segura y eficiente.

Este sistema fue creado para RHNet, una consultora ficticia dedicada a la administración de personal, formación, salud laboral y desempeño.

---

## 🚀 Características principales

🔐 Autenticación segura con JWT
👩‍💼 Gestión completa del legajo de empleados
📁 Edición de información personal, profesional y médica
👨‍👩‍👧‍👦 Gestión de grupo familiar
📝 Exportación de legajos a PDF individuales
📊 Visualización de estadísticas internas
📈 Exportación masiva de datos a Excel
💻 Aplicación de escritorio 100% offline (Electron + SQLite)
🖥️ Interfaz moderna, intuitiva y responsive
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
- 
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

---

## 📥 Instalador
Descargar instalador (.exe) desde Google Drive

---

Google Drive puede mostrar una advertencia al descargar archivos .exe. Es seguro proceder con la descarga.

## 👩‍💻 Autor/a

Desarrollado por [Angélica Bengelsdorff](https://www.linkedin.com/in/angelica-bengelsdorff)

---

## 📄 Licencia

Este proyecto se encuentra bajo la licencia MIT.
