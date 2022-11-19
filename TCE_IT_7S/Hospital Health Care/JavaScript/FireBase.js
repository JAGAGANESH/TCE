const firebaseConfig = {
    apiKey: "AIzaSyChZ_1EMGHkBTiTXdBMfujp-ex1EfS-iT4",
    authDomain: "nt-hhc.firebaseapp.com",
    databaseURL: "https://nt-hhc-default-rtdb.firebaseio.com",
    projectId: "nt-hhc",
    storageBucket: "nt-hhc.appspot.com",
    messagingSenderId: "613111205605",
    appId: "1:613111205605:web:b67107e0fad7965097ce0c",
    measurementId: "G-608SMW6015"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function signIn(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password).then((success) => {
        var uid = firebase.auth().currentUser.uid;
        if(uid=="OcvLGYAxeLhXrdjKHY9Sykj0E073") {
            window.location.href = "HospitalDashboard.html?aid="+uid;
        }
        else {
            window.location.href = "DoctorDashboard.html?did="+uid;
        }
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
	        alert(errorMessage);
        });
}
function RegisterDoctor() {
    var name = document.getElementById("d_name").value;
    var age = document.getElementById("d_age").value;
    var blood = document.getElementById("d_bg").value;
    var mobile = document.getElementById("d_mobile").value;
    var aadhar = document.getElementById("d_aadhar").value;
    var dept = document.getElementById("d_dept").value;
    var exper = document.getElementById("d_exper").value;
    var educ = document.getElementById("d_educ").value;
    var email = document.getElementById("d_email").value;
    var password = document.getElementById("d_password").value;
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
                Blood: blood,
                Mobile: mobile,
                Aadhar: aadhar,
                Department: dept,
                Experiance: exper,
                Education: educ,
                Email: email,
                Password: password,
            }
            firebaseRef.child("HHC Users/Doctors/"+uid).set(userData);
	})
    .then((then) => {
        var update_dc;
        firebase.database().ref('HHC Users/Counts/').once('value').then(function (snapshot) {
            update_dc = snapshot.val().DoctorsCount+1;
        })
        .then((then) => {
            firebase.database().ref().child("HHC Users/Counts/").update({
                DoctorsCount: update_dc,
            })
            .then((then) => {
                alert("Doctor registerd Succesfully!");
                firebase.auth().signOut().then((value) => {
                    window.location.reload();
                })
            })
        })
    })
    .catch((error) => {
      	var errorCode = error.code;
      	var errorMessage = error.message;
      	alert(errorMessage);
    });
}
function RegisterPatient() {
    var name = document.getElementById("p_name").value;
    var age = document.getElementById("p_age").value;
    var blood = document.getElementById("p_bg").value;
    var gender = document.getElementById("p_gender").value;
    var height = document.getElementById("p_height").value;
    var weight = document.getElementById("p_weight").value;
    var mobile = document.getElementById("p_mobile").value;
    var address = document.getElementById("p_address").value;
    var email = document.getElementById("p_email").value;
    var PatientId;
    firebase.database().ref('HHC Users/Counts/').once('value').then(function (snapshot) {
        var count = snapshot.val().PatientCount;
        PatientId = "P00"+(count+1);
    })
    .then((then) => {
        firebase.database().ref().child("HHC Users/Patients/"+PatientId).set({
            Name: name,
            Age: age,
            Blood: blood,
            Gender: gender,
            Height: height,
            Weight: weight,
            Mobile: mobile,
            Address: address,
            Email: email,
            PatientId: PatientId,
        })
        .then((then) => {
            window.location.href = "PatientRegistration.html?pid="+PatientId;
        })
    });
}
function RegisterPatientTreatment() {
    var problem = document.getElementById("p_problem").value;
    var treatment = document.getElementById("p_treat").value;
    var date = document.getElementById("p_date").value;
    var ward = document.getElementById("p_ward").value;
    var bed = document.getElementById("p_bed").value;
    var atype = document.getElementById("p_atype").value;
    var illness = document.getElementById("p_illness").value;
    var stay = document.getElementById("p_stay").value;

    var urlQueryString = window.location.search;
    var urlParams = new URLSearchParams(urlQueryString);
    var PatientId = urlParams.get("pid");
    var PatientAdmissionNumber = PatientId+"-A";

    firebase.database().ref('HHC Users/Counts/').once('value').then(function (snapshot) {
        var count = snapshot.val().PatientAdmissionCount;
        PatientAdmissionNumber += count+1;
    })
    .then((then) => {
        firebase.database().ref().child("HHC Users/Patients/"+PatientId+"/Treatments/"+PatientAdmissionNumber).set({
            Problem: problem,
            Treatment: treatment,
            AdmissionDate: date,
            WardType: ward,
            AdmissionType: atype,
            SeverityOfIllness: illness,
            Stay: stay,
        })
        .then((then) => {
            var update_pc;
            var update_ac;
            firebase.database().ref('HHC Users/Counts/').once('value').then(function (snapshot) {
                update_pc = snapshot.val().PatientCount+1;
                update_ac = snapshot.val().PatientAdmissionCount+1;
            })
            .then((then) => {
                firebase.database().ref().child("HHC Users/Counts/").update({
                    PatientCount: update_pc,
                    PatientAdmissionCount: update_ac,
                })
                .then((then) => {
                    alert("Patient registerd Succesfully!");
                    window.location.href = "Registration.html";
                })
            })
        })
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

function getDoctorData() {
    var urlQueryString = window.location.search;
    var urlParams = new URLSearchParams(urlQueryString);
    var DoctorUID = urlParams.get("did");
    // var DoctorUID = firebase.auth().currentUser.uid;
    firebase.database().ref('HHC Users/Doctors/'+DoctorUID).once('value').then(function (snapshot) {
        var name = snapshot.val().Name;
        var age = snapshot.val().Age;
        var blood =snapshot.val().Blood;
        var mobile = snapshot.val().Mobile;
        var aadhar = snapshot.val().Aadhar;
        var email =snapshot.val().Email;
        var dept = snapshot.val().Department;
        var educ = snapshot.val().Education;
        var exper =snapshot.val().Experiance;
        document.getElementById("D_Name").innerHTML = name;
        document.getElementById("D_Age").innerHTML = age +" Years";
        document.getElementById("D_Bg").innerHTML = blood + " Positive";
        document.getElementById("D_Mobile").innerHTML = mobile;
        document.getElementById("D_Mail").innerHTML = email;
        document.getElementById("D_Aadhar").innerHTML = aadhar;
        document.getElementById("D_Dept").innerHTML = dept;
        document.getElementById("D_Education").innerHTML = educ;
        document.getElementById("D_Experiance").innerHTML = exper;
    });
}

function getCurrentPatients() {
    var ref = firebase.database().ref('HHC Users/Patients/');
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(snapshot1) {
            var name = snapshot1.val().Name;
            var id = snapshot1.val().PatientId;
            var adate ="20.12.2021";
            var ddate = "10.01.2022";
            var table = '<tr class="row100 body"><td class="cell100 column1">'+name+'</td><td class="cell100 column2">'+id+'</td><td class="cell100 column3">'+adate+'</td><td class="cell100 column4">'+ddate+'</td><td class="cell100 column5"><a href="PatientDashboard.html?pid='+id+'">Show</a></td></tr>';
            document.getElementById("CurrentUsers").innerHTML += table;
        });
    }, 
    function (error) {
        console.log("Error: " + error.code);
    });
}

