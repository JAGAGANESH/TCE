function RepeatChangeFunction() {    
    ChangeValues_SendToDatabase();
    setInterval(RepeatChangeFunction, 15000);
}
function RepeatChangeAllFunction() {    
    ChangeAllValues_SendToDatabase();
    setInterval(RepeatChangeAllFunction, 30000);
}

function ChangeValues_SendToDatabase() {
    var dam_name = dam_data[name].Name;
    var new_dam_ph = RandomValue_Ph();
    var new_dam_level = RandomValue_Level();
    var new_dam_temperature = RandomValue_Temperature();
    var new_dam_flow = RandomValue_Flow()
    firebase.database().ref("Fourth Semester/Project Management/Water Quality Management/TN DAMS/"+dam_name).set({
        Ph: new_dam_ph,
        Level: new_dam_level,
        Temperature: new_dam_temperature,
        Flow: new_dam_flow,
    });
}

function ChangeAllValues_SendToDatabase() {
    for(i=0;i<=dam_data.length;i++) {
        var dam_name = dam_data[i].Name;
        var new_dam_ph = RandomValue_Ph();
        var new_dam_level = RandomValue_Level();
        var new_dam_temperature = RandomValue_Temperature();
        var new_dam_flow = RandomValue_Flow()
        firebase.database().ref("Fourth Semester/Project Management/Water Quality Management/TN DAMS/"+dam_name).set({
            Ph: new_dam_ph,
            Level: new_dam_level,
            Temperature: new_dam_temperature,
            Flow: new_dam_flow,
        });
    }
}
function RandomValue_Ph() {
    var rv_ph = Math.floor(Math.random() * 1000) + 500;
    return rv_ph;
}
function RandomValue_Level() {
    var rv_level = Math.floor(Math.random() * 10000) + 5000;
    return rv_level;
}
function RandomValue_Temperature() {
    var rv_temperature = Math.floor(Math.random() * 30) - 30;
    return rv_temperature;
}
function RandomValue_Flow() {
    var rv_flow = Math.floor(Math.random() * 500) + 100;
    return rv_flow;
}
