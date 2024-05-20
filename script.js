//them  revers engineer //give him tabindex = 0 
const toggleElement = document.querySelector(".themes__toggle");

const toggleDarkTheme = () => toggleElement.classList.toggle("themes__toggle--isActive");

const darkThemEnter = (e) => (e.key === "Enter") && toggleDarkTheme();

toggleElement.addEventListener("keydown",darkThemEnter);
toggleElement.addEventListener("click",toggleDarkTheme);


let storNumber = "";
let currentNumber = "";
let operation = "";


const resultElement = document.querySelector(".calc__result");
const keyElement = document.querySelectorAll("[data-type]");

const updatScreen = (value) => {
    resultElement.innerText = !value ? "0" : value;
}

const numberButtonHandler = (value) => {
    if(value === "." && currentNumber.includes("."))return
    if(value === "0" && !currentNumber)return

    currentNumber += value;
    updatScreen(currentNumber);
};
const   restButonHandler = () => {
    storNumber = "";
    currentNumber = "";
    operation = "";
    updatScreen(currentNumber);
}
const deleteLast = () => {
    if (currentNumber.length > 0){
        updatScreen(currentNumber = currentNumber.slice(0,-1));
    }
}
const calc = (operationValue) =>{
    if(!currentNumber && !storNumber){
        return;
    }
    if(currentNumber && !storNumber){
        storNumber = currentNumber;
        currentNumber ="";
        operation = operationValue;
    }else if (storNumber){
        operation = operationValue;

        if(currentNumber) executedOperation();
    }

 
}
const  executedOperation = () =>{
 if(currentNumber && storNumber && operation){
    switch (operation){
        case "+":
           storNumber= parseFloat(currentNumber)+ parseFloat(storNumber);
        break;
        case "-":
            storNumber= parseFloat(currentNumber) - parseFloat(storNumber);
        break;
        case "*":
            storNumber= parseFloat(currentNumber) * parseFloat(storNumber);
        break;
        case "/":
            storNumber= parseFloat(currentNumber) / parseFloat(storNumber);
        break;

    }
    currentNumber = "";
    updatScreen(storNumber);
 }
}
keyElement.forEach((element) =>{
    element.addEventListener("click",()=>{
        if(element.dataset.type == "number"){
            numberButtonHandler(element.dataset.value);
        }else if (element.dataset.type === "operation"){
            switch(element.dataset.value){
                case "c" :
                  restButonHandler();
                  break;
                case "Backspace":
                    deleteLast();
                    break;
                case "Enter":
                    executedOperation();
                    break;
                default:
                    calc(element.dataset.value);
            }
        }
    })
});

//Use keyboard as input source 
const availableNumber = ["0","1","2","3","4","5","6","7","8","9","."];
const availableOperation = ["*","/","+","-"]
window.addEventListener("keydown",(e) => {
    if(availableNumber.includes(e.key)){
        numberButtonHandler(e.key);
    }else if (availableOperation.includes(e.key)){
       calc(e.key);
    }else if (e.key === "Backspace"){
        deleteLast();
       
    }else if (e.key === "Enter"){
        executedOperation();
    }else if (e.key === "Delete"){
        restButonHandler();
    }
});