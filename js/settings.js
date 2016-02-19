var settingsToLoad = [['pName', 'Player.Name'], ['renderWeapon', 'Player.RenderWeapon'], ['armorHelmet', 'Player.Armor.Helmet'], ['armorChest', 'Player.Armor.Chest'], ['armorShoulders', 'Player.Armor.Shoulders'], ['armorArms', 'Player.Armor.Arms'], ['armorLegs', 'Player.Armor.Legs '], ['colorsPrimary', 'Player.Colors.Primary'], ['colorsSecondary', 'Player.Colors.Secondary'], ['colorsVisor', 'Player.Colors.Visor'], ['colorsLights', 'Player.Colors.Lights'], ['colorsHolo', 'Player.Colors.Holo'],['sName', 'Server.Name'],['sCountdown', 'Server.Countdown'], ['sMaxPlayers', 'Server.MaxPlayers'],['sShouldAnnounce', 'Server.ShouldAnnounce'],['sSprintEnabled', 'Server.SprintEnabled'], ['sUnlimitedSprint', 'Server.UnlimitedSprint'], ['sDualWieldEnabled', 'Server.DualWieldEnabled'], ['sAssassinationEnabled', 'Server.AssassinationEnabled'], ['cCenteredCrosshair' , 'Camera.Crosshair'], ['cFOV', 'Camera.FOV'], ['cHideHUD', 'Camera.HideHUD'], ['cSpeed', 'Camera.Speed'],['inputRaw','Input.RawInput'], ['voipPTT', 'VoIP.PushToTalk'], ['voipVolMod', 'VoIP.VolumeModifier'], ['voipAGC', 'VoIP.AGC'], ['voipEchoCancel', 'VoIP.EchoCancellation'], ['voipVAL', 'VoIP.VoiceActivationLevel'], ['voipServerEnable', 'VoIP.ServerEnabled'], ['voipEnabled', 'VoIP.Enabled'], ['gfxSaturation', 'Graphics.Saturation'], ['gfxBloom', 'Graphics.Bloom'], ['sPass', 'Server.Password']];

var loadedSettings = false;

var binds = ["Sprint", "Jump", "Crouch", "Use", "DualWield", "Fire", "FireLeft", "Reload", "ReloadLeft", "Zoom", "SwitchWeapons", "Melee", "Grenade", "SwitchGrenades", "VehicleAccelerate", "VehicleBrake", "VehicleBoost", "VehicleRaise", "VehicleDive", "VehicleFire", "VehicleAltFire", "BansheeBomb", "Menu", "Scoreboard", "ForgeDelete", "Chat", "TeamChat"];

$(document).ready(function() {
    fixResolution();
    $('#chest').append($("#helmet > option").clone());
    $('#shoulders').append($("#helmet > option").clone());
    $('#arms').append($("#helmet > option").clone());
    $('#legs').append($("#helmet > option").clone());
    $('.color').colorPicker({
        opacity: false,    
        renderCallback: function($elm, toggled) {
            var colors = this.color.colors;
            updateSetting($elm[0].name, '#'+colors.HEX);
        }
    });
    $('#settingsWindow input:not(input[type=color]), #settingsWindow select').on('change', function(){
        updateSetting(this.name, this.value);
    });
    $('#controllerSettings select[id!=\"presetMenu\"]').on('change', function(){
        updateBinding(this.id, this.value);
    });    
    $('#Melee').append($("#Jump > option").clone());
    $('#Reload').append($("#Jump > option").clone());
    $('#Use').append($("#Jump > option").clone());
    $('#SwitchWeapons').append($("#Jump > option").clone());
    $('#Crouch').append($("#Jump > option").clone());
    $('#Zoom').append($("#Jump > option").clone());
    $('#Fire').append($("#Jump > option").clone());
    $('#Grenade').append($("#Jump > option").clone());
    $('#SwitchGrenades').append($("#Jump > option").clone()); 
    $('#Sprint').append($("#Jump > option").clone());
    $('#Menu').append($("#Jump > option").clone());
    $('#Scoreboard').append($("#Jump > option").clone());
    $('#DualWield').append($("#Jump > option").clone());
    $('#FireLeft').append($("#Jump > option").clone());
    $('#ReloadLeft').append($("#Jump > option").clone());
    $('#VehicleAccelerate').append($("#Jump > option").clone());
    $('#VehicleBrake').append($("#Jump > option").clone());
    $('#VehicleBoost').append($("#Jump > option").clone());
    $('#VehicleRaise').append($("#Jump > option").clone());
    $('#VehicleDive').append($("#Jump > option").clone());
    $('#VehicleFire').append($("#Jump > option").clone()); 
    $('#VehicleAltFire').append($("#Jump > option").clone());
    $('#BansheeBomb').append($("#Jump > option").clone());
    $('#ForgeDelete').append($("#Jump > option").clone());
    $('#Chat').append($("#Jump > option").clone());
    $('#TeamChat').append($("#Jump > option").clone());
});

