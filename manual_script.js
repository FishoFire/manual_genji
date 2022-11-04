
/*

==================
overpy update: comment out the line that checks numbers

change template:
make function setdata = String.raw'data'
put the variables in
- turn editor to off
- remove :lb comments
- replace settings with one were all maps on


paste the variables in:
var data_cps // checkpoints

${data_orb_cp}
${data_orb_pos}
${data_orb_lock} 
${data_orb_dash} 
${data_orb_ult}
${data_orb_strength}
${data_kill_pos}
${data_kill_rad}
${data_kill_cp}

${mapcode}
${mapmaker}

${ban_triple}
${ban_multi}
${ban_emote}
${ban_create}
${ban_dbhop}
${ban_dashstart}

${ban_bhopsCp}
${ban_bhopEnabled}

${ban_wallclimbCp}
${ban_wallclimbEnabled}

${portalon}
${difficultyhud}

${compon}
${comptime}
${compattempt}
${comprestarts}
${compdescription[0]}
${compdescription[1]}
${compdescription[2]}
${compdescription[3]}

${titleon}
${titlenames}
${titlecps}
${titlecolors}
=========================
*/

changebar(3) // initial page
var SelectedCp = -1
var CheckPoints = []
var maxtimecomp = 240
var MapData = [
    "", // maker
    "", // code
    "", // notes
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    "0",
    120, // 11 time limit 
    false, // 12 comp mode on
    0, //13 attempt limit
    [ 
        [0,"bunny","Lime Green"],
        [10,"jumper","White"],
        [20,"Ninja","Yellow"],
        [30,"pro","Orange"],
        [40,"expert","Purple"],
        [50,"master","Red"]   
     ], // 14 title data
    false,// 15 title on
    false, //16 comp disable restart mid run (late because i forgot)
    "",//comp description
    ]





MakeTitles()
/*
] ?  MapData[2] : ""
        MapData[3] =  MapData[3] ?  MapData[3] : false
        MapData[4] =  MapData[4] ?  MapData[4] : false
        MapData[5] =  MapData[5] ?  MapData[5] : false
        MapData[6] =  MapData[6] ?  MapData[6] : false
        MapData[7] =  MapData[7] ?  MapData[7] : false
        MapData[8] =  MapData[8] ?  MapData[8] : false
        MapData[9] = typeof MapData[9] != 'undefined' ?  MapData[9] : true
        MapData[10] = typeof MapData[10] != 'undefined' ?  MapData[10] : "0"
*/
// load save names
if(localStorage.getItem('savenames') != null){
    var SaveNames = JSON.parse(localStorage.getItem('savenames'))

} else {
    var SaveNames = ["save 0","save 1","save 2","save 3","save 4"]
}
document.getElementById("save0").value = SaveNames[0]
document.getElementById("save1").value = SaveNames[1]
document.getElementById("save2").value = SaveNames[2]
document.getElementById("save3").value = SaveNames[3]
document.getElementById("save4").value = SaveNames[4]



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

function ShowMsg(x){
    
    document.getElementById("message").innerHTML = CompileError ? "error" : x
    document.getElementById("messageblock").style.display = "block"
    document.getElementById("message").style.backgroundColor = CompileError ? "red" : "cyan" 
    setTimeout(() => {
        document.getElementById("messageblock").style.display = "none"
        document.getElementById("message").innerHTML = ""
        CompileError = false
    }, 5000); // 2500
    
}

function Save(x){
    localStorage.setItem('headerdata'+x, JSON.stringify(MapData));
    localStorage.setItem('checkpoints'+x, JSON.stringify(CheckPoints));
    SaveNames[x] = document.getElementById("save"+x).value ;
    localStorage.setItem('savenames',JSON.stringify(SaveNames))

    // ShowMsg("Saved!")
}

