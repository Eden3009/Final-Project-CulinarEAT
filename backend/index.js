


const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const cookieParser = require('cookie-parser');  // Import cookie-parser

const app = express();
const port = 5001;
app.use(express.json());


// Test route
app.get('/api/reviews/test', (req, res) => {
    res.status(200).json({ message: 'API is working!' });
  });

  app.get('/api/reviews/test', (req, res) => {
    console.log('Test endpoint hit!');
    res.status(200).json({ message: 'API is working!' });
  });
  
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
    console.log('Received request to add a new list:', req.body);
    console.log('Session data in /api/shopping-lists:', req.session);

    const { shoppingList, userId, listName } = req.body; // Extract listName

    if (!userId) {
        console.error('No userId provided');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!shoppingList || shoppingList.length === 0) {
        console.error('Empty shopping list provided');
        return res.status(400).json({ message: 'Shopping list is empty' });
    }

    const insertShoppingListSQL = `
        INSERT INTO ShoppingList (UserID, ListName, CreatedDate)
        VALUES (?, ?, NOW())
    `;

    db.query(insertShoppingListSQL, [userId, listName], (err, result) => { // Changed req.body.listName to listName
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
            item.IngredientID, // Ensure this matches IngredientID in the database
            item.Quantity,
            item.MeasureID,
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




app.get('/api/get-shopping-lists/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = `
        SELECT 
            sl.ShoppingListID, 
            sl.ListName, 
            sl.CreatedDate, 
            li.Quantity, 
            li.IngredientID, 
            li.MeasureID, 
            i.IngredientName, 
            m.MeasureName
        FROM ShoppingList sl
        JOIN ListIngredient li ON sl.ShoppingListID = li.ShoppingListID
        JOIN Ingredient i ON li.IngredientID = i.IngredientID
        JOIN Measure m ON li.MeasureID = m.MeasureID
        WHERE sl.UserID = ?
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching shopping lists:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        // Format results into grouped lists
        const groupedLists = results.reduce((acc, row) => {
            const listId = row.ShoppingListID;
            if (!acc[listId]) {
                acc[listId] = {
                    ShoppingListID: listId,
                    ListName: row.ListName,
                    CreatedDate: row.CreatedDate,
                    items: [],
                };
            }

            acc[listId].items.push({
                IngredientID: row.IngredientID,  // Add IngredientID
                MeasureID: row.MeasureID,        // Add MeasureID
                IngredientName: row.IngredientName,
                MeasureName: row.MeasureName,
                Quantity: row.Quantity,
            });

            return acc;
        }, {});

        res.json(Object.values(groupedLists));
    });
});


app.delete('/api/delete-shopping-list/:listId', (req, res) => {
    const listId = req.params.listId;

    const deleteIngredientsQuery = `DELETE FROM ListIngredient WHERE ShoppingListID = ?`;
    const deleteListQuery = `DELETE FROM ShoppingList WHERE ShoppingListID = ?`;

    db.query(deleteIngredientsQuery, [listId], (err) => {
        if (err) {
            console.error('Error deleting list ingredients:', err);
            return res.status(500).json({ message: 'Failed to delete list ingredients' });
        }

        db.query(deleteListQuery, [listId], (err) => {
            if (err) {
                console.error('Error deleting shopping list:', err);
                return res.status(500).json({ message: 'Failed to delete shopping list' });
            }

            res.status(200).json({ message: 'Shopping list deleted successfully' });
        });
    });
});



