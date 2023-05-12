setInterval(function() { // auto save
    localStorage.setItem('headerdata-auto', JSON.stringify(MapData));
    localStorage.setItem('checkpoints-auto', JSON.stringify(CheckPoints));
    
    //let curtime= new Date();
    //curtime = Date().getHours() + ":" + Date().getMinutes()
    console.log("auto saved at "+Date())

}, 60 * 1000)

function Save(x){ // do normal save
    localStorage.setItem('headerdata'+x, JSON.stringify(MapData));
    localStorage.setItem('checkpoints'+x, JSON.stringify(CheckPoints));
    

    //SaveNames[x] = document.getElementById("save"+x).value ;
    //localStorage.setItem('savenames',JSON.stringify(SaveNames))
    try{
        document.getElementById("loadbutton" + x).disabled = false
    } catch(e) {
        console.log(e)
    }

    LogOpenNew()
    LogAdd("Data saved", 'n',true)
    LogAdd("slot: <i>" + x + "</i>") 
    LogAdd("name: <i>" + SaveNames[x] + "</i>") 

}

function LoadSave(x){ // load save slot
    if(localStorage.getItem('headerdata'+x) != null){
        // load
        LogOpenNew()
        LogAdd("loading save slot data")
        CheckPoints = []
        MapData = []
        MapData = JSON.parse( localStorage.getItem('headerdata'+x) )
        CheckPoints = JSON.parse(  localStorage.getItem('checkpoints'+x) )
        LoadData()    
    } else {
        //ShowMsg("no data found")
        LogOpenNew()
        LogAdd("Error: no data found in this slot")
    }
    
}

function SaveNamesFunc(x){ // save names (they are a seperate save)
    SaveNames[x] = document.getElementById("save"+x).value ;
    //alert(SaveNames[x]);
    localStorage.setItem('savenames',JSON.stringify(SaveNames))
}


function ImportJson(){
    LogOpenNew()
    LogAdd("Importing json")
    
    if(document.getElementById('jsonfield').value == ""){
        LogAdd("No data entered in the import field","r")
        LogAdd("loading default data instead","b",true)
        defaultdata()
        LoadData()
        return
    }
    try {
        CheckPoints = []
        MapData = []
        CheckPoints = JSON.parse(document.getElementById('jsonfield').value.split("+!SEPERATOR!+")[0])
        MapData = JSON.parse(document.getElementById('jsonfield').value.split("+!SEPERATOR!+")[1])
        LoadData()
    }catch(e){
        LogAdd("Error: json not in right format","r",true)
        LogAdd(e)
        changebar(5)
        LogAdd("loading default data instead","b",true)
        defaultdata()
        LoadData()
    }

    
}

function ExportJsonCopy(){ // to clipboard
    var jsonstring = JSON.stringify(CheckPoints) + "+!SEPERATOR!+" +  JSON.stringify(MapData) 
    /*
    var resultthing = document.getElementById("results")
    resultthing.value = jsonstring
    resultthing.select()
    resultthing.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(resultthing.value);
    */
    navigator.clipboard.writeText(jsonstring);
    //ShowMsg("json copied to clipboard!")
    LogOpenNew()
    LogAdd("Copied json string to clipboard","g")
    LogAdd("<br/>" + jsonstring + "<br/>")
}

function ExportJsonFile(){ // to file
    var jsonstring = JSON.stringify(CheckPoints) + "+!SEPERATOR!+" +  JSON.stringify(MapData) 
    var filename = (
        MapData[1] + // code
        '-' + 
        CheckPoints.length + 
        'cp-' + 
        MapData[10] + //dif
        '-json.txt'
    )
    const exportfile = new File([jsonstring], filename, { // change filename to be savename
        type: 'text/plain',
    })
    
    const link = document.createElement('a')
    const url = URL.createObjectURL(exportfile)

    link.href = url
    link.download = exportfile.name
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

}

