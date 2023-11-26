const coursesArray = [
  { name: 'JAVA 1', tutor: "T.Ibrahim", prerequisite: null },
  { name: 'JAVA 2', tutor: "T.Sara", prerequisite: "java1" },
  { name: 'HTML 1', tutor: "T.Jack", prerequisite: null },
  { name: 'HTML 2', tutor: "T.Lina", prerequisite: "HTML 1" },
  { name: 'SQL', tutor: "T.Kumar", prerequisite: null },
  { name: 'Swift', tutor: "T.Sophia", prerequisite: "JAVA 2" },
  { name: 'CSS', tutor: "T.Emma", prerequisite: "HTML 2" },
  { name: 'JavaScript 1', tutor: "T.Henry", prerequisite: "JAVA 2" },
  { name: 'JavaScript 2', tutor: "T.Henry", prerequisite: "JavaScript 1" },

];




function func() {
    var boo = true;
    var str = "";
    var input = document.getElementById("myform");

    // Bringing values
    var fname = input.fname.value.trim();
    var birthday = input.birthday.value;
    var gender = input.gender.value.trim();
    var phone = input.phone.value.trim();
    var email = input.email.value.trim();
 const fileInput = input.myfile.value;
 
let lastBackslashIndex = fileInput.lastIndexOf('\\');
let image = fileInput.substring(lastBackslashIndex + 1);
image=image.trim();

    // Validating
    if (fname === "") {
        boo = false;
        str += "The name field is empty\n";
    } else if (fname.match(/^\d/)) {
        boo = false;
        str += "The name starts with a number.. change it please\n";
    }

    if (birthday === "") {
        boo = false;
        str += "The birthday field is empty\n";
    } else if (birthday.match(/^(201[7-9]|202[0-3])-\d{2}-\d{2}$/)) {
        boo = false;
        str += "The children younger than 6 years old can not take courses\n";
    }

    if (gender === "") {
        boo = false;
        str += "The gender field is empty\n";
    }

    if (phone === "") {
        boo = false;
        str += "The phone field is empty\n";
    } else if (!phone.match(/^\d{10}/)) {
        boo = false;
        str += "The phone number should consist of 10 numbers.. change it please\n";
    }

    if (email === "") {
        boo = false;
        str += "The email field is empty\n";
    }

    if (!boo) {
        alert(str);
    } else {
		const existingNames = localStorage.getItem('Names') ? localStorage.getItem('Names').split(',') : [];
        existingNames.push(fname);
        localStorage.setItem("Names", existingNames.join(','));
		
        var printPage = "<div style=\"border: 2px solid black; padding: 10px;\"><img src='" + image + "' alt=\"Child Photo\" style=\"width: 200px; height: auto;\"><p>Child Name: " + fname + "</p><p>DOB: " + birthday + "</p><p>Gender: " + gender + "</p><p>Phone: " + phone + "</p><p>Email: " + email + "</p></div>";

        var printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Child Information</title></head><body>');
        printWindow.document.write(printPage);
        printWindow.document.write('</body></html>');

setTimeout(function() {
    printWindow.print();
}, 1000);
    }
}

function toChildrenList(){
	
	 const namesString = localStorage.getItem('Names');

    // If the string exists and is not empty split it into an array
    if (namesString && namesString !== '') {
        const namesArray = namesString.split(',');

        // Add each name as an option in the select element
        const kidSelect = document.getElementById('kid');
        namesArray.forEach(function(name) {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            kidSelect.appendChild(option);
        });
    }
	
	
	
}

function toChildrenListDB(){

	const DBKidsList = document.getElementById('DBKidsList');
	 const namesString = localStorage.getItem('Names');
	 
    if (namesString && namesString !== '') {
        const namesArray = namesString.split(',');
        namesArray.forEach(function(name) {
             kiddy = document.createElement('li');
            kiddy.textContent = name;
            DBKidsList.appendChild(kiddy);
	});}
	
	else{
		             kiddy = document.createElement('li');
            kiddy.textContent = "Lina";
		            DBKidsList.appendChild(kiddy);
 kiddy2 = document.createElement('li');
            kiddy2.textContent = "Ruba";
		            DBKidsList.appendChild(kiddy2);
	}
	
}

function populateFilterOptions() {
  const prerequisitesSelect = document.getElementById('prerequisites');
  const tutorsSelect = document.getElementById('currentTutor');
  const uniquePrerequisites = new Set();
  const uniqueTutors = new Set();
 
 
 
 //add the label
	  const option = document.createElement('option');
    option.value = "current-Tutor";
    option.textContent = "current-Tutor";
    tutorsSelect.appendChild(option);
	
	  const option1 = document.createElement('option');
    option1.value = "choose-prerequisite";
    option1.textContent = "choose-prerequisite";
    prerequisitesSelect.appendChild(option1);





  // Loop through coursesArray to collect unique tutors and prerequisites
  coursesArray.forEach(course => {
    if (course.prerequisite) {
      uniquePrerequisites.add(course.prerequisite);
    }
    uniqueTutors.add(course.tutor);
  });

  // Populate the course based on select
	
  uniquePrerequisites.forEach(prerequisite => {
    const option = document.createElement('option');
    option.value = prerequisite;
    option.textContent = prerequisite;
    prerequisitesSelect.appendChild(option);
  });

  // Populate the  tutor select

  uniqueTutors.forEach(tutor => {
    const option = document.createElement('option');
    option.value = tutor;
    option.textContent = tutor;
    tutorsSelect.appendChild(option);
  });
}




function filterCourses() {
  const filterPrerequisites = document.getElementById('prerequisites');
  const filterCurrentTutor = document.getElementById('currentTutor');
  const coursesList = document.getElementsByClassName('course');

  const prerequisitesValue = filterPrerequisites.value;
  const currentTutorValue = filterCurrentTutor.value;

  for (let i = 0; i < coursesList.length; i++) {
    const course = coursesList[i];
    const coursePrerequisites = course.getAttribute('data-prerequisite');
    const courseTutor = course.getAttribute('data-tutor');

    const prerequisitesMatch = prerequisitesValue === 'choose-prerequisite' || coursePrerequisites === prerequisitesValue;
    const tutorMatch = currentTutorValue === 'current-Tutor' || courseTutor === currentTutorValue;

    if (prerequisitesMatch && tutorMatch) {
      course.style.display = 'block';
    } else {
      course.style.display = 'none';
    }
  }
}

