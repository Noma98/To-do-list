'use strict';
const items=document.querySelector('.items');
const input=document.querySelector('.footer__input');
const addBtn=document.querySelector('.footer__button');

addBtn.addEventListener('click',()=>{
    onAdd();
});
input.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        onAdd();}
});

const removeAll=document.querySelector('.removeAll');
const bubble=document.querySelector('.bubble');

removeAll.addEventListener('mouseover',()=>{
    bubble.classList.add('visible');
});
removeAll.addEventListener('mouseout',()=>{
    bubble.classList.remove('visible');
});


function onAdd() {
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
    
    const item=document.createElement('div');
    item.setAttribute('class','item');

    const itemName=document.createElement('span');
    itemName.setAttribute('class','item__name');
    itemName.textContent=text;

    const itemDelete=document.createElement('button');
    itemDelete.setAttribute('class','item__delete');
    itemDelete.innerHTML='<i class="fas fa-trash-alt"></i>';
    itemDelete.addEventListener('click',(e)=>{
        items.removeChild(itemRow);
        //itemRow.remove();
    });
    removeAll.addEventListener('click',()=>{
        if(confirm("Are you sure you want to delete all of them?")){
        items.innerHTML='';
        }else{
        return;}
    });

    const itemDivider=document.createElement('div');
    itemDivider.setAttribute('class','item__divider');

    items.append(itemRow);
    itemRow.append(item);
    itemRow.append(itemDivider);
    item.append(itemName);
    item.append(itemDelete);   

    
    item.scrollIntoView({block:'center'});
    return;
}
    
