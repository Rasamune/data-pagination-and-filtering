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
   listContainer.innerHTML = ''; // Empty Previous List of Students
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const student = list[i];
         createStudentCard(student);
      }
   }
}

// ---------------------------
// Create Student Display Card
function createStudentCard (student) {
   const html= `
      <li class="student-item cf">
         <div class="student-details">
         <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
         <h3>${student.name.first} ${student.name.last}</h3>
         <span class="email">${student.email}</span>
         </div>
         <div class="joined-details">
         <span class="date">Joined ${student.registered.date}</span>
         </div>
      </li>
   `;
   listContainer.innerHTML += html;
}

// ------------------
// Pagination Buttons
function addPagination(list) {
   const totalPages = Math.ceil(list.length / studentPerPage);
   const paginationContainer = document.querySelector('ul.link-list');
   paginationContainer.innerHTML = ''; // Empty Previous Pagination
   for (let i = 0; i < totalPages; i++) {
      const html = `
         <li>
            <button type="button">${i}</button>
         </li>
      `;
      paginationContainer.innerHTML += html;
   }
}
addPagination(studentList);

// Call functions
showPage(studentList, 1);