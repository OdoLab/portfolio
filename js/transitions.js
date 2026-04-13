function handleEntries(entries) {
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].isIntersecting) {
      entries[i].target.classList.add('visible');
    } else {
      entries[i].target.classList.remove('visible');
    }
  }
}

var observer = new IntersectionObserver(handleEntries, {threshold: 0.4});

var sections = document.querySelectorAll('section');
for (var i = 0; i < sections.length; i++) {
  observer.observe(sections[i]);
}