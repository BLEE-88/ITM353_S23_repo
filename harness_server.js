var products = {
    "Category1": [
        {
            "name": "product1",
            "price": 300,
            "inventory": 15,
            "quantitySold": 0
        },
        {
            "name": "product2",
            "price": 200,
            "inventory": 15,
            "quantitySold": 0
        },
        {
            "name": "product3",
            "price": 100,
            "inventory": 15,
            "quantitySold": 0
        }
    ],
    "Category2": [
        {
            "name": "product1",
            "price": 350,
            "inventory": 15,
            "quantitySold": 0
        },
        {
            "name": "product2",
            "price": 250,
            "inventory": 15,
            "quantitySold": 0
        },
        {
            "name": "product3",
            "price": 150,
            "inventory": 15,
            "quantitySold": 0
        }
    ]
}

var user_data = {
        "admin@hawaii.edu": {
            "name": "Admin"
        },
        "itm352@hawaii.edu": {
            "name": "grader"
        },
        "bvt@hawaii.edu": {
            "name": "Vy Tran"
        }
}

let today = new Date();
// Subtract 24 hours in milliseconds (24 * 60 * 60 * 1000) to get yesterday's date
let yesterday = new Date(today - 86400000);

// Subtract 48 hours in milliseconds (48 * 60 * 60 * 1000) to get 2 days ago
let twoDaysAgo = new Date(today - 172800000);

// Subtract 72 hours in milliseconds (72 * 60 * 60 * 1000) to get 3 days ago
let threeDaysAgo = new Date(today - 259200000);

// Subtract 96 hours in milliseconds (96 * 60 * 60 * 1000) to get 4 days ago
let fourDaysAgo = new Date(today - 345600000);


var sales_record = [
    {
        "item_id": products['Category1'][0]['item_id'],
        "customer_id": "0001",
        "date_sold": today, 
        "quantity": 1, 
        "price": 1 * products['Category1'][0]['price']
    },
    {
        "item_id": products['Category1'][1]['item_id'],
        "customer_id": "0002",
        "date_sold": yesterday,
        "quantity": 2,
        "price": 2 * products['Category1'][1]['price']
    },
    {
        "item_id": products['Category1'][2]['item_id'],
        "customer_id": "0003",
        "date_sold": twoDaysAgo,
        "quantity": 3,
        "price": 3 * products['Category1'][2]['price']
    },
    {
        "item_id": products['Category2'][0]['item_id'],
        "customer_id": "0003",
        "date_sold": threeDaysAgo,
        "quantity": 1,
        "price": 1 * products['Category2'][0]['price']
    },
    {
        "item_id": products['Category2'][1]['item_id'],
        "customer_id": "0003",
        "date_sold": fourDaysAgo,
        "quantity": 2,
        "price": 2 * products['Category2'][1]['price']
    }
]

// Assign customer_id to users
var idNumber = 0;
// For every user that is already in the system
for (let users in user_data) {
    // Assign an ID to each user that has 4 digits
    user_data[users].customer_id = idNumber.toString().padStart(4, '0');
    idNumber++;
}

// Assign item_id to products
let itemNumber = 0;
// For every category in products
for (let category in products) {
    // Create a quantitySold key for each product
        // Commented out because manual assignment of quantity sold will be placed in products
    // products[category].forEach((prod, i) => {prod.quantitySold = 0});

    // Create an item_id for each product
    products[category].forEach((prod, i) => {
        prod.item_id = itemNumber.toString().padStart(4, '0');
        itemNumber++;
    });
    
}

// Test variables
var test_item_id = "*";
var test_discount = 10; // Insert a number between -99 and 99
var test_dynamic = false; // If dynamic is false, then apply test_discount; if not, do not apply test_discount

// To validate the products array
function validateProducts(products) {
    var err;
    if (products.length == 0) {
        err = "Products is empty";
    }
    for (let category in products) {
        if (products[category].length == 0) {
            err = "This category is empty."
        }
    }
}

