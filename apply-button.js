const jobsListingSection = document.querySelector(".jobs-listings");

if (jobsListingSection) {
  jobsListingSection.addEventListener("click", function (event) {
    const element = event.target.closest(".button-apply-job");

    if (!element) {
      return;
    }

    const empleoId = element.dataset.empleoId;

    if (!empleoId) {
      return;
    }

    window.location.href = `./empleo-detalle.html?id=${empleoId}`;
  });
}