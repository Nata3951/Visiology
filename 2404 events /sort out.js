// hide button
// https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp

<input type="button" id="hider" value="Нажмите, чтобы спрятать текст" />
<div id="text">Текст, чтобы спрятать </div>

<script>
    hider.addEventListener('click', {
        handleEvent(event) {
            let x = document.getElementById("text");
            if(x.style.display === "none") x.style.display = "block";
            else x.style.display = "none"
        }
    } )
</script>
