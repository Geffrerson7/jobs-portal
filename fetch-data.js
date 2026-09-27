const container = document.querySelector(".jobs-listings");
const loading = document.querySelector('#jobs-loading');

if (container) {
  fetch("./data.json")
    .then((response) => response.json())
    .then((jobs) => {
      if (loading) loading.remove()

      if (jobs.length === 0) {
        const textNotFoundEmployees = document.createElement('p');
        textNotFoundEmployees.className = "no-jobs-message"; 
        textNotFoundEmployees.textContent = "No hay empleos disponibles por ahora."
        container.append(textNotFoundEmployees);
        return;
      }

      jobs.forEach((job) => {
        const article = document.createElement("article");

        article.className = "job-listing-card";
        article.dataset.modalidad = job.data.modalidad;
        article.dataset.technology = JSON.stringify(job.data.technology);
        article.dataset.nivel = job.data.nivel;

        const wrapper = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = job.titulo

        const meta = document.createElement('small');
        meta.textContent = `${job.empresa} | ${job.ubicacion}`

        const description = document.createElement('p');
        description.textContent = job.descripcion

        const button = document.createElement('button');
        button.className = "button-apply-job"
        button.textContent ='Aplicar'
        button.setAttribute('data-empleo-id', job.id);

        wrapper.append(title, meta, description);
        article.append(wrapper, button);

        container.appendChild(article);
      });

      const evento = new CustomEvent('jobsLoaded');
      document.dispatchEvent(evento);
    })
    .catch((error) => {
      console.error("Error al cargar los empleos:", error);
    });
}
