///Javascript Document

///Nootan Ghimire <nootan.ghimire@gmail.com>
///In Behalf of "HCOE Developers' Group"
///experience.js 

///Contains functions for implementing the gates
///and providing a user experience core models

///Global namespace
var gateChronology = []; 
var counter = 0;

///This is what object will look like
/*var gateObj = {
		fn:"",
		ip1:0,
		ip2:0,
		chrono:0
};*/


function getGate(type, ip_1, ip_2) {

	//alert(document.getElementById("gate_select").value);

	var gate = document.getElementById("gate_select").value;
	var ip_1 =  document.getElementById("ip1").value;
	var ip_2 =  document.getElementById("ip2").value;
	var gateObj = {
		fn:gate,
		ip1:ip_1,
		ip2:ip_2,
		chrono:counter
	};
	gateChronology.push(gateObj);
	counter++;
	//var o_p = window[gate](ip_1, ip_2);
	//alert(o_p);
}

function sortbyChrono(arr) {
	//sort the gateChronology array by chronology.
}


function executeGate(){
	//First, get the gate array of objects
	for(i=0; i<counter; i++){

	}
}


///Help from stack overflow

/*
var arr = [];
var len = oFullResponse.results.length;
for (var i = 0; i < len; i++) {
    var obj = {
        key: oFullResponse.results[i].label,
        sortable: true,
        resizeable: true
    };
    arr.push(obj);
}
*/

and(a,b)

or(c,d)

onclick

var x = and(a,b);
var y = or(a,b);
var z = and(x,y);