function Load(x){
    if(localStorage.getItem('headerdata'+x) != null){
        // load
        MapData = JSON.parse( localStorage.getItem('headerdata'+x) )
        CheckPoints = JSON.parse(  localStorage.getItem('checkpoints'+x) )
        
        // check data
        MapData[0] =  MapData[0] ?  MapData[0] : ""
        MapData[1] =  MapData[1] ?  MapData[1] : ""
        MapData[2] =  MapData[2] ?  MapData[2] : ""
        MapData[3] =  MapData[3] ?  MapData[3] : false
        MapData[4] =  MapData[4] ?  MapData[4] : false
        MapData[5] =  MapData[5] ?  MapData[5] : false
        MapData[6] =  MapData[6] ?  MapData[6] : false
        MapData[7] =  MapData[7] ?  MapData[7] : false
        MapData[8] =  MapData[8] ?  MapData[8] : false
        MapData[9] = typeof MapData[9] != 'undefined' ?  MapData[9] : true
        MapData[10] = typeof MapData[10] != 'undefined' ?  MapData[10] : "0"
        for(let i=0;i < CheckPoints.length;i++){
            CheckPoints[i][8] = CheckPoints[i][8]  ?  CheckPoints[i][8]  : false
            CheckPoints[i][9] = CheckPoints[i][9]  ?  CheckPoints[i][9]  : false
        }
        MapData[11] =  MapData[11] ?  MapData[11] :  120
        MapData[12] =  MapData[12] ?  MapData[12] :  false
        MapData[13] =  MapData[13] ?  MapData[13] :  0
        MapData[14] =  MapData[14] ?  MapData[14] :   [ 
            [0,"bunny","Lime Green"],
            [10,"jumper","White"],
            [20,"Ninja","Yellow"],
            [30,"pro","Orange"],
            [40,"expert","Purple"],
            [50,"master","Red"]   
        ]
        MapData[15] =  MapData[15] ?  MapData[15] :  false
        MapData[16] =  MapData[16] ?  MapData[16] :  false
        MapData[17] =  MapData[17] ?  MapData[17] :  "" 

        // show first tab
        document.getElementById("cpdata").style.display = "block"
        document.getElementById("orbs-kills").style.display = "block"
        document.getElementById("maker").value =  MapData[0]
        document.getElementById("code").value =  MapData[1]
        document.getElementById("notes").value =  MapData[2]
        document.getElementById("ban_triple").checked = MapData[3]
        document.getElementById("ban_multi").checked =  MapData[4]
        document.getElementById("ban_emote" ).checked = MapData[5]
        document.getElementById("ban_create").checked = MapData[6]
        document.getElementById("ban_dbhop" ).checked =  MapData[7]
        document.getElementById("ban_dashstart" ).checked = MapData[8]
        document.getElementById("portalOn").checked = MapData[9]
        document.getElementById("dif").value = MapData[10]
        document.getElementById("comptimeslider").value = MapData[11] 
        document.getElementById("comptimenumber").value = MapData[11] 
        document.getElementById("comptoggle").checked = MapData[12]      
        document.getElementById("compattempt").value = MapData[13] 
        document.getElementById("titletoggle").checked = MapData[15]
		document.getElementById("comprestart").checked = MapData[16]	
        document.getElementById("compdesc").value = MapData[17]	
            
        // load things in the tab
        SelectedCp = 0
        CpButtons()
        UpdateSelection()
        UpdateTop()
        MakeTitles()
        changebar(0)
        ShowMsg("Loaded!")
    }
}

function UpdateTop(){
    MapData[0] = document.getElementById("maker").value 
    MapData[1] = document.getElementById("code").value 
    MapData[2] = document.getElementById("notes").value 

    MapData[3] = document.getElementById("ban_triple").checked
    MapData[4] = document.getElementById("ban_multi").checked
    MapData[5] = document.getElementById("ban_emote" ).checked
    MapData[6] = document.getElementById("ban_create").checked
    MapData[7] = document.getElementById("ban_dbhop" ).checked
    MapData[8] = document.getElementById("ban_dashstart" ).checked
    MapData[9] = document.getElementById("portalOn" ).checked

    MapData[10] = document.getElementById("dif").value
    MapData[11] =  document.getElementById("comptimenumber").value
    MapData[12] = document.getElementById("comptoggle").checked
    MapData[13] = document.getElementById("compattempt").value
    MapData[15] = document.getElementById("titletoggle").checked
    MapData[16] = document.getElementById("comprestart").checked
    MapData[17]	= document.getElementById("compdesc").value
    
    
    document.getElementById("compdiv").style.backgroundColor = document.getElementById("comptoggle").checked ? "lightslategray" : "#5F6D7A"
    document.getElementById("titlediv").style.backgroundColor = document.getElementById("titletoggle").checked ? "lightslategray" : "#5F6D7A"
}

