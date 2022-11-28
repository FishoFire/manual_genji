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
            [false,false,false,false,false,false], //8 bans
            [false,"",false,"",""] // 9 text
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
            [false,false,false,false,false,false], //8 bans
            [false,"",false,"",""] // 9 text
            ]
        )
        SelectedCp ++
    }
    CpButtons()   
    UpdateSelection()
}

function CpButtons(){ // generate all cp buttons
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


// orbs =============================================

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

// titles =============================================

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










