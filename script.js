const expense=document.getElementById("expense")

const form=document.querySelector("form")

const category=document.getElementById("category")

const amount=document.getElementById("amount")

const ul=document.querySelector("ul")





expense.addEventListener("input", ()=>{
  
const Namexpense=expense.value



})


form.onsubmit=(event)=>{
    event.preventDefault()

//objeto 
const newdespense={
    
    id: new Date().getTime(),
    expense:expense.value,
    categoryId:category.value,

    //pega o texto do value selecionado

    categoryName:category.options[category.selectedIndex].text,
    amount:amount.value,
    createAt: new Date(),


}


despenseAdd(newdespense)
 }

//add item
function despenseAdd(newdespense) {
  
    try {
      //cria elemento pra adicionar na li
     const liItem= document.createElement("li")
     //adiciona classe
     liItem.classList.add("expense")
      
     //cria icone da category
     const icon=document.createElement("img")
//passar nome da img e atributos
   icon.setAttribute("src",`img/${newdespense.categoryId}.svg`)

   icon.setAttribute("alt", newdespense.categoryName)


   //adiciona as informaçoes no item

   liItem.append(icon)
   ul.append(liItem)

   const div=document.createElement("div")
div.classList.add("expense-info")
const strong=document.createElement("strong")

const category=newdespense.expense



liItem.append(div)
div.append(strong)
strong.append(category.toUpperCase())

const categoryid=newdespense.categoryName
const span=document.createElement("span")

div.append(span)
span.append(categoryid)

const spanamount=document.createElement("span")
spanamount.classList.add("expense-amount")
const small=document.createElement("small")

liItem.append(spanamount)
spanamount.append(small)
small.append(` ${amount.value}`)


const cancel=document.createElement("img")
cancel.setAttribute("src", `img/remove.svg`)
cancel.setAttribute("alt", "remove")
cancel.classList.add("remove-icon")


liItem.append(cancel)

clear()
//atualiza totais de itens
updatetotal()
  

    } catch (error) {

        console.log(error);
    }
}



/* switch (category.value) {
        case "food":
            console.log("alimentação");
           
            break;
    
            case "accommodation":
            console.log("hospedagem");
        break;

            case "services":
console.log("serviços");
break;

            case "transport":
                console.log("transporte");

                break;

                case "others":
                    console.log("outros");
    
                    break;
        default:
            break;
    }
  */



amount.oninput = () =>{
    const regex=/\D+/g

    value=amount.value.replace(regex,"")

    value=Number(value)/100
    
    amount.value= BRL(value)
    
    

//amount.textContent=`${BRL} ${amount.value}`


}

function BRL(value) {

value = value.toLocaleString("pt-Br",{
    style:"currency",
   currency:"BRL",

})

return value
}

//adicionar totais

function updatetotal() {
    try {
        //contabiliza a quantidade de filhos!!
        const update=ul.children
const update1=update.length
const span=document.querySelector("aside header p span")
span.textContent=`${update1} ${update1>1 ? "Despesas":"Despesa"}`

let total= 0

for(let liItem = 0; liItem < update.length; liItem++){
const itemammount=update[liItem].querySelector(".expense-amount")


let value=itemammount.textContent.replace(/[^\d]/g,"").replace(",",".")

value= parseFloat(value)

total+=Number(value)/100

}
const totalcalc=document.querySelector("header h2")
const smallcalc=document.createElement("small")

smallcalc.textContent="R$"

total=BRL(total.toLocaleString().toUpperCase().replace("R$",""))
totalcalc.innerHTML=""
totalcalc.append(smallcalc,total)




    } catch (error) {
        alert("tente novamente!")
    }
}

//captura o click de cancelamento


ul.addEventListener("click", function (event) {
    if(event.target.classList.contains("remove-icon")){
       //pegando o pai selecionado "clicado"
       let item=event.target.closest(".expense")

       //remove
       item.remove()
    }
    //atualiza a funçao
    updatetotal()
})

function clear() {
    //limpa o valor
    amount.value="" 
    category.value="" 
    expense.value=""
    
    //focar
    expense.focus()
}