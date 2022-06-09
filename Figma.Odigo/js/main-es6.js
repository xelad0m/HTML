(function() {
    // выбор элемента по имени класса (первый совпавший)
    const header = document.querySelector('.header') 

    // по событию onscroll вызывать функцию
    // тут - стрелочная функция без параметров
    window.onscroll = () => {
        // если сдвинуто >50 пикселей
        if (window.pageYOffset > 50) {
            // добавить хедеру новый класс
            header.classList.add('header_active')
        } else {
            // иначе, убрать этот класс
            header.classList.remove('header_active')
        }
    };
}());

// Burger handler
(function() {
    // переменные для нужных объектов 
    const burgerItem = document.querySelector('.burger');
    // меню - для добавления убирания селектора активности
    const menu = document.querySelector('.header__nav');
    // кнопка закрытия меню
    const menuCloseItem = document.querySelector('.header__nav-close');
    // ссылки в мини менб - для обработчиков нажатия, чтоб закрывать бургер-меню
    const menuLinks = document.querySelectorAll('.header__link')
    // console.log(burgerItem); // OK

    burgerItem.addEventListener('click', () => {
        // console.log('Clicked'); // OK
        // при клике применяться класс .header__nav_active
        menu.classList.add('header__nav_active');
    });

    menuCloseItem.addEventListener('click', () => {
        // аналогично - закрытие
        menu.classList.remove('header__nav_active');
    });
    
    // добавим обработчики события нажатия на пункты бургер-меню
    // для его закрытия
    if (window.innerWidth <= 767) {
        // console.log('Close burger menu')
        for (let i = 0; i < menuLinks.length; i += 1) {
            menuLinks[i].addEventListener('click', () => {
                menu.classList.remove('header__nav_active');
            });
        }
    }
}());

// Scroll to anchors
(function () {
    // функция плавной прокрутки (целевой элемент, длительность анимации)
    const smoothScroll = function (targetEl, duration) {
        // в переменную - высоту хедера, чтоб не заползало под хедер
        const headerElHeight =  document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        // вычитаем высоту хедера из top координаты целевого элемента
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;
        
        // линейная функция прокрутки
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
        
        // функция анимации
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    // подвесить обработчик события элементам с нужным классом
    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());