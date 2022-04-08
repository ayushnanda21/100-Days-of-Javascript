//creating class 
class Book{
    constructor(name,author,type){
        this.name = name,
        this.author = author,
        this.type = type
    }
}

class Display{

    add(book){
        console.log("adding to UI");
        let tableBody = document.getElementById('tableBody')
        let uiSTring = `
            <tr>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.type}</td>
            </tr>  `
        tableBody.innerHTML  += uiSTring;


    }

    clear(){
        let libraryForm  = document.getElementById('libraryForm')
        libraryForm.reset();
    }

    validate(book){
        if(book.name.length<2 || book.author.length<2){
            return false;
        }
        else{
            return true;
        }
    }

    show(type, displayMessage){
        let message = document.getElementById("message");
        let boldText;
        if(type==='success'){
            boldText  ='Success';
        } else{
            boldText = 'Error';
        }
        message.innerHTML  = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}</strong> ${displayMessage} 
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>`
    
        // to erase message after 2 seconds
        setTimeout(function(){
                message.innerHTML= ""
        }, 2000)
    }



    
}

//Add submit event listener to form
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit' , libraryFormSubmit);

function libraryFormSubmit(e){

    e.preventDefault();
    //grabbing fields for object creation using constructor 
    let name = document.getElementById('bookName').value
    let author = document.getElementById('author').value
    //to choose id amongst check boxes
    let fiction = document.getElementById('fiction')
    let programming = document.getElementById('programming')
    let cooking = document.getElementById('cooking')
    let type;
    
    if(fiction.checked){
        type = fiction.value
    }
    else if(programming.checked){
        type = programming.value
    }
    else{
        type = cooking.value
    }

    let book = new Book(name, author, type)
    console.log(book);

    //displaying book
    let display = new Display();

    if(display.validate(book)){
        display.add(book);
        display.clear();
        display.show('success', 'Successfully added')
    }
    else{
        display.show('danger', 'Sorry! Add book failed')
    }
   
    
    

 
    console.log("You have submitted library form")
}