let inputThing = document.getElementById("input-thing");
let thingsUl = document.getElementById("choosing-list");
let optionPicked = document.getElementById("option-picked");
let thing = "";

inputThing.addEventListener('input', (e)=>{
    thing = e.target.value;
})

inputThing.addEventListener('keydown', (e)=>{
   if(e.key === 'Enter'){
        addToList();
   }
})


let listOfThings = []
function addToList(){
    if(thing !== ""){
        listOfThings.push(thing);
        let indexOfThing = listOfThings.length - 1;
        renderList(thing, indexOfThing);
        thing = "";
        inputThing.value = "";
    }
}

function deleteItem(index) {
    listOfThings.splice(index, 1); 
    thingsUl.innerHTML = ""; 

    listOfThings.forEach((thing, newIndex) => {
        renderList(thing, newIndex);
    });
}

function renderList(thing, index){
    let li = document.createElement('li');
    let text = document.createTextNode(thing);
    li.appendChild(text);
    let deleteButton = document.createElement('button')
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', ()=>{
        deleteItem(index);
    });

    li.appendChild(deleteButton);

    thingsUl.appendChild(li);
}

function randomPick(){
    let counter = 0;
    const maxCount = 30;
    const intervalId = setInterval(()=>{
        let randomIndex = Math.floor(Math.random()* listOfThings.length);
        optionPicked.style.color = '#fff';
        optionPicked.innerText = listOfThings[randomIndex];
        counter++

        if (counter >= maxCount) {
            optionPicked.style.color = '#ffd500';
            clearInterval(intervalId); 
        }
    },150)

    
}