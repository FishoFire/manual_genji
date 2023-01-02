var pasta = ""
var rulepasta = ""

var convert_positions = []
var convert_credits = []
var convert_ult = []
var convert_dash = []
var convert_bounces = []
var convert_kills = []
var convert_team
var convert_bans = []
/*
\nrule = rule
/*\nrule = disabled rule


const re = /[^#.]\bA = \[/g
// use [^] to say not these signs
    //# to not have comented out
    // . is to sort out eventplayer.variable, we only want global variables to be detected
// /b  means no other leters infront of it
// A = \[    is just A = [  the \ to cancel out [ being regex syntax normally
// /g needs to be at the end to make it work

*/
function GrabWaits(ind, past) {   // index of item before wich all waits should be taken, pasta to search   
    var waitcount = 0;
    var waitcounter = past.substring(0,ind)
    waitcounter = waitcounter.replaceAll("#wait","disabled") // deal with disabled by just not having them
    if (waitcounter.includes("wait(")){
        while (waitcounter.includes("wait(")){
            var curentwait = waitcounter.substring(waitcounter.indexOf("wait(")+5)
            curentwait = curentwait.substring(0, curentwait.indexOf(")"))
            if(isNaN(curentwait)){
                curentwait = 0
            }
            waitcount += Number(curentwait)
            waitcounter = waitcounter.replace("wait(","")
        }
    }
    return waitcount
}

function waitcheck(checkvar,inde){ // variable, index of wait
    // compares the waits fo difernt entries and keeps the one with highest wait

    while(checkvar.length > 1){ // if more entries
        
        checkvar[0][inde] = checkvar[0][inde] ? checkvar[0][inde] : 0
        
        if(checkvar[0][inde] == checkvar[1][inde]){// if waits are equal
            // delete first, keep overwrite
            checkvar.splice(0,1)
        }else{
            // delete one with lower wait. keep the higher wait since its overwrite the lower one
            if(checkvar[0][inde] > checkvar[1][inde]){
                checkvar.splice(1,1)
            }else{
                checkvar.splice(0,1)
            }

        }
    }
    if(checkvar.length > 0){
        checkvar = checkvar[checkvar.length - 1][0] // make it a normal var instead of array
        checkvar = String(checkvar).replaceAll(" ","").replaceAll("\n","").replaceAll("\t","") // take out the fluf to make it easier to search
    }
    return checkvar
}   

function FindArray(pastahere, arrayName,regexthing, arraytopaste) {
    // looks for the array in the pasta
    // regex to take the variable only if its not comented out etc
    // returns the array with or without modifications
    //convert_positions
    if (pastahere.includes(`${arrayName} = [`) ){ 
        var indexfind = -1;
        while ((match = regexthing.exec(pastahere)) !== null) { // while there is regex matches
            indexfind = match.index
        } // match until last found index i, so if mukltiple declares, only take last
        if (indexfind != -1){ // will be -1 if no regex matches, wich would be because for example dvA = [] having A = []
            var waitcount = GrabWaits(indexfind,rulepasta) // check how many waits are infront of it
            arraytopaste.push(   
                [
                pastahere.substring(
                    indexfind + `${arrayName} = [`.length +1, // start without declare only the vectors
                    indexfind + pastahere.substring(indexfind).indexOf("]\n") // end of list. the /n should make it only triger at last and not count array in array
                ),
                waitcount
                ] 
            )
            
        } 
        
        
    }
    return arraytopaste
}


