// MIT License
// Copyright (c) 2020 Luis Espino
let contador = {
	e0:0,
	e1:0,
	e2:0,
	e3:0,
	e4:0,
	e5:0,
	e6:0,
	e7:0
}
function reflex_agent(location, state){
   	if (state=="DIRTY") return "CLEAN";
   	else if (location=="A") return "RIGHT";
   	else if (location=="B") return "LEFT";
}

function test(states){
      	var location = states[0];		
      	var state = states[0] == "A" ? states[1] : states[2];
      	var action_result = reflex_agent(location, state);
      	countingStates();
      	document.getElementById("log").innerHTML+="<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);    	
      	if (action_result == "CLEAN"){
        	if (location == "A") states[1] = "CLEAN";
         	else if (location == "B") states[2] = "CLEAN";
      	}
      	else if (action_result == "RIGHT") states[0] = "B";
      	else if (action_result == "LEFT") states[0] = "A";		
        randomDirty();
		if(isTheEnd()){
			document.getElementById("log").innerHTML+=`<li><strong>Finished!!!!</strong></li>`;
		}
		else{
			setTimeout(function(){ test(states); }, 800);
		}

}

/**
 * Check states and count
 */
function countingStates(){
	const state = states[0];
	const nextState = states[1];
	const stateA = states[2];
	if( state === "A") {
        if(nextState === "DIRTY" && stateA === "DIRTY"){
            contador.e0++;
        }else if(nextState === "CLEAN" && stateA === "DIRTY"){
            contador.e1++;
        }else if(nextState === "CLEAN" && stateA === "CLEAN"){
            contador.e4++;
        }else if(nextState === "DIRTY" && stateA === "CLEAN"){
            contador.e5++;
        }
    }else{
        if(nextState === "CLEAN" && stateA === "DIRTY"){
            contador.e4++;
        }else if(nextState === "CLEAN" && stateA === "CLEAN"){
            contador.e5++;
        }else if(nextState === "DIRTY" && stateA === "DIRTY"){
            contador.e6++;
        }else if(nextState === "DIRTY" && stateA === "CLEAN"){
            contador.e7++;
        }
    }
}

/**
 * Set random dirty state
 */
function randomDirty(){
	let al = Math.floor(Math.random()*(3-1)+1)
	let al_st =Math.floor(Math.random()*(3-1)+1)
	if(al == 2){
	    if(states[1] == "CLEAN" && states[2]=="DIRTY"){
	    	states[1] = "DIRTY";
	    }
    	else if(states[1] == "DIRTY" && states[2]=="CLEAN"){
      		states[2] = "DIRTY";
   		}
    	else if(states[1] == "CLEAN" && states[2]=="CLEAN"){
      		if(al_st == 1){
        		states[1] = "DIRTY";
       		}
      		else if(al_st == 2){
        		states[2] = "DIRTY";
       		}
    	}

  }
}

/**
 * Check if the algoritm ends
 * @returns true or falsee if the algoritm ends
 */
function isTheEnd(){
	for (const [key, value] of Object.entries(contador)) {
	  if(value<2){
	    return false;
	  }
	}
	return true;
}

var states = ["A","DIRTY","DIRTY"];
test(states);