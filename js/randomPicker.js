let inputThing = document.getElementById("input-thing");
thingsUl = document.getElementById("choosing-list");
let thing = "";

inputThing.addEventListener('input', (e)=>{
    thing = e.target.value;
})



let listOfThings = []
function addToList(){
    if(thing !== ""){
        listOfThings.push(thing);
        let indexOfThing = listOfThings.length - 1;
        renderList(thing, indexOfThing);
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

    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', ()=>{
        deleteItem(index);
    });

    li.appendChild(deleteButton);

    thingsUl.appendChild(li);
}