function changebar(x){
    
    document.getElementById("tool").style.display = x == 0 ? "block" : "none"
    document.getElementById("savebar").style.display = x == 1 ? "block" : "none"
    document.getElementById("helpbar").style.display = x == 2 ? "block" : "none"
    document.getElementById("settingsdata").style.display = x == 3 ? "block" : "none"
    

}

function ImportJson(){
    try{
        CheckPoints = JSON.parse(document.getElementById('jsonfield').value.split("+!SEPERATOR!+")[0])
        MapData = JSON.parse(document.getElementById('jsonfield').value.split("+!SEPERATOR!+")[1])

        // fix data if missing
        MapData[0] =  MapData[0] ?  MapData[0] : ""
        MapData[1] =  MapData[1] ?  MapData[1] : ""
        MapData[2] =  MapData[2] ?  MapData[2] : ""
        
        MapData[3] =  MapData[3] ?  MapData[3] : false
        MapData[4] =  MapData[4] ?  MapData[4] : false
        MapData[5] =  MapData[5] ?  MapData[5] : false
        MapData[6] =  MapData[6] ?  MapData[6] : false
        MapData[7] =  MapData[7] ?  MapData[7] : false
        MapData[8] =  MapData[8] ?  MapData[8] : false

        MapData[9] = typeof MapData[9] != 'undefined' ?  MapData[9] : true
        MapData[10] = typeof MapData[9] != 'undefined' ?  MapData[10] : "0"

        MapData[11] =  MapData[11] ?  MapData[11] : 120
        MapData[12] = MapData[12] ? MapData[12] : false
        MapData[13] =  MapData[13] ?  MapData[13] : 0

        MapData[14] =  MapData[14] ?  MapData[14] :    [ 
            [0,"bunny","Lime Green"],
            [10,"jumper","White"],
            [20,"Ninja","Yellow"],
            [30,"pro","Orange"],
            [40,"expert","Purple"],
            [50,"master","Red"]   
        ]
        MapData[15] =  MapData[15] ?  MapData[15] :  false
        MapData[16] =  MapData[16] ?  MapData[16] :  false
        MapData[17] =  MapData[17] ?  MapData[17] :  "" 

        for(let i=0;i < CheckPoints.length;i++){
            CheckPoints[i][8] = CheckPoints[i][8]  ?  CheckPoints[i][8]  : false
            CheckPoints[i][9] = CheckPoints[i][9]  ?  CheckPoints[i][9]  : false
        }

        document.getElementById("cpdata").style.display = "block"
        document.getElementById("orbs-kills").style.display = "block"
        document.getElementById("maker").value =  MapData[0]
        document.getElementById("code").value =  MapData[1]
        document.getElementById("notes").value =  MapData[2]
        
        document.getElementById("ban_triple").checked = MapData[3]
        document.getElementById("ban_multi").checked =  MapData[4]
        document.getElementById("ban_emote" ).checked = MapData[5]
        document.getElementById("ban_create").checked = MapData[6]
        document.getElementById("ban_dbhop" ).checked =  MapData[7]
        document.getElementById("ban_dashstart" ).checked = MapData[8]
        document.getElementById("portalOn").checked = MapData[9]
        document.getElementById("dif").value = MapData[10]
        document.getElementById("comptimeslider").value = MapData[11] 
        document.getElementById("comptimenumber").value = MapData[11] 
        document.getElementById("comptoggle").checked = MapData[12]      
        document.getElementById("compattempt").value = MapData[13] 
        document.getElementById("titletoggle").checked = MapData[15]
		document.getElementById("comprestart").checked = MapData[16]
        document.getElementById("compdesc").value = MapData[17]
        
        SelectedCp = 0
        CpButtons()
        UpdateSelection()
        UpdateTop()
        changebar(0)
        MakeTitles()
        ShowMsg("Loaded!")
    } catch (e){
        // console.log(e);
    }

}

function ExportJson(){
    var jsonstring = JSON.stringify(CheckPoints) + "+!SEPERATOR!+" +  JSON.stringify(MapData) 

    var resultthing = document.getElementById("results")
    resultthing.value = jsonstring
    resultthing.select()
    resultthing.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(resultthing.value);

    // ShowMsg("copied to clipboard!")
}

