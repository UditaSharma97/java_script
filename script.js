var proArr =[ ];
var proID=1;
var addPro = document.getElementById("addPro");
var addProPanel = document.getElementById("addProPanel");
var proList =document.getElementById("proList");
var proTable =document.getElementById("proTable");


function storeProducts(products)
{
localStorage.products = JSON.stringify(products);
}
function getStoredProducts()
{
if (!localStorage.products)
{
// default to empty array
localStorage.products = JSON.stringify([]);
}
return JSON.parse(localStorage.products);
}



addPro.addEventListener("click",function(event)
			{	createNewPro();	}
		);

function hideAddPro()
{
	addPro.setAttribute("style","visibility:hidden");
}

function showAddPro()
{
	addPro.setAttribute("style","visibility:visible");
}


function insertLine(target)
{
	var br=document.createElement("br");
	target.appendChild(br);
}

function updateProTableAfterEDIT(index)
{
	
	var tr=document.getElementById(proArr[index].Id);
	var tdID =tr.cells[0];
	tdID.innerHTML=proArr[index].Id;
	var tdName =tr.cells[1];
	tdName.innerHTML=proArr[index].Name;
	var tdDesp =tr.cells[2];;
	tdDesp.innerHTML=proArr[index].Desp;
	var tdPrice =tr.cells[3];;
	tdPrice.innerHTML=proArr[index].Price;
	var tdQuantity =tr.cells[4];;
	tdQuantity.innerHTML=proArr[index].Quantity;
		
}

function createListOfProducts(objPro)
{
	var tr=document.createElement("tr");
	tr.setAttribute("id",objPro.Id);
	
	var tdID =document.createElement("td");
	tdID.innerHTML=objPro.Id;
	tr.appendChild(tdID);
	var tdName =document.createElement("td");
	tdName.innerHTML=objPro.Name;
	tr.appendChild(tdName);
	var tdDesp =document.createElement("td");
	tdDesp.innerHTML=objPro.Desp;
	tr.appendChild(tdDesp);
	var tdPrice =document.createElement("td");
	tdPrice.innerHTML=objPro.Price;
	tr.appendChild(tdPrice);
	var tdQuantity =document.createElement("td");
	tdQuantity.innerHTML=objPro.Quantity;
	tr.appendChild(tdQuantity);
	
	var tdEdit =document.createElement("td");
	var btEdit =document.createElement("button");
	btEdit.innerHTML="EDIT"	
	tdEdit.addEventListener("click",function(event)
					{
						var targetParent=event.target.parentNode.parentNode;
						var proIndex= getProInedx(parseInt(targetParent.id));					//	returns the index of the obj in proArr
						editInDom(proIndex);													//	creates a panel havinh the selected row's values filled
					}
		);
	tdEdit.appendChild(btEdit);
	tr.appendChild(tdEdit);
	
	var tdDel =document.createElement("td");
	var btDel =document.createElement("button");
	btDel.innerHTML="DELETE"	
	tdDel.appendChild(btDel);
	tdDel.addEventListener("click",function(event)
					{
						var targetParent=event.target.parentNode.parentNode;
						var proIndex= getProInedx(parseInt(targetParent));
						delFromProArr(proIndex);
						targetParent.parentNode.removeChild(targetParent);
					}
		);
	
	tr.appendChild(tdDel);
	proTable.appendChild(tr);
	
}

function editInProArr(index)
{	

console.log(proArr);
	proArr[index].Name=document.getElementById("ipProName").value;
	proArr[index].Desp=document.getElementById("ipDesp").value;
	proArr[index].Price=document.getElementById("ipPrice").value;
	proArr[index].Quantity=document.getElementById("ipQuantity").value;
console.log(proArr);
	deleteProPanel();
	showAddPro();
	
}

