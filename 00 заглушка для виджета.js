document.body.querySelector('#widget-'+w.general.renderTo).style.display = 'none';
if (w.data.rows.length > 0)
document.body.querySelector('#widget-'+w.general.renderTo).style.display = 'none';
else document.body.querySelector('#widget-'+w.general.renderTo).style.display = '';

TextRender({
    text: w.general,
    style: w.style
});