function fixResolution() {
    zoomRatio = screen.width/1920;
    $('#settingsWindow').css("zoom", zoomRatio);  
    $('#controllerSettings').css("zoom", zoomRatio); 
}

function connectionTrigger() {
    loadSettings(0);
    //applyPreset($( "#presetMenu" ).val());
}

function disconnectTrigger() {

}

function loadSettings(i) {
	if (i != settingsToLoad.length) {
		dewRcon.send(settingsToLoad[i][1], function(ret) {
            if(settingsToLoad[i][1].startsWith("Player.Colors")){
                $("input[name='"+settingsToLoad[i][0]+"']").css("background-color",ret);                   
            }             
            if ($("input[name='"+settingsToLoad[i][0]+"']").is(':checkbox')){
                if (ret == "1"){
                    $("input[name='"+settingsToLoad[i][0]+"']").prop('checked', true);
                }                
            }else{
                $("input[name='"+settingsToLoad[i][0]+"']").val(ret);
            }
            $("select[name='"+settingsToLoad[i][0]+"']").val(ret);
			i++;
			loadSettings(i);
		});
	} else {
		loadedSettings = true;
	}
}

function updateSetting(thing, value){
    if ($("input[name='"+thing+"']").is(':checkbox')){
        if ($("input[name='"+thing+"']").is(':checked')){
            value = "1";
        } else {
            value = "0";
        }
    }
    if (value.length < 1){
        value = "\"\"";
    }
    dewRcon.send(settingsToLoad[arrayInArray(thing, settingsToLoad)][1] + " " + value, function(res){
        if (res != "Command/Variable not found") {
            dewRcon.send("writeconfig");
        }
    });
}

function closeBrowser() {
	if(dewRconConnected) {
        dewRcon.send('Game.SetMenuEnabled 0');
	} else{
		window.close();
	}
}

function arrayInArray(needle, haystack) {
    for(i=0; i<haystack.length; i++) {
        if (haystack[i].indexOf(needle) > -1){
            return i
        }
    }
}

String.prototype.startsWith = function(needle){
    return(this.indexOf(needle) == 0);
};


function applyPreset(bindString){
    $('#controllerGraphic').children('div').empty();
    var bindArray = new Array(bindString.split(','));
    for (i = 0; i < bindArray[0].length; i++) { 
        if (bindArray[0][i].length > 0){
            $("select[id='"+binds[i]+"']").val(bindArray[0][i]);
            updateBinding(binds[i], bindArray[0][i]);
        }
    }
}

function updateBinding(thing, bind){
    if(document.getElementById(bind)){
        var thingThings = thing;
        if(document.getElementById(bind).innerHTML.length > 0){
            thingThings = ", " + thing;
        }
        $("#" + bind).append(thingThings);
    }
	if(dewRconConnected) {
        if (bind == "Back"){
            bind = "Select";
        }
        dewRcon.send("Input.ControllerAction \"" + thing + "\" \"" + bind + "\"", function(res){
            if (res != "Command/Variable not found") {
                dewRcon.send("writeconfig");
            }
        });
    }
}