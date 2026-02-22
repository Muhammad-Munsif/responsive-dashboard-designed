
(function () {
  // ----- SIDEBAR TOGGLE -----
  const sidebar = document.getElementById('mainSidebar');
  const toggleBtn = document.getElementById('toggleSidebar');
  const closeBtn = document.getElementById('closeSidebar');
  const mobileSearchToggle = document.getElementById('mobileSearchToggle');
  const mobileSearchDiv = document.getElementById('mobileSearch');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('active');
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('active');
    });
  }

  // close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebar.classList.contains('active') &&
      !sidebar.contains(e.target) && e.target !== toggleBtn) {
      sidebar.classList.remove('active');
    }
  });

  // ----- MOBILE SEARCH TOGGLE -----
  if (mobileSearchToggle && mobileSearchDiv) {
    mobileSearchToggle.addEventListener('click', () => {
      mobileSearchDiv.classList.toggle('active');
    });
  }

  // ----- CHARTS INIT -----
  const completionCtx = document.getElementById('completionChart')?.getContext('2d');
  const trafficCtx = document.getElementById('trafficChart')?.getContext('2d');

  if (completionCtx) {
    new Chart(completionCtx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'In Progress', 'Pending'],
        datasets: [{
          data: [18, 4, 2],
          backgroundColor: ['#1cc88a', '#f6c23e', '#e74a3b'],
          hoverBackgroundColor: ['#17a673', '#dda20a', '#be2617'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  if (trafficCtx) {
    new Chart(trafficCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Visitors',
          data: [1200, 1900, 1700, 2100, 2300, 2500, 2800],
          borderColor: '#4e73df',
          backgroundColor: 'rgba(78,115,223,0.05)',
          tension: 0.2,
          fill: true,
          pointBackgroundColor: '#4e73df',
          pointBorderColor: '#fff',
          pointRadius: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } }
      }
    });
  }

  // ----- RESIZE HANDLER (ensures charts stay sharp) -----
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // chart.js handles resize automatically when maintainAspectRatio: false
      // but we can trigger a manual redraw if needed (optional)
    }, 200);
  });

  // Fix for orientation change on mobile
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  });
})();
