document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  const bookingType = params.get('bookingType') || '--';
  const dateTime = params.get('dateTime') || '--';
  const tripType = params.get('tripType') || '--';
  const from = params.get('from') || '--';
  const to = params.get('to') || '--';
  const mobile = params.get('mobile') || '';
  const cabName = params.get('cabName') || '--';
  const cabSubtitle = params.get('cabSubtitle') || '--';
  const cabImage = params.get('cabImage') || '';
  const cabPrice = parseFloat(params.get('cabPrice')) || 0;

  document.getElementById('summaryBookingType').textContent = bookingType;
  document.getElementById('summaryDateTime').textContent = dateTime;
  document.getElementById('summaryDuration').textContent = '--';
  document.getElementById('summaryTripType').textContent = tripType;
  document.getElementById('summaryRoute').textContent = `Route: ${from} -> ${to}`;

  document.getElementById('guestMobile').value = mobile;
  document.getElementById('guestPickup').value = from;
  document.getElementById('guestDrop').value = to;

  // Fare card
  document.getElementById('fareCabImg').src = cabImage;
  document.getElementById('fareCabTitle').textContent = cabSubtitle;
  document.getElementById('fareCabSubtitle').textContent = cabSubtitle;
  document.getElementById('fareCabSimilar').textContent = cabName;

  const gstRate = 0.05;
  const gstAmount = Math.round(cabPrice * gstRate);
  const paymentDue = cabPrice - gstAmount;
  const advanceAmount = Math.round(cabPrice * 0.2);

  document.getElementById('totalTripFare').textContent = `₹ ${cabPrice}`;
  document.getElementById('gstCharges').textContent = `₹ ${gstAmount}`;
  document.getElementById('paymentDue').textContent = `₹ ${paymentDue}`;
  document.getElementById('couponDiscount').textContent = `₹ 0`;
  document.getElementById('advanceAmount').textContent = `₹ ${advanceAmount}.00`;

  document.getElementById('checkCouponBtn').addEventListener('click', () => {
    alert('Coupon check abhi implement nahi hui hai.');
  });

  document.getElementById('payNowBtn').addEventListener('click', () => {
    const name = document.getElementById('guestName').value.trim();
    const email = document.getElementById('guestEmail').value.trim();
    const guestMobile = document.getElementById('guestMobile').value.trim();
    const paymentType = document.getElementById('paymentTypeSelect').value;

    if (!name) { alert('Please enter guest name.'); return; }
    if (!guestMobile || !/^\d{10}$/.test(guestMobile)) { alert('Please enter a valid mobile number.'); return; }

    if (paymentType === 'driver') {
      // Pay to Driver -> no online payment, seedha booking confirm karo
      const text = `Booking Confirmed!\nName: ${name}\nMobile: ${guestMobile}\nCab: ${cabSubtitle}\nFare: ₹${cabPrice}\nPayment: Pay to Driver (Cash/UPI on arrival)\nRoute: ${from} -> ${to}\nDate & Time: ${dateTime}`;
      window.open(`https://wa.me/918737993690?text=${encodeURIComponent(text)}`, '_blank');
      alert('Aapki booking confirm ho gayi hai! Payment driver ko trip ke time karna hoga.');
    } else {
      // Advance / Full Payment -> online payment gateway (baad mein integrate karenge)
      alert('Payment gateway abhi integrate nahi hui — ye agla step hoga.');
    }
  });

  // GST checkbox toggle
  const guestGST = document.getElementById('guestGST');
  const gstFields = document.getElementById('gstFields');
  if (guestGST && gstFields) {
    guestGST.addEventListener('change', () => {
      gstFields.style.display = guestGST.checked ? 'block' : 'none';
    });
  }

  // Flight Number checkbox toggle
  const guestFlight = document.getElementById('guestFlight');
  const flightFields = document.getElementById('flightFields');
  if (guestFlight && flightFields) {
    guestFlight.addEventListener('change', () => {
      flightFields.style.display = guestFlight.checked ? 'block' : 'none';
    });
  }

  // Payment type dropdown -> update advance amount shown
  const paymentTypeSelect = document.getElementById('paymentTypeSelect');
  if (paymentTypeSelect) {
    paymentTypeSelect.addEventListener('change', () => {
      const type = paymentTypeSelect.value;
      if (type === 'advance') {
        document.getElementById('advanceAmount').textContent = `₹ ${advanceAmount}.00`;
      } else if (type === 'full') {
        document.getElementById('advanceAmount').textContent = `₹ ${cabPrice}`;
      } else if (type === 'driver') {
        document.getElementById('advanceAmount').textContent = `₹ 0`;
      }
    });
  }

});
