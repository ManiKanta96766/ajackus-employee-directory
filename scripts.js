// Mock data
let employees = [
    { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", department: "HR", role: "Manager" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", department: "Engineering", role: "Developer" },
    { id: 3, firstName: "Bob", lastName: "Johnson", email: "bob.johnson@example.com", department: "Sales", role: "Analyst" }
];
let currentPage = 1;
let pageSize = 10;
let filteredEmployees = [...employees];

// Wait for DOM to load

    console.log("DOM fully loaded and parsed"); // Debug log

    // Form handling
    const form = document.getElementById('addEditForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Form submit triggered"); // Debug log
            if (validateForm()) {
                saveEmployee();
            }
        });
    }

    // Validates form inputs
    function validateForm() {
        let isValid = true;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        document.getElementById('firstNameError').textContent = firstName ? '' : 'First Name is required';
        document.getElementById('lastNameError').textContent = lastName ? '' : 'Last Name is required';
        document.getElementById('emailError').textContent = emailRegex.test(email) ? '' : 'Valid email is required';

        if (!firstName || !lastName || !emailRegex.test(email)) {
            isValid = false;
        }
        return isValid;
    }

    // Saves or updates an employee
    function saveEmployee() {
        console.log("Save Employee triggered"); // Debug log
        const employeeId = document.getElementById('employeeId').value;
        const employee = {
            id: employeeId ? parseInt(employeeId) : filteredEmployees[filteredEmployees.length -1].id+ 1,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            department: document.getElementById('department').value,
            role: document.getElementById('role').value
        };

        if (employeeId) {
            const index = employees.findIndex(emp => emp.id === parseInt(employeeId));
            employees[index] = employee;
        } else {
            employees.push(employee);
        }
        filteredEmployees = [...employees];
        renderEmployees();
        cancelForm();
    }

    // Edits an existing employee
    function editEmployee(id) {
        console.log("Edit Employee triggered for ID:", id); // Debug log
        const employee = employees.find(emp => emp.id === id);
        if (!employee) {
            alert('Employee not found');
            return;
        }
        document.getElementById('formTitle').textContent = 'Edit Employee';
        document.getElementById('employeeId').value = employee.id;
        document.getElementById('firstName').value = employee.firstName;
        document.getElementById('lastName').value = employee.lastName;
        document.getElementById('email').value = employee.email;
        document.getElementById('department').value = employee.department;
        document.getElementById('role').value = employee.role;
        document.getElementById('employeeForm').style.display = 'block';
    }

    // Deletes an employee
    function deleteEmployee(id) {
        console.log("Delete Employee triggered for ID:", id); // Debug log
        if (confirm('Are you sure you want to delete this employee?')) {
            employees = employees.filter(emp => emp.id !== id);
            filteredEmployees = [...employees];
            renderEmployees();
        }
    }

    // Shows the add employee form
    function showAddForm() {
        console.log("Show Add Form triggered"); // Debug log
        document.getElementById('formTitle').textContent = 'Add Employee';
        document.getElementById('addEditForm').reset();
        document.getElementById('employeeId').value = '';
        document.getElementById('employeeForm').style.display = 'block';
    }

    // Cancels the form and resets it
    function cancelForm() {
        console.log("Cancel Form triggered"); // Debug log
        document.getElementById('employeeForm').style.display = 'none';
        document.getElementById('addEditForm').reset();
        clearErrors();
    }

    // Clears form error messages
    function clearErrors() {
        document.getElementById('firstNameError').textContent = '';
        document.getElementById('lastNameError').textContent = '';
        document.getElementById('emailError').textContent = '';
    }

    // Toggles the filter modal
    function toggleFilter() {
        console.log("Toggle Filter triggered"); // Debug log
        const overlay = document.getElementById('modalOverlay');
        const popup = document.getElementById('filterPopup');
        if (overlay && popup) {
            overlay.classList.toggle('active');
            popup.classList.toggle('active');
        }
    }

    // Applies filters to the employee list
    function applyFilter() {
        console.log("Apply Filter triggered"); // Debug log
        const firstName = document.getElementById('filterFirstName').value.toLowerCase();
        const department = document.getElementById('filterDepartment').value;
        const role = document.getElementById('filterRole').value;

        filteredEmployees = employees.filter(emp => {
            return (!firstName || emp.firstName.toLowerCase().includes(firstName)) &&
                   (!department || emp.department === department) &&
                   (!role || emp.role === role);
        });
        currentPage = 1;
        renderEmployees();
        toggleFilter();
    }

    // Handles search input
    document.getElementById('searchInput').addEventListener('input', function(e) {
        console.log("Search input triggered"); // Debug log
        const search = e.target.value.toLowerCase();
        filteredEmployees = employees.filter(emp =>
            emp.firstName.toLowerCase().includes(search) ||
            emp.lastName.toLowerCase().includes(search) ||
            emp.email.toLowerCase().includes(search)
        );
        currentPage = 1;
        renderEmployees();
    });
    function resetFilter() {
        console.log("Reset Filter triggered"); // Debug log
        document.getElementById('filterFirstName').value = '';
        document.getElementById('filterDepartment').value = '';
        document.getElementById('filterRole').value = '';
        filteredEmployees = [...employees];
        currentPage = 1;
        renderEmployees();
    }

    // Renders the employee grid with pagination
    function renderEmployees() {
        pageSize = parseInt(document.getElementById('pageSize').value);
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const paginatedEmployees = filteredEmployees.slice(start, end);

        const grid = document.getElementById('employeeGrid');
        grid.innerHTML = '';
        paginatedEmployees.forEach(employee => {
            const div = document.createElement('div');
            div.className = 'employee-card';
            div.dataset.id = employee.id;
            div.innerHTML = `
                <p><strong>ID:</strong> ${employee.id}</p>
                <p><strong>Name:</strong> ${employee.firstName} ${employee.lastName}</p>
                <p><strong>Email:</strong> ${employee.email}</p>
                <p><strong>Department:</strong> ${employee.department}</p>
                <p><strong>Role:</strong> ${employee.role}</p>
                <button onclick="editEmployee(${employee.id})">Edit</button>
                <button onclick="deleteEmployee(${employee.id})">Delete</button>
            `;
            grid.appendChild(div);
        });
    }

    // Navigates to the previous page
    function prevPage() {
        console.log("Previous Page triggered"); // Debug log
        if (currentPage > 1) {
            currentPage--;
            renderEmployees();
        }
    }

    // Navigates to the next page
    function nextPage() {
        console.log("Next Page triggered"); // Debug log
        if (currentPage * pageSize < filteredEmployees.length) {
            currentPage++;
            renderEmployees();
        }
    }

    // Initial render
    renderEmployees();
