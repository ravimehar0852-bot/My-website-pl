document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  const name = params.get('name') || 'this vehicle';
  const image = params.get('image') || '';
  const persons = params.get('persons') || '--';
  const price = params.get('price') || '--';

  document.getElementById('vdIntro').textContent =
    `Embark on a memorable journey through the cultural hub of Lucknow with KTS Cabs, offering the perfect blend of comfort and style. Our ${name} hire service is tailored to elevate your taxi experience, ensuring a seamless and enjoyable exploration of the city's rich heritage. Discover why choosing KTS Cabs for your taxi needs is the key to unlocking a truly delightful Lucknow adventure.`;

  document.getElementById('vdTitle').textContent = `Explore Lucknow in Comfort: ${name} Hire with KTS Cabs`;
  document.getElementById('vdImage').src = image;
  document.getElementById('vdImage2').src = image;
  document.getElementById('vdVehicleName').textContent = name;
  document.getElementById('vdPersons').textContent = persons;
  document.getElementById('vdPrice').textContent = price;

  document.getElementById('vdWhyName').textContent = name;
  document.getElementById('vdHowName').textContent = name;
  document.getElementById('vdClosingName').textContent = name;

  document.getElementById('vdSendBtn').addEventListener('click', () => {
    const guestName = document.getElementById('vdName').value.trim();
    const guestPhone = document.getElementById('vdPhone').value.trim();
    const guestMessage = document.getElementById('vdMessage').value.trim();

    if (!guestName || !guestPhone) {
      alert('Please enter your name and phone number.');
      return;
    }
    if (!/^\d{10}$/.test(guestPhone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    const text = `Hi, I want to book ${name}.\nName: ${guestName}\nPhone: ${guestPhone}\nMessage: ${guestMessage}`;
    window.open(`https://wa.me/918737993690?text=${encodeURIComponent(text)}`, '_blank');
  });
});

