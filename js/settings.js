var settingsToLoad = [['pName', 'Player.Name'], ['renderWeapon', 'Player.RenderWeapon'], ['armorHelmet', 'Player.Armor.Helmet'], ['armorChest', 'Player.Armor.Chest'], ['armorShoulders', 'Player.Armor.Shoulders'], ['armorArms', 'Player.Armor.Arms'], ['armorLegs', 'Player.Armor.Legs '], ['colorsPrimary', 'Player.Colors.Primary'], ['colorsSecondary', 'Player.Colors.Secondary'], ['colorsVisor', 'Player.Colors.Visor'], ['colorsLights', 'Player.Colors.Lights'], ['colorsHolo', 'Player.Colors.Holo'],['sName', 'Server.Name'],['sCountdown', 'Server.Countdown'], ['sMaxPlayers', 'Server.MaxPlayers'],['sShouldAnnounce', 'Server.ShouldAnnounce'],['sSprintEnabled', 'Server.SprintEnabled'], ['sUnlimitedSprint', 'Server.UnlimitedSprint'], ['sDualWieldEnabled', 'Server.DualWieldEnabled'], ['sAssassinationEnabled', 'Server.AssassinationEnabled'], ['cCenteredCrosshair' , 'Camera.Crosshair'], ['cFOV', 'Camera.FOV'], ['cHideHUD', 'Camera.HideHUD'], ['cSpeed', 'Camera.Speed'],['inputRaw','Input.RawInput'], ['voipPTT', 'VoIP.PushToTalk'], ['voipVolMod', 'VoIP.VolumeModifier'], ['voipAGC', 'VoIP.AGC'], ['voipEchoCancel', 'VoIP.EchoCancellation'], ['voipVAL', 'VoIP.VoiceActivationLevel'], ['voipServerEnable', 'VoIP.ServerEnabled'], ['voipEnabled', 'VoIP.Enabled'], ['gfxSaturation', 'Graphics.Saturation'], ['gfxBloom', 'Graphics.Bloom'], ['sPass', 'Server.Password']];

var loadedSettings = false;

var binds = ["Sprint", "Jump", "Crouch", "Use", "DualWield", "Fire", "FireLeft", "Reload", "ReloadLeft", "Zoom", "SwitchWeapons", "Melee", "Grenade", "SwitchGrenades", "VehicleAccelerate", "VehicleBrake", "VehicleBoost", "VehicleRaise", "VehicleDive", "VehicleFire", "VehicleAltFire", "BansheeBomb", "Menu", "Scoreboard", "ForgeDelete", "Chat", "TeamChat"];

var buttons = ["","A","B","X","Y","RB","LB","LT","RT","Start","Back","LS","RS","Left","Right","Up","Down"];

var controllerPresets = [
    ["Halo Online Default","LS,A,X,RB,LB,RT,LT,RB,LB,RS,Y,B,LT,Right,,,LT,A,X,RT,LT,B,Start,Back,Y,,"],
    ["Halo 3 Default","X,A,LS,RB,LB,RT,LT,RB,LB,RS,Y,B,LT,LB,,,LT,A,LS,RT,LT,B,Start,Back,Y,,"],
    ["Halo 3 Southpaw","X,A,LS,RB,LB,LT,RT,RB,LB,RS,Y,B,RT,LB,,,RT,A,LS,LT,RT,B,Start,Back,Y,,"],
    ["Halo 3 Boxer","X,A,LS,RB,LB,RT,LT,RB,LB,RS,Y,LT,B,LB,,,LT,A,LS,RT,LT,B,Start,Back,Y,,"],
    ["Halo 3 Green Thumb","X,A,LS,RB,LB,RT,LT,RB,LB,B,Y,RS,LT,LB,,,LT,A,LS,RT,LT,B,Start,Back,Y,,"],
    ["Halo 3 Bumper Jumper","X,LB,LS,B,A,RT,LT,B,A,RS,Y,RB,LT,A,,,LT,A,LS,RT,LT,B,Start,Back,Y,,"],
    ["Halo 3 Walkie Talkie","Up,A,LS,B,X,RT,LT,B,X,RS,Y,RB,LT,A,,,LT,A,LS,RT,LT,B,Start,Back,Y,,LB"],
    ["Halo Reach Default","LB,A,LS,X,LB,RT,LT,X,LB,RS,Y,RB,LT,B,,,LT,A,LS,RT,LT,B,Start,Back,Y,Down,Up"],
    ["Halo Reach Green Thumb","LB,A,LS,X,LB,RT,LT,X,LB,RB,Y,RS,LT,B,,,LT,A,LS,RT,LT,B,Start,Back,Y,Down,Up"],
    ["Halo Reach Boxer","LB,A,LS,X,LB,RT,LT,X,LB,RS,Y,LT,RB,B,,,LT,A,LS,RT,LT,B,Start,Back,Y,Down,Up"],
    ["Halo Reach Bumper Jumper","X,LB,LS,B,LB,RT,LT,B,LB,RS,Y,RB,LT,A,,,LT,LB,LS,RT,LT,RB,Start,Back,Y,Down,Up"],
    ["Halo Reach Recon","LB,A,LS,RB,LB,RT,LT,RB,LB,RS,Y,B,LT,X,,,LT,A,LS,RT,LT,B,Start,Back,Y,Down,Up"],
    ["Halo Reach Southpaw","RB,A,LS,X,RB,LT,RT,X,RB,RS,Y,LB,RT,B,,,RT,A,LS,LT,RT,B,Start,Back,Y,Down,Up"],
    ["Halo 5 Boxer","B,A,LS,X,LB,RT,LT,X,LB,RS,Y,LT,RB,Right,,,LT,A,LS,RT,LT,B,Start,Back,Y,,"]
];


