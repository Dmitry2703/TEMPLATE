Шаблон проектного каталога

Запуск проекта:

1) git clone

2) npm i

3) gulp


Генерация svg-спрайта:

1) исходники svg - в папке src/img

2) шаблон, на основе которого генерируются стили для спрайта: src/scss/base/sprite-template.scss

3) стили для спрайта записываются в файл src/scss/base/icons.scss

4) сгенерированный файл со спрайтом: build/img/sprite.svg

5) для поддержки IE подключается библиотека svg4everybody: src/js/lib/svg4everybody.js

6) jade-миксин для вставки иконки из спрайта: src/templates/components/icons.jade

7) добавление иконки на страницу: +icon('icon name', 'icon modifier')