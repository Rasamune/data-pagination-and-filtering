/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// ----------------
// Global Variables
const listContainer = document.querySelector('ul.student-list');
const studentPerPage = 9;
const studentList = data;

// ---------------------
// Show Page of Students (max: 9)
function showPage(list, page) {
   // Get start index value by multiplying the page number by studentPerPage
   // & then subtracting the number of studentPerPage
   const startIndex = (page * studentPerPage) - studentPerPage;
   const endIndex = page * studentPerPage;
   for (let i = 0; i < studentList.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const student = list[i];
         createStudentCard(student);
      }
   }
}

// ---------------------------
// Create Student Display Card
function createStudentCard (student) {
   const name = student.name;
   const email = student.email;
   const registered = student.registered;
   const picture = student.picture;
   const card = document.createElement('li');
   card.classList.add('student-item', 'cf');
   const html= `
      <div class="student-details">
      <img class="avatar" src="${picture.large}" alt="Profile Picture">
      <h3>${name.first} ${name.last}</h3>
      <span class="email">${email}</span>
      </div>
      <div class="joined-details">
      <span class="date">Joined ${registered.date}</span>
      </div>
   `;
   card.innerHTML = html;
   listContainer.appendChild(card);
}
showPage(studentList, 1);

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