// Update Shopping List API
app.put('/api/update-shopping-list/:listId', (req, res) => {
    const listId = req.params.listId;
    const { listName, items } = req.body;
  
    // Log the received body to verify its structure
    console.log("Received body for update UPDATE:", req.body);
  
    // Validation checks
    if (!listName || !listName.trim()) {
      console.error('Missing or empty listName:', listName);
      return res.status(400).json({ message: 'List name is required.' });
    }
  
    if (!items || items.length === 0) {
      console.error('Missing or empty items:', items);
      return res.status(400).json({ message: 'Items are required.' });
    }
    // Proceed with updating the list if everything is valid
    const updateListNameQuery = `UPDATE ShoppingList SET ListName = ? WHERE ShoppingListID = ?`;
  
    db.query(updateListNameQuery, [listName, listId], (err) => {
      if (err) {
        console.error('Error updating list name:', err);
        return res.status(500).json({ message: 'Failed to update list name.' });
      }
  
      // Step 3: Delete old items from the shopping list
      const deleteOldItemsQuery = `DELETE FROM ListIngredient WHERE ShoppingListID = ?`;
  
      db.query(deleteOldItemsQuery, [listId], (err) => {
        if (err) {
          console.error('Error deleting old items:', err);
          return res.status(500).json({ message: 'Failed to delete old items.' });
        }
  
        // Step 4: Insert new items into the list
        const insertNewItemsQuery = `
          INSERT INTO ListIngredient (ShoppingListID, IngredientID, MeasureID, Quantity)
          VALUES ?`;
  
        const itemsData = items.map((item) => [
          listId,
          item.IngredientID,
          item.MeasureID,
          item.Quantity,
        ]);
  
        db.query(insertNewItemsQuery, [itemsData], (err) => {
          if (err) {
            console.error('Error inserting new items:', err);
            return res.status(500).json({ message: 'Failed to insert new items.' });
          }
  
          // Step 5: Return success response
          res.status(200).json({ message: 'Shopping list updated successfully.' });
        });
      });
    });
  });
  
