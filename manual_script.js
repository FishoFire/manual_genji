
/*
alert(  localStorage.getItem('myCat') ) // get
localStorage.setItem('myCat', 'Tom'); //set 

localStorage.removeItem('myCat'); // one
localStorage.clear(); // all
*/


/*

- can move a cp by swaping the data in Checkpoints and updating the selection
- maybe a seperate button for add cp end and add cp after curent cp
- save button could togle the menu

- input check
	- if any input field doesnt have right number of , or things dont get counted as numbers
	- on copy for all at once?
	- color field if wrong input during typing?

- give 2 save options: cookie and string format
	- string format load into selected save with warning if something in it


- workshop toggles

- list wich addons are enabled so user knows for future data




*/

var SelectedCp = -1
var CheckPoints = []
var MapData = [
    "", // maker
    "", // code
    "" // notes
    ]


if(localStorage.getItem('savenames') != null){
    var SaveNames = JSON.parse(localStorage.getItem('savenames'))

} else {
    var SaveNames = ["save 0","save 1","save 2","save 3","save 4"]
}


function CpButtons(){
    const cpbuttons = document.querySelectorAll('.cpbuttonclass');
    cpbuttons.forEach(cpbuttons => {
        cpbuttons.remove();
    });
    for(let i=0; i < CheckPoints.length; i++){
        let btn = document.createElement("button");
        btn.innerHTML = ("CP " + (i));
        btn.id = "CPBUTTON" + (i)
        btn.value = (i)
        btn.className = "cpbuttonclass"
        btn.onclick = function(){SelectedCp = parseInt(btn.value);UpdateSelection()};
        document.getElementById("cp_buttons").appendChild(btn);
    }
}
document.getElementById("save0").value = SaveNames[0]
document.getElementById("save1").value = SaveNames[1]
document.getElementById("save2").value = SaveNames[2]
document.getElementById("save3").value = SaveNames[3]
document.getElementById("save4").value = SaveNames[4]

function ShowMsg(x){
    
    document.getElementById("message").innerHTML = x
    document.getElementById("message").style.display = "block"
    
    setTimeout(() => {
        document.getElementById("message").style.display = "none"
        document.getElementById("message").innerHTML = "" 
    }, 2500);
    
}

function Save(x){
    localStorage.setItem('headerdata'+x, JSON.stringify(MapData));
    localStorage.setItem('checkpoints'+x, JSON.stringify(CheckPoints));
    SaveNames[x] = document.getElementById("save"+x).value ;
    localStorage.setItem('savenames',JSON.stringify(SaveNames))

    ShowMsg("Saved!")
}

function Load(x){
    if(localStorage.getItem('headerdata'+x) != null){
        MapData = JSON.parse( localStorage.getItem('headerdata'+x) )
        CheckPoints = JSON.parse(  localStorage.getItem('checkpoints'+x) )
        /*
        UpdateTop()
        UpdateSelection()
        */
        
        CpButtons()
        SelectedCp = 0
        document.getElementById("cpdata").style.display = "block"
        document.getElementById("orbs-kills").style.display = "block"
        document.getElementById("maker").value =  MapData[0]
        document.getElementById("code").value =  MapData[1]
        document.getElementById("notes").value =  MapData[2]

        UpdateSelection()
        UpdateTop()
        changebar(0)
        ShowMsg("Loaded!")
    }
}

function UpdateTop(){
    MapData[0] = document.getElementById("maker").value 
    MapData[1] = document.getElementById("code").value 
    MapData[2] = document.getElementById("notes").value 
}

function changebar(x){
    document.getElementById("tool").style.display = x == 0 ? "block" : "none"
    document.getElementById("savebar").style.display = x == 1 ? "block" : "none"
    document.getElementById("helpbar").style.display = x == 2 ? "block" : "none"

}

function ImportJson(){


    CheckPoints = JSON.parse(document.getElementById('jsonfield').value.split("+++")[0])
    MapData = JSON.parse(document.getElementById('jsonfield').value.split("+++")[1])
    CpButtons()
    SelectedCp = 0
    document.getElementById("cpdata").style.display = "block"
    document.getElementById("orbs-kills").style.display = "block"
    document.getElementById("maker").value =  MapData[0]
    document.getElementById("code").value =  MapData[1]
    document.getElementById("notes").value =  MapData[2]

    UpdateSelection()
    UpdateTop()
    changebar(0)

}

