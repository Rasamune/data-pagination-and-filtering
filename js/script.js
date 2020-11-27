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

// -------------------------
// Create Pagination Buttons
function addPagination(list) {
   const totalPages = Math.ceil(list.length / studentPerPage);
   const linkList = document.querySelector('ul.link-list');
   linkList.innerHTML = ''; // Empty Previous Pagination
   for (let i = 0; i < totalPages; i++) {
      const html = `
         <li>
            <button type="button">${i + 1}</button>
         </li>
      `;
      linkList.innerHTML += html;
   }
   linkList.querySelector('li > button').className = 'active';

   // Check for Button Clicks
   linkList.addEventListener('click', (e) => {
      const button = e.target;
      const pageNumber = button.textContent;
      if (button.tagName === "BUTTON") {
         // Remove 'active' class from all buttons
         for(let i = 0; i < linkList.children.length; i++) {
            linkList.children[i].firstElementChild.classList = '';
         }
         // Set the clicked button to 'active'
         button.className = "active";
         showPage(list, pageNumber);
      }
   });
}

// Call functions
showPage(studentList, 1);
addPagination(studentList);