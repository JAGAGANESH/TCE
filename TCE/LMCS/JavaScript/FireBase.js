const firebaseConfig = {
    apiKey: "AIzaSyBLVCEasLo25ov0FyGE5j4dWdV6XjHw-5w",
    authDomain: "lmcs-1008e.firebaseapp.com",
    databaseURL: "https://lmcs-1008e-default-rtdb.firebaseio.com",
    projectId: "lmcs-1008e",
    storageBucket: "lmcs-1008e.appspot.com",
    messagingSenderId: "350917317884",
    appId: "1:350917317884:web:9a6d23a09cbfe68acbb379",
    measurementId: "G-WQT08QZ6LV"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function signUp(){
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var experiance = document.getElementById("exper").value;
    var skill = document.getElementById("skill").value;
    var mobile = document.getElementById("mobile").value;
    var aadhar = document.getElementById("aadhar").value;
    var work = document.getElementById("work").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
	.then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref();
            var userData = {
                Name: name,
                Age: age,
                Experiance: experiance,
                Skill: skill,
                Mobile: mobile,
                Aadhar: aadhar,
                Work: work,
                Email: email,
                Password: password,
            }
            firebaseRef.child("LMCS Users/Labours/"+uid).set(userData);
	})
    .then((then) => {
    	firebase.auth().signInWithEmailAndPassword(email, password).then((success) => {
        	var uid = firebase.auth().currentUser.uid;
		window.location.replace("LabourDashboard.html?uid="+uid);
	}).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
	    alert(errorMessage);
        });
    })
    .catch((error) => {
      	var errorCode = error.code;
      	var errorMessage = error.message;
      	alert(errorMessage);
    });
}

function signUpEngineer() {
    var name = document.getElementById("e_name").value;
    var age = document.getElementById("e_age").value;
    var email = document.getElementById("e_mail").value;
    var password = document.getElementById("e_password").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
	.then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref();
            var userData = {
                Name: name,
                Age: age,
                Email: email,
                Password: password,
            }
            firebaseRef.child("LMCS Users/Engineers/"+uid).set(userData);
	})
    .then((then) => {
    	firebase.auth().signInWithEmailAndPassword(email, password).then((success) => {
        	var uid = firebase.auth().currentUser.uid;
		window.location.replace("LabourLists.html?uid="+uid);
	}).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
	    alert(errorMessage);
        });
    })
    .catch((error) => {
      	var errorCode = error.code;
      	var errorMessage = error.message;
      	alert(errorMessage);
    });
}

function signIn(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password).then((success) => {
        var uid = firebase.auth().currentUser.uid;
        /*var user = 1;

        // var Labours = firebase.database().ref('LMCS Users/Labours/');
        var Engineers = firebase.database().ref('LMCS Users/Engineers/');
        // Labours.on("value", function(snapshot) {
        //     for(i in snapshot.val()) {
        //         if(uid==i) { user = 1; }
        //     }
        // }, function (error) { console.log("Error: " + error.code); });
        Engineers.on("value", function(snapshot) {
            for(i in snapshot.val()) {
                if(uid==i) { user = 2;break; }
            }
        }, function (error) { console.log("Error: " + error.code); });*/
	var user = LabourEngineer(uid);
        
        if(user=="Labour") { window.location.replace("LabourDashboard.html?uid="+uid); }
        else if(user=="Engineer") { window.location.replace("LabourLists.html"); }
        else { console.log(user); }
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
	        alert(errorMessage);
        });
}
function signOut(){
    firebase.auth().signOut().then((value) => {
        window.location.replace("Login.html");
    }).catch(function(error) {
	var errorMessage=error.message;
	alert(errorMesage);    
    });
}
function getData() {
    var urlQueryString = window.location.search;
    var urlParams = new URLSearchParams(urlQueryString);
    var userUID = urlParams.get("uid");
    // var userUID = firebase.auth().currentUser.uid;
    firebase.database().ref('LMCS Users/Labours/'+userUID).once('value').then(function (snapshot) {
        var aadhar = snapshot.val().Aadhar;
        var age = snapshot.val().Age;
        var email =snapshot.val().Email;
        var experiance = snapshot.val().Experiance;
        var mobile =snapshot.val().Mobile;
        var name =snapshot.val().Name;
        var skill = snapshot.val().Skill;
        var work = snapshot.val().Work;
        document.getElementById("LName").innerHTML=name;
        document.getElementById("LAge").innerHTML=age;
        document.getElementById("LMobile").innerHTML=mobile;
        document.getElementById("LAadhar").innerHTML=aadhar;
        document.getElementById("LMail").innerHTML=email;
        document.getElementById("LExperiance").innerHTML=experiance;
        document.getElementById("LWork").innerHTML=work;
        document.getElementById("LSkill").innerHTML=skill;
        document.getElementById("LExperiance").innerHTML=experiance;
    });
}

function getAllData() {
    var ref = firebase.database().ref('LMCS Users/Labours/');
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(snapshot1) {
            var aadhar = snapshot1.val().Aadhar;
            var age = snapshot1.val().Age;
            var email =snapshot1.val().Email;
            var experiance = snapshot1.val().Experiance;
            var mobile =snapshot1.val().Mobile;
            var name =snapshot1.val().Name;
            var skill = snapshot1.val().Skill;
            var work = snapshot1.val().Work;
            var card = "<article class='card'><a href='#"+aadhar+"'><div class='card-content'><h2>"+name+"</h2><hr><p>"+age+"</p><p><b>"+work+"</b></p></div></a></article>";
            var cardPopup = "<div id="+aadhar+" class='overlay'><div class='popup'><h2>"+name+"</h2><a class='close' href='#'>&times;</a><hr><div class='content'>Age : "+age+"</br>Experiance : "+experiance+"</br>Work : "+work+"</br>Mobile No : "+mobile+"</br></div><div class='Rating'>Rating : <span id='star1' class='fa fa-star'></span><span id='star2' class='fa fa-star'></span><span id='star3' class='fa fa-star'></span><span id='star4' class='fa fa-star'></span><span id='star5' class='fa fa-star'></span> (590)</div></div></div>";
            document.getElementById("LabourLists").innerHTML += card;
            document.getElementById("LabourLists").innerHTML += cardPopup;
        });
    }, 
    function (error) {
        console.log("Error: " + error.code);
    });

}

function LabourEngineer(uid) {
    var user;
    var Labours = firebase.database().ref('LMCS Users/Labours/');
    var Engineers = firebase.database().ref('LMCS Users/Engineers/');
    Labours.on("value", function(snapshot) {
        for(i in snapshot.val()) {
            if(uid==i) { user = "Labour" }
        }
    }, function (error) { console.log("Error: " + error.code); });
    Engineers.on("value", function(snapshot) {
        for(i in snapshot.val()) {
            if(uid==i) { user = "Engineer" }
        }
    }, function (error) { console.log("Error: " + error.code); });
    return user;
}

function timeFunction() {
    setTimeout(function(){ console.log("Loading..."); }, 5000);
}