function ExportJson(){
    var jsonstring = JSON.stringify(CheckPoints) + "+++" +  JSON.stringify(MapData) 
    
    var resultthing = document.getElementById("results")
    resultthing.value = jsonstring
    resultthing.select()
    resultthing.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(resultthing.value);
    //alert("data copied to clipboard")
    ShowMsg("copied to clipboard!")
}

function UpdateSelection(){
    document.getElementById("selectedcpnumber").innerHTML  = "Checkpoint: "+ SelectedCp
    document.getElementById("CPvector").value  =  CheckPoints[parseInt(SelectedCp)][0]
    document.getElementById("CPteleportTF").checked  = CheckPoints[parseInt(SelectedCp)][1]
    document.getElementById("CPteleportVect").value  = CheckPoints[parseInt(SelectedCp)][2]
    document.getElementById("CPdashenable").checked  = CheckPoints[parseInt(SelectedCp)][3]
    document.getElementById("CPultenable").checked  = CheckPoints[parseInt(SelectedCp)][4]
	
    document.getElementById("CPnotes").value  = CheckPoints[parseInt(SelectedCp)][5]

    //document.getElementById("hideoptionscp0").style.display =  SelectedCp == 0 ? "none" : "block"
    document.getElementById("DashToggleEnabled").innerHTML = CheckPoints.some(function(i){return i[3]}) ? "Dash addon: enabled |" : "Dash addon: disabled |"
    document.getElementById("DashToggleEnabled").style.color = CheckPoints.some(function(i){return i[3]}) ? "darkgreen" : "black"
    document.getElementById("UltToggleEnabled").innerHTML = CheckPoints.some(function(i){return i[4]}) ? "| Ult addon: enabled" : "| Ult addon: disabled"
    document.getElementById("UltToggleEnabled").style.color = CheckPoints.some(function(i){return i[4]}) ? "darkgreen" : "black"
     
    UpdateOrbs()
}

function UpdateAfterChange(){
    CheckPoints[parseInt(SelectedCp)][0] = document.getElementById("CPvector").value

	CheckPoints[parseInt(SelectedCp)][1] = document.getElementById("CPteleportTF").checked
	CheckPoints[parseInt(SelectedCp)][2] = document.getElementById("CPteleportVect").value


	CheckPoints[parseInt(SelectedCp)][3] = document.getElementById("CPdashenable").checked 
	CheckPoints[parseInt(SelectedCp)][4] = document.getElementById("CPultenable").checked

    CheckPoints[parseInt(SelectedCp)][5] = document.getElementById("CPnotes").value
  

    document.getElementById("DashToggleEnabled").innerHTML = CheckPoints.some(function(i){return i[3]}) ? "Dash addon: enabled |" : "Dash addon: disabled |"
    document.getElementById("DashToggleEnabled").style.color = CheckPoints.some(function(i){return i[3]}) ? "darkgreen" : "black"
    document.getElementById("UltToggleEnabled").innerHTML = CheckPoints.some(function(i){return i[4]}) ? "| Ult addon: enabled" : "| Ult addon: disabled"
    document.getElementById("UltToggleEnabled").style.color = CheckPoints.some(function(i){return i[4]}) ? "darkgreen" : "black"
     

}


function AddNewCP(x){
    document.getElementById("cpdata").style.display = "block"
    document.getElementById("orbs-kills").style.display = "block"
    
    if(x == 0){
        CheckPoints.push(
            [
            "0,0,0", //0 pos
            false, //1 teleport t/f
            "0,0,0", //2 teleport pos
            false, //3 dash
            false, //4 ult
            "", //5 notes
            [], //6 orb
            [] //7 kill
            ]
        )
        SelectedCp = CheckPoints.length -1

    } else {

        CheckPoints.splice(
            SelectedCp + 1, 
              
            0, 
            [
            "0,0,0", //0 pos
            false, //1 teleport t/f
            "0,0,0", //2 teleport pos
            false, //3 dash
            false, //4 ult
            "", //5 notes
            [], //6 orb
            [] //7 kill
            ]
        )

        SelectedCp ++
    }

    UpdateSelection()
    CpButtons()   
}

