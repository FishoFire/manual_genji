
// defaults and initialize ##############################################################

changebar(3) // initial page
var SaveNames = []
var SelectedCp = -1
var maxtimecomp = 240
var CheckPoints = []
var MapData = []

defaultdata()
MakeTitles()


// functions ##############################################################

function defaultdata(){
    CheckPoints = []
    MapData = [
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
        "",//17comp description
        "Lime Green",// 18 iwt color
        "", // custom dif text
        "Lime Green" // custom dif color
        ]
}

function ShowMsg(x){
    
    document.getElementById("message").innerHTML = CompileError ? "compile error" : x
    document.getElementById("messageblock").style.display = "block"
    document.getElementById("message").style.backgroundColor = CompileError ? "red" : "cyan" 
    setTimeout(() => {
        document.getElementById("messageblock").style.display = "none"
        document.getElementById("message").innerHTML = ""
        CompileError = false
    }, 5000); // 2500
    
}

// checks ##############################################################

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

// update html ##############################################################

// change window / navigation bar
function changebar(x){
    document.getElementById("tool").style.display = x == 0 ? "block" : "none"
    document.getElementById("savebar").style.display = x == 1 ? "block" : "none"
    document.getElementById("helpbar").style.display = x == 2 ? "block" : "none"
    document.getElementById("settingsdata").style.display = x == 3 ? "block" : "none"
    document.getElementById("convert").style.display = x == 4 ? "block" : "none"
    
}

// settings
function UpdateTop(){
    MapData[0] = document.getElementById("maker").value 
    MapData[1] = document.getElementById("code").value 
    MapData[2] = document.getElementById("notes").value 

    MapData[3] = document.getElementById("ban_triple").checked
    MapData[4] = document.getElementById("ban_multi").checked
    MapData[5] = document.getElementById("ban_emote").checked
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
    MapData[18] =  document.getElementById("iwtcolor").value
    MapData[19] =  document.getElementById("customdif").value
    MapData[20] =  document.getElementById("customdifcolor").value
    MapData[21] =  document.getElementById("ban_climb").checked
    MapData[22] = document.getElementById("teamselect").value
    MapData[23] = document.getElementById("faketripleon").checked

    document.getElementById("customdif").disabled = document.getElementById("dif").value != "custom" 
    document.getElementById("customdifcolor").disabled = document.getElementById("dif").value != "custom" 

    document.getElementById("compdiv").style.backgroundColor = document.getElementById("comptoggle").checked ? "lightslategray" : "#5F6D7A"
    document.getElementById("titlediv").style.backgroundColor = document.getElementById("titletoggle").checked ? "lightslategray" : "#5F6D7A"
}

// change selected cp
function UpdateSelection(){
    document.getElementById("selectedcpnumber").innerHTML  = "Checkpoint [ "+ SelectedCp + " ]"
    document.getElementById("CPvector").value  =  CheckPoints[parseInt(SelectedCp)][0]
    FieldColorsVect(document.getElementById("CPvector"))

    document.getElementById("CPteleportTF").checked  = CheckPoints[parseInt(SelectedCp)][1]
    document.getElementById("CPteleportVect").value  = CheckPoints[parseInt(SelectedCp)][2]
    FieldColorsVect(document.getElementById("CPteleportVect"))

    document.getElementById("CPdashenable").checked  = CheckPoints[parseInt(SelectedCp)][3]
    document.getElementById("CPultenable").checked  = CheckPoints[parseInt(SelectedCp)][4]
    document.getElementById("CPnotes").value  = CheckPoints[parseInt(SelectedCp)][5]

    document.getElementById("bantrip").checked = CheckPoints[parseInt(SelectedCp)][8][0]
    document.getElementById("banmulti").checked = CheckPoints[parseInt(SelectedCp)][8][1]
    document.getElementById("bancrea").checked = CheckPoints[parseInt(SelectedCp)][8][2]
    document.getElementById("bandead").checked = CheckPoints[parseInt(SelectedCp)][8][3]
    document.getElementById("banemote").checked = CheckPoints[parseInt(SelectedCp)][8][4] 
    document.getElementById("banclimb").checked = CheckPoints[parseInt(SelectedCp)][8][5] 

    document.getElementById("hudeanbledbox").checked = CheckPoints[parseInt(SelectedCp)][9][0]
    document.getElementById("hudtxt").value = CheckPoints[parseInt(SelectedCp)][9][1] 
    document.getElementById("iwteanbledbox").checked = CheckPoints[parseInt(SelectedCp)][9][2] 
    document.getElementById("iwttext").value = CheckPoints[parseInt(SelectedCp)][9][3]
    document.getElementById("iwtpos").value = CheckPoints[parseInt(SelectedCp)][9][4]

    /*  
    document.getElementById("DashToggleEnabled").innerHTML = CheckPoints.some(function(i){return i[3]}) ? "dash addon(automatic): enabled |" : "dash addon(automatic): disabled |"
    document.getElementById("DashToggleEnabled").style.color = CheckPoints.some(function(i){return i[3]}) ? "darkgreen" : "black"
    document.getElementById("UltToggleEnabled").innerHTML = CheckPoints.some(function(i){return i[4]}) ? "| ult addon(automatic): enabled" : "| ult addon(automatic): disabled"
    document.getElementById("UltToggleEnabled").style.color = CheckPoints.some(function(i){return i[4]}) ? "darkgreen" : "black"

    document.getElementById("HudEnabled").innerHTML = CheckPoints.some(function(i){return i[9][0]}) ? "hud addon(automatic): enabled |" : "hud addon(automatic): disabled |"
    document.getElementById("HudEnabled").style.color = CheckPoints.some(function(i){return i[9][0]}) ? "darkgreen" : "black"
    document.getElementById("IwtToggleEnabled").innerHTML = CheckPoints.some(function(i){return i[9][2]}) ? "| in world text addon (automatic): enabled" : "|in world text addon (automatic): disabled"
    document.getElementById("IwtToggleEnabled").style.color = CheckPoints.some(function(i){return i[9][2]}) ? "darkgreen" : "black"
    */
    UpdateOrbs()
    //if (CheckPoints.length > 1){
        const cpbuttons = document.querySelectorAll('.cpbuttonclass');
        cpbuttons.forEach(cpbuttons => {
            cpbuttons.style.backgroundColor = "#fcfcfcab"   
        });
        
        try{
            document.getElementById("CPBUTTON"+SelectedCp).style.backgroundColor = "Orange"
        } catch (e){
            console.log(e)
        }
    //}
}

