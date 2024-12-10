const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const cookieParser = require('cookie-parser');  // Import cookie-parser

const app = express();
const port = 5001;

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origin.startsWith('http://localhost')) {
            callback(null, true); // Allow requests from any localhost port
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true  // Ensure credentials are allowed if needed
}));

app.use(express.json());  // Parse JSON bodies
app.use(cookieParser());  // Initialize cookie-parser to handle cookies

// MySQL Connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', // Default XAMPP MySQL user
    password: '', // Default no password for XAMPP
    database: 'culinareat_db', // Your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API Route to Register a User
app.post('/register', (req, res) => {
    const { FName, LName, Email, UserName, Password, Role, Area } = req.body;

    const sql = 'INSERT INTO User (FName, LName, Email, UserName, Password, Role, Area) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [FName, LName, Email, UserName, Password, Role, Area], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);  // Log the entire error for debugging

            // Detect duplicate entry errors
            if (err.code === 'ER_DUP_ENTRY') {
                console.log('Duplicate entry detected:', err.sqlMessage);

                if (err.sqlMessage.includes("'Email'")) {
                    return res.status(400).json({ message: 'Email already exists' });
                }
                if (err.sqlMessage.includes("'UserName'")) {
                    return res.status(400).json({ message: 'Username already exists' });
                }
            }

            return res.status(500).json({ message: 'Database error', error: err.sqlMessage });
        }

        res.status(201).json({ message: 'User registered successfully', userID: result.insertId });
    });
});

// API Route to Login a User
app.post('/login', (req, res) => {
    const { UserName, Password } = req.body;

    // Query to find the user by username
    const sql = 'SELECT * FROM User WHERE UserName = ?';

    db.query(sql, [UserName], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        const user = results[0];

        // Check if the password matches (ideally you'd hash and compare hashed passwords)
        if (user.Password !== Password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Authentication successful, set session cookie (HttpOnly for security)
        res.cookie('session_token', user.UserName, {  // Use a token in real cases
            httpOnly: true,  // Makes the cookie inaccessible to client-side JavaScript
            secure: false,   // Set to true if you're using HTTPS
            maxAge: 24 * 60 * 60 * 1000  // 1 day expiration
        });

        res.status(200).json({ message: 'Login successful', user: { UserName: user.UserName, Role: user.Role } });
    });
});

// Route to check session (if user is logged in based on the session token)
app.get('/session', (req, res) => {
    const sessionToken = req.cookies.session_token;
    
    if (!sessionToken) {
        return res.status(401).json({ message: 'Not logged in' });
    }

    // Verify if the user exists in the database by session token (UserName in this case)
    const sql = 'SELECT * FROM User WHERE UserName = ?';

    db.query(sql, [sessionToken], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Session invalid' });
        }

        res.status(200).json({ message: 'Session valid', user: { UserName: results[0].UserName, Role: results[0].Role } });
    });
});

// API Route to Logout a User
app.post('/logout', (req, res) => {
    res.clearCookie('session_token');  // Clear the session cookie
    res.status(200).json({ message: 'Logout successful' });
});

// API Route to get all measures
app.get('/measures', (req, res) => {
    const sql = 'SELECT * FROM Measure';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching measures:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json(results);
    });
});


// Handle preflight requests for all routes
app.options('*', cors());  // Make sure preflight requests are allowed

// Start the server
app.listen(port, () => {
    console.log('Server running on port ${port}');
});