function AddOrb(){
    CheckPoints[SelectedCp][6].push(
        [
        "", //0 pos
        false, //1 dash
        false, //2 ult
        false, //3 lock
		0 //4 strength
        ]
    )
    UpdateOrbs()
    // add default stats to cehckpoints curent selected
    // update visuals
}

function AddKill(){
	 CheckPoints[SelectedCp][7].push(
        [
        "", //0 pos
        false //1 radius
        ]
    )
    UpdateOrbs()
}


function UpdateOrbs(){
     // delete all old orbs
    const bounceorb = document.querySelectorAll('.bounceorb ');
    bounceorb.forEach(bounceorb => {
        bounceorb.remove();
    });
    const killorb = document.querySelectorAll('.killorb');
    killorb.forEach(killorb => {
        killorb.remove();
    });
	
	var orbcount = 0
	for (let i = 0; i < CheckPoints.length; i++){
		if (CheckPoints[i][6] != []){
			orbcount +=  CheckPoints[i][6].length
		}
		if (CheckPoints[i][7] != []){
			orbcount +=  CheckPoints[i][7].length
		}
	}
	document.getElementById("orbcounter").innerHTML = "orb count: "+ orbcount+"/193"

    // add the new ones for each
    if (CheckPoints[SelectedCp][6].length > 0){
		for (let i = 0;  i < CheckPoints[SelectedCp][6].length; i++) { // orbs
			let thediv = document.createElement("div");
            thediv.style.textAlign = "left";
			thediv.id = "orbdiv" + i
			thediv.innerHTML = "orb "+ i + " | position ";
			thediv.value = (CheckPoints.length-1)
			thediv.className = "bounceorb"
			document.getElementById("orbs-kills").appendChild(thediv);

			//vector
			let vectbox = document.createElement("textarea");
			vectbox.id = "vectbox"
			vectbox.placeholder = "0,0,0"
			if (CheckPoints[SelectedCp][6][i][0] != ""){vectbox.value = CheckPoints[SelectedCp][6][i][0]}
			vectbox.onchange = function(){CheckPoints[SelectedCp][6][i][0] = vectbox.value}
			vectbox.rows = 1
			vectbox.cols = 20
			document.getElementById("orbdiv" + i).appendChild(vectbox)

			// strength
			document.getElementById("orbdiv" + i).insertAdjacentText("beforeend", "\nstrength ")
			let strbox = document.createElement("textarea");
			strbox.id = "strbox"
			strbox.placeholder = "0.0"
			if (CheckPoints[SelectedCp][6][i][4] != ""){strbox.value = CheckPoints[SelectedCp][6][i][4]}
			strbox.onchange = function(){CheckPoints[SelectedCp][6][i][4] = strbox.value}
			strbox.rows = 1
			strbox.cols = 5
			document.getElementById("orbdiv" + i).appendChild(strbox)

            /*
            // filler
            let filler = document.createElement("div");
            filler.style.width = "25%"
            document.getElementById("orbdiv" + i).appendChild(filler)
            */

			// checkbox lock
			document.getElementById("orbdiv" + i).insertAdjacentText("beforeend", "| lock")
			let checkbox1 = document.createElement("input");
			checkbox1.setAttribute("type", "checkbox");
			checkbox1.checked =  CheckPoints[SelectedCp][6][i][3]
			checkbox1.onchange = function(){CheckPoints[SelectedCp][6][i][3] = checkbox1.checked}
			document.getElementById("orbdiv" + i).appendChild(checkbox1)
			
			// checkbox dash
			document.getElementById("orbdiv" + i).insertAdjacentText("beforeend", "| dash")
			let checkbox2 = document.createElement("input");
			checkbox2.setAttribute("type", "checkbox");
			checkbox2.checked =  CheckPoints[SelectedCp][6][i][1]
			checkbox2.onchange = function(){CheckPoints[SelectedCp][6][i][1] = checkbox2.checked}
			document.getElementById("orbdiv" + i).appendChild(checkbox2)

			// checkbox ult
			document.getElementById("orbdiv" + i).insertAdjacentText("beforeend", "| ult")
			let checkbox3 = document.createElement("input");
			checkbox3.setAttribute("type", "checkbox");
			checkbox3.checked =  CheckPoints[SelectedCp][6][i][2]
			checkbox3.onchange = function(){CheckPoints[SelectedCp][6][i][2] = checkbox3.checked}
			document.getElementById("orbdiv" + i).appendChild(checkbox3)

			// delete button
			let lockbutton = document.createElement("button");
			lockbutton.innerHTML = "delete"
			lockbutton.style.float = "right"
            //lockbutton.style.display = "relative"
            //lockbutton.style.marginLeft = "25%"

			lockbutton.value = i
			lockbutton.onclick = function(){CheckPoints[SelectedCp][6].splice(i,1);UpdateOrbs();}
			document.getElementById("orbdiv" + i).appendChild(lockbutton);

		}
	}
	if (CheckPoints[SelectedCp][7].length > 0){
		for (let it = 0;  it < CheckPoints[SelectedCp][7].length; it++) { // orbs
			let thediv2 = document.createElement("div");
			thediv2.id = "killdiv" + it
			thediv2.innerHTML = "kill "+ it + " | position ";
			thediv2.value = (CheckPoints.length-1)
			thediv2.className = "killorb"
			document.getElementById("orbs-kills").appendChild(thediv2);

			let vectbox2 = document.createElement("textarea");
			vectbox2.id = "vectbox"
			vectbox2.placeholder = "0,0,0"
			if (CheckPoints[SelectedCp][7][it][0] != ""){vectbox2.value = CheckPoints[SelectedCp][7][it][0]}
			vectbox2.onchange = function(){CheckPoints[SelectedCp][7][it][0] = vectbox2.value}
			vectbox2.rows = 1
			vectbox2.cols = 25
			document.getElementById("killdiv" + it).appendChild(vectbox2)	

			document.getElementById("killdiv" + it).insertAdjacentText("beforeend", " | radius ")
			let radius1 = document.createElement("textarea");
			radius1.id = "vectbox"
			radius1.placeholder = "0.1"
			if (CheckPoints[SelectedCp][7][it][1] != ""){radius1.value = CheckPoints[SelectedCp][7][it][1]}
			radius1.onchange = function(){CheckPoints[SelectedCp][7][it][1] = radius1.value}
			radius1.rows = 1
			radius1.cols = 8
			document.getElementById("killdiv" + it).appendChild(radius1)	
			
			// delete button
			let lockbutton = document.createElement("button");
			lockbutton.innerHTML = "delete"
			lockbutton.style.float = "right"
			lockbutton.value = it
			lockbutton.onclick = function(){CheckPoints[SelectedCp][7].splice(it,1);UpdateOrbs();}
			document.getElementById("killdiv" + it).appendChild(lockbutton);
		}
	}

}

	
        

