$(document).ready(function () {
    $(".numeric_buttons").click(define_val);
    $(".arithmetic_buttons").click(define_val);
    $(".clear_buttons").click(define_val);
});
// var my_calculator = new calculator(basic_math);
// function basic_math(type, value, item) {
//     $(".calculator_display").text(value);
// };
var button_storage_array = [];
function define_val() {
    // var val = $(this).text();
    // my_calculator.addItem(val);
    var buttons_clicked = {
        type: find_type($(this).text()),
        value: $(this).text()
    }
    button_storage_array.push(buttons_clicked)
    concat_string(button_storage_array)
    console.log(button_storage_array)
    // calculate(button_storage_array);
}
function find_type(text){
    var type_of_text;
    switch (text) {
        case "1":
            type_of_text = "number";
            break;
        case "2":
            type_of_text = "number";
            break;
        case "3":
            type_of_text = "number";
            break;
        case "4":
            type_of_text = "number";
            break;
        case "5":
            type_of_text = "number";
            break;
        case "6":
            type_of_text = "number";
            break;
        case "7":
            type_of_text = "number";
            break;
        case "8":
            type_of_text = "number";
            break;
        case "9":
            type_of_text = "number";
            break;
        case "0":
            type_of_text = "number";
            break;
        case "+":
            type_of_text = "operator";
            break;
        case "-":
            type_of_text = "operator";
            break;
        case "/":
            type_of_text = "operator";
            break;
        case "x":
            type_of_text = "operator";
            break;
        case "=":
            type_of_text = "equalSign";
            break;
    }
    return type_of_text
}
function concat_string(array1){
    for (var i = 1; i < array1.length; i++){
        if (array1[i].type == "number"){
            var first_number = array1[i].value
            var second_number = array1[i-1].value
            console.log(second_number.concat(first_number))
            return
        }
    }
}
// function calculate(array){
//     var addition_array=[];
//     for (var i = 0; i < array.length; i++){
//        var array_index = array[i].value;
//         var front_number = array[i+1].value;
//         var back_number = array[i-1].value
//         if (array_index === "+" || array_index === "-"){
//            addition_array.push(array_index, front_number, back_number)
//             if (array_index === "*" || array_index === "/"){
//                 switch (array_index){
//                     case "*":
//                         var product = front_number * back_number;
//                         return product;
//                         break;
//                     case "/":
//                         var quotient = front_number/back_number;
//                         return quotient;
//                         break;
//                 }
//             }
//
//         }
//     }
// }