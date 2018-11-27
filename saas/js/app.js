// !IMPORTANT: REPLACE WITH YOUR OWN CONFIG OBJECT BELOW


// Initialize Firebase
var config = {
	apiKey: "AIzaSyC1h2N9EIFoBVNtwXvA1KerhA_f6GERnK8",
	authDomain: "form-53675.firebaseapp.com",
	databaseURL: "https://form-53675.firebaseio.com",
	projectId: "form-53675",
	storageBucket: "form-53675.appspot.com",
	messagingSenderId: "640769241106"
};



firebase.initializeApp(config);

// Firebase Database Reference and the child
const dbRef = firebase.database().ref();
const usersRef = dbRef.child('users');


readUserData();


// --------------------------
// READ
// --------------------------


function readUserData() {
	var userDataRef = firebase.database().ref("users").orderByKey();
	var table = document.querySelector('#showtable tbody');
	userDataRef.once("value").then(function (snapshot) {

		snapshot.forEach(function (childSnapshot) {

			
			var key = childSnapshot.key;
			var childData = childSnapshot.val();

			var cit_val = childSnapshot.val().CitizenID;
			var date_val = childSnapshot.val().Date;
			var name_val = childSnapshot.val().Name;
			var dad_val = childSnapshot.val().Dad;
			var birth_val = childSnapshot.val().BirthDate;
			var ethnic_val = childSnapshot.val().EthnicGroup;
			var rel_val = childSnapshot.val().Religion;
			var blood_val = childSnapshot.val().BloodType;
			var height_val = childSnapshot.val().Height;
			var id_val = childSnapshot.val().IDCODE;
			var job_val = childSnapshot.val().JOB;
			var add_val = childSnapshot.val().Address;
			var mob_val = childSnapshot.val().Mobile;
			var email_val = childSnapshot.val().Email;

			$("#showtable").append("<tr><td>"+cit_val+"</td><td>"
				+date_val+"</td><td>"+name_val+"</td><td>"+dad_val+
				"</td><td>"+birth_val+"</td><td>"+ethnic_val+"</td><td>"
				+rel_val+"</td><td>"+blood_val+"</td><td>"+height_val+"</td><td>"+id_val+"</td><td>"+job_val+"</td><td>"+add_val+"</td><td>"+
				mob_val+"</td><td>"+email_val+"</td></tr>");





		});

		
	});





}



function userClicked(e) {


	var userID = e.target.getAttribute("user-key");

	const userRef = dbRef.child('users/' + userID);
	const userDetailUI = document.getElementById("user-detail");

	userRef.on("value", snap => {

		userDetailUI.innerHTML = ""

		snap.forEach(childSnap => {
			var $p = document.createElement("p");
			$p.innerHTML = childSnap.key + " - " + childSnap.val();
			userDetailUI.append($p);
		})

	});


}





// --------------------------
// ADD
// --------------------------

const addUserBtnUI = document.getElementById("add-user-btn");
addUserBtnUI.addEventListener("click", addUserBtnClicked)



function addUserBtnClicked() {

	const usersRef = dbRef.child('users');

	const addUserInputsUI = document.getElementsByClassName("single-input");

	// this object will hold the new user information
	let newUser = {};

	// loop through View to get the data for the model 
	for (let i = 0, len = addUserInputsUI.length; i < len; i++) {

		let key = addUserInputsUI[i].getAttribute('data-key');
		let value = addUserInputsUI[i].value;
		newUser[key] = value;
	}

	usersRef.push(newUser)


	console.log(myPro)



}


// --------------------------
// DELETE
// --------------------------
function deleteButtonClicked(e) {

	e.stopPropagation();

	var userID = e.target.getAttribute("userid");

	const userRef = dbRef.child('users/' + userID);

	userRef.remove();

}


// --------------------------
// EDIT
// --------------------------
function editButtonClicked(e) {

	document.getElementById('edit-user-module').style.display = "block";

	//set user id to the hidden input field
	document.querySelector(".edit-userid").value = e.target.getAttribute("userid");

	const userRef = dbRef.child('users/' + e.target.getAttribute("userid"));

	// set data to the user field
	const editUserInputsUI = document.querySelectorAll(".edit-user-input");


	userRef.on("value", snap => {

		for (var i = 0, len = editUserInputsUI.length; i < len; i++) {

			var key = editUserInputsUI[i].getAttribute("data-key");
			editUserInputsUI[i].value = snap.val()[key];
		}

	});




	const saveBtn = document.querySelector("#edit-user-btn");
	saveBtn.addEventListener("click", saveUserBtnClicked)
}


function saveUserBtnClicked(e) {

	const userID = document.querySelector(".edit-userid").value;
	const userRef = dbRef.child('users/' + userID);

	var editedUserObject = {}

	const editUserInputsUI = document.querySelectorAll(".edit-user-input");

	editUserInputsUI.forEach(function (textField) {
		let key = textField.getAttribute("data-key");
		let value = textField.value;
		editedUserObject[textField.getAttribute("data-key")] = textField.value
	});



	userRef.update(editedUserObject);

	document.getElementById('edit-user-module').style.display = "none";


}