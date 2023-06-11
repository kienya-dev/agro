import "../scss/style.scss";
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

import "../scss/base/swiper.scss";
import "../scss/libs/swiper.scss";
import 'swiper/css';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body')

    function initSliders() {
        if (document.querySelector('[data-main-slider]')) {
            new Swiper('[data-main-slider]', {
                modules: [Pagination, Autoplay],
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: true,
                speed: 800,
                loop: true,
                autoplay: {
                    delay: 10000,
                    disableOnInteraction: true,
                },
                pagination: {
                    el: '.main-section__slider-pagination',
                    clickable: true,
                }
            });
        }

        if (document.querySelector('[data-catalog-slider]')) {
            new Swiper('[data-catalog-slider]', {
                modules: [Navigation],
                slidesPerView: 2,
                spaceBetween: 24,
                autoHeight: true,
                speed: 800,
                loop: true,
                navigation: {
                    nextEl: ".catalog__control_right",
                    prevEl: ".catalog__control_left",
                },
                breakpoints: {
                    767.98: {
                        slidesPerView: 3,

                    },
                    991.98: {
                        slidesPerView: 4,
                    }
                }

            });
        }
    }

    initSliders();

    /*Возвращаем анимацию после загрузки DOM*/
    //============================================================================================================================================================================================================================================
    body.classList.remove('preload');

    /*Background .webp*/
    //============================================================================================================================================================================================================================================

    const isWebp = () => {
        // Проверка поддержки webp
        function testWebP(callback) {
            let webP = new Image();
            webP.onload = webP.onerror = function () {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        // Добавление класса _webp или _no-webp для HTML
        testWebP(function (support) {
            let className = support === true ? 'webp' : 'no-webp';
            document.documentElement.classList.add(className);
        });
    }
    isWebp();

    /*Плавная прокрутка*/
    //============================================================================================================================================================================================================================================
    const btnUp = {
        el: document.querySelector('.footer__button'),
        addEventListener() {
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY || document.documentElement.scrollTop;
            });
            document.querySelector('.footer__button').onclick = () => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
    }
    btnUp.addEventListener();

    /* Burger menu*/
    //============================================================================================================================================================================================================================================
    const menuToggles = document.querySelectorAll('[data-nav-button]');

    if (menuToggles.length) {
        const toggleMenu = (toggler, classButton, classMenu) => {
            const boxMenu = toggler.closest('[data-nav-box]');
            const menu = toggler.classList.contains('button_contact') ? boxMenu.querySelectorAll('[data-nav-list]')[1] : boxMenu.querySelector('[data-nav-list]');
            const links = boxMenu.querySelectorAll('a');
            const icon = boxMenu.querySelector('.catalog-nav__icon');
            const overlay = document.querySelector('.overlay');
            const catalogNav = document.querySelector('.catalog-nav')
            toggler.classList.toggle(classButton);
            body.classList.toggle('lock');
            overlay.classList.toggle('overlay_active');
            menu.classList.toggle(classMenu);

            if (catalogNav && toggler.classList.contains('catalog-nav__button')) {
                catalogNav.classList.toggle('catalog-nav_active');
            }

            if (icon) {
                icon.classList.toggle('catalog-nav__icon_active');
            }

            links.forEach(link => link.addEventListener('click', () => {
                const parent = link.closest('li');
                if (!parent.classList.contains('header__item_down') && !parent.classList.contains('drop-down__item')) {
                    toggler.classList.remove(classButton);
                    menu.classList.remove(classMenu);
                    body.classList.remove('lock');
                    overlay.classList.remove('overlay_active');
                    if (icon) {
                        icon.classList.remove('catalog-nav__icon_active');
                    }
                    if (catalogNav) {
                        catalogNav.classList.remove('catalog-nav_active');
                    }

                }
            }))

            overlay.addEventListener('click', () => {
                toggler.classList.remove(classButton);
                menu.classList.remove(classMenu);
                body.classList.remove('lock');
                overlay.classList.remove('overlay_active');
                if (icon) {
                    icon.classList.remove('catalog-nav__icon_active');
                }
                if (catalogNav) {
                    catalogNav.classList.remove('catalog-nav_active');
                }

            })
        };

        menuToggles.forEach(toggler => {
            toggler.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMenu(toggler, toggler.getAttribute('data-nav-button'), toggler.getAttribute('data-nav-menu'));
            })
        });

    }

    /* Accordion*/
    //============================================================================================================================================================================================================================================
    class Accordion {
        constructor(target, config) {
            this._el = typeof target === 'string' ? document.querySelector(target) : target;
            const defaultConfig = {
                alwaysOpen: true,
                duration: 150
            };
            this._config = Object.assign(defaultConfig, config);
            this.addEventListener();
        }
        addEventListener() {
            this._el.addEventListener('click', (e) => {
                const elHeader = e.target.closest('.accordion__header');
                if (!elHeader) {
                    return;
                }
                if (!this._config.alwaysOpen) {
                    const elOpenItem = this._el.querySelector('.accordion__item_show');
                    if (elOpenItem) {
                        elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null;
                    }
                }
                this.toggle(elHeader.parentElement);
            });
        }
        show(el) {
            const elBody = el.querySelector('.accordion__body');
            if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
                return;
            }
            elBody.style['display'] = 'block';
            const height = elBody.offsetHeight;
            elBody.style['height'] = 0;
            elBody.style['overflow'] = 'hidden';
            elBody.style['transition'] = `height ${this._config.duration}ms ease`;
            elBody.classList.add('collapsing');
            el.classList.add('accordion__item_slidedown');
            elBody.offsetHeight;
            elBody.style['height'] = `${height}px`;
            el.classList.add('accordion__item_show');
            window.setTimeout(() => {
                elBody.classList.remove('collapsing');
                el.classList.remove('accordion__item_slidedown');
                elBody.classList.add('collapse');

                elBody.style['display'] = '';
                elBody.style['height'] = '';
                elBody.style['transition'] = '';
                elBody.style['overflow'] = '';
            }, this._config.duration);
        }
        hide(el) {
            const elBody = el.querySelector('.accordion__body');
            if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
                return;
            }
            elBody.style['height'] = `${elBody.offsetHeight}px`;
            elBody.offsetHeight;
            elBody.style['display'] = 'block';
            elBody.style['height'] = 0;
            elBody.style['overflow'] = 'hidden';
            elBody.style['transition'] = `height ${this._config.duration}ms ease`;
            elBody.classList.remove('collapse');
            el.classList.remove('accordion__item_show');
            elBody.classList.add('collapsing');
            window.setTimeout(() => {
                elBody.classList.remove('collapsing');
                elBody.classList.add('collapse');
                elBody.style['display'] = '';
                elBody.style['height'] = '';
                elBody.style['transition'] = '';
                elBody.style['overflow'] = '';
            }, this._config.duration);
        }
        toggle(el) {
            el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
        }
    }

    const accordion = document.querySelector('[data-accordion-product]');

    if (accordion) {
        new Accordion(accordion, {
            alwaysOpen: false
        });
    }

    const dropLinks = document.querySelectorAll('.header__link');

    if (dropLinks.length) {
        dropLinks.forEach(link => {
            const nextElement = link.nextElementSibling;
            if (nextElement && nextElement.classList.contains('drop-down')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const parent = link.closest('.header__list');
                    const links = document.querySelectorAll('.header__item_down > .header__link_down_active');
                    links.forEach(item => {
                        const parent = item.closest('li');
                        const target = e.target.closest('li')
                        if (item !== link && !target.classList.contains('drop-down__item')) {
                            const parent1 = item.closest('ul');
                            parent.querySelector('.drop-down_active').classList.remove('drop-down_active')
                            item.classList.toggle('header__link_down_active');
                        }
                    })
                    const list = nextElement;
                    link.classList.toggle('header__link_down_active');
                    list.classList.toggle('drop-down_active');
                })
            }
        })
    }

});




