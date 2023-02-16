let someText  = visApi().getSelectedValues("96db44a97c984a80bbc7c74c329e9302");

w.general.text = someText;

TextRender({
    text: w.general,
    style: w.style
});

console.log("show text1", w);

console.log (someText);
