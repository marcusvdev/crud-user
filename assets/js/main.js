let globalNames = ['lorem', 'ipsum', 'dolor', 'amet'];
let inputName = null;
let isEdit = false;
let currentIndex = null;

window.addEventListener('load', () => {
    inputName = document.querySelector('#inputName');
    preventFormSubmit();
    activeInput();
    render();
});

function preventFormSubmit() {
    var form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });
}

function activeInput() {
    inputName.focus();
    inputName.addEventListener('keyup', (event) => {
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
        content.addEventListener('click', () => {
            inputName.value = item;
            inputName.focus();
            isEdit = true;
            currentIndex = index;
        });
        return content;
    }

    function deleteItem(index) {
        var del = document.createElement('button');
        del.addEventListener('click', () => {
            globalNames = globalNames.filter((_, i) => i !== index);
            inputName.value = "";
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