$(document).ready(function() {
    fixResolution();
    setArmorList("helmet");
    setArmorList("chest");
    setArmorList("shoulders");
    setArmorList("arms");
    setArmorList("legs");
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
        updateBindLabels();
    });    
    setButtonLists();
    setPresetOptions();
    setRenderWeapons();
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


function applyBindString(bindString){
    var bindArray = new Array(bindString.split(','));
    for (i = 0; i < bindArray[0].length; i++) { 
        $("select[id='"+binds[i]+"']").val(bindArray[0][i]);
        updateBinding(binds[i], bindArray[0][i]);
    }
    updateBindLabels();
}

function updateBinding(action, bind){
	if(dewRconConnected) {
        if (bind){
            bind = "\"" + bind + "\"";
        }
        if (bind == "Back"){
            bind = "Select";
        }
        dewRcon.send("Input.ControllerAction \"" + action + "\" " + bind, function(res){
            if (res != "Command/Variable not found") {
                dewRcon.send("writeconfig");
            }
        });
    }
}

function updateBindLabels(){
    $('#controllerGraphic').children('div').empty();
    for (i = 0; i < binds.length; i++) { 
        var bind = document.getElementById(binds[i]).value;
        var action = binds[i];
        if(document.getElementById(bind)){
            var actionString = action;
            if(document.getElementById(bind).innerHTML.length > 0){
                actionString = ", " + action;
            }
            $("#" + bind).append(actionString);
        }
    }
}

var controllerShown = false;
function showController(){
    if (!controllerShown){
        $("#controllerSettings").css("display", "block");
        controllerShown = true;
    } else {
        $("#controllerSettings").css("display", "none");
        controllerShown = false;
    }
}

var extendedShown = false;
function showExtended(){
    if (!extendedShown){
        $("#extendedControls").css("display", "block");
        $("#expandCollapse").css("bottom", "-230px");
        $("#expandCollapse").html("Less");        
        extendedShown = true;
    } else {
        $("#extendedControls").css("display", "none");
        $("#expandCollapse").css("bottom", "-10px");
        $("#expandCollapse").html("More");  
        extendedShown = false;
    }
}

function setPresetOptions(){
    var sel = document.getElementById('presetMenu');
    for(var i = 0; i < controllerPresets.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = controllerPresets[i][0];
        opt.value = controllerPresets[i][1];
        sel.appendChild(opt);
    }
}

function setButtonLists(){
    for(var i = 0; i < binds.length; i++) {
        var sel = document.getElementById(binds[i]);
        for(var x = 0; x < buttons.length; x++) {
            var opt = document.createElement('option');
            opt.innerHTML = buttons[x];
            opt.value = buttons[x];
            sel.appendChild(opt);
        }
    }
}

function setRenderWeapons(){
    var sel = document.getElementById('renderWeapon');
    for(var i = 0; i < renderWeapons.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = renderWeapons[i][1];
        opt.value = renderWeapons[i][0];
        sel.appendChild(opt);
    }
}

function setArmorList(id){
    var sel = document.getElementById(id);
    for(var i = 0; i < armorList.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = armorList[i][1];
        opt.value = armorList[i][0];
        sel.appendChild(opt);
    }
}

var renderWeapons = [["assault_rifle","Assault Rifle"],["ar_variant_2","DMG Assault Rifle"],["ar_variant_3","ROF Assault Rifle"],["ar_variant_5","ACC Assault Rifle"],["ar_variant_6","PWR Assault Rifle"],["battle_rifle","Battle Rifle"],["br_variant_1","ROF Battle Rifle"],["br_variant_2","ACC Battle Rifle"],["br_variant_3","MAG Battle Rifle"],["br_variant_4","DMG Battle Rifle"],["br_variant_5","RNG Battle Rifle"],["br_variant_6","PWR Battle Rifle"],["covenant_carbine","Covenant Carbine"],["covenant_carbine_variant_1","MAG Covenant Carbine"],["covenant_carbine_variant_2","DMG Covenant Carbine"],["covenant_carbine_variant_3","ACC Covenant Carbine"],["covenant_carbine_variant_4","ROF Covenant Carbine"],["covenant_carbine_variant_5","RNG Covenant Carbine"],["covenant_carbine_variant_6","PWR Covenant Carbine"],["dmr","DMR"],["dmr_variant_1","MAG DMR"],["dmr_variant_2","ACC DMR"],["dmr_variant_3","ROF DMR"],["dmr_variant_4","DMG DMR"],["dmr_variant_5","RNG DMR"],["dmr_variant_6","PWR DMR"],["plasma_rifle","Plasma Rifle"],["plasma_rifle_variant_6","PWR Plasma Rifle"],["smg","SMG"],["smg_variant_1","ROF SMG"],["smg_variant_2","ACC SMG"],["smg_variant_4","DMG SMG"],["smg_variant_6","PWR SMG"]];

var armorList = [["air_assault","Air Assault"],["ballista","Ballista"],["chameleon","Chameleon"],["cyclops","Cyclops"],["demo","Demo"],["dutch","Dutch"],["gladiator","Gladiator"],["gungnir","Gungnir"],["halberd","Halberd"],["hammerhead","Hammerhead"],["hoplite","Hoplite"],["juggernaut","Juggernaut"],["mac","Mac"],["mercenary","Mercenary"],["nihard","Nihard"],["omni","Omni"],["oracle","Oracle"],["orbital","Orbital"],["renegade","Renegade"],["scanner","Scanner"],["shark","Shark"],["silverback","Silverback"],["spectrum","Spectrum"],["stealth","Stealth"],["strider","Strider"],["widow_maker","Widow Maker"]];