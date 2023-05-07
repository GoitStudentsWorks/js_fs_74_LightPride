const goitStudentsLink = document.getElementById('goit-students-link');
const modal = document.getElementById('footer__modal');

goitStudentsLink.addEventListener('click', function (event) {
  event.preventDefault();
  modal.style.display = 'block';
});

modal.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    modal.style.display = 'none';
  }
});
