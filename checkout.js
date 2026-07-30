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

    if (!name) { alert('Please enter guest name.'); return; }
    if (!guestMobile || !/^\d{10}$/.test(guestMobile)) { alert('Please enter a valid mobile number.'); return; }

    alert('Payment gateway abhi integrate nahi hui — ye agla step hoga.');
  });
});
