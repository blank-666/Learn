const totalXp = document.querySelector("#totalXp ");
const experienceHistory = document.querySelector("#experienceHistory");
const inputXp = document.querySelector("#inputXp");
const divider = document.querySelector("#divider"); 
const clearAllButton = document.querySelector("#clearAll"); 
const clearPreButton = document.querySelector("#clearPrevious"); 
const clearButtons = document.querySelector(".clearButtons"); 
const modal = document.querySelector('#modalContainer');
const divideButton = document.querySelector("#divideButton");
const span = document.querySelector(".close");
const modalText = document.querySelector('#modalText');
let itemsArray = [];

console.log('height:', window.innerHeight, 'width:', window.innerWidth)

function showClearButtons(){
    clearButtons.style.display = (itemsArray.length > 0) ? "block" : "none";
}

//Чотко по завданню:

// function filterNumber(value){
//     let number = Number([...value].filter(el => /\d/.test(el)).join(''));
//     console.log(number, typeof number)
//     getXP(number);
// }

//Не чьотко по завданню, але чьотко по понятіям ежжи:

function filterNumber(value){
    value = value.slice([...value].findIndex(el => /\d/.test(el)));

    let number = (/\D/.test(value)) ? 
        value.slice(0, [...value].findIndex(el => /\D/.test(el))) 
        : Number(value);
    if (number) getXP(number);
}

function getXP(item, clearPrev){
    if(item) itemsArray.push(item);
    else if (clearPrev && itemsArray.length > 1) itemsArray = itemsArray.slice(0, -1);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    const total = itemsArray.reduce((acc, cur)=> acc+cur);

    localStorage.setItem('total', total);
    localStorage.setItem('history', itemsArray.join('+'));

    totalXp.textContent = `${total}xp`;
    experienceHistory.textContent = itemsArray.join('+');
}

function clearAll(){
    localStorage.clear();
    totalXp.textContent = '';
    experienceHistory.textContent = '';
    itemsArray = [];
    showClearButtons();
}

window.addEventListener('load', function(){
    if (localStorage.length > 0){
        totalXp.textContent = localStorage.getItem('total') + 'xp'; 
        experienceHistory.textContent = localStorage.getItem('history');
        itemsArray = JSON.parse(localStorage.getItem('items'));
        showClearButtons();
    }
})

inputXp.addEventListener('keydown', function(){
    if(event.keyCode == 13){
        filterNumber(inputXp.value);
        inputXp.value = '';
    }
    showClearButtons();
})

clearAllButton.addEventListener('click', clearAll);

clearPreButton.addEventListener('click', () => getXP(false, true));

divideButton.addEventListener('click', function(){
    modalText.textContent = `Experience for each player: 
        ${Math.floor(localStorage.getItem('total') / divider.value)}  xp`;
    modal.style.display = "block";
    clearAll();
})

window.addEventListener('click', function(event) {
    if (event.target == modal || event.target == span) {
        modal.style.display = "none";
    }
})