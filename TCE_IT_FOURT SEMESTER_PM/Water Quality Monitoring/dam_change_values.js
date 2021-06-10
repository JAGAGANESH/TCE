function RepeatChangeFunction(DamNumber) {
    setInterval(ChangeValues(DamNumber), 10000);
}

function ChangeValues(DamNumber) {
    var new_dam_ph = RandomValue_Ph();
    var new_dam_level = RandomValue_Level();
    var new_dam_temperature = RandomValue_Temperature();
    var new_dam_flow = RandomValue_Flow();
    dam_data[DamNumber].Data.Ph = new_dam_ph;
    dam_data[DamNumber].Data.Level = new_dam_level;
    dam_data[DamNumber].Data.Temperature = new_dam_temperature;
    dam_data[DamNumber].Data.Flow = new_dam_flow;
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
