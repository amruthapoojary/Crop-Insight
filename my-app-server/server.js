const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Database connection for admin dashboard
const adminDB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '4SF22CS023',
  database: 'CropAnalysisDB'
});

// Database connection for authentication
const authDB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '4SF22CS023',
  database: 'crop_analysis'
});

// Connect to auth database
authDB.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the authentication database.');
});
// Add this after your adminDB connection configuration
adminDB.connect((err) => {
  if (err) {
    console.error('Admin database connection failed:', err.stack);
    return;
  }
  console.log('Connected to admin database.');
});

// Generic query function
const executeQuery = (sql, values, res) => {
  adminDB.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database error:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json(result);
    }
  });
};

// List of allowed tables
const allowedTables = ['Crop', 'SoilType', 'IrrigationMethod', 'Seasontype', 'WeatherCondition'];


// Sign Up Route
app.post('/signup', (req, res) => {
  const { email, password, role } = req.body;

  // Check if all required fields are present
  if (!email || !password || !role) {
    return res.status(400).send('Missing required fields');
  }

  // Validate role
  if (!['admin', 'user'].includes(role)) {
    return res.status(400).send('Invalid role');
  }

  console.log('Signup Data:', req.body); // Log the incoming request data

  // Check if the user already exists in the database
  const checkUserQuery = 'SELECT * FROM login WHERE email = ?';
  authDB.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).send('Database error');
    }

    // If user already exists, return error
    if (results.length > 0) {
      return res.status(400).send('User already exists');
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).send('Password hashing error');
      }

      console.log('Hashed Password:', hashedPassword); // Log the hashed password

      // Insert the new user into the database
      const insertUserQuery = 'INSERT INTO login (email, password, role) VALUES (?, ?, ?)';
      authDB.query(insertUserQuery, [email, hashedPassword, role], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res.status(500).send('Database error');
        }

        console.log('User inserted successfully:', result); // Log success
        res.status(201).send('Signup successful');
      });
    });
  });
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password, role } = req.body;

  // Check if the user exists
  const sql = 'SELECT * FROM login WHERE email = ?';
  authDB.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).send('Error checking user');
    }
    if (results.length === 0) {
      return res.status(400).send('User not found');
    }

    // Compare the entered password with the hashed password in the database
    const storedPassword = results[0].password;
    bcrypt.compare(password, storedPassword, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).send('Error comparing passwords');
      }
      if (isMatch) {
        // Check if the role from request matches the stored role
        const storedRole = results[0].role;
        if (storedRole === role) {
          res.status(200).send('Login successful');
        } else {
          res.status(403).send('Access denied: Role mismatch');
        }
      } else {
        res.status(400).send('Invalid credentials');
      }
    });
  });
});

// Admin Dashboard Routes
app.get('/api/:table', (req, res) => {
  const table = req.params.table;

  if (!allowedTables.includes(table)) {
    return res.status(400).json({ error: 'Invalid table name' });
  }

  const sql = `SELECT * FROM ??`;
  executeQuery(sql, [table], res);
});

app.post('/api/:table', (req, res) => {
  const table = req.params.table;

  const requiredFields = {
    Crop: ['CropName', 'CropType', 'Region', 'OptimalSeason', 'OptimalTemperature'],
    SoilType: ['SoilTypeID', 'SoilName', 'pHRange', 'Cropid'],
    IrrigationMethod: ['IrrigationID', 'MethodName', 'WaterRequirement', 'Cropid', 'Seasonid'],
    Seasontype: ['SeasonID', 'SeasonName', 'StartMonth', 'EndMonth', 'Cropid'],
    WeatherCondition: ['WeatherID', 'TemperatureRange', 'RainfallRange', 'HumidityRange', 'Seasonid']
  };

  const required = requiredFields[table];
  if (!required) {
    return res.status(400).json({ error: 'Invalid table name' });
  }

  const fieldsToInsert = required.filter(field => !field.endsWith('ID') || table === 'SoilType');
  const missingFields = fieldsToInsert.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
  }

  const keys = fieldsToInsert;
  const values = keys.map(field => req.body[field]);
  const sql = `INSERT INTO ?? (${keys.map(() => '??').join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`;
  const queryParams = [table, ...keys, ...values];

  executeQuery(sql, queryParams, res);
});
// Update Route to Update a Record
// Update Route to Update a Record based on Primary Key
// Update Route to Update a Record based on Primary Key
// In your server.js file

