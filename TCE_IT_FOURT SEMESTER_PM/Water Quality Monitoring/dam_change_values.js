function RepeatChangeFunction(DamNumber) {    
    setInterval(ChangeValues_SendToDatabase(DamNumber), 10000);
}

function ChangeValues_SendToDatabase(DamNumber) {
    var dam_name = dam_data[DamNumber].Name;
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
    setInterval(ChangeValues_SendToDatabase, 10000);
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
