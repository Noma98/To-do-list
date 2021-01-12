'use strict';
const items=document.querySelector('.items');
const input=document.querySelector('.footer__input');
const addBtn=document.querySelector('.footer__button');
const deleteAll=document.querySelector('.deleteAll');
const bubble=document.querySelector('.bubble');
let id =0;

addBtn.addEventListener('click',()=>{
    onAdd();
});
input.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        onAdd();}
});

function onAdd(){
    const text=input.value;
    if(text===''){
        input.focus();
        alert('Please enter your content.');
        return;
    }
    createItem(text);
    input.value='';
    input.focus();
}

function createItem(text) {
    const itemRow=document.createElement('li');
    itemRow.setAttribute('class','items__row');
    itemRow.setAttribute('data-id',id);
    itemRow.innerHTML=`
        <div class="item">
        <span class="item__name--outer">
            <span class="item__name">${text}</span>        
        </span>
            <button class="item__delete">
                <i class="fas fa-trash-alt" data-id=${id}></i>
            </button>
        </div>
        <div class="item__divider"></div>`;
    id++;
    items.append(itemRow);
    itemRow.scrollIntoView({block:'end'});
   
} 
items.addEventListener('click',event=>{
    const target=event.target;
    const id=target.dataset.id;
    let targetClassName=target.className;
    if(id){
         deleteItemRow(id);
         return;
    }
    switch (targetClassName) {
        case 'item__name--outer':
            target.classList.add('strikethrough');
            break;
        case 'item__name--outer strikethrough':
            target.classList.remove('strikethrough');
            break;
        case 'item__name':
            if(target.parentNode.className==='item__name--outer'){
                target.parentNode.classList.add('strikethrough');
                break;
            }else{
                target.parentNode.classList.remove('strikethrough');
                break;
            }
        default:
            break;
    }
});
function deleteItemRow(id){
    const toBeDeleted=document.querySelector(`.items__row[data-id="${id}"]`);
    toBeDeleted.remove();
}

deleteAll.addEventListener('mouseover',()=>{
    bubble.classList.add('visible');
});
deleteAll.addEventListener('mouseout',()=>{
    bubble.classList.remove('visible');
});

window.addEventListener('load',()=>{
    loadItemsFromBrowser();
});
window.addEventListener('beforeunload',()=>{
    saveItemsInBrowser();
});

function saveItemsInBrowser() {
        localStorage.setItem("items",items.innerHTML);
        localStorage.setItem("itemID",id);
}
function loadItemsFromBrowser(){
        const loadedItems=localStorage.getItem("items");
        const loadedID=localStorage.getItem("itemID");
        items.innerHTML=loadedItems;
        id=loadedID;
}

deleteAll.addEventListener('click',()=>{
    if(confirm("Are you sure you want to delete all of them?")){
    items.innerHTML='';
    id=0;
    return;
    }else{
    return;}
});

