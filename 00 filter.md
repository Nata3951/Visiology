# Элементы

```javascript
// скрытие радиобаттонов выбора "включить" и "исключить"
$('#'+ w.general.renderTo +' div.rb-filter-exclude-container').css({'display': 'none'});

// кнопка Выбрать отображаемые
$("#" + w.general.renderTo + " .rb-filter-select-all-button").css({'display': 'none'});

// кнопка Снять выделение
$("#" + w.general.renderTo + " .rb-filter-unselect-all-button").css({'display': 'none'});

// список выбранных элементов
$("#" + w.general.renderTo + " .rb-filter-cloud-tag-container").css({'display': 'none'});



// кнопка применить
$("#" + w.general.renderTo + " .rb-filter-apply-button").css({'background-color': 'green'});

// кнопка отмена
$("#" + w.general.renderTo + " .rb-filter-cancel-button").css({'background-color': 'tomato'});

// весь выпадающий фильтр
rb-filter-body-container

// видимое всегда окошко фильтра
rb-filter-header-container
```

## Элементы без GUI

```javascript
const multiselect = true; // множественный выбор
const resetSelectedValues = true; // сбросить значения
const search = true; // поиск

let font_color1 = "#212121"


const wDup = JSON.parse(JSON.stringify(w))

const filterData = wDup.data.rows.map(row => {
    return ({
        id: row[0],
        text: row[0],
        lazyLoading: false
    })
})

wDup.data = {
    data: filterData,
    isTruncated: false,
    selected: []
}

FilterRender({
    filter: { 
        ...w.general, 
        multiselectEnabled: multiselect,
        resetSelectedValuesAllowed: resetSelectedValues,
        searchEnabled: search,
    },
    style: w.style,
    textStyle: w.textStyle,
    data: wDup.data
});

```

# Размер шрифта

```javascript

// размер шрифта в фильтре
$('#'+ w.general.renderTo +' .rb-filter-body-container *').css({'font-size': '22px'});

// Уменьшаем размер шрифта на кнопках
// кнопка Выбрать отображаемые
$("#" + w.general.renderTo + " .rb-filter-select-all-button").css({'font-size': '10px'});
// кнопка Снять выделение
$("#" + w.general.renderTo + " .rb-filter-unselect-all-button").css({'font-size': '10px'});
// кнопка применить
$("#" + w.general.renderTo + " .rb-filter-apply-button").css({'font-size': '10px'});
// кнопка отмена
$("#" + w.general.renderTo + " .rb-filter-cancel-button").css({'font-size': '10px'});
```


# отсортировать список в обратном порядке
```javascript
w.data.data =  w.data.data.reverse();
```

# Зависимость 

В: Есть два листа:
на первом листе есть фильтр по годам,где можно выбирать несколько значений (Например 2021,2020 год)
А на втором тоже есть фильтр по годам, но этот фильтр должен зависеть от фильтра с первого листа (если на первом выбирают 2021,2020, то на втором должен 2021 год, то есть последний год первого фильтра)

О: в основной фильтр в конец код
```javascript
visApi().onSelectedValuesChangedListener({widgetGuid: w.general.renderTo, guid: "123456"}, function (info) {
    localStorage.setItem('val', info.selectedValues[0]);
})
```

во второй тоже в конец
```javascript
visApi().setFilterSelectedValues(w.general.renderTo, [[localStorage.getItem('val')]])
```
В: Еще уточнение: 
selectedValues[1]- забирает первое значение в массиве, а как написать,чтобы он сравнивал со вторым значением и забирал большее значение
Потому что надо, если в первом фильтре выбрано (2021,2020), надо чтобы был больший год (2021), а 2021 может быть в  Values[0]


О: на главный (первый) фильтр можете добавить это перед передачей значения
а после уже "imax" передать на второй

```javascript
let iSelected = [];
for(let i = 0; i < w.data.selected.length; i++) {
    iSelected.push(w.data.selected[i].text);
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

let imax = getMaxOfArray(iSelected);
alert(imax);
```
## на двухуровневом фильтре последнюю доступную дату
```javascript

const currentYear = w.data.data.at(-1).text; // последняя доступная дата
const currentDate = w.data.data.at(-1).children.at(-1).text

visApi().setFilterSelectedValues(w.general.renderTo, [[currentYear, currentDate]], function (response) {});
```

