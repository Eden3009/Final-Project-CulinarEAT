


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

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin); // Allow the specific origin making the request
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow cookies
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed HTTP methods
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With'); // Allowed headers
    next();
});
app.options('*', cors()); // Handle preflight requests

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

const session = require('express-session');

app.use(
  session({
    secret: 'your-secret-key', // Replace with a secure secret
    resave: false, // Prevent session resave if not modified
    saveUninitialized: false, // Do not save uninitialized sessions
    cookie: {
      httpOnly: true, // Helps prevent XSS attacks
      secure: false, // Use `true` for HTTPS
      sameSite: 'lax', // Adjust based on your CORS setup
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);


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
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        const user = results[0];

        // Check if the password matches
        if (user.Password !== Password) {
            return res.status(401).json({ message: 'Invalid password' });

        }
// Set session data
    req.session.user = {
      UserID: user.UserID,
      UserName: user.UserName,
    };

        // Successful login: set a session token (username for simplicity in testing)
        res.cookie('session_token', user.UserName, {
            httpOnly: true,
            secure: false, // Use `true` if using HTTPS
            sameSite: 'lax', // Use 'none' if frontend/backend are on different origins with HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        // Send user details back to the client
        res.status(200).json({
            message: 'Login successful',
            user: {
                UserID: user.UserID, // Include UserID
                UserName: user.UserName,
                Role: user.Role, // Admin, BasicUser, etc.
                Email: user.Email,
            },
        });
    });
});



// Route to check session (if user is logged in based on the session token)
app.get('/session', (req, res) => {
    const sessionToken = req.cookies.session_token;

    if (!sessionToken) {
        return res.status(401).json({ message: 'Not logged in' });
    }

    const sql = 'SELECT UserID, UserName, Role, Email FROM User WHERE UserName = ?';

    db.query(sql, [sessionToken], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid session' });
        }

        // Return full user details, including UserID
        res.status(200).json({
            message: 'Session valid',
            user: {
                UserID: results[0].UserID,
                UserName: results[0].UserName,
                Role: results[0].Role,
                Email: results[0].Email,
            },
        });
    });
});



app.get('/api/recipes', (req, res) => {
    const { themeName } = req.query; // Get the themeName from query parameters

    // Check if themeName is provided
    if (!themeName) {
        return res.status(400).json({ message: 'Theme name is required' });
    }

    const sql = `
        SELECT Recipe.*
        FROM Recipe
        JOIN ThemeOfRecipe ON Recipe.RecipeID = ThemeOfRecipe.RecipeID
        JOIN Theme ON Theme.ThemeID = ThemeOfRecipe.ThemeID
        WHERE Theme.ThemeName = ?
    `;

    db.query(sql, [themeName], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        res.status(200).json({ recipes: results }); // Send the retrieved recipes as JSON
    });
});



  

// API Route to Logout a User
app.post('/logout', (req, res) => {
    res.clearCookie('session_token');
    res.status(200).json({ message: 'Logout successful' });
});

