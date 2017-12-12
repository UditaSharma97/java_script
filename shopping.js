var proArray=[];
var selectedProArray=[];
var selProID=0;
var proID=1;
var proList =document.getElementById("List");
proArray=getStoredProducts();
showProducts();

function getStoredProducts()			//retrieve products into pro array from local storage
{
	if (!localStorage.products)
	{
		// default to empty array
		localStorage.products = JSON.stringify([]);
	}
	return JSON.parse(localStorage.products);
}

function showProducts()			//copy pro array into a object and then add into dom
{
	for(i=0;i<proArray.length;i++)
	{		
		var objPro= new Object();
		objPro.Id=proArray[i].Id;
		objPro.Name=proArray[i].Name;
		objPro.Desp=proArray[i].Desp;
		objPro.Price=proArray[i].Price;
		objPro.Quantity=proArray[i].Quantity;
		createListOfProducts(objPro)				// making table of products in dom (appending new product)
		proID=objPro.Id;
	}
proID++;
}

function insertLine(target)
{
	var br=document.createElement("br");
	target.appendChild(br);
}


function getProIndex(id)					//returns the id of the selected product
{
	for (var i = 0; i < proArray.length; i++) 
	{
		//console.log(proArray[i]);
        		if (proArray[i].Id == id) 
				{
					return i;
				}
					
	}
}

function deleteAll()					//removes the details of product form from dom
{

	   var childNodes = proList.childNodes;
	   for (var i = 0; childNodes.length > 0;) 
	   {
	     proList.removeChild(childNodes[i]);
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
		bt.setAttribute("id","addToCart");
		bt.innerHTML="Add To Cart";
		div.appendChild(bt);
		bt.addEventListener("click",function(event)
		{
			
			var qnt=document.createElement("input");
			qnt.setAttribute("type","text");
			qnt.setAttribute("placeholder","Enter Quantity required");
			qnt.addEventListener("keyup",function(event)
			{
				if (event.which == "13")
				{
					console.log("available:")
					console.log(proArray[index].Quantity)
					if(parseInt(proArray[index].Quantity)>=qnt.value)
					{
						proArray[index].Quantity=parseInt(proArray[index].Quantity)-parseInt(qnt.value);
						selectPro(obj,qnt.value);
						deleteAll();
						showProducts();						
					}
					else
					{
						alert("Required amount is anavailable");
					}
					
				}
				else
				{
					
				}
			}
				
			
			)
			//qnt.setAttribute("id","ipPrice");
			var target=event.target.parentNode;
			var index=getProIndex(parseInt(target.id));
			
			if(proArray[index].Quantity==0)
				{
					alert("SOLD OUT");
				}
			else
				{ console.log("start");
					event.target.parentNode.appendChild(qnt);
				console.log("end");
					
				}
			
			
		}
		);
		
		insertLine(div);
		insertLine(div);
		insertLine(div);
		proList.appendChild(div);
		

}

function selectPro(obj,n)
{
	selectedProArray.push(obj);
	selectedProArray[selProID].Quantity=n;
	console.log(selectedProArray);
	selProID++;
}

document.getElementById("checkout").addEventListener("click",function(event)			//links the add pro button in dom with the function create new product
		{	storeProducts(selectedProArray)	 }
		);
		
function storeProducts(selectedProducts)		//store the selected pro array in local storage+
{
localStorage.selectedProducts = JSON.stringify(selectedProducts);
}