function set_price(item_id, products, sales_record, discount, dynamic) {
    // Check if the selected product is *
    if (item_id === "*") {
        console.log(`Selected product is * - applying discount to all products`);

        for (let category in products) { // For each category in the products object
            for (let i = 0; i < products[category].length; i++) {
                let product = products[category][i];
                let calculatedDiscount = 0;

                if (dynamic) { // If dynamic pricing was selected
                    console.log(`Dynamic pricing was selected`)

                    // Assume that the product's last sale date is null (meaning it has not been sold)
                    let lastSaleTime = null; 
                    
                    let currentDate = new Date(); // Get the current date
                    console.log(`The current date is: ${currentDate}`);

                    for (let i = sales_record.length - 1; i >= 0; i--) { // Loop through sales_record
                        let sale = sales_record[i]; // For every sale in the sales record

                        // If the item_id in the sales record matches the one from the admin's form submission
                        if (sale['item_id'] == product['item_id']) {
                            lastSaleTime = new Date(sale.date_sold); // Log the last sale time of the product
                            console.log(`The last time that ${product['name']} was sold is: ${lastSaleTime}.`);
                            break;
                        }
                    }

                    // If the last sale time exists (meaning the product was sold before)
                    if (lastSaleTime) {
                        // Calculate the number of hrs it has been since the last sale
                        let hoursSinceLastSale = Math.floor((currentDate - lastSaleTime) / (1000 * 60 * 60));

                        console.log(`It has been ${hoursSinceLastSale} hrs since ${product['name']} has been sold.`)
                        
                        // Apply the dynamic discount table
                        if (hoursSinceLastSale >= 96) {
                            calculatedDiscount = 95;
                            console.log(`A ${calculatedDiscount}% discount has been applied to ${product['name']}.`);
                        } else if (hoursSinceLastSale >= 72) {
                            calculatedDiscount = 60;
                            console.log(`A ${calculatedDiscount}% discount has been applied to ${product['name']}.`);
                        } else if (hoursSinceLastSale >= 48) {
                            calculatedDiscount = 30;
                            console.log(`A ${calculatedDiscount}% discount has been applied to ${product['name']}.`);
                        } else if (hoursSinceLastSale >= 24) {
                            calculatedDiscount = 10;
                            console.log(`A ${calculatedDiscount}% discount has been applied to ${product['name']}.`);
                        } else {
                            discount = 0;
                            console.log(`A ${calculatedDiscount}% discount has been applied to ${product['name']} because it has not been >= 24 hrs since it was last sold.`);
                        }
                    }
                    // If there has been no sales history for the selected product
                    else {
                        console.log(`${product['name']} has not been sold.`)
                        calculatedDiscount = 0;
                    }
                    product.price *= (1 - calculatedDiscount / 100);
                    product.price = Number(product.price.toFixed(2));
                }
                else {
                    console.log(`Dynamic pricing was not selected.`)
                    if (discount >= -99 && discount <= 99) {
                        // Update the product's price with the custom discount
                        product.price = Number((product.price *= (1 - discount / 100)).toFixed(2));
                    } else {
                        console.log("Invalid discount amount.");
                    }
                }
            }
        }
    }
    // Check if the selected product a singular product
    else {
        // Find the selected product within each category array
        let selectedProduct = null;

        for (let category in products) { // For each category in the products object
            // For each product in the category array
            // If the item_id from the dropdown form matches with the one in the products object
            
            selectedProduct = products[category].find(product => Number(product.item_id) === Number(item_id));
            if (selectedProduct) {
                console.log(`Selected product (${selectedProduct['name']}) with item id (${item_id}) exists within the products file`)
                break;
            }
        }
        
        // If the selected product exists
        if (selectedProduct) {
            // If dynamic pricing was selected
            if (dynamic) {
                console.log(`Dynamic pricing was selected`);

                // Assume that the product's last sale date is null (meaning it has not been sold)
                let lastSaleTime = null;
                
                // Get the current date
                let currentDate = new Date();
                console.log(`The current date is: ${currentDate}`);

                // Loop through sales_record
                for (let i = sales_record.length - 1; i >= 0; i--) {
                    // For every sale in the sales record
                    let sale = sales_record[i];

                    // If the item_id in the sales record matches the one from the admin's form submission
                    if (Number(sale.item_id) === Number(item_id)) {
                        // Log the last sale time of the product
                        lastSaleTime = new Date(sale.date_sold);
                        console.log(`The last time that ${selectedProduct['name']} was sold is: ${lastSaleTime}.`);
                        break;
                    }
                }
                
                let calculatedDiscount = 0;

                // If the last sale time exists (meaning the product was sold before)
                if (lastSaleTime) {
                    // Calculate the number of hrs it has been since the last sale
                    let hoursSinceLastSale = Math.floor((currentDate - lastSaleTime) / (1000 * 60 * 60));
                    
                    console.log(`It has been ${hoursSinceLastSale} since ${selectedProduct['name']} has been sold.`)
                    
                    // Apply the dynamic discount table
                    if (hoursSinceLastSale >= 96) {
                        calculatedDiscount = 95;
                        console.log(`A ${calculatedDiscount}% discount has been applied to ${selectedProduct['name']}.`);
                    } else if (hoursSinceLastSale >= 72) {
                        calculatedDiscount = 60;
                        console.log(`A ${calculatedDiscount}% discount has been applied to ${selectedProduct['name']}.`);
                    } else if (hoursSinceLastSale >= 48) {
                        calculatedDiscount = 30;
                        console.log(`A ${calculatedDiscount}% discount has been applied to ${selectedProduct['name']}.`);
                    } else if (hoursSinceLastSale >= 24) {
                        calculatedDiscount = 10;
                        console.log(`A ${calculatedDiscount}% discount has been applied to ${selectedProduct['name']}.`);
                    } else {
                        discount = 0;
                        console.log(`A ${calculatedDiscount}% discount has been applied to ${selectedProduct['name']} because it has not been >= 24 hrs since it was last sold.`);
                    }
                }
                // If there has been no sales history for the selected product
                else {
                    console.log(`${selectedProduct['name']} has not been sold.`)
                    calculatedDiscount = 0;
                }
                selectedProduct.price *= (1 - calculatedDiscount / 100);
                selectedProduct.price = Number(selectedProduct.price.toFixed(2));
            } 
            // If dynamic pricing is not selected, validate the entered discount amount
            else {
                console.log(`Dynamic pricing was not selected.`)
                if (discount >= -99 && discount <= 99) {
                    console.log(`The discount amount is: ${discount}%`);

                    
                    console.log(`${selectedProduct['name']}'s price went from $${selectedProduct.price} to $${selectedProduct.price *= Number((1 - discount / 100).toFixed(2))}`);

                    // Update the product's price with the custom discount
                    selectedProduct.price = Number((selectedProduct.price *= (1 - discount / 100)).toFixed(2));
                } else {
                    console.log("Invalid discount amount.");
                }
            }
            
            for (let category in products) {
                let index = products[category].findIndex(product => Number(product.item_id) === item_id);
                if (index !== -1) {
                    products[category][index].price = selectedProduct.price;
                    break;
                }
            }
        } 
        else {
            console.log("Selected product does not exist.");
        }
    } 
}

const express = require('express');
const app = express();

app.all('*', function (request, response, next) {
    // Console log as a diagnostic
    console.log(request.method + ' to ' + request.path);
    next();
});

app.use(express.urlencoded({extended: true}));

app.get("/set_price", function (request, response) {
    var selectedP = request.body.productDropdown;
    if (!selectedP === '*') {
        var item_id = Number(request.body.productDropdown);
    }
    else {
        var item_id = selectedP;
    }
    
    var discount = Number(request.body.discountInput);
    var dynamic = request.body.dynamicPricing;
    
    var result = set_price(item_id, products, sales_record, discount, dynamic);
    // Construct the HTML response with the result
    var html = '<html><body>';
    html += '<h2>Result:</h2>';
    html += '<p>' + result + '</p>';
    html += '<a href="/display_products.html">Go back to products</a>';
    html += '</body></html>';

    // Send the HTML response back to the client
    response.send(html);
})


// Route all other GET requests to files and images in public 
app.use(express.static(__dirname + '/test_harness'));

// Start server
app.listen(8080, () => console.log(`listening on port 8080`));