## в множественном фильтре последнюю доступную дату и тот же период год назад
```javascript
// устанавливаем в фильтр последнюю дату и на год назад от доступной
const currentDate = w.data.data[w.data.data.length - 1].text; // последняя доступная дата
let lastDateFromCurrent = '';

const dateArr = currentDate.split(' ');

// ищем дату на год отличающуюся от последней доступной
w.data.data.map(el => {
    let elArr = el.text.split(' ');
    
    if (dateArr.length === 2 && elArr.length === 2) {
        if (dateArr[0] === elArr[0] && (Number(dateArr[1]) - 1) === Number(elArr[1])) {
            lastDateFromCurrent = el.text;
        }
    } else if (dateArr.length === 3 && elArr.length === 3) {
        if (dateArr[0] === elArr[0] && dateArr[1] === elArr[1] && (Number(dateArr[2]) - 1) === Number(elArr[2])) {
            lastDateFromCurrent = el.text;
        }
    }
});

visApi().setFilterSelectedValues(w.general.renderTo, [[currentDate], [lastDateFromCurrent]], function (response) {});
```
## на первом фильтре последнюю доступную дату, на втором - тот же период год назад
```javascript
// FILTER 1
// устанавливаем в фильтр последнюю доступную дату 
const currentDate = w.data.data[0].text; // последняя доступная дата

visApi().setFilterSelectedValues(w.general.renderTo, [[currentDate]], function (response) {});

// FILTER 2
function filterAndRender(info) {
    const wDup = JSON.parse(JSON.stringify(w));
    let selectedValue = (info?info.selectedValues:visApi().getSelectedValues(filterOneGuId))[0][0];
    
    // добавляем дату на год меньше от последней
    let selectedValueArr = selectedValue.split(' ');
    
    // ищем дату на год отличающуюся от последней доступной
    wDup.data.data.map(el => {
        let elArr = el.text.split(' ');
        
        
        if (selectedValueArr.length === 2 && elArr.length === 2) {
            if (selectedValueArr[0] === elArr[0] && (Number(selectedValueArr[1]) - 1) === Number(elArr[1])) {
                selected[0] = el;
            }
        } else if (selectedValueArr.length === 3 && elArr.length === 3) {
            if (selectedValueArr[0] === elArr[0] && selectedValueArr[1] === elArr[1] && (Number(selectedValueArr[2]) - 1) === Number(elArr[2])) {
                 selected[0] = el;
            }
        }
    });

// SIMPLIFIED:

// на сколько дней будем сдвигать
let shift = 7;

const filterOneGuId = '966fba8956664ac6813c0aaa9bab8e88';

setTimeout(() => {filterAndRender()}, 100);
visApi().onSelectedValuesChangedListener({guid: filterOneGuId, widgetGuid: filterOneGuId }, function (info) {filterAndRender(info)});


function filterAndRender(info) {
    let selectedDate = (info?info.selectedValues:visApi().getSelectedValues(filterOneGuId))[0][0];
    
    // рассчитываем дату на заданное количество дней меньше выбранной
    let selectedDateArr = selectedDate.split('-');

    let [year, month, day] = [selectedDateArr[0], selectedDateArr[1]-1, selectedDateArr[2]];

    let shiftedDate = new Date(year, month, day - shift);
    
    let [year_, month_, day_] = [shiftedDate.getFullYear(), shiftedDate.getMonth() + 1, shiftedDate.getDate()];
    
    let filterNew = `${year_}-${month_}-${day_}`;

    FilterRender({
        filter: w.general,
        style: w.style,
        textStyle: w.textStyle,
        data: w.data
    }); 
    
    visApi().setFilterSelectedValues(w.general.renderTo, [[filterNew]], function (response) {});
}



```
# Смена календарного разреза

```javascript
function changePOK(x)
{
    if (w.data.selected.length < 1){
        visApi().getWidgetDataByGuid(w.general.renderTo).then(function (widgetData) {
            var per = widgetData.data.rows[widgetData.data.rows.length - 1];
            visApi().setFilterSelectedValues(w.general.renderTo, [per], function (response) {});

//Если настроен шаблон для отображения
//$('#' + w.general.renderTo + ' .rb-filter-header-text span').text((new Date(per)).toLocaleDateString('ru-RU'));
        });
    }
}
//changePOK();
```

# установить в фильтр доступное значение из списка
```javascript
FilterRender({
    filter: w.general,
    style: w.style,
    textStyle: w.textStyle,
    data: w.data
});

function setPeriod(x)
{
    visApi().getWidgetDataByGuid(w.general.renderTo).then(function (widgetData) {
        var per = widgetData.data.rows[widgetData.data.rows.length - 1];
        visApi().setFilterSelectedValues(w.general.renderTo, [per], function (response) {});
    });
}
setPeriod();
```

# трансформация данных
```javascript
w.data.data.forEach(el => el.text.split('-')[1] == '12' ? el.text = el.text.split('-')[0] : el.text = "6 мес " + el.text.split('-')[0])
let select = w.data.selected[0];
select.text.split('-')[1] == '12' ? select.text = select.text.split('-')[0] : select.text = "6 мес " + select.text.split('-')[0]
```

## двухуровневый фильтр 

```javascript
let unit = "квартал ";
let selected = w.data.selected[0].children[0].text;

// добавим текст к выбранному значению
if (selected) w.data.selected[0].children[0].text = unit + selected;

// добавим текст к второму уровню фильтра
w.data.data.forEach(data => {
    data.children.forEach(child =>{
        child.text = unit + child.text;
    });
});
```
