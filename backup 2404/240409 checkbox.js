let activeColor = '#01579B'; 

var filterGuid = '1c02963554c44d41a8d8c29852f7ae06'

$('#' + w.general.renderTo).html(`
<style>
.switch {
  position: relative;
  display: inline-block;
  width: 56px;
  height: 30px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: ${activeColor};
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 30px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>

<label class="switch">
  <input type="checkbox" id="q1w2e3r4" checked>
  <span class="slider round"></span>
</label>

`)

$('input:checkbox').change(
    function(){
        if ($(this).is(':checked')) {
            //console.log('checked');
            visApi().setFilterSelectedValues(filterGuid, []);
        } else {
            //console.log('unchecked');
            visApi().setFilterSelectedValues(filterGuid, [['Добыча УВС'], ['Х']]);
        }
    });
