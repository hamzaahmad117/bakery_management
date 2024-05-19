import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import connection from './connection.js';

const app = express();
app.use(cors());

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Define the port
const port = process.env.PORT || 8000;

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});

// Define the LOGIN route
app.post('/login', (req, res) => {
    console.log("inside post app");
    const { username, password } = req.body;
    console.log(username);
    console.log(password);

    // Query the database to check if the username and password match
    const query = `SELECT email, LName, FName FROM Customer WHERE email = ? AND password = ?`;
    connection.query(query, [username, password], (error, results) => {
        if (error) {
            console.error('Error querying database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        // Check if any rows were returned
        if (results.length > 0) {
            console.log("logged in");
            // User authenticated successfully
            const user = results[0];
            res.status(200).json({ 
                message: 'Login successful', 
                email: user.email, 
                LName: user.LName, 
                FName: user.FName 
            });
        } else {
            // Username or password is incorrect
            res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});

// POST route for user signup
app.post('/signup', async (req, res) => {
    const { email, password, LName, FName } = req.body;

    if (!email || !password || !LName || !FName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the email already exists
        const checkEmailQuery = 'SELECT * FROM Customer WHERE email = ?';
        connection.query(checkEmailQuery, [email], async (error, results) => {
            if (error) {
                console.error('Error querying the database:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length > 0) {
                // Email already exists
                return res.status(409).json({ message: 'Email already exists' });
            }

            // Insert the new user into the database
            const insertUserQuery = 'INSERT INTO Customer (email, password, LName, FName) VALUES (?, ?, ?, ?)';
            connection.query(insertUserQuery, [email, password, LName, FName], (insertError, insertResults) => {
                if (insertError) {
                    console.error('Error inserting into database:', insertError);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/products', (req, res) => {
    console.log('products route called')
    const query = 'SELECT P_ID, P_Name, P_Desc, P_Price FROM Product';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        res.status(200).json(results);
    });
});

// New route to place an order
app.post('/placeOrder', (req, res) => {
    console.log('order route called')
    const { email, address, phone, date, quantity, p_id, cake_kg } = req.body;

    // First, retrieve the customer ID based on the provided email
    const getCustomerIdQuery = 'SELECT Cust_ID FROM Customer WHERE email = ?';
    connection.query(getCustomerIdQuery, [email], (error, customerResults) => {
        if (error) {
            console.error('Error fetching customer ID:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        if (customerResults.length === 0) {
            res.status(404).json({ message: 'Customer not found' });
            return;
        }

        const custId = customerResults[0].Cust_ID;

        // Then, insert a new record into the OrderPlaced table
        const insertOrderQuery = 'INSERT INTO OrderPlaced (Cust_ID, Emp_ID) VALUES (?, ?)';
        const empId = 1; // Assuming a default employee ID for the sake of this example
        connection.query(insertOrderQuery, [custId, empId], (insertOrderError, orderResults) => {
            if (insertOrderError) {
                console.error('Error inserting order:', insertOrderError);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }

            const orderId = orderResults.insertId;

            // Finally, insert a new record into the OrderBreakdown table
            const insertOrderBreakdownQuery = `
                INSERT INTO OrderBreakdown (O_ID, P_ID, Quantity, delivery_address, delivery_date, customer_phone, cake_weight)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            connection.query(insertOrderBreakdownQuery, [orderId, p_id, quantity, address, date, phone, cake_kg], (insertOrderBreakdownError) => {
                if (insertOrderBreakdownError) {
                    console.error('Error inserting order breakdown:', insertOrderBreakdownError);
                    res.status(500).json({ message: 'Internal server error' });
                    return;
                }

                res.status(201).json({ message: 'Order placed successfully' });
            });
        });
    });
});
