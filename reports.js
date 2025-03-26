// Sample data for reports
const sampleProducts = [
    {id: 1, name: 'Dining Table', category: 'tables', price: 4386000, stock: 15, sales: 26},
    {id: 2, name: 'Office Table', category: 'tables', price: 7675500, stock: 8, sales: 12},
    {id: 3, name: 'Kitchen Table', category: 'tables', price: 3289500, stock: 20, sales: 19},
    {id: 4, name: 'Coffee Table', category: 'tables', price: 4386000, stock: 12, sales: 22},
    {id: 5, name: 'Classroom Desk', category: 'tables', price: 3289500, stock: 30, sales: 45},
    {id: 6, name: 'Double Decker', category: 'beds', price: 10087800, stock: 5, sales: 7},
    {id: 7, name: 'Single Bed', category: 'beds', price: 2631600, stock: 18, sales: 15},
    {id: 8, name: 'Double Bed', category: 'beds', price: 5482500, stock: 10, sales: 12},
    {id: 9, name: 'Farm Chair', category: 'chairs', price: 1535100, stock: 25, sales: 30},
    {id: 10, name: 'Classroom Chair', category: 'chairs', price: 438600, stock: 100, sales: 150},
    {id: 11, name: 'Office Chair', category: 'chairs', price: 1535100, stock: 35, sales: 42},
    {id: 12, name: 'Dining Chair', category: 'chairs', price: 263160, stock: 40, sales: 36},
    {id: 13, name: 'Bench', category: 'chairs', price: 1096500, stock: 20, sales: 18},
    {id: 14, name: 'Blackboard', category: 'boards', price: 1315800, stock: 15, sales: 12},
    {id: 15, name: 'Whiteboard', category: 'boards', price: 1315800, stock: 22, sales: 32}
];

const sampleCustomers = [
    {id: 1, name: 'John Doe', type: 'new', purchases: 2, total: 7017600},
    {id: 2, name: 'Jane Smith', type: 'returning', purchases: 5, total: 12557100},
    {id: 3, name: 'Robert Johnson', type: 'vip', purchases: 12, total: 45872500},
    {id: 4, name: 'Susan Williams', type: 'returning', purchases: 3, total: 4825200},
    {id: 5, name: 'Michael Brown', type: 'new', purchases: 1, total: 10087800},
    {id: 6, name: 'Emily Davis', type: 'vip', purchases: 8, total: 20175600},
    {id: 7, name: 'David Miller', type: 'returning', purchases: 4, total: 6579000},
    {id: 8, name: 'Sarah Wilson', type: 'new', purchases: 2, total: 2631600}
];

// Format currency
function formatCurrency(amount) {
    return 'KSh ' + amount.toLocaleString();
}

// Get current date in YYYY-MM-DD format
function getCurrentDate() {
    const date = new Date();
    return date.toISOString().split('T')[0];
}

// Set default dates to current month
function setDefaultDates() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const fromDateInputs = document.querySelectorAll('input[type="date"][id$="date-from"]');
    const toDateInputs = document.querySelectorAll('input[type="date"][id$="date-to"]');
    
    fromDateInputs.forEach(input => {
        input.value = firstDay.toISOString().split('T')[0];
    });
    
    toDateInputs.forEach(input => {
        input.value = getCurrentDate();
    });
}

// Generate sales report
function generateSalesReport(fromDate, toDate, category) {
    const results = document.getElementById('report-results');
    
    // Filter products by category if needed
    let filteredProducts = sampleProducts;
    if (category !== 'all') {
        filteredProducts = sampleProducts.filter(product => product.category === category);
    }
    
    let totalSales = 0;
    let totalRevenue = 0;
    
    // Create table HTML
    let tableHTML = `
        <h3>Sales Report (${fromDate} to ${toDate})</h3>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Units Sold</th>
                    <th>Revenue</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    filteredProducts.forEach(product => {
        const revenue = product.price * product.sales;
        totalSales += product.sales;
        totalRevenue += revenue;
        
        tableHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td>
                <td>${formatCurrency(product.price)}</td>
                <td>${product.sales}</td>
                <td>${formatCurrency(revenue)}</td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
        
        <div class="report-summary">
            <h3>Summary</h3>
            <div class="summary-item">
                <span>Total Products:</span>
                <span>${filteredProducts.length}</span>
            </div>
            <div class="summary-item">
                <span>Total Units Sold:</span>
                <span>${totalSales}</span>
            </div>
            <div class="summary-item">
                <span>Total Revenue:</span>
                <span>${formatCurrency(totalRevenue)}</span>
            </div>
        </div>
    `;
    
    results.innerHTML = tableHTML;
    enableActionButtons();
}

