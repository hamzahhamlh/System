let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
// console.log( title,price,taxes, ads,discount,total,count ,category,submit);
let mood='create';
let tmp;
// get total
function getTotal(){
  if (price.value != ''){
    let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
    total.innerHTML=result;
    total.style.background=' #079307';
  }
  else{
    total.innerHTML='';
    total.style.background='#f10';
  }
}


// create product
let datePro;
if(localStorage.product !=null){
  datePro=JSON.parse(localStorage.product)
}
else{
  datePro=[];
}

submit.onclick=function()
{
  let newPro=
  {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
  }
  if (title.value !='' && price.value!='' && category.value!='' && newPro.count<=100)
  {
    if (mood==='create')
      {
      // count  
      if (newPro.count>1)
        {
            for (let i=0;i<newPro.count;i++)
            {
              datePro.push(newPro);
            }
        }
      else
        {
          datePro.push(newPro);
        }
    }
    else
    {
      datePro[tmp]=newPro;
      mood='create';
      submit.innerHTML='Create';
      count.style.display='block';

    }
    clearData();
  } 

  // save localStorag
  localStorage.setItem('product',JSON.stringify(datePro));
 
  showDate();
}

// clear iupts
function clearData(){
title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
total.innerHTML='';
count.value='';
category.value='';

}


// read
function showDate(){
  getTotal();
  let table='';
  for(let i=0;i<datePro.length;i++){
    table+=`<tr>
    <td>${i+1}</td>
    <td>${datePro[i].title}</td>
    <td>${datePro[i].price}</td>
    <td>${datePro[i].taxes}</td>
    <td>${datePro[i].ads}</td>
    <td>${datePro[i].discount}</td>
    <td>${datePro[i].total}</td>
    <td>${datePro[i].category}</td>
    <td><button onclick="upDate(${i})" id="update">Update</button></td>
    <td><button onclick="deleteDaate(${i})" id="delete">Delete</button></td>
</tr>`;}
document.getElementById('tbody').innerHTML=table;
let btnDelete=document.getElementById('deleteAll');
if(datePro.length>0){
btnDelete.innerHTML=` <button id="deleteAll" onclick="deleteAll()">DeleteAll(${datePro.length})</button>`
}
else{
  btnDelete.innerHTML='';
}
}
showDate();

// delete 
function deleteDaate(i){
  datePro.splice(i,1);
  localStorage.product=JSON.stringify(datePro);
  showDate();
}
//deleteAll
function deleteAll(){
  localStorage.clear();
  datePro.splice(0);
  showDate();
}
// update
function upDate(i){
title.value=datePro[i].title;
price.value=datePro[i].price;
taxes.value=datePro[i].taxes;
ads.value=datePro[i].ads;
discount.value=datePro[i].discount;
getTotal();
count.style.display='none';
category.value=datePro[i].category;
submit.innerHTML='Update';
mood='update';
tmp=i;
scroll({
  top:0,
  behavior:'smooth',
})

}
// search
let searchMood='title';
function getSearchMood(id){

  // console.log(id);
  let search=document.getElementById('search');
  if (id =='searchTitle'){
    searchMood='title';
  
  }
  else{
    searchMood='category';
    
  }
  search.placeholder='search By '+searchMood;
search.focus();
search.value='';
showDate();
  // console.log(searchMood);
}

function searchData(value)
{
  let table='';
  // console.log(value);
  for(let i=0;i<datePro.length;i++)
  {
    if(searchMood=='title')
    {
      if(datePro[i].title.includes(value.toLowerCase()))
      {
            // console.log(i);
            table+=`<tr>
            <td>${i+1}</td>
            <td>${datePro[i].title}</td>
            <td>${datePro[i].price}</td>
            <td>${datePro[i].taxes}</td>
            <td>${datePro[i].ads}</td>
            <td>${datePro[i].discount}</td>
            <td>${datePro[i].total}</td>
            <td>${datePro[i].category}</td>
            <td><button onclick="upDate(${i})" id="update">Update</button></td>
            <td><button onclick="deleteDaate(${i})" id="delete">Delete</button></td>
            </tr>`;
      }
    }
      else
      {
        if(datePro[i].category.includes(value.toLowerCase()))
          {
            // console.log(i);
            table+=`<tr>
            <td>${i}</td>
            <td>${datePro[i].title}</td>
            <td>${datePro[i].price}</td>
            <td>${datePro[i].taxes}</td>
            <td>${datePro[i].ads}</td>
            <td>${datePro[i].discount}</td>
            <td>${datePro[i].total}</td>
            <td>${datePro[i].category}</td>
            <td><button onclick="upDate(${i})" id="update">Update</button></td>
            <td><button onclick="deleteDaate(${i})" id="delete">Delete</button></td>
            </tr>`;
          }
      }    
  }
  document.getElementById('tbody').innerHTML=table;
}

//clean date
//btnscroll
let btn=document.getElementById('btn');
window.onscroll=function()
{
    if( scrollY >= 400)
    {
        btn.style.display='block';
    }
    else
    {
        btn.style.display='none';        
    }
}
btn.onclick=function(){window.scrollTo({
    left:0,
    top:0,
    behavior:"smooth"
})
}
//------------------scroller------------
let el=document.querySelector('.scroller');
let height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

console.log(document.documentElement.scrollHeight);
console.log(document.documentElement.clientHeight);
console.log(height);

window.addEventListener('scroll',()=>{
    let scrollTop =document.documentElement.scrollTop;
    // console.log(scrollTop);
    el.style.width=`${(scrollTop/height)*100}%`; 
});
//-------------scrollerr-----------------
let elr=document.querySelector('.scrollerr');
let right=document.documentElement.scrollWidth-document.documentElement.clientWidth;
window.addEventListener('scroll',()=>{
    let scrollLft =document.documentElement.scrollLeft;
    elr.style.height=`${(scrollLft/right)*100}%`; 
});