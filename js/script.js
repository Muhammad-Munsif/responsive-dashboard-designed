<script>
    (function () {
      // ----- SIDEBAR TOGGLE (same) -----
      const sidebar = document.getElementById('mainSidebar');
      const toggleBtn = document.getElementById('toggleSidebar');
      const closeBtn = document.getElementById('closeSidebar');
      const mobileSearchToggle = document.getElementById('mobileSearchToggle');
      const mobileSearchDiv = document.getElementById('mobileSearch');

      toggleBtn?.addEventListener('click', (e) => { e.stopPropagation(); sidebar.classList.toggle('active'); });
      closeBtn?.addEventListener('click', () => { sidebar.classList.remove('active'); });
      document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target !== toggleBtn) {
          sidebar.classList.remove('active');
        }
      });
      mobileSearchToggle?.addEventListener('click', () => { mobileSearchDiv.classList.toggle('active'); });

      // ----- INTERACTIVE MENU: separate pages + active state -----
      const menuItems = {
        home: document.getElementById('menuHome'),
        analytics: document.getElementById('menuAnalytics'),
        messages: document.getElementById('menuMessages'),
        calendar: document.getElementById('menuCalendar'),
        settings: document.getElementById('menuSettings'),
        profile: document.getElementById('menuProfile'),
        logout: document.getElementById('menuLogout')
      };

      // All page sections
      const pageSections = {
        home: document.getElementById('home-page'),
        analytics: document.getElementById('analytics-page'),
        messages: document.getElementById('messages-page'),
        calendar: document.getElementById('calendar-page'),
        settings: document.getElementById('settings-page'),
        profile: document.getElementById('profile-page'),
        logout: document.getElementById('logout-page')
      };

      const pageTitleEl = document.getElementById('pageTitle');
      const pageSubtitleEl = document.getElementById('pageSubtitle');

      // Titles and subtitles for each page
      const pageMeta = {
        home: { title: 'Welcome back, John!', subtitle: "Here's what's happening with your dashboard today." },
        analytics: { title: 'Analytics Overview', subtitle: 'Track your key metrics and performance.' },
        messages: { title: 'Messages', subtitle: 'You have 5 unread messages.' },
        calendar: { title: 'Calendar', subtitle: 'Your upcoming events and meetings.' },
        settings: { title: 'Settings', subtitle: 'Manage your account preferences.' },
        profile: { title: 'User Profile', subtitle: 'View and edit your personal information.' },
        logout: { title: 'Logged Out', subtitle: 'Redirecting to login... (demo)' }
      };

      // Function to remove active class from all menu items and pages
      function deactivateAll() {
        Object.values(menuItems).forEach(item => { if (item) item.classList.remove('active'); });
        Object.values(pageSections).forEach(section => { if (section) section.classList.remove('active-page'); });
      }

      // Global navigate function (used by logout button)
      window.navigateTo = function (page) {
        deactivateAll();
        if (menuItems[page]) menuItems[page].classList.add('active');
        if (pageSections[page]) pageSections[page].classList.add('active-page');

        const meta = pageMeta[page] || pageMeta.home;
        pageTitleEl.textContent = meta.title;
        pageSubtitleEl.textContent = meta.subtitle;

        // Close sidebar on mobile after navigation
        if (window.innerWidth <= 768) sidebar.classList.remove('active');
      };

      // Attach click listeners to menu items (using the parent li)
      Object.entries(menuItems).forEach(([page, li]) => {
        if (li) {
          li.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(page);
          });
        }
      });

      // Initialize Charts (only once, on home page canvases)
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
              hoverBackgroundColor: ['#17a673', '#dda20a', '#be2617']
            }]
          },
          options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'bottom' } } }
        });
      }

      if (trafficCtx) {
        new Chart(trafficCtx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
              label: 'Visitors', data: [1200, 1900, 1700, 2100, 2300, 2500, 2800],
              borderColor: '#4e73df', backgroundColor: 'rgba(78,115,223,0.05)', tension: 0.2,
              fill: true, pointBackgroundColor: '#4e73df', pointBorderColor: '#fff', pointRadius: 3
            }]
          },
          options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } }
        });
      }

      // Resize handling (minor)
      let resizeTimer;
      window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { }, 200); });
      window.addEventListener('orientationchange', () => { setTimeout(() => window.dispatchEvent(new Event('resize')), 200); });

      // Ensure Home is active by default (already has class active-page and menu active)
      // but if not, call navigateTo('home')
      if (!pageSections.home?.classList.contains('active-page')) {
        navigateTo('home');
      }
    })();
  </script>