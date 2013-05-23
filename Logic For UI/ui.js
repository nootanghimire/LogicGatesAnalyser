var outputs = []; //array of strings containing output box names 
var gateArray =[]; //to push objects.
var finalGateId ; //Final output?
var counter = 0;
var dependencies = []; //the dependency object
var popbox = document.getElementById('popbox');
var workspace = document.getElementById('workspace');


///This part is needed to configure fiber-js (git://github.com/kangax/fiberjs)
//This is for drawing gates
	var txt = {},
    txtWidth = 85, 
    txtHeight = 18;
//Gates Var Declaration End

function ui(type){
	


	//createGate(type);

	var select_contents = '<option value="-99" selected="selected">--Select Inputs--</option>';
	if(outputs.length > 0) {
		for(i=0; i<outputs.length; i++){
			select_contents += '<option value="'+ outputs[i]+'">'+ outputs[i] + '\'s Value</option>';
		}
	}
	popbox.innerHTML = '<form id="form1"><select id="inp_1_sel">' + select_contents + '</select> Or <input type="text" value="0"/>' + '<br><select id="inp_2_sel">'+ select_contents + '</select> Or <input type="text" value="0" />' +'<br><input type="hidden" value="'+ type + '" /></form>';
	popbox.innerHTML += '<br><button onclick="submitCode(document.getElementById(\'form1\'));">Go!</button>';
	popbox.style.display= "inline";
	
	
	//show code


}

function submitCode(formObj){
	popbox.style.display = "none";
	var ip_select_1 = formObj[0].value;
	var ip_input_1 = formObj[1].value;
	var ip_select_2 = formObj[2].value;
	var ip_input_2 = formObj[3].value;
	var logic = formObj[4].value;
	
	if(ip_select_1 == -99) {
		//We got input
		createTextBox("ipbox_"+counter+ "_1",ip_input_1); //Make textboxes outta same pattern)
		//AttatchTextBoxToGate("ipbox_"+counter+ "_1", );
		//Assumes gate.var2path.js is included. 
		
	}
	else
	{
		//We got another input
		createTextBoxReadOnly("ipbox_"+counter+"_1");
		ListenTo(ip_select_1, "ipbox_"+counter+"_1");
		//Attach ipbox_....1 too it's parent text box
		//such that when the parent changes, it also changes.
		//AttatchTextBoxToGate(id, "input1", gate_id);
		
	}

	if(ip_select_2 == -99) {
		//We got input
		createTextBox("ipbox_"+counter+"_2", ip_input_2); // issue here.
		//AttatchTextBoxToGate(id, "input1", gate_id);
		
	}
	else
	{
		//We got another input
		createTextBoxReadOnly("ipbox_"+counter+"_2");
		ListenTo(ip_select_2, "ipbox_"+counter+"_2");
		//Attach ipbox_....2 to it's parent text box
		//such that when the parent changes, it also changes.
		//AttatchTextBoxToGate(id, "input1", gate_id);
		
	}
	createTextBoxReadOnly("opbox_"+counter);
	outputs.push("opbox_"+counter);
	onclickFns(logic);

}

/*
<form id="form1">
<select name="select">
	for(i=0; i<outputs.length)
</select>
</form>
*/

function onclickFns(Argtype){
	obj = {
		type:Argtype,
		i1:"ipbox_"+counter+"_1",
		i2:"ipbox_"+counter+"_2",
		op:"opbox_"+counter,
		id:counter
	};
	gateArray.push(obj);
	counter++;
}

function createTextBoxReadOnly(id){
	//Creates Read Only Text Box
	var to ='<input type="text" id="'+id + '" onchange="parent_onchange(this);" readonly="readonly" value="1" />';

	workspace.innerHTML += to ;
}
function createTextBox(id, value){
	workspace.innerHTML += '<input type="text" id="'+id + '" value="'+value+'" onchange="parent_onchange(this);"/>';	
}


///The two functions from now were copied and modified 
///Original source: http://fiberjs.com/demo
///Under Interacting with external elements

//For drawing gates, and attatching textboxes to it.
function AttatchTextBoxToGate(textbox_id, gatePath){
	var canvas = new fabric.Canvas('c');

	fabric.Canvas.prototype.getAbsoluteCoords = function(object) {
 	 	return {
    		left: object.left + this._offset.left,
    		top: object.top + this._offset.top
  		};
	}

	txt = document.getElementById(textbox_id)

	fabric.Image.fromURL('gates/'+gatePath, function(img) {

		canvas.add(img.set({ left: 250, top: 250}).scale(0.25));

	 	img.on('moving', function() { positionBtn(img) });
  		positionBtn(img);
	});
}


	function positionBtn(obj) {
  	var absCoords = canvas.getAbsoluteCoords(obj);

  	txt.style.left = (absCoords.left - txtWidth / 2) + 'px';
  	txt.style.top = (absCoords.top - txtHeight / 2) + 'px';
	}

///Copied Function end

//This is mimicking observable pattern in javascript

function ListenTo(parent_textbox, current_textbox){
	if(dependencies.length>0){
		for(i=0; i<dependencies.length; i++){
			if(dependencies[i].box_id == parent_textbox){
				dependencies[i].listeners.push(current_textbox);
				return;
			}
		}
	}
	//Totally New
	var obj ={
		box_id:parent_textbox,
		listeners:[current_textbox]
	};
	dependencies.push(obj);
}



//Call as onchange="parent_onchange(this);" on each output and input box;
function parent_onchange(ObjTextBox){
	var parent = ObjTextBox.getAttribute("id");
	//check for that in dependencies
	for(i=0; i<dependencies.length; i++){
		if(dependencies[i].box_id == parent){
			//Now notify all textBoxes.
			ChangeMe(dependencies[i].listeners, ObjTextBox.value);
			return; 
		}
	}
}


function ChangeMe(listenerArray, changeToValue){
	for(i=0; i<listenerArray.length; i++){
		document.getElementById(listenerArray[i]).value = changeToValue;
	}
}
//End Observable Pattern
