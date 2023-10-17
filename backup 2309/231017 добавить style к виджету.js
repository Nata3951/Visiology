window.mainTable = document.querySelector('#' + w.general.renderTo)

window.mainTable.innerHTML += `
    <style>
    #widget-b5642579e0404d439a2577e56970d1c8 {
        overflow: hidden;
    }
    
    .dx-widget.dx-datagrid-pager.dx-pager {
        padding: 5px 0;
    }
    
    .dx-pager .dx-page-sizes .dx-page-size,
    .dx-pager .dx-pages .dx-selection {
        padding: 0px 5px;
        color: #899196;
    }
    
    .dx-pager .dx-page-sizes .dx-selection, 
    .dx-pager .dx-pages .dx-selection {
        background-color: #505257;
        color: white;
    }
    
    .dx-datagrid .dx-row-lines > td {
        border-color: transparent;
    }
    
    #dataGridContainer_b5642579e0404d439a2577e56970d1c8 .dx-datagrid-rowsview {
        max-height: 140px;
        overflow: auto;
    }
    </style>
` 


DataGridRender({
    general: w.general,
    errorState: w.errorState,
    dataGridOptions: w.dataGridOptions,
    textFormatters: w.textFormatters,
    style: w.style,
});
