//Javascript document

///Nootan Ghimire<nootan.ghimire@gmail.com>
///in behalf of "HCOE Decvelopers' Group"
///with aim to provide student less difficulty
///in analysing logic circuits

w = document.getElementById('workspace');
p = document.getElementById('popbox');
var currentGate = "";
var gateArray = [];

function btnClick(btnObj){   
  switch(btnObj.id){       
    case "and":
    currentGate = "and";
    p.style.display ="inline";
	break;

		case "or":
		break;

		case "not":
		break;

		default:
		break;
	}
}


function submitCode(formobj){


	var code = currentGate + "(" + formobj[0].value + "," + formobj[1].value + ")";
	objGate = {
		fn:currentGate,
		ip1:formobj[0],
		ip2:formobj[1],
		output: function() {
			return window[this.fn](this.ip1, this.ip2);
		}
	}
	gateArray.push(objGate);


	alert(code);
}


function printArray(arr){

	for(i=0; i<arr.length; i++){
		var code = 
	}
}