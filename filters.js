const filterLocation = document.querySelector("#filter-location");
const filterTechnology = document.querySelector("#filter-technology");
const filterExperienceLevel = document.querySelector("#filter-experience-level");
const mensaje = document.querySelector("#filter-selected-value");

document.addEventListener('jobsLoaded', function() {
    
    const jobs = document.querySelectorAll(".job-listing-card");

    filterLocation.addEventListener('change', function() {
        const selectedValue = filterLocation.value;
        mensaje.textContent = selectedValue ? `Has seleccionado ${selectedValue}` : '';

        jobs.forEach(job => {
            const modalidad = job.getAttribute('data-modalidad');
            const isShown = selectedValue === '' || selectedValue === modalidad;
            job.classList.toggle('is-hidden', !isShown);
        });
    });

    filterTechnology.addEventListener('change', function() {
        const selectedValue = filterTechnology.value;
        mensaje.textContent = selectedValue ? `Has seleccionado ${selectedValue}` : '';

        jobs.forEach(job => {
            const techRawData = job.getAttribute('data-technology');
            const techList = JSON.parse(techRawData || '[]');
            const isShown = selectedValue === '' || techList.includes(selectedValue);
            job.classList.toggle('is-hidden', !isShown);
        });
    });

    filterExperienceLevel.addEventListener('change', function() {
        const selectedValue = filterExperienceLevel.value;
        mensaje.textContent = selectedValue ? `Has seleccionado ${selectedValue}` : '';

        jobs.forEach(job => {
            const nivel = job.getAttribute('data-nivel');
            const isShown = selectedValue === '' || selectedValue === nivel;
            job.classList.toggle('is-hidden', !isShown);
        });
    });
});