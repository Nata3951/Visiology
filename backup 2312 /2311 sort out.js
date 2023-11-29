let other = {};
other.name = 'Остальное';
console.log('test other', other);

let other_value = 0; 

for (let i = 6; i < 8; i++) {
    w.series[i].data.forEach((el) => if(el.y) {x += el.y})  
    console.log('test value', x);
}
