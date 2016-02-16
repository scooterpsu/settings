var settings = [];

var settingsToLoad = [['pName', 'Player.Name'], ['renderWeapon', 'Player.RenderWeapon'], ['armorHelmet', 'Player.Armor.Helmet'], ['armorChest', 'Player.Armor.Chest'], ['armorShoulders', 'Player.Armor.Shoulders'], ['armorArms', 'Player.Armor.Arms'], ['armorLegs', 'Player.Armor.Legs '], ['colorsPrimary', 'Player.Colors.Primary'], ['colorsSecondary', 'Player.Colors.Secondary'], ['colorsVisor', 'Player.Colors.Visor'], ['colorsLights', 'Player.Colors.Lights'], ['colorsHolo', 'Player.Colors.Holo'],['sName', 'Server.Name'],['sCountdown', 'Server.Countdown'], ['sMaxPlayers', 'Server.MaxPlayers'],['sShouldAnnounce', 'Server.ShouldAnnounce'],['sSprintEnabled', 'Server.SprintEnabled'], ['sUnlimitedSprint', 'Server.UnlimitedSprint'], ['sDualWieldEnabled', 'Server.DualWieldEnabled'], ['sAssassinationEnabled', 'Server.AssassinationEnabled'], ['cCenteredCrosshair' , 'Camera.Crosshair'], ['cFOV', 'Camera.FOV'], ['cHideHUD', 'Camera.HideHUD'], ['cSpeed', 'Camera.Speed'],['inputRaw','Input.RawInput'], ['voipPTT', 'VoIP.PushToTalk'], ['voipVolMod', 'VoIP.VolumeModifier'], ['voipAGC', 'VoIP.AGC'], ['voipEchoCancel', 'VoIP.EchoCancellation'], ['voipVAL', 'VoIP.VoiceActivationLevel'], ['voipServerEnable', 'VoIP.ServerEnabled'], ['voipEnabled', 'VoIP.Enabled'], ['gfxSaturation', 'Graphics.Saturation'], ['gfxBloom', 'Graphics.Bloom'], ['sPass', 'Server.Password']];
var loadedSettings = false;

$(document).ready(function() {
    fixResolution();
    setInterval( CheckPageFocus, 200 );
    $('#chest').append($("#helmet > option").clone());
    $('#shoulders').append($("#helmet > option").clone());
    $('#arms').append($("#helmet > option").clone());
    $('#legs').append($("#helmet > option").clone());
});

function fixResolution() {
    zoomRatio = screen.width/1920;
    $('body').css("zoom", zoomRatio);  
}

function CheckPageFocus() {
  //var info = document.getElementById("message");

  if ( document.hasFocus() ) {
    pageFocus = true;
  } else {
    pageFocus = false;
  }
}

function connectionTrigger() {
    console.log("connected");
    loadSettings(0);
}

function loadSettings(i) {
	if (i != settingsToLoad.length) {
		dewRcon.send(settingsToLoad[i][1], function(ret) {
            if(settingsToLoad[i][1].startsWith("Player.Colors")){
                $("input[name='"+settingsToLoad[i][0]+"']").val(ret.substring(1, ret.length));  
                $("input[name='"+settingsToLoad[i][0]+"']").css("background-color",ret);                   
            } else {
                if ($("input[name='"+settingsToLoad[i][0]+"']").is(':checkbox')){
                    if (ret == "1"){
                        $("input[name='"+settingsToLoad[i][0]+"']").prop('checked', true);
                    }                
                }else{
                    $("input[name='"+settingsToLoad[i][0]+"']").val(ret);
                }
                $("select[name='"+settingsToLoad[i][0]+"']").val(ret);
            }
			i++;
			loadSettings(i);
		});
	} else {
		loadedSettings = true;
	}
}

function updateSetting(thing, value){
    if(thing.startsWith("colors")){
        value = "#" + value;
    }
    if ($("input[name='"+thing+"']").is(':checkbox')){
        if ($("input[name='"+thing+"']").is(':checked')){
            value = "1";
        } else {
            value = "0";
        }
    }
    console.log(thing + ": " + value);
    if (value.length < 1){
        value = "\"\"";
    }
    dewRcon.send(settingsToLoad[arrayInArray(thing, settingsToLoad)][1] + " " + value);
    dewRcon.send("writeconfig");
}

function arrayInArray(needle, haystack) {
    for(i=0; i<haystack.length; i++) {
        if (haystack[i].indexOf(needle) > -1){
            return i
        }
    }
}

function closeBrowser() {
	if(dewRconConnected) {
		setTimeout(function() {
			dewRcon.send('menu.show');
			dewRcon.send('Game.SetMenuEnabled 0');
		}, "1000");
	} else{
		window.close();
	}
}


String.prototype.startsWith = function(needle)
{
    return(this.indexOf(needle) == 0);
};