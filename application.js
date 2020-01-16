const name = document.querySelector("#name");
let length = document.querySelector("#length");
let mass = document.querySelector("#mass");
let age = document.querySelector("#age");
const form = document.querySelector("#input-form");
const detailsList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear");

loadEventListeners();

function loadEventListeners(){
    //Convert a input event
    form.addEventListener('submit', Compiler);
    //Remove task
    detailsList.addEventListener('click', removeTask);
    //clear all tasks
    clearBtn.addEventListener('click', clearFields);
}

// e = event
function Compiler(e){
    //checks for empty input
    if(length.value === '' || mass.value === '' || age.value === ''){
        return alert('Enter your length, mass, and age.');
    }else{
       Agecontrol(e); 
    };
    e.preventDefault();
}

function Agecontrol(e){
    if(age.value < 20 || age.value > 60){
        // Create an li element to add to the ul
        const li = document.createElement('li');
        // Add a class name to the li element
        li.className = 'collection-item'; 
        if(name.value === ''){
            const replay = ("Sorry, but the program is only approximately correct between the ages of 20-60 years.");
            li.appendChild(document.createTextNode(replay));
            // Create a new ancher element
            const link = document.createElement('a');
            // Add a class to the element
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="far fa-times-circle fa-2x"></i>';
            li.appendChild(link);
            detailsList.appendChild(li);
            e.preventDefault();
        }
        else{
            const replay = ("Sorry " + name.value + ", but the program is only approximately correct between the ages of 20-60 years.");
            li.appendChild(document.createTextNode(replay));
            // Create a new ancher element
            const link = document.createElement('a');
            // Add a class to the element
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="far fa-times-circle fa-2x"></i>';
            li.appendChild(link);
            detailsList.appendChild(li);
            e.preventDefault();
        }
    }else {
        console.log('calculating');
        Calculate(e);
    };
};

function Calculate(e){
    let _height = parseInt(length.value)/100;
    let _mass = parseInt(mass.value);
    let _BMI = Math.round(_mass/Math.pow(_height,2));

    const li = document.createElement('li');
    // Add a class name to the li element
    li.className = 'collection-item'; 
    if(name.value === ''){
        const replay2 = ("Your body mass index is " + _BMI + ".");
        li.appendChild(document.createTextNode(replay2));
        // Create a new ancher element
        const link = document.createElement('a');
        // Add a class to the element
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="far fa-times-circle fa-2x"></i>';
        li.appendChild(link);
        detailsList.appendChild(li);
    }
    else{
        const replay2 = (name.value + ", your body mass index is " + _BMI + ".");
        li.appendChild(document.createTextNode(replay2));
        // Create a new ancher element
        const link = document.createElement('a');
        // Add a class to the element
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="far fa-times-circle fa-2x"></i>';
        li.appendChild(link);
        detailsList.appendChild(li);
    }
}

function removeTask(event){
    if(event.target.classList.contains('delete-item')){
        if(confirm('Are you sure you want to delete the task?')){
            event.target.parentElement.remove();
            console.log(event.target.parentElement.textContent);
            //Remove from local storage
            removeTaskFromLocalStorage(event.target.parentElement);
        }
    }
}

function clearFields(){
    if(confirm("Clear all fields?")){
        while(detailsList.firstChild){
            detailsList.removeChild(detailsList.firstChild);
        }
        name.value = '';
        length.value = '';
        mass.value = '';
        age.value = '';
    }
}
