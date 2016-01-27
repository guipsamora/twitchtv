var channels = ["freecodecamp","esl_sc2","terakilobyte","habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","brunofin","comster404","ogamingsc2"];

var channelInfos = [];

var on = [];
var off = [];
var non_exist = [];

var info = {name: "", status: ""};

function success(){
      // function that calls the API
      for (var i = 0; i < channels.length; i++) {
            var info = {};
            //API call that gives me the infos about the channels, such as images, url and so on
            $.ajax({
              url: "https://api.twitch.tv/kraken/channels/" + channels[i],
              data: "json",
              dataType: 'jsonp',
              type: 'GET',
              headers: { 'Api-User-Agent': 'Example/1.0' },
              success: function(channel) {
                info.name = channel.name
                // if(channel.name )
                  // $("#flex-container").append("<div class=\"flex-item\"></div></a>");
               // console.log(channel)
               // logo = channel.logo
               // nome posso puxar da array lá de cima
               // link = channel.url
               // nome do jogo = channel.game
               // programa = channel.status
               console.log(info.name)

              }
            });
            // API call that tells me if the channels is online, offline or doesn't existe at all
            $.ajax({
              url: "https://api.twitch.tv/kraken/streams/" + channels[i],
              data: "json",
              dataType: 'jsonp',
              type: 'GET',
              headers: { 'Api-User-Agent': 'Example/1.0' },
              success: function(channel) {
                  var channelName;
                  if (channel["status"] === 422){
                        var myRegex = /'(.*?)'/g
                        var message = channel["message"]
                        channelName = myRegex.exec(message);
                        non_exist.push(channelName[1]);
                        info.status = "Account Closed"
                        // $("#flex-container").append("<div class=\"flex-item closed \"></div></a>");
                        // $(".closed").append("<p class=\"extract\">Account Closed</p>");
                 } else if (channel["stream"] == null) {
                        channelName = channel["_links"].channel.split("/").pop();
                        off.push(channelName);
                        info.status = "Off"
                        // $("#flex-container").append("<div class=\"flex-item offline \"></div>");
                        // $(".offline").append("<p class=\"extract\">" + channelName + "</p>");
                  } else if ( channel["stream"] != null ) {
                        channelName = channel["_links"].channel.split("/").pop();
                        on.push(channelName)
                        info.status = "On"
                        // $("#flex-container").append("<div class=\"flex-item resultbox online \"></div></a>");
                        // $(".online").append("<p class=\"extract\">" + channelName + "</p>");
                  }
               // console.log(info.status)
              }
            });

            
         // $("#flex-container").append("<a target=\"_blank\" href=\" data.streams[i].channel.url \"\"><div class=\"flex-item resultbox" + i + "\"></div></a>");
         // $(".resultbox" + i + "").append("<p class=\"extract\">" + on[i] + "</p>");
         console.log(info);
          // channelInfos.push(info);
          // console.log(channelInfos);
      }

      // for (var i = 0; i < channels.length; i++) {
      //    $("#flex-container").append("<a target=\"_blank\" href=\" data.streams[i].channel.url \"\"><div class=\"flex-item resultbox" + i + "\"></div></a>");
      //    $(".resultbox" + i + "").append("<p class=\"extract\">" + on[i] + "</p>");
      // }


}


$(document).ready(function(){
   success();
    console.log(channelInfos);
 
});   