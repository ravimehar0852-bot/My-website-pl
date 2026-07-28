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
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('taxiTrack');
  const dotsWrap = document.getElementById('taxiDots');
  const allCards = track.children;          // clones included
  const realCount = allCards.length - 2;    // asli cards ki count (clones minus)
  let index = 1;                            // shuru real first card se (clone ke baad)
  let autoSlide;
  let isTransitioning = false;

  // dots sirf real cards ke liye banao
  for (let i = 0; i < realCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('taxi-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(i + 1);
      resetAutoSlide();
    });
    dotsWrap.appendChild(dot);
  }
  const dots = dotsWrap.children;

  function updateDots(realIndex) {
    [...dots].forEach(d => d.classList.remove('active'));
    dots[realIndex].classList.add('active');
  }

  function getCardWidth() {
    return allCards[0].getBoundingClientRect().width + 15;
  }

  function goToSlide(i, animate = true) {
    isTransitioning = animate;
    track.style.transition = animate ? 'transform 0.5s ease' : 'none';
    track.style.transform = `translateX(-${i * getCardWidth()}px)`;
    index = i;

    // dots update (real index nikaalo)
    let realIndex = index - 1;
    if (realIndex < 0) realIndex = realCount - 1;
    if (realIndex >= realCount) realIndex = 0;
    updateDots(realIndex);
  }

  function nextSlide() {
    if (isTransitioning) return;
    goToSlide(index + 1);
  }

  // Jab transition khatam ho aur hum clone pe pahunch jaayein, silently real slide pe jump karo
  track.addEventListener('transitionend', () => {
    isTransitioning = false;
    if (index === allCards.length - 1) {
      // last clone pe pahunche -> silently real first pe jao
      goToSlide(1, false);
    } else if (index === 0) {
      // first clone pe pahunche -> silently real last pe jao
      goToSlide(realCount, false);
    }
  });

  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 3000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  // swipe support (mobile)
  let startX = 0;
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    clearInterval(autoSlide);
  });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 50) goToSlide(index + 1);
    if (diff < -50) goToSlide(index - 1);
    resetAutoSlide();
  });

  window.addEventListener('resize', () => goToSlide(index, false));

  // initial position set karo (clone ke baad wale real first card pe)
  goToSlide(1, false);
  startAutoSlide();
});
const routesData = [
  {
    title: "Lucknow To Varanasi Cabs",
    image: "images/lucknow-varanasi-banner.webp",
    desc: "Lucknow To Varanasi Taxi Service, Lucknow To Varanasi Cabs, Fare Starts @Rs. 9/km with KTS Cabs",
    vehicle: "Ertiga",
    price: "₹15.00/ KM",
    phone: "918737993690"
  },
  {
    title: "Lucknow To Ayodhya Cabs",
    destImg: "images/ayodhya.jpg",
    carImg: "images/innova.png",
    desc: "Lucknow To Ayodhya Taxi, Lucknow To Ayodhya Cabs, Lucknow To Ayodhya Cab Booking @Rs. 9/km With KTS Cabs",
    vehicle: "Toyota Etios",
    price: "₹12.00/ KM",
    phone: "918737993690"
  },
  {
    title: "Lucknow to Agra Cabs",
    destImg: "images/agra.jpg",
    carImg: "images/innova.png",
    desc: "Lucknow To Agra Taxi Service, Lucknow To Agra Cabs Fare Starts @Rs. 9/km with KTS Cabs",
    vehicle: "SUV Toyota Innova",
    price: "₹20.00/ KM",
    phone: "918737993690"
  },
  {
    title: "Lucknow to Noida Cabs",
    destImg: "images/noida.jpg",
    carImg: "images/innova.png",
    desc: "Lucknow To Noida Cab Service, Lucknow To Noida Taxi Service, Lucknow To Noida Cabs Fare Starts @Rs. 9/km With KTS Cabs",
    vehicle: "Sedan CNG",
    price: "₹12.00/ KM",
    phone: "918737993690"
  },
  {
    title: "Lucknow to Nainital Cabs",
    destImg: "images/nainital.jpg",
    carImg: "images/innova.png",
    desc: "Lucknow To Nainital Taxi, Lucknow To Nainital Cab Booking with KTS Cabs",
    vehicle: "Innova",
    price: "₹18.00/ KM",
    phone: "918737993690"
  },
  {
    title: "Lucknow to Delhi Cabs",
    destImg: "images/delhi.jpg",
    carImg: "images/innova.png",
    desc: "Lucknow To Delhi Cabs, Lucknow To Delhi Taxi Service, Lucknow To Delhi Cab Service, Fare Starts @Rs. 11/km With KTS Cabs",
    vehicle: "Ertiga",
    price: "₹15.00/ KM",
    phone: "918737993690"
  },
  {
    title: "Lucknow To Naimisharanya One Way Taxi Service",
    destImg: "images/naimisharanya.jpg",
    carImg: "images/innova.png",
    desc: "Lucknow To Naimisharanya Taxi Service, Lucknow To Naimisharanya One Way Taxi Service Fare Starts @ Rs. 9/km with KTS Cabs",
    vehicle: "Ertiga",
    price: "₹15.00/ KM",
    phone: "918737993690"
  },
  {
    title: "Lucknow To Allahabad Cabs",
    destImg: "images/allahabad.jpg",
    carImg: "images/innova.png",
    desc: "Lucknow To Allahabad Taxi Service, Lucknow To Prayagraj Cabs, Fare Start @ Rs.9/km with KTS Cabs",
    vehicle: "Ertiga",
    price: "₹15.00/ KM",
    phone: "918737993690"
  }
];

function renderRoutes(){
  const list = document.getElementById("routesList");
  if(!list) return;
  list.innerHTML = "";

  routesData.forEach(route => {
    const card = document.createElement("div");
    card.className = "route-card";

    card.innerHTML = `
  <div class="route-card-top">
   <div class="route-image-box">
  <img class="route-bg-img" src="${route.image}" alt="${route.title}">
</div>

    <h3 class="route-card-title">${route.title}</h3>
  </div>

  <div class="route-card-bottom">
    <p class="route-card-desc">${route.desc}</p>

    <div class="route-card-meta">
      <div class="meta-vehicle">
        <span class="meta-label">Vehicle Type</span>
        <span class="meta-badge">${route.vehicle}</span>
      </div>

      <div class="meta-price">
        <span class="meta-label">Price</span>
        <span class="meta-badge">${route.price}</span>
      </div>
    </div>

    <a class="route-card-btn"
      href="https://wa.me/${route.phone}?text=Hi%2C%20I%20want%20to%20book%20${encodeURIComponent(route.title)}"
      target="_blank">
      Book Now
    </a>
  </div>
`;

    list.appendChild(card);
  });

  observeCards();
}

function observeCards(){
  const cards = document.querySelectorAll(".route-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => observer.observe(card));
}

document.addEventListener("DOMContentLoaded", renderRoutes);
