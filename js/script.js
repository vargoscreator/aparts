document.addEventListener("DOMContentLoaded", function () {
    const body = document.querySelector('.body');
    const burger = document.querySelector('.header__burger');
    const menuContent = document.querySelector('.header__menu-content');
    const menuClose = document.querySelector('.header__menu-close');
    burger.addEventListener('click', () => {
        menuContent.classList.add('active');
        body.classList.add('no-scroll');
    });
    menuClose.addEventListener('click', () => {
        menuContent.classList.remove('active');
        body.classList.remove('no-scroll');
    });
    window.addEventListener('load', checkScreenWidth);
    window.addEventListener('resize', checkScreenWidth);
    function checkScreenWidth() {
        if (window.innerWidth > 767) {
            menuContent.classList.remove('active');
            body.classList.remove('no-scroll');
            headerLinkOpen.classList.remove('active');
        }
    }
    const searchButton = document.querySelector('.header__search-button');
    const searchBlock = document.querySelector('.header__search');
    searchButton.addEventListener('click', function(event) {
        event.stopPropagation();
        searchBlock.classList.toggle('active');
    });
    document.addEventListener('click', function(event) {
        if (!searchBlock.contains(event.target) && !searchButton.contains(event.target) && window.innerWidth < 768) {
            searchBlock.classList.remove('active');
        }
        if (!document.querySelector('.header__box').contains(event.target) && window.innerWidth > 767) {
            headerLinkOpen.classList.remove('active');
        }
    });
    const headerLinkOpen = document.querySelector('.header__link-open');
    headerLinkOpen.addEventListener('click', function(event) {
        event.stopPropagation();
        headerLinkOpen.classList.toggle('active');
    });
});
