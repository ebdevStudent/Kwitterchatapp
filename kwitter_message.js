var firebaseConfig = {
    apiKey: "AIzaSyAdPOj6l6i6Xbn6PXrfLt-bZUOUbiAp2SI",
    authDomain: "kwitter-804ea.firebaseapp.com",
    databaseURL: "https://kwitter-804ea-default-rtdb.firebaseio.com",
    projectId: "kwitter-804ea",
    storageBucket: "kwitter-804ea.appspot.com",
    messagingSenderId: "683081054250",
    appId: "1:683081054250:web:e3bf3a58d7eca2f8112b53"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");
function send(){
    msg = document.getElementById("input_msg").value;
    firebase.database().ref(room_name).push({
        username:user_name,
        message:msg,
        likes:0
    });
    document.getElementById("input_msg").innerHTML = ""
}

function getData() { 
    firebase.database().ref("/"+room_name).on('value', function(snapshot) { 
    document.getElementById("output").innerHTML = ""; 
    snapshot.forEach(function(childSnapshot) { 
      childKey  = childSnapshot.key; 
      childData = childSnapshot.val(); 
      if(childKey != "mediator") 
      {
           firebase_message_id = childKey; 
           message_data = childData; 
          console.log(firebase_message_id);
          console.log(message_data);
          username = message_data ['username']
          message = message_data ['message']
          likes = message_data ['likes'] 
          name_message = '<h4>' + username + '<img class="user_tick" src="tick.png">' + '</h4>'
          like_message = '<h4 class="message_h4">' + message + '</h4>' 
          like_button = '<button class="btn btn-warning" id= '+firebase_message_id +' value=' +likes+' onclick="updateLike(this.id)">';
          span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like: "+ likes + "</span></button>" + "<hr>";
          row = name_message+like_message+like_button+span_with_tag;    
          document.getElementById("output").innerHTML += row





        } });  }); }
        getData();    
      function updateLike(message_id){
        console.log("clicked like button and msg id - "+message_id)
        old_likes = document.getElementById(message_id).value;
        updated_likes = Number(old_likes) + 1
        console.log(updated_likes)
        firebase.database().ref(room_name).child(message_id).update({
          likes : updated_likes
        });
      }





function logout(){
  localStorage.removeItem("user_name")
  localStorage.removeItem("room_name")
  window.location = "index.html"
}
