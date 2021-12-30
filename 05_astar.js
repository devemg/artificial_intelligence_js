// MIT License
// Copyright (c) 2021 Luis Espino

function heuristic(start, end) {
	var tiles_out = 0
	for (var i = 0; i < start.length; i++){
		if (start[i] != end[i]) tiles_out++
	}
	return tiles_out	
}

function successors(n, e){
	var suc = []
	for (var i = 0; i < n[0].length - 1; i++) {
        let level = n[3]+1
		let tmp = n[0].substring(i,i+1)
		let child = n[0].substring(0,i)+n[0].substring(i+1,i+2)+tmp+n[0].substring(i+2)
		suc.push([child,heuristic(child, e)+level,inc(),level]) 
	}
	return suc
}

function bestfirst(start, end){
	var cont = 0
	var dot = '{'
	var list = [[start,heuristic(start, end),inc(),0]];
	dot+=list[0][2]+`[label="${getPrintData(list[0][0][0])} | ${getPrintData(list[0][0][1])} | ${getPrintData(list[0][0][2])} \n ${getPrintData(list[0][0][3])} | ${getPrintData(list[0][0][4])} | ${getPrintData(list[0][0][5])} \n ${getPrintData(list[0][0][6])} | ${getPrintData(list[0][0][7])} | ${getPrintData(list[0][0][9])}"];`;
	while (list.length > 0){		
		var current = list.shift();
		if (current[0] == end) {			
			dot += '}'
			return dot
		}		
		var temp = successors(current, end);
		//temp.reverse();
		temp.forEach(val => dot+=val[2]+`[color="${val[0] === '12345678' ? '#7BE141': ''}" label="${getPrintData(val[0][0])} | ${getPrintData(val[0][1])} | ${getPrintData(val[0][2])} \n ${getPrintData(val[0][3])} | ${getPrintData(val[0][4])} | ${getPrintData(val[0][5])} \n ${getPrintData(val[0][6])} | ${getPrintData(val[0][7])} | ${getPrintData(val[0][9])}"];`+current[2]+'--'+val[2]+';')
		list = list.concat(temp);
		list = list.sort( function(a,b) { return a[1] - b[1] });
		cont++
		if (cont > 100) {
			alert("The search is looped!")
			dot += '}'
			return dot
		}
	}
	dot += '}'
	return dot
}

var id = 1
function inc() {
	return id++
}

function getPrintData(data) {
	return data ? data : '  ';
}

function puzzle() {
	var nodes //= prompt("Ingrese texto inicial y texto final separados por un espacio")
	if (nodes == null || nodes == '') nodes = '34125786 12345678'
	nodes = nodes.split(' ')
	return bestfirst(nodes[0], nodes[1])
}
