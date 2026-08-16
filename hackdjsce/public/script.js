const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const form = document.getElementById('regForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.textContent = 'Sending...';
  msg.className = '';
  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed.');
    msg.textContent = data.message || 'Registered successfully.';
    msg.className = 'ok';
    form.reset();
  } catch (err) {
    msg.textContent = err.message;
    msg.className = 'err';
  }
});
