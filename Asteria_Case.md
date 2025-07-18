# Кейс: Гостевой дом «Астерия» — остров Попова

---

## О проекте

**Гостевой дом «Астерия»** — современный сайт для уютного семейного отдыха на живописном острове Попова (Приморский край, Россия). Проект реализован с акцентом на лаконичность, удобство, визуальную привлекательность и максимальную информативность для гостей.

---

## Главные задачи
- Привлечь внимание к отдыху на острове и уникальным условиям гостевого дома
- Сделать бронирование и коммуникацию максимально простыми
- Подчеркнуть атмосферу уюта, природы и семейного отдыха
- Обеспечить узнаваемость бренда и единство визуального стиля во всех медиа

---

## Дизайн и визуальный стиль
 634e3f
### Основная палитра

| Цвет                | HEX        | Использование                        |
|---------------------|------------|--------------------------------------|
| Основной (коричневый) | `#634e3f`  | Фон футера, кнопки, акценты          |
| Светлый фон         | `#F5ECD7`  | Основной фон сайта                   |
| Акцентный (бежевый) | `#F9F6F1`  | Блоки, карточки, секции              |
| Вторичный (золотистый) | `#C9A063`  | Иконки, выделения, кнопки            |
| Текст основной      | `#3A2C1A`  | Заголовки, основной текст            |
| Текст светлый       | `#FFF`     | Текст на тёмном фоне                 |
| Акцент для ссылок   | `#A67C52`  | Ссылки, hover-эффекты                |
| Сезонные цвета      | `#3e9663` (тёплый), `#eca131` (жаркий), `#762f33` (бархатный) | Карточки сезонов |

> **Важно:**
> Все цвета согласованы и используются во всех элементах сайта, а также в медиа-контенте для соцсетей (VK, WhatsApp, YouTube).

### Типографика
- **Основной шрифт:** Montserrat (300–700)
- **Акцентный для сезонов:** Caveat (700), Marck Script (по желанию)
- **Базовый размер:** 16px, крупные заголовки — 32–48px
- **Кнопки и акценты:** жирное начертание, плавные анимации

### Иконки и графика
- Font Awesome 6 (минималистичные, современные)
- SVG-волны для разделения секций
- Круглые мини-иконки для сезонов
- Фотографии и webp-галерея с затемнением и пульсацией

---

## Интерактив и UX
- **Мобильное меню**: плавное открытие/закрытие, фирменная анимация бургер-меню
- **Кнопки**: пульсация (`.btn-pulse`), фирменный фокус, отсутствие стандартного синего outline
- **Галерея**: кнопка "Показать ещё" — как муляж фото с затемнением и анимацией
- **FAQ**: структурированные ответы с иконками, списками и подзаголовками
- **Сезоны**: карточки с мини-иконками, цветовой акцент по сезону
- **Футер**: подпись дизайнера, иконки соцсетей с пульсацией

---

## Социальные сети и коммуникация
- **VK**: Официальная группа — **Астерия — гостевой дом на о. Попова** (@asteriahome, club231544720)
- **WhatsApp**: Кнопка для мгновенной связи и бронирования
- **YouTube**: Иконка для будущих видеоматериалов
- **E-mail**: mail@asteriahome.ru (везде в контактах и структурированных данных)

---

## Базовые правила для дизайнеров и медиа-контента

1. **Цветовая палитра** — использовать только фирменные цвета (см. таблицу выше). Не допускается использование сторонних оттенков для основных элементов.
2. **Типографика** — строго Montserrat для основного текста, Caveat/Marck Script для акцентов (например, названия сезонов).
3. **Иконки** — только Font Awesome или фирменные SVG, стилизованные под сайт.
4. **Фотографии** — светлые, тёплые, с акцентом на природу, море, уют, семейную атмосферу. Галерея — только webp, горизонтальные и квадратные форматы.
5. **Анимации** — плавные, не отвлекающие, пульсация для кнопок и иконок.
6. **Соцсети** — оформление постов, сторис и обложек в едином стиле: фирменный фон, цвета, шрифты, иконки, логотип.
7. **Логотип** — всегда на светлом или фирменном коричневом фоне, без искажений.
8. **Контент** — лаконичность, структурированность, акцент на преимуществах, удобстве и атмосфере.
9. **Адаптивность** — все макеты и медиа должны хорошо смотреться на мобильных устройствах.
10. **Вода и волны** — SVG-волны как фирменный элемент для разделения блоков и в медиа.

---

## Примеры интерактивных элементов

- **Пульсирующая кнопка**
  ```html
  <a href="#booking" class="btn btn-primary btn-lg btn-pulse">Забронировать</a>
  ```
- **Мини-иконка сезона**
  ```html
  <span class="season-icon warm">
    <img src="images/webp/warm.webp" alt="Тёплый сезон" class="season-img-icon">
  </span>
  ```
- **Контакт в футере**
  ```html
  <li><i class="fas fa-envelope"></i> <a href="mailto:mail@asteriahome.ru">mail@asteriahome.ru</a></li>
  ```

---

## SEO и структура
- Все мета-теги, Open Graph, VK, WhatsApp, структурированные данные schema.org
- Favicon всех форматов
- Актуальные контакты и ссылки на соцсети
- Адаптивная верстка, современный HTML5, CSS3, JS

---

## Итог

Сайт «Астерия» — это современный, визуально цельный и удобный проект, который легко масштабируется и поддерживает единый стиль во всех медиа. Все дизайнеры и контент-менеджеры могут использовать этот кейс как базу для создания новых материалов, не теряя фирменную атмосферу и узнаваемость бренда.

> **Дизайн сайта — by [SH Studio](https://www.shstudiodev.ru/)** 