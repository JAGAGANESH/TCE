function ListAreas() {
    for(i=0;i<Areas.length;i++) {
        var AreaList = Areas[i].Area;
        document.getElementById("ListAreas").innerHTML += "<a class='grid-item' href='dam_profile.html?"+i+"'><b>"+AreaList+"</b></a>";
    }
}

