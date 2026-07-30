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
        <a href="https://wa.me/918737993690?text=${encodeURIComponent('I want to book ' + cab.name + ' - Fare: Rs.' + cab.price)}" target="_blank" class="cab-select-btn">Select Cab</a>
      </div>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
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
});
