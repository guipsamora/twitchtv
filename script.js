var channels = ["freecodecamp","esl_sc2","terakilobyte","habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","brunofin","comster404","ogamingsc2"];

var channelInfos = [];

function callApi(){ // function that calls the API

    channels.forEach(function(channels){
      var info = {}; //stores data from each channel
      // first API call, gives data about the channel, such as game, img, url
      $.getJSON('https://api.twitch.tv/kraken/channels/' + channels +'?callback=?', function(channel) {

          if (channel["status"] === 422){
            var myRegex = /'(.*?)'/g
            var message = channel["message"]
            channelName = myRegex.exec(message);
            info.name = channelName[1];
          } else {
            info.name = channel.name;
            info.url = channel.url;
            info.img = channel.logo;
            info.game = channel.game;
          }
          // seconde API call, gives data if the channel is live or not or if it doesn't exist at all
          $.getJSON('https://api.twitch.tv/kraken/streams/' + channels +'?callback=?', function(channel) {
                  if (channel["status"] === 422){
                        var myRegex = /'(.*?)'/g
                        var message = channel["message"]
                        channelName = myRegex.exec(message);
                        info.status = "Account Closed"
                 } else if (channel["stream"] === null) {
                        channelName = channel["_links"].channel.split("/").pop();
                        info.status = "Off"
                  } else if ( channel["stream"] !== null ) {
                        channelName = channel["_links"].channel.split("/").pop();
                        info.status = "On"
                  }
                  channelInfos.push(info);
                  console.log(channelInfos)
          });
      });
    })

}

// 
// function populateHTML(){

//         // for (var i = 0; i < channels.length; i++) {
//       //    $("#flex-container").append("<a target=\"_blank\" href=\" data.streams[i].channel.url \"\"><div class=\"flex-item resultbox" + i + "\"></div></a>");
//       //    $(".resultbox" + i + "").append("<p class=\"extract\">" + on[i] + "</p>");
//       // }

//       // $("#flex-container").append("<div class=\"flex-item resultbox online \"></div></a>");
//                         // $(".online").append("<p class=\"extract\">" + channelName + "</p>");

// }


$(document).ready(function(){
   callApi();


});