function LoadData(){ // after setting the data with previous codes, checks the variables and loads it to display in the interface
          // check data
        try{
           
            LogAdd("Attempting to read data")
  
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

            MapData[18] =  MapData[18] ?  MapData[18] :  "Lime Green"
            MapData[19] =  MapData[19] ?  MapData[19] :  ""
            MapData[20] =  MapData[20] ?  MapData[20] :  "Lime Green"
            MapData[21] =  MapData[21] ?  MapData[21] :  false
            MapData[22] =  MapData[22] ?  MapData[22] :  'team1'
            MapData[23] =  MapData[23] ?  MapData[23] :  false
            MapData[24] =  MapData[24] ?  MapData[24] :  false
            MapData[25] =  MapData[25] ?  MapData[25] :  false

            if (CheckPoints.length > 0){
            // per cp things
                for(let i=0;i < CheckPoints.length;i++){
                    //CheckPoints[i][8] = CheckPoints[i][8]  ?  CheckPoints[i][8]  : false
                    //CheckPoints[i][9] = CheckPoints[i][9]  ?  CheckPoints[i][9]  : false
                    
                    CheckPoints[i][8] = CheckPoints[i][8]  && CheckPoints[i][8] != false ?  CheckPoints[i][8]  : [
                        false, // triple
                        false, // multi
                        false, // create
                        false, // dead
                        false, // emote
                        false, // climb
                        false // require bhop

                    ]
                    CheckPoints[i][9] = CheckPoints[i][9]  && CheckPoints[i][9] != false ?  CheckPoints[i][9]  : [
                        false, // hud enabled
                        "", // hud text
                        false, // iwt enabled
                        "", // iwt text
                        "" // iwt pos
                    ]

                }
            }
            // update outdated settings

            if(MapData[10] == 18){ // playtest that got turned into 0
                console.log("turned outdated playtest 18 value to 0")
                MapData[10] = "0"
            }


            LogAdd("Putting data in the interface")
            // show first tab
            document.getElementById("cpdata").style.display = "block"
            document.getElementById("orbs-kills").style.display = "block"
            
            SetHeaderData()
            
            // load things in the tab
            SelectedCp = 0
            CpButtons()
            if (CheckPoints.length > 0){ 
                UpdateSelection()
            } else {
                document.getElementById("cpdata").style.display = "none"
                document.getElementById("orbs-kills").style.display = "none"
                SelectedCp = -1
            }
            UpdateTop()
            MakeTitles()
            changebar(0)
            LogAdd("Data loaded!","g",true)

    } catch(e){
        LogAdd("Error with data loading","r",true)
        LogAdd(e)
        changebar(5)
    }

}

	
// save/loading buttons ====================================================================

// load save names
if(localStorage.getItem('savenames') != null){
    SaveNames = JSON.parse(localStorage.getItem('savenames'))
} 

// generate the buttons
for (var save_i = 0; save_i < 21; save_i++){

    SaveNames[save_i] =  SaveNames[save_i] ?  SaveNames[save_i] :  "save " + save_i
    
    let savediv = document.createElement("div");
    savediv.className = "saveelement"
    savediv.innerHTML = "<b> Save Slot " + save_i + " </b> <br/>"
    savediv.value = savediv

    let savebox = document.createElement("textarea");
    savebox.id = "save"+save_i
    savebox.style.width = "89%"
    savebox.rows = 1
    savebox.innerHTML = SaveNames[save_i]
    //savebox.value = save_i
    savebox.setAttribute("savenum",save_i)
    savebox.onkeyup = function(){ SaveNamesFunc(this.getAttribute("savenum"))}

    savediv.appendChild(savebox)
    
    let savebutton = document.createElement("button");
    savebutton.value = save_i
    savebutton.innerHTML = " save "
    savebutton.style.width = "45%"
    savebutton.onclick = function(){Save(this.value)}
    savediv.appendChild(savebutton)

    let saveload = document.createElement("button");
    saveload.id="loadbutton" + save_i
    saveload.value = save_i
    saveload.innerHTML = " Load "
    saveload.style.width = "45%"
    saveload.onclick = function(){LoadSave(this.value)}
    if ((localStorage.getItem('headerdata'+save_i) != null) == false){
        saveload.disabled = true
        // disable if no save found in that slot
    }
    savediv.appendChild(saveload)

    document.getElementById("savebar").appendChild(savediv);
       
}



