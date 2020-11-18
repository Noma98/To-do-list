'use strict';
const items=document.querySelector('.items');
const input=document.querySelector('.footer__input');
const addBtn=document.querySelector('.footer__button');

const section=document.querySelector('section');
section.addEventListener('click',(e)=>{
    const target=e.target;
    switch(target){
        case "button.footer__button":
            onAdd();
            break;
        case "button.deleteAll":

    }
});

addBtn.addEventListener('click',()=>{
    onAdd();
});
input.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        onAdd();}
});

const deleteAll=document.querySelector('.deleteAll');
const bubble=document.querySelector('.bubble');

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
let id =0;
function createItem(text) {
    
    const itemRow=document.createElement('li');
    itemRow.setAttribute('class','items__row');
    itemRow.setAttribute('data-id',id);
    itemRow.innerHTML=`
        <div class="item">
            <span class="item__name">${text}</span>
            <button class="item__delete">
                <i class="fas fa-trash-alt" data-id=${id}></i>
            </button>
        </div>
        <div class="item__divider"></div>`;
    id++;
    items.append(itemRow);
    itemRow.scrollIntoView({block:'end'});
   
} 
deleteAll.addEventListener('click',()=>{
    if(confirm("Are you sure you want to delete all of them?")){
    items.innerHTML='';
    return;
    }else{
    return;}
});

items.addEventListener('click',event=>{
    const id=event.target.dataset.id;
    if(id){
         const toBeDeleted=document.querySelector(`.items__row[data-id="${id}"]`);
         toBeDeleted.remove();
    }
   
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