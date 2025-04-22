# LegajoRH · Sistema de Gestión de Legajos para Recursos Humanos

**LegajoRH** es una aplicación de escritorio desarrollada con Electron, Next.js, Express y SQLite que permite a una consultora de Recursos Humanos gestionar legajos completos del personal de manera local, segura y eficiente.

Este sistema fue creado para RHNet, una consultora ficticia dedicada a la administración de personal, formación, salud laboral y desempeño.

---

## 🚀 Características principales

- 🔐 Autenticación con JWT  
- 👩‍💼 Gestión completa del legajo de empleados  
- 📁 Edición de información personal, profesional y médica  
- 📚 Registro de cursos, evaluaciones y actuaciones  
- 👨‍👩‍👧‍👦 Carga de grupo familiar  
- 📝 Exportación a PDF para impresión o archivo  
- 📊 Visualización de estadísticas internas  
- 🖥️ Aplicación de escritorio 100% offline (SQLite + Electron)  

---

## 🧱 Tecnologías utilizadas

- **Frontend**: Next.js, React, TailwindCSS  
- **Backend**: Node.js, Express, TypeORM, JWT  
- **Base de datos**: SQLite (local)  
- **App de escritorio**: Electron  
- **Estado global**: Zustand  
- **PDFs**: jsPDF  
- **Validaciones**: react-hook-form + Zod  

---

## 🧩 Estructura del legajo

Cada legajo incluye:

- **Información personal**: DNI, CUIL, contacto, dirección, etc.  
- **Datos laborales**: cargo, departamento, antigüedad  
- **Grupo familiar**: carga dinámica de miembros  
- **Cursos realizados**: capacitaciones y formaciones internas o externas  
- **Actuaciones**: desempeño, cambios de puesto, observaciones  
- **Evaluaciones médicas**: aptitud psicofísica  
- **Licencias y solicitudes**: parte médico, junta médica  
- **Compromiso laboral**: foto, acuerdo de permanencia, ascensos  

---

## 📦 Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/ABengelsdorff/legajo-rh.git
cd legajo-rh

# Instalar dependencias
cd back && npm install
cd ../front && npm install

# Iniciar en modo desarrollo
cd .. && npm run dev
```


## 👩‍💻 Autor/a

Desarrollado por [Angélica Bengelsdorff](https://www.linkedin.com/in/angelica-bengelsdorff)

---

## 📄 Licencia

Este proyecto se encuentra bajo la licencia MIT.