// Append Items to Shopping List API
app.put('/api/append-shopping-list/:listId', (req, res) => {
    const listId = req.params.listId;
    const { listName, items } = req.body;
  
    // Log the received body to verify its structure
    console.log("Received body for append:", req.body);
  
    // Validation checks
    if (!listName || !listName.trim()) {
      console.error('Missing or empty listName:', listName);
      return res.status(400).json({ message: 'List name is required.' });
    }
  
    if (!items || items.length === 0) {
      console.error('Missing or empty items:', items);
      return res.status(400).json({ message: 'Items are required.' });
    }
  
    // Step 1: Update the list name
    const updateListNameQuery = `UPDATE ShoppingList SET ListName = ? WHERE ShoppingListID = ?`;
  
    db.query(updateListNameQuery, [listName, listId], (err) => {
      if (err) {
        console.error('Error updating list name:', err);
        return res.status(500).json({ message: 'Failed to update list name.' });
      }
  
      // Step 2: Insert new items into the list (without deleting existing ones)
      const insertNewItemsQuery = `
        INSERT INTO ListIngredient (ShoppingListID, IngredientID, MeasureID, Quantity)
        VALUES ?
        ON DUPLICATE KEY UPDATE
          Quantity = VALUES(Quantity), MeasureID = VALUES(MeasureID)
      `;
  
      const itemsData = items.map((item) => [
        listId,
        item.IngredientID,
        item.MeasureID,
        item.Quantity,
      ]);
  
      db.query(insertNewItemsQuery, [itemsData], (err) => {
        if (err) {
          console.error('Error inserting new items:', err);
          return res.status(500).json({ message: 'Failed to insert new items.' });
        }
  
        // Step 3: Return success response
        res.status(200).json({ message: 'Items appended successfully to shopping list.' });
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
    console.log("Received request to fetch recipes for userId:", userId);

    if (!userId) {
        console.error("Missing userId parameter in /api/user/recipes");
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
        console.log("Fetched recipes for userId:", userId, "Results:", results);
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
    GROUP_CONCAT(
        DISTINCT CONCAT(
            CASE 
                WHEN ri.IsSubstitute = 1 THEN si.SubIngName
                ELSE i.IngredientName 
            END, 
            CASE 
                WHEN ri.Comments IS NOT NULL AND ri.Comments != '' THEN CONCAT(' (', ri.Comments, ')') 
                ELSE '' 
            END, 
            ' - ', 
            ri.Quantity, 
            ' ', 
            m.MeasureName, 
            CASE 
                WHEN ri.IsSubstitute = 1 THEN ' [Substitute]' 
                ELSE '' 
            END
        ) SEPARATOR '|'
    ) AS Ingredients,
    GROUP_CONCAT(DISTINCT t.ThemeName SEPARATOR ', ') AS Themes,
    GROUP_CONCAT(DISTINCT l.LabelName SEPARATOR ', ') AS Labels,
    GROUP_CONCAT(
        DISTINCT CONCAT(
            '{"Rating": "', rev.Rating, '", ',
            '"Comment": "', rev.Comment, '", ',
            '"Date": "', rev.Date, '", ',
            '"User": "', CONCAT(u.FName, ' ', u.LName), '"}'
        ) SEPARATOR ','
    ) AS Reviews,
    CONCAT(a.FName, ' ', a.LName) AS AuthorName,
    r.PreparationTime,
    r.TotalTime
FROM 
    Recipe r
LEFT JOIN RecipeIngredient ri ON r.RecipeID = ri.RecipeID
LEFT JOIN Ingredient i ON ri.IngredientID = i.IngredientID
LEFT JOIN Measure m ON ri.MeasureID = m.MeasureID
LEFT JOIN Substitutes s ON i.IngredientID = s.IngredientID
LEFT JOIN SubstituteIngredient si ON s.SubIngID = si.SubIngID
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

app.post('/api/get-ingredients-by-names', (req, res) => {
    let { ingredientNames, RecipeID } = req.body;
  
    // Forcefully parse RecipeID into a number
    const numericRecipeID =
      parseInt(req.body.RecipeID, 10) ||
      parseInt(req.body.recipeID, 10) ||
      parseInt(req.body.data?.RecipeID, 10) ||
      parseInt(req.body.data?.recipeID, 10) ||
      0; // Default to 0 if nothing matches
  
    if (!Number.isInteger(numericRecipeID) || numericRecipeID <= 0) {
      console.error('Invalid RecipeID:', numericRecipeID);
      return res.status(400).json({ error: 'Invalid or missing RecipeID' });
    }
  
    if (!ingredientNames || !Array.isArray(ingredientNames) || ingredientNames.length === 0) {
      console.error('Invalid or missing ingredientNames');
      return res.status(400).json({ error: 'Invalid or missing ingredientNames' });
    }
  
    // Clean up ingredient names by removing "[Substitute]"
    const cleanedIngredientNames = ingredientNames.map((name) => name.replace(/\[Substitute\]/g, '').trim());
  
    console.log('Cleaned Ingredient Names:', cleanedIngredientNames);
  
    const query = `
     SELECT * FROM (
    -- Regular ingredients
    SELECT
        i.IngredientID AS IngredientID,
        ri.Quantity AS Quantity,
        ri.MeasureID AS MeasureID,
        i.IngredientName AS IngredientName
    FROM
        Ingredient i
    INNER JOIN
        RecipeIngredient ri ON i.IngredientID = ri.IngredientID
    WHERE
        i.IngredientName LIKE ? AND ri.RecipeID = ? AND ri.IsSubstitute = 0

    UNION

    -- Substitute ingredients
    SELECT
        si.SubIngID AS IngredientID,
        ri.Quantity AS Quantity,
        ri.MeasureID AS MeasureID,
        si.SubIngName AS IngredientName
    FROM
        SubstituteIngredient si
    INNER JOIN
        Substitutes s ON si.SubIngID = s.SubIngID
    INNER JOIN
        RecipeIngredient ri ON s.IngredientID = ri.IngredientID
    WHERE
        si.SubIngName LIKE ? AND ri.RecipeID = ? AND ri.IsSubstitute = 1
) AS CombinedResults;



    `;
  
    const results = [];
    const promises = cleanedIngredientNames.map((name) => {
      const likeName = `%${name}%`;
      return new Promise((resolve, reject) => {
        db.query(query, [likeName, numericRecipeID, likeName, numericRecipeID], (error, rows) => {
          if (error) {
            console.error(`Query error for ingredient "${name}":`, error);
            return reject(error);
          }
          console.log('this comes back measure sub:', results);

          if (rows.length > 0) {
            results.push(rows[0]);
          }
          resolve();
        });
      });
    });
  
    Promise.all(promises)
      .then(() => {
        if (results.length === 0) {
          console.error('No matching ingredients found.');
          return res.status(404).json({ error: 'No ingredients found for the given recipe' });
        }
        console.log('Query results:', results);
        res.json({ ingredients: results });
      })
      .catch((error) => {
        console.error('Error executing queries:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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

// API to fetch user reviews
app.get('/api/user/reviews', (req, res) => {
    const { userId } = req.query;
    console.log("Received request to fetch reviews for userId:", userId);

    if (!userId) {
        console.error("Missing userId parameter in /api/user/reviews");
        return res.status(400).json({ message: 'Missing userId parameter.' });
    }

    const sql = `
        SELECT 
            r.ReviewID,
            r.RecipeID,
            r.Rating,
            r.Comment,
            r.Date,
            re.RecipeTitle,
            re.ImageURL
        FROM 
            Review r
        JOIN 
            Recipe re ON r.RecipeID = re.RecipeID
        WHERE 
            r.UserID = ?
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching reviews:', err);
            return res.status(500).json({ message: 'Database error.', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this user.' });
        }
        console.log("Fetched reviews for userId:", userId, "Results:", results);
        res.status(200).json({ reviews: results });
    });
});

//all favorite
app.post('/api/favorites', (req, res) => {
    const { UserID, RecipeID } = req.body;

    // Validate input
    if (!UserID || !RecipeID) {
        return res.status(400).send({ error: 'UserID and RecipeID are required' });
    }

    // SQL query to insert a favorite
    const query = `
        INSERT INTO Favorites (UserID, RecipeID, AddedDate)
        VALUES (?, ?, NOW())
    `;

    // Execute the query
    db.query(query, [UserID, RecipeID], (err, result) => {
        if (err) {
            console.error('Error adding to favorites:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).send({ error: 'Recipe is already in favorites' });
            }
            return res.status(500).send({ error: 'Failed to add to favorites' });
        }

        // Return the ID of the newly inserted favorite
        res.status(200).send({ message: 'Recipe added to favorites!', favoriteId: result.insertId });
    });
});


app.get('/api/user-favorites/:UserID', (req, res) => {
    const { UserID } = req.params;

    const query = `
        SELECT Favorites.FavoriteID, Favorites.RecipeID, Recipe.RecipeTitle AS RecipeTitle, Recipe.ImageURL
        FROM Favorites
        INNER JOIN Recipe ON Favorites.RecipeID = Recipe.RecipeID
        WHERE Favorites.UserID = ?
    `;

    db.query(query, [UserID], (err, results) => {
        if (err) {
            console.error('Error fetching user favorites:', err);
            return res.status(500).send({ error: 'Failed to fetch user favorites' });
        }

        res.status(200).send(results);
    });
});

 
  app.delete('/api/favorites/:favoriteId', (req, res) => {
    const { favoriteId } = req.params;
 
 
    if (!favoriteId) {
        return res.status(400).send({ error: 'FavoriteID is required' });
    }
 
 
    const query = 'DELETE FROM Favorites WHERE FavoriteID = ?';
 
 
    db.query(query, [favoriteId], (err, result) => {
        if (err) {
            console.error('Error removing from favorites:', err);
            return res.status(500).send({ error: 'Failed to remove from favorites' });
        }
 
 
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'Favorite not found' });
        }
 
 
        res.status(200).send({ message: 'Recipe removed from favorites!' });
    });
 });
 
 
 // Updated GET for user's favorites
 app.get('/api/user-favorites/:userId', (req, res) => {
    const { userId } = req.params;
     if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
     const query = `
      SELECT f.FavoriteID, r.RecipeTitle, r.ImageURL
      FROM Favorites f
      JOIN Recipe r ON f.RecipeID = r.RecipeID
      WHERE f.UserID = ?
    `;
     db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching favorites:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    });
  });
  
 
 
 
 
  //get for the recipe itself
 app.get('/api/favorites/:userId/:recipeId', (req, res) => {
    const { userId, recipeId } = req.params;
     if (!userId || !recipeId) {
      return res.status(400).json({ error: 'UserID and RecipeID are required' });
    }
     const query = `
      SELECT FavoriteID
      FROM Favorites
      WHERE UserID = ? AND RecipeID = ?
    `;
     db.query(query, [userId, recipeId], (err, results) => {
      if (err) {
        console.error('Error fetching favorite status:', err);
        return res.status(500).json({ error: 'Database error' });
      }
       if (results.length > 0) {
        res.status(200).json({ isFavorite: true, favoriteId: results[0].FavoriteID });
      } else {
        res.status(200).json({ isFavorite: false });
      }
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

// DELETE API for deleting a review
app.delete('/api/reviews/:reviewID', (req, res) => {
    const { reviewID } = req.params; // Extract review ID from the request URL

    // SQL query to delete the review
    const deleteReviewQuery = `DELETE FROM Review WHERE ReviewID = ?`;

    db.query(deleteReviewQuery, [reviewID], (err, result) => {
        if (err) {
            console.error('Error deleting review:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.affectedRows === 0) {
            // No review was found to delete
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    });
});



// PUT API for editing a review
app.put('/api/reviews/:reviewID', (req, res) => {
    const { reviewID } = req.params; // Extract review ID from the URL
    const { Rating, Comment } = req.body; // Extract the new rating and comment from the body
  
    if (!Rating || !Comment) {
      return res.status(400).json({ message: 'Both rating and comment are required.' });
    }
  
    const sql = `
      UPDATE Review
      SET Rating = ?, Comment = ?, Date = NOW()  -- Update the date automatically
      WHERE ReviewID = ?
    `;
  
    // Execute the SQL query
    db.query(sql, [Rating, Comment, reviewID], (err, result) => {
      if (err) {
        console.error('Error updating review:', err);
        return res.status(500).json({ message: 'Database error while updating review.', error: err.message });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: `Review with ID ${reviewID} not found.` });
      }
  
      // Fetch the updated review
      db.query(`SELECT * FROM Review WHERE ReviewID = ?`, [reviewID], (err, rows) => {
        if (err) {
          console.error('Error fetching updated review:', err);
          return res.status(500).json({ message: 'Error fetching updated review.' });
        }
        res.status(200).json(rows[0]); // Return the updated review object
      });
    });
  });

  // API to fetch reviews left by a specific user
app.get('/api/user/reviews-user', (req, res) => {
    const { userId } = req.query; // Get the userId from query parameters

    if (!userId) {
        return res.status(400).json({ message: 'Missing userId parameter.' });
    }

    const sql = `
        SELECT 
    r.ReviewID, 
    r.UserID, 
    r.RecipeID, 
    r.Rating, 
    r.Comment, 
    rec.RecipeTitle, 
    rec.ImageURL
FROM 
    Review r
JOIN 
    Recipe rec ON r.RecipeID = rec.RecipeID
WHERE 
    r.UserID = ?

    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching reviews:', err);
            return res.status(500).json({ message: 'Database error.', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this user.' });
        }

        res.status(200).json({ reviews: results });
    });
});




  