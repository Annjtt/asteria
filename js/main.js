/**
 * Скрипт для сайта гостевого дома "Астерия"
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Скролл навигации
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');

    const heroSection = document.getElementById('home');
    let heroHeight = heroSection ? heroSection.offsetHeight : 0;

    function updateBackToTop(scrollY) {
        if (scrollY > heroHeight - 20) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
    }

    // --- Smooth Scrollbar логика ---
    let scrollbar = null;
    if (window.Scrollbar) {
        scrollbar = Scrollbar.init(document.getElementById('scroll-container'), {
            damping: 0.05,
            alwaysShowTracks: true
        });
    }

    const sections = document.querySelectorAll('section[id]');

    if (scrollbar) {
        scrollbar.addListener(({ offset }) => {
            updateBackToTop(offset.y);
            // Подсветка активной секции
            const scrollY = offset.y;
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
                if (!navLink) return;
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            });
        });
    }

    // Плавный скролл для якорных ссылок через Smooth Scrollbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target && scrollbar) {
                    e.preventDefault();
                    const rect = target.getBoundingClientRect();
                    const containerRect = document.getElementById('scroll-container').getBoundingClientRect();
                    const offset = rect.top - containerRect.top + scrollbar.scrollTop - 80;
                    scrollbar.scrollTo(0, offset, 800);
                }
            }
        });
    });

    // Фильтрация галереи
    const galleryFilter = document.querySelector('#gallery-filter');
    const galleryContainer = document.querySelector('#gallery-container');
    
    if (galleryFilter && galleryContainer) {
        galleryFilter.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-link')) {
                const filter = e.target.getAttribute('data-filter');
                
                // Удаляем active у всех фильтров и добавляем для выбранного
                galleryFilter.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                e.target.classList.add('active');
                
                // Фильтруем элементы галереи
                if (filter === 'all') {
                    galleryContainer.querySelectorAll('.gallery-item').forEach(item => {
                        item.style.display = 'block';
                    });
                } else {
                    galleryContainer.querySelectorAll('.gallery-item').forEach(item => {
                        if (item.classList.contains(filter)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            }
        });
    }

    // Динамическая загрузка номеров
    const loadRooms = function() {
        const roomsContainer = document.querySelector('#rooms .row:nth-child(2)');
        if (!roomsContainer) return;

        // Данные о номерах (в реальном проекте эти данные могут загружаться с сервера)
        const rooms = [
            {
                name: 'Стандартный номер',
                price: '3000₽',
                image: 'images/webp/room2-3.webp',
                description: 'Уютный номер для семьи из 2-3 человек.',
                features: [
                    { icon: 'fa-user', text: '<strong>2-3 гостей</strong>' },
                    { icon: 'fa-bed', text: '<strong>Одна 2-х</strong> спальная и <strong>одна 1,5</strong> спальная кровати' },
                    { icon: 'fa-bath', text: 'Санузел на этаже' },
                    { icon: 'fa-info-circle', text: '<strong>6</strong> номеров' },
                ]
            },
            {
                name: 'Двухместный номер',
                price: '3000₽',
                image: 'images/webp/room-standard.webp',
                description: 'Уютный номер для 1-2 человек, отлично подойдёт для друзей или пары.',
                features: [
                    { icon: 'fa-user', text: '<strong>1-2 гостя</strong>' },
                    { icon: 'fa-bed', text: '<strong>Две 1,5</strong> спальные кровати для двух гостей' },
                    { icon: 'fa-bath', text: 'Санузел на этаже' },
                    { icon: 'fa-info-circle', text: '1 номер' },
                ]
            },
            {
                name: 'Одноместный номер',
                price: '1800₽',
                image: 'images/webp/single-room.webp',
                description: 'Уютный номер для 1 человека с возможностью дополнительного места.',
                features: [
                    { icon: 'fa-user', text: '<strong>1-2 гостя</strong>' },
                    { icon: 'fa-bed', text: '<strong>Одна 1,5</strong> спальная кровать + <strong>Тахта</strong>' },
                    { icon: 'fa-bath', text: 'Санузел на этаже' },
                    { icon: 'fa-info-circle', text: '<strong>1</strong> номер' },
                ]
            }
        ];

        // Генерируем HTML для каждого номера
        rooms.forEach(room => {
            const roomHTML = `
                <div class="col-md-4">
                    <div class="room-card">
                        <div class="room-image">
                            <img src="${room.image}" alt="${room.name}">
                        </div>
                        <div class="room-details">
                            <h3 class="room-name">${room.name}</h3>
                            <div class="room-price">от ${room.price} / сутки</div>
                            <p>${room.description}</p>
                            <ul class="room-features">
                                ${room.features.map(feature => `
                                    <li><i class="fas ${feature.icon}"></i> ${feature.text}</li>
                                `).join('')}
                            </ul>
                            <div class="d-flex justify-content-center mt-3">
                                <a href="#booking" class="btn btn-outline-primary btn-sm room-book-btn">Забронировать</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            roomsContainer.innerHTML += roomHTML;
        });

        // Добавляем обработчик для плавного скролла по кнопке 'Забронировать'
        setTimeout(() => {
            document.querySelectorAll('.room-book-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const bookingSection = document.getElementById('booking');
                    const scrollContainer = document.getElementById('scroll-container');
                    if (bookingSection && window.Scrollbar && scrollbar && scrollContainer) {
                        const rect = bookingSection.getBoundingClientRect();
                        const containerRect = scrollContainer.getBoundingClientRect();
                        const offset = rect.top - containerRect.top + scrollbar.scrollTop - 80;
                        scrollbar.scrollTo(0, offset, 800);
                    } else if (bookingSection) {
                        bookingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        }, 100);
    };

    // Загрузка FAQ вопросов
    const loadFAQ = function() {
        const faqContainer = document.querySelector('#faqAccordion');
        if (!faqContainer) return;

        // Данные о вопросах и ответах
        const faqs = [
            {
                question: 'Как добраться до острова Попова?',
                answer: '<b>До острова Попова можно добраться на пассажирском катере с Корабельной набережной города Владивостока.</b> Время в пути около 50 минут. Расписание катеров зависит от сезона, но обычно они ходят несколько раз в день.'
            },
            {
                question: 'Что включено в стоимость проживания?',
                answer: '<b>В стоимость проживания включено:</b> размещение в выбранном номере, пользование общей кухней, зоной барбекю, душем с горячей водой. <b>Питание оплачивается отдельно или можно готовить самостоятельно.</b>'
            },
            {
                question: 'Можно ли с домашними животными?',
                answer: '<b>К сожалению,</b> размещение с домашними животными <b>не предусмотрено</b> для обеспечения комфорта всех гостей и поддержания чистоты в помещениях.'
            },
            {
                question: 'Есть ли на острове магазины?',
                answer: '<b>Да,</b> на острове достаточно продуктовых магазинов, где можно приобрести основные продукты питания. <b>Однако ассортимент ограничен,</b> поэтому рекомендуется привозить специфические продукты с собой.'
            },
            {
                question: 'Какие развлечения доступны на острове?',
                answer: '<b>Остров Попова предлагает множество возможностей для активного отдыха:</b> пляжи для купания, прогулки по живописным тропам, рыбалка, сбор морепродуктов, катание на лодках и каяках. На территории гостевого дома есть зона барбекю для вечерних посиделок.'
            },
            {
                question: 'Как заранее забронировать номер?',
                answer: 'Забронировать номер можно по телефону <b>+7 924 252-79-10</b> - Для подтверждения бронирования может потребоваться предоплата.'
            }
        ];

        // Генерируем HTML для каждого вопроса
        faqs.forEach((faq, index) => {
            const faqHTML = `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading${index}">
                        <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#collapse${index}" 
                                aria-expanded="${index === 0 ? 'true' : 'false'}" 
                                aria-controls="collapse${index}">
                            ${faq.question}
                        </button>
                    </h2>
                    <div id="collapse${index}" 
                         class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" 
                         aria-labelledby="heading${index}" 
                         data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            ${faq.answer}
                        </div>
                    </div>
                </div>
            `;
            faqContainer.innerHTML += faqHTML;
        });
    };

    // Загрузка галереи
    const loadGallery = function() {
        const galleryContainer = document.querySelector('#gallery-container');
        if (!galleryContainer) return;

        // Данные о изображениях галереи (в реальном проекте эти данные могут загружаться с сервера)
        const galleryItems = [
            { image: 'images/webp/house.webp', category: 'house', title: 'Фасад дома' },
            { image: 'images/webp/gallery-3.webp', category: 'territory', title: 'Зона отдыха' },
            { image: 'images/webp/territory.webp', category: 'territory', title: 'Территория' },
            { image: 'images/webp/single-room.webp', category: 'rooms', title: 'Одноместный номер' },
            { image: 'images/webp/room2-3.webp', category: 'rooms', title: 'Семейный номер' },
            { image: 'images/webp/gallery-4.webp', category: 'beach', title: 'Пляж' },
            { image: 'images/webp/gallery-5.webp', category: 'island', title: 'Природа острова' },
            { image: 'images/webp/room-family.webp', category: 'rooms', title: 'Двухместный номер' },
            { image: 'images/webp/room-comfort.webp', category: 'rooms', title: 'Семейный номер' },
            { image: 'images/webp/gallery-2.webp', category: 'rooms', title: 'Стандартный номер' },
            { image: 'images/webp/gallery-6.webp', category: 'rooms', title: 'Гостинная' },
            { image: 'images/webp/gallery-7.webp', category: 'territory', title: 'Зона барбекю' },
            { image: 'images/webp/gallery-8.webp', category: 'beach', title: 'Вид на море' },
            { image: 'images/webp/gallery-9.webp', category: 'island', title: 'Закат на острове' },
            { image: 'images/webp/gallery-10.webp', category: 'beach', title: 'Закат на море' },
            { image: 'images/webp/gallery-11.webp', category: 'island', title: 'Природа острова' },
            { image: 'images/webp/gallery-12.webp', category: 'rooms', title: 'Гостинная' },
            { image: 'images/webp/gallery-1.webp', category: 'house', title: 'Фасад дома' }
        ];

        // Генерируем HTML для каждого изображения галереи
        galleryItems.forEach((item, idx) => {
            const galleryHTML = `
                <div class="col-md-4 gallery-item ${item.category}">
                    <div class="gallery-image" data-idx="${idx}" style="cursor:pointer;">
                        <img src="${item.image}" alt="${item.title}">
                        <div class="gallery-overlay">
                            <i class="fas fa-search-plus"></i>
                        </div>
                    </div>
                </div>
            `;
            galleryContainer.innerHTML += galleryHTML;
        });

        // --- Модальное окно для просмотра фото ---
        if (!document.getElementById('gallery-modal')) {
            const modal = document.createElement('div');
            modal.id = 'gallery-modal';
            modal.innerHTML = `
                <div class="gallery-modal-backdrop"></div>
                <div class="gallery-modal-content">
                    <button class="gallery-modal-close" aria-label="Закрыть">&times;</button>
                    <img src="" alt="" class="gallery-modal-img">
                    <div class="gallery-modal-caption"></div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        const modal = document.getElementById('gallery-modal');
        const modalImg = modal.querySelector('.gallery-modal-img');
        const modalCaption = modal.querySelector('.gallery-modal-caption');
        const modalClose = modal.querySelector('.gallery-modal-close');
        const modalBackdrop = modal.querySelector('.gallery-modal-backdrop');

        // Открытие модалки
        galleryContainer.querySelectorAll('.gallery-image').forEach(imgDiv => {
            imgDiv.addEventListener('click', function() {
                const idx = +this.getAttribute('data-idx');
                const item = galleryItems[idx];
                modalImg.src = item.image;
                modalImg.alt = item.title;
                modalCaption.textContent = item.title;
                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        });
        // Закрытие модалки
        function closeModal() {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
        modalClose.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);
        document.addEventListener('keydown', function(e) {
            if (modal.classList.contains('open') && (e.key === 'Escape' || e.key === 'Esc')) closeModal();
        });
    };

    // Автоматическое закрытие мобильного меню при выборе пункта
    const navbarCollapse = document.getElementById('navbarNav');
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992 && navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    // Запуск загрузки данных
    loadRooms();
    loadFAQ();
    loadGallery();

    // Кнопка "Наверх"
    if (scrollbar) {
        scrollbar.addListener(({ offset }) => {
            if (offset.y > heroHeight - 20) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            scrollbar.scrollTo(0, 0, 800);
        });
    }
});