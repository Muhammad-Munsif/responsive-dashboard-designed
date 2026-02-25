
(function () {
  // ----- sidebar & mobile toggles (same as before) -----
  const sidebar = document.getElementById('mainSidebar');
  const toggleBtn = document.getElementById('toggleSidebar');
  const closeBtn = document.getElementById('closeSidebar');
  const mobileSearchToggle = document.getElementById('mobileSearchToggle');
  const mobileSearchDiv = document.getElementById('mobileSearch');
  toggleBtn?.addEventListener('click', (e) => { e.stopPropagation(); sidebar.classList.toggle('active'); });
  closeBtn?.addEventListener('click', () => { sidebar.classList.remove('active'); });
  document.addEventListener('click', (e) => { if (window.innerWidth <= 768 && sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target !== toggleBtn) sidebar.classList.remove('active'); });
  mobileSearchToggle?.addEventListener('click', () => { mobileSearchDiv.classList.toggle('active'); });

  // menu and pages
  const menuItems = {
    home: document.getElementById('menuHome'), analytics: document.getElementById('menuAnalytics'),
    messages: document.getElementById('menuMessages'), calendar: document.getElementById('menuCalendar'),
    settings: document.getElementById('menuSettings'), profile: document.getElementById('menuProfile'),
    logout: document.getElementById('menuLogout')
  };
  const pageSections = {
    home: document.getElementById('home-page'), analytics: document.getElementById('analytics-page'),
    messages: document.getElementById('messages-page'), calendar: document.getElementById('calendar-page'),
    settings: document.getElementById('settings-page'), profile: document.getElementById('profile-page'),
    logout: document.getElementById('logout-page')
  };
  const pageTitleEl = document.getElementById('pageTitle');
  const pageSubtitleEl = document.getElementById('pageSubtitle');
  const pageMeta = {
    home: { title: 'Welcome back, John!', subtitle: 'Your projects are looking great.' },
    analytics: { title: 'Analytics Suite', subtitle: 'Track performance & growth.' },
    messages: { title: 'Messages', subtitle: 'You have 5 unread messages.' },
    calendar: { title: 'Calendar', subtitle: 'Upcoming meetings & deadlines.' },
    settings: { title: 'Settings', subtitle: 'Customize your experience.' },
    profile: { title: 'Profile', subtitle: 'Manage your public information.' },
    logout: { title: 'See you later!', subtitle: 'Redirecting to login ...' }
  };

  function deactivateAll() {
    Object.values(menuItems).forEach(i => i?.classList.remove('active'));
    Object.values(pageSections).forEach(s => s?.classList.remove('active-page'));
  }
  window.navigateTo = function (page) {
    deactivateAll();
    menuItems[page]?.classList.add('active');
    pageSections[page]?.classList.add('active-page');
    const meta = pageMeta[page] || pageMeta.home;
    pageTitleEl.textContent = meta.title;
    pageSubtitleEl.textContent = meta.subtitle;
    if (window.innerWidth <= 768) sidebar.classList.remove('active');
  };
  Object.entries(menuItems).forEach(([page, li]) => { if (li) li.addEventListener('click', (e) => { e.preventDefault(); navigateTo(page); }); });

  // charts
  const completionCtx = document.getElementById('completionChart')?.getContext('2d');
  const trafficCtx = document.getElementById('trafficChart')?.getContext('2d');
  if (completionCtx) new Chart(completionCtx, { type: 'doughnut', data: { labels: ['Completed', 'In Progress', 'Pending'], datasets: [{ data: [18, 4, 2], backgroundColor: ['#06d6a0', '#ffb703', '#ef476f'] }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'bottom' } } } });
  if (trafficCtx) new Chart(trafficCtx, { type: 'line', data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], datasets: [{ label: 'Visitors', data: [1200, 1900, 1700, 2100, 2300, 2500, 2800], borderColor: '#4361ee', backgroundColor: 'rgba(67,97,238,0.05)', tension: 0.2, fill: true }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } } });

  // ensure home active
  if (!pageSections.home?.classList.contains('active-page')) navigateTo('home');
})();
