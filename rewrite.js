// "comster404", "brunofin",


//pretty sure all user stories from FCC are working
//im going to leave this like this now, come back and refactor 

var bUrl = "https://wind-bow.gomix.me/twitch-api";

//first check if users are streaming
//then do the new ajax calls on just those

var users = ["nikolarntv", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "potsuraze", "Macie_Jay"];

users.forEach(function(user){
  $.ajax({
    url: bUrl+"/streams/"+user,
    success: function(sData){
      // console.log(sData);
      if(sData.stream !== null){
        // console.log(user +" is Streaming!!!!!!!!!!!");
        //do another ajax for this users
        $.ajax({
          url: bUrl+"/users/"+user,
          success: function(uData){
            // console.log(uData);

            var bio;
            if(uData.bio == null){
              var bio = "Sorry, User has no BIO!";
            }else{
              var bio = uData.bio;
            }

            $('#prePop').append(`<div id='${uData.name}' class='media'><div class='media-left'><a href='#'><img class='media-object' src='${uData.logo}'></a></div><div class='media-body'><h3 class='media-heading'>${uData.name}</h3><p>${bio}</p><p>Currently Streaming: <em>${sData.stream.game}</em></p><a href='https://www.twitch.tv/${user}' class="btn btn-info">More</a></div></div>`);
          }
        });
      }else{
        return;
      }
    }
  });
});


//search functions
//this is where you can check if the user deleted account
//or if it ever existed

$('#searchForm').on('submit', function(e){
  e.preventDefault();
  var search = $('#searchUser').val();

  $.ajax({
    url: bUrl+"/channels/"+search,
    success: function(srData){
      // console.log(srData);
      if(srData.error){
        alert(srData.error);
      }else{
        $('#results').append(`<div id='${srData.name}' class='media'><div class='media-left'><a href='#'><img class='media-object' src='${srData.logo}'></a></div><div class='media-body'><h3 class='media-heading'>${srData.name}</h3><p>${srData.status}</p><p id='streamYN'></p><a href='https://www.twitch.tv/${srData.name}' class="btn btn-info">More</a></div></div>`);


        $.ajax({
          url: bUrl+"/streams/"+srData.name,
          success: function(ckData){
            if(ckData.stream == null){
              $('#streamYN').text(srData.name+ " is not streaming.");
            }else{
              console.log(srData);
              $('#streamYN').text(srData.game);
            }
          }
        });

      }
    }
  });

});
