<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Employee Directory</h1>
        <div class="search-filter">
            <div class="search-bar">
                <input type="text" id="searchInput" placeholder="Search by name or email" aria-label="Search employees">
            </div>
            <button class="filter-btn" onclick="toggleFilter()">Filter</button>
        </div>
        <div class="sort-controls">
            <label for="sortField">Sort by:</label>
            <select id="sortField" onchange="applySort()">
                <option value="">None</option>
                <option value="firstName">Name</option>
                <option value="department">Department</option>
            </select>
            <button onclick="toggleSortDirection()">Toggle Direction</button>
        </div>
        <button onclick="showAddForm()">Add Employee</button>
        <div class="form-container" id="employeeForm">
            <h2 id="formTitle">Add Employee</h2>
            <form id="addEditForm">
                <input type="hidden" id="employeeId">
                <label>First Name: <input type="text" id="firstName" required aria-required="true"></label>
                <span class="error" id="firstNameError"></span>
                <label>Last Name: <input type="text" id="lastName" required aria-required="true"></label>
                <span class="error" id="lastNameError"></span>
                <label>Email: <input type="email" id="email" required aria-required="true"></label>
                <span class="error" id="emailError"></span>
                <label>Department: <select id="department" required aria-required="true">
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Sales">Sales</option>
                </select></label>
                <label>Role: <select id="role" required aria-required="true">
                    <option value="Manager">Manager</option>
                    <option value="Developer">Developer</option>
                    <option value="Analyst">Analyst</option>
                </select></label>
                <button type="button" onclick="cancelForm()">Cancel</button>
                <button type="submit">Add</button>
            </form>
        </div>
        <div class="employee-grid" id="employeeGrid">
            <!-- Employees will be populated dynamically by JavaScript -->
        </div>
        <div class="pagination">
            <select id="pageSize" onchange="renderEmployees()" aria-label="Items per page">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
            <button onclick="prevPage()">Previous</button>
            <button onclick="nextPage()">Next</button>
        </div>
    </div>
    <!-- Modal Overlay and Filter Popup -->
    <div class="modal-overlay" id="modalOverlay">
        <div class="filter-modal" id="filterPopup" role="dialog" aria-labelledby="filterTitle">
            <h3 id="filterTitle">Filter Employees</h3>
            <div class="filter-content">
                <label for="filterFirstName">First Name:</label>
                <input type="text" id="filterFirstName" aria-label="Filter by first name">
                <label for="filterDepartment">Department:</label>
                <select id="filterDepartment" aria-label="Filter by department">
                    <option value="">All</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Sales">Sales</option>
                </select>
                <label for="filterRole">Role:</label>
                <select id="filterRole" aria-label="Filter by role">
                    <option value="">All</option>
                    <option value="Manager">Manager</option>
                    <option value="Developer">Developer</option>
                    <option value="Analyst">Analyst</option>
                </select>
            </div>
            <div class="filter-actions">
                <button onclick="applyFilter()" class="apply-btn">Apply</button>
                <button onclick="resetFilter()" class="reset-btn">Reset</button>
                <button onclick="toggleFilter()" class="close-btn">Close</button>
            </div>
        </div>
    </div>
    <script src="scripts.js"></script>
</body>
</html>
