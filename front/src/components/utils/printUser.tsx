import { IUser } from "@/components/interfaces/interfaces";

export function printUser(user: IUser) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const formatDate = (date: string | Date | undefined) =>
    date ? new Date(date).toLocaleDateString() : "-";

  const renderArray = (items: string[]) =>
    items.length > 0 ? items.map((c) => `<li>${c}</li>`).join("") : "<li>-</li>";

  const userInfo = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Información de ${user.nombre} ${user.apellido}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { text-align: center; color: #1e40af; }
        h2 { color: #1e3a8a; }
        .info-section { margin-bottom: 30px; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px;
 }
        .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .info-item { margin-bottom: 6px; }
        .label { font-weight: bold; }
        .header-img { display: block; margin: 0 auto; width: 120px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 4px; }
      </style>
    </head>
    <body>
      <img src="/septima.jpg" alt="Logo Fuerza Aérea Argentina" class="header-img" />
      <h1>Información de ${user.nombre} ${user.apellido}</h1>

      <div class="info-section">
        <h2>Información Personal</h2>
        <div class="info-grid">
          <div class="info-item"><span class="label">Sexo:</span> ${user.sexo}</div>
          <div class="info-item"><span class="label">DNI:</span> ${user.numeroDeDni}</div>
          <div class="info-item"><span class="label">Fecha de Nacimiento:</span> ${formatDate(user.fechaDeNacimiento)}</div>
          <div class="info-item"><span class="label">CUIL:</span> ${user.numeroDeCuil}</div>
          <div class="info-item"><span class="label">Correo Electrónico:</span> ${user.correoElectronico}</div>
          <div class="info-item"><span class="label">Correo Institucional:</span> ${user.correoInstitucional}</div>
          <div class="info-item"><span class="label">Celular:</span> ${user.numeroDeCelular}</div>
          <div class="info-item"><span class="label">Dirección:</span> ${user.direccion}</div>
          <div class="info-item"><span class="label">Código Postal:</span> ${user.codigoPostal}</div>
          <div class="info-item"><span class="label">Estado Civil:</span> ${user.estadoCivil}</div>
          <div class="info-item"><span class="label">Grupo Sanguíneo:</span> ${user.grupoSanguineo}</div>
          <div class="info-item"><span class="label">CBU:</span> ${user.cbu}</div>
        </div>
      </div>

      <div class="info-section">
        <h2>Información Profesional</h2>
        <div class="info-grid">
          <div class="info-item"><span class="label">Grado:</span> ${user.grado}</div>
          <div class="info-item"><span class="label">Escalafón:</span> ${user.escalafon}</div>
          <div class="info-item"><span class="label">Cargo:</span> ${user.cargo}</div>
          <div class="info-item"><span class="label">Especialidad:</span> ${user.especialidad}</div>
          <div class="info-item"><span class="label">Especialidad Avanzada:</span> ${user.especialidadAvanzada}</div>
          <div class="info-item"><span class="label">Destino JB:</span> ${user.destinoJbGrupos}</div>
          <div class="info-item"><span class="label">Destino Interno:</span> ${user.destinoInterno}</div>
          <div class="info-item"><span class="label">Destino Anterior:</span> ${user.destinoAnterior}</div>
          <div class="info-item"><span class="label">RTI:</span> ${user.rti}</div>
          <div class="info-item"><span class="label">Formación Académica:</span> ${user.formacionAcademica}</div>
          <div class="info-item"><span class="label">Instituto de Formación:</span> ${user.institutoDeFormacion}</div>
          <div class="info-item"><span class="label">Número de IOSFA:</span> ${user.numeroDeIosfa}</div>
          <div class="info-item"><span class="label">Usuario GDE:</span> ${user.usuarioGde}</div>
          <div class="info-item"><span class="label">Compromiso de Servicio:</span> ${user.compromisoDeServicio}</div>
          <div class="info-item"><span class="label">Último Ascenso:</span> ${formatDate(user.ultimoAscenso)}</div>
          <div class="info-item"><span class="label">Foto de Legajo:</span> ${user.fotoDeLegajo}</div>
        </div>
      </div>

      <div class="info-section">
        <h2>Cursos Realizados</h2>
        <ul>${renderArray(user.cursosRealizados)}</ul>
      </div>

      <div class="info-section">
        <h2>Grupo Familiar</h2>
        ${
          user.grupoFamiliar.length > 0
            ? user.grupoFamiliar
                .map(
                  (f) => `
              <div class="info-grid">
                <div><span class="label">Nombre:</span> ${f.nombre} ${f.apellido}</div>
                <div><span class="label">DNI:</span> ${f.dni}</div>
                <div><span class="label">Parentesco:</span> ${f.parentesco}</div>
                <div><span class="label">Personal Militar:</span> ${f.personalMilitar}</div>
                <div class="info-item"><span class="label">Observaciones:</span> ${f.observaciones}</div>
              </div>
              <hr />
            `
                )
                .join("")
            : "<p>-</p>"
        }
      </div>

      <div class="info-section">
        <h2>Actuaciones</h2>
        ${
          user.actuaciones.length > 0
            ? user.actuaciones
                .map(
                  (a) => `
            <div class="info-grid">
              <div><span class="label">Expediente:</span> ${a.numeroDeExpediente}</div>
              <div><span class="label">Afección:</span> ${a.afeccion}</div>
              <div><span class="label">Disponibilidad Desde:</span> ${formatDate(a.disponibilidad.desde)}</div>
              <div><span class="label">Disponibilidad Hasta:</span> ${formatDate(a.disponibilidad.hasta)}</div>
              <div><span class="label">Pasiva Desde:</span> ${formatDate(a.pasiva.desde)}</div>
              <div><span class="label">Pasiva Hasta:</span> ${formatDate(a.pasiva.hasta)}</div>
            </div><hr/>
          `
                )
                .join("")
            : "<p>-</p>"
        }
      </div>

      <div class="info-section">
        <h2>Solicitudes</h2>
        ${
          user.solicitudes.length > 0
            ? user.solicitudes
                .map(
                  (s) => `
              <div class="info-grid">
                <div><span class="label">Expediente:</span> ${s.numeroDeExpediente}</div>
                <div><span class="label">Desde:</span> ${formatDate(s.solicitud.desde)}</div>
                <div><span class="label">Observaciones:</span> ${s.observaciones}</div>
              </div><hr/>
            `
                )
                .join("")
            : "<p>-</p>"
        }
      </div>

      <div class="info-section">
        <h2>Parte de Enfermo</h2>
        ${
          user.parteDeEnfermo.length > 0
            ? user.parteDeEnfermo
                .map(
                  (p) => `
              <div class="info-grid">
                <div><span class="label">Inicio:</span> ${formatDate(p.inicio)}</div>
                <div><span class="label">Finalización:</span> ${formatDate(p.finalizacion)}</div>
                <div><span class="label">Observaciones:</span> ${p.observaciones}</div>
              </div><hr/>
            `
                )
                .join("")
            : "<p>-</p>"
        }
      </div>

      <div class="info-section">
        <h2>Aptitud Psicofísica</h2>
        ${
          user.aptitudPsicofisica.length > 0
            ? user.aptitudPsicofisica
                .map(
                  (a) => `
              <div class="info-grid">
                <div><span class="label">Estado:</span> ${a.estado}</div>
                <div><span class="label">Observación:</span> ${a.observacion}</div>
              </div><hr/>
            `
                )
                .join("")
            : "<p>-</p>"
        }
      </div>

      <div class="info-section">
        <h2>Junta Médica</h2>
        ${
          user.juntaMedica.length > 0
            ? user.juntaMedica
                .map(
                  (j) => `
              <div class="info-grid">
                <div><span class="label">Mensaje:</span> ${j.mensaje}</div>
                <div><span class="label">Turno:</span> ${formatDate(j.turnos)}</div>
                <div><span class="label">Afección:</span> ${j.afeccion}</div>
                <div><span class="label">Observación:</span> ${j.observacion}</div>
              </div><hr/>
            `
                )
                .join("")
            : "<p>-</p>"
        }
      </div>

     <script>
  window.onload = function () {
    window.print();
  };

  window.addEventListener("afterprint", function () {
    window.close();
  });
</script>





<script>
  window.onload = function () {
    window.print();

    // Cierra la ventana cuando finaliza la impresión (ya sea que impriman o cancelen)
    window.onafterprint = function () {
      window.close();
    };
  };
</script>





    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(userInfo);
  printWindow.document.close();
}
