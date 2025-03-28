import { IUser } from "@/components/interfaces/interfaces";

export function printUser(user: IUser) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const formatDate = (date: string | Date | undefined) =>
    date ? new Date(date).toLocaleDateString("es-AR") : "-";

  const now = new Date().toLocaleString("es-AR");

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
          <div class="info-item"><span class="label">Correo Institucional:</span> ${
            user.correoInstitucional
          }</div>
          <div class="info-item"><span class="label">Celular:</span> ${
            user.numeroDeCelular
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
          <div class="info-item"><span class="label">CBU:</span> ${
            user.cbu
          }</div>
        </div>
      </div>

      <div class="info-section">
        <h2>Información Profesional</h2>
        <div class="info-grid">
          <div class="info-item"><span class="label">Grado:</span> ${
            user.grado
          }</div>
          <div class="info-item"><span class="label">Escalafón:</span> ${
            user.escalafon
          }</div>
          <div class="info-item"><span class="label">Cargo:</span> ${
            user.cargo
          }</div>
          <div class="info-item"><span class="label">Especialidad:</span> ${
            user.especialidad
          }</div>
          <div class="info-item"><span class="label">Especialidad Avanzada:</span> ${
            user.especialidadAvanzada
          }</div>
          <div class="info-item"><span class="label">Destino JB:</span> ${
            user.destinoJbGrupos
          }</div>
          <div class="info-item"><span class="label">Destino Interno:</span> ${
            user.destinoInterno
          }</div>
          <div class="info-item"><span class="label">Destino Anterior:</span> ${
            user.destinoAnterior
          }</div>
          <div class="info-item"><span class="label">RTI:</span> ${
            user.rti
          }</div>
          <div class="info-item"><span class="label">Formación Académica:</span> ${
            user.formacionAcademica
          }</div>
          <div class="info-item"><span class="label">Instituto de Formación:</span> ${
            user.institutoDeFormacion
          }</div>
          <div class="info-item"><span class="label">Número de IOSFA:</span> ${
            user.numeroDeIosfa
          }</div>
          <div class="info-item"><span class="label">Usuario GDE:</span> ${
            user.usuarioGde
          }</div>
          <div class="info-item"><span class="label">Compromiso de Servicio:</span> ${
            user.compromisoDeServicio
          }</div>
          <div class="info-item"><span class="label">Último Ascenso:</span> ${formatDate(
            user.ultimoAscenso
          )}</div>
          <div class="info-item"><span class="label">Foto de Legajo:</span> ${
            user.fotoDeLegajo
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
            <li>Personal Militar: ${f.personalMilitar}</li>
            <li>Observaciones: ${f.observaciones}</li>
          `
              )
              .join("<br>") || "<li>-</li>"
          }
        </ul>
      </div>


 <div class="info-section">
  <h2>Situación de Revista</h2>
  <ul>
  
          <li>Situacion de Revista: ${user.situacionDeRevista || "-"}</li>
  </ul>
</div>


<div class="info-section">
  <h2>Compromiso de Servicio</h2>
  <ul>
    <li>Compromiso: ${user.compromisoDeServicio}</li>
    <li>Último Ascenso: ${formatDate(user.ultimoAscenso)}</li>
    <li>Foto de Legajo: ${user.fotoDeLegajo}</li>
  </ul>
</div>
      <div class="info-section">
        <h2>Actuaciones</h2>
        <ul>
          ${
            user.actuaciones
              ?.map(
                (a) => `
            <li>Expediente: ${a.numeroDeExpediente}</li>
            <li>Afección: ${a.afeccion}</li>
            <li>Afección: Disponibilidad: ${formatDate(
              a.disponibilidad?.desde
            )} al ${formatDate(a.disponibilidad?.hasta)}</li>
            <li>Afección: Pasiva: ${formatDate(
              a.pasiva?.desde
            )} al ${formatDate(a.pasiva?.hasta)}</li>
          `
              )
              .join("<br>") || "<li>-</li>"
          }
        </ul>
      </div>

      <div class="info-section">
        <h2>Solicitudes</h2>
        <ul>
          ${
            user.solicitudes
              ?.map(
                (s) => `
            <li>Expediente: ${s.numeroDeExpediente}</li>
            <li>Desde: ${formatDate(s.solicitud?.desde)}</li>
            <li>Observaciones: ${s.observaciones}</li>
          `
              )
              .join("<br>") || "<li>-</li>"
          }
        </ul>
      </div>

      <div class="info-section">
        <h2>Parte de Enfermo</h2>
        <ul>
          ${
            user.parteDeEnfermo
              ?.map(
                (p) => `
            <li>Inicio: ${formatDate(p.inicio)}</li>
            <li>Observaciones: ${p.observaciones}</li>
          `
              )
              .join("<br>") || "<li>-</li>"
          }
        </ul>
      </div>

      <div class="info-section">
        <h2>Aptitud Psicofísica</h2>
        <ul>
          ${
            user.aptitudPsicofisica
              ?.map(
                (a) => `
            <li>Estado: ${a.estado}</li>
            <li>Observación: ${a.observacion}</li>
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
            user.juntaMedica
              ?.map(
                (j) => `
            <li>Mensaje: ${j.mensaje}</li>
            <li>Turnos: ${formatDate(j.turnos)}</li>
            <li>Observación: ${j.observacion}</li>
            <li>Afección: ${j.afeccion}</li>
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
