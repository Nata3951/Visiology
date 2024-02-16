const tooltipWidth = 351;// Задаем ширину изображение в tooltip
const tooltipHeight = 228;// Задаем высоту изображение в tooltip

let columnImages = {
    'Доля имущества в неработоспособном состоянии по отрасли' : 'url("https://bi.gtlk.ru/corelogic/api/query/image?fileGuid=1c3d7e351ce54494ac11aec90d84f414&access_token=NoAuth")',
    'Доля имущества с внеплановым простоем >30 дней по отрасли' : 'url("https://bi.gtlk.ru/corelogic/api/query/image?fileGuid=6e147444f6c74da59c796b0869801c9e&access_token=NoAuth")',
    'Количество имущества в неработоспособном состоянии по отрасли' : 'url("https://bi.gtlk.ru/corelogic/api/query/image?fileGuid=1c3d7e351ce54494ac11aec90d84f414&access_token=NoAuth")',
    'Количество имущества с внеплановым простоем >30 дней по отрасли' : 'url("https://bi.gtlk.ru/corelogic/api/query/image?fileGuid=6e147444f6c74da59c796b0869801c9e&access_token=NoAuth")',
    'Доля имущества с просроченным плановым ремонтом по отрасли' : 'url("https://bi.gtlk.ru/corelogic/api/query/image?fileGuid=8bbc9448a8844a98ab7f44280bbfa87a&access_token=NoAuth")',
    'Доля имущества с внеплановым простоем >60 дней по отрасли' : 'url("https://bi.gtlk.ru/corelogic/api/query/image?fileGuid=c4eef76c7b374a59ac73d1a1ac0c4b33&access_token=NoAuth")',
    'Количество имущества с просроченным плановым ремонтом по отрасли' : 'url("https://bi.gtlk.ru/corelogic/api/query/image?fileGuid=8bbc9448a8844a98ab7f44280bbfa87a&access_token=NoAuth")',
    'Количество имущества с внеплановым простоем >60 дней по отрасли' : 'url("https://bi.gtlk.ru/corelogic/api/query/image?fileGuid=c4eef76c7b374a59ac73d1a1ac0c4b33&access_token=NoAuth")',
    'Глубина ПДЗ по отрасли': 'url("https://bi.gtlk.ru/corelogic/api/query/image?fileGuid=9bbbd343320645a68961837d2707e7c9&access_token=NoAuth")',
    'Доля ПДЗ в ЧЛП по отрасли': 'url("https://bi.gtlk.ru/corelogic/api/query/image?fileGuid=4964273c56dc4f559442572244bd6f2b&access_token=NoAuth")',
    'Доля недополученных технических резервов по отрасли': 'url("https://bi.gtlk.ru/corelogic/api/query/image?fileGuid=76e7f552636c4703a88127b52a8e4237&access_token=NoAuth")',
    'Платежная дисциплина после реструктуризации/МС по отрасли': 'url("https://bi.gtlk.ru/corelogic/api/query/image?fileGuid=bb1725bac8ca44e89521000983b208b2&access_token=NoAuth")',
    'Доля ВС без сертификата летной годности по отрасли': 'url("https://bi.gtlk.ru/corelogic/api/query/image?fileGuid=0bd5217515f748edace97d9a8398a151&access_token=NoAuth")',
    'LTV по отрасли': 'url("https://bi.gtlk.ru/corelogic/api/query/image?fileGuid=2faa84cd6d364c46a5d1950d2b25bcc5&access_token=NoAuth")',
    'Доля имущества, не переданного в аренду/лизинг по отрасли': 'url("https://bi.gtlk.ru/corelogic/api/query/image?fileGuid=6750fda8c5d345eca6e6ed6998827bb4&access_token=NoAuth")'
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

