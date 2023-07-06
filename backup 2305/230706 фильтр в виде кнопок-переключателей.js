//Кнопки-переключатели, позволяющие по нажатию менять отображаемые виджеты.

//Ожидаемые входные данные:
//виджет принимает на вход таблицу, в строках которой необходимо написать наименования кнопок. 
//Наименования строк отображаются в видерасположенных в ряд кнопок. 
//Кнопок (и, соответсвенно, наборов отображаемых виджетов) может быть любое количество.
//switchedWidgets - массив, в котором по порядку указываются id виджетов, которые нужно скрывать/отображать.


var mode = Number(w.props.switchMode);

function setFilterSelectedValues(widgetGuid, selectedValues) {
    visApi().setFilterSelectedValues(widgetGuid, selectedValues);
    w.data.rows.forEach(function (item, index) {
        if (selectedValues[0][0] === item[0]) {
            for (let el in w.props.switchedWidgets[index]) {
                $('#widget-' + w.props.switchedWidgets[index][el]).removeClass('hidden');
            }
        } else {
            for (let el in w.props.switchedWidgets[index]) {
                $('#widget-' + w.props.switchedWidgets[index][el]).addClass('hidden');
            }
        }
    });
}

var template = '';
template += '<div class="button-container">';
w.data.rows.forEach(function (item) {
    template += '<div class="btn">' + item[0] + '</div>';
});
template += '</div>';
$('#' + w.general.renderTo).html(template);


setFilterSelectedValues(w.general.renderTo, [[w.data.rows[0][0]]]);

var filterValues = visApi().getSelectedValues(w.general.renderTo).map(function (value) {
    return value[0];
});

$('#' + w.general.renderTo + ' .btn')
    .each(function (index, item) {
        if (filterValues.includes($(item).text())) {
            $(item).addClass('selected');
        } else {
            $(item).removeClass('selected');
        }
    })
    .click(function () {
        setFilterSelectedValues(w.general.renderTo, [[$(this).text()]]);
        $('#' + w.general.renderTo + ' .btn').removeClass('selected');
        $(this).addClass('selected');
    });


const styles = `
    .hidden {visibility: hidden!important;}
    .button-container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
    }
    .btn {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: ` + w.props.unselectColor + `;
        color: ` + w.props.unselectTextColor + `;
        padding: ` + w.props.padding + `;
        border: ` + w.props.border + `;
        border-radius: ` + w.props.borderRadius + `;
        cursor: pointer;
        text-align: center;
        font-size: ` + w.props.fontSize + `;
        font-weight: ` + w.props.fontWeight + `;
        font-family: ` + w.props.fontFamily + `;
    }
    .btn.selected {
        background-color:` + w.props.selectColor + `;
        color: ` + w.props.selectTextColor + `;
    }`;

const styleExists = document.getElementById('styles_for_' + w.general.renderTo);
if (styleExists) {
    styleExists.parentNode.removeChild(styleExists);
}
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
styleSheet.id = ('styles_for_' + w.general.renderTo);
document.head.appendChild(styleSheet);

var borderRadius = '4px'; // Радиус скругления
$('#' + w.general.renderTo + ' i').css('color', '#efd8de') 
$('#' + w.general.renderTo).css({ // Скругление фильтра
    'border-radius': borderRadius,
}).find('.rb-filter-header-container').css({ 
    'border-radius': borderRadius,

     'border' : '1px solid #D2D2D2'// цвет рамки фильтра
   });
   
$('#' + w.general.renderTo).css({
}).find('.rb-filter-body-container').css({
   'border-color' : '#D2D2D2' // цвет рамки внутри фильтра
   });
   
   
$('#' + w.general.renderTo).find('.rb-filter-header-text').css({
    'font-weight': 'bold',
});

//отступ внутри фильтра
$('#'+ w.general.renderTo +' div.rb-filter-header-container').css({
    padding: "10px 10px", 
});
