var selectedPro=[];
var selProID=1;

var totalBill=document.getElementById("total");
var total=0;

selectedPro=getStoredProducts();
function getStoredProducts()			//retrieve selected products into selected pro array from local storage
{
	if (!localStorage.selectedProducts)
	{
		// default to empty array
		localStorage.selectedProducts = JSON.stringify([]);
	}
	return JSON.parse(localStorage.selectedProducts);
}
showProducts();

function showProducts()			//copy pro array into a object and then add into dom
{
	for(i=0;i<selectedPro.length;i++)
	{		
		var objPro= new Object();
		objPro.Id=selectedPro[i].Id;
		objPro.Name=selectedPro[i].Name;
		objPro.Desp=selectedPro[i].Desp;
		objPro.Price=selectedPro[i].Price;
		objPro.Quantity=selectedPro[i].Quantity;
		
		total=total+(selectedPro[i].Price * selectedPro[i].Quantity);
		
		createListOfProducts(objPro)				// making table of products in dom (appending new product)
		proID=objPro.Id;
	}
	var lable=document.createElement("lable");
	lable.innerHTML=total;
	//totalBill.appendChild(lable);
selProID++;
}
function insertLine(target)
{
	var br=document.createElement("br");
	target.appendChild(br);
}


function storeProducts(selectedProducts)		//store the pro array in local storage+
{
localStorage.selectedProducts = JSON.stringify(selectedProducts);
}

function getProIndex(id)					//returns the id of the selected product
{
	    for (var i = 0; i < selectedPro.length; i++) 
	{
        		if (selectedPro[i].Id == id) 
					return i;
	}
}

function createListOfProducts(obj)			//shows products from pro array's object in dom
{
		var div=document.createElement("div");
		div.setAttribute("id",obj.Id);
		
		var lable=document.createElement("lable");
		lable.innerHTML="Name   :   ";
		div.appendChild(lable);
		
		var lable=document.createElement("lable");
		lable.innerHTML=obj.Name;
		div.appendChild(lable);
		insertLine(div);
		
		var lable=document.createElement("lable");
		lable.innerHTML="Description   :   ";
		div.appendChild(lable);
		
		var lable=document.createElement("lable");
		lable.innerHTML=obj.Desp;
		div.appendChild(lable);
		insertLine(div);
		
		var lable=document.createElement("lable");
		lable.innerHTML="Price   :   ";
		div.appendChild(lable);
		
		var lable=document.createElement("lable");
		lable.setAttribute("id","Quant");
		lable.innerHTML=obj.Price;
		div.appendChild(lable);
		insertLine(div);
		
		var lable=document.createElement("lable");
		lable.innerHTML="Quantity   :   ";
		div.appendChild(lable);
		
		var lable=document.createElement("lable");
		lable.innerHTML=obj.Quantity;
		div.appendChild(lable);
		insertLine(div);
		insertLine(div);
		
		var bt=document.createElement("Button");
		bt.setAttribute("id","removeFromCart");
		bt.innerHTML="Remove From Cart";
		div.appendChild(bt);
		bt.addEventListener("click",function(event)
		{
			
			var target=event.target.parentNode;
			var index=getProIndex(parseInt(target.id));
		
			selectedPro.splice(index,1);			//removing selected producgt from the pro array
			localStorage.selectedProducts = JSON.stringify([]);			//clear local storage
			storeProducts(selectedPro);								//saving new pro array
			//console.log(selectedPro);
	
			//localStorage.selectedProducts = JSON.stringify([]);			//clear local storage
			//storeProducts(selectedPro);					
			//selectedPro.remove(index);
			var targetParent=event.target.parentNode;

			targetParent.parentNode.removeChild(targetParent);		}
		);
		
		insertLine(div);
		insertLine(div);
		insertLine(div);
		proList.appendChild(div);
		

}