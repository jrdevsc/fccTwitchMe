var bUrl = "https://wind-bow.gomix.me/twitch-api";

//premade list from fcc
var users = ["nikolarntv", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "potsuraze", "Macie_Jay"];
users.forEach(function(user){
  $.ajax({
    url: bUrl +"/users/"+user,
    success: function(data){
      var bio;

      if(data.bio == null){
        bio = "User has no Bio!"
      }else{
        bio = data.bio;
      }
      $('#prePop').append(`<div id='${data.name}' class='media'><div class='media-left'><a href='#'><img class='media-object' src='${data.logo}'></a></div><div class='media-body'><h3 class='media-heading'>${data.name}</h3>${bio}</div></div>`);
    }
  });
});



function chkStream(user){
  $.ajax({
    url: bUrl+"/streams/"+user,
    success: function (sData){
      // console.log(sData);


      var myUser = `#${user}`;
      // console.log(myUser);
      if(sData.stream !== null){
        console.log(user +" is streaming");
        $(`#${user}`).append("yay Streaming");
      }else{
        console.log(user +" is not streaming");
        $(myUser).addClass('hidden');
      }
      // if(sData.stream == null){
      //   // var myUser = `#${user}`;
      //   $(myUser).addClass('hidden');
      //   console.log("not streaming: "+ myUser);
      // }else{
      //   console.log(myUser);
      //   $(myUser).addClass('stream');
      // }
    }
  });
};
// var myUser = users.forEach(function(user){
//   //since this is a pre made list, it is going to serve as the info for the initial load
//
//   //make ajax call for users array
//   $.ajax({
//     url: bUrl+"/users/"+user,
//     success: function(data){
//       //populate some shit on the dom
//       $('#prePop').append(`<div id='${data.name}' class='media notstreaming'><div class='media-left'><a href='#'><img class='media-object' src='${data.logo}'></a></div><div class='media-body'><h3 class='media-heading'>${data.name}</h3>${data.bio}</div></div>`);
//       //call function
//       chkStreaming(user);
//     }
//   });
// });
//
// function chkStreaming(user){
//   $.ajax({
//     url: bUrl+'/streams/'+user,
//     success: function(sData){
//
//
//       if(sData.stream !== null){
//         // console.log(user + " is streaming");
//         isStreaming(user);
//       }else{
//       // console.log(user +" is not streaming");
//       notStreaming(user);
//     }
//
//
//     }
//   });
// }
//
// function isStreaming(user){
//   // $(`#${user}`).removeClass('notStreaming');
//   $(`#${user} h3`).removeClass('notstreaming');
//   $(`#${user} h3`).addClass('stream');
// };
//
// function notStreaming(user){
//   console.log(user +" not Streaming");
// };
