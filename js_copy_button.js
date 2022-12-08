

/*
overpy update: comment out the line that checks numbers

change template:
make function setdata = String.raw'data'
put the variables in
- turn editor to off
- replace settings with one were all maps on

paste the variables in:
var data_cps // checkpoints

old: - remove :lb comments coz 0
*/


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
var editoron

// per map bans
var ban_triple
var ban_multi
var ban_emote
var ban_create
var ban_dbhop // ddeath
var ban_dashstart
var ban_climb

// ban per cp
var cpbantriple
var cpbanmulti
var cpbancreate
var cpbandead
var cpbanemote
var cpclimb

var portalon
var difficultyhud
var customdifenabled
var customdiftxt
var customdifcolor

var compon
var comptime
var compattempt
var comprestarts
var compdescription = []

var titleon
var titlenames
var titlecps
var titlecolors


var hudeanbled
var hudtext
var hudcps

var iwtenabled
var iwttext
var iwtpos
var iwtcps
var iwtcolor


var dasheanbled
var dasharray
var ulteanbled
var ultarray

var team1players
var team2players
// copy
var CompileError
function Copy(){
    /*
    if (CheckPoints.length <1){
        console.log("length")
        return
    }
    */
    ShowMsg("compiling - do not tab out");
    CompileError = false
   
    setTimeout(
        function (){
            
            // cp data ==================
            //data_cps = "\n\t\tGlobal.A = Array( " + CheckPoints.map(x => "\n\t\t\tvector("+x[0]+")").join(",") +  "\n\t\t);"
            // above doesnt deal with teleports 
            data_cps = "\n\t\tGlobal.A = Array( "
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
            
            
            /*
            //problem: visual clusterfck and multiple entries dont get read
            data_orb_lock =  "Global.BounceToggleLock = Array( " + 
                CheckPoints.map( x => (x[6][0] ?  x[6][0][3] : "doesntexist") ).filter(a => a != "doesntexist").join(",") +
                "\n\t\t);"

            data_orb_pos =  "Global.TQ = Array( " + 
                CheckPoints.map( x => (x[6][0] ? "\n\t\t\tVector(" + x[6][0][0] + ")" : "doesntexist") ).filter(a => a != "doesntexist").join(",") +
                "\n\t\t);"
            */
            
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

            // enable ult and dash ==================
            ulteanbled = CheckPoints.some(function(i){return i[4]}) ? "" : "disabled "
            ultarray = "Global.Dao = Array(" + 
                CheckPoints.map( (x,y) => (x[4] ? y : "") ).filter(a => typeof(a) == "number").join(",") +
                ");\n"

            dasheanbled = CheckPoints.some(function(i){return i[3]}) ? "" : "disabled "
            dasharray =  "Global.SHIFT = Array(" + 
                CheckPoints.map( (x,y) => (x[3] ? y : "") ).filter(a => typeof(a) == "number").join(",") +
                ");\n"

          
            // bans per cp
            cpbantriple = "Set Global Variable(BanTriple, Array(" + CheckPoints.map( (x,y) => (x[8][0] ? y : "") ).filter(a => typeof(a) == "number").join(",") + "));\n"
            cpbanmulti ="Set Global Variable(BanMulti, Array(" + CheckPoints.map( (x,y) => (x[8][1] ? y : "") ).filter(a => typeof(a) == "number").join(",") + "));\n"
            cpbancreate ="Set Global Variable(BanCreate, Array(" + CheckPoints.map( (x,y) => (x[8][2] ? y : "") ).filter(a => typeof(a) == "number").join(",") + "));\n"
            cpbandead ="Set Global Variable(BanDead, Array(" + CheckPoints.map( (x,y) => (x[8][3] ? y : "") ).filter(a => typeof(a) == "number").join(",") + "));\n"
            cpbanemote ="Set Global Variable(BanEmote, Array(" + CheckPoints.map( (x,y) => (x[8][4] ? y : "") ).filter(a => typeof(a) == "number").join(",") + "));\n"
            cpclimb = "Set Global Variable(BanClimb, Array(" + CheckPoints.map( (x,y) => (x[8][5] ? y : "") ).filter(a => typeof(a) == "number").join(",") + "));\n"          

            // hud per cp
            hudeanbled = CheckPoints.some(function(i){return i[9][0]}) ? "" : "disabled "
            hudcps =  "Set Global Variable(CpHudCp, Array(" + CheckPoints.map( (x,y) => (x[9][0] ? y : "") ).filter(a => typeof(a) == "number").join(",") +"));\n" 
            // iwt per cp
            hudtext = 'Set Global Variable(CpHudText, Array(' +
                CheckPoints.map( (x,y) => (x[9][0]? 'Custom String("' + x[9][1] + '", Null, Null, Null)' : "skip") ).filter(a => a !=  "skip" ).join(",")
                +'));\n'
            iwtenabled = CheckPoints.some(function(i){return i[9][2]}) ? "" : "disabled "
            iwtcps =  "Set Global Variable(CpIwtCp, Array(" + CheckPoints.map( (x,y) => (x[9][2] ? y : "") ).filter(a => typeof(a) == "number").join(",") +"));\n" 
            iwtpos =  'Set Global Variable(CpIwtPos, Array(' +
                CheckPoints.map( (x,y) => (x[9][2]? 'Vector(' + defaultVect(x[9][4]) + ')' : "skip") ).filter(a => a !=  "skip" ).join(",")
                +'));' 
            iwttext = 'Set Global Variable(CpIwtText, Array(' +
                CheckPoints.map( (x,y) => (x[9][2]? 'Custom String("' + x[9][3] + '", Null, Null, Null)' : "skip") ).filter(a => a !=  "skip" ).join(",")
                +'));' 
            iwtcolor = "Set Global Variable(CpIwtColor, Color(" + MapData[18] + "));"

            // map header ==================
            mapmaker = MapData[0]
            mapcode = MapData[1]

            ban_triple = defaultBool(MapData[3])
            ban_multi = defaultBool(MapData[4])
            ban_emote = defaultBool(MapData[5])
            ban_create = defaultBool(MapData[6])
            ban_dbhop = defaultBool(MapData[7])
            ban_dashstart = defaultBool(MapData[8])
            ban_climb = defaultBool(MapData[21])

            portalon = defaultBool( MapData[9] )
            
            // comp ==================
            customdiftxt = MapData[19]
            customdifenabled = ""
            customdifcolor = MapData[20]
            if (MapData[10] == 'custom'){
                difficultyhud = 17

            } else {
                difficultyhud = defaultNum(MapData[10])
                customdifenabled =  "disabled "
            }

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
            
            editoron = defaultBool(document.getElementById("editorontoggle").checked)

            team1players = MapData[22] == 'team2' ? 0 : 11 
            team2players = MapData[22] == 'team2' ? 11 : 0 
      
            // ====== compile and copy ===================
            setdata(); // loaded from data file
      
            
            try {
                var language = document.getElementById("languageInput").value;
                if (language != "en-US"){ // recompile in overpy to translate if not eng
                    data_pasta = decompileAllRules(data_pasta, "en-US");
                    data_pasta = data_pasta + "\n#!disableMapDetectionFix"
                    data_pasta = compile(data_pasta, language);
                    data_pasta  = data_pasta.result;
                }
            }  catch(e) {
                console.log(e)
                CompileError = true
            }
             /*
            var resultthing = document.getElementById("results");
            resultthing.value = data_pasta;
            resultthing.select();
            resultthing.setSelectionRange(0, 99999);

           
            //navigator.clipboard.writeText(resultthing.value);
            setTimeout(async()=>console.log(
            await window.navigator.clipboard.readText()), 3000)
            navigator.clipboard.writeText(resultthing.value);
            */
            
            setTimeout(async()=>console.log(
                await window.navigator.clipboard.readText()), 3000
            )
            navigator.clipboard.writeText(data_pasta);

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