// Generate inventory report
function generateInventoryReport(status, category) {
    const results = document.getElementById('report-results');
    
    // Filter products by category if needed
    let filteredProducts = sampleProducts;
    if (category !== 'all') {
        filteredProducts = sampleProducts.filter(product => product.category === category);
    }
    
    // Filter by stock status
    if (status !== 'all') {
        filteredProducts = filteredProducts.filter(product => {
            if (status === 'in-stock') return product.stock > 10;
            if (status === 'low-stock') return product.stock > 0 && product.stock <= 10;
            if (status === 'out-of-stock') return product.stock === 0;
            return true;
        });
    }
    
    let totalItems = 0;
    let totalValue = 0;
    
    // Create table HTML
    let tableHTML = `
        <h3>Inventory Report</h3>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    filteredProducts.forEach(product => {
        const value = product.price * product.stock;
        totalItems += product.stock;
        totalValue += value;
        
        let stockClass = '';
        if (product.stock === 0) stockClass = 'text-danger';
        else if (product.stock <= 10) stockClass = 'text-warning';
        
        tableHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td>
                <td>${formatCurrency(product.price)}</td>
                <td class="${stockClass}">${product.stock}</td>
                <td>${formatCurrency(value)}</td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
        
        <div class="report-summary">
            <h3>Summary</h3>
            <div class="summary-item">
                <span>Total Products:</span>
                <span>${filteredProducts.length}</span>
            </div>
            <div class="summary-item">
                <span>Total Items in Stock:</span>
                <span>${totalItems}</span>
            </div>
            <div class="summary-item">
                <span>Total Inventory Value:</span>
                <span>${formatCurrency(totalValue)}</span>
            </div>
        </div>
    `;
    
    results.innerHTML = tableHTML;
    enableActionButtons();
}

