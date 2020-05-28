window.addEventListener('load', start);

var globalNames = ['lorem', 'ipsum', 'dolor', 'amet'];
var inputName = null;
var isEdit = false;
var currentIndex = null;

function start() {    
    inputName = document.querySelector('#inputName');
    preventFormSubmit();
    activeInput();
    render();
}

function preventFormSubmit() {
    var form = document.querySelector('form');
    form.addEventListener('submit', function(event){
        event.preventDefault();
    });
}

function activeInput() {
    inputName.focus();
    inputName.addEventListener('keyup', function(event){
        if(event.keyCode === 13){
            var inputValue = event.target.value;
            if(inputValue.trim() !== ''){
                if(isEdit){
                    globalNames[currentIndex] = inputValue;
                    render();
                } else {
                    globalNames.push(inputValue);
                    render();
                }
            }
            isEdit = false;
            inputName.value = "";
        }
    });
}

function render() {

    function createID(item, index) {
        var id = document.createElement('span');
        id.classList.add('idItem');
        index = index + 1;
        id.textContent = index;
        return id;
    }

    function createContent(item, index) {
        var content = document.createElement('span');
        content.classList.add('textItem');
        content.textContent = item;
        content.addEventListener('click', function(){
            inputName.value = item;
            inputName.focus();
            isEdit = true;
            currentIndex = index;
        });
        return content;
    }

    function deleteItem(index) {
        var del = document.createElement('button');
        del.textContent = 'delete';
        del.classList.add('deleteItem');
        del.addEventListener('click', function(){
            globalNames.splice(index, 1);
            render();
        });
        return del;
    }

    var listNames = document.querySelector('#names');
    listNames.innerHTML = "";
    var ul = document.createElement('ul');
    for(var i = 0; i < globalNames.length; i++){
        var currentItem = globalNames[i];
        var li = document.createElement('li');
        var id = createID(currentItem, i);
        var content = createContent(currentItem, i);
        var button = deleteItem(i);
        
        li.appendChild(id);
        li.appendChild(content);
        li.appendChild(button);
        
        ul.appendChild(li);
    }
    listNames.appendChild(ul);
}