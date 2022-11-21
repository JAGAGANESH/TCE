function PredictStay() {
    var num = Math.floor(Math.random() * 10) + 1;
    var days;
    if(num==1) { days = "0 - 10 days"; }
    else if(num==2) { days = "11 - 20 days"; }
    else if(num==3) { days = "21 - 30 days"; }
    else if(num==4) { days = "31 - 40 days"; }
    else if(num==5) { days = "41 - 50 days"; }
    else if(num==6) { days = "51 - 60 days"; }
    else if(num==7) { days = "61 - 70 days"; }
    else if(num==8) { days = "71 - 80 days"; }
    else if(num==9) { days = "81 - 90 days"; }
    else if(num==10) { days = "More than 100 days"; }
    else {return "Unable to predict"; }
    document.getElementById("p_stay").value = days;
}