function getPatientData() {
    var urlQueryString = window.location.search;
    var urlParams = new URLSearchParams(urlQueryString);
    var PatientUID = urlParams.get("pid");
    // var DoctorUID = firebase.auth().currentUser.uid;
    firebase.database().ref('HHC Users/Patients/'+PatientUID).once('value').then(function (snapshot) {
        var name = snapshot.val().Name;
        var age = snapshot.val().Age;
        var blood =snapshot.val().Blood;
        var gender = snapshot.val().Mobile;
        var height = snapshot.val().Height;
        var weight =snapshot.val().Weight;
        var id = snapshot.val().PatientId;
        var mobile = snapshot.val().Mobile;
        var address =snapshot.val().Address;
        document.getElementById("p_name").innerHTML = name;
        document.getElementById("p_age").innerHTML = age +" Years";
        document.getElementById("p_blood").innerHTML = blood + " Positive";
        document.getElementById("p_gender").innerHTML = gender;
        document.getElementById("p_height").innerHTML = height + " cm";
        document.getElementById("p_weight").innerHTML = weight + " kg";
        document.getElementById("p_id").innerHTML = id;
        document.getElementById("p_mobile").innerHTML = mobile;
        document.getElementById("p_address").innerHTML = address;
    });
}

function getPatientTreatment() {
    var urlQueryString = window.location.search;
    var urlParams = new URLSearchParams(urlQueryString);
    var PatientUID = urlParams.get("pid");

    var ref = firebase.database().ref('HHC Users/Patients/'+PatientUID+'/Treatments/');
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(snapshot1) {
            var AdmissionNo = "001";
            var bed = "001";
            var adate = snapshot1.val().AdmissionDate;
            var ddate = "10.01.2022";
            document.getElementById("CurrentUsers").innerHTML += table;
        });
    }, 
    function (error) {
        console.log("Error: " + error.code);
    });

}