function Converter(){
    convert_positions = []
    convert_credits = []
    convert_ult = []
    convert_dash = []

    convert_bounces = []
    convert_bounces[0] = []
    convert_bounces[1] = []
    convert_bounces[2] = []
    convert_bounces[3] = []
    convert_bounces[4] = []
    convert_bounces[5] = []
    
    convert_kills = []
    convert_kills[0] = []
    convert_kills[1] = []
    convert_kills[2] = []

    convert_bans = [
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ]

    convert_team = "team1"

    try {   
        pasta =  decompileAllRules(document.getElementById("converterdata").value , document.getElementById("lang_convert").value );
 
        var settingstr = pasta.substring(0, pasta.indexOf('rule "'))

        convert_team = settingstr.includes('team1Slots": 0,') ? 'team2' : 'team1'
        
        /*          
        if(settingstr.includes('"Ban Triple Jump": true')){
        //Ban Triple Jump on all cps
            convert_bans[1] = true}  //triple
          
        if(settingstr.includes('"Ban Multiclimb": true')){
            convert_bans[1] = true}  //multi
       
        if(settingstr.includes('"Ban Emote": true') || settingstr.includes('"Ban Emote Savehop": true')){
            convert_bans[2] = true}  //emote
            
     
        if(settingstr.includes('"Ban Double Bhop": true') || settingstr.includes('"Ban Createbhop on all cps": true')){ // aaaaaaaaa create
            convert_bans[3] = true} //create

        if(settingstr.includes('"Ban bhop from reset": true') || settingstr.includes('"Ban Deathbhop": true')){ 
            convert_bans[4] = true} //death
  

        if(settingstr.includes('"Ban ": true')){
            convert_bans[5] = true} //dashstart
        
        if(settingstr.includes('"Ban ": true')){
            convert_bans[7] = true} convert_bans[6]//ban climb
        */

    
        // cut out rest of settings til first rule
        pasta = pasta.substring( pasta.indexOf('rule "'))
        

           
        while (pasta.includes('\nrule "')){ // loop torugh eahc rule
            

            /*
            search for "\ndef "





            check wenether nrxt one is define or rule

            do skip check

            cut the string
                from first def or rule
                to next def or rule


            */
            if(pasta.indexOf('/*\nrule "') == pasta.indexOf('\nrule "') - 2){ // check if rule is disabled
                var skiprule = true
            } else {
                var skiprule = false
            }
      
            pasta = pasta.substring( pasta.indexOf('rule "')+5)
            if (pasta.includes('rule "')){
                rulepasta =  pasta.substring(0,pasta.indexOf('rule "'))
            } else {
                rulepasta = pasta
            }





            console.log(rulepasta)

            if (skiprule == false && rulepasta.includes("@Event eachPlayer") == false){

                convert_positions = FindArray(rulepasta, "A", /[^#.]\bA = \[/g, convert_positions)
                
                convert_ult = FindArray(rulepasta, "Dao", /[^#.]\bDao = \[/g, convert_ult)
                convert_dash = FindArray(rulepasta, "SHIFT", /[^#.]\bSHIFT = \[/g, convert_dash)

                convert_bounces[0] = FindArray(rulepasta, "TQ", /[^#.]\bTQ = \[/g, convert_bounces[0]) // pos
                convert_bounces[1] = FindArray(rulepasta, "TQ6", /[^#.]\bTQ6 = \[/g, convert_bounces[1]) // dash
                convert_bounces[2] = FindArray(rulepasta, "TQ5", /[^#.]\bTQ5 = \[/g, convert_bounces[2]) // ult
                convert_bounces[3] = FindArray(rulepasta, "BounceToggleLock", /[^#.]\bBounceToggleLock = \[/g, convert_bounces[3]) // lock
                convert_bounces[4] = FindArray(rulepasta, "EditMode", /[^#.]\bEditMode = \[/g, convert_bounces[4]) // stregth
                convert_bounces[5] = FindArray(rulepasta, "pinballnumber", /[^#.]\bpinballnumber = \[/g, convert_bounces[5]) // cp

                convert_kills[0] = FindArray(rulepasta, "H", /[^#.]\bH = \[/g, convert_kills[0]) // vect
                convert_kills[1] = FindArray(rulepasta, "I", /[^#.]\bI = \[/g, convert_kills[1]) // stregth
                convert_kills[2] = FindArray(rulepasta, "killballnumber", /[^#.]\bkillballnumber = \[/g, convert_kills[2]) // cp
                // credits and code
                if (rulepasta.toLowerCase().includes("made by:") && rulepasta.toLowerCase().includes("map code:") && rulepasta.toLowerCase().includes("guidence text") == false){             
                    var tempcredits = rulepasta.substring(rulepasta.toLowerCase().indexOf("made"))
                    tempcredits = tempcredits.substring(tempcredits.toLowerCase().indexOf(":")+1)
                    tempcredits = tempcredits.substring(0, tempcredits.indexOf('"'))
                    convert_credits[0] = tempcredits

                    tempcredits = rulepasta.substring(rulepasta.toLowerCase().indexOf("code:"))
                    tempcredits = tempcredits.substring(tempcredits.toLowerCase().indexOf(":")+1)
                    tempcredits = tempcredits.substring(0, tempcredits.indexOf('"'))

                    convert_credits[1] = tempcredits 
   

                }
                //if (rulepasta.includes("A = [vect(-28.427,")){ // debug stop
                //    return
                //}
                
            } 

  
               
        }

    //return
    defaultdata() // remove checkpoints and map data and set defaults
            
    convert_positions = waitcheck(convert_positions, 1)
    
    while(convert_positions.includes("vect")){
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
                [false,false,false,false,false,false], //8 bans
                [false,"",false,"",""] // 9 text
            ]
            )
    
            var thiscp = CheckPoints.length-1
            if(convert_positions[0] == "["){ // teleport
                convert_positions = convert_positions.substring(1)
                CheckPoints[thiscp][0] = defaultVect( convert_positions.substring("vect(".length,convert_positions.indexOf(")")) )                
                convert_positions = convert_positions.substring(convert_positions.indexOf("),")+2)
                CheckPoints[thiscp][1] = true
                CheckPoints[thiscp][2] =  defaultVect( convert_positions.substring("vect(".length,convert_positions.indexOf(")")) )                
                convert_positions = convert_positions.substring(convert_positions.indexOf(")],")+3)
                
            }else{
                CheckPoints[thiscp][0] = defaultVect( convert_positions.substring("vect(".length,convert_positions.indexOf(")")) )
                convert_positions = convert_positions.substring(convert_positions.indexOf("),")+2) // cut out
            }
            
        }
        
        if (convert_ult.length > 0){
            convert_ult = waitcheck(convert_ult, 1)
            convert_ult = convert_ult.split(",")
            for (var i = 0; i < convert_ult.length; i++) {
                if (convert_ult[i] != '' && !isNaN(convert_ult[i]) && convert_ult[i] >= 0 && convert_ult[i] < CheckPoints.length -1){
                CheckPoints[Number(convert_ult[i])][4] = true 
                }
            } 
        }
        if (convert_dash.length > 0){
            convert_dash = waitcheck(convert_dash, 1)
            convert_dash = convert_dash.split(",")
            for (var i = 0; i < convert_dash.length; i++) {
                if (convert_dash[i] != '' && !isNaN(convert_dash[i]) && convert_dash[i] >= 0 && convert_dash[i] < CheckPoints.length -1){
                CheckPoints[Number(convert_dash[i])][3] = true 
                }
            } 
        }
        
        

        if(convert_credits[0]){MapData[0] = convert_credits[0].trim()}
        if(convert_credits[1]){MapData[1] = convert_credits[1].trim()}
        MapData[22] = convert_team
 
        /*
        MapData[3] = convert_bans[0]//triple
        MapData[4] = convert_bans[1]//multi
        MapData[5] = convert_bans[2]//emote
        MapData[6] = convert_bans[3]//create
        MapData[7] = convert_bans[4]//death
        MapData[8] = convert_bans[5]//dashstart
        MapData[21] = convert_bans[6]//ban climb
        */

        // bounce orbs ====================
        // 0 pos vector 1 dash 2 ult 3 lock 4 strength 5 cp (not in web)
        
        if(convert_bounces[5].length > 0){
            convert_bounces[5] = waitcheck(convert_bounces[5], 1).split(",")
        }
        if(convert_bounces[5].length > 0 && convert_bounces[5] != ''){
            
            convert_bounces[0] = waitcheck(convert_bounces[0], 1) //.split(",")
            // for 0 extract vectors first              
            var tempbounce = convert_bounces[0]
            convert_bounces[0] = []
            while(tempbounce.includes("vect")){
                convert_bounces[0].push(defaultVect(tempbounce.substring( "vect(".length, tempbounce.indexOf(")") ) ) )
                tempbounce = tempbounce.substring(tempbounce.indexOf(")")+2)
            }
            convert_bounces[1] = convert_bounces[1].length > 0 ? waitcheck(convert_bounces[1], 1).split(",") : []
            convert_bounces[2] = convert_bounces[2].length > 0 ? waitcheck(convert_bounces[2], 1).split(",") : []
            convert_bounces[3] = convert_bounces[3].length > 0 ? waitcheck(convert_bounces[3], 1).split(",") : []
            convert_bounces[4] = convert_bounces[4].length > 0 ? waitcheck(convert_bounces[4], 1).split(",") : []

            for (var i = 0; i < convert_bounces[5].length; i++) {
            
                convert_bounces[0][i] = convert_bounces[0][i] ? convert_bounces[0][i] : "0,0,0" // vect
                convert_bounces[1][i] = convert_bounces[1][i] ? convert_bounces[1][i] : "false" // dash
                convert_bounces[2][i] = convert_bounces[2][i] ? convert_bounces[2][i] : "false" // ult
                convert_bounces[3][i] = convert_bounces[3][i] ? convert_bounces[3][i] : "false" // lock
                convert_bounces[4][i] = convert_bounces[4][i] ? convert_bounces[4][i] : 0 // strenfth
                convert_bounces[5][i] = convert_bounces[5][i] ? convert_bounces[5][i] : -500 // cp
                
                convert_bounces[1][i] = convert_bounces[1][i].toString().toLowerCase() == "true" ? true : false
                convert_bounces[2][i] = convert_bounces[2][i].toString().toLowerCase() == "true" ? true : false
                convert_bounces[3][i] = convert_bounces[3][i].toString().toLowerCase() == "true" ? true : false   

                if( convert_bounces[5][i] >= 0 &&  convert_bounces[5][i] < CheckPoints.length -1 &&  convert_bounces[5][i] != -500 ){
                    CheckPoints[Number(convert_bounces[5][i])][6].push( [
                        defaultVect(convert_bounces[0][i]),
                        Boolean(convert_bounces[1][i]),
                        Boolean(convert_bounces[2][i]),
                        Boolean(convert_bounces[3][i]),
                        Number(convert_bounces[4][i])
                    ]
                    )

                }
            }
        }

        // kills ====================
  
        if(convert_kills[2].length > 0){
            convert_kills[2] = waitcheck(convert_kills[2], 1).split(",")
        }
        if(convert_kills[2].length > 0 && convert_kills[2] != ''){
            convert_kills[0] = waitcheck(convert_kills[0], 1) //.split(",")
            // for 0 extract vectors first              
          
            var tempkills = convert_kills[0]
            convert_kills[0] = []
            while(tempkills.includes("vect")){
                convert_kills[0].push(defaultVect(tempkills.substring( "vect(".length, tempkills.indexOf(")") ) ) )
                tempkills = tempkills.substring(tempkills.indexOf(")")+2)
            }
            
            convert_kills[1] = convert_kills[1].length > 0 ? waitcheck(convert_kills[1], 1).split(",") : []
            //convert_kills[2] = convert_kills[2].length > 0 ? waitcheck(convert_kills[2], 1).split(",") : []
            for (var i = 0; i < convert_kills[2].length; i++) {
                convert_kills[0][i] = convert_kills[0][i] ? convert_kills[0][i] : "0,0,0" // vect
                convert_kills[1][i] = convert_kills[1][i] ? convert_kills[1][i] : "1" // radius
                convert_kills[2][i] = convert_kills[2][i] ? convert_kills[2][i] : "-500" // cp
                if( convert_kills[2][i] >= 0 &&  convert_kills[2][i] < CheckPoints.length -1 &&  convert_kills[2][i] != "-500" ){
                    CheckPoints[Number(convert_kills[2][i])][7].push( [
                        defaultVect(convert_kills[0][i]),
                        String(convert_kills[1][i]),
                        String(convert_kills[2][i])
                    ]
                    )
                }
            }
        }
        
        LoadData()
        ShowMsg("done")

       
    } catch(e){
        ShowMsg("Couldnt load data")
        console.log(e)

    }
    

}
/*
notes
- remebmer teleporters
    when taking apart position var, first remove teleporters and store them + teleport enabled + cp number
- list things that can and cannot be detected for sure
- somwhow deal with empty array defaults, but remember sometimes empty might be on purpose to overwtrite previous orbs


regexes:

    A = [vect(x,x,x), [vect(x,x,x), (x,x,x)]]
    TQ
    TQ5 etc all [false,true,false]

    name = "made by: xxxxxx "
    code = c


    bans

    global

    per cp
    if exist

    dash/ult = []

    dif = check if dif is selected in workshop








*/  