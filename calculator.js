const getHistory = () => {
   return document.getElementById('history-value').innerText;
}    
const printHistory = (num)=> {
    document.getElementById('history-value').innerText=num;
}
const printOutput = (num) => {
    if(num==""){
        document.getElementById('output-value').innerText=num;
    }else {
        document.getElementById('output-value').innerText=getFormattedNumber(num);
    }
}
const getOutput = () => {
  return  document.getElementById('output-value').innerText;
}
const getFormattedNumber = (num) => {
    if(num=="-"){
        return "";
    }
    let n = Number(num);
    let value = n.toLocaleString("en");
    return value;
}
const reverseNumberFormat = (num) => {
    return Number(num.replace(/,/g,""));
}
let operator = document.getElementsByClassName('operator');
for(let i = 0; i<operator.length; i++){
    operator[i].addEventListener('click', ()=> {
        if(operator[i].id == "clear"){
            printHistory("");
            printOutput("");
        }
        else if(operator[i].id == "backspace"){
            let output = reverseNumberFormat(getOutput()).toString();
            if(output){
                output = output.substr(0,output.length-1);
                printOutput(output);
            }
        }
        else {
            let output = getOutput();
            let history = getHistory();
            if(output=="" && history !=""){
                if(isNaN(history[history.length-1])){
                    history = history.substr(0,history.length-1);
                }
            }
            if(output !="" || history !=""){
                output = "" ? output : reverseNumberFormat(output);
                history = history+output;
                if(operator[i].id == "="){
                    let result = eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else {
                    history=history+operator[i].id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    })
}

let number = document.getElementsByClassName('number');
for(let i = 0; i<number.length; i++){
    number[i].addEventListener('click', ()=> {
        let output = reverseNumberFormat(getOutput());
        if(output != NaN){
           output = output + number[i].id;
           printOutput(output);
        }
    });
}