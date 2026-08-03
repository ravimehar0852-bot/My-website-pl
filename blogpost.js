// Related articles - same blogData jaisa homepage blog slider mein hai
const relatedBlogsData = [
  { image: "images/blog-chardham.jpg", title: "Chardham Yatra Taxi Package Plan Your Chardham Yatra 2026 with..", link: "blog-chardham.html" },
  { image: "images/blog-haridwar-rishikesh.jpg", title: "Haridwar Rishikesh Taxi Package from KTS Cabs a Perfect Way to..", link: "blog-haridwar-rishikesh.html" },
  { image: "images/blog-dudhwa.jpg", title: "Dudhwa National Park Tour Package Plan your Dudhwa..", link: "blog-dudhwa.html" },
  { image: "images/blog-ayodhya-prayagraj.jpg", title: "Ayodhya to Prayagraj Distance Route and Time", link: "blog-ayodhya-prayagraj.html" }
];

document.addEventListener('DOMContentLoaded', () => {

  // FAQ accordion
  const faqItems = document.querySelectorAll('.blogpost-faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.blogpost-faq-q');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // Related articles render
  const relatedList = document.getElementById('relatedBlogList');
  if (relatedList) {
    relatedList.innerHTML = relatedBlogsData.map(item => `
      <a href="${item.link}" class="blogpost-related-card">
        <img src="${item.image}" alt="${item.title}" class="blogpost-related-img">
        <p class="blogpost-related-title">${item.title}</p>
      </a>
    `).join('');
  }

  // Send Now button
  const sendBtn = document.getElementById('blogSendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const name = document.getElementById('blogName').value.trim();
      const phone = document.getElementById('blogPhone').value.trim();
      const message = document.getElementById('blogMessage').value.trim();

      if (!name || !phone) {
        alert('Please enter your name and phone number.');
        return;
      }
      if (!/^\d{10}$/.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
      }

      const text = `Enquiry from Blog Page:\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
      window.open(`https://wa.me/918737993690?text=${encodeURIComponent(text)}`, '_blank');
    });
  }

});
