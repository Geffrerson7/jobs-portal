const formSearch = document.querySelector("#empleos-search-form");
const employeeSearchInput = document.querySelector("#empleos-search-input");

document.addEventListener("jobsLoaded", function () {
  const jobs = document.querySelectorAll(".job-listing-card");
  formSearch.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchTerm = employeeSearchInput.value.toLowerCase().trim();

    jobs.forEach((job) => {
      const textContent = job.textContent.toLowerCase();

      const isMatch = searchTerm === "" || textContent.includes(searchTerm);

      job.classList.toggle("is-hidden", !isMatch);
    });
  });

  employeeSearchInput.addEventListener("input", function () {
    const searchTerm = employeeSearchInput.value.toLowerCase().trim();
    jobs.forEach((job) => {
      const isMatch =
        searchTerm === "" || job.textContent.toLowerCase().includes(searchTerm);
      job.classList.toggle("is-hidden", !isMatch);
    });
  });
});
