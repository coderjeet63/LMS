
        // document.addEventListener('DOMContentLoaded', () => {

        //     // --- STATE ---
        //     let currentUserRole = null; // 'admin' or 'user'
        //     let currentMemberId = null; // e.g., 'M1001' - links login to member
        //     let today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        //     let todayPlus15 = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            
        //     // --- LOCALSTORAGE HELPERS ---
        //     const STORAGE_KEYS = {
        //         books: 'lms_books',
        //         members: 'lms_members',
        //         issued: 'lms_issued',
        //         theme: 'lms_theme'
        //     };

        //     // Mock data for initial seeding if localStorage is empty
        //     const mockBooksSeed = [
        //         { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', serial: 'B1001', category: 'Fiction', isAvailable: true, type: 'book' },
        //         { id: 2, title: '1984', author: 'George Orwell', serial: 'B1002', category: 'Fiction', isAvailable: true, type: 'book' },
        //         { id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', serial: 'B1003', category: 'Non-Fiction', isAvailable: false, type: 'book' },
        //         { id: 4, title: 'Inception', author: 'Christopher Nolan', serial: 'M1001', category: 'Movie', isAvailable: true, type: 'movie' },
        //         { id: 5, title: 'Atomic Habits', author: 'James Clear', serial: 'B1004', category: 'Self-Help', isAvailable: true, type: 'book' },
        //     ];
        //     const mockIssuedSeed = [
        //         { bookSerial: 'B1003', memberId: 'M1001', memberName: 'John Doe', issueDate: '2025-10-20', returnDate: '2025-11-04' } // Due today
        //     ];
        //     const mockMembersSeed = [
        //         { id: 'M1001', name: 'John Doe', email: 'john@example.com', phone: '1234567890', expiry: '2026-05-01' }
        //     ];

        //     /**
        //      * Gets data from localStorage or seeds it with mock data if empty.
        //      */
        //     function getFromStorage(key, mockData) {
        //         let data = localStorage.getItem(key);
        //         try {
        //             if (data) {
        //                 return JSON.parse(data);
        //             } else {
        //                 // If no data, seed localStorage with mock data
        //                 saveToStorage(key, mockData);
        //                 return mockData;
        //             }
        //         } catch (e) {
        //             console.error("Failed to parse localStorage data: ", e);
        //             return mockData; // Fallback
        //         }
        //     }

        //     /**
        //      * Saves data to localStorage.
        //      */
        //     function saveToStorage(key, data) {
        //         localStorage.setItem(key, JSON.stringify(data));
        //     }

        //     // Initialize local "databases" from localStorage
        //     let db_books = getFromStorage(STORAGE_KEYS.books, mockBooksSeed);
        //     let db_members = getFromStorage(STORAGE_KEYS.members, mockMembersSeed);
        //     let db_issued = getFromStorage(STORAGE_KEYS.issued, mockIssuedSeed);

        //     // This object will hold the details for the fine page
        //     let currentFineTransaction = {
        //         bookName: '',
        //         bookSerial: '', // CRITICAL: Added this to track which book to return
        //         memberName: '',
        //         calculatedFine: 0
        //     };

        //     // --- DOM ELEMENTS ---
        //     const mainNav = document.getElementById('main-nav');
        //     const navLinks = {
        //         dashboard: document.getElementById('nav-dashboard'),
        //         reports: document.getElementById('nav-reports'),
        //         transactions: document.getElementById('nav-transactions'),
        //         maintenance: document.getElementById('nav-maintenance'),
        //         logout: document.getElementById('nav-logout'),
        //     };
        //     const pages = document.querySelectorAll('.page-content');
            
        //     // --- UI HELPERS (TOAST & DARK MODE) ---

        //     const toastEl = document.getElementById('toast-notification');
        //     const toastMsg = document.getElementById('toast-message');
        //     let toastTimer;

        //     /**
        //      * Shows a toast notification.
        //      */
        //     function showToast(message, isError = false) {
        //         clearTimeout(toastTimer); // Clear any existing timer
                
        //         toastMsg.textContent = message;
                
        //         // Set color
        //         toastEl.classList.remove('bg-green-500', 'bg-red-500');
        //         if (isError) {
        //             toastEl.classList.add('bg-red-500');
        //         } else {
        //             toastEl.classList.add('bg-green-500');
        //         }
                
        //         // Show toast
        //         toastEl.classList.add('show');
                
        //         // Hide after 3 seconds
        //         toastTimer = setTimeout(() => {
        //             toastEl.classList.remove('show');
        //         }, 3000);
        //     }

        //     // Dark Mode Logic
        //     const themeToggleBtn = document.getElementById('theme-toggle');
        //     const darkIcon = document.getElementById('theme-toggle-dark-icon');
        //     const lightIcon = document.getElementById('theme-toggle-light-icon');

        //     function updateThemeIcons(isDarkMode) {
        //         if (isDarkMode) {
        //             darkIcon.classList.add('hidden');
        //             lightIcon.classList.remove('hidden');
        //         } else {
        //             darkIcon.classList.remove('hidden');
        //             lightIcon.classList.add('hidden');
        //         }
        //     }

        //     function toggleTheme() {
        //         const isDarkMode = document.documentElement.classList.toggle('dark');
        //         localStorage.setItem(STORAGE_KEYS.theme, isDarkMode ? 'dark' : 'light');
        //         updateThemeIcons(isDarkMode);
        //     }

        //     themeToggleBtn.addEventListener('click', toggleTheme);

        //     function initTheme() {
        //         const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
        //         const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
        //         let isDarkMode = false;
        //         if (savedTheme === 'dark') {
        //             isDarkMode = true;
        //         } else if (savedTheme === 'light') {
        //             isDarkMode = false;
        //         } else {
        //             isDarkMode = prefersDark; // Use system preference if no save
        //         }
                
        //         if (isDarkMode) {
        //             document.documentElement.classList.add('dark');
        //         } else {
        //             document.documentElement.classList.remove('dark');
        //         }
        //         updateThemeIcons(isDarkMode);
        //     }
            
        //     // --- DASHBOARD STATS ---
        //     /**
        //      * Updates the *ADMIN* statistic cards on the dashboard.
        //      */
        //     function updateDashboardStats() {
        //         // Re-read from storage to ensure data is fresh
        //         db_books = getFromStorage(STORAGE_KEYS.books, []);
        //         db_members = getFromStorage(STORAGE_KEYS.members, []);
        //         db_issued = getFromStorage(STORAGE_KEYS.issued, []);

        //         document.getElementById('stat-total-books').textContent = db_books.length;
        //         document.getElementById('stat-total-members').textContent = db_members.length;
        //         document.getElementById('stat-issued-books').textContent = db_issued.length;
        //     }

        //     /**
        //      * *** NEW FUNCTION ***
        //      * Updates the *USER* statistic cards and table on the dashboard.
        //      * @param {string} memberId - The ID of the logged-in member.
        //      */
        //     function updateUserDashboard(memberId) {
        //         if (!memberId) return;

        //         // Re-read data for freshness
        //         db_books = getFromStorage(STORAGE_KEYS.books, []);
        //         db_members = getFromStorage(STORAGE_KEYS.members, []);
        //         db_issued = getFromStorage(STORAGE_KEYS.issued, []);

        //         const member = db_members.find(m => m.id === memberId);
        //         const myIssued = db_issued.filter(b => b.memberId === memberId);
                
        //         let totalFines = 0;
        //         const tableBody = document.getElementById('user-issued-table');
        //         tableBody.innerHTML = ''; // Clear
                
        //         if (myIssued.length > 0) {
        //             myIssued.forEach(issued => {
        //                 const book = db_books.find(b => b.serial === issued.bookSerial);
        //                 let fine = 0;
        //                 if (today > issued.returnDate) {
        //                     const daysOverdue = Math.ceil((new Date(today) - new Date(issued.returnDate)) / (1000 * 60 * 60 * 24));
        //                     fine = daysOverdue * 1; // $1 per day
        //                     totalFines += fine;
        //                 }
                        
        //                 tableBody.innerHTML += `
        //                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        //                         <td class="px-6 py-4 whitespace-nowrap">${book ? book.title : 'N/A'}</td>
        //                         <td class="px-6 py-4 whitespace-nowrap">${issued.bookSerial}</td>
        //                         <td class="px-6 py-4 whitespace-nowrap ${fine > 0 ? 'text-red-500 font-bold' : ''}">${issued.returnDate} ${fine > 0 ? '(Overdue)' : ''}</td>
        //                     </tr>
        //                 `;
        //             });
        //         } else {
        //             tableBody.innerHTML = '<tr><td colspan="3" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No items currently issued.</td></tr>';
        //         }

        //         // Update stat cards
        //         document.getElementById('stat-user-issued').textContent = myIssued.length;
        //         document.getElementById('stat-user-fines').textContent = `$${totalFines.toFixed(2)}`;
        //         document.getElementById('stat-user-expiry').textContent = member ? member.expiry : 'N/A';
        //     }


        //     // --- PAGE NAVIGATION ---

        //     /**
        //      * Hides all pages and shows the one with the specified ID
        //      * @param {string} pageId The ID of the page to show
        //      */
        //     function showPage(pageId) {
        //         // Hide all pages
        //         pages.forEach(page => page.classList.remove('active'));
                
        //         // Show the target page
        //         const targetPage = document.getElementById(pageId);
        //         if (targetPage) {
        //             targetPage.classList.add('active');
        //         } else {
        //             console.error(`Page with ID "${pageId}" not found.`);
        //             document.getElementById('page-dashboard').classList.add('active'); // Fallback
        //         }
                
        //         // *** LOGIC CHANGE HERE ***
        //         // Special actions for specific pages
        //         if (pageId === 'page-dashboard') {
        //             // Refresh stats when dashboard is shown
        //             if (currentUserRole === 'admin') {
        //                 document.getElementById('dashboard-admin-view').classList.remove('hidden');
        //                 document.getElementById('dashboard-user-view').classList.add('hidden');
        //                 updateDashboardStats(); // The original global stats
        //             } else if (currentUserRole === 'user') {
        //                 document.getElementById('dashboard-admin-view').classList.add('hidden');
        //                 document.getElementById('dashboard-user-view').classList.remove('hidden');
        //                 updateUserDashboard(currentMemberId); // The new user-specific stats
        //             }
        //         }
                
        //         // Reset forms when showing them
        //         resetForms(pageId);
        //     }
            
        //     /**
        //      * Resets form fields and errors when a page is loaded
        //      */
        //     function resetForms(pageId) {
        //         // Hide all form errors
        //         document.querySelectorAll('.form-error').forEach(err => {
        //             err.textContent = '';
        //             err.style.display = 'none';
        //         });
                
        //         // Reset specific forms
        //         switch(pageId) {
        //             case 'page-login':
        //                 document.getElementById('form-login').reset();
        //                 document.getElementById('login-username').value = 'admin'; // Pre-fill hint
        //                 document.getElementById('login-password').value = 'admin123'; // Pre-fill hint
        //                 break;
        //             case 'page-reports-search':
        //                 document.getElementById('form-book-available').reset();
        //                 document.getElementById('results-table-body').innerHTML = ''; // Clear results
        //                 break;
        //             case 'page-transactions-issue':
        //                 document.getElementById('form-book-issue').reset();
        //                 setupIssueDateFields(); // Re-setup date logic
        //                 break;
        //             case 'page-transactions-return':
        //                 document.getElementById('form-book-return').reset();
        //                 break;
        //             case 'page-maintenance-add-member':
        //                 document.getElementById('form-add-membership').reset();
        //                 break;
        //             case 'page-maintenance-update-member':
        //                 document.getElementById('form-update-membership').reset();
        //                 document.getElementById('update-member-details').classList.add('hidden');
        //                 break;
        //             case 'page-maintenance-add-book':
        //                 document.getElementById('form-add-book').reset();
        //                 break;
        //             case 'page-maintenance-update-book':
        //                 document.getElementById('form-update-book').reset();
        //                 document.getElementById('update-book-details').classList.add('hidden');
        //                 break;
        //             case 'page-maintenance-user-mgt':
        //                 document.getElementById('form-user-mgt').reset();
        //                 break;
        //         }
        //     }
            
        //     /**
        //      * Shows/hides nav links based on the current user role
        //      */
        //     function updateNav() {
        //         if (currentUserRole === 'admin') {
        //             mainNav.classList.remove('hidden');
        //             navLinks.dashboard.style.display = 'block';
        //             navLinks.reports.style.display = 'block';
        //             navLinks.transactions.style.display = 'block';
        //             navLinks.maintenance.style.display = 'block';
        //         } else if (currentUserRole === 'user') {
        //             mainNav.classList.remove('hidden');
        //             navLinks.dashboard.style.display = 'block';
        //             navLinks.reports.style.display = 'block';
        //             navLinks.transactions.style.display = 'block';
        //             navLinks.maintenance.style.display = 'none'; // Requirement 9
        //         } else {
        //             mainNav.classList.add('hidden');
        //         }
        //     }

        //     // --- LOGIN/LOGOUT LOGIC ---

        //     document.getElementById('form-login').addEventListener('submit', (e) => {
        //         e.preventDefault();
        //         clearError('error-login');
                
        //         const username = document.getElementById('login-username').value.trim();
        //         const password = document.getElementById('login-password').value;

        //         if (username === 'admin' && password === 'admin123') {
        //             currentUserRole = 'admin'; // Requirement 8
        //             currentMemberId = null; // Admin is not a member
        //             document.getElementById('welcome-message').textContent = 'Welcome, Admin. You have full access.';
        //             showToast('Login successful. Welcome Admin!');
        //         } else if (username === 'user' && password === 'user123') {
        //             currentUserRole = 'user'; // Requirement 9
        //             currentMemberId = 'M1001'; // *** HARDCODED LINK: user login = John Doe ***
        //             document.getElementById('welcome-message').textContent = `Welcome, ${db_members.find(m => m.id === currentMemberId)?.name || 'User'}. You can access Reports and Transactions.`;
        //             showToast('Login successful. Welcome User!');
        //         } else {
        //             showError('error-login', 'Invalid username or password. (Hint: admin/admin123 or user/user123)');
        //             return;
        //         }
                
        //         updateNav();
        //         showPage('page-dashboard');
        //     });

        //     navLinks.logout.addEventListener('click', (e) => {
        //         e.preventDefault();
        //         currentUserRole = null;
        //         currentMemberId = null; // Clear member link
        //         updateNav();
        //         showPage('page-login');
        //         showToast('You have been logged out.');
        //     });

        //     // --- Main Navigation Clicks ---
        //     navLinks.dashboard.addEventListener('click', (e) => { e.preventDefault(); showPage('page-dashboard'); });
        //     navLinks.reports.addEventListener('click', (e) => { e.preventDefault(); showPage('page-reports'); });
        //     navLinks.transactions.addEventListener('click', (e) => { e.preventDefault(); showPage('page-transactions'); });
        //     navLinks.maintenance.addEventListener('click', (e) => { e.preventDefault(); showPage('page-maintenance'); });
            
        //     // --- Sub-menu Navigation Clicks ---
        //     document.querySelectorAll('.menu-button').forEach(button => {
        //         button.addEventListener('click', () => {
        //             const targetPageId = button.getAttribute('data-target');
        //             showPage(targetPageId);
        //         });
        //     });

        //     // --- FORM VALIDATIONS & LOGIC (Requirement 10) ---

        //     /**
        //      * Helper to show a form error
        //      */
        //     function showError(errorId, message) {
        //         const errorEl = document.getElementById(errorId);
        //         errorEl.textContent = message;
        //         errorEl.style.display = 'block';
        //         showToast(message, true); // Also show as an error toast
        //     }
            
        //     /**
        //      * Helper to clear a form error
        //      */
        //     function clearError(errorId) {
        //         const errorEl = document.getElementById(errorId);
        //         errorEl.textContent = '';
        //         errorEl.style.display = 'none';
        //     }

        //     // 10.1: Book Available (Search)
        //     document.getElementById('form-book-available').addEventListener('submit', (e) => {
        //         e.preventDefault();
        //         clearError('error-book-available');
                
        //         const bookName = document.getElementById('search-book-name').value.trim();
        //         const authorName = document.getElementById('search-author-name').value.trim();
        //         const category = document.getElementById('search-category').value;

        //         // Validation: One of the text box or drop down to be filled
        //         if (!bookName && !authorName && !category) {
        //             showError('error-book-available', 'Please fill in at least one field to search.');
        //             return;
        //         }

        //         // Filter data from our localStorage-backed variable
        //         const results = db_books.filter(book => 
        //             book.isAvailable &&
        //             (!bookName || book.title.toLowerCase().includes(bookName.toLowerCase())) &&
        //             (!authorName || book.author.toLowerCase().includes(authorName.toLowerCase())) &&
        //             (!category || book.category === category)
        //         );
                
        //         // 10.2: Search Results
        //         const tableBody = document.getElementById('results-table-body');
        //         tableBody.innerHTML = ''; // Clear old results
                
        //         if (results.length > 0) {
        //             results.forEach(book => {
        //                 tableBody.innerHTML += `
        //                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        //                         <td class="px-6 py-4 whitespace-nowrap">${book.title}</td>
        //                         <td class="px-6 py-4 whitespace-nowrap">${book.author}</td>
        //                         <td class="px-6 py-4 whitespace-nowrap">${book.serial}</td>
        //                         <td class="px-6 py-4 whitespace-nowrap">
        //                             <input type="radio" name="selected-book" class="form-radio text-blue-600" value="${book.serial}">
        //                         </td>
        //                     </tr>
        //                 `;
        //             });
        //         } else {
        //             tableBody.innerHTML = '<tr><td colspan="4" class="px-6 py-4 text-center text-gray-500">No available books found.</td></tr>';
        //         }
        //         showPage('page-reports-results');
        //     });

        //     // 10.2 (continued): Button on Search Results page
        //     document.getElementById('btn-issue-selected').addEventListener('click', () => {
        //         const selectedRadio = document.querySelector('input[name="selected-book"]:checked');
        //         if (!selectedRadio) {
        //             showToast('Please select a book to issue.', true);
        //             return;
        //         }
                
        //         const selectedSerial = selectedRadio.value;
        //         const book = db_books.find(b => b.serial === selectedSerial);
                
        //         if (book) {
        //             showPage('page-transactions-issue');
        //             // *** LOGIC CHANGE HERE: Pre-fill the NEW form fields ***
        //             document.getElementById('issue-serial-no').value = book.serial;
        //             document.getElementById('issue-book-name').value = book.title;
        //             document.getElementById('issue-author-name').value = book.author;
        //         }
        //     });
            
        //     // 10.3: Book Issue
        //     function setupIssueDateFields() {
        //         const issueDateEl = document.getElementById('issue-date');
        //         const returnDateEl = document.getElementById('issue-return-date');
                
        //         // Issue Date - cannot be lesser than today.
        //         issueDateEl.value = today;
        //         issueDateEl.min = today;
                
        //         // Return Date - automatically populated 15 days ahead.
        //         returnDateEl.value = todayPlus15;
                
        //         // Listen for changes on Issue Date
        //         issueDateEl.addEventListener('change', () => {
        //             const selectedIssueDate = new Date(issueDateEl.value);
                    
        //             // Return Date - automatically populated 15 days ahead.
        //             const newReturnDate = new Date(selectedIssueDate.getTime() + 15 * 24 * 60 * 60 * 1000);
        //             const newReturnDateStr = newReturnDate.toISOString().split('T')[0];
                    
        //             returnDateEl.value = newReturnDateStr;
                    
        //             // But not greater than 15 days.
        //             returnDateEl.min = issueDateEl.value; // Can be edited earlier
        //             returnDateEl.max = newReturnDateStr; // But not later
        //         });
                
        //         // Set initial min/max for return date
        //         returnDateEl.min = today;
        //         returnDateEl.max = todayPlus15;
        //     }
            
        //     // *** NEW EVENT LISTENER for Serial No. ***
        //     document.getElementById('issue-serial-no').addEventListener('change', (e) => {
        //          // Auto-populate author name
        //         const serial = e.target.value;
        //         const book = db_books.find(b => b.serial === serial);
        //         if(book) {
        //             document.getElementById('issue-book-name').value = book.title;
        //             document.getElementById('issue-author-name').value = book.author;
        //             if (!book.isAvailable) {
        //                 showToast('Warning: This item is already issued.', true);
        //             }
        //         } else {
        //             document.getElementById('issue-book-name').value = 'Item not found';
        //             document.getElementById('issue-author-name').value = '';
        //         }
        //     });

        //     document.getElementById('form-book-issue').addEventListener('submit', (e) => {
        //         e.preventDefault();
        //         clearError('error-book-issue');
                
        //         // *** LOGIC CHANGE: Validate by Serial, not Name ***
        //         const serialNo = document.getElementById('issue-serial-no').value;
        //         const issueDate = document.getElementById('issue-date').value;
        //         const returnDate = document.getElementById('issue-return-date').value;
        //         const memberId = document.getElementById('issue-member-id').value.trim();

        //         let errors = [];
        //         // Name of book required
        //         if (!serialNo) errors.push('Serial No. of Book is required.');
        //         if (!issueDate) errors.push('Issue Date is required.');
        //         if (!memberId) errors.push('Member ID is required.');
                
        //         // Check if book exists and is available
        //         const book = db_books.find(b => b.serial === serialNo);
        //         if (!book) {
        //             errors.push('Book not found with this Serial No.');
        //         } else if (!book.isAvailable) {
        //             errors.push('This book is already issued.');
        //         }

        //         // Check if member exists
        //         const member = db_members.find(m => m.id === memberId);
        //         if (!member) {
        //             errors.push('Member ID not found.');
        //         }

        //         if (errors.length > 0) {
        //             showError('error-book-issue', errors.join(' '));
        //         } else {
        //             // --- PERSISTENCE LOGIC ---
        //             // 1. Mark book as unavailable
        //             book.isAvailable = false;
        //             saveToStorage(STORAGE_KEYS.books, db_books);

        //             // 2. Add to issued records
        //             db_issued.push({
        //                 bookSerial: book.serial,
        //                 memberId: member.id,
        //                 memberName: member.name,
        //                 issueDate: issueDate,
        //                 returnDate: returnDate
        //             });
        //             saveToStorage(STORAGE_KEYS.issued, db_issued);
                    
        //             showToast('Book issued successfully!');
        //             showPage('page-dashboard');
        //         }
        //     });

        //     // 10.4: Return Book
        //     document.getElementById('return-serial-no').addEventListener('change', (e) => {
        //         // Auto-populate details based on Serial No.
        //         const serial = e.target.value;
        //         const issuedBook = db_issued.find(b => b.bookSerial === serial);
        //         const bookInfo = db_books.find(b => b.serial === serial);
                
        //         if (issuedBook && bookInfo) {
        //             document.getElementById('return-book-name').value = bookInfo.title;
        //             document.getElementById('return-author-name').value = bookInfo.author;
        //             document.getElementById('return-issue-date').value = issuedBook.issueDate;
        //             document.getElementById('return-return-date').value = issuedBook.returnDate;
        //         } else {
        //             document.getElementById('return-book-name').value = 'Book not found or not issued';
        //             document.getElementById('return-author-name').value = '';
        //             document.getElementById('return-issue-date').value = '';
        //             document.getElementById('return-return-date').value = '';
        //         }
        //     });
            
        //     document.getElementById('form-book-return').addEventListener('submit', (e) => {
        //         e.preventDefault();
        //         clearError('error-book-return');
                
        //         const bookName = document.getElementById('return-book-name').value;
        //         const serialNo = document.getElementById('return-serial-no').value;
                
        //         let errors = [];
        //         if (!bookName || bookName === 'Book not found or not issued') {
        //             errors.push('A valid issued book is required.');
        //         }
        //         if (!serialNo) {
        //             errors.push('Serial No. of Book is required.');
        //         }
                
        //         const issuedBook = db_issued.find(b => b.bookSerial === serialNo);
        //         if (!issuedBook) {
        //             errors.push('This Serial No. does not match an issued book.');
        //         }
                
        //         if (errors.length > 0) {
        //             showError('error-book-return', errors.join(' '));
        //         } else {
        //             // Logic to populate Fine Pay page
        //             const originalReturnDate = document.getElementById('return-return-date').value;
        //             let fine = 0;
                    
        //             // Check if today is after the original return date
        //             if (today > originalReturnDate) {
        //                 const daysOverdue = Math.ceil((new Date(today) - new Date(originalReturnDate)) / (1000 * 60 * 60 * 24));
        //                 fine = daysOverdue * 1; // $1 per day fine (assumption)
        //             }

        //             // Store details for the fine page
        //             currentFineTransaction = {
        //                 bookName: bookName,
        //                 bookSerial: serialNo, // Save the serial for the final transaction
        //                 memberName: issuedBook.memberName || 'N/A',
        //                 calculatedFine: fine
        //             };
                    
        //             // Populate Fine Pay page fields
        //             document.getElementById('fine-book-name').textContent = currentFineTransaction.bookName;
        //             document.getElementById('fine-member-name').textContent = currentFineTransaction.memberName;
        //             document.getElementById('fine-calculated').textContent = `$${currentFineTransaction.calculatedFine.toFixed(2)}`;
        //             document.getElementById('fine-paid').checked = false; // Reset checkbox
                    
        //             // With the confirm option used the user is taken to the Pay Fine page
        //             showPage('page-transactions-fine');
        //         }
        //     });

        //     // 10.5: Fine Pay
        //     document.getElementById('form-fine-pay').addEventListener('submit', (e) => {
        //         e.preventDefault();
        //         clearError('error-fine-pay');
                
        //         const isFinePending = currentFineTransaction.calculatedFine > 0;
        //         const isFinePaid = document.getElementById('fine-paid').checked;

        //         // For a pending fine, the paid fine check box needs to be selected
        //         if (isFinePending && !isFinePaid) {
        //             showError('error-fine-pay', 'Fine is pending. Please check "Fine Paid" to complete the transaction.');
        //             return;
        //         }
                
        //         // --- PERSISTENCE LOGIC ---
        //         // 1. Mark book as available again
        //         const book = db_books.find(b => b.serial === currentFineTransaction.bookSerial);
        //         if (book) {
        //             book.isAvailable = true;
        //             saveToStorage(STORAGE_KEYS.books, db_books);
        //         }

        //         // 2. Remove from issued records
        //         db_issued = db_issued.filter(b => b.bookSerial !== currentFineTransaction.bookSerial);
        //         saveToStorage(STORAGE_KEYS.issued, db_issued);

        //         // If no calculated fine, user can press confirm
        //         showToast('Transaction completed successfully. Book is returned.');
        //         showPage('page-dashboard');
        //     });
            
        //     // 10.6: Add Membership
        //     document.getElementById('form-add-membership').addEventListener('submit', (e) => {
        //         e.preventDefault();
        //         clearError('error-add-membership');
                
        //         const name = document.getElementById('add-member-name').value;
        //         const email = document.getElementById('add-member-email').value;
        //         const phone = document.getElementById('add-member-phone').value;
        //         const duration = document.querySelector('input[name="member-duration"]:checked').value;

        //         // All fields mandatory
        //         if (!name || !email || !phone) {
        //             showError('error-add-membership', 'All fields are mandatory.');
        //             return;
        //         }
                
        //         // --- PERSISTENCE LOGIC ---
        //         const newId = 'M' + (db_members.length + 1002); // Simple unique ID
        //         const expiryDate = new Date();
        //         expiryDate.setMonth(expiryDate.getMonth() + parseInt(duration));
                
        //         const newMember = {
        //             id: newId,
        //             name: name,
        //             email: email,
        //             phone: phone,
        //             expiry: expiryDate.toISOString().split('T')[0]
        //         };
                
        //         db_members.push(newMember);
        //         saveToStorage(STORAGE_KEYS.members, db_members);
                
        //         showToast(`Membership added successfully! New ID: ${newId}`);
        //         showPage('page-maintenance');
        //     });
            
        //     // 1To.7: Update Membership
        //     document.getElementById('btn-find-member').addEventListener('click', () => {
        //         clearError('error-update-membership');
        //         const memberId = document.getElementById('update-member-id').value;
        //         if (!memberId) {
        //             showError('error-update-membership', 'Membership Number is mandatory.');
        //             return;
        //         }
                
        //         const member = db_members.find(m => m.id === memberId);
        //         if (member) {
        //             document.getElementById('update-member-name').textContent = member.name;
        //             document.getElementById('update-member-expiry').textContent = member.expiry;
        //             document.getElementById('update-member-details').classList.remove('hidden');
        //         } else {
        //             showError('error-update-membership', 'Member not found.');
        //             document.getElementById('update-member-details').classList.add('hidden');
        //         }
        //     });
            
        //     document.getElementById('form-update-membership').addEventListener('submit', (e) => {
        //         e.preventDefault();
        //         const memberId = document.getElementById('update-member-id').value;
        //         const action = document.querySelector('input[name="member-action"]:checked').value;
                
        //         const memberIndex = db_members.findIndex(m => m.id === memberId);
                
        //         if (memberIndex === -1) {
        //             showError('error-update-membership', 'Member not found. Cannot perform action.');
        //             return;
        //         }

        //         if (action === 'extend') {
        //             // Extend by 6 months from current expiry
        //             const currentExpiry = new Date(db_members[memberIndex].expiry);
        //             currentExpiry.setMonth(currentExpiry.getMonth() + 6);
        //             db_members[memberIndex].expiry = currentExpiry.toISOString().split('T')[0];
        //             showToast('Membership extended successfully!');
        //         } else if (action === 'cancel') {
        //             // Remove member
        //             db_members.splice(memberIndex, 1);
        //             showToast('Membership cancelled successfully.');
        //         }

        //         // --- PERSISTENCE LOGIC ---
        //         saveToStorage(STORAGE_KEYS.members, db_members);
        //         showPage('page-maintenance');
        //     });
            
        //     // 10.8: Add Book
        //     document.getElementById('form-add-book').addEventListener('submit', (e) => {
        //         e.preventDefault();
        //         clearError('error-add-book');
                
        //         const title = document.getElementById('add-book-title').value;
        //         const author = document.getElementById('add-book-author').value;
        //         const serial = document.getElementById('add-book-serial').value;
        //         const category = document.getElementById('add-book-category').value;
        //         const type = document.querySelector('input[name="add-book-type"]:checked').value;

        //         // All fields mandatory
        //         if (!title || !author || !serial || !category) {
        //             showError('error-add-book', 'All fields are mandatory.');
        //             return;
        //         }
                
        //         // Check for duplicate serial
        //         if (db_books.find(b => b.serial === serial)) {
        //             showError('error-add-book', 'Serial No. already exists. Must be unique.');
        //             return;
        //         }
                
        //         // --- PERSISTENCE LOGIC ---
        //         const newItem = {
        //             id: db_books.length + 10, // simple unique ID
        //             title: title,
        //             author: author,
        //             serial: serial,
        //             category: category,
        //             type: type,
        //             isAvailable: true
        //         };

        //         db_books.push(newItem);
        //         saveToStorage(STORAGE_KEYS.books, db_books);
                
        //         showToast('Item added successfully!');
        //         showPage('page-maintenance');
        //     });
            
        //     // 10.9: Update Book
        //     document.getElementById('btn-find-book').addEventListener('click', () => {
        //         clearError('error-update-book');
        //         const serial = document.getElementById('update-book-serial').value;
        //         if (!serial) {
        //             showError('error-update-book', 'Serial No. is mandatory.');
        //             return;
        //         }
                
        //         const book = db_books.find(b => b.serial === serial);
        //         if (book) {
        //             // Populate fields
        //             document.getElementById('update-book-title').value = book.title;
        //             document.getElementById('update-book-author').value = book.author;
        //             document.getElementById('update-book-category').value = book.category;
        //             document.querySelector(`input[name="update-book-type"][value="${book.type}"]`).checked = true;
        //             document.getElementById('update-book-details').classList.remove('hidden');
        //         } else {
        //             showError('error-update-book', 'Item not found.');
        //             document.getElementById('update-book-details').classList.add('hidden');
        //         }
        //     });

        //     document.getElementById('form-update-book').addEventListener('submit', (e) => {
        //         e.preventDefault();
        //         clearError('error-update-book');
                
        //         const serial = document.getElementById('update-book-serial').value;
        //         const title = document.getElementById('update-book-title').value;
        //         const author = document.getElementById('update-book-author').value;
        //         const category = document.getElementById('update-book-category').value;
        //         const type = document.querySelector('input[name="update-book-type"]:checked').value;


        //         // All fields mandatory
        //         if (!title || !author || !category) {
        //             showError('error-update-book', 'All fields are mandatory.');
        //             return;
        //         }
                
        //         // --- PERSISTENCE LOGIC ---
        //         const bookIndex = db_books.findIndex(b => b.serial === serial);
        //         if (bookIndex === -1) {
        //              showError('error-update-book', 'Item not found. Cannot update.');
        //              return;
        //         }
                
        //         db_books[bookIndex] = {
        //             ...db_books[bookIndex], // Keep id, serial, isAvailable
        //             title: title,
        //             author: author,
        //             category: category,
        //             type: type
        //         };
                
        //         saveToStorage(STORAGE_KEYS.books, db_books);
                
        //         showToast('Item updated successfully!');
        //         showPage('page-maintenance');
        //     });
            
        //     // 10.10: User Management
        //     document.getElementById('form-user-mgt').addEventListener('submit', (e) => {
        //         e.preventDefault();
        //         clearError('error-user-mgt');
                
        //         const name = document.getElementById('user-mgt-name').value;
        //         const username = document.getElementById('user-mgt-username').value;
        //         const password = document.getElementById('user-mgt-password').value;
                
        //         // Name is mandatory
        //         if (!name || !username || !password) {
        //             showError('error-user-mgt', 'Name, Username, and Password are mandatory.');
        //             return;
        //         }
                
        //         // NOTE: This form does not save to localStorage in this demo,
        //         // as it's for managing app users (like 'admin', 'user'), not library members.
        //         // A real app would send this to a backend.
                
        //         showToast('User saved successfully! (Demo)');
        //         showPage('page-maintenance');
        //     });


        //     // --- INITIALIZATION ---
        //     initTheme(); // Set dark/light mode
        //     updateNav(); // Set initial nav state
        //     showPage('page-login'); // Show login page first
        // });
    





















        document.addEventListener('DOMContentLoaded', () => {

        // --- STATE ---
        let currentUserRole = null; // 'admin' or 'user'
        let currentMemberId = null; // e.g., 'M1001' - links login to member
        let today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        let todayPlus15 = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        // --- LOCALSTORAGE HELPERS ---
        const STORAGE_KEYS = {
            books: 'lms_books',
            members: 'lms_members',
            issued: 'lms_issued',
            theme: 'lms_theme',
            users: 'lms_users' // --- NEW --- Key for application users
        };

        // Mock data for initial seeding if localStorage is empty
        const mockBooksSeed = [
            { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', serial: 'B1001', category: 'Fiction', isAvailable: true, type: 'book' },
            { id: 2, title: '1984', author: 'George Orwell', serial: 'B1002', category: 'Fiction', isAvailable: true, type: 'book' },
            { id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', serial: 'B1003', category: 'Non-Fiction', isAvailable: false, type: 'book' },
            { id: 4, title: 'Inception', author: 'Christopher Nolan', serial: 'M1001', category: 'Movie', isAvailable: true, type: 'movie' },
            { id: 5, title: 'Atomic Habits', author: 'James Clear', serial: 'B1004', category: 'Self-Help', isAvailable: true, type: 'book' },
        ];
        const mockIssuedSeed = [
            { bookSerial: 'B1003', memberId: 'M1001', memberName: 'John Doe', issueDate: '2025-10-20', returnDate: '2025-11-04' } // Due today
        ];
        const mockMembersSeed = [
            { id: 'M1001', name: 'John Doe', email: 'john@example.com', phone: '1234567890', expiry: '2026-05-01' }
        ];

        // --- NEW --- Seed data for the dynamic login users
        const mockUsersSeed = [
            { username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User', memberId: null },
            { username: 'user', password: 'user123', role: 'user', name: 'John Doe', memberId: 'M1001' } // Pre-links 'user' login to member 'M1001'
        ];


        /**
         * Gets data from localStorage or seeds it with mock data if empty.
         */
        function getFromStorage(key, mockData) {
            let data = localStorage.getItem(key);
            try {
                if (data) {
                    return JSON.parse(data);
                } else {
                    // If no data, seed localStorage with mock data
                    saveToStorage(key, mockData);
                    return mockData;
                }
            } catch (e) {
                console.error("Failed to parse localStorage data: ", e);
                return mockData; // Fallback
            }
        }

        /**
         * Saves data to localStorage.
         */
        function saveToStorage(key, data) {
            localStorage.setItem(key, JSON.stringify(data));
        }

        // Initialize local "databases" from localStorage
        let db_books = getFromStorage(STORAGE_KEYS.books, mockBooksSeed);
        let db_members = getFromStorage(STORAGE_KEYS.members, mockMembersSeed);
        let db_issued = getFromStorage(STORAGE_KEYS.issued, mockIssuedSeed);
        let db_users = getFromStorage(STORAGE_KEYS.users, mockUsersSeed); // --- NEW ---

        // This object will hold the details for the fine page
        let currentFineTransaction = {
            bookName: '',
            bookSerial: '', // CRITICAL: Added this to track which book to return
            memberName: '',
            calculatedFine: 0
        };

        // --- DOM ELEMENTS ---
        const mainNav = document.getElementById('main-nav');
        const navLinks = {
            dashboard: document.getElementById('nav-dashboard'),
            reports: document.getElementById('nav-reports'),
            transactions: document.getElementById('nav-transactions'),
            maintenance: document.getElementById('nav-maintenance'),
            logout: document.getElementById('nav-logout'),
        };
        const pages = document.querySelectorAll('.page-content');
        
        // --- NEW --- User Mgt Form elements (moved to global scope for resetForms)
        const userRoleSelect = document.getElementById('user-mgt-role');
        const memberIdField = document.getElementById('user-mgt-member-id-field');


        // --- UI HELPERS (TOAST & DARK MODE) ---

        const toastEl = document.getElementById('toast-notification');
        const toastMsg = document.getElementById('toast-message');
        let toastTimer;

        /**
         * Shows a toast notification.
         */
        function showToast(message, isError = false) {
            clearTimeout(toastTimer); // Clear any existing timer
            
            toastMsg.textContent = message;
            
            // Set color
            toastEl.classList.remove('bg-green-500', 'bg-red-500');
            if (isError) {
                toastEl.classList.add('bg-red-500');
            } else {
                toastEl.classList.add('bg-green-500');
            }
            
            // Show toast
            toastEl.classList.add('show');
            
            // Hide after 3 seconds
            toastTimer = setTimeout(() => {
                toastEl.classList.remove('show');
            }, 3000);
        }

        // Dark Mode Logic
        const themeToggleBtn = document.getElementById('theme-toggle');
        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        const lightIcon = document.getElementById('theme-toggle-light-icon');

        function updateThemeIcons(isDarkMode) {
            if (isDarkMode) {
                darkIcon.classList.add('hidden');
                lightIcon.classList.remove('hidden');
            } else {
                darkIcon.classList.remove('hidden');
                lightIcon.classList.add('hidden');
            }
        }

        function toggleTheme() {
            const isDarkMode = document.documentElement.classList.toggle('dark');
            localStorage.setItem(STORAGE_KEYS.theme, isDarkMode ? 'dark' : 'light');
            updateThemeIcons(isDarkMode);
        }

        themeToggleBtn.addEventListener('click', toggleTheme);

        function initTheme() {
            const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            let isDarkMode = false;
            if (savedTheme === 'dark') {
                isDarkMode = true;
            } else if (savedTheme === 'light') {
                isDarkMode = false;
            } else {
                isDarkMode = prefersDark; // Use system preference if no save
            }
            
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            updateThemeIcons(isDarkMode);
        }
        
        // --- DASHBOARD STATS ---
        /**
         * Updates the *ADMIN* statistic cards on the dashboard.
         */
        function updateDashboardStats() {
            // Re-read from storage to ensure data is fresh
            db_books = getFromStorage(STORAGE_KEYS.books, []);
            db_members = getFromStorage(STORAGE_KEYS.members, []);
            db_issued = getFromStorage(STORAGE_KEYS.issued, []);

            document.getElementById('stat-total-books').textContent = db_books.length;
            document.getElementById('stat-total-members').textContent = db_members.length;
            document.getElementById('stat-issued-books').textContent = db_issued.length;
        }

        /**
         * *** NEW FUNCTION ***
         * Updates the *USER* statistic cards and table on the dashboard.
         * @param {string} memberId - The ID of the logged-in member.
         */
        function updateUserDashboard(memberId) {
            if (!memberId) return;

            // Re-read data for freshness
            db_books = getFromStorage(STORAGE_KEYS.books, []);
            db_members = getFromStorage(STORAGE_KEYS.members, []);
            db_issued = getFromStorage(STORAGE_KEYS.issued, []);

            const member = db_members.find(m => m.id === memberId);
            const myIssued = db_issued.filter(b => b.memberId === memberId);
            
            let totalFines = 0;
            const tableBody = document.getElementById('user-issued-table');
            tableBody.innerHTML = ''; // Clear
            
            if (myIssued.length > 0) {
                myIssued.forEach(issued => {
                    const book = db_books.find(b => b.serial === issued.bookSerial);
                    let fine = 0;
                    if (today > issued.returnDate) {
                        const daysOverdue = Math.ceil((new Date(today) - new Date(issued.returnDate)) / (1000 * 60 * 60 * 24));
                        fine = daysOverdue * 1; // $1 per day
                        totalFines += fine;
                    }
                    
                    tableBody.innerHTML += `
                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td class="px-6 py-4 whitespace-nowrap">${book ? book.title : 'N/A'}</td>
                            <td class="px-6 py-4 whitespace-nowrap">${issued.bookSerial}</td>
                            <td class="px-6 py-4 whitespace-nowrap ${fine > 0 ? 'text-red-500 font-bold' : ''}">${issued.returnDate} ${fine > 0 ? '(Overdue)' : ''}</td>
                        </tr>
                    `;
                });
            } else {
                tableBody.innerHTML = '<tr><td colspan="3" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No items currently issued.</td></tr>';
            }

            // Update stat cards
            document.getElementById('stat-user-issued').textContent = myIssued.length;
            document.getElementById('stat-user-fines').textContent = `$${totalFines.toFixed(2)}`;
            document.getElementById('stat-user-expiry').textContent = member ? member.expiry : 'N/A';
        }


        // --- PAGE NAVIGATION ---

        /**
         * Hides all pages and shows the one with the specified ID
         * @param {string} pageId The ID of the page to show
         */
        function showPage(pageId) {
            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            
            // Show the target page
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
            } else {
                console.error(`Page with ID "${pageId}" not found.`);
                document.getElementById('page-dashboard').classList.add('active'); // Fallback
            }
            
            // *** LOGIC CHANGE HERE ***
            // Special actions for specific pages
            if (pageId === 'page-dashboard') {
                // Refresh stats when dashboard is shown
                if (currentUserRole === 'admin') {
                    document.getElementById('dashboard-admin-view').classList.remove('hidden');
                    document.getElementById('dashboard-user-view').classList.add('hidden');
                    updateDashboardStats(); // The original global stats
                } else if (currentUserRole === 'user') {
                    document.getElementById('dashboard-admin-view').classList.add('hidden');
                    document.getElementById('dashboard-user-view').classList.remove('hidden');
                    updateUserDashboard(currentMemberId); // The new user-specific stats
                }
            }
            
            // Reset forms when showing them
            resetForms(pageId);
        }
        
        /**
         * Resets form fields and errors when a page is loaded
         */
        function resetForms(pageId) {
            // Hide all form errors
            document.querySelectorAll('.form-error').forEach(err => {
                err.textContent = '';
                err.style.display = 'none';
            });
            
            // Reset specific forms
            switch(pageId) {
                case 'page-login':
                    document.getElementById('form-login').reset();
                    document.getElementById('login-username').value = 'admin'; // Pre-fill hint
                    document.getElementById('login-password').value = 'admin123'; // Pre-fill hint
                    break;
                case 'page-reports-search':
                    document.getElementById('form-book-available').reset();
                    document.getElementById('results-table-body').innerHTML = ''; // Clear results
                    break;
                case 'page-transactions-issue':
                    document.getElementById('form-book-issue').reset();
                    setupIssueDateFields(); // Re-setup date logic
                    break;
                case 'page-transactions-return':
                    document.getElementById('form-book-return').reset();
                    break;
                case 'page-maintenance-add-member':
                    document.getElementById('form-add-membership').reset();
                    break;
                case 'page-maintenance-update-member':
                    document.getElementById('form-update-membership').reset();
                    document.getElementById('update-member-details').classList.add('hidden');
                    break;
                case 'page-maintenance-add-book':
                    document.getElementById('form-add-book').reset();
                    break;
                case 'page-maintenance-update-book':
                    document.getElementById('form-update-book').reset();
                    document.getElementById('update-book-details').classList.add('hidden');
                    break;
                case 'page-maintenance-user-mgt': // --- UPDATED ---
                    document.getElementById('form-user-mgt').reset();
                    // Manually trigger the show/hide logic for the member ID field
                    if (userRoleSelect.value === 'user') {
                        memberIdField.classList.remove('hidden');
                    } else {
                        memberIdField.classList.add('hidden');
                    }
                    break;
            }
        }
        
        /**
         * Shows/hides nav links based on the current user role
         */
        function updateNav() {
            if (currentUserRole === 'admin') {
                mainNav.classList.remove('hidden');
                navLinks.dashboard.style.display = 'block';
                navLinks.reports.style.display = 'block';
                navLinks.transactions.style.display = 'block';
                navLinks.maintenance.style.display = 'block';
            } else if (currentUserRole === 'user') {
                mainNav.classList.remove('hidden');
                navLinks.dashboard.style.display = 'block';
                navLinks.reports.style.display = 'block';
                navLinks.transactions.style.display = 'block';
                navLinks.maintenance.style.display = 'none'; // Requirement 9
            } else {
                mainNav.classList.add('hidden');
            }
        }

        // --- LOGIN/LOGOUT LOGIC (--- UPDATED ---) ---

        document.getElementById('form-login').addEventListener('submit', (e) => {
            e.preventDefault();
            clearError('error-login');
            
            const username = document.getElementById('login-username').value.trim();
            const password = document.getElementById('login-password').value;

            // Refresh users from storage
            db_users = getFromStorage(STORAGE_KEYS.users, mockUsersSeed);
            
            const foundUser = db_users.find(u => u.username === username && u.password === password);

            if (foundUser) {
                currentUserRole = foundUser.role;
                currentMemberId = foundUser.memberId; // Will be 'M1001' for 'user' or null for 'admin'
                
                let welcomeName = foundUser.name || (foundUser.role === 'admin' ? 'Admin' : 'User');
                
                if (currentUserRole === 'admin') {
                    document.getElementById('welcome-message').textContent = `Welcome, ${welcomeName}. You have full access.`;
                } else {
                    // Try to get name from member profile if available, otherwise use user's name
                    db_members = getFromStorage(STORAGE_KEYS.members, mockMembersSeed); // Ensure members are fresh
                    const memberProfile = db_members.find(m => m.id === currentMemberId);
                    welcomeName = (memberProfile && memberProfile.name) ? memberProfile.name : welcomeName;
                    document.getElementById('welcome-message').textContent = `Welcome, ${welcomeName}. You can access Reports and Transactions.`;
                }
                
                showToast(`Login successful. Welcome, ${welcomeName}!`);
                updateNav();
                showPage('page-dashboard');

            } else {
                showError('error-login', 'Invalid username or password. (Hint: admin/admin123 or user/user123)');
                return;
            }
        });

        navLinks.logout.addEventListener('click', (e) => {
            e.preventDefault();
            currentUserRole = null;
            currentMemberId = null; // Clear member link
            updateNav();
            showPage('page-login');
            showToast('You have been logged out.');
        });

        // --- Main Navigation Clicks ---
        navLinks.dashboard.addEventListener('click', (e) => { e.preventDefault(); showPage('page-dashboard'); });
        navLinks.reports.addEventListener('click', (e) => { e.preventDefault(); showPage('page-reports'); });
        navLinks.transactions.addEventListener('click', (e) => { e.preventDefault(); showPage('page-transactions'); });
        navLinks.maintenance.addEventListener('click', (e) => { e.preventDefault(); showPage('page-maintenance'); });
        
        // --- Sub-menu Navigation Clicks ---
        document.querySelectorAll('.menu-button').forEach(button => {
            button.addEventListener('click', () => {
                const targetPageId = button.getAttribute('data-target');
                showPage(targetPageId);
            });
        });

        // --- FORM VALIDATIONS & LOGIC (Requirement 10) ---

        /**
         * Helper to show a form error
         */
        function showError(errorId, message) {
            const errorEl = document.getElementById(errorId);
            errorEl.textContent = message;
            errorEl.style.display = 'block';
            showToast(message, true); // Also show as an error toast
        }
        
        /**
         * Helper to clear a form error
         */
        function clearError(errorId) {
            const errorEl = document.getElementById(errorId);
            errorEl.textContent = '';
            errorEl.style.display = 'none';
        }

        // 10.1: Book Available (Search)
        document.getElementById('form-book-available').addEventListener('submit', (e) => {
            e.preventDefault();
            clearError('error-book-available');
            
            const bookName = document.getElementById('search-book-name').value.trim();
            const authorName = document.getElementById('search-author-name').value.trim();
            const category = document.getElementById('search-category').value;

            // Validation: One of the text box or drop down to be filled
            if (!bookName && !authorName && !category) {
                showError('error-book-available', 'Please fill in at least one field to search.');
                return;
            }

            // Filter data from our localStorage-backed variable
            const results = db_books.filter(book => 
                book.isAvailable &&
                (!bookName || book.title.toLowerCase().includes(bookName.toLowerCase())) &&
                (!authorName || book.author.toLowerCase().includes(authorName.toLowerCase())) &&
                (!category || book.category === category)
            );
            
            // 10.2: Search Results
            const tableBody = document.getElementById('results-table-body');
            tableBody.innerHTML = ''; // Clear old results
            
            if (results.length > 0) {
                results.forEach(book => {
                    tableBody.innerHTML += `
                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td class="px-6 py-4 whitespace-nowrap">${book.title}</td>
                            <td class="px-6 py-4 whitespace-nowrap">${book.author}</td>
                            <td class="px-6 py-4 whitespace-nowrap">${book.serial}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <input type="radio" name="selected-book" class="form-radio text-blue-600" value="${book.serial}">
                            </td>
                        </tr>
                    `;
                });
            } else {
                tableBody.innerHTML = '<tr><td colspan="4" class="px-6 py-4 text-center text-gray-500">No available books found.</td></tr>';
            }
            showPage('page-reports-results');
        });

        // 10.2 (continued): Button on Search Results page
        document.getElementById('btn-issue-selected').addEventListener('click', () => {
            const selectedRadio = document.querySelector('input[name="selected-book"]:checked');
            if (!selectedRadio) {
                showToast('Please select a book to issue.', true);
                return;
            }
            
            const selectedSerial = selectedRadio.value;
            const book = db_books.find(b => b.serial === selectedSerial);
            
            if (book) {
                showPage('page-transactions-issue');
                // *** LOGIC CHANGE HERE: Pre-fill the NEW form fields ***
                document.getElementById('issue-serial-no').value = book.serial;
                document.getElementById('issue-book-name').value = book.title;
                document.getElementById('issue-author-name').value = book.author;
            }
        });
        
        // 10.3: Book Issue
        function setupIssueDateFields() {
            const issueDateEl = document.getElementById('issue-date');
            const returnDateEl = document.getElementById('issue-return-date');
            
            // Issue Date - cannot be lesser than today.
            issueDateEl.value = today;
            issueDateEl.min = today;
            
            // Return Date - automatically populated 15 days ahead.
            returnDateEl.value = todayPlus15;
            
            // Listen for changes on Issue Date
            issueDateEl.addEventListener('change', () => {
                const selectedIssueDate = new Date(issueDateEl.value);
                
                // Return Date - automatically populated 15 days ahead.
                const newReturnDate = new Date(selectedIssueDate.getTime() + 15 * 24 * 60 * 60 * 1000);
                const newReturnDateStr = newReturnDate.toISOString().split('T')[0];
                
                returnDateEl.value = newReturnDateStr;
                
                // But not greater than 15 days.
                returnDateEl.min = issueDateEl.value; // Can be edited earlier
                returnDateEl.max = newReturnDateStr; // But not later
            });
            
            // Set initial min/max for return date
            returnDateEl.min = today;
            returnDateEl.max = todayPlus15;
        }
        
        // *** NEW EVENT LISTENER for Serial No. ***
        document.getElementById('issue-serial-no').addEventListener('change', (e) => {
                // Auto-populate author name
            const serial = e.target.value;
            const book = db_books.find(b => b.serial === serial);
            if(book) {
                document.getElementById('issue-book-name').value = book.title;
                document.getElementById('issue-author-name').value = book.author;
                if (!book.isAvailable) {
                    showToast('Warning: This item is already issued.', true);
                }
            } else {
                document.getElementById('issue-book-name').value = 'Item not found';
                document.getElementById('issue-author-name').value = '';
            }
        });

        document.getElementById('form-book-issue').addEventListener('submit', (e) => {
            e.preventDefault();
            clearError('error-book-issue');
            
            // *** LOGIC CHANGE: Validate by Serial, not Name ***
            const serialNo = document.getElementById('issue-serial-no').value;
            const issueDate = document.getElementById('issue-date').value;
            const returnDate = document.getElementById('issue-return-date').value;
            const memberId = document.getElementById('issue-member-id').value.trim();

            let errors = [];
            // Name of book required
            if (!serialNo) errors.push('Serial No. of Book is required.');
            if (!issueDate) errors.push('Issue Date is required.');
            if (!memberId) errors.push('Member ID is required.');
            
            // Check if book exists and is available
            const book = db_books.find(b => b.serial === serialNo);
            if (!book) {
                errors.push('Book not found with this Serial No.');
            } else if (!book.isAvailable) {
                errors.push('This book is already issued.');
            }

            // Check if member exists
            const member = db_members.find(m => m.id === memberId);
            if (!member) {
                errors.push('Member ID not found.');
            }

            if (errors.length > 0) {
                showError('error-book-issue', errors.join(' '));
            } else {
                // --- PERSISTENCE LOGIC ---
                // 1. Mark book as unavailable
                book.isAvailable = false;
                saveToStorage(STORAGE_KEYS.books, db_books);

                // 2. Add to issued records
                db_issued.push({
                    bookSerial: book.serial,
                    memberId: member.id,
                    memberName: member.name,
                    issueDate: issueDate,
                    returnDate: returnDate
                });
                saveToStorage(STORAGE_KEYS.issued, db_issued);
                
                showToast('Book issued successfully!');
                showPage('page-dashboard');
            }
        });

        // 10.4: Return Book
        document.getElementById('return-serial-no').addEventListener('change', (e) => {
            // Auto-populate details based on Serial No.
            const serial = e.target.value;
            const issuedBook = db_issued.find(b => b.bookSerial === serial);
            const bookInfo = db_books.find(b => b.serial === serial);
            
            if (issuedBook && bookInfo) {
                document.getElementById('return-book-name').value = bookInfo.title;
                document.getElementById('return-author-name').value = bookInfo.author;
                document.getElementById('return-issue-date').value = issuedBook.issueDate;
                document.getElementById('return-return-date').value = issuedBook.returnDate;
            } else {
                document.getElementById('return-book-name').value = 'Book not found or not issued';
                document.getElementById('return-author-name').value = '';
                document.getElementById('return-issue-date').value = '';
                document.getElementById('return-return-date').value = '';
            }
        });
        
        document.getElementById('form-book-return').addEventListener('submit', (e) => {
            e.preventDefault();
            clearError('error-book-return');
            
            const bookName = document.getElementById('return-book-name').value;
            const serialNo = document.getElementById('return-serial-no').value;
            
            let errors = [];
            if (!bookName || bookName === 'Book not found or not issued') {
                errors.push('A valid issued book is required.');
            }
            if (!serialNo) {
                errors.push('Serial No. of Book is required.');
            }
            
            const issuedBook = db_issued.find(b => b.bookSerial === serialNo);
            if (!issuedBook) {
                errors.push('This Serial No. does not match an issued book.');
            }
            
            if (errors.length > 0) {
                showError('error-book-return', errors.join(' '));
            } else {
                // Logic to populate Fine Pay page
                const originalReturnDate = document.getElementById('return-return-date').value;
                let fine = 0;
                
                // Check if today is after the original return date
                if (today > originalReturnDate) {
                    const daysOverdue = Math.ceil((new Date(today) - new Date(originalReturnDate)) / (1000 * 60 * 60 * 24));
                    fine = daysOverdue * 1; // $1 per day fine (assumption)
                }

                // Store details for the fine page
                currentFineTransaction = {
                    bookName: bookName,
                    bookSerial: serialNo, // Save the serial for the final transaction
                    memberName: issuedBook.memberName || 'N/A',
                    calculatedFine: fine
                };
                
                // Populate Fine Pay page fields
                document.getElementById('fine-book-name').textContent = currentFineTransaction.bookName;
                document.getElementById('fine-member-name').textContent = currentFineTransaction.memberName;
                document.getElementById('fine-calculated').textContent = `$${currentFineTransaction.calculatedFine.toFixed(2)}`;
                document.getElementById('fine-paid').checked = false; // Reset checkbox
                
                // With the confirm option used the user is taken to the Pay Fine page
                showPage('page-transactions-fine');
            }
        });

        // 10.5: Fine Pay
        document.getElementById('form-fine-pay').addEventListener('submit', (e) => {
            e.preventDefault();
            clearError('error-fine-pay');
            
            const isFinePending = currentFineTransaction.calculatedFine > 0;
            const isFinePaid = document.getElementById('fine-paid').checked;

            // For a pending fine, the paid fine check box needs to be selected
            if (isFinePending && !isFinePaid) {
                showError('error-fine-pay', 'Fine is pending. Please check "Fine Paid" to complete the transaction.');
                return;
            }
            
            // --- PERSISTENCE LOGIC ---
            // 1. Mark book as available again
            const book = db_books.find(b => b.serial === currentFineTransaction.bookSerial);
            if (book) {
                book.isAvailable = true;
                saveToStorage(STORAGE_KEYS.books, db_books);
            }

            // 2. Remove from issued records
            db_issued = db_issued.filter(b => b.bookSerial !== currentFineTransaction.bookSerial);
            saveToStorage(STORAGE_KEYS.issued, db_issued);

            // If no calculated fine, user can press confirm
            showToast('Transaction completed successfully. Book is returned.');
            showPage('page-dashboard');
        });
        
        // 10.6: Add Membership
        document.getElementById('form-add-membership').addEventListener('submit', (e) => {
            e.preventDefault();
            clearError('error-add-membership');
            
            const name = document.getElementById('add-member-name').value;
            const email = document.getElementById('add-member-email').value;
            const phone = document.getElementById('add-member-phone').value;
            const duration = document.querySelector('input[name="member-duration"]:checked').value;

            // All fields mandatory
            if (!name || !email || !phone) {
                showError('error-add-membership', 'All fields are mandatory.');
                return;
            }
            
            // --- PERSISTENCE LOGIC ---
            const newId = 'M' + (db_members.length + 1002); // Simple unique ID
            const expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + parseInt(duration));
            
            const newMember = {
                id: newId,
                name: name,
                email: email,
                phone: phone,
                expiry: expiryDate.toISOString().split('T')[0]
            };
            
            db_members.push(newMember);
            saveToStorage(STORAGE_KEYS.members, db_members);
            
            showToast(`Membership added successfully! New ID: ${newId}`);
            showPage('page-maintenance');
        });
        
        // 10.7: Update Membership
        document.getElementById('btn-find-member').addEventListener('click', () => {
            clearError('error-update-membership');
            const memberId = document.getElementById('update-member-id').value;
            if (!memberId) {
                showError('error-update-membership', 'Membership Number is mandatory.');
                return;
            }
            
            const member = db_members.find(m => m.id === memberId);
            if (member) {
                document.getElementById('update-member-name').textContent = member.name;
                document.getElementById('update-member-expiry').textContent = member.expiry;
                document.getElementById('update-member-details').classList.remove('hidden');
            } else {
                showError('error-update-membership', 'Member not found.');
                document.getElementById('update-member-details').classList.add('hidden');
            }
        });
        
        document.getElementById('form-update-membership').addEventListener('submit', (e) => {
            e.preventDefault();
            const memberId = document.getElementById('update-member-id').value;
            const action = document.querySelector('input[name="member-action"]:checked').value;
            
            const memberIndex = db_members.findIndex(m => m.id === memberId);
            
            if (memberIndex === -1) {
                showError('error-update-membership', 'Member not found. Cannot perform action.');
                return;
            }

            if (action === 'extend') {
                // Extend by 6 months from current expiry
                const currentExpiry = new Date(db_members[memberIndex].expiry);
                currentExpiry.setMonth(currentExpiry.getMonth() + 6);
                db_members[memberIndex].expiry = currentExpiry.toISOString().split('T')[0];
                showToast('Membership extended successfully!');
            } else if (action === 'cancel') {
                // Remove member
                db_members.splice(memberIndex, 1);
                showToast('Membership cancelled successfully.');
            }

            // --- PERSISTENCE LOGIC ---
            saveToStorage(STORAGE_KEYS.members, db_members);
            showPage('page-maintenance');
        });
        
        // 10.8: Add Book
        document.getElementById('form-add-book').addEventListener('submit', (e) => {
            e.preventDefault();
            clearError('error-add-book');
            
            const title = document.getElementById('add-book-title').value;
            const author = document.getElementById('add-book-author').value;
            const serial = document.getElementById('add-book-serial').value;
            const category = document.getElementById('add-book-category').value;
            const type = document.querySelector('input[name="add-book-type"]:checked').value;

            // All fields mandatory
            if (!title || !author || !serial || !category) {
                showError('error-add-book', 'All fields are mandatory.');
                return;
            }
            
            // Check for duplicate serial
            if (db_books.find(b => b.serial === serial)) {
                showError('error-add-book', 'Serial No. already exists. Must be unique.');
                return;
            }
            
            // --- PERSISTENCE LOGIC ---
            const newItem = {
                id: db_books.length + 10, // simple unique ID
                title: title,
                author: author,
                serial: serial,
                category: category,
                type: type,
                isAvailable: true
            };

            db_books.push(newItem);
            saveToStorage(STORAGE_KEYS.books, db_books);
            
            showToast('Item added successfully!');
            showPage('page-maintenance');
        });
        
        // 10.9: Update Book
        document.getElementById('btn-find-book').addEventListener('click', () => {
            clearError('error-update-book');
            const serial = document.getElementById('update-book-serial').value;
            if (!serial) {
                showError('error-update-book', 'Serial No. is mandatory.');
                return;
            }
            
            const book = db_books.find(b => b.serial === serial);
            if (book) {
                // Populate fields
                document.getElementById('update-book-title').value = book.title;
                document.getElementById('update-book-author').value = book.author;
                document.getElementById('update-book-category').value = book.category;
                document.querySelector(`input[name="update-book-type"][value="${book.type}"]`).checked = true;
                document.getElementById('update-book-details').classList.remove('hidden');
            } else {
                showError('error-update-book', 'Item not found.');
                document.getElementById('update-book-details').classList.add('hidden');
            }
        });

        document.getElementById('form-update-book').addEventListener('submit', (e) => {
            e.preventDefault();
            clearError('error-update-book');
            
            const serial = document.getElementById('update-book-serial').value;
            const title = document.getElementById('update-book-title').value;
            const author = document.getElementById('update-book-author').value;
            const category = document.getElementById('update-book-category').value;
            const type = document.querySelector('input[name="update-book-type"]:checked').value;


            // All fields mandatory
            if (!title || !author || !category) {
                showError('error-update-book', 'All fields are mandatory.');
                return;
            }
            
            // --- PERSISTENCE LOGIC ---
            const bookIndex = db_books.findIndex(b => b.serial === serial);
            if (bookIndex === -1) {
                    showError('error-update-book', 'Item not found. Cannot update.');
                    return;
            }
            
            db_books[bookIndex] = {
                ...db_books[bookIndex], // Keep id, serial, isAvailable
                title: title,
                author: author,
                category: category,
                type: type
            };
            
            saveToStorage(STORAGE_KEYS.books, db_books);
            
            showToast('Item updated successfully!');
            showPage('page-maintenance');
        });
        
        // 10.10: User Management (--- UPDATED ---)
        
        // Show/hide Member ID field based on Role selection
        userRoleSelect.addEventListener('change', () => {
            if (userRoleSelect.value === 'user') {
                memberIdField.classList.remove('hidden');
            } else {
                memberIdField.classList.add('hidden');
            }
        });

        // Form submit listener
        document.getElementById('form-user-mgt').addEventListener('submit', (e) => {
            e.preventDefault();
            clearError('error-user-mgt');
            
            const name = document.getElementById('user-mgt-name').value.trim();
            const username = document.getElementById('user-mgt-username').value.trim();
            const password = document.getElementById('user-mgt-password').value;
            const role = document.getElementById('user-mgt-role').value;
            const memberId = document.getElementById('user-mgt-member-id').value.trim() || null;

            if (!name || !username || !password) {
                showError('error-user-mgt', 'Name, Username, and Password are mandatory.');
                return;
            }
            
            // Get fresh dbs to perform validation
            db_users = getFromStorage(STORAGE_KEYS.users, mockUsersSeed);
            db_members = getFromStorage(STORAGE_KEYS.members, mockMembersSeed);
            
            // --- Validation ---
            // 1. Check for duplicate username
            if (db_users.find(u => u.username === username)) {
                showError('error-user-mgt', 'This username is already taken.');
                return;
            }
            
            let linkedMemberId = null;
            
            // 2. If role is 'user', validate memberId
            if (role === 'user') {
                if (!memberId) {
                    showError('error-user-mgt', 'A "Member ID" is required for the "User" role.');
                    return;
                }
                
                // 3. Check if memberId exists
                if (!db_members.find(m => m.id === memberId)) {
                    showError('error-user-mgt', `Member ID "${memberId}" not found in the member database.`);
                    return;
                }
                
                // 4. Check if memberId is already linked
                if (db_users.find(u => u.memberId === memberId)) {
                    showError('error-user-mgt', `Member ID "${memberId}" is already linked to another login. Each member can only have one login.`);
                    return;
                }
                linkedMemberId = memberId;
            }
            
            // --- PERSISTENCE LOGIC ---
            const newUser = {
                username: username,
                password: password,
                role: role,
                name: name,
                memberId: linkedMemberId
            };
            
            db_users.push(newUser);
            saveToStorage(STORAGE_KEYS.users, db_users);
            
            showToast('New application user created successfully!');
            showPage('page-maintenance');
        });


        // --- INITIALIZATION ---
        initTheme(); // Set dark/light mode
        updateNav(); // Set initial nav state
        showPage('page-login'); // Show login page first
    });