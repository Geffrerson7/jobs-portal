const jobTitle = document.querySelector("#job-title");

if (jobTitle) {
  const params = new URLSearchParams(window.location.search);
  const empleoId = params.get("id");

  const company = document.querySelector("#job-company");
  const location = document.querySelector("#job-location");
  const level = document.querySelector("#job-level");
  const modality = document.querySelector("#job-modality");
  const description = document.querySelector("#job-description");
  const responsibilities = document.querySelector("#job-responsibilities");
  const requirements = document.querySelector("#job-requirements");
  const companyDescription = document.querySelector("#job-company-description");
  const applyButton = document.querySelector("#apply-button");

  async function cargarEmpleo() {
    try {
      const [responseEmpleos, responseDetalles] = await Promise.all([
        fetch("./data.json"),
        fetch("./empleos-detalle.json"),
      ]);

      if (!responseEmpleos.ok || !responseDetalles.ok) {
        throw new Error("No se pudieron cargar los datos.");
      }

      const [empleos, empleosDetalle] = await Promise.all([
        responseEmpleos.json(),
        responseDetalles.json(),
      ]);

      const empleo = empleos.find((job) => job.id === empleoId);
      const detalle = empleosDetalle.find((job) => job.empleoId === empleoId);

      if (!empleo || !detalle) {
        mostrarError();
        return;
      }

      renderizarEmpleo(empleo, detalle);
    } catch (error) {
      console.error("Error al cargar el empleo:", error);
      mostrarError();
    }
  }

  function renderizarEmpleo(empleo, detalle) {
    jobTitle.textContent = empleo.titulo;
    company.textContent = empleo.empresa;
    location.textContent = empleo.ubicacion;
    level.textContent = empleo.data.nivel;
    modality.textContent = empleo.data.modalidad;

    description.textContent =
      detalle.descripcionDetallada || empleo.descripcion;

    renderizarLista(responsibilities, detalle.responsabilidades);

    renderizarLista(requirements, detalle.requisitos);

    companyDescription.textContent = detalle.descripcionDeEmpresa;

    document.title = `DevJobs - ${empleo.titulo}`;

    applyButton.addEventListener("click", () => {
      alert(`Has seleccionado aplicar a ${empleo.titulo}`);
    });
  }

  function renderizarLista(container, items) {
    container.innerHTML = "";

    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      container.appendChild(li);
    });
  }

  function mostrarError() {
    document.querySelector("main").innerHTML = `
      <section class="job-not-found">
        <h1>Empleo no encontrado</h1>
        <p>
          El empleo que estás buscando no existe o ya no está disponible.
        </p>
        <a href="./empleos.html">Volver a empleos</a>
      </section>
    `;
  }

  cargarEmpleo();
}
