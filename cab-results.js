const cabsData = [
  { name: "Dzire Or Similar (4+1)", subtitle: "(Sedan Cng)", image: "images/dzire.png", price: 5974.5 },
  { name: "Maruti Suzuki Ertiga (6+1)", subtitle: "(Ertiga Or Similar)", image: "images/ertiga.png", price: 7906.5 },
  { name: "Etios Or Similar (4+1)", subtitle: "(Sedan Diesel Ac)", image: "images/etios.png", price: 7098 },
  { name: "Kia Carens (6+1)", subtitle: "(Kia Carens Diesel)", image: "images/kia-carens.png", price: 10017 },
  { name: "Innova Crysta (7+1)", subtitle: "(Innova Crysta)", image: "images/innova.png", price: 10683.75 }
];

function renderCabList(){
  const container = document.getElementById("cabListContainer");
  container.innerHTML = "";

  cabsData.forEach(cab => {
    const card = document.createElement("div");
    card.className = "cab-result-card";
    card.innerHTML = `
      <h3 class="cab-result-title">${cab.name}</h3>
      <p class="cab-result-subtitle">${cab.subtitle}</p>
      <img src="${cab.image}" alt="${cab.name}" class="cab-result-img">

      <p class="cab-result-facilities-title">Facilities:</p>
      <div class="cab-result-facilities">
        <div class="facility"><i class="fa-solid fa-bottle-water"></i><span>Water Bottle</span></div>
        <div class="facility"><i class="fa-solid fa-clock"></i><span>On Time Guarantee</span></div>
        <div class="facility"><i class="fa-solid fa-file-invoice"></i><span>Invoice Gst</span></div>
        <div class="facility"><i class="fa-solid fa-spray-can"></i><span>Sanitized Cab</span></div>
      </div>

      <div class="cab-result-bottom">
        <div>
          <p class="cab-result-price">₹ ${cab.price}</p>
          <a href="#" class="cab-fare-details">Fare Details &raquo;</a>
        </div>
        <a href="#" class="cab-select-btn"
           data-cab-name="${cab.name}"
           data-cab-subtitle="${cab.subtitle}"
           data-cab-image="${cab.image}"
           data-cab-price="${cab.price}">Select Cab</a>
      </div>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {

  // ---- Booking summary display (from index.html search) ----
  const params = new URLSearchParams(window.location.search);

  const bookingType = params.get('bookingType') || '--';
  const dateTime = params.get('dateTime') || '--';
  const tripType = params.get('tripType') || '--';
  const from = params.get('from') || '--';
  const to = params.get('to') || '--';

  document.getElementById('summaryBookingType').textContent = bookingType;
  document.getElementById('summaryDateTime').textContent = dateTime;
  document.getElementById('summaryTripType').textContent = tripType;
  document.getElementById('summaryRoute').textContent = `Route: ${from} -> ${to}`;

  renderCabList();

  // ---- Select Cab popup logic ----
  const modal = document.getElementById('selectCabModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const submitBtn = document.getElementById('modalSubmitBtn');

  let selectedCab = null;

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cab-select-btn')) {
      e.preventDefault();
      selectedCab = {
        name: e.target.dataset.cabName || '',
        subtitle: e.target.dataset.cabSubtitle || '',
        image: e.target.dataset.cabImage || '',
        price: e.target.dataset.cabPrice || 0
      };
      modal.style.display = 'flex';
    }
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  submitBtn.addEventListener('click', () => {
    const mobile = document.getElementById('modalMobileInput').value.trim();
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    const checkoutParams = new URLSearchParams({
      bookingType: params.get('bookingType') || '',
      dateTime: params.get('dateTime') || '',
      tripType: params.get('tripType') || '',
      from: params.get('from') || '',
      to: params.get('to') || '',
      mobile: mobile,
      cabName: selectedCab ? selectedCab.name : '',
      cabSubtitle: selectedCab ? selectedCab.subtitle : '',
      cabImage: selectedCab ? selectedCab.image : '',
      cabPrice: selectedCab ? selectedCab.price : 0
    });

    window.location.href = 'checkout.html?' + checkoutParams.toString();
  });

});
                          
