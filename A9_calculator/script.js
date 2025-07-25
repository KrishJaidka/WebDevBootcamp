
var op = ['+', '-', '/', '*']
var res = 0
var screen = document.querySelector('input')

function handleSubmit(e){
    e.preventDefault()
    // Calculate the result when Enter is pressed
    try {
        screen.value = eval(screen.value)
    } catch (error) {
        screen.value = "Error"
    }
}

function update(val) {

    if (op.includes(val) && op.includes((screen.value).slice(-1))) {
        screen.value = screen.value.slice(0, -1) + val;
    } else {
        if (screen.value == '0') {
            screen.value = val;
        } else {
            screen.value += val;
        }
    }
    console.log(val);
}