function UpdateSelection(){
    document.getElementById("selectedcpnumber").innerHTML  = "Checkpoint: "+ SelectedCp
    document.getElementById("CPvector").value  =  CheckPoints[parseInt(SelectedCp)][0]
    FieldColorsVect(document.getElementById("CPvector"))

    document.getElementById("CPteleportTF").checked  = CheckPoints[parseInt(SelectedCp)][1]
    document.getElementById("CPteleportVect").value  = CheckPoints[parseInt(SelectedCp)][2]
    FieldColorsVect(document.getElementById("CPteleportVect"))

    document.getElementById("CPdashenable").checked  = CheckPoints[parseInt(SelectedCp)][3]
    document.getElementById("CPultenable").checked  = CheckPoints[parseInt(SelectedCp)][4]
    document.getElementById("CPnotes").value  = CheckPoints[parseInt(SelectedCp)][5]

    document.getElementById("CPbanBhop").checked = CheckPoints[parseInt(SelectedCp)][8]
    document.getElementById("CpbanClimb").checked = CheckPoints[parseInt(SelectedCp)][9]

    document.getElementById("DashToggleEnabled").innerHTML = CheckPoints.some(function(i){return i[3]}) ? "dash addon(automatic): enabled |" : "dash addon(automatic): disabled |"
    document.getElementById("DashToggleEnabled").style.color = CheckPoints.some(function(i){return i[3]}) ? "darkgreen" : "black"
    document.getElementById("UltToggleEnabled").innerHTML = CheckPoints.some(function(i){return i[4]}) ? "| ult addon(automatic): enabled" : "| ult addon(automatic): disabled"
    document.getElementById("UltToggleEnabled").style.color = CheckPoints.some(function(i){return i[4]}) ? "darkgreen" : "black"
     


    UpdateOrbs()
}
/*
function IsVector(vec){ // return true if vectir
    return  !(
        vec.split(",").some(vec=> isNaN(vec)) ||
        vec.split(",").length != 3
        )
}
*/
function IsVector(vec){ // return true if vectir
    //const re = /^\d+(?=\.)?\d*?\s?,\s?\d+(?=\.)?\d*?\s?,\s?\d+(?=\.)?\d*$/;
    const re = /^\s*-?\d+(\.?(\d+)?)\s*,\s*-?\d+(\.?(\d+)?)\s*,\s*-?\d+(\.?(\d+)?)\s*$/;
    return re.exec(vec)
    /*
    ^ Starts with
    \s* 0 or more whitespaces
    \d+ 1 or more digits
    \.? optional decimal
    \d+? optional 1+ digits
    \s* 0 or more whitespaces
    , comma
    */
}

function defaultVect(vec){
    return IsVector(vec) ? vec : "0,0,0"
}

function isNumber(numb){
    return !isNaN(numb) && numb != ""
}
function defaultNum(num){
    return isNumber(num) ? num : "0"
}

function defaultBool(boo){
    return boo ? "True" : "False"
}

function FieldColorsVect(thing){
    try{
        if (typeof thing != "undefined"){
            thing.value = thing.value.replace("(","").replace(")","") // remove ()
            IsVector(thing.value) ? thing.style.backgroundColor="": thing.style.backgroundColor="red"
        }
    } catch(e) {
        console.log(e)
    }
}

function FieldColorsNum(thing){
    try{
        if (typeof thing != "undefined"){
            thing.value = thing.value.replace(",","") // remove ,
            isNumber(thing.value) ? thing.style.backgroundColor="": thing.style.backgroundColor="red"
        }
    } catch(e) {
        console.log(e)
    }
}


