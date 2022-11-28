function Save(x){
    localStorage.setItem('headerdata'+x, JSON.stringify(MapData));
    localStorage.setItem('checkpoints'+x, JSON.stringify(CheckPoints));
   
    //SaveNames[x] = document.getElementById("save"+x).value ;
    //localStorage.setItem('savenames',JSON.stringify(SaveNames))
    
    ShowMsg("Saved!")
}

function LoadSave(x){
    if(localStorage.getItem('headerdata'+x) != null){
        // load
        CheckPoints = []
        MapData = []
        MapData = JSON.parse( localStorage.getItem('headerdata'+x) )
        CheckPoints = JSON.parse(  localStorage.getItem('checkpoints'+x) )
        LoadData()    
    } else {
        ShowMsg("no data found")
    }
    
}

function SaveNamesFunc(x){
    SaveNames[x] = document.getElementById("save"+x).value ;
    //alert(SaveNames[x]);
    localStorage.setItem('savenames',JSON.stringify(SaveNames))
}


function ImportJson(){
    CheckPoints = []
    MapData = []
    CheckPoints = JSON.parse(document.getElementById('jsonfield').value.split("+!SEPERATOR!+")[0])
    MapData = JSON.parse(document.getElementById('jsonfield').value.split("+!SEPERATOR!+")[1])
    LoadData()
}

function ExportJsonCopy(){
    var jsonstring = JSON.stringify(CheckPoints) + "+!SEPERATOR!+" +  JSON.stringify(MapData) 
    /*
    var resultthing = document.getElementById("results")
    resultthing.value = jsonstring
    resultthing.select()
    resultthing.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(resultthing.value);
    */
    navigator.clipboard.writeText(jsonstring);
    ShowMsg("json copied to clipboard!")
}

function ExportJsonFile(){
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

function LoadData(){
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
                false // climb

            ]
            CheckPoints[i][9] = CheckPoints[i][9]  && CheckPoints[i][9] != false ?  CheckPoints[i][9]  : [
                false, // hud enabled
                "", // hud text
                false, // iwt enabled
                "", // iwt text
                "" // iwt pos
            ]

        }

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
        document.getElementById("iwtcolor").value = MapData[18]	    
        document.getElementById("customdif").value  = MapData[19] 
        document.getElementById("customdifcolor").value =  MapData[20]
        document.getElementById("ban_climb").checked =  MapData[21]
        

      
        // load things in the tab
        SelectedCp = 0
        CpButtons()
        UpdateSelection()
        UpdateTop()
        MakeTitles()
        changebar(0)
        ShowMsg("Loaded!")
}

	
// save/loading buttons ==================================

// load save names
if(localStorage.getItem('savenames') != null){
    var SaveNames = JSON.parse(localStorage.getItem('savenames'))
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
    savebox.style.width = "90%"
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
    saveload.value = save_i
    saveload.innerHTML = " Load "
    saveload.style.width = "45%"
    saveload.onclick = function(){LoadSave(this.value)}
    savediv.appendChild(saveload)

    document.getElementById("savebar").appendChild(savediv);
       
}



