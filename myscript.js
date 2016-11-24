
$(document).ready(function(){
    $(".numeric_buttons").click(define_val);
    $(".arithmetic_buttons").click(define_val);
    $(".clear_buttons").click(define_val)
});
var my_calculator = new calculator(basic_math);
function basic_math(type,value,item){
    $(".calculator_display").text(value);
}
function define_val(){
    var val = $(this).text();
    my_calculator.addItem(val);
    console.log(val)
}