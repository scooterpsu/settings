var loadedSettings = false;
var settingsToLoad = [['pName', 'Player.Name'], ['renderWeapon', 'Player.RenderWeapon'], ['armorHelmet', 'Player.Armor.Helmet'], ['armorChest', 'Player.Armor.Chest'], ['armorShoulders', 'Player.Armor.Shoulders'], ['armorArms', 'Player.Armor.Arms'], ['armorLegs', 'Player.Armor.Legs '], ['colorsPrimary', 'Player.Colors.Primary'], ['colorsSecondary', 'Player.Colors.Secondary'], ['colorsVisor', 'Player.Colors.Visor'], ['colorsLights', 'Player.Colors.Lights'], ['colorsHolo', 'Player.Colors.Holo'],['sName', 'Server.Name'],['sCountdown', 'Server.Countdown'], ['sMaxPlayers', 'Server.MaxPlayers'],['sShouldAnnounce', 'Server.ShouldAnnounce'],['sSprintEnabled', 'Server.SprintEnabled'], ['sUnlimitedSprint', 'Server.UnlimitedSprint'], ['sDualWieldEnabled', 'Server.DualWieldEnabled'], ['sAssassinationEnabled', 'Server.AssassinationEnabled'], ['cCenteredCrosshair' , 'Camera.Crosshair'], ['cFOV', 'Camera.FOV'], ['cHideHUD', 'Camera.HideHUD'], ['cSpeed', 'Camera.Speed'],['inputRaw','Input.RawInput'], ['voipPTT', 'VoIP.PushToTalk'], ['voipVolMod', 'VoIP.VolumeModifier'], ['voipAGC', 'VoIP.AGC'], ['voipEchoCancel', 'VoIP.EchoCancellation'], ['voipVAL', 'VoIP.VoiceActivationLevel'], ['voipServerEnable', 'VoIP.ServerEnabled'], ['voipEnabled', 'VoIP.Enabled'], ['gfxSaturation', 'Graphics.Saturation'], ['gfxBloom', 'Graphics.Bloom'], ['sPass', 'Server.Password']];
var binds = ["Sprint", "Jump", "Crouch", "Use", "DualWield", "Fire", "FireLeft", "Reload", "ReloadLeft", "Zoom", "SwitchWeapons", "Melee", "Grenade", "SwitchGrenades", "VehicleAccelerate", "VehicleBrake", "VehicleBoost", "VehicleRaise", "VehicleDive", "VehicleFire", "VehicleAltFire", "BansheeBomb", "Menu", "Scoreboard", "ForgeDelete", "Chat", "TeamChat"];
var buttons = ["","A","B","X","Y","RB","LB","LT","RT","Start","Back","LS","RS","Left","Right","Up","Down"];
var renderWeapons = [
	["Assault Rifle","assault_rifle"],
	["DMG Assault Rifle","ar_variant_2"],
	["ROF Assault Rifle","ar_variant_3"],
	["ACC Assault Rifle","ar_variant_5"],
	["PWR Assault Rifle","ar_variant_6"],
	["Battle Rifle","battle_rifle"],
	["ROF Battle Rifle","br_variant_1"],
	["ACC Battle Rifle","br_variant_2"],
	["MAG Battle Rifle","br_variant_3"],
	["DMG Battle Rifle","br_variant_4"],
	["RNG Battle Rifle","br_variant_5"],
	["PWR Battle Rifle","br_variant_6"],
	["Covenant Carbine","covenant_carbine"],
	["MAG Covenant Carbine","covenant_carbine_variant_1"],
	["DMG Covenant Carbine","covenant_carbine_variant_2"],
	["ACC Covenant Carbine","covenant_carbine_variant_3"],
	["ROF Covenant Carbine","covenant_carbine_variant_4"],
	["RNG Covenant Carbine","covenant_carbine_variant_5"],
	["PWR Covenant Carbine","covenant_carbine_variant_6"],
	["DMR","dmr"],
	["MAG DMR","dmr_variant_1"],
	["ACC DMR","dmr_variant_2"],
	["ROF DMR","dmr_variant_3"],
	["DMG DMR","dmr_variant_4"],
	["RNG DMR","dmr_variant_5"],
	["PWR DMR","dmr_variant_6"],
	["Plasma Rifle","plasma_rifle"],
	["PWR Plasma Rifle","plasma_rifle_variant_6"],
	["SMG","smg"],
	["ROF SMG","smg_variant_1"],
	["ACC SMG","smg_variant_2"],
	["DMG SMG","smg_variant_4"],
	["PWR SMG","smg_variant_6"]
];
var armorList = [
	["Air Assault","air_assault"],
	["Ballista","ballista"],
	["Chameleon","chameleon"],
	["Cyclops","cyclops"],
	["Demo","demo"],
	["Dutch","dutch"],
	["Gladiator","gladiator"],
	["Gungnir","gungnir"],
	["Halberd","halberd"],
	["Hammerhead","hammerhead"],
	["Hoplite","hoplite"],
	["Juggernaut","juggernaut"],
	["Mac","mac"],
	["Mercenary","mercenary"],
	["Nihard","nihard"],
	["Omni","omni"],
	["Oracle","oracle"],
	["Orbital","orbital"],
	["Renegade","renegade"],
	["Scanner","scanner"],
	["Shark","shark"],
	["Silverback","silverback"],
	["Spectrum","spectrum"],
	["Stealth","stealth"],
	["Strider","strider"],
	["Widow Maker","widow_maker"]
];
var controllerPresets = [
    ["Halo Online Default","LS,A,X,RB,LB,RT,LT,RB,LB,RS,Y,B,LT,Right,,,LT,A,X,RT,LT,B,Start,Back,Y,,"],
    ["Halo 3 Default","X,A,LS,RB,LB,RT,LT,RB,LB,RS,Y,B,LT,LB,,,LT,A,LS,RT,LT,B,Start,Back,Y,,"],
    ["Halo 3 Southpaw","X,A,LS,RB,LB,LT,RT,RB,LB,RS,Y,B,RT,LB,,,RT,A,LS,LT,RT,B,Start,Back,Y,,"],
    ["Halo 3 Boxer","X,A,LS,RB,LB,RT,LT,RB,LB,RS,Y,LT,B,LB,,,LT,A,LS,RT,LT,B,Start,Back,Y,,"],
    ["Halo 3 Green Thumb","X,A,LS,RB,LB,RT,LT,RB,LB,B,Y,RS,LT,LB,,,LT,A,LS,RT,LT,B,Start,Back,Y,,"],
    ["Halo 3 Bumper Jumper","X,LB,LS,B,A,RT,LT,B,A,RS,Y,RB,LT,A,,,LT,LB,LS,RT,LT,B,Start,Back,Y,,"],
    ["Halo 3 Walkie Talkie","Up,A,LS,B,X,RT,LT,B,X,RS,Y,RB,LT,A,,,LT,A,LS,RT,LT,B,Start,Back,Y,,LB"],
    ["Halo Reach Default","LB,A,LS,X,LB,RT,LT,X,LB,RS,Y,RB,LT,B,,,LT,A,LS,RT,LT,B,Start,Back,Y,Down,Up"],
    ["Halo Reach Southpaw","RB,A,LS,X,RB,LT,RT,X,RB,RS,Y,LB,RT,B,,,RT,A,LS,LT,RT,B,Start,Back,Y,Down,Up"],
    ["Halo Reach Boxer","LB,A,LS,X,LB,RT,LT,X,LB,RS,Y,LT,RB,B,,,LT,A,LS,RT,LT,B,Start,Back,Y,Down,Up"],
    ["Halo Reach Green Thumb","LB,A,LS,X,LB,RT,LT,X,LB,RB,Y,RS,LT,B,,,LT,A,LS,RT,LT,B,Start,Back,Y,Down,Up"],
    ["Halo Reach Bumper Jumper","X,LB,LS,B,LB,RT,LT,B,LB,RS,Y,RB,LT,A,,,LT,LB,LS,RT,LT,RB,Start,Back,Y,Down,Up"],
    ["Halo Reach Recon","LB,A,LS,RB,LB,RT,LT,RB,LB,RS,Y,B,LT,X,,,LT,A,LS,RT,LT,B,Start,Back,Y,Down,Up"],
    ["Halo 4 Default","LS,A,B,X,LB,RT,LT,X,LB,RS,Y,RB,LT,Right,,,LT,A,B,RT,LT,RB,Start,Back,Y,,"],
    ["Halo 4 Southpaw","LS,A,B,X,RB,LT,RT,X,RB,RS,Y,LB,RT,Right,,,RT,A,B,LT,RT,LB,Start,Back,Y,,"],
    ["Halo 4 Boxer","B,A,LS,X,LB,RT,LT,X,LB,RS,Y,LT,RB,Right,,,LT,A,LS,RT,LT,B,Start,Back,Y,,"],
    ["Halo 4 Green Thumb","LS,A,B,X,LB,RT,LT,X,LB,RB,Y,RS,LT,Right,,,LT,A,B,RT,LT,RB,Start,Back,Y,,"],
    ["Halo 4 Bumper Jumper","A,LB,LS,B,X,RT,LT,B,X,RS,Y,RB,LT,Right,,,LT,LB,LS,RT,LT,RB,Start,Back,Y,,"],
    ["Halo 4 Recon","X,A,LS,RB,LB,RT,LT,RB,LB,RS,Y,B,LT,Right,,,LT,A,LS,RT,LT,B,Start,Back,Y,,"],
    ["Halo 4 Fishstick","LS,A,B,X,LB,RT,LT,X,LB,LT,Y,RS,RB,Right,,,LT,A,B,RT,LT,RS,Start,Back,Y,,"]
];

