// Smooth nav highlight on scroll
const sections = document.querySelectorAll('section[id]')
const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]')

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'))
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`)
      if (active) active.classList.add('active')
    }
  })
}, { rootMargin: '-40% 0px -55% 0px' })

sections.forEach(s => observer.observe(s))

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open')
  })
})

// Contact form — show success message (works with Netlify forms or plain submit)
function handleSubmit(e) {
  const form = e.target
  // If deployed on Netlify, let the native submit happen and redirect
  // For GitHub Pages (no server), show inline success
  if (!window.location.hostname.includes('netlify')) {
    e.preventDefault()
    form.closest('section').querySelector('#form-success').classList.remove('hidden')
    form.style.display = 'none'
  }
}

// Subtle entrance animations
const animateOnScroll = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1'
      e.target.style.transform = 'translateY(0)'
      animateOnScroll.unobserve(e.target)
    }
  })
}, { threshold: 0.1 })

document.querySelectorAll('.feature-card, .persona-card, .step, .preview-card').forEach(el => {
  el.style.opacity = '0'
  el.style.transform = 'translateY(24px)'
  el.style.transition = 'opacity .4s ease, transform .4s ease'
  animateOnScroll.observe(el)
})