function RemoveCP(){
    //each with value above this one
    //value - 1
    if (CheckPoints.length > 0){
        document.getElementById("CPBUTTON"+SelectedCp).remove()
        CheckPoints.splice(SelectedCp,1)
        
        for (let i = SelectedCp + 1;  i <= CheckPoints.length; i++) {
            document.getElementById("CPBUTTON"+i).innerHTML = "Checkpoint " + (i - 1)
            document.getElementById("CPBUTTON"+i).value =  (i - 1)
            document.getElementById("CPBUTTON"+i).id = "CPBUTTON"+(i-1)
        }   

        SelectedCp --
        UpdateSelection() 

    }
}

var data_cps

var data_orb_cp 
var data_orb_pos
var data_orb_lock
var data_orb_dash
var data_orb_ult
var data_orb_strength

var data_kill_pos
var data_kill_rad
var data_kill_cp

var mapcode
var mapmaker
// copy button
function Copy(){

    // cp data
    data_cps = (
        "\n\t\tGlobal.A = Array("
    )
    for (let i = 0;  i < CheckPoints.length; i++){
        if (CheckPoints[i][1]){

			data_cps += "\n\t\t\tArray(Vector(" + CheckPoints[i][0] + "), Vector(" + CheckPoints[i][2]+ ")),"

		} else{
			data_cps += "\n\t\t\tVector("+CheckPoints[i][0]+"),"
		}
    }
    data_cps = data_cps.slice(0,-1) // remove last ,
    data_cps += "\n\t\t);"

    // bounce
	data_orb_cp = "Global.pinballnumber = Array( "
	data_orb_pos = "Global.TQ = Array( "
	data_orb_lock = "Global.BounceToggleLock = Array( "
	data_orb_dash = "Global.TQ6 = Array( "
	data_orb_ult = "Global.TQ5 = Array( "
	data_orb_strength = "Global.EditMode = Array( "
	for (let i = 0;  i < CheckPoints.length; i++){
		for (let i2 = 0;  i2 < CheckPoints[i][6].length; i2++){
			data_orb_cp += "\n\t\t\t" + i + ","
			data_orb_pos += "\n\t\t\tVector("+CheckPoints[i][6][i2][0]+"),"
			data_orb_lock += "\n\t\t\t" + (CheckPoints[i][6][i2][3] ? 'True' : 'False') + ","
			data_orb_dash += "\n\t\t\t" + (CheckPoints[i][6][i2][1] ? 'True' : 'False') + ","
			data_orb_ult += "\n\t\t\t" + (CheckPoints[i][6][i2][2] ? 'True' : 'False') + ","
			data_orb_strength += "\n\t\t\t" + CheckPoints[i][6][i2][4]  + ","
		}
	}
	
	data_orb_cp = data_orb_cp.slice(0,-1) + "\n\t\t);" 
	data_orb_pos = data_orb_pos.slice(0,-1) + "\n\t\t);" 
	data_orb_lock = data_orb_lock.slice(0,-1) + "\n\t\t);" 
	data_orb_dash = data_orb_dash.slice(0,-1) + "\n\t\t);" 
	data_orb_ult = data_orb_ult.slice(0,-1) + "\n\t\t);" 
	data_orb_strength = data_orb_strength.slice(0,-1) + "\n\t\t);" 

	/*
	0 pos
	1 dash
	2 ult
	3 lock
	cp auto
	*/

	// kill
	data_kill_pos = "Global.H = Array( "
	data_kill_rad = "Global.I = Array( "
	data_kill_cp = "Global.killballnumber = Array( "
	for (let i = 0;  i < CheckPoints.length; i++){
		for (let i2 = 0;  i2 < CheckPoints[i][7].length; i2++){
			data_kill_pos += "\n\t\t\tVector(" + CheckPoints[i][7][i2][0]+"),"
			data_kill_rad += "\n\t\t\t" + CheckPoints[i][7][i2][1]+","
			data_kill_cp += "\n\t\t\t" + i + ","
		}
	}
	data_kill_pos = data_kill_pos.slice(0,-1) + "\n\t\t);" 
	data_kill_rad = data_kill_rad.slice(0,-1) + "\n\t\t);" 
	data_kill_cp = data_kill_cp.slice(0,-1) + "\n\t\t);" 
	
	ulteanbled = "disabled " // enable ult rule  
	if (CheckPoints.some(function(i){return i[4]})  ){
		ulteanbled = ""
		ultarray =  "Global.Dao = Array(Empty Array, "
		for (let i = 0;  i < CheckPoints.length; i++){
			if (CheckPoints[i][4]){
				ultarray += i + ", "
			}
		}
		ultarray = ultarray.slice(0,-2) + ");\n"
	} else {
		ultarray = "Global.Dao = Array(Empty Array, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1);\n"
	}

	dasheanbled = "disabled " // enable dash rule  4
	if (CheckPoints.some(function(i){return i[3]})  ){
		dasheanbled = ""
		dasharray = "Global.SHIFT = Array(Empty Array, "
		for (let i = 0;  i < CheckPoints.length; i++){
			if (CheckPoints[i][3]){
				dasharray += i + ", "
			}
		}
		dasharray = dasharray.slice(0,-2) + ");\n"
	} else {
		dasharray = "Global.SHIFT = Array(Empty Array, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1);\n"
	}
	
    mapcode = document.getElementById("code").value
    mapmaker = document.getElementById("maker").value

    setdata()

    var resultthing = document.getElementById("results")
    resultthing.value = data_pasta
    resultthing.select()
    resultthing.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(resultthing.value);
    ShowMsg("copied to clipboard!")
    //alert("data copied to clipboard")

}