app.post('/api/shopping-lists', (req, res) => {
    console.log('Received request:', req.body);
    console.log('Session data in /api/shopping-lists:', req.session);

    const { shoppingList, userId } = req.body; // Extract userId from the request body

    if (!userId) {
        console.error('No userId provided');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!shoppingList || shoppingList.length === 0) {
        console.error('Empty shopping list provided');
        return res.status(400).json({ message: 'Shopping list is empty' });
    }

    const insertShoppingListSQL = `
        INSERT INTO ShoppingList (UserID, CreatedDate)
        VALUES (?, NOW())
    `;

    db.query(insertShoppingListSQL, [userId], (err, result) => {
        if (err) {
            console.error('Error creating shopping list:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        const shoppingListId = result.insertId;

        const insertListIngredientsSQL = `
            INSERT INTO ListIngredient (ShoppingListID, IngredientID, Quantity, MeasureID)
            VALUES ?
        `;

        // Map shopping list items into the required format
        const ingredientValues = shoppingList.map((item) => [
            shoppingListId,
            item.ingredientId, // Ensure this matches IngredientID in the database
            item.quantity,
            item.measureId,
        ]);

        db.query(insertListIngredientsSQL, [ingredientValues], (err) => {
            if (err) {
                console.error('Error inserting ingredients:', err);
                return res.status(500).json({ message: 'Database error', error: err.message });
            }
            res.status(201).json({ message: 'Shopping list saved successfully.' });
        });
    });
});


  
// API Route to Fetch All Measures
app.get('/api/measures', (req, res) => {
    const fetchMeasuresSQL = `SELECT MeasureID, MeasureName FROM Measure`;

    db.query(fetchMeasuresSQL, (err, results) => {
        if (err) {
            console.error('Error fetching measures:', err);
            return res.status(500).json({ message: 'Database error while fetching measures.', error: err });
        }

        res.status(200).json(results); // Return the list of measures
    });
});

// API to fetch recipes added by a specific user
app.get('/api/user/recipes', (req, res) => {
    const { userId } = req.query; // Get the userId from query parameters

    if (!userId) {
        return res.status(400).json({ message: 'Missing userId parameter.' });
    }

    const sql = `
        SELECT 
            r.RecipeID, 
            r.RecipeTitle, 
            r.RecipeDescription, 
            r.AverageRating, 
            r.SkillLevel, 
            r.ImageURL
        FROM 
            Recipe r
        WHERE 
            r.AuthorID = ?
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching recipes:', err);
            return res.status(500).json({ message: 'Database error.', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No recipes found for this user.' });
        }

        res.status(200).json({ recipes: results });
    });
});


app.get('/api/recipe/:id', (req, res) => {
    const recipeId = req.params.id;

    console.log('Recipe ID received in backend:', recipeId); // Debugging

    const sql = `
        SELECT 
            r.RecipeID, 
            r.RecipeTitle, 
            r.RecipeDescription, 
            r.RecipeInstructions, 
            r.ImageURL, 
            r.AverageRating, 
            r.SkillLevel,
            r.yield,
            GROUP_CONCAT(DISTINCT 
                CONCAT(i.IngredientName, 
                    CASE 
                        WHEN ri.Comments IS NOT NULL AND ri.Comments != '' THEN CONCAT(' (', ri.Comments, ')') 
                        ELSE '' 
                    END, 
                    ' - ', 
                    ri.Quantity, 
                    ' ', 
                    CASE 
                        WHEN m.MeasureName = 'some' THEN '' 
                        ELSE m.MeasureName 
                    END)
            ) AS Ingredients,
            GROUP_CONCAT(DISTINCT t.ThemeName) AS Themes,
            GROUP_CONCAT(DISTINCT l.LabelName) AS Labels,
            CONCAT('[', 
                GROUP_CONCAT(
                    CONCAT(
                        '{',
                        '"Rating": "', rev.Rating, '", ',
                        '"Comment": "', rev.Comment, '", ',
                        '"Date": "', rev.Date, '", ',
                        '"User": "', CONCAT(u.FName, ' ', u.LName), '"',
                        '}'
                    ) SEPARATOR ','
                ), 
            ']') AS Reviews,
            CONCAT(a.FName, ' ', a.LName) AS AuthorName,
            r.PreparationTime,
            r.TotalTime
        FROM 
            Recipe r
        LEFT JOIN RecipeIngredient ri ON r.RecipeID = ri.RecipeID
        LEFT JOIN Ingredient i ON ri.IngredientID = i.IngredientID
        LEFT JOIN Measure m ON ri.MeasureID = m.MeasureID
        LEFT JOIN ThemeOfRecipe tr ON r.RecipeID = tr.RecipeID
        LEFT JOIN Theme t ON tr.ThemeID = t.ThemeID
        LEFT JOIN RecipeLabel rl ON r.RecipeID = rl.RecipeID
        LEFT JOIN Label l ON rl.LabelID = l.LabelID
        LEFT JOIN Review rev ON r.RecipeID = rev.RecipeID
        LEFT JOIN User u ON rev.UserID = u.UserID
        LEFT JOIN User a ON r.AuthorID = a.UserID
        WHERE 
            r.RecipeID = ?
        GROUP BY 
            r.RecipeID;
    `;

    db.query(sql, [recipeId], (err, results) => {
        if (err) {
            console.error('Database error:', err);  // Debug log
            res.status(500).json({ message: 'Database error', error: err });
        } else {
            console.log('SQL Result:', results);  // Add this log to see results
            res.status(200).json({ recipe: results[0] });
        }
    });
});

app.get('/api/substitute-ingredients', (req, res) => {
    const { query } = req.query;

    if (!query || query.trim() === "") {
        console.error("Invalid query parameter");
        return res.status(400).json({ message: "Query parameter is required." });
    }

    const sql = `
        SELECT SubIngID AS IngredientID, SubIngName AS IngredientName
        FROM SubstituteIngredient
        WHERE SubIngName LIKE ?
        LIMIT 10;
    `;

    console.log("Executing SQL:", sql, `Query Param: ${query}`);

    db.query(sql, [`%${query}%`], (err, results) => {
        if (err) {
            console.error("SQL Error:", err.message);
            return res.status(500).json({ message: "Database error", error: err.message });
        }
        console.log("Query Results:", results);
        res.status(200).json(results);
    });
});

// Add New Ingredient to the Database
app.post('/api/addingredients', (req, res) => {
   const { ingredientName } = req.body;

    if (!ingredientName || ingredientName.trim() === '') {
        return res.status(400).json({ success: false, message: 'Ingredient name is required.' });
    }

    const sql = `INSERT INTO Ingredient (IngredientName) VALUES (?)`;

    db.query(sql, [ingredientName.trim()], (err, result) => {
        if (err) {
          console.error('Error adding ingredient:', err);
           if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ success: false, message: 'Ingredient already exists.' });
            }
            return res.status(500).json({ success: false, message: 'Database error while adding ingredient.', error: err });
        }

        res.status(201).json({ success: true, message: `Ingredient "${ingredientName}" added successfully!`, ingredientID: result.insertId });
    });
});



app.get('/api/ingredients', (req, res) => {
    const { query } = req.query;

    if (!query || query.trim() === '') {
        return res.status(400).json({ message: 'Query parameter is required.' });
    }

    const sql = `
        SELECT IngredientID, IngredientName
        FROM Ingredient
        WHERE IngredientName LIKE ?
        ORDER BY IngredientName = ? ASC, IngredientName ASC
        LIMIT 10
    `;

    db.query(sql, [`%${query}%`, query], (err, results) => {
        if (err) {
            console.error('Error fetching ingredient suggestions:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        // Return the raw results array directly
        res.status(200).json(results);
    });
});


  

// Handle preflight requests for all routes
app.options('*', cors());  // Make sure preflight requests are allowed

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

function formatTimeToHHMMSS(time) {
    const timeRegex = /^([0-9]{1,2}):([0-5][0-9]):([0-5][0-9])$/; // Matches HH:mm:ss format
    
    // Validate time format
    if (!timeRegex.test(time)) {
        throw new Error('Invalid time format. Expected HH:mm:ss.');
    }

    // Extract hours, minutes, and optional seconds
    const [hours, minutes, seconds = 0] = time.split(':').map(Number);

    // Ensure hours, minutes, and seconds are within bounds
    if (hours > 48 || (hours === 48 && (minutes > 0 || seconds > 0))) {
        throw new Error('Maximum allowed time is 48:00:00.');
    }

    // Format time as HH:mm:ss
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}



app.post('/add-recipe', (req, res) => {
    const { recipeName, recipeDescription, skillLevel, preparationTime, totalTime, instructions, ingredients, labels, themes, authorID } = req.body;

    if (!recipeName || !preparationTime || !skillLevel) {
        console.error('Validation Error:', { recipeName, preparationTime, skillLevel });
        return res.status(400).json({ message: 'Missing required fields.', details: { recipeName, preparationTime, skillLevel } });
    }

    if (!Array.isArray(ingredients) || !Array.isArray(labels) || !Array.isArray(themes)) {
        console.error('Invalid Data Structure:', { ingredients, labels, themes });
        return res.status(400).json({ message: 'Invalid data structure.', details: { ingredients, labels, themes } });
    }

    console.log('Valid payload. Proceeding with SQL query...');
    let prepTimeFormatted, totalTimeFormatted;

    try {
        prepTimeFormatted = formatTimeToHHMMSS(preparationTime);
        totalTimeFormatted = totalTime ? formatTimeToHHMMSS(totalTime) : null; // Format totalTime as well
    } catch (error) {
        console.error('Time formatting error:', error.message);
        return res.status(400).json({ message: error.message });
    }
    

    // SQL query for inserting the recipe
    const insertRecipeSQL = `
    INSERT INTO Recipe (RecipeTitle, RecipeDescription, SkillLevel, PreparationTime, TotalTime, RecipeInstructions, AuthorID)
    VALUES (?, ?, ?, ?, ?, ?, ?)
`;


db.query(
    insertRecipeSQL,
    [
        recipeName,
        recipeDescription || null,
        skillLevel,
        prepTimeFormatted,
        totalTimeFormatted || null, // Use formatted TotalTime
        instructions || null,
        authorID || null,  // Add AuthorID
    ],

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
const addIngredientsAndSubstitutes = async (recipeID, ingredients, labels, themes, res) => {
    const insertRecipeIngredientSQL = `
        INSERT INTO RecipeIngredient (RecipeID, IngredientID, Quantity, MeasureID, SubstituteIngredientID, IsSubstitute)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const insertIngredientMeasureSQL = `
        INSERT IGNORE INTO IngredientMeasure (IngredientID, MeasureID)
        VALUES (?, ?)
    `;

    const insertSubstituteSQL = `
        INSERT IGNORE INTO Substitutes (IngredientID, SubIngID)
        VALUES (?, ?)
    `;

    console.log("addIngredientsAndSubstitutes invoked with:");
    console.log("Recipe ID:", recipeID);
    console.log("Ingredients:", ingredients);

    try {
        // Process each ingredient and its substitutes
        const ingredientPromises = ingredients.map(async (ingredient) => {
            if (!ingredient.ingredientID) {
                throw new Error(`Missing IngredientID for ingredient: ${ingredient.name}`);
            }

            console.log(`Processing primary ingredient: ${ingredient.name}`);

            // 1. Insert the primary ingredient
            await new Promise((resolve, reject) => {
                db.query(
                    insertRecipeIngredientSQL,
                    [recipeID, ingredient.ingredientID, ingredient.quantity, ingredient.measure, null, false],
                    (err) => {
                        if (err) {
                            console.error("Error inserting primary ingredient:", err);
                            return reject(err);
                        }
                        console.log("Primary ingredient inserted:", {
                            recipeID,
                            ingredientID: ingredient.ingredientID,
                            quantity: ingredient.quantity,
                            measure: ingredient.measure,
                        });
                        resolve();
                    }
                );
            });

            // 2. Insert substitutes for the primary ingredient
            if (Array.isArray(ingredient.substitutes) && ingredient.substitutes.length > 0) {
                const substitutePromises = ingredient.substitutes.map(async (sub) => {
                    if (!sub.ingredientID) {
                        console.warn(`Skipping substitute with missing ID: ${sub.name}`);
                        return;
                    }

                    console.log(`Processing substitute: ${sub.name}`);

                    // Insert the substitute row
                    await new Promise((resolve, reject) => {
                        db.query(
                            insertRecipeIngredientSQL,
                            [recipeID, ingredient.ingredientID, sub.quantity, sub.measure, sub.ingredientID, true],
                            (err) => {
                                if (err) {
                                    console.error("Error inserting substitute ingredient:", err);
                                    return reject(err);
                                }
                                console.log("Substitute inserted:", {
                                    recipeID,
                                    primaryIngredientID: ingredient.ingredientID,
                                    substituteID: sub.ingredientID,
                                    quantity: sub.quantity,
                                    measure: sub.measure,
                                });
                                resolve();
                            }
                        );
                    });

                    // 3. Insert into Substitutes table
                    await new Promise((resolve, reject) => {
                        db.query(
                            insertSubstituteSQL,
                            [ingredient.ingredientID, sub.ingredientID],
                            (err) => {
                                if (err) {
                                    console.error("Error inserting into Substitutes table:", err);
                                    return reject(err);
                                }
                                console.log("Substitute relationship added to Substitutes table:", {
                                    primaryIngredientID: ingredient.ingredientID,
                                    substituteID: sub.ingredientID,
                                });
                                resolve();
                            }
                        );
                    });
                });

                await Promise.all(substitutePromises);
            }
        });

        await Promise.all(ingredientPromises);
        console.log("All ingredients and substitutes processed successfully.");

        // Proceed with linking labels and themes
        addLabelsAndThemes(recipeID, labels, themes, res);
    } catch (err) {
        console.error("Error processing ingredients or substitutes:", err);
        return res.status(500).json({
            message: "Error processing ingredients or substitutes.",
            error: err.message,
        });
    }
};
app.get('/api/search', (req, res) => {
    const { query, type, action } = req.query; // Added `action` parameter

    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    let sql = '';
    let params = [];

    if (type === 'ingredient') {
        if (query.includes(',')) {
            // Case 1: Cross-reference selected ingredients with recipes
            const ingredients = query.split(',').map((ingredient) => ingredient.trim());
            const placeholders = ingredients.map(() => '?').join(', ');

            sql = `
                SELECT r.*
                FROM Recipe r
                JOIN RecipeIngredient ri ON r.RecipeID = ri.RecipeID
                JOIN Ingredient i ON ri.IngredientID = i.IngredientID
                WHERE i.IngredientName IN (${placeholders})
                GROUP BY r.RecipeID
                HAVING COUNT(DISTINCT i.IngredientName) = ?
            `;
            params = [...ingredients, ingredients.length];
        } else if (action === 'autocomplete') {
            // Case 2: Auto-complete suggestions for ingredients (typing)
            sql = `
                SELECT i.IngredientID, i.IngredientName
FROM Ingredient i
WHERE i.IngredientName LIKE ?

            `;
            params = [`%${query}%`];
        } else {
            // Case 3: Single ingredient recipe search (search button)
            sql = `
                SELECT r.*
                FROM Recipe r
                JOIN RecipeIngredient ri ON r.RecipeID = ri.RecipeID
                JOIN Ingredient i ON ri.IngredientID = i.IngredientID
                WHERE i.IngredientName = ?
                GROUP BY r.RecipeID
            `;
            params = [query.trim()];
        }
    } else if (type === 'recipe') {
        // Search recipes by name
        sql = `
            SELECT DISTINCT r.*
            FROM Recipe r
            WHERE r.RecipeTitle LIKE ?
        `;
        params = [`%${query}%`];
    } else {
        // Search both recipes and ingredients
        sql = `
            SELECT DISTINCT r.*
            FROM Recipe r
            LEFT JOIN RecipeIngredient ri ON r.RecipeID = ri.RecipeID
            LEFT JOIN Ingredient i ON ri.IngredientID = i.IngredientID
            WHERE r.RecipeTitle LIKE ? OR i.IngredientName LIKE ?
        `;
        params = [`%${query}%`, `%${query}%`];
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        // Return results based on the type of query
        if (type === 'ingredient' && action === 'autocomplete') {
            return res.status(200).json({ ingredients: results });
        }
        res.status(200).json({ recipes: results });
    });
});





// POST API for submitting comments/ratings review
app.post('/api/recipes/:RecipeID/reviews', (req, res) => {
    const { RecipeID } = req.params;
    const { UserID, Rating, Comment } = req.body;

    console.log('Incoming review payload:', { RecipeID, UserID, Rating, Comment });


    // Validate inputs
    if (!UserID || !RecipeID || (!Rating && !Comment)) {
        return res.status(400).json({ message: 'Invalid input. UserID, RecipeID, and at least one of Rating or Comment are required.' });
    }

    // Check for existing rating for the same recipe by the same user
    const checkExistingRating = `
        SELECT ReviewID FROM Review
        WHERE UserID = ? AND RecipeID = ? AND Rating IS NOT NULL
    `;
    db.query(checkExistingRating, [UserID, RecipeID], (err, results) => {
        if (err) {
            console.error('Error checking existing rating:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        const hasExistingRating = results.length > 0;

        // If the user already submitted a rating, prevent a duplicate rating
        if (Rating && hasExistingRating) {
            return res.status(400).json({ message: 'You have already rated this recipe.' });
        }

        // Insert the review into the database
        const insertReview = `
            INSERT INTO Review (UserID, RecipeID, Rating, Comment, Date)
            VALUES (?, ?, ?, ?, NOW())
        `;
        db.query(insertReview, [UserID, RecipeID, Rating || null, Comment || null], (err, result) => {
            if (err) {
                console.error('Error inserting review:', err);
                return res.status(500).json({ message: 'Database error', error: err });
            }

            // If a rating was submitted, update the average rating
            if (Rating) {
                const updateAverageRating = `
                    UPDATE Recipe
                    SET AverageRating = (
                        SELECT AVG(Rating)
                        FROM Review
                        WHERE RecipeID = ?
                    )
                    WHERE RecipeID = ?
                `;
                db.query(updateAverageRating, [RecipeID, RecipeID], (err) => {
                    if (err) {
                        console.error('Error updating average rating:', err);
                        return res.status(500).json({ message: 'Database error', error: err });
                    }
                    res.status(201).json({ message: 'Review added successfully.' });
                });
            } else {
                res.status(201).json({ message: 'Comment added successfully.' });
            }
        });
    });
});




// GET API for fetching comments and ratings
app.get('/api/recipes/:RecipeID/reviews', (req, res) => {
    const { RecipeID } = req.params;

    // Validate RecipeID
    if (!RecipeID) {
        return res.status(400).json({ message: 'RecipeID is required.' });
    }

    // Query to fetch reviews for the recipe
    const fetchReviewsQuery = `
        SELECT r.ReviewID, r.UserID, u.UserName, r.Rating, r.Comment, r.Date
        FROM Review r
        JOIN User u ON r.UserID = u.UserID
        WHERE r.RecipeID = ?
        ORDER BY r.Date DESC
    `;

    // Query to fetch average rating
    const fetchAverageRatingQuery = `
        SELECT AverageRating
        FROM Recipe
        WHERE RecipeID = ?
    `;

    // Fetch reviews and average rating concurrently
    db.query(fetchReviewsQuery, [RecipeID], (err, reviews) => {
        if (err) {
            console.error('Error fetching reviews:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        db.query(fetchAverageRatingQuery, [RecipeID], (err, ratingResult) => {
            if (err) {
                console.error('Error fetching average rating:', err);
                return res.status(500).json({ message: 'Database error', error: err });
            }

            const averageRating = ratingResult[0]?.AverageRating || 0;

            res.status(200).json({
                reviews,
                averageRating,
            });
        });
    });
});





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