function UpdateAfterChange(){
    CheckPoints[parseInt(SelectedCp)][0] = document.getElementById("CPvector").value
	CheckPoints[parseInt(SelectedCp)][1] = document.getElementById("CPteleportTF").checked
	CheckPoints[parseInt(SelectedCp)][2] = document.getElementById("CPteleportVect").value
	CheckPoints[parseInt(SelectedCp)][3] = document.getElementById("CPdashenable").checked 
	CheckPoints[parseInt(SelectedCp)][4] = document.getElementById("CPultenable").checked
    CheckPoints[parseInt(SelectedCp)][5] = document.getElementById("CPnotes").value
    CheckPoints[parseInt(SelectedCp)][8] = document.getElementById("CPbanBhop").checked
    CheckPoints[parseInt(SelectedCp)][9] = document.getElementById("CpbanClimb").checked

    document.getElementById("DashToggleEnabled").innerHTML = CheckPoints.some(function(i){return i[3]}) ? "dash addon(automatic): enabled |" : "dash addon(automatic): disabled |"
    document.getElementById("DashToggleEnabled").style.color = CheckPoints.some(function(i){return i[3]}) ? "darkgreen" : "black"
    document.getElementById("UltToggleEnabled").innerHTML = CheckPoints.some(function(i){return i[4]}) ? "| ult addon(automatic): enabled" : "| ult addon(automatic): disabled"
    document.getElementById("UltToggleEnabled").style.color = CheckPoints.some(function(i){return i[4]}) ? "darkgreen" : "black"
}