// store new values on changes
function UpdateAfterChange(){
    CheckPoints[parseInt(SelectedCp)][0] = document.getElementById("CPvector").value
	CheckPoints[parseInt(SelectedCp)][1] = document.getElementById("CPteleportTF").checked
	CheckPoints[parseInt(SelectedCp)][2] = document.getElementById("CPteleportVect").value
	CheckPoints[parseInt(SelectedCp)][3] = document.getElementById("CPdashenable").checked 
	CheckPoints[parseInt(SelectedCp)][4] = document.getElementById("CPultenable").checked
    CheckPoints[parseInt(SelectedCp)][5] = document.getElementById("CPnotes").value

    CheckPoints[parseInt(SelectedCp)][8][0] = document.getElementById("bantrip").checked
    CheckPoints[parseInt(SelectedCp)][8][1] = document.getElementById("banmulti").checked
    CheckPoints[parseInt(SelectedCp)][8][2] = document.getElementById("bancrea").checked
    CheckPoints[parseInt(SelectedCp)][8][3] = document.getElementById("bandead").checked
    CheckPoints[parseInt(SelectedCp)][8][4] = document.getElementById("banemote").checked
    CheckPoints[parseInt(SelectedCp)][8][5] = document.getElementById("banclimb").checked

    CheckPoints[parseInt(SelectedCp)][9][0] = document.getElementById("hudeanbledbox").checked
    CheckPoints[parseInt(SelectedCp)][9][1] = document.getElementById("hudtxt").value
    CheckPoints[parseInt(SelectedCp)][9][2] = document.getElementById("iwteanbledbox").checked
    CheckPoints[parseInt(SelectedCp)][9][3] = document.getElementById("iwttext").value
    CheckPoints[parseInt(SelectedCp)][9][4] = document.getElementById("iwtpos").value

        
    /*
    document.getElementById("DashToggleEnabled").innerHTML = CheckPoints.some(function(i){return i[3]}) ? "dash addon(automatic): enabled |" : "dash addon(automatic): disabled |"
    document.getElementById("DashToggleEnabled").style.color = CheckPoints.some(function(i){return i[3]}) ? "darkgreen" : "black"
    document.getElementById("UltToggleEnabled").innerHTML = CheckPoints.some(function(i){return i[4]}) ? "| ult addon(automatic): enabled" : "| ult addon(automatic): disabled"
    document.getElementById("UltToggleEnabled").style.color = CheckPoints.some(function(i){return i[4]}) ? "darkgreen" : "black"

    document.getElementById("HudEnabled").innerHTML = CheckPoints.some(function(i){return i[9][0]}) ? "hud addon(automatic): enabled |" : "hud addon(automatic): disabled |"
    document.getElementById("HudEnabled").style.color = CheckPoints.some(function(i){return i[9][0]}) ? "darkgreen" : "black"
    document.getElementById("IwtToggleEnabled").innerHTML = CheckPoints.some(function(i){return i[9][2]}) ? "| in world text addon (automatic): enabled" : "|in world text addon (automatic): disabled"
    document.getElementById("IwtToggleEnabled").style.color = CheckPoints.some(function(i){return i[9][2]}) ? "darkgreen" : "black"
    */
}




