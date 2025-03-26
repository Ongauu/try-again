// Generate sales report from API
function generateSalesReport(fromDate, toDate, category) {
    const results = document.getElementById('report-results');
    results.innerHTML = '<p>Loading report data...</p>';
    
    let url = `api/reports.php?type=sales&from=${fromDate}&to=${toDate}`;
    if (category !== 'all') {
        url += `&category=${category}`;
    }
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Create report table from data
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
            
            let totalSales = 0;
            let totalRevenue = 0;
            
            data.forEach(product => {
                totalSales += parseInt(product.units_sold) || 0;
                totalRevenue += parseFloat(product.revenue) || 0;
                
                tableHTML += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td>
                        <td>${formatCurrency(product.price)}</td>
                        <td>${product.units_sold || 0}</td>
                        <td>${formatCurrency(product.revenue || 0)}</td>
                    </tr>
                `;
            });
            
            // Add summary
            tableHTML += `
                    </tbody>
                </table>
                
                <div class="report-summary">
                    <h3>Summary</h3>
                    <div class="summary-item">
                        <span>Total Products:</span>
                        <span>${data.length}</span>
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
        })
        .catch(error => {
            console.error('Error generating report:', error);
            results.innerHTML = '<p>Error loading report data. Please try again.</p>';
        });
}

// Implement similar functions for other report types