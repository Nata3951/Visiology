let client = w.data.rows[0][0];

if (client.length > 69) {  
    let lastSpace = client.slice(0,69).lastIndexOf(' ');
    client = w.data.rows[0][0].slice(0,lastSpace) + "...";
    }

let INN = w.data.values[0][0] ? w.data.values[0][0] : 'не внесено';

w.general.text = `<span style="color:#212121;font-weight:bold;padding-left:0px"> ${client}, ИНН ${INN}</span>`; 

  TextRender({
    text: w.general,
    style: w.style,
  });
