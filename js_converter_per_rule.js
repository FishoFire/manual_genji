
var pasta = ""
var rulepasta = ""
var Positions = []
var ruleskiped = []

             /*
            \nrule = rule
            /*\nrule = disabled rule
            */
           

function Converter(){
    try {
       

        pasta =  decompileAllRules(document.getElementById("converterdata").value , document.getElementById("lang_convert").value );
        //pasta = temppast  // stored in console for now 
        pasta = pasta.substring( pasta.indexOf('rule "'))
        
        Positions = []
        
        while (pasta.includes('\nrule "')){
            
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
          
                if (rulepasta.includes("A = [") ){
                    //Positions.push(rulepasta)
                    // keeps setting the index to last match until no matches then while ends and var is index
                    var indexfind = 0;
                    const re = /\bA = \[/g
                       while ((match = re.exec(rulepasta)) !== null) {
                        indexfind = match.index
                    } 
         
                    
                    Positions.push(   
                        rulepasta.substring(
                            indexfind + "A = [".length, // start without declare only the vectors
                            indexfind + rulepasta.substring(indexfind).indexOf("]\n") // end of list
                        )

                        )
                     

                        
                    // substr . index + indexfind?

                    
                    
                    /*
                    
                    if regex match in
                        find last regix match for it
                        store but dont take it appart yet
                        note any waits before it
                        note array order
                        delte the entry from the temp because TQ and TQ5 etc or write the regex to deal with that

                    same but for other vars
                    make function for what regix to match


                    

                    var indexfind = 0;
                    const re = /bar/g,
                    str = "foobarfoobarbarbar";
                    while ((match = re.exec(str)) !== null) {
                        console.log(match.index);
                        indexfind = match.index
                    }

                    this keeps finding the match in string and ends on last
                    the /g at end seems neesesary

                    */


                } else {
                    ruleskiped.push(rulepasta) // store disabled rules for debug
                }

  
               
            }
            
        }


        defaultdata() // remove checkpoints and map data and set defaults
        
        /*
        'vect(101.27, -1, -73.46), vect(101.86, -1, -62.58), vect(86.22, -0.26, -54.51), vect(76.73, 1.01, -53), vect(67.08, 0.74, -57.19), vect(61.64, 2.46, -62.82), [vect(50.06, -2.53, -78.83), vect(54.31, -3, -64.84)], vect(37.38, -1.72, -64.14), vect(33.46, 0, -48.18), vect(20.38, -0.92, -38.9), vect(12.23, 5.5, -45.55), vect(-4.61, 0.81, -51.28), vect(-13.68, 5.5, -42.87), vect(-23.85, 3.08, -26.19), vect(-16.41, -3.01, -33.57), vect(-19.97, -5.9, -50.4), vect(-19.83, -6.13, -67.82), vect(-21.62, -6, -71.35), vect(-23.42, -6, -76.37), vect(-34.34, -4.48, -78.03), vect(-49.99, -2.5, -77.73), vect(-66.69, 0.86, -58.75), vect(-71.55, 1.02, -50.01), vect(-76.32, 1.02, -53.11), vect(-85.42, -0.13, -55.28), vect(-63.35, 0.76, -56.44), vect(-42.16, -5.97, -60.4), vect(-32.04, 0, -61.13), vect(-15.32, -6, -55.81), vect(-19.13, -0.96, -38.92), vect(-17.64, 5.26, -36.68), vect(-13.09, 5.5, -35), vect(10.36, 3, -44.29), vect(20.38, 3, -25.82), vect(27.54, 2, -14.31), vect(9.79, -2.13, -15.97), vect(21.14, 3, -28.76), vect(32.41, 0.02, -48.28), vect(32.04, 0, -61.12), vect(14.41, -6, -49.48), vect(51.35, -5.78, -61.81), vect(55.37, -4, -77.76), vect(71.36, 1.02, -62.42), vect(92.7, -3, -68.81)'
        */
        // take data apart

        Positions = Positions[Positions.length-1] // later enter waits in the equasion
        while(Positions.includes("vect")){
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
            if(Positions[0] == "["){ // teleport
                Positions = Positions.substring(1)
                CheckPoints[thiscp][0] = defaultVect( Positions.substring("vect(".length,Positions.indexOf(")")) )                
                Positions = Positions.substring(Positions.indexOf("), ")+3)
                CheckPoints[thiscp][1] = true
                CheckPoints[thiscp][2] =  defaultVect( Positions.substring("vect(".length,Positions.indexOf(")")) )                
                Positions = Positions.substring(Positions.indexOf(")], ")+4)
                
            }else{
                CheckPoints[thiscp][0] = defaultVect( Positions.substring("vect(".length,Positions.indexOf(")")) )
                

                Positions = Positions.substring(Positions.indexOf("), ")+3) // cut out
            }
            /*
            add defaults, take into acount teleport
            tele is tele
            if tele then tele else 
            */
        }
        /*
        defaults
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
        */

        // while length in cps
        //if first is vector then add vector as cp
        //if first is list then add vector and teleport  and teleport bool both
        //rest default cp settings
  
        // orbs
        // if any orbs
        // 2d array them
        // while orbs, push them into the right cp


        // etc

    
        LoadData()
        ShowMsg("Loaded?")
    
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