app.put('/api/:table', (req, res) => {
  const table = req.params.table;

  // Define the required fields for different tables
  const requiredFields = {
    Crop: ['CropID', 'CropName', 'CropType', 'Region', 'OptimalSeason', 'OptimalTemperature'],
    SoilType: ['SoilTypeID', 'SoilName', 'pHRange', 'Cropid'],
    IrrigationMethod: ['IrrigationID', 'MethodName', 'WaterRequirement', 'Cropid', 'Seasonid'],
    Seasontype: ['SeasonID', 'SeasonName', 'StartMonth', 'EndMonth', 'Cropid'],
    WeatherCondition: ['WeatherID', 'TemperatureRange', 'RainfallRange', 'HumidityRange', 'Seasonid']
  };

  const required = requiredFields[table];
  if (!required) {
    return res.status(400).json({ error: 'Invalid table name' });
  }

  // Extract primary key field and other form data
  const primaryKeyValue = req.body.primaryKeyField;  // Get primary key from request body
  const formData = required.reduce((acc, field) => {
    if (req.body[field]) acc[field] = req.body[field];
    return acc;
  }, {});

  // Ensure primary key is provided
  if (!primaryKeyValue) {
    return res.status(400).json({ error: 'Primary key is required' });
  }

  // Construct the SQL UPDATE query
  const columns = Object.keys(formData);
  const values = Object.values(formData);

  // Create placeholders for SQL query based on the number of fields to update
  const setQuery = columns.map(column => `${column} = ?`).join(', ');

  // Assuming "CropID" is the primary key for the "Crop" table
  const sql = `UPDATE ?? SET ${setQuery} WHERE ?? = ?`;

  // Execute the query with proper values
  adminDB.query(sql, [table, ...values, 'CropID', primaryKeyValue], (err, result) => {
    if (err) {
      console.error('Error updating record:', err);
      return res.status(500).json({ error: 'Error updating record' });
    }
    res.status(200).json({ message: 'Record updated successfully' });
  });
});




app.delete('/api/:table/:id', (req, res) => {
  const table = req.params.table;
  const id = req.params.id;

  const idField = `${table}ID`;
  const sql = `DELETE FROM ?? WHERE ?? = ?`;
  const queryParams = [table, idField, id];

  console.log(`Executing SQL: ${sql} with ID: ${id}`);
  executeQuery(sql, queryParams, res);
});