app.post('/add-recipe', (req, res) => {
    const { recipeName, recipeDescription, skillLevel, preparationTime, instructions, ingredients, labels, themes } = req.body;

    if (!recipeName || !preparationTime || !skillLevel) {
        console.error('Validation Error:', { recipeName, preparationTime, skillLevel });
        return res.status(400).json({ message: 'Missing required fields.', details: { recipeName, preparationTime, skillLevel } });
    }

    if (!Array.isArray(ingredients) || !Array.isArray(labels) || !Array.isArray(themes)) {
        console.error('Invalid Data Structure:', { ingredients, labels, themes });
        return res.status(400).json({ message: 'Invalid data structure.', details: { ingredients, labels, themes } });
    }

    console.log('Valid payload. Proceeding with SQL query...');

    // Validate preparationTime format (HH:MM)
    const timeRegex = /^([0-9]{1,2}):([0-5][0-9])$/; // Matches HH:MM
    if (!timeRegex.test(preparationTime)) {
        return res.status(400).json({ message: 'Invalid preparation time format. Use HH:MM.' });
    }

    // Extract hours and minutes
    const [hours, minutes] = preparationTime.split(':').map(Number);
    if (hours > 48 || (hours === 48 && minutes > 0)) {
        return res.status(400).json({ message: 'Maximum preparation time is 48:00.' });
    }

    // Convert to TIME format for database (HH:MM:SS)
    const prepTimeFormatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;

    // SQL query for inserting the recipe
    const insertRecipeSQL = `
        INSERT INTO Recipe (RecipeTitle, RecipeDescription, SkillLevel, PreparationTime, RecipeInstructions, AuthorID)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        insertRecipeSQL,
        [recipeName, recipeDescription || null, skillLevel, prepTimeFormatted, instructions || null, null],
        (err, result) => {
            if (err) {
                console.error('Error inserting recipe:', err);
                return res.status(500).json({ message: 'Database error while adding recipe.', error: err });
            }

            const recipeID = result.insertId; // Get the inserted RecipeID
            console.log('Recipe inserted with ID:', recipeID);

            // Call the function to handle ingredients, labels, and themes
            addIngredientsAndSubstitutes(recipeID, ingredients, labels, themes, res);
        }
    );
});

const addIngredientsAndSubstitutes = (recipeID, ingredients, labels, themes, res) => {
    const insertIngredientSQL = `INSERT IGNORE INTO Ingredient (IngredientName) VALUES (?)`;
    const insertRecipeIngredientSQL = `
        INSERT INTO RecipeIngredient (RecipeID, IngredientID, Quantity, MeasureID, SubstituteIngredientID, IsSubstitute)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const insertSubstituteSQL = `INSERT IGNORE INTO SubstituteIngredient (SubIngName) VALUES (?)`;

    ingredients.forEach((ingredient) => {
        // Insert the primary ingredient
        db.query(insertIngredientSQL, [ingredient.name], (err, result) => {
            if (err) {
                console.error('Error adding ingredient:', err);
                return res.status(500).json({ message: 'Error adding ingredient.', error: err });
            }

            const ingredientID = result.insertId || result[0]?.IngredientID;

            // Link the primary ingredient to the recipe
            db.query(
                insertRecipeIngredientSQL,
                [recipeID, ingredientID, ingredient.quantity, ingredient.measure, null, false],
                (err) => {
                    if (err) {
                        console.error('Error linking ingredient to recipe:', err);
                        return res.status(500).json({ message: 'Error linking ingredient to recipe.', error: err });
                    }

                    // Insert substitutes for the primary ingredient
                    ingredient.substitutes.forEach((sub) => {
                        db.query(insertSubstituteSQL, [sub.name], (err, subResult) => {
                            if (err) {
                                console.error('Error adding substitute ingredient:', err);
                                return res.status(500).json({ message: 'Error adding substitute ingredient.', error: err });
                            }

                            const substituteID = subResult.insertId || subResult[0]?.SubIngID;

                            // Link the substitute to the primary ingredient in RecipeIngredient
                            db.query(
                                insertRecipeIngredientSQL,
                                [recipeID, ingredientID, sub.quantity, sub.measure, substituteID, true],
                                (err) => {
                                    if (err) {
                                        console.error('Error linking substitute ingredient to recipe:', err);
                                        return res.status(500).json({ message: 'Error linking substitute ingredient to recipe.', error: err });
                                    }
                                }
                            );
                        });
                    });
                }
            );
        });
    });

    // Once all ingredients and substitutes are added, handle labels and themes
    addLabelsAndThemes(recipeID, labels, themes, res);
};

const addLabelsAndThemes = (recipeID, labels, themes, res) => {
    const linkLabelSQL = `
        INSERT INTO RecipeLabel (RecipeID, LabelID)
        SELECT ?, LabelID FROM Label WHERE LabelName = ?
    `;
    const linkThemeSQL = `
        INSERT INTO ThemeOfRecipe (RecipeID, ThemeID)
        SELECT ?, ThemeID FROM Theme WHERE ThemeName = ?
    `;

    // Link labels
    labels.forEach((label) => {
        db.query(linkLabelSQL, [recipeID, label], (err) => {
            if (err) {
                console.error('Error linking label:', err);
                return res.status(500).json({ message: 'Error linking label.', error: err });
            }
        });
    });

    // Link themes
    themes.forEach((theme) => {
        db.query(linkThemeSQL, [recipeID, theme], (err) => {
            if (err) {
                console.error('Error linking theme:', err);
                return res.status(500).json({ message: 'Error linking theme.', error: err });
            }
        });
    });

    res.status(201).json({ message: 'Recipe added successfully!' });
};
