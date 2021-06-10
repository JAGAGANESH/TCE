function Change10Seconds() {
    setInterval(RandomValues_ChangeValues(), 10000);
}

function RandomValues_ChangeValues() {
    var old_dam_ph = dam_data[i].Data.Ph;
    var old_dam_level = dam_data[i].Data.Level; 
    var old_dam_temperature = dam_data[i].Data.Temperature;
    var old_dam_flow = dam_data[i].Data.Flow;
    var new_dam_ph = 100;
    var new_dam_level = 100;
    var new_dam_temperature = 100;
    var new_dam_flow = 100;
    old_dam_ph = new_dam_ph;
    old_dam_level = new_dam_level;
    old_dam_temperature = new_dam_temperature;
    old_dam_flow = new_dam_flow;
    setInterval(RandomValues_ChangeValues, 10000);
}
