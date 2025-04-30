document.addEventListener("DOMContentLoaded", function () {
  // Toggle sidebar on mobile
  const toggleSidebar = document.querySelector(".toggle-sidebar");
  const closeSidebar = document.querySelector(".close-sidebar");
  const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector(".main-content");

  toggleSidebar.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });

  closeSidebar.addEventListener("click", function () {
    sidebar.classList.remove("active");
  });

  // Initialize charts
  const completionCtx = document
    .getElementById("completionChart")
    .getContext("2d");
  const trafficCtx = document.getElementById("trafficChart").getContext("2d");

  // Completion Chart (Doughnut)
  const completionChart = new Chart(completionCtx, {
    type: "doughnut",
    data: {
      labels: ["Completed", "In Progress", "Pending"],
      datasets: [
        {
          data: [18, 4, 2],
          backgroundColor: ["#1cc88a", "#f6c23e", "#e74a3b"],
          hoverBackgroundColor: ["#17a673", "#dda20a", "#be2617"],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
      cutout: "70%",
    },
  });

  // Traffic Chart (Line)
  const trafficChart = new Chart(trafficCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "Visitors",
          data: [1200, 1900, 1700, 2100, 2300, 2500, 2800],
          backgroundColor: "rgba(78, 115, 223, 0.05)",
          borderColor: "rgba(78, 115, 223, 1)",
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointRadius: 3,
          pointHoverRadius: 5,
          borderWidth: 2,
          fill: true,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value.toLocaleString();
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", function (e) {
    if (
      window.innerWidth <= 768 &&
      !sidebar.contains(e.target) &&
      e.target !== toggleSidebar
    ) {
      sidebar.classList.remove("active");
    }
  });

  // Responsive adjustments
  function handleResize() {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("active");
    }
  }

  window.addEventListener("resize", handleResize);

  // Enhanced Responsive Charts
  function resizeCharts() {
    completionChart.resize();
    trafficChart.resize();
  }

  // Handle orientation changes
  window.addEventListener("orientationchange", function () {
    setTimeout(resizeCharts, 200);
  });

  // Handle window resize with debounce
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resizeCharts();
      // Handle any other responsive elements
    }, 250);
  });

  // Add mobile search toggle
  const searchToggle = document.createElement("button");
  searchToggle.innerHTML = '<i class="fas fa-search"></i>';
  searchToggle.className = "btn-icon mobile-search-toggle";
  searchToggle.addEventListener("click", function () {
    document.querySelector(".mobile-search").classList.toggle("active");
  });

  document.querySelector(".user-profile").prepend(searchToggle);
});
