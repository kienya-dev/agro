(() => {
    "use strict";
    document.addEventListener("DOMContentLoaded", (() => {
        const body = document.querySelector("body");
        body.classList.remove("preload");
        const isWebp = () => {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(webP.height == 2);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = support === true ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        };
        isWebp();
        const menuToggles = document.querySelectorAll("[data-nav-button]");
        if (menuToggles.length) {
            const toggleMenu = toggler => {
                const boxMenu = toggler.closest("[data-nav-box]");
                const menu = boxMenu.querySelector("[data-nav-list]");
                const links = boxMenu.querySelectorAll("a");
                const icon = boxMenu.querySelector(".catalog-nav__icon");
                toggler.classList.toggle("nav__button_active");
                menu.classList.toggle("nav__box_active");
                if (icon) icon.classList.toggle("catalog-nav__icon_active");
                links.forEach((link => link.addEventListener("click", (() => {
                    toggler.classList.remove("nav__button_active");
                    menu.classList.remove("nav__box_active");
                    if (icon) icon.classList.toggle("catalog-nav__icon_active");
                }))));
            };
            menuToggles.forEach((toggler => toggler.addEventListener("click", (() => toggleMenu(toggler)))));
        }
    }));
})();