// Generate customer report
function generateCustomerReport(customerType, fromDate, toDate) {
    const results = document.getElementById('report-results');
    
    // Filter customers by type if needed
    let filteredCustomers = sampleCustomers;
    if (customerType !== 'all') {
        filteredCustomers = sampleCustomers.filter(customer => customer.type === customerType);
    }
    
    let totalCustomers = filteredCustomers.length;
    let totalPurchases = 0;
    let totalRevenue = 0;
    
    // Create table HTML
    let tableHTML = `
        <h3>Customer Report (${fromDate || 'All Time'} to ${toDate || 'Present'})</h3>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Purchases</th>
                    <th>Total Spent</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    filteredCustomers.forEach(customer => {
        totalPurchases += customer.purchases;
        totalRevenue += customer.total;
        
        tableHTML += `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.type.charAt(0).toUpperCase() + customer.type.slice(1)}</td>
                <td>${customer.purchases}</td>
                <td>${formatCurrency(customer.total)}</td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
        
        <div class="report-summary">
            <h3>Summary</h3>
            <div class="summary-item">
                <span>Total Customers:</span>
                <span>${totalCustomers}</span>
            </div>
            <div class="summary-item">
                <span>Total Purchases:</span>
                <span>${totalPurchases}</span>
            </div>
            <div class="summary-item">
                <span>Total Revenue:</span>
                <span>${formatCurrency(totalRevenue)}</span>
            </div>
            <div class="summary-item">
                <span>Average Spend per Customer:</span>
                <span>${formatCurrency(totalRevenue / totalCustomers)}</span>
            </div>
        </div>
    `;
    
    results.innerHTML = tableHTML;
    enableActionButtons();
}

// Generate financial report
function generateFinancialReport(period, fromDate, toDate) {
    const results = document.getElementById('report-results');
    
    // Calculate total sales and costs
    const totalSales = sampleProducts.reduce((sum, product) => sum + (product.price * product.sales), 0);
    const approximateCosts = totalSales * 0.6; // Assuming 60% cost
    const grossProfit = totalSales - approximateCosts;
    const operatingExpenses = totalSales * 0.2; // Assuming 20% operating expenses
    const netProfit = grossProfit - operatingExpenses;
    const profitMargin = (netProfit / totalSales) * 100;
    
    // Create report HTML
    let reportHTML = `
        <h3>Financial Report (${period.charAt(0).toUpperCase() + period.slice(1)}: ${fromDate} to ${toDate})</h3>
        
        <div class="financial-summary">
            <div class="chart-container">
                <!-- Placeholder for a chart - in a real app, would use a chart library -->
                <div style="height: 200px; background-color: #f1f1f1; display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
                    Chart would appear here
                </div>
            </div>
            
            <table class="report-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Amount</th>
                        <th>% of Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Total Revenue</td>
                        <td>${formatCurrency(totalSales)}</td>
                        <td>100%</td>
                    </tr>
                    <tr>
                        <td>Cost of Goods</td>
                        <td>${formatCurrency(approximateCosts)}</td>
                        <td>60%</td>
                    </tr>
                    <tr>
                        <td>Gross Profit</td>
                        <td>${formatCurrency(grossProfit)}</td>
                        <td>40%</td>
                    </tr>
                    <tr>
                        <td>Operating Expenses</td>
                        <td>${formatCurrency(operatingExpenses)}</td>
                        <td>20%</td>
                    </tr>
                    <tr>
                        <td>Net Profit</td>
                        <td>${formatCurrency(netProfit)}</td>
                        <td>20%</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="report-summary">
                <h3>Financial Highlights</h3>
                <div class="summary-item">
                    <span>Gross Profit Margin:</span>
                    <span>40%</span>
                </div>
                <div class="summary-item">
                    <span>Net Profit Margin:</span>
                    <span>${profitMargin.toFixed(2)}%</span>
                </div>
                <div class="summary-item">
                    <span>Total Products Sold:</span>
                    <span>${sampleProducts.reduce((sum, product) => sum + product.sales, 0)}</span>
                </div>
                <div class="summary-item">
                    <span>Average Sale Value:</span>
                    <span>${formatCurrency(totalSales / sampleCustomers.reduce((sum, customer) => sum + customer.purchases, 0))}</span>
                </div>
            </div>
        </div>
    `;
    
    results.innerHTML = reportHTML;
    enableActionButtons();
}

// Enable report action buttons
function enableActionButtons() {
    document.getElementById('print-report').disabled = false;
    document.getElementById('download-report').disabled = false;
    document.getElementById('email-report').disabled = false;
}

// Set up event listeners for all forms
document.addEventListener('DOMContentLoaded', function() {
    // Set default dates
    setDefaultDates();
    
    // Sales Report Form
    document.getElementById('sales-report-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const fromDate = document.getElementById('sales-date-from').value;
        const toDate = document.getElementById('sales-date-to').value;
        const category = document.getElementById('sales-category').value;
        
        generateSalesReport(fromDate, toDate, category);
    });
    
    // Inventory Report Form
    document.getElementById('inventory-report-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const status = document.getElementById('inventory-status').value;
        const category = document.getElementById('inventory-category').value;
        
        generateInventoryReport(status, category);
    });
    
    // Customer Report Form
    document.getElementById('customer-report-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const customerType = document.getElementById('customer-type').value;
        const fromDate = document.getElementById('customer-date-from').value;
        const toDate = document.getElementById('customer-date-to').value;
        
        generateCustomerReport(customerType, fromDate, toDate);
    });
    
    // Financial Report Form
    document.getElementById('financial-report-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const period = document.getElementById('financial-period').value;
        const fromDate = document.getElementById('financial-date-from').value;
        const toDate = document.getElementById('financial-date-to').value;
        
        generateFinancialReport(period, fromDate, toDate);
    });
    
    // Print Report Button
    document.getElementById('print-report').addEventListener('click', function() {
        window.print();
    });
    
    // Download Report Button (simulated)
    document.getElementById('download-report').addEventListener('click', function() {
        alert('Report would be downloaded as PDF in a real implementation.');
    });
    
    // Email Report Button (simulated)
    document.getElementById('email-report').addEventListener('click', function() {
        alert('Report would be emailed in a real implementation.');
    });
}); 