function AddNewCP(x){
    document.getElementById("cpdata").style.display = "block"
    document.getElementById("orbs-kills").style.display = "block"
    
    if(x == 0){ // add end
        CheckPoints.push(
            [
            "0,0,0", //0 pos
            false, //1 teleport t/f
            "0,0,0", //2 teleport pos
            false, //3 dash
            false, //4 ult
            "", //5 notes
            [], //6 orb
            [], //7 kill
            false, //8 ban bhop
            false // 9 ban climb
            ]
        )
        SelectedCp = CheckPoints.length -1

    } else { // add after current
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
            [], //7 kill
            false, //8 ban bhop
            false // 9 ban climb
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
    const bounceorb = document.querySelectorAll('.bounceorb');
    bounceorb.forEach(bounceorb => {
        bounceorb.remove();
    });
    const killorb = document.querySelectorAll('.killorb');
    killorb.forEach(killorb => {
        killorb.remove();
    });
	// add current
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
            vectbox.onkeyup=function(){FieldColorsVect(this)}
			document.getElementById("orbdiv" + i).appendChild(vectbox)
        
			// strength
			document.getElementById("orbdiv" + i).insertAdjacentText("beforeend", " | strength ")
			let strbox = document.createElement("textarea");
			strbox.id = "strbox"
			strbox.placeholder = "0.0"
			//if (CheckPoints[SelectedCp][6][i][4] != ""){strbox.value = CheckPoints[SelectedCp][6][i][4]}
            if (CheckPoints[SelectedCp][6][i][4].length != "undefined" && CheckPoints[SelectedCp][6][i][4] != ""){strbox.value = CheckPoints[SelectedCp][6][i][4];FieldColorsNum(strbox)}else{strbox.value=""}
			strbox.onchange = function(){CheckPoints[SelectedCp][6][i][4] = strbox.value}
			strbox.rows = 1
			strbox.cols = 5
            strbox.onkeyup=function(){FieldColorsNum(this)}
			document.getElementById("orbdiv" + i).appendChild(strbox)
            //if (typeof strbox.value != 'undefined'){FieldColorsNum(strbox)}
            //FieldColorsNum(strbox)
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
            vectbox2.onkeyup=function(){FieldColorsVect(this)}
			document.getElementById("killdiv" + it).appendChild(vectbox2)	
        

			document.getElementById("killdiv" + it).insertAdjacentText("beforeend", " | radius ")
			let radius1 = document.createElement("textarea");
			radius1.id = "vectbox"
			radius1.placeholder = "0.1"
			//if (CheckPoints[SelectedCp][7][it][1] != ""){radius1.value = CheckPoints[SelectedCp][7][it][1]}
             if (CheckPoints[SelectedCp][7][it][1].length != "undefined" && CheckPoints[SelectedCp][7][it][1] != ""){radius1.value = CheckPoints[SelectedCp][7][it][1];FieldColorsNum(radius1)}else{radius1.value=""}
			radius1.onchange = function(){CheckPoints[SelectedCp][7][it][1] = radius1.value}
			radius1.rows = 1
			radius1.cols = 8
            radius1.onkeyup=function(){FieldColorsNum(this)}
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



function MakeTitles(){
    const titles = document.querySelectorAll('.titles');
    titles.forEach(titles => {titles.remove();});

    for (let i = 0;  i < MapData[14].length; i++) { 

        let titlediv = document.createElement("div");
        titlediv.style.textAlign = "left";
        titlediv.id = "titlediv" + i
        titlediv.innerHTML = " checkpoint ";
        titlediv.className = "titles"
        document.getElementById("titlelist").appendChild(titlediv);

        //cp
        let titlecp = document.createElement("textarea");
        titlecp.id = "titlecp" + i
        titlecp.placeholder = "0"
        titlecp.value = MapData[14][i][0]
        titlecp.onkeyup=function(){FieldColorsNum(this)}
        titlecp.onchange=function(){MapData[14][i][0] = titlecp.value}
        titlecp.rows = 1
        titlecp.cols = 5
        document.getElementById("titlediv" + i).appendChild(titlecp)

        // title
        document.getElementById("titlediv" + i).insertAdjacentText("beforeend"," | title ")
        let titlename = document.createElement("textarea");
        titlename.value = MapData[14][i][1]
        titlename.id = "titlename" + i
        titlename.placeholder = "Ninja"
        titlename.onchange=function(){MapData[14][i][1] = titlename.value}
        titlename.rows = 1
        titlename.cols = 15
        document.getElementById("titlediv" + i).appendChild(titlename)

        // color
        document.getElementById("titlediv" + i).insertAdjacentText("beforeend"," | color ")
        let titlecolor = document.createElement("select");
        titlecolor.id = "titlecolor" + i
        titlecolor.onchange = function(){MapData[14][i][2] = titlecolor.value}
        var colorsvar = ["Aqua","Black","Blue","Gray","Green","Lime Green","Orange","Purple","Red","Rose","Sky Blue","Turquoise","Violet","White","Yellow"]
        
        
        for (var i2 = 0; i2 < colorsvar.length; i2++){
            var opt = document.createElement('option');
            opt.value = colorsvar[i2];
            opt.innerHTML = colorsvar[i2];
            titlecolor.appendChild(opt);        
        }
        titlecolor.value  = MapData[14][i][2]
        document.getElementById("titlediv" + i).appendChild(titlecolor)

        // remove button
        let deletebutton = document.createElement("button");
        deletebutton.innerHTML = "delete"
        deletebutton.style.float = "right"
        deletebutton.value = i
        deletebutton.onclick = function(){RemoveTitle(this.value)}
        document.getElementById("titlediv" + i).appendChild(deletebutton); 

    }
}

function AddTitle(){
    
    MapData[14].push(
        [
        0,
        "bunny",
        "White"
        ]
    )
    MakeTitles()
}

function RemoveTitle(x){
    if (MapData[14].length > 1){
        MapData[14].splice(x,1)
    }
    MakeTitles()
}

function RemoveCP(){
    if (CheckPoints.length > 1){
        
        document.getElementById("CPBUTTON"+SelectedCp).remove()
        CheckPoints.splice(SelectedCp,1)
        /*
        for (let i = SelectedCp + 1;  i <= CheckPoints.length; i++) {
            document.getElementById("CPBUTTON"+i).innerHTML = "Checkpoint " + (i - 1)
            document.getElementById("CPBUTTON"+i).value =  (i - 1)
            document.getElementById("CPBUTTON"+i).id = "CPBUTTON"+(i-1)
        }   
        */
        CpButtons()
        if (SelectedCp > 0){
            SelectedCp --
        
        }
        UpdateSelection() 
    }
}
var CompileError
// variables to put inside copy pasta
var data_cps // checkpoints

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

var ban_triple
var ban_multi
var ban_emote
var ban_create
var ban_dbhop // ddeath
var ban_dashstart

var ban_bhopsCp
var ban_bhopEnabled

var ban_wallclimbCp
var ban_wallclimbEnabled

var portalon
var difficultyhud

var compon
var comptime
var compattempt
var comprestarts
var compdescription = []



var titleon
var titlenames
var titlecps
var titlecolors


// copy button
function Copy(){
    if (CheckPoints.length <1){
        console.log("length")
        return
    }
    
    ShowMsg("compiling - do not tab out");
    CompileError = false
   
    setTimeout(
        function (){
           
            // cp data ==================
            data_cps = "\n\t\tGlobal.A = Array("
            for (let i = 0;  i < CheckPoints.length; i++){
                if (CheckPoints[i][1]){
                    data_cps += "\n\t\t\tArray(Vector(" + defaultVect(CheckPoints[i][0]) + "), Vector(" + defaultVect(CheckPoints[i][2])+ ")),"
                } else{
                    data_cps += "\n\t\t\tVector("+defaultVect(CheckPoints[i][0])+"),"
                }
            }
            data_cps = data_cps.slice(0,-1) // remove last ,
            data_cps += "\n\t\t);"

            // bounce ==================
            data_orb_cp = "Global.pinballnumber = Array( "
            data_orb_pos = "Global.TQ = Array( "
            data_orb_lock = "Global.BounceToggleLock = Array( "
            data_orb_dash = "Global.TQ6 = Array( "
            data_orb_ult = "Global.TQ5 = Array( "
            data_orb_strength = "Global.EditMode = Array( "
            for (let i = 0;  i < CheckPoints.length; i++){
                for (let i2 = 0;  i2 < CheckPoints[i][6].length; i2++){
                    
                    data_orb_cp += "\n\t\t\t" + i + ","
                    data_orb_pos += "\n\t\t\tVector("+defaultVect(CheckPoints[i][6][i2][0])+"),"
                    data_orb_lock += "\n\t\t\t" + (CheckPoints[i][6][i2][3] ? 'True' : 'False') + ","
                    data_orb_dash += "\n\t\t\t" + (CheckPoints[i][6][i2][1] ? 'True' : 'False') + ","
                    data_orb_ult += "\n\t\t\t" + (CheckPoints[i][6][i2][2] ? 'True' : 'False') + ","
                    data_orb_strength += "\n\t\t\t" + defaultNum(CheckPoints[i][6][i2][4]) + ","
                    
                }
            }

            data_orb_cp = data_orb_cp.slice(0,-1) + "\n\t\t);"
            data_orb_pos = data_orb_pos.slice(0,-1) + "\n\t\t);"
            data_orb_lock = data_orb_lock.slice(0,-1) + "\n\t\t);"
            data_orb_dash = data_orb_dash.slice(0,-1) + "\n\t\t);"
            data_orb_ult = data_orb_ult.slice(0,-1) + "\n\t\t);"
            data_orb_strength = data_orb_strength.slice(0,-1) + "\n\t\t);"

            // kill ==================
            data_kill_pos = "Global.H = Array( "
            data_kill_rad = "Global.I = Array( "
            data_kill_cp = "Global.killballnumber = Array( "
            for (let i = 0;  i < CheckPoints.length; i++){
                for (let i2 = 0;  i2 < CheckPoints[i][7].length; i2++){
                    data_kill_pos += "\n\t\t\tVector(" + defaultVect(CheckPoints[i][7][i2][0])+"),"
                    data_kill_rad += "\n\t\t\t" + defaultNum(CheckPoints[i][7][i2][1])+","
                    data_kill_cp += "\n\t\t\t" + i + ","
                }
            }
            data_kill_pos = data_kill_pos.slice(0,-1) + "\n\t\t);"
            data_kill_rad = data_kill_rad.slice(0,-1) + "\n\t\t);"
            data_kill_cp = data_kill_cp.slice(0,-1) + "\n\t\t);"

            // enable ult rule ==================
            ulteanbled = "disabled "
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

            // enable dash rule ==================
            dasheanbled = "disabled "
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

            // bhop ban per cp(not functioning ingame) ==================
            ban_bhopEnabled = "False"
            if (CheckPoints.some(function(i){return i[8]})  ){
                ban_bhopEnabled = "True"
                ban_bhopsCp = "Array Contains(Array("
                for (let i = 0;  i < CheckPoints.length; i++){
                    if (CheckPoints[i][8]){
                        ban_bhopsCp += i + ", "
                    }
                }
                ban_bhopsCp = ban_bhopsCp.slice(0,-2) + "), (Event Player).A) == True;\n"
            } else {
                ban_bhopsCp = "Array Contains(Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1), (Event Player).A) == True;\n"
            }

             // wallclimb ban per cp (not functioning ingame) ==================
            ban_wallclimbEnabled = "False"
            if (CheckPoints.some(function(i){return i[9]})  ){
                ban_wallclimbEnabled = "True"
                ban_wallclimbCp = "Array Contains(Array("
                for (let i = 0;  i < CheckPoints.length; i++){
                    if (CheckPoints[i][9]){
                        ban_wallclimbCp += i + ", "
                    }
                }
                ban_wallclimbCp = ban_wallclimbCp.slice(0,-2) + "), (Event Player).A) == True;\n"
            } else {
                ban_wallclimbCp = "Array Contains(Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1), (Event Player).A) == True;\n"
            }

            // map header ==================
            mapmaker = MapData[0]
            mapcode = MapData[1]

            ban_triple = defaultBool(MapData[3])
            ban_multi = defaultBool(MapData[4])
            ban_emote = defaultBool(MapData[5])
            ban_create = defaultBool(MapData[6])
            ban_dbhop = defaultBool(MapData[7])
            ban_dashstart = defaultBool(MapData[8])
            portalon = defaultBool( MapData[9] )
            difficultyhud = defaultNum(MapData[10])

            comptime = defaultNum(MapData[11])
            compon = defaultBool( MapData[12])
            compattempt = defaultNum(MapData[13])
            comprestarts = defaultBool(MapData[16])
  

            var descriptionsub = MapData[17]
            var desc_i1 = 0
            for (let i = 0;  i < 4; i++){ 
                if(descriptionsub.length > 120){
                    desc_i1 = descriptionsub.substr(0,120).lastIndexOf(" ") + 1
                } else {
                    desc_i1 = 120
                }
                
                compdescription[i] = descriptionsub.substr(0,desc_i1)
                descriptionsub = descriptionsub.substr(desc_i1)
            }
     

            titleon = MapData[15] ? "" : "disabled "
            titlecps = "Set Global Variable At Index(TitleData, 0, Array("
            titlenames = "Set Global Variable At Index(TitleData, 1, Array("
            titlecolors = "Set Global Variable At Index(TitleData, 2, Array("
            for (let i = 0;  i < MapData[14].length; i++){ 
                titlecps +=  defaultNum(MapData[14][i][0]) + ", "
                titlenames += 'Custom String("' +  MapData[14][i][1] +  '", Null, Null, Null), '
                titlecolors += 'Color(' +  MapData[14][i][2] +  '), '
            }
            titlecps = titlecps.slice(0,-2) + "));"
            titlenames = titlenames.slice(0,-2) + "));"
            titlecolors = titlecolors.slice(0,-2) + "));"
            
            // ====== compile and copy ===================
            setdata(); // loaded from data file
      
            
            try {
                var language = document.getElementById("languageInput").value;
                if (language != "en-US" ){ // recompile in overpy to translate if not eng - || true
                    data_pasta = decompileAllRules(data_pasta, "en-US");
                    data_pasta = data_pasta + "\n#!disableMapDetectionFix"
                    data_pasta = compile(data_pasta, language);
                    data_pasta  = data_pasta.result;
                }
            }  catch(e) {
                console.log(e)
                CompileError = true
            }
            var resultthing = document.getElementById("results");
            resultthing.value = data_pasta;
            resultthing.select();
            resultthing.setSelectionRange(0, 99999);

            //navigator.clipboard.writeText(resultthing.value);
            setTimeout(async()=>console.log(
            await window.navigator.clipboard.readText()), 3000)
            navigator.clipboard.writeText(resultthing.value);


        },
        10
    );
    setTimeout(ShowMsg, 10, "copied to clipboard!");

    /*
    setTimeout(async()=>console.log(
     await window.navigator.clipboard.readText()), 3000)
    */

    

}
   
//
// async function compilingthings(){
//     try {
//
//         await saycompile();
//         var language = document.getElementById("languageInput").value;
//         //if (language != "en-US"){
//             data_pasta = await decompileAllRules(data_pasta, "en-US");
//             //data_pasta = data_pasta + "\n#!disableMapDetectionFix"
//             data_pasta = compile(data_pasta, language);
//             data_pasta  = data_pasta.result;
//         //}
//
//     } catch (e) {
//         // console.log(e);
//     }
//
//  }
//
//
// function saycompile(){
//     document.getElementById("message").innerHTML = "compiling";
//     document.getElementById("messageblock").style.display = "block" ;
// }
//
// function dorest(){
//     var resultthing = document.getElementById("results");
//     resultthing.value = data_pasta;
//     resultthing.select();
//     resultthing.setSelectionRange(0, 99999);
//     navigator.clipboard.writeText(resultthing.value);
//     // ShowMsg("copied to clipboard!")
// }


