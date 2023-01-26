# Visiology vidget modifications



## 100. Круговая диаграмма

#### 100.100	Cумма в центре

```javascript
"<b>" + @total + "</b>"
```

## 150. Фильтры

#### 150.100 Элементы

```javascript
// скрытие радиобаттонов выбора "включить" и "исключить"
$('#'+ w.general.renderTo +' div.rb-filter-exclude-container').css({'display': 'none'});

// кнопка Выбрать отображаемые
$("#" + w.general.renderTo + " .rb-filter-select-all-button").css({'background-color': 'tomato'});

// кнопка Снять выделение
$("#" + w.general.renderTo + " .rb-filter-unselect-all-button").css({'background-color': 'green'});


// кнопка отмена
$("#" + w.general.renderTo + " .rb-filter-cancel-button").css({'background-color': 'tomato'});

// кнопка применить
$("#" + w.general.renderTo + " .rb-filter-apply-button").css({'background-color': 'green'});

// весь выпадающий фильтр
rb-filter-body-container

// видимое всегда окошко фильтра
rb-filter-header-container
```