function editInDom(selectedProductIndex)
{
	insertLine(addProPanel);
	insertLine(addProPanel);
	console.log(selectedProductIndex);
	var name=document.createElement("label");
	name.innerHTML="NAME : ";
	var ipProName=document.createElement("input");
	ipProName.value=proArr[selectedProductIndex].Name;
	ipProName.setAttribute("type","text");
	ipProName.setAttribute("id","ipProName");
	addProPanel.appendChild(name);
	addProPanel.appendChild(ipProName);
	insertLine(addProPanel);
	insertLine(addProPanel);
	
	var desp=document.createElement("label");
	desp.innerHTML="DESCRIPTION : ";
	var ipDesp=document.createElement("textarea");
	ipDesp.value=proArr[selectedProductIndex].Desp;
	ipDesp.setAttribute("id","ipDesp");
	addProPanel.appendChild(desp);
	addProPanel.appendChild(ipDesp);
	insertLine(addProPanel);
	insertLine(addProPanel);

	var price=document.createElement("label");
	price.innerHTML="PRICE : ";
	var ipPrice=document.createElement("input");
	ipPrice.value=proArr[selectedProductIndex].Price;
	ipPrice.setAttribute("type","text");
	ipPrice.setAttribute("id","ipPrice");
	addProPanel.appendChild(price);
	addProPanel.appendChild(ipPrice);
	insertLine(addProPanel);
	insertLine(addProPanel);

	var quantity=document.createElement("label");
	quantity.innerHTML="QUANTITY : ";
	var ipQuantity=document.createElement("input");
	ipQuantity.value=proArr[selectedProductIndex].Quantity;
	ipQuantity.setAttribute("type","text");
	ipQuantity.setAttribute("id","ipQuantity");
	addProPanel.appendChild(quantity);
	addProPanel.appendChild(ipQuantity);
	insertLine(addProPanel);
	insertLine(addProPanel);	

	var confirmAdd = document.createElement("button");
	confirmAdd.setAttribute("id","confirmAdd");
	confirmAdd.innerHTML="SAVE CHANGES";
	confirmAdd.addEventListener("click",function(event)
					{			editInProArr(selectedProductIndex);									// edits the changes into proArr	
								updateProTableAfterEDIT(selectedProductIndex);									// updates the changes in the table
					}			
			);
	
	addProPanel.appendChild(confirmAdd);
	
	
}

function delFromProArr(selectedProductIndex)
{
	proArr.splice(selectedProductIndex,1);
	//console.log(proArr);
}


function getProInedx(id)
{
	    for (var i = 0; i < proArr.length; i++) 
	{
        		if (proArr[i].Id == id) 
					return i;
	}
}

function deleteProPanel()
{

	   var childNodes = addProPanel.childNodes;
	   for (var i = 0; childNodes.length > 0;) 
	   {
	     addProPanel.removeChild(childNodes[i]);
	   }

}


function addToProArr()
{
	var objPro= new Object();
	objPro.Id=proID;
	objPro.Name=document.getElementById("ipProName").value;
	objPro.Desp=document.getElementById("ipDesp").value;
	objPro.Price=document.getElementById("ipPrice").value;
	objPro.Quantity=document.getElementById("ipQuantity").value;

	proArr.push(objPro);
	createListOfProducts(objPro);								// create list in dom
	deleteProPanel();
	showAddPro();

	proID++;
	
}

function createProPanel()
{
	insertLine(addProPanel);
	insertLine(addProPanel);
	
	var name=document.createElement("label");
	name.innerHTML="NAME : ";
	var ipProName=document.createElement("input");
	ipProName.setAttribute("type","text");
	ipProName.setAttribute("id","ipProName");
	addProPanel.appendChild(name);
	addProPanel.appendChild(ipProName);
	insertLine(addProPanel);
	insertLine(addProPanel);
	
	var desp=document.createElement("label");
	desp.innerHTML="DESCRIPTION : ";
	var ipDesp=document.createElement("textarea");
	ipDesp.setAttribute("id","ipDesp");
	addProPanel.appendChild(desp);
	addProPanel.appendChild(ipDesp);
	insertLine(addProPanel);
	insertLine(addProPanel);

	var price=document.createElement("label");
	price.innerHTML="PRICE : ";
	var ipPrice=document.createElement("input");
	ipPrice.setAttribute("type","text");
	ipPrice.setAttribute("id","ipPrice");
	addProPanel.appendChild(price);
	addProPanel.appendChild(ipPrice);
	insertLine(addProPanel);
	insertLine(addProPanel);

	var quantity=document.createElement("label");
	quantity.innerHTML="QUANTITY : ";
	var ipQuantity=document.createElement("input");
	ipQuantity.setAttribute("type","text");
	ipQuantity.setAttribute("id","ipQuantity");
	addProPanel.appendChild(quantity);
	addProPanel.appendChild(ipQuantity);
	insertLine(addProPanel);
	insertLine(addProPanel);	

	var confirmAdd = document.createElement("button");
	confirmAdd.setAttribute("id","confirmAdd");
	confirmAdd.innerHTML="CONFIRM TO ADD";
	addProPanel.appendChild(confirmAdd);
	confirmAdd.addEventListener("click",function(event)
					{	addToProArr();	}								// add info to product array
			);
}

function createNewPro()
{
	hideAddPro();					// hide the add button
	createProPanel();				//create panel
}

