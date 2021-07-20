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
  firebase.initializeApp(firebaseConfig)
  document.getElementById("h3user_name").innerHTML = "Welcome "+localStorage.getItem("user_name")+"!";
function addroom(){
  room_name = document.getElementById("room_name").value;
  localStorage.setItem("room_name",room_name);
  firebase.database().ref("/").child(room_name).update({
    mediator:"use the chatroom wisely"
  });
  window.location = "kwitter_message.html"
}
/*
function getdata(){
  firebase.database().ref("/").on("value",function(snapshot){
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot) { 
      childKey  = childSnapshot.key;
      Room_names = childKey;
      console.log("Room name - "+Room_names);
      row = "<div class='room_name' id='"+ Room_names + " onclick='redirectToRoomName(this.id)'>" + "#" + Room_names+"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });
}
*/

function getData() { 
  // on function for reading from database
  // set function for writing
  // The forEach() method calls a function once for each element in an array, in order.
  // ("/") = Root Folder
  // database events : when the value changes = 'value'
// snapshot is an array that holds the current values of the database
  firebase.database().ref("/").on('value', function(snapshot) {
      document.getElementById("output").innerHTML = ""; 
      
      snapshot.forEach(function(childSnapshot) { 
      childKey  = childSnapshot.key; // key represents the key of the snapshot array
      Room_names = childKey; // childkey holds all the roomnames/mainfolders
       // room_names is an array
       console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id = " + Room_names + " onclick='redirectToRoomName(this.id)' >" + "#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}




getdata();

function redirectToRoomName(name1){
  console.log(name1);
  localStorage.setItem("room_name",name1)
  window.location = "kwitter_message.html"
}
function logout(){
  localStorage.removeItem("user_name")
  localStorage.removeItem("room_name")
  window.location = "index.html"
}

  