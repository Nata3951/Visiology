// Для глобального изменения верхней панели со списком листов дашбордов требуется положить файл sheetTabStyle.css по адресу: /docker-volume/dashboard-viewer/customjs/
// Содержание файла:

.va-sheets-navigator {
    background-color : #292B4C
}
li.va-sheet-tab.selected > button {
    border-bottom-color : #353763 !important
}
li.va-sheet-tab > button:hover:not(.active) {
    border-bottom-color : #353763 !important
}
