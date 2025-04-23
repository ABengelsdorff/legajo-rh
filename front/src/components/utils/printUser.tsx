import { IUser } from "@/components/interfaces/interfaces";

export function printUser(user: IUser) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const formatDate = (date: string | Date | undefined) =>
    date ? new Date(date).toLocaleDateString("es-AR") : "-";

  const now = new Date().toLocaleString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const userInfo = `

    <!DOCTYPE html>
    <html>
    <head>
      <title>Información de ${user.nombre} ${user.apellido}</title>
      <style>

    @page {
      margin: 1cm;
      size: auto;
    }

    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
    @page {
      margin-top: 0.5cm;
      margin-right: 0;
      margin-bottom: 0;
      margin-left: 0;
    }

    .break-wrap {
  word-break: break-word;
  white-space: pre-wrap;
}



    header, footer {
      display: none;
    }
  }
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { text-align: center; color: #1e40af; }
        h2 { color: #1e3a8a; }
        .info-section { margin-bottom: 30px; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; }
        .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .info-item { margin-bottom: 6px; }
        .label { font-weight: bold; }
        .header-img { display: block; margin: 0 auto; width: 120px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 4px; }
      </style>

    </head>

    <body>
    <p style="text-align:left; color:#6b7280; font-size: 14px; margin-top: 4px;">Impreso el ${now}</p>

      <img src="/septima.jpg" alt="Logo Fuerza Aérea Argentina" class="header-img" />
      <h1>Información de ${user.nombre} ${user.apellido}</h1>

      <div class="info-section">
        <h2>Información Personal</h2>
        <div class="info-grid">
          <div class="info-item"><span class="label">Sexo:</span> ${
            user.sexo
          }</div>
          <div class="info-item"><span class="label">DNI:</span> ${
            user.numeroDeDni
          }</div>
          <div class="info-item"><span class="label">Fecha de Nacimiento:</span> ${formatDate(
            user.fechaDeNacimiento
          )}</div>
          <div class="info-item"><span class="label">CUIL:</span> ${
            user.numeroDeCuil
          }</div>
          <div class="info-item"><span class="label">Correo Electrónico:</span> ${
            user.correoElectronico
          }</div>
          
          <div class="info-item"><span class="label">Dirección:</span> ${
            user.direccion
          }</div>
          <div class="info-item"><span class="label">Código Postal:</span> ${
            user.codigoPostal
          }</div>
          <div class="info-item"><span class="label">Estado Civil:</span> ${
            user.estadoCivil
          }</div>
          <div class="info-item"><span class="label">Grupo Sanguíneo:</span> ${
            user.grupoSanguineo
          }</div>
          
        </div>
      </div>

      <div class="info-section">
        <h2>Información Profesional</h2>
        <div class="info-grid">
          
          
          <div class="info-item"><span class="label">Cargo:</span> ${
            user.cargo
          }</div>
          <div class="info-item"><span class="label">Especialidad:</span> ${
            user.especialidad
          }</div>
         
          <div class="info-item"><span class="label">Formación Académica:</span> ${
            user.formacionAcademica
          }</div>
         
        </div>
      </div>

      <div class="info-section">
        <h2>Cursos Realizados</h2>
        <ul>
          ${
            user.cursosRealizados?.length > 0
              ? user.cursosRealizados
                  .map((curso) => `<li>${curso.nombre}</li>`)
                  .join("<br>")
              : "<li>-</li>"
          }
        </ul>
      </div>

      <div class="info-section">
        <h2>Grupo Familiar</h2>
        <ul>
          ${
            user.grupoFamiliar
              ?.map(
                (f) => `
            <li>${f.parentesco}: ${f.nombre} ${f.apellido} </li>
            <li>DNI: ${f.dni}</li>
        
            <li class="break-wrap">Observaciones: ${f.observaciones}</li>
          `
              )
              .join("<br>") || "<li>-</li>"
          }
        </ul>
      </div>






      

      <div class="info-section">
        <h2>Junta Médica</h2>
        <ul>
          ${
            user.evaluacionesMedicas
              ?.map(
                (j) => `
            
            <li class="break-wrap">Observación: ${j.observacion}</li>
            
          `
              )
              .join("<br>") || "<li>-</li>"
          }
        </ul>
      </div>

      

 <script>
  window.onload = function () {
    window.print();

    // Cierra después de que se termina de imprimir (cuando funciona)
    window.onafterprint = function () {
      window.close();
    };

    // Cierre forzado por si onafterprint no se dispara (fallback)
    setTimeout(function () {
      window.close();
    }, 500);
  };
</script>



    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(userInfo);
  printWindow.document.close();
}
