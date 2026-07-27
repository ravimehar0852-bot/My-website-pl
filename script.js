document.addEventListener('DOMContentLoaded', () => {

  // Tab switching: Outstation / Local
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Toggle switching: One Way / Round Trip
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => {
        b.classList.remove('active');
        b.classList.add('inactive');
      });
      btn.classList.remove('inactive');
      btn.classList.add('active');
    });
  });

  // Set today's date as default in Date field
  const dateField = document.getElementById('dateInput');
  if (dateField) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    dateField.value = `${dd}-${mm}-${yyyy}`;
  }

  // Set current time as default in Time field
  const timeField = document.getElementById('timeInput');
  if (timeField) {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    timeField.value = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
  }

  // Search Cab button click handler
  const searchBtn = document.querySelector('.search-btn');
  searchBtn.addEventListener('click', () => {
    const fromCity = document.getElementById('fromCity').value.trim();
    const toCity = document.getElementById('toCity').value.trim();
    const mobile = document.getElementById('mobileNo').value.trim();

    if (!fromCity || !toCity) {
      alert('Please enter both From City and To City.');
      return;
    }
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    alert(`Searching cabs from ${fromCity} to ${toCity}...`);
  });

});
