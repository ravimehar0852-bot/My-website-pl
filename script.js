document.addEventListener('DOMContentLoaded', () => {

  // Tab switching: Outstation / Local
  const tabs = document.querySelectorAll('.tab');
  const outstationForm = document.getElementById('outstationForm');
  const localForm = document.getElementById('localForm');

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (!outstationForm || !localForm) {
        console.error('outstationForm ya localForm div HTML mein nahi mila. IDs check karein.');
        return;
      }

      if (idx === 0) {
        outstationForm.style.display = 'block';
        localForm.style.display = 'none';
      } else {
        outstationForm.style.display = 'none';
        localForm.style.display = 'block';
      }
    });
  });

  // Toggle switching (har .toggle-row ke andar alag-alag group)
  document.querySelectorAll('.toggle-row').forEach(row => {
    const btns = row.querySelectorAll('.toggle-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => {
          b.classList.remove('active');
          b.classList.add('inactive');
        });
        btn.classList.remove('inactive');
        btn.classList.add('active');
      });
    });
  });

  // Set today's date as default (Outstation)
  const dateField = document.getElementById('dateInput');
  if (dateField) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    dateField.value = `${dd}-${mm}-${yyyy}`;
  }

  // Set current time as default (Outstation)
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

  // Set today's date as default (Local)
  const dateFieldLocal = document.getElementById('dateInputLocal');
  if (dateFieldLocal) {
    const today = new Date();
    dateFieldLocal.value = `${String(today.getDate()).padStart(2,'0')}-${String(today.getMonth()+1).padStart(2,'0')}-${today.getFullYear()}`;
  }

  // Set current time as default (Local)
  const timeFieldLocal = document.getElementById('timeInputLocal');
  if (timeFieldLocal) {
    const now = new Date();
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2,'0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    timeFieldLocal.value = `${String(h).padStart(2,'0')}:${m} ${ampm}`;
  }

  // Search Cab button (Outstation)
  const searchBtn = document.querySelector('#outstationForm .search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const fromCity = document.getElementById('fromCity').value.trim();
      const toCity = document.getElementById('toCity').value.trim();
      const mobile = document.getElementById('mobileNo').value.trim();
      const date = document.getElementById('dateInput').value;
      const time = document.getElementById('timeInput').value;
      const tripType = document.querySelector('#outstationForm .toggle-btn.active').textContent;

      if (!fromCity || !toCity) {
        alert('Please enter both From City and To City.');
        return;
      }
      if (!mobile || !/^\d{10}$/.test(mobile)) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }

      showCabResults({
        bookingType: tripType + ' Usage',
        dateTime: `${date} ${time}`,
        tripType: tripType,
        from: fromCity,
        to: toCity
      });
    });
  }

  // Search Cab button (Local)
  const searchCabLocal = document.getElementById('searchCabLocal');
  if (searchCabLocal) {
    searchCabLocal.addEventListener('click', () => {
      const pkg = document.getElementById('localPackage').value;
      const hrsKms = document.getElementById('hoursKms').value;
      const mobile = document.getElementById('mobileNoLocal').value.trim();
      const date = document.getElementById('dateInputLocal').value;
      const time = document.getElementById('timeInputLocal').value;

      if (!pkg) { alert('Please select a local package.'); return; }
      if (!hrsKms) { alert('Please select hours/kms.'); return; }
      if (!mobile || !/^\d{10}$/.test(mobile)) { alert('Please enter a valid 10-digit mobile number.'); return; }

      showCabResults({
        bookingType: pkg === 'hourly' ? 'Hourly Basis' : 'Airport Transfer',
        dateTime: `${date} ${time}`,
        tripType: 'Local',
        from: 'Lucknow',
        to: hrsKms
      });
    });
  }
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
    title:" ",
    image: "images/lucknow-varanasi-banner.webp",
    desc: "Lucknow To Varanasi Taxi Service, Lucknow To Varanasi Cabs, Fare Starts @Rs. 9/km with KTS Cabs",
    vehicle: "Ertiga",
    price: "₹15.00/ KM",
    phone: "918737993690"
  },
  {
    title: " ",
    image: "images/lucknow-ayodhya-banner.webp",
    desc: "Lucknow To Ayodhya Taxi, Lucknow To Ayodhya Cabs, Lucknow To Ayodhya Cab Booking @Rs. 9/km With KTS Cabs",
    vehicle: "Toyota Etios",
    price: "₹12.00/ KM",
    phone: "918737993690"
  },
  {
    title: " ",
    image: "images/lucknow-agra-banner.webp",
    desc: "Lucknow To Agra Taxi Service, Lucknow To Agra Cabs Fare Starts @Rs. 9/km with KTS Cabs",
    vehicle: "SUV Toyota Innova",
    price: "₹20.00/ KM",
    phone: "918737993690"
  },
  {
    title: " ",
    image: "images/lucknow-noida-banner.webp",
    desc: "Lucknow To Noida Cab Service, Lucknow To Noida Taxi Service, Lucknow To Noida Cabs Fare Starts @Rs. 9/km With KTS Cabs",
    vehicle: "Sedan CNG",
    price: "₹12.00/ KM",
    phone: "918737993690"
  },
  {
    title: " ",
    image: "images/lucknow-nainital-banner.webp",
    desc: "Lucknow To Nainital Taxi, Lucknow To Nainital Cab Booking with KTS Cabs",
    vehicle: "Innova",
    price: "₹18.00/ KM",
    phone: "918737993690"
  },
  {
    title: " ",
    image: "images/lucknow-delhi-banner.webp",
    desc: "Lucknow To Delhi Cabs, Lucknow To Delhi Taxi Service, Lucknow To Delhi Cab Service, Fare Starts @Rs. 11/km With KTS Cabs",
    vehicle: "Ertiga",
    price: "₹15.00/ KM",
    phone: "918737993690"
  },
  {
    title: " ",
    image: "images/lucknow-naimisharanya-banner.webp",
    desc: "Lucknow To Naimisharanya Taxi Service, Lucknow To Naimisharanya One Way Taxi Service Fare Starts @ Rs. 9/km with KTS Cabs",
    vehicle: "Ertiga",
    price: "₹15.00/ KM",
    phone: "918737993690"
  },
  {
    title: " ",
    image: "images/lucknow-allahabad-banner.webp",
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
const servicesData = [
  {
    image: "images/one-way-service.jpg",
    title: "One Way Taxi Service Hire with KTS Cabs",
    price: "₹20.00/ KM",
    phone: "918737993690"
  },
  {
    image: "images/round-trip-service.jpg",
    title: "Round Trip Taxi Service Hire with KTS Cabs",
    price: "₹15.00/ KM",
    phone: "918737993690"
  },
  {
    image: "images/local-service.jpg",
    title: "Local Taxi Service Hire with KTS Cabs",
    price: "₹15.00/ KM",
    phone: "918737993690"
  },
  {
    image: "images/airport-service.jpg",
    title: "Airport Taxi Service Hire with KTS Cabs",
    price: "₹20.00/ KM",
    phone: "918737993690"
  }
];

function renderServices(){
  const list = document.getElementById("servicesList");
  if(!list) return;
  list.innerHTML = "";

  servicesData.forEach(service => {
    const card = document.createElement("div");
    card.className = "service-card";

    card.innerHTML = `
      <img class="service-img" src="${service.image}" alt="${service.title}">
      <div class="service-bottom">
        <h3 class="service-title">${service.title}</h3>
        <div class="service-meta">
          <span class="service-price">${service.price}</span>
          <a class="service-call-btn" href="tel:+${service.phone}">Call Now</a>
        </div>
      </div>
    `;

    list.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderServices);
const faqData = [
  {
    q: "Is KTS Cabs available for city tours or special events in Lucknow?",
    a: "Yes, KTS Cabs is available for city tours and special events in Lucknow. Whether you want to explore the city's attractions or need transportation for a special occasion, we are here to make your experience memorable."
  },
  {
    q: "Is it possible to make a reservation for a KTS Cab in advance?",
    a: "Certainly! We understand the importance of planning ahead. You can make an advance booking through our app, website, or by calling our hotline. This ensures that a KTS Cab is ready for you when you need it."
  },
  {
    q: "Can I book a KTS Cab for airport transfers?",
    a: "Yes, you can! KTS Cabs offers reliable airport transfer services. Whether you're heading to or from the airport, our punctual and courteous drivers will ensure you reach your destination on time."
  },
  {
    q: "Are the drivers at KTS Cabs experienced and licensed?",
    a: "Absolutely! The drivers at KTS Cabs are not only experienced but also licensed professionals. We prioritize safety and professionalism, ensuring a secure and pleasant journey for our passengers."
  },
  {
    q: "What types of vehicles does KTS Cabs offer?",
    a: "KTS Cabs provides a diverse fleet of vehicles to meet your travel needs. Our options include comfortable sedans, spacious SUVs, and more. Whether you're traveling solo or with a group, we have the right vehicle for you."
  },
  {
    q: "How can I book a taxi with KTS Cabs in Lucknow?",
    a: "Booking a taxi with KTS Cabs is easy! You can use our user-friendly mobile app, visit our website, or call our dedicated hotline. Choose the method that suits you best, provide your travel details, and we'll take care of the rest."
  }
];

function renderFAQ(){
  const list = document.getElementById("faqList");
  if(!list) return;
  list.innerHTML = "";

  faqData.forEach((item, i) => {
    const faqItem = document.createElement("div");
    faqItem.className = "faq-item";

    faqItem.innerHTML = `
      <div class="faq-question">
        <span>${i + 1}. ${item.q}</span>
        <span class="faq-icon">+</span>
      </div>
      <div class="faq-answer">
        <p>${item.a}</p>
      </div>
    `;

    list.appendChild(faqItem);
  });

  // Accordion click behavior
  const questions = document.querySelectorAll(".faq-question");
  questions.forEach(question => {
    question.addEventListener("click", () => {
      const currentItem = question.parentElement;
      const isOpen = currentItem.classList.contains("open");

      // sabhi close karo
      document.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("open");
        item.querySelector(".faq-icon").textContent = "+";
      });

      // agar pehle se open nahi tha, toh isse open karo
      if (!isOpen) {
        currentItem.classList.add("open");
        currentItem.querySelector(".faq-icon").textContent = "−";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", renderFAQ);
const testimonialData = [
  {
    text: "I rely on KTS Cabs for all my travels in Kanpur, and they have never let me down. From the easy booking process to the courteous drivers and well-maintained cars, they consistently provide a reliable and comfortable service. KTS Cabs is my go-to choice for hassle-free transportation in Kanpur.",
    name: "Karan Sahni, Kanpur"
  },
  {
    text: "Exceptional service from KTS Cabs! The drivers are always on time, and the cars are clean and comfortable. I appreciate their commitment to safety and the straightforward pricing. It's refreshing to have a taxi service that values transparency. Highly recommend KTS Cabs for a stress-free ride.",
    name: "Ashish Shukla, Varanasi"
  },
  {
    text: "KTS Cabs exceeded my expectations. The website & Booking Process is very user-friendly, making it easy to book a cab on the go. The drivers are professional and friendly, creating a positive travel experience. Whether for airport transfers or local trips, KTS Cabs has become my preferred choice for reliable transportation in Lucknow.",
    name: "Kamal Hasan, Lucknow"
  },
  {
    text: "I've tried various taxi services in Ayodhya, and KTS Cabs stands out for its exceptional service. The drivers are knowledgeable about the city, and the vehicles are in excellent condition. I appreciate the consistency and reliability they offer. KTS Cabs has become my trusted travel companion in Ayodhya.",
    name: "Sameer M., Ayodhya"
  }
];

function renderTestimonials(){
  const track = document.getElementById("testimonialTrack");
  const dotsWrap = document.getElementById("testimonialDots");
  if(!track) return;

  track.innerHTML = "";
  dotsWrap.innerHTML = "";

  const realCount = testimonialData.length;

  // clone last at start, clone first at end (loop ke liye)
  const buildCard = (item) => `
    <div class="testimonial-card">
      <span class="testimonial-quote">&ldquo;</span>
      <p class="testimonial-text">${item.text}</p>
      <p class="testimonial-name">${item.name}</p>
    </div>
  `;

  track.innerHTML =
    buildCard(testimonialData[realCount - 1]) +
    testimonialData.map(buildCard).join("") +
    buildCard(testimonialData[0]);

  const allCards = track.children;
  let index = 1;
  let autoSlide;
  let isTransitioning = false;

  for (let i = 0; i < realCount; i++) {
    const dot = document.createElement("div");
    dot.classList.add("testimonial-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(i + 1);
      resetAutoSlide();
    });
    dotsWrap.appendChild(dot);
  }
  const dots = dotsWrap.children;

  function updateDots(realIndex){
    [...dots].forEach(d => d.classList.remove("active"));
    dots[realIndex].classList.add("active");
  }

  function getCardWidth(){
    return allCards[0].getBoundingClientRect().width + 15;
  }

  function goToSlide(i, animate = true){
    isTransitioning = animate;
    track.style.transition = animate ? "transform 0.5s ease" : "none";
    track.style.transform = `translateX(-${i * getCardWidth()}px)`;
    index = i;

    let realIndex = index - 1;
    if (realIndex < 0) realIndex = realCount - 1;
    if (realIndex >= realCount) realIndex = 0;
    updateDots(realIndex);
  }

  function nextSlide(){
    if (isTransitioning) return;
    goToSlide(index + 1);
  }

  track.addEventListener("transitionend", () => {
    isTransitioning = false;
    if (index === allCards.length - 1) {
      goToSlide(1, false);
    } else if (index === 0) {
      goToSlide(realCount, false);
    }
  });

  function startAutoSlide(){
    autoSlide = setInterval(nextSlide, 3500);
  }
  function resetAutoSlide(){
    clearInterval(autoSlide);
    startAutoSlide();
  }

  let startX = 0;
  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    clearInterval(autoSlide);
  });
  track.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 50) goToSlide(index + 1);
    if (diff < -50) goToSlide(index - 1);
    resetAutoSlide();
  });

  window.addEventListener("resize", () => goToSlide(index, false));

  goToSlide(1, false);
  startAutoSlide();
}

document.addEventListener("DOMContentLoaded", renderTestimonials);
const cabsData = [
  {
    name: "Dzire Or Similar (4+1)",
    subtitle: "(Sedan Cng)",
    image: "images/dzire.png",
    price: 5974.5
  },
  {
    name: "Maruti Suzuki Ertiga (6+1)",
    subtitle: "(Ertiga Or Similar)",
    image: "images/ertiga.png",
    price: 7906.5
  },
  {
    name: "Etios Or Similar (4+1)",
    subtitle: "(Sedan Diesel Ac)",
    image: "images/etios.png",
    price: 7098
  },
  {
    name: "Kia Carens (6+1)",
    subtitle: "(Kia Carens Diesel)",
    image: "images/kia-carens.png",
    price: 10017
  },
  {
    name: "Innova Crysta (7+1)",
    subtitle: "(Innova Crysta)",
    image: "images/innova.png",
    price: 10683.75
  }
];

function renderCabList(){
  const container = document.getElementById("cabListContainer");
  if(!container) return;
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

function showCabResults(data){
  document.querySelector('.container').style.display = 'none';
  document.getElementById('cabResultsSection').style.display = 'block';

  document.getElementById('summaryBookingType').textContent = data.bookingType;
  document.getElementById('summaryDateTime').textContent = data.dateTime;
  document.getElementById('summaryTripType').textContent = data.tripType;
  document.getElementById('summaryRoute').textContent = `Route: ${data.from} -> ${data.to}`;

  renderCabList();
  window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', () => {
  const backBtn = document.getElementById('summaryBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      document.getElementById('cabResultsSection').style.display = 'none';
      document.querySelector('.container').style.display = 'block';
    });
  }
});
