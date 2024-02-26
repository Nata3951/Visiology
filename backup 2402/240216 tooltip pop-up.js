const tooltipWidth = 351;// Задаем ширину изображение в tooltip
const tooltipHeight = 228;// Задаем высоту изображение в tooltip

let columnImages = {
    'Доля имущества в неработоспособном состоянии по отрасли' : 'url("https://bi.")',
    'Доля имущества с внеплановым простоем >30 дней по отрасли' : 'url("https://bi.")',
};

const containerDiv = document.getElementById(w.general.renderTo);
containerDiv.style.cssText = "overflow: visible; display: flex; flex-direction: row;";

const mainID = '#widget-' + w.general.renderTo;
const styleForTooltip = document.createElement('style');

const widgetHeight = containerDiv.offsetHeight;

const headerWidgetCSS = `
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #d1dae5;
  font-size: 12px;
  color: #212121;
  padding: 5px 5px 5px 10px;
  font-family: Open Sans;
  flex-basis: 100px;
  max-width: 400px;
  flex-grow: 1;
;`

for (let i = 0; i < w.data.values.length - 1; i++) {
  const newWidget = document.createElement("div");
  newWidget.style.cssText = "height: 100%; width: 100%; margin-right: 10px;";
  containerDiv.appendChild(newWidget);

  const headerWidget = document.createElement("div");
  headerWidget.style.cssText = headerWidgetCSS;
  newWidget.appendChild(headerWidget);

  for (let j = 0; j < 3; j++) {
    const subHeaderWidget = document.createElement("div");
  
    if (j === 0) {
      const subHeaderWidgetCSS = `
        display: inline-block;
        margin-right: 10px;
        flex-basis: 20px;
        max-width: 40px;
        flex-grow: 1;
        border-radius: 5px;
        text-align: center;
        font-size: 13px;
        font-weight: bold;
        color: #212121;
        font-family: Open Sans;
        padding: 5px 0;
        background-color: ${getColorByValue(w.data.cols[i][2])};
        position: relative;
        z-index: 5;
      ;`
      
      subHeaderWidget.classList.add('indicator-' + i);
      
      styleForTooltip.innerHTML += `
        ${mainID} .indicator-${i}::after {
            background-image: ${columnImages[w.data.cols[i][1]]};
            content: "";
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center center;
            position: absolute;
            width: ${tooltipWidth}px;
            height: ${tooltipHeight}px;
            opacity: 0;
            visibility: hidden;
            top: calc(100% + 15px);
            display: block;
            border: 1px solid #ccc;
        }
        
        ${mainID} .indicator-${i}:hover::after {
            opacity: 1;
            visibility: visible;
        }
      `
      
      if (i < 6) {
          styleForTooltip.innerHTML += `
            ${mainID} .indicator-${i}::after {
                left: -10px;
            }
          `
      } else {
          styleForTooltip.innerHTML += `
            ${mainID} .indicator-${i}::after {
                right: 0;
            }
          `
      }
      
      subHeaderWidget.style.cssText = subHeaderWidgetCSS;
      subHeaderWidget.textContent = Math.round(w.data.values[i]*10)/10;
    } else if (j == 1) {
      subHeaderWidget.style.cssText = "width: 2px; background-color: white; height: 100%; margin-right: 10px; border-radius: 5px;";
    } else {
      const subHeaderWidgetCSS = `
        flex-basis: 50px;
        max-width: 300px;
        flex-grow: 1;
      ;`
      
      subHeaderWidget.style.cssText = subHeaderWidgetCSS;
      subHeaderWidget.textContent = (w.data.cols[i][1]).split('по отрасли')[0];
      
      if (subHeaderWidget.textContent.length < 30) {
        subHeaderWidget.style.whiteSpace = 'nowrap';
        subHeaderWidget.style.overflow = 'hidden';
      } else {
        subHeaderWidget.style.width = '170px';
      }
    }

    headerWidget.appendChild(subHeaderWidget);
  }
}

containerDiv.appendChild(styleForTooltip);

function getColorByValue(value) {
  switch (value) {
    case 'Низкий':
      return '#aed581';
    case 'Средний':
      return '#ffea00';
    case 'Высокий':
    case 'Критический':
      return '#ff8a80';
    default:
      return '#f5f5f5';
  }
}

