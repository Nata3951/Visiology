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

---
ind = 'Водный транспорт'
temp = df.query("industry == @ind")
temp1 = df.query("industry == @ind & pdz_forecast > 500").reset_index()

g = sns.relplot(data = temp,
        x='pdz_forecast', y='pdz_now', hue='rating', palette = sns.color_palette("blend:grey,gold,coral,red", as_cmap=True), 
     size='pdz_forecast', alpha = 0.9,  sizes = (10,400),
     legend=False, height = 3
    )
g.set(xlim=(0, 1900), ylim=(0, 2000))

for i, client in enumerate (temp1['client']):
    plt.text(temp1['pdz_forecast'][i]-600, temp1['pdz_now'][i]+200, client)

display(temp1)
