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
                                <a href="#booking" class="btn btn-primary btn-pulse">Забронировать</a>
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
                answer: `
                    <div style="font-size: 1rem; line-height: 1.6;">
                        <b>Как добраться до острова Попова:</b>
                        
                        <ul style="margin-top: 12px; padding-left: 0; list-style: none;">
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-train-subway" style="color: var(--primary-color); margin-right: 8px;"></i>
                                Доехать до 
                                <a href="https://go.2gis.com/pOK1p " target="_blank" style="color: var(--primary-color); text-decoration: underline;">
                                    <b>Корабельной набережной, 30 ст. 2</b>
                                </a>
                                &nbsp;(пассажирский терминал во Владивостоке)
                            </li>
        
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-ship" style="color: var(--primary-color); margin-right: 8px;"></i>
                                Купить билет на водный пассажирский транспорт до о. Попова
                            </li>
        
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-clock" style="color: var(--primary-color); margin-right: 8px;"></i>
                                Время в пути — около 60 минут
                            </li>
        
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-bus" style="color: var(--primary-color); margin-right: 8px;"></i>
                                По прибытии на остров ходит <b>рейсовый автобус по установленному маршруту</b> с остановками
                            </li>
        
                            <li>
                                <i class="fas fa-person-walking" style="color: var(--primary-color); margin-right: 8px;"></i>
                                От пристани до гостевого дома — 20 минут пешком или трансфер по договорённости
                            </li>
                        </ul>
        
                        <div style="margin-top: 16px; font-size: 0.95em; color: #888;">
                            Возможна организация встречи с причала.
                        </div>
                    </div>
                `
            },
            {
                question: 'Каковы правила проживания в гостевом доме?',
                answer: `
                    <div style="font-size: 1rem; line-height: 1.6;">
                        <div style="font-weight: 600; margin-bottom: 4px;">
                            <i class="fas fa-info-circle" style="color: var(--primary-color); margin-right: 6px;"></i>Условия проживания:
                        </div>
                        <ul style="margin-top: 8px; margin-bottom: 0; padding-left: 0; list-style: none;">
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-door-open" style="color: var(--primary-color); margin-right: 6px;"></i>Время заезда и выезда — свободное, под расписание движения водного транспорта
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-user-lock" style="color: var(--primary-color); margin-right: 6px;"></i>Вход и выход на территорию — строго с 7:00 до 23:00 и только для проживающих
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-child" style="color: var(--primary-color); margin-right: 6px;"></i>Дети находятся под ответственностью родителей
                            </li>
                        </ul>
            
                        <div style="font-weight: 600; margin: 14px 0 4px 0;">
                            <i class="fas fa-ban" style="color: var(--primary-color); margin-right: 6px;"></i>Запрещено:
                        </div>
                        <ul style="margin-top: 4px; margin-bottom: 0; padding-left: 0; list-style: none;">
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-smoking-ban" style="color: var(--primary-color); margin-right: 6px;"></i>Курение в помещениях строго запрещено
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-volume-mute" style="color: var(--primary-color); margin-right: 6px;"></i>Просим соблюдать тишину с 21:00 до 8:00
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-fire-extinguisher" style="color: var(--primary-color); margin-right: 6px;"></i>Открытый огонь и свечи запрещены в помещениях
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-dog" style="color: var(--primary-color); margin-right: 6px;"></i>Проживание с животными не допускается
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-utensils" style="color: var(--primary-color); margin-right: 6px;"></i>Приготовление пищи в номерах запрещено
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-broom" style="color: var(--primary-color); margin-right: 6px;"></i>Соблюдайте чистоту в номерах и на территории
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-wine-bottle" style="color: var(--primary-color); margin-right: 6px;"></i>Запрещено чрезмерное употребление алкоголя
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-ban" style="color: var(--primary-color); margin-right: 6px;"></i>Нельзя портить имущество и нарушать порядок
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-users-slash" style="color: var(--primary-color); margin-right: 6px;"></i>Запрещено приводить посторонних без согласования
                            </li>
                        </ul>
            
                        <div style="margin-top: 14px; margin-bottom: 4px; font-weight: 600;">
                            <i class="fas fa-exclamation-triangle" style="color: var(--primary-color); margin-right: 6px;"></i>Штрафы и ответственность:
                        </div>
                        <ul style="margin-top: 4px; margin-bottom: 0; padding-left: 0; list-style: none;">
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-smoking-ban" style="color: var(--primary-color); margin-right: 6px;"></i>Курение в помещениях — штраф от 2000 ₽
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-ban" style="color: var(--primary-color); margin-right: 6px;"></i>Порча или утрата имущества — компенсация по стоимости
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-volume-up" style="color: var(--primary-color); margin-right: 6px;"></i>Нарушение тишины — штраф от 1000 ₽
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-key" style="color: var(--primary-color); margin-right: 6px;"></i>Утеря ключа или номерка — штраф 1000 ₽
                            </li>
                        </ul>
            
                        <div style="margin-top: 16px; font-size: 0.95em; color: #888;">
                            Благодарим за понимание и уважение к другим гостям!
                        </div>
                    </div>
                `
            },
            {
                question: 'Что включено в стоимость проживания?',
                answer: `
                    <div style="font-size: 1rem; line-height: 1.6;">
                        <b>В стоимость проживания входит:</b>
                        <ul style="margin-top: 8px; margin-bottom: 0; padding-left: 0; list-style: none;">
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-bed" style="color: var(--primary-color); margin-right: 6px;"></i>Проживание в выбранном номере
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-utensils" style="color: var(--primary-color); margin-right: 6px;"></i>Пользование общей кухней
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-fire" style="color: var(--primary-color); margin-right: 6px;"></i>Зона барбекю
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-shower" style="color: var(--primary-color); margin-right: 6px;"></i>Душ с горячей водой
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-parking" style="color: var(--primary-color); margin-right: 6px;"></i>Бесплатная парковка
                            </li>
                        </ul>
            
                        <div style="margin-top: 16px; font-size: 0.95em; color: #888;">
                            Питание оплачивается отдельно или можно готовить самостоятельно.
                        </div>
                    </div>
                `
            },
            {
                question: 'Можно ли с домашними животными?',
                answer: `
                    <div style="font-size: 1rem; line-height: 1.6;">
                        <b>Размещение с домашними животными не предусмотрено:</b>
                        <ul style="margin-top: 8px; margin-bottom: 0; padding-left: 0; list-style: none;">
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-users" style="color: var(--primary-color); margin-right: 6px;"></i>Для комфорта и уюта всех гостей
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-broom" style="color: var(--primary-color); margin-right: 6px;"></i>Для поддержания высокого уровня чистоты в помещениях
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-allergies" style="color: var(--primary-color); margin-right: 6px;"></i>Для предотвращения аллергических реакций у других отдыхающих
                            </li>
                        </ul>
            
                        <div style="margin-top: 16px; font-size: 0.95em; color: #888;">
                            Мы ценим ваше понимание и стараемся создать комфортные условия для каждого гостя. Благодарим за ответственность и уважение к правилам проживания.
                        </div>
                    </div>
                `
            },
            {
                question: 'Есть ли на острове магазины и аптеки?',
                answer: `
                    <div style="font-size: 1rem; line-height: 1.6;">
                        <div style="font-weight: 600; margin-bottom: 4px;">
                            <i class="fas fa-store" style="color: var(--primary-color); margin-right: 6px;"></i>Магазины:
                        </div>
                        <ul style="margin-top: 8px; margin-bottom: 0; padding-left: 0; list-style: none;">
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-shopping-basket" style="color: var(--primary-color); margin-right: 6px;"></i>На острове есть несколько продуктовых магазинов
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-box" style="color: var(--primary-color); margin-right: 6px;"></i>В продаже — основные продукты и товары первой необходимости
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-exclamation-circle" style="color: var(--primary-color); margin-right: 6px;"></i>Ассортимент ограничен, рекомендуем привозить специфические продукты с собой
                            </li>
                        </ul>
            
                        <div style="font-weight: 600; margin: 14px 0 4px 0;">
                            <i class="fas fa-clinic-medical" style="color: var(--primary-color); margin-right: 6px;"></i>Аптека:
                        </div>
                        <ul style="margin-top: 4px; margin-bottom: 0; padding-left: 0; list-style: none;">
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-clock" style="color: var(--primary-color); margin-right: 6px;"></i>Пн–Сб: 09:00–16:00 (обед 13:00–14:00), Вс — выходной
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-pills" style="color: var(--primary-color); margin-right: 6px;"></i>В продаже — только базовые и самые необходимые лекарства
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-exclamation-circle" style="color: var(--primary-color); margin-right: 6px;"></i>Личные и специфические препараты обязательно возьмите с собой
                            </li>
                        </ul>
            
                        <div style="margin-top: 16px; font-size: 0.95em; color: #888;">
                            Магазины работают ежедневно. Рекомендуем заранее позаботиться о необходимых лекарствах.
                        </div>
                    </div>
                `
            },
            {
                question: 'Какие развлечения доступны на острове?',
                answer: `
                    <div style="font-size: 1rem; line-height: 1.6;">
                        <b>На острове Попова доступны различные виды активного и спокойного отдыха:</b>
                        <ul style="margin-top: 8px; margin-bottom: 0; padding-left: 0; list-style: none;">
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-umbrella-beach" style="color: var(--primary-color); margin-right: 6px;"></i>Пляжи для купания
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-hiking" style="color: var(--primary-color); margin-right: 6px;"></i>Прогулки по живописным тропам
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-horse" style="color: var(--primary-color); margin-right: 6px;"></i>Прогулки на лошадях
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-map-marked-alt" style="color: var(--primary-color); margin-right: 6px;"></i>Экскурсии по острову и окрестностям
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-fish" style="color: var(--primary-color); margin-right: 6px;"></i>Рыбалка и сбор морепродуктов
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-ship" style="color: var(--primary-color); margin-right: 6px;"></i>Катание на лодках и катамаранах
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-fire" style="color: var(--primary-color); margin-right: 6px;"></i>Зона барбекю для вечерних посиделок
                            </li>
                        </ul>
                    </div>
                `
            },
            {
                question: 'Как устроен санузел в гостевом доме?',
                answer: `
                    <div style="font-size: 1rem; line-height: 1.6;">
                        <b>Санузлы в гостевом доме:</b>
                        <ul style="margin-top: 8px; margin-bottom: 0; padding-left: 0; list-style: none;">
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-toilet" style="color: var(--primary-color); margin-right: 6px;"></i>В доме оборудовано 2 туалета
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-stairs" style="color: var(--primary-color); margin-right: 6px;"></i>Один туалет расположен на 1 этаже, второй — на 2 этаже
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-hand-holding-water" style="color: var(--primary-color); margin-right: 6px;"></i>Каждый туалет оборудован унитазом и раковиной для удобства гостей
                            </li>
                        </ul>           
                        <div style="margin-top: 16px; font-size: 0.95em; color: #888;">
                            Санузлы поддерживаются в чистоте и доступны для всех проживающих.
                        </div>
                    </div>
                `
            },
            {
                question: 'Как заранее забронировать номер?',
                answer: `
                    <div style="font-size: 1rem; line-height: 1.6;">
                        <b>Бронирование номеров:</b>
                        <ul style="margin-top: 8px; margin-bottom: 0; padding-left: 0; list-style: none;">
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-phone-alt" style="color: var(--primary-color); margin-right: 6px;"></i>
                                Позвоните по номеру 
                                <a href="tel:+79242527910" style="color: var(--primary-color); font-weight:600; text-decoration:none;">
                                    +7 924 252-79-10
                                </a>
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-info-circle" style="color: var(--primary-color); margin-right: 6px;"></i>
                                Уточните наличие свободных номеров и детали проживания
                            </li>
                            <li style="margin-bottom: 10px;">
                                <i class="fas fa-credit-card" style="color: var(--primary-color); margin-right: 6px;"></i>
                                Для подтверждения бронирования может потребоваться предоплата
                            </li>
                        </ul>
            
                        <div style="margin-top: 16px; font-size: 0.95em; color: #888;">
                            Рекомендуем бронировать заранее — количество мест ограничено!
                        </div>
                    </div>
                `
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
            { image: 'images/webp/gallery-7.webp', category: 'territory', title: 'Зона барбекю' },
            { image: 'images/webp/room2-3.webp', category: 'rooms', title: 'Семейный номер' },
            { image: 'images/webp/gallery-4.webp', category: 'beach', title: 'Пляж' },
            { image: 'images/webp/gallery-5.webp', category: 'island', title: 'Природа острова' },
            { image: 'images/webp/room-family.webp', category: 'rooms', title: 'Двухместный номер' },
            { image: 'images/webp/room-comfort.webp', category: 'rooms', title: 'Семейный номер' },
            { image: 'images/webp/gallery-2.webp', category: 'rooms', title: 'Стандартный номер' },
            { image: 'images/webp/gallery-6.webp', category: 'rooms', title: 'Гостинная' },
            { image: 'images/webp/single-room.webp', category: 'rooms', title: 'Одноместный номер' },
            { image: 'images/webp/gallery-8.webp', category: 'beach', title: 'Вид на море' },
            { image: 'images/webp/gallery-9.webp', category: 'island', title: 'Закат на острове' },
            { image: 'images/webp/gallery-10.webp', category: 'beach', title: 'Закат на море' },
            { image: 'images/webp/gallery-11.webp', category: 'island', title: 'Природа острова' },
            { image: 'images/webp/gallery-12.webp', category: 'rooms', title: 'Гостинная' },
            { image: 'images/webp/gallery-1.webp', category: 'house', title: 'Фасад дома' }
        ];

        // --- Вспомогательная функция для рендера фото ---
        function renderGallery(items, showAll, filter) {
            galleryContainer.innerHTML = '';
            let toShow = items;
            let isAllTab = filter === 'all';
            if (isAllTab && !showAll && items.length > 5) {
                toShow = items.slice(0, 5);
            }
            toShow.forEach((item, idx) => {
            const galleryHTML = `
                    <div class="col-md-4 gallery-item ${item.category}" data-gallery-idx="${idx}">
                        <div class="gallery-image" data-idx="${galleryItems.indexOf(item)}" style="cursor:pointer;">
                        <img src="${item.image}" alt="${item.title}">
                        <div class="gallery-overlay">
                            <i class="fas fa-search-plus"></i>
                        </div>
                    </div>
                </div>
            `;
            galleryContainer.innerHTML += galleryHTML;
        });
            // Если вкладка "Все" и не все показаны — добавить блок "Показать ещё" как муляж шестой фотографии
            if (isAllTab && !showAll && items.length > 5) {
                const sixth = items[5];
                const showMoreHTML = `
                    <div class="col-md-4 gallery-item gallery-show-more" style="display:flex;align-items:center;justify-content:center;cursor:pointer;min-height:250px;position:relative;">
                        <div class="gallery-image" style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:1;">
                            <img src="${sixth.image}" alt="Показать ещё" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.6);">
                        </div>
                        <div class="show-more-block btn-pulse" style="text-align:center;width:100%;z-index:2;position:relative;">
                            <div style="font-size:2.2rem;color:#fff;margin-bottom:10px;"><i class="fas fa-images"></i></div>
                            <div style="font-size:1.1rem;font-weight:600;color:#fff;">Показать ещё</div>
                        </div>
                    </div>
                `;
                galleryContainer.innerHTML += showMoreHTML;
            }
        }

        // --- Основная логика фильтрации ---
        let showAllInAllTab = false;
        let currentFilter = 'all';
        function applyGalleryFilter(filter) {
            currentFilter = filter;
            showAllInAllTab = false;
            if (filter === 'all') {
                renderGallery(galleryItems, false, 'all');
            } else {
                renderGallery(galleryItems.filter(item => item.category === filter), true, filter);
            }
            attachGalleryEvents();
        }

        // --- События для фото и блока "Показать ещё" ---
        function attachGalleryEvents() {
            // Открытие модалки по фото
            galleryContainer.querySelectorAll('.gallery-image').forEach(imgDiv => {
                imgDiv.addEventListener('click', function() {
                    const idx = +this.getAttribute('data-idx');
                    showModal(idx);
                });
            });
            // Клик по "Показать ещё"
            const showMore = galleryContainer.querySelector('.gallery-show-more');
            if (showMore) {
                showMore.addEventListener('click', function() {
                    showAllInAllTab = true;
                    renderGallery(galleryItems, true, 'all');
                    attachGalleryEvents();
                });
            }
        }

        // --- Модальное окно для просмотра фото ---
        if (!document.getElementById('gallery-modal')) {
            const modal = document.createElement('div');
            modal.id = 'gallery-modal';
            modal.innerHTML = `
                <div class="gallery-modal-backdrop"></div>
                <div class="gallery-modal-content">
                    <button class="gallery-modal-close" aria-label="Закрыть">&times;</button>
                    <button class="gallery-modal-prev" aria-label="Предыдущее"><i class="fas fa-chevron-left"></i></button>
                    <img src="" alt="" class="gallery-modal-img">
                    <button class="gallery-modal-next" aria-label="Следующее"><i class="fas fa-chevron-right"></i></button>
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
        const modalPrev = modal.querySelector('.gallery-modal-prev');
        const modalNext = modal.querySelector('.gallery-modal-next');

        let currentIdx = 0;
        function showModal(idx) {
            currentIdx = (idx + galleryItems.length) % galleryItems.length;
            const item = galleryItems[currentIdx];
                modalImg.src = item.image;
                modalImg.alt = item.title;
                modalCaption.textContent = item.title;
                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
        }
        // Закрытие модалки
        function closeModal() {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
        modalClose.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);
        document.addEventListener('keydown', function(e) {
            if (!modal.classList.contains('open')) return;
            if (e.key === 'Escape' || e.key === 'Esc') closeModal();
            if (e.key === 'ArrowLeft') showModal(currentIdx - 1);
            if (e.key === 'ArrowRight') showModal(currentIdx + 1);
        });
        modalPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            showModal(currentIdx - 1);
        });
        modalNext.addEventListener('click', function(e) {
            e.stopPropagation();
            showModal(currentIdx + 1);
        });

        // --- События фильтра ---
        const galleryFilter = document.querySelector('#gallery-filter');
        if (galleryFilter) {
            galleryFilter.addEventListener('click', function(e) {
                if (e.target.classList.contains('nav-link')) {
                    const filter = e.target.getAttribute('data-filter');
                    // Удаляем active у всех фильтров и добавляем для выбранного
                    galleryFilter.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    e.target.classList.add('active');
                    applyGalleryFilter(filter);
                }
            });
        }
        // Первичная отрисовка
        applyGalleryFilter('all');
    };

    // Автоматическое закрытие мобильного меню при выборе пункта
    const navbarCollapse = document.getElementById('navbarNav');
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 1400 && navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    // --- Анимация появления и пульсации кнопки "Забронировать" в hero ---
    const heroBookBtn = document.querySelector('.hero-content .btn-hero-animate');
    if (heroBookBtn) {
        heroBookBtn.addEventListener('animationend', function(e) {
            if (e.animationName === 'fadeInUp') {
                heroBookBtn.classList.remove('btn-hero-animate');
                // Явно сбрасываем transform, чтобы не было конфликта
                heroBookBtn.style.transform = 'scale(1)';
                // Даем браузеру применить стиль (через requestAnimationFrame)
                requestAnimationFrame(() => {
                    heroBookBtn.classList.add('btn-pulse');
                    // Через небольшой таймаут убираем inline-стиль, чтобы работал только CSS
                    setTimeout(() => {
                        heroBookBtn.style.transform = '';
                    }, 10);
                });
            }
        });
    }

    // Добавляем ripple-эффект для всех кнопок
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            const oldRipple = btn.querySelector('.ripple');
            if (oldRipple) oldRipple.remove();
            const rect = btn.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            btn.appendChild(ripple);
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
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