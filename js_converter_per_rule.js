
var pasta = ""
var rulepasta = ""




             /*
            \nrule = rule
            /*\nrule = disabled rule
            */
function GrabWaits(ind, past) {   // index of item before wich all waits should be taken, pasta to search   
    var waitcount = 0;
    var waitcounter = past.substring(0,ind)
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

    while(checkvar.length > 1){ // if more entries
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
    checkvar = checkvar[checkvar.length-1][0] // make it a normal var instead of array
    checkvar = checkvar.replaceAll(" ","").replaceAll("\n","").replaceAll("\t","") // take out the fluf to make it easier to search
    return checkvar
}   


function Converter(){
    var convert_positions = []
    var convert_credits = []

    try {   
        pasta =  decompileAllRules(document.getElementById("converterdata").value , document.getElementById("lang_convert").value );
        //pasta = temppast  // stored in console for now 
        pasta = pasta.substring( pasta.indexOf('rule "'))
        
        Positions = []
        
        while (pasta.includes('\nrule "')){ // loop torugh eahc rule
            
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
            
            if (skiprule == false && rulepasta.includes("@Event eachPlayer") == false){
          
                if (rulepasta.includes("A = [") ){ // if the rule declares A
                    var indexfind = 0;
                    
                    // regex
                    const re = /\bA = \[/g
                       while ((match = re.exec(rulepasta)) !== null) { // while there is regex matches
                        indexfind = match.index
                    } // match until last index is found, remember last index in indexfind
                    // add the data to positions
                    
                    //for each wait before
                    
                    var waitcount = GrabWaits(indexfind,rulepasta)
                    
                    
                    convert_positions.push(   
                        [
                        rulepasta.substring(
                            indexfind + "A = [".length, // start without declare only the vectors
                            indexfind + rulepasta.substring(indexfind).indexOf("]\n") // end of list
                        ),
                        waitcount
                        ]
                        
                    )
                }   
                // credits and code
                if (rulepasta.toLowerCase().includes("made by:") && rulepasta.toLowerCase().includes("code:") && rulepasta.toLowerCase().includes("guidence text") == false){             
                    var tempcredits = rulepasta.substring(rulepasta.toLowerCase().indexOf("made"))
                    tempcredits = tempcredits.substring(tempcredits.toLowerCase().indexOf(":")+1)
                    tempcredits = tempcredits.substring(0, tempcredits.indexOf('"'))
                    
                    convert_credits[0] = tempcredits
                    tempcredits = rulepasta.substring(rulepasta.toLowerCase().indexOf("code:"))
                    tempcredits = tempcredits.substring(tempcredits.toLowerCase().indexOf(":")+1)
                    tempcredits = tempcredits.substring(0, tempcredits.indexOf('"'))

                    convert_credits[1] = tempcredits 
                
    

                }
                
            } 

  
               
        }
       
        


        defaultdata() // remove checkpoints and map data and set defaults
        
        /*
        'vect(101.27, -1, -73.46), vect(101.86, -1, -62.58), vect(86.22, -0.26, -54.51), vect(76.73, 1.01, -53), vect(67.08, 0.74, -57.19), vect(61.64, 2.46, -62.82), [vect(50.06, -2.53, -78.83), vect(54.31, -3, -64.84)], vect(37.38, -1.72, -64.14), vect(33.46, 0, -48.18), vect(20.38, -0.92, -38.9), vect(12.23, 5.5, -45.55), vect(-4.61, 0.81, -51.28), vect(-13.68, 5.5, -42.87), vect(-23.85, 3.08, -26.19), vect(-16.41, -3.01, -33.57), vect(-19.97, -5.9, -50.4), vect(-19.83, -6.13, -67.82), vect(-21.62, -6, -71.35), vect(-23.42, -6, -76.37), vect(-34.34, -4.48, -78.03), vect(-49.99, -2.5, -77.73), vect(-66.69, 0.86, -58.75), vect(-71.55, 1.02, -50.01), vect(-76.32, 1.02, -53.11), vect(-85.42, -0.13, -55.28), vect(-63.35, 0.76, -56.44), vect(-42.16, -5.97, -60.4), vect(-32.04, 0, -61.13), vect(-15.32, -6, -55.81), vect(-19.13, -0.96, -38.92), vect(-17.64, 5.26, -36.68), vect(-13.09, 5.5, -35), vect(10.36, 3, -44.29), vect(20.38, 3, -25.82), vect(27.54, 2, -14.31), vect(9.79, -2.13, -15.97), vect(21.14, 3, -28.76), vect(32.41, 0.02, -48.28), vect(32.04, 0, -61.12), vect(14.41, -6, -49.48), vect(51.35, -5.78, -61.81), vect(55.37, -4, -77.76), vect(71.36, 1.02, -62.42), vect(92.7, -3, -68.81)'
        */
        // take data apart

        //Positions = Positionsbackup // temppppppppppppp


        // take last entry
        /*
          while(convert_positions.length > 1){ // if more entries
            if(convert_positions[0][1] == convert_positions[1][1]){// if waits are equal
                // delete first, keep overwrite
                convert_positions.splice(0,1)
            }else{
                // delete one with lower wait. keep the higher wait since its overwrite the lower one
                if(convert_positions[0][1] > convert_positions[1][1]){
                    convert_positions.splice(1,1)
                }else{
                    convert_positions.splice(0,1)
                }

            }

        }
        convert_positions = convert_positions[convert_positions.length-1][0] // make it a normal var instead of array
        convert_positions = convert_positions.replaceAll(" ","").replaceAll("\n","").replaceAll("\t","") // take out the fluf to make it easier to search
        */

  

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
        MapData[0] = convert_credits[0]
        MapData[1] = convert_credits[1]
        LoadData()
        ShowMsg("done")
        
    } catch(e){
        ShowMsg("Couldnt load, check log for details")
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