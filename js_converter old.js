var pasta = ""
function Converter(){

    defaultdata()
 
    pasta = decompileAllRules(document.getElementById("converterdata").value, "en-US");
    //pasta = document.getElementById("converterdata").value
    //pasta = pasta.replaceAll("\n","").replaceAll("\t","")
    /*
    langague:
	if not english > recompile overpy as english
	perhaps always make overpy instead and just search trough that

    map detection if lang fields allows for it

    arrays/vars
        searchvar = var A
        temppasta = pasta

        while global + searchvar + "=" in temppasta
            if = empty array or [] then dont do shit
            find index of first hit

            find if disabled infront of action
            find rule(" infront of it > check if disabled
            
            find waits before it

            array = grab 1/2/3d array function
            result.append array, waits, disables / returns

            remove from temp pasta, only the name will do, or replace with VARCHECKEDA


        var = first one unles waits/returns/disables

        turn var into js data

        turn js data into web data

        */
    
    
    CheckPoints = ReadArray("A")


    LoadData()
    ShowMsg("Loaded?")


}

// Set Global Variable(A, Array(Vector(101.27, -1, -73.46), Vector(101.86, -1, -62.58), Vector(86.22, -0.26, -54.51), Vector(76.73, 1.01, -53), Vector(67.08, 0.74, -57.19), Vector(61.64, 2.46, -62.82), Vector(50.06, -2.53, -78.83), Vector(54.31, -3, -64.84), Vector(37.38, -1.72, -64.14), Vector(33.46, 0, -48.18), Vector(20.38, -0.92, -38.9), Vector(12.23, 5.5, -45.55), Vector(-4.61, 0.81, -51.28), Vector(-13.68, 5.5, -42.87), Vector(-23.85, 3.08, -26.19), Vector(-16.41, -3.01, -33.57), Vector(-19.97, -5.9, -50.4), Vector(-19.83, -6.13, -67.82), Vector(-21.62, -6, -71.35), Vector(-23.42, -6, -76.37), Vector(-34.34, -4.48, -78.03), Vector(-49.99, -2.5, -77.73), Vector(-66.69, 0.86, -58.75), Vector(-71.55, 1.02, -50.01), Vector(-76.32, 1.02, -53.11), Vector(-85.42, -0.13, -55.28), Vector(-63.35, 0.76, -56.44), Vector(-42.16, -5.97, -60.4), Vector(-32.04, 0, -61.13), Vector(-15.32, -6, -55.81), Vector(-19.13, -0.96, -38.92), Vector(-17.64, 5.26, -36.68), Vector(-13.09, 5.5, -35), Vector(10.36, 3, -44.29), Vector(20.38, 3, -25.82), Vector(27.54, 2, -14.31), Vector(9.79, -2.13, -15.97), Vector(21.14, 3, -28.76), Vector(32.41, 0.02, -48.28), Vector(32.04, 0, -61.12), Vector(14.41, -6, -49.48), Vector(51.35, -5.78, -61.81), Vector(55.37, -4, -77.76), Vector(71.36, 1.02, -62.42), Vector(92.7, -3, -68.81)));
function ReadArray(searchvar){
    var temppasta = pasta
    var entries = []
    if ( temppasta.includes("Global." + searchvar + " = ") == false){
        alert("no data found, make error here")
        return
    }

    while (
        temppasta.includes("Global." + searchvar + " = ")
    ) {
        var indexofthis =  temppasta.indexOf("Global." + searchvar + " = ")
        indexofthis += ("Global." + searchvar + " = Array(").length
        temppasta = temppasta.substring(indexofthis)
        temppasta = temppasta.substring(0, temppasta.indexOf(");"))
        
        
    }

    /*
    while global + searchvar + "=" in temppasta
            if = empty array or [] then dont do shit
            find index of first hit

            find if disabled infront of action
            find rule(" infront of it > check if disabled
            
            find waits before it

            array = grab 1/2/3d array function
            result.append array, waits, disables / returns

            remove from temp pasta, only the name will do, or replace with VARCHECKEDA


        var = first one unles waits/returns/disables
    */
    return selectentry
}

/*
Global.A = Array(Vector(20.460, 6, -126.760), Vector(18.280, 7.140, -132.840), Vector(26.081, -2, -145.940), Vector(36.079, 5,
    -144.296), Vector(52.029, 1, -144.722), Vector(57.036, 1, -137.253), Vector(63.800, -3.300, -119.560), Vector(53.410, 3.560,
    -113.060), Vector(38.030, 4, -101.200), Vector(25.863, 3.013, -85.075), Vector(39.841, 3.038, -75.338), Vector(37.890, -2.134,
    -56.090), Vector(32.420, 3, -43.460), Vector(39.370, 3, -26.160), Vector(44.795, 3, -36.287), Vector(45.640, 4.920, -55.130),
    Vector(53.330, 3.340, -45.560), Vector(61.360, 3, -42.820), Vector(72.540, 3, -49.077), Vector(78.708, 3.678, -66.043), Vector(
    64.820, -3, -48.153), Vector(72.459, 3.045, -40.118), Vector(60.484, 2.028, -19.921), Vector(58.797, -0.481, -9.715), Vector(
    66.710, -2.990, -14.880), Vector(89.585, 1.402, -1.342), Vector(97.351, 1, 22.041), Vector(101.805, -0.942, 44.751), Vector(
    84.068, 5.857, 52.153), Vector(62.730, 1.030, 38.570), Vector(69.720, -6.980, 55.500), Vector(71.910, -9.980, 53.520), Vector(
    62.882, -9.976, 38.637), Vector(78.106, -9.040, 37.295), Vector(94.010, -5.660, 34.090), Vector(96.674, -2.977, 24.152),
    Vector(87.087, -0.942, 31.037), Vector(65.354, 9, 32.929), Vector(50.020, 9, 5.970), Vector(70.660, 9, 12.500), Vector(77.960,
    1.880, -11.490), Vector(83.412, 3.037, -31.828), Vector(61.164, -0.279, -27.452), Vector(41.391, -0.515, -49.228), Vector(
    18.660, 3, -63.250), Vector(26.562, 4, -89.312), Vector(37.222, 0, -113.031), Vector(20.819, -2, -129.218), Vector(30.300, 5,
    -149.850), Vector(18.280, 7.140, -132.840), Vector(20.460, 6, -126.760));
*/

ReadArray2d


ReadString
ReadNumber