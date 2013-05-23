///Javascript Document

///Nootan Ghimire <nootan.ghimire@gmail.com>
///In Behalf of "HCOE Developers' Group"
///gates.js 

///Contains functions for different types of logic gates;


///The Basics 
function and(i1, i2){
	return i1 & i2 ;
}

function or(i1, i2){
	return i1 | i2 ;
}

function not(i1){
	return ~i1;
}


///The Universals
function nand(inp1, inp2){
	return not(and(inp1, inp2));
}

function nor(inp1, inp2){
	return not(or(inp1, inp2));
}


///The Arithmetics (A.B' + A'.B)
function xor(i1, i2){
	return or(and(i1, not(i2)), and(not(i1), i2));
}

function xnor(i1, i2){
	return not(xor(i1, i2));
}


//End of Document. 