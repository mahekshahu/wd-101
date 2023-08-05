let userForm = document.getElementById("user-form");
const retriveEntries = () =>{
	let entries = localStorage.getItem("show-entry");
	if(entries){
		entries = JSON.parse(entries);
	} else{
		entries = [];
	}
	return entries;
}
let userEntries = retriveEntries();
const displayEntries = () => {
	const entries = retriveEntries();



	const tableEntries = entries.map((entry) => {
		const nameCell = `<td>${entry.name}</td>`;
		const emailCell = `<td>${entry.email}</td>`;
		const passwordCell = `<td>${entry.password}</td>`;
		const dobCell = `<td>${entry.dob}</td>`;
		const TandCCell = `<td>${entry.TandC}</td>`;
		const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${TandCCell} </tr>`;
		return row;
	}).join("\n");
	const table = `<table border="2px"><tr> <th>name</th> <th>Email</th> <th>Password</th> <th>dob</th> <th>accepted terms?</th> </tr> ${tableEntries} </table>`;
	let details = document.getElementById("show-entry");
	details.innerHTML = table;
	}
const saveUserForm = (event) => {
	event.preventDefault();
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("pass").value;
	const dob = document.getElementById("dob").value;
	const TandC = document.getElementById("ac").checked;
	const age = calculateAge(new Date(dob));
	console.log(name)
	console.log(email)
	console.log(password)
	console.log(dob)
	if (age >= 18 && age <= 55) {
		const entry = {
			name,
			email,
			password,
			dob,
			TandC
		};
		userEntries.push(entry);
		localStorage.setItem("show-entry", JSON.stringify(userEntries));
		displayEntries();
	} else {
		alert("Sorry, you must be between 18 and 55 years old to register.");
	}
};

const calculateAge = (birthday) => {
	const ageDifferenceMs = Date.now() - birthday.getTime();
	const ageDate = new Date(ageDifferenceMs);
	return Math.abs(ageDate.getUTCFullYear() - 1970);
};


    
userForm.addEventListener("submit",saveUserForm);
displayEntries()