// Additional query routes
app.get('/api/query/:queryId', (req, res) => {
  const queryId = req.params.queryId;

  let query = '';
  let params = [];

  switch (queryId) {
    case '1':
      query = 'SELECT CropName FROM Crop WHERE Region = ?';
      params = ['Bellary']; // Replace with dynamic parameter
      break;
    case '2':
      query = 'SELECT DISTINCT CropType FROM Crop';
      break;
    case '3':
      query = 'SELECT CropName FROM Crop WHERE OptimalTemperature = ?';
      params = ['20-25°C']; // Replace with dynamic parameter
      break;
    case '4':
      query = 'SELECT CropName FROM Crop WHERE OptimalSeason = ?';
      params = ['Winter']; // Replace with dynamic parameter
      break;
    case '5':
      query = 'SELECT SoilName FROM SoilType WHERE Cropid = ?';
      params = [1]; // Replace with dynamic crop ID
      break;
    case '6':
      query = 'SELECT MethodName FROM IrrigationMethod WHERE Cropid = ?';
      params = [2]; // Replace with dynamic crop ID
      break;
    case '7':
      query = 'SELECT MethodName FROM IrrigationMethod WHERE Seasonid = ?';
      params = [1]; // Replace with dynamic season ID
      break;
    case '8':
      query = 'SELECT * FROM WeatherCondition WHERE TemperatureRange = ?';
      params = ['18-30°C']; // Replace with dynamic parameter
      break;
    case '9':
      query = 'SELECT * FROM Crop WHERE CropType = ?';
      params = ['Vegetable']; // Replace with dynamic parameter
      break;
    case '10':
      query = 'SELECT * FROM SoilType WHERE pHRange BETWEEN ? AND ?';
      params = [6, 7]; // Replace with dynamic pH range
      break;
    // New queries with JOINs
    case '11':
      query = 'SELECT Crop.CropName, SoilType.SoilName FROM Crop JOIN SoilType ON Crop.CropID = SoilType.CropID WHERE Crop.Region = ?';
      params = ['Kudligi']; // Replace with dynamic parameter
      break;
    case '12':
      query = 'SELECT Crop.CropName, IrrigationMethod.MethodName FROM Crop JOIN IrrigationMethod ON Crop.CropID = IrrigationMethod.CropID WHERE Crop.CropType = ?';
      params = ['Cereal']; // Replace with dynamic parameter
      break;
    case '13':
      query = 'SELECT Crop.CropName, WeatherCondition.Condition FROM Crop JOIN WeatherCondition ON Crop.CropID = WeatherCondition.CropID WHERE Crop.OptimalSeason = ?';
      params = ['Winter']; // Replace with dynamic parameter
      break;
    case '14':
      query = 'SELECT Crop.CropName, SoilType.SoilName FROM Crop JOIN SoilType ON Crop.CropID = SoilType.CropID JOIN IrrigationMethod ON Crop.CropID = IrrigationMethod.CropID WHERE Crop.Region = ?';
      params = ['Hospet']; // Replace with dynamic parameter
      break;
    case '15':
      query = 'SELECT Crop.CropName, WeatherCondition.Condition, IrrigationMethod.MethodName FROM Crop JOIN WeatherCondition ON Crop.CropID = WeatherCondition.CropID JOIN IrrigationMethod ON Crop.CropID = IrrigationMethod.CropID WHERE Crop.CropType = ?';
      params = ['Vegetable']; // Replace with dynamic parameter
      break;
    case '16':
      query = 'SELECT Crop.CropName, COUNT(*) AS CropCount FROM Crop JOIN SoilType ON Crop.CropID = SoilType.CropID GROUP BY Crop.CropName';
      break;
    case '17':
      query = 'SELECT Crop.CropName, COUNT(*) AS CropCount FROM Crop JOIN WeatherCondition ON Crop.CropID = WeatherCondition.CropID GROUP BY Crop.CropName';
      break;
    case '18':
      query = 'SELECT Crop.CropName, COUNT(*) AS CropCount FROM Crop JOIN IrrigationMethod ON Crop.CropID = IrrigationMethod.CropID GROUP BY Crop.CropName';
      break;
    case '19':
      query = 'SELECT Crop.CropName, SoilType.SoilName FROM Crop JOIN SoilType ON Crop.CropID = SoilType.CropID JOIN WeatherCondition ON Crop.CropID = WeatherCondition.CropID WHERE WeatherCondition.Condition = ?';
      params = ['Rainy']; // Replace with dynamic parameter
      break;
    case '20':
      query = 'SELECT Crop.CropName, COUNT(DISTINCT Crop.Region) AS RegionCount FROM Crop JOIN SoilType ON Crop.CropID = SoilType.CropID GROUP BY Crop.CropName';
      break;
    default:
      return res.status(404).json({ error: 'Query ID not found' });
  }

  adminDB.query(query, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.get('/graph/:queryId', (req, res) => {
  const { queryId } = req.params;
  console.log("Received Query ID:", queryId); // Log queryId to see if it's correct

  let sql = '';
  let chartType = '';  // Add this to store the chart type

  switch (queryId) {
    case '21': // Crop Count by Region
      sql = `SELECT Region, COUNT(*) AS CropCount FROM Crop GROUP BY Region`;
      chartType = 'bar'; // Example: Use a bar chart for this query
      break;

    case '22': // Crops by Season
      sql = `SELECT s.SeasonName, COUNT(c.CropID) AS CropCount FROM Crop c JOIN Seasontype s ON c.CropID = s.Cropid GROUP BY s.SeasonName`;
      chartType = 'pie'; // Example: Use a pie chart for this query
      break;

    case '23': // Irrigation Methods by Crop Type
      sql = `SELECT c.CropType, i.MethodName, COUNT(i.IrrigationID) AS MethodCount FROM IrrigationMethod i JOIN Crop c ON i.Cropid = c.CropID GROUP BY c.CropType, i.MethodName`;
      chartType = 'line'; // Example: Use a line chart for this query
      break;

    

    case '24': // Crop Distribution by Crop Type
      sql = `SELECT CropType, COUNT(*) AS CropCount FROM Crop GROUP BY CropType`;
      break;

    case '25': // Weather Conditions by Season
      sql = `
        SELECT s.SeasonName, COUNT(w.WeatherID) AS ConditionCount
        FROM WeatherCondition w
        JOIN Seasontype s ON w.Seasonid = s.SeasonID
        GROUP BY s.SeasonName`;
      break;

    case '26': // Temperature Ranges by Crop
      sql = `SELECT CropName, OptimalTemperature FROM Crop`;
      break;

    case '27': // Rainfall Distribution by Season
      sql = `
        SELECT s.SeasonName, w.RainfallRange
        FROM WeatherCondition w
        JOIN Seasontype s ON w.Seasonid = s.SeasonID`;
      break;

    case '28': // Crops by Region and Season
      sql = `
        SELECT c.Region, s.SeasonName, COUNT(c.CropID) AS CropCount
        FROM Crop c
        JOIN Seasontype s ON c.CropID = s.Cropid
        GROUP BY c.Region, s.SeasonName`;
      break;

      case '29': // Water Requirement vs. Crop Type (Line Chart)
      sql = `
        SELECT c.CropType, i.WaterRequirement
        FROM IrrigationMethod i
        JOIN Crop c ON i.Cropid = c.CropID
      `;
      chartType = 'line'; // Line chart for water requirement
      break;

    case '30': // Average Yield per Crop
      sql = `
        SELECT CropName, AVG(WaterRequirement) AS AverageYield
        FROM IrrigationMethod i
        JOIN Crop c ON i.Cropid = c.CropID
        GROUP BY CropName`;
      break;


    default:
      return res.status(400).json({ error: 'Invalid query ID' });
  }

  // Execute SQL Query
  adminDB.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database query error' });
    } else {
      console.log('Query results:', results); // Log results to see the data
      res.json({ results, chartType }); // Send both results and chartType
    }
  });
});





// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
