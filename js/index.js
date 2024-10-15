let heroSwiper = new Swiper(".hero__slider", {
    loop: true,
    spaceBetween: 0,
    slidesPerView: 1,
    allowTouchMove: true,
    navigation: {
        nextEl: ".hero__slide-next",
        prevEl: ".hero__slide-prev",
    },
    autoplay: {
        delay: 3000,
    },
});
const sliders = document.querySelectorAll('.popular__content');
sliders.forEach(content => {
    const swiperContainer = content.querySelector('.popular__slider');
    const prevButton = content.querySelector('.popular__slide-prev');
    const nextButton = content.querySelector('.popular__slide-next');
    new Swiper(swiperContainer, {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 1,
        allowTouchMove: true,
        navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
        },
        autoplay: {
            delay: 3000,
        },
        breakpoints: {
            480: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 3,
            },
            1000: {
                slidesPerView: 4,
            },
        },
    });
});



document.getElementById('vin-search-btn').addEventListener('click', function() {
    const vin = document.getElementById('vin-input').value.trim();
    if (vin) {
        // Отправляем данные на сервер
        fetch('send.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'vin=' + encodeURIComponent(vin)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = 'result.html';
            }
        })
        .catch(error => {
            console.error('Помилка:', error);
        });
    } else {
        alert('Будь ласка, введіть VIN-код.');
    }
});

document.getElementById('search-btn').addEventListener('click', function() {
    const vin = document.getElementById('vin-input').value.trim();
    const mark = document.getElementById('mark-select').value;
    const model = document.getElementById('model-select').value;

    // Проверяем, какой тип поиска требуется
    if (vin && window.innerWidth > 767) {
        // для теста
        alert('Поиск по VIN-коду: ' + vin);


        // Отправляем данные на сервер
        fetch('send.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'vin=' + encodeURIComponent(vin)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = 'results.html';
            }
        })
        .catch(error => {
            console.error('Помилка:', error);
        });
    } else if (mark && model) {
        // для теста
        alert('Поиск по параметрам: Марка - ' + mark + ', Модель - ' + model);


        // Отправляем данные на сервер
        fetch('send.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'mark=' + encodeURIComponent(mark) + '&model=' + encodeURIComponent(model)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = 'results.html';
            }
        })
        .catch(error => {
            console.error('Помилка:', error);
        });
    } else {
        if (window.innerWidth > 767) {
            alert('Будь ласка, введіть VIN-код або виберіть марку і модель.');   
        }
        else{
            alert('Будь ласка виберіть марку і модель.');
        }
        
    }
});