$(document).ready(function() {
    if(window.location.href.indexOf("#") == -1) {
       window.location.replace("#playerSettings");
    }
    fixResolution();
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
    $('#settingsWindow input[type=range]').on('input', function(){
        updateSetting(this.name, this.value);
    });
    $('#controllerSettings select[id!=\"presetMenu\"]').on('change', function(){
        updateBinding(this.id, this.value);
        updateBindLabels();
    });    
    $('#advanced input, #advanced select').on('change input', function(){
        console.log(this.id, this.value);
    }); 
    setButtonLists();
	setOptionList('presetMenu', controllerPresets);
	setOptionList('renderWeapon', renderWeapons);
	setOptionList('helmet', armorList);
	setOptionList('chest', armorList);
	setOptionList('shoulders', armorList);
	setOptionList('arms', armorList);
	setOptionList('legs', armorList);
    $('.wheelable').on('mousewheel', function(e) {
        if(e.originalEvent.wheelDelta > 0){
            var nextElement = $('#'+this.id+' > option:selected').prev('option');
            if (nextElement.length > 0) {
                $('#'+this.id+'  > option:selected').removeAttr('selected').prev('option').attr('selected', 'selected');
                updateSetting(this.name, this.value);
            }
        }else{
            var nextElement = $('#'+this.id+'  > option:selected').next('option');
            if (nextElement.length > 0) {
                $('#'+this.id+'  > option:selected').removeAttr('selected').next('option').attr('selected', 'selected');
                updateSetting(this.name, this.value);
            }
        }
    });
});

function fixResolution() {
    zoomRatio = screen.width/1920;
    $('#settingsWindow').css("zoom", zoomRatio);  
    $('#controllerSettings').css("zoom", zoomRatio); 
}

function connectionTrigger() {
    loadSettings(0);
}

function disconnectTrigger() {
}

function loadSettings(i) {
	if (i != settingsToLoad.length) {
		dewRcon.send(settingsToLoad[i][1], function(ret) {
            if(settingsToLoad[i][1].startsWith("Player.Colors")){
                $("input[name='"+settingsToLoad[i][0]+"']").css("background-color",ret);   
                if(getLuminance(ret)> 0.22){
                    $("input[name='"+settingsToLoad[i][0]+"']").css("color","#222");
                }else{
                    $("input[name='"+settingsToLoad[i][0]+"']").css("color","#ddd");
                }
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

function updateSetting(setting, value){
    if ($("input[name='"+setting+"']").is(':checkbox')){
        if ($("input[name='"+setting+"']").is(':checked')){
            value = "1";
        } else {
            value = "0";
        }
    }
    if (value.length < 1){
        value = "\"\"";
    }
    dewRcon.send(settingsToLoad[arrayInArray(setting, settingsToLoad)][1] + " " + value, function(res){
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
        if (bind == "Back") { bind = "Select"; }
		if (bind) { bind = "\"" + bind + "\""; }
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
        $("#expandCollapse").css("bottom", "-271px");     
        extendedShown = true;
    } else {
        $("#extendedControls").css("display", "none");
        $("#expandCollapse").css("bottom", "-10px");
        extendedShown = false;
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

function setOptionList(ElementID, ArrayVar){
    var sel = document.getElementById(ElementID);
    for(var i = 0; i < ArrayVar.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = ArrayVar[i][0];
        opt.value = ArrayVar[i][1];
        sel.appendChild(opt);
    }
}

function getLuminance(hex) {
    var converted = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var div = 255,
        RGB = [parseInt(converted[1], 16)/div, parseInt(converted[2], 16)/div, parseInt(converted[3], 16)/div],
        luminance = {r: 0.2126, g: 0.7152, b: 0.0722};
    for (var i = RGB.length; i--; ) {
        RGB[i] = RGB[i] <= 0.03928 ? RGB[i] / 12.92 : Math.pow(((RGB[i] + 0.055) / 1.055), 2.4);
    }
    return ((luminance.r * RGB[0]) + (luminance.g * RGB[1]) + (luminance.b * RGB[2]));
}