const currentNavigation = document.querySelectorAll('.navigation__link');
changeCurrentNavigation();

function changeCurrentNavigation() {
  currentNavigation[1].classList.add('current');
}
