/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// ----------------
// Global Variables
const listContainer = document.querySelector('ul.student-list');
const linkList = document.querySelector('ul.link-list');
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

// ----------------------------------------------------
// Remove Pagination Buttons & Display No Results Found
function removePagination() {
   linkList.innerHTML = ''; // Empty Previous Pagination
   listContainer.innerHTML = ''; // Empty Previous List of Students
   // Show "No results found..." message
   const html = `
      <h3 class="student-item">No results found...</h3>
   `;
   listContainer.innerHTML += html;
}

// ----------------------
// Create Search Function
function addSearch (list) {
   // Create Search Field
   const header = document.querySelector('header');
   const html = `
      <label for="search" class="student-search">
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `;
   header.insertAdjacentHTML('beforeend', html);

   // Perform Search
   let searchText = '';
   function performSearch (searchText, list) {
      searchText = document.querySelector('#search').value;
      let searchList = [];
      for (let i = 0; i < list.length; i++) {
         if (searchText !== '' && 
            list[i].name.first.toLowerCase().includes(searchText.toLowerCase()) || // if search matches first name
            list[i].name.last.toLowerCase().includes(searchText.toLowerCase())) { // or if search matches last name
               searchList.push(list[i]);
         } else if (searchText === '') {
            searchList = studentList;
         }
      }
      // Update Page
      showPage(searchList, 1);
      // If there are search results, show pagination
      if (searchList.length > 0) {
         addPagination(searchList);
      } else {
         // If no search results, remove pagination and display error message
         removePagination();
      }
   }

   // When a user types it automatically performs a search
   header.addEventListener('keyup', () => {
      performSearch(searchText, list);
   });
   // When a user clicks the Search Icon it performs a search
   header.addEventListener('click', (e) => {
      if (e.target.tagName === "BUTTON") {
         performSearch(searchText, list);
      }
   });
}
// Call functions
showPage(studentList, 1);
addPagination(studentList);
addSearch(studentList);