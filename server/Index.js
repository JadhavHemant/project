const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');
const moment = require("moment");
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const app = express();
const port = 3001;
app.use(cors());

// Database configuration
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "postgres",
  database: "studentinfo",
  port: 5432,
});


// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/logos', express.static('logos'));

// get a list of student
app.get('/ideation', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM student_ideation');
    res.json(result.rows);
  } finally {
    client.release();
  }
});

// POST API endpoint
app.post('/add/ideation', async (req, res) => {
  try {
    const {
      student_name,
      student_class,
      student_roll_number,
      student_phone_no,
      email_id,
      student_college,
      description,
      problem_statement,
      solution,
      technology_inract,
      github_link,
      power_point_document,
      da_te_submited = moment().format('YYYY-MM-DD'),
      discipline,
      city,
      s_state,
      country,
      interested_in_startup,
      membervaliddate
    } = req.body;

    const daysDifference = Math.floor((new Date(membervaliddate) - new Date(da_te_submited)) / (1000 * 60 * 60 * 24));

    const flag = daysDifference > 0 ? false : true;
    const interested_in_membership = daysDifference > 0 ? false : true;
    const query = `
          INSERT INTO student_ideation (
              student_name,
              student_class,
              student_roll_number,
              student_phone_no,
              email_id,
              student_college,
              description,
              problem_statement,
              solution,
              technology_inract,
              github_link,
              power_point_document,
              da_te_submited,
              discipline,
              city,
              s_state,
              country,
              interested_in_membership,
              interested_in_startup,
              membervaliddate,
              flag
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING *`;

    const values = [
      student_name,
      student_class,
      student_roll_number,
      student_phone_no,
      email_id,
      student_college,
      description,
      problem_statement,
      solution,
      technology_inract,
      github_link,
      power_point_document,
      da_te_submited,
      discipline,
      city,
      s_state,
      country,
      interested_in_membership,
      interested_in_startup,
      membervaliddate,
      flag
    ];

    const result = await pool.query(query, values);

    res.status(201).json({ message: 'Data inserted successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Define a function to update the flag for all students
async function updateFlagsI() {
  try {
    const query = 'SELECT * FROM student_ideation';
    const { rows: students } = await pool.query(query);

    for (const student of students) {
      const currentDate = new Date();
      const membershipEndDate = new Date(student.membervaliddate);
      const daysDifference = Math.floor((membershipEndDate - currentDate) / (1000 * 60 * 60 * 24));

      const flag = membershipEndDate > currentDate;

      const updateQuery = 'UPDATE student_ideation SET flag = $1 WHERE id = $2';
      await pool.query(updateQuery, [flag, student.id]);
    }

    console.log('Flag values updated successfully');
  } catch (error) {
    console.error('Error updating flag values:', error);
  }
}

updateFlagsI();

setInterval(updateFlagsI, 3600000);

// PUT API endpoint
app.put('/update/ideation/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      student_name,
      student_class,
      student_roll_number,
      student_phone_no,
      email_id,
      student_college,
      description,
      problem_statement,
      solution,
      technology_inract,
      github_link,
      power_point_document,
      da_te_submited = moment().format('YYYY-MM-DD'),
      discipline,
      city,
      s_state,
      country,
      interested_in_startup,
      membervaliddate,
    } = req.body;


    const daysDifference = Math.floor((new Date(membervaliddate) - new Date(da_te_submited)) / (1000 * 60 * 60 * 24));

    const flag = daysDifference > 0 ? true : false;
    const interested_in_membership = daysDifference > 0 ? true : false;
    const query = `
      UPDATE student_ideation
      SET
        student_name = $1,
        student_class = $2,
        student_roll_number = $3,
        student_phone_no = $4,
        email_id = $5,
        student_college = $6,
        description = $7,
        problem_statement = $8,
        solution = $9,
        technology_inract = $10,
        github_link = $11,
        power_point_document = $12,
        da_te_submited=$13,
        discipline = $14,
        city = $15,
        s_state = $16,
        country = $17,
        interested_in_membership = $18,
        interested_in_startup = $19,
        membervaliddate = $20,
        flag = $21
      WHERE id = $22
      RETURNING *`;

    const values = [
      student_name,
      student_class,
      student_roll_number,
      student_phone_no,
      email_id,
      student_college,
      description,
      problem_statement,
      solution,
      technology_inract,
      github_link,
      power_point_document,
      da_te_submited,
      discipline,
      city,
      s_state,
      country,
      interested_in_membership,
      interested_in_startup,
      membervaliddate,
      flag,
      id
    ];

    // Execute the query
    const result = await pool.query(query, values);

    // Check if any row was updated
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'No record found for the provided ID.' });
    }

    res.status(200).json({ message: 'Data updated successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// delete Endpoint

app.delete('/delete/ideation/:id', async (req, res) => {
  const studentId = req.params.id;

  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM student_ideation WHERE id = $1 RETURNING *', [studentId]);
    if (result.rows.length === 0) {
      console.log('Student not found');
      res.status(404).json({ message: 'Student not found' });
    } else {
      console.log(`Student Id Is :${studentId}`);
      res.json({ message: 'Student deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    client.release();
  }
});




//  get idias of students id wise
app.get('/ideation/:id', async (req, res) => {
  const studentId = req.params.id;

  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM student_ideation WHERE id = $1', [studentId]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Student not found' });
    } else {
      res.json(result.rows[0]);
    }
  } finally {
    client.release();
  }
});

// GET API endpoint for retrieving ideation data by flag and total count
app.get('/ideation/flag/:flag', async (req, res) => {
  const flag = req.params.flag;

  try {
    const query = 'SELECT * FROM student_ideation WHERE flag = $1';
    const countQuery = 'SELECT COUNT(*) FROM student_ideation WHERE flag = $1';
    const values = [flag];

    const { rows } = await pool.query(query, values);
    const { rows: countRows } = await pool.query(countQuery, values);

    if (rows.length === 0) {
      res.status(404).json({ message: `No ideation data found with flag: ${flag}` });
    } else {
      const totalCount = countRows[0].count;
      res.status(200).json({ data: rows, totalCount });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create a new student reference
app.post('/studentsrefrence', async (req, res) => {
  try {
    const { name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone } = req.body;
    const result = await pool.query('INSERT INTO student_refrence_table (name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all students
app.get('/studentsrefrence', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM student_refrence_table');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific student by ID
app.get('/studentsrefrence/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM student_refrence_table WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a specific student by ID
app.put('/studentsrefrence/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone } = req.body;

    const result = await pool.query('UPDATE student_refrence_table SET name = $1, srnumber = $2, referencename = $3, college = $4, discipline = $5, cla_ss = $6, rollnumber = $7, referenceemail = $8, referencephone = $9 WHERE id = $10 RETURNING *',
      [name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone, id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a specific student by ID
app.delete('/studentsrefrence/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM student_refrence_table WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json({ message: 'Student deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// ///////////////////////////////
app.get('/research', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM research_table');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});


// // GET endpoint to fetch research by research_id
app.get('/research/:id', async (req, res) => {
  try {
    const researchId = req.params.id;
    const result = await pool.query('SELECT * FROM research_table WHERE id = $1', [researchId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Research entry not found.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST API endpoint for inserting data into research_table
app.post('/add/research', async (req, res) => {
  try {
    const {
      name,
      designation,
      organization,
      phone_no,
      email,
      discipline,
      research_topic,
      research_category,
      sub_research_category,
      methodology,
      abstract,
      expected_outcome,
      file_upload,
      city,
      state,
      country,
      interested_in_startup,
      validupto_date
    } = req.body;

    const submit_date = new Date().toISOString();
    const daysDifference = Math.floor((new Date(validupto_date) - new Date(submit_date)) / (1000 * 60 * 60 * 24));
    const flag = daysDifference > 0 ? true : false;
    const interested_membership = flag ? true : false;

    const query = `
      INSERT INTO research_table (
        name,
        designation,
        organization,
        phone_no,
        email,
        discipline,
        research_topic,
        research_category,
        sub_research_category,
        methodology,
        abstract,
        expected_outcome,
        file_upload,
        submit_date,
        city,
        state,
        country,
        validupto_date,
        interested_membership,
        interested_in_startup,
        flag
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
      RETURNING *`;

    const values = [
      name,
      designation,
      organization,
      phone_no,
      email,
      discipline,
      research_topic,
      research_category,
      sub_research_category,
      methodology,
      abstract,
      expected_outcome,
      file_upload,
      submit_date,
      city,
      state,
      country,
      validupto_date,
      interested_membership,
      interested_in_startup,
      flag
    ];

    const result = await pool.query(query, values);

    res.status(201).json({ message: 'Data inserted successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


/// PUT API endpoint for updating data in research_table
app.put('/update/research/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      designation,
      organization,
      phone_no,
      email,
      discipline,
      research_topic,
      research_category,
      sub_research_category,
      methodology,
      abstract,
      expected_outcome,
      file_upload,
      city,
      state,
      country,
      interested_in_startup,
      validupto_date
    } = req.body;

    const submit_date = new Date().toISOString();
    const daysDifference = Math.floor((new Date(validupto_date) - new Date(submit_date)) / (1000 * 60 * 60 * 24));
    const flag = daysDifference > 0 ? true : false;

    const interested_membership = flag ? true : false;

    const query = `
      UPDATE research_table
      SET
        name = $1,
        designation = $2,
        organization = $3,
        phone_no = $4,
        email = $5,
        discipline = $6,
        research_topic = $7,
        research_category = $8,
        sub_research_category = $9,
        methodology = $10,
        abstract = $11,
        expected_outcome = $12,
        file_upload = $13,
        submit_date = $14,
        city = $15,
        state = $16,
        country = $17,
        validupto_date = $18,
        interested_membership = $19,
        interested_in_startup = $20,
        flag = $21
      WHERE id = $22
      RETURNING *`;

    const values = [
      name,
      designation,
      organization,
      phone_no,
      email,
      discipline,
      research_topic,
      research_category,
      sub_research_category,
      methodology,
      abstract,
      expected_outcome,
      file_upload,
      submit_date,
      city,
      state,
      country,
      validupto_date,
      interested_membership,
      interested_in_startup,
      flag,
      id
    ];

    // Execute the query
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'No record found for the provided ID.' });
    }

    res.status(200).json({ message: 'Data updated successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Define a function to update the flag for all students
async function updateFlagsr() {
  try {
    const query = 'SELECT * FROM research_table';
    const { rows: students } = await pool.query(query);

    for (const student of students) {
      const currentDate = new Date();
      const membershipEndDate = new Date(student.membervaliddate);
      const daysDifference = Math.floor((membershipEndDate - currentDate) / (1000 * 60 * 60 * 24));

      const flag = membershipEndDate > currentDate;

      const updateQuery = 'UPDATE research_table SET flag = $1 WHERE id = $2';
      await pool.query(updateQuery, [flag, student.id]);
    }

    console.log('Flag values updated successfully research_table');
  } catch (error) {
    console.error('Error updating flag values:', error);
  }
}

updateFlagsr();

setInterval(updateFlagsr, 3600000);
// setInterval(updateFlagsr,1000);

app.delete('/research/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Check if research_id is undefined
    if (!id) {
      return res.status(400).json({ error: 'Invalid research ID.' });
    }

    const result = await pool.query('DELETE FROM research_table WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Research entry not found.' });
    }

    res.json({ message: 'Research entry deleted successfully.', deletedResearch: result.rows[0] });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});




// Create a new research reference
app.post('/researchref', async (req, res) => {
  try {
    const { name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone } = req.body;
    const result = await pool.query('INSERT INTO research_refrence_table (name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Get all students
app.get('/researchref', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM research_refrence_table');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Get a specific student by ID
app.get('/researchref/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM research_refrence_table WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Update a specific student by ID
app.put('/researchref/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone } = req.body;

    const result = await pool.query('UPDATE research_refrence_table SET name = $1, srnumber = $2, referencename = $3, college = $4, discipline = $5, cla_ss = $6, rollnumber = $7, referenceemail = $8, referencephone = $9 WHERE id = $10 RETURNING *',
      [name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone, id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Delete a specific student by ID
app.delete('/researchref/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM research_refrence_table WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json({ message: 'Student deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Get all ecosystems
app.get('/ecosystems', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ecosystems ');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



// Get a specific ecosystem by ID
app.get('/ecosystems/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM ecosystems  WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).send('Ecosystem not found');
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



app.post('/ecosystems', async (req, res) => {
  try {
    const {
      ecosystem_name,
      address,
      location,
      state,
      country,
      geo_coordinates,
      contact_name,
      contact_designation,
      website_link,
      phone_number,
      email_address,
      pincode,
      sector,
      areas_of_interest
    } = req.body;

    const result = await pool.query(
      'INSERT INTO ecosystems  (ecosystem_name, address, location, state, country, geo_coordinates, contact_name, contact_designation, website_link, phone_number, email_address, pincode, sector, areas_of_interest) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
      [
        ecosystem_name,
        address,
        location,
        state,
        country,
        geo_coordinates,
        contact_name,
        contact_designation,
        website_link,
        phone_number,
        email_address,
        pincode,
        sector,
        areas_of_interest
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// PUT endpoint for updating an existing ecosystem
app.put('/ecosystems/id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      ecosystem_name,
      address,
      location,
      state,
      country,
      geo_coordinates,
      contact_name,
      contact_designation,
      website_link,
      phone_number,
      email_address,
      pincode,
      sector,
      areas_of_interest
    } = req.body;

    const result = await pool.query(
      'UPDATE ecosystems  SET Ecosystem_Name = $2, Address = $3, Location = $4, State = $5, Country = $6, Geo_Coordinates = $7, Contact_Name = $8, Contact_Designation = $9, Website_Link = $10, Phone_Number = $11, Email_Address = $12, Pincode = $13, Sector = $14, Areas_of_Interest = $15 WHERE id = $1 RETURNING *',
      [
        id,
        ecosystem_name,
        address,
        location,
        state,
        country,
        geo_coordinates,
        contact_name,
        contact_designation,
        website_link,
        phone_number,
        email_address,
        pincode,
        sector,
        areas_of_interest
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ecosystem not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// DELETE endpoint for deleting an existing ecosystem
app.delete('/ecosystems/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM ecosystems  WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ecosystem not found' });
    }

    res.json({ message: 'Ecosystem deleted successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const date = moment().format('YYYY-MM-DD');
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET API for membergroupmaster table
app.get('/api/membergroupmaster', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM membergroupmaster');
    res.json(result.rows);
    client.release();
  } catch (error) {
    console.error('Error fetching membergroupmaster data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST API for membergroupmaster table
app.post('/api/membergroupmaster', async (req, res) => {
  const { Groupcode, Groupname, Groupdescription } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO membergroupmaster (Groupcode, Groupname, Groupdescription) VALUES ($1, $2, $3) RETURNING *',
      [Groupcode, Groupname, Groupdescription]
    );
    res.status(201).json(result.rows[0]);
    client.release();
  } catch (error) {
    console.error('Error adding data to membergroupmaster:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/membertypes', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Membertype');
    res.json(result.rows);
    client.release();
  } catch (error) {
    console.error('Error fetching member types:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/membertypes', async (req, res) => {
  const { Typecode, Typename, Typedescription } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO Membertype (Typecode, Typename, Typedescription) VALUES ($1, $2, $3) RETURNING *',
      [Typecode, Typename, Typedescription]
    );
    res.status(201).json(result.rows[0]);
    client.release();
  } catch (error) {
    console.error('Error adding member type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/membercategories', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Membercategory');
    const categories = result.rows;
    client.release();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching member categories', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/membercategories', async (req, res) => {
  const { Categorycode, Categoryname, Categorydescription } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO Membercategory (Categorycode, Categoryname, Categorydescription) VALUES ($1, $2, $3) RETURNING *',
      [Categorycode, Categoryname, Categorydescription]
    );
    const newCategory = result.rows[0];
    client.release();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error adding member category', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET endpoint to retrieve all members from the database
app.get('/api/members', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM members ');
    const members = result.rows;
    client.release();

    res.json(members);
  } catch (error) {
    console.error('Error fetching data from database', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
////

app.post('/add/members/studentids', async (req, res) => {
  try {
    const { id_student } = req.body;

    const defaultValues = {
      member_name: null,
      member_code: null,
      member_phone: null,
      member_email: null,
      member_password: null,
      photo_image: null,
      resume: null,
      id_card_proof: null,
      other_documents: null,
      geolocation: null,
      specialisation: null,
      address: null,
      city: null,
      state: null,
      pincode: null,
      technology: null
    };

    const dataToInsert = { ...defaultValues, id_student };
    const currentDate = new Date();
    const result = await pool.query(
      'INSERT INTO members  (member_name, member_code, member_phone, member_email, member_password, date_of_registration, photo_image, resume, id_card_proof, other_documents, geolocation, specialisation, address, city, state, pincode, technology, id_student) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *',
      [
        dataToInsert.member_name,
        dataToInsert.member_code,
        dataToInsert.member_phone,
        dataToInsert.member_email,
        dataToInsert.member_password,
        currentDate,
        dataToInsert.photo_image,
        dataToInsert.resume,
        dataToInsert.id_card_proof,
        dataToInsert.other_documents,
        dataToInsert.geolocation,
        dataToInsert.specialisation,
        dataToInsert.address,
        dataToInsert.city,
        dataToInsert.state,
        dataToInsert.pincode,
        dataToInsert.technology,
        id_student
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


////////////////////////////////////////////////////////////////

app.post('/api/add/members', async (req, res) => {
  const {
    member_name,
    member_code,
    member_phone,
    member_email,
    member_password,
    date_of_expire,
    photo_image,
    resume,
    id_card_proof,
    other_documents,
    geolocation,
    specialisation,
    address,
    city,
    state,
    pincode,
    technology,
    roll_number,
    class_member,
    discipline,
    membergroup,
    membercategory,
    membertype,
    id_student,
    organization_name,
    designation_role,
    country,
    interested_research,
    interested_startup,
    interested_investments,
    interested_mentoring,
    membership_frequency_renewal,

  } = req.body;

  try {
    const client = await pool.connect();
    const date_of_registration = moment().format('YYYY-MM-DD');
    const dateOfRegistration = moment(date_of_registration);
    const dateOfExpire = moment(date_of_expire);
    const membership_duration = dateOfExpire.diff(dateOfRegistration, 'days');
    const flag = membership_duration > 0;
    const interested_membership = flag;
    const membership_status = flag ? 'active' : 'inactive';
    const result = await client.query(
      'INSERT INTO members (member_name, member_code, member_phone, member_email, member_password, date_of_registration, date_of_expire, photo_image, resume, id_card_proof, other_documents, geolocation, specialisation, address, city, state, pincode, technology, roll_number, class_member, discipline, membergroup, membercategory, membertype, id_student, organization_name, designation_role, country, interested_membership, interested_research, interested_startup, interested_investments, interested_mentoring, membership_duration, membership_frequency_renewal, membership_status, flag) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37) RETURNING *',
      [
        member_name,
        member_code,
        member_phone,
        member_email,
        member_password,
        date_of_registration,
        date_of_expire,
        photo_image,
        resume,
        id_card_proof,
        other_documents,
        geolocation,
        specialisation,
        address,
        city,
        state,
        pincode,
        technology,
        roll_number,
        class_member,
        discipline,
        membergroup,
        membercategory,
        membertype,
        id_student,
        organization_name,
        designation_role,
        country,
        interested_membership,
        interested_research,
        interested_startup,
        interested_investments,
        interested_mentoring,
        membership_duration,
        membership_frequency_renewal,
        membership_status,
        flag
      ]
    );

    const newMember = result.rows[0];
    client.release();

    sendConfirmationEmail(newMember);

    res.status(201).json(newMember);
    console.log('Member added successfully');
  } catch (error) {
    console.error('Error adding member', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



function sendConfirmationEmail(user) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jadhavhemantbalkrushna@gmail.com',
      pass: 'hyct mbxz cmhj rimd',
    },
  });

  const mailOptions = {
    from: 'jadhavhemantbalkrushna@gmail.com',
    to: user.member_email,
    subject: 'Registration Confirmation',
    text: `Dear ${user.member_name},\n\nThank you for registering. Your registration was successful. your username is ${user.member_email} and password is ${user.member_password}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


async function updateFlags() {
  try {
    const currentDate = new Date();

    const query = 'SELECT * FROM members';
    const { rows: members } = await pool.query(query);

    for (const member of members) {
      const membershipEndDate = new Date(member.date_of_expire);

      if (membershipEndDate < currentDate) {
        const updateQuery = 'UPDATE members SET flag = $1, membership_status = $2 WHERE id = $3';
        await pool.query(updateQuery, [false, 'inactive', member.id]);
      } else {
        const updateQuery = 'UPDATE members SET flag = $1, membership_status = $2 WHERE id = $3';
        await pool.query(updateQuery, [true, 'active', member.id]);
      }
    }

    console.log('Flag values updated successfully in the member table');
  } catch (error) {
    console.error('Error updating flag values:', error);
  }
}

updateFlags();

setInterval(updateFlags, 3600000);

// end poin of login

app.post('/api/login', async (req, res) => {
  const { member_email, member_password } = req.body;

  try {
    const client = await pool.connect();

    const result = await client.query(
      'SELECT id, member_password, flag FROM members WHERE member_email = $1',
      [member_email]
    );

    const user = result.rows[0];

    if (user) {
      if (user.flag === true) {
        if (member_password === user.member_password) {
          res.status(200).json({ message: 'Login successful', id: user.id });
          console.log(user.id);
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      } else {
        res.status(403).json({ error: 'Your membership is inactive. Please contact support for assistance.' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }

    client.release();
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get id wise user
app.get('/api/members/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM members WHERE id = $1', [id]);

    const member = result.rows[0];

    if (member) {
      res.status(200).json(member);
    } else {
      res.status(404).json({ error: 'Member not found' });
    }

    client.release();
  } catch (error) {
    console.error('Error fetching member data', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// Update endpoint
app.put('/api/update/member/:id', async (req, res) => {
  const memberId = req.params.id;
  const {
    member_name,
    member_code,
    member_phone,
    member_email,
    member_password,
    photo_image,
    resume,
    id_card_proof,
    other_documents,
    geolocation,
    specialisation,
    address,
    city,
    state,
    pincode,
    technology,
    roll_number,
    class_member,
    discipline,
    membergroup,
    membercategory,
    membertype,
    id_student,
  } = req.body;

  try {
    const client = await pool.connect();

    const result = await client.query(
      `UPDATE members
      SET 
        member_name = $1,
        member_code = $2,
        member_phone = $3,
        member_email = $4,
        member_password = $5,
        photo_image = $6,
        resume = $7,
        id_card_proof = $8,
        other_documents = $9,
        geolocation = $10,
        specialisation = $11,
        address = $12,
        city = $13,
        state = $14,
        pincode = $15,
        technology = $16,
        roll_number = $17,
        class_member = $18,
        discipline = $19,
        membergroup = $20,
        membercategory = $21,
        membertype = $22,
        id_student = $23
      WHERE id = $24
      RETURNING *`,
      [
        member_name,
        member_code,
        member_phone,
        member_email,
        member_password,
        photo_image,
        resume,
        id_card_proof,
        other_documents,
        geolocation,
        specialisation,
        address,
        city,
        state,
        pincode,
        technology,
        roll_number,
        class_member,
        discipline,
        membergroup,
        membercategory,
        membertype,
        id_student,
        memberId,
      ]
    );

    const updatedMember = result.rows[0];
    client.release();

    sendUpdateEmail(updatedMember);
    res.status(200).json(updatedMember);
    console.log('Member updated successfully');
  } catch (error) {
    console.error('Error updating member', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function sendUpdateEmail(user) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jadhavhemantbalkrushna@gmail.com',
      pass: 'hyct mbxz cmhj rimd',
    },
  });

  const mailOptions = {
    from: 'jadhavhemantbalkrushna@gmail.com',
    to: user.member_email,
    subject: 'Update Confirmation',
    text: `Dear ${user.member_name},\n\nYour registration details have been updated successfully. Here is your updated information:\n\nMember Name: ${user.member_name}\nMember Email: ${user.member_email}\n and Your Password is ${user.member_password} .`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}




// delete endpoint
app.delete('/api/members/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM members WHERE id = $1 RETURNING *', [id]);

    const deletedMember = result.rows[0];

    if (deletedMember) {
      res.status(200).json({ message: 'Member deleted successfully', deletedMember });
    } else {
      res.status(404).json({ error: 'Member not found' });
    }

    client.release();
  } catch (error) {
    console.error('Error deleting member', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//MemberShip records 

// GET endpoint to retrieve all membership records
app.get('/api/membershiprecords', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM membership_record');
    const membershipRecords = result.rows;
    client.release();

    res.json(membershipRecords);
  } catch (error) {
    console.error('Error fetching membership records', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/api/add/membershiprecord', async (req, res) => {
  const {
    member_id,
    membership_type,
    membership_category,
    membership_duration,
    membership_frequency_renewal,
    membership_status,
  } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO membership_record (member_id, membership_type, membership_category, membership_duration, membership_frequency_renewal, membership_status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        member_id,
        membership_type,
        membership_category,
        membership_duration,
        membership_frequency_renewal,
        membership_status,
      ]
    );

    const newMembershipRecord = result.rows[0];
    client.release();

    res.status(201).json(newMembershipRecord);
  } catch (error) {
    console.error('Error adding membership record', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// PUT endpoint to update a membership record by member ID
app.put('/api/update/membershiprecord/:id', async (req, res) => {
  const membership_record_id = req.params.id;
  const {
    membership_type,
    membership_category,
    membership_duration,
    membership_frequency_renewal,
    membership_status,
  } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE membership_record SET Membership_Type=$1, Membership_Category=$2, Membership_Duration=$3, Membership_Frequency_Renewal=$4, Membership_Status=$5 WHERE membership_record_id=$6 RETURNING *',
      [
        membership_type,
        membership_category,
        membership_duration,
        membership_frequency_renewal,
        membership_status,
        membership_record_id,
      ]
    );

    const updatedMembershipRecord = result.rows[0];

    if (updatedMembershipRecord) {
      res.status(200).json(updatedMembershipRecord);
    } else {
      res.status(404).json({ error: 'Membership record not found' });
    }

    client.release();
  } catch (error) {
    console.error('Error updating membership record', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// DELETE endpoint to remove a membership record by member ID
app.delete('/api/delete/membershiprecord/:id', async (req, res) => {
  const membership_record_id = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'DELETE FROM membership_record WHERE membership_record_id = $1 RETURNING *',
      [membership_record_id]
    );

    const deletedMembershipRecord = result.rows[0];

    if (deletedMembershipRecord) {
      res.status(200).json({ message: 'Membership record deleted successfully', deletedMembershipRecord });
    } else {
      res.status(404).json({ error: 'Membership record not found' });
    }

    client.release();
  } catch (error) {
    console.error('Error deleting membership record', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// GET endpoint to retrieve a specific membership record by ID
app.get('/api/id/membershiprecord/:id', async (req, res) => {
  const membership_record_id = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM membership_record WHERE membership_record_id = $1', [membership_record_id]);

    const membershipRecord = result.rows[0];

    if (membershipRecord) {
      res.status(200).json(membershipRecord);
    } else {
      res.status(404).json({ error: 'Membership record not found' });
    }

    client.release();
  } catch (error) {
    console.error('Error fetching membership record data', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET API to retrieve all interested people
app.get('/api/interestedpeople', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM interested_people_table');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving interested people:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST API to add a new interested person
app.post('/api/interestedpeople', async (req, res) => {
  const { interested_name, email, phonenumber, interest_id, opportunity_id, opportunity_name, memberid, member_email, } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO interested_people_table (interested_name, email, phonenumber, interest_id, opportunity_id,opportunity_name,memberid,member_email ) VALUES ($1, $2, $3, $4, $5,$6,$7,$8) RETURNING *',
      [interested_name, email, phonenumber, interest_id, opportunity_id, opportunity_name, memberid, member_email]
    );
    client.release();
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding interested person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/////
// GET API to fetch all interested people data for a specific memberid
app.get('/api/interestedpeople/:interest_id', async (req, res) => {
  const { interest_id } = req.params; // Extract memberid from the request parameters
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM interested_people_table WHERE interest_id = $1', [interest_id]);
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching interested people data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

///////////////////////////////////////////
// DELETE endpoint to remove an opportunity by ID
app.delete('/api/delete/interested/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM interested_people_table WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Opportunity not found' });
    } else {
      const deletedOpportunity = result.rows[0];
      client.release();
      res.json(deletedOpportunity);
    }
  } catch (error) {
    console.error('Error deleting opportunity', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//////////////////////////////////////////
app.get('/api/selection_status/result/:flagValue', async (req, res) => {
  const { flagValue } = req.params; // Access the flag value from URL path parameter

  try {
    const client = await pool.connect();
    let result;

    if (flagValue === 'true' || flagValue === 'false') {
      result = await client.query('SELECT * FROM selection_table WHERE flag = $1', [flagValue]);
    } else {
      result = await client.query('SELECT * FROM selection_table');
    }

    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/////////////////////////////////
////////////////////////////////
app.post('/api/selection_status/result', async (req, res) => {
  const { applicant_name, phonenumber, selection_status, opportunity_name, opportunity_id, flag, memberid } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO selection_table (applicant_name,phonenumber,selection_status,opportunity_name,opportunity_id,flag,memberid ) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *', [applicant_name, phonenumber, selection_status, opportunity_name, opportunity_id, flag, memberid]);
    client.release();
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding :', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
///////////////////
app.get('/api/selection_status/result/:memberid', async (req, res) => {
  const { memberid } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM selection_table WHERE memberid = $1', [memberid]);
    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
/////////////////////////////////////////
app.put('/api/selection_status/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE selection_table SET flag = $1 WHERE id = $2 RETURNING *', [false, id]);
    client.release();

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Entry not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error updating flag:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
////////////////////////////////////////
app.get('/api/selection_status/result/all', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM selection_table');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/selection_status/result', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM selection_table WHERE flag = $1', ['true']);
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// //////////////////////////////////////
app.get('/api/memberidoppodata/intre/:id', async (req, res) => {
  const memberid = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM interested_people_table WHERE memberid = $1', [memberid]);
    client.release();

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      const opportunityDetails = result.rows;
      res.json(opportunityDetails);
    }
  } catch (error) {
    console.error('Error fetching data details from database', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ///////////////////////////////////////////////////////
// GET API to retrieve all opportunity types
app.get('/api/opportunity_types', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM opportunity_types');
    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST API to add a new opportunity type
app.post('/api/opportunity_types', async (req, res) => {
  const { opportunity_type } = req.body;
  if (!opportunity_type) {
    return res.status(400).json({ error: 'Opportunity type is required' });
  }

  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO opportunity_types (opportunity_type) VALUES ($1) RETURNING *', [opportunity_type]);
    client.release();
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



///////////////////////

app.get('/api/optiondata', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM opportunities_with_types');
    const opportunities = result.rows;
    client.release();

    res.json(opportunities);
  } catch (error) {
    console.error('Error fetching opportunities records', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET endpoint to retrieve all opportunities from the database
app.get('/api/opportunity', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Opportunities');

    const opportunities = result.rows;
    client.release();

    res.json(opportunities);
  } catch (error) {
    console.error('Error fetching opportunities records', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/opportunityu', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT DISTINCT ON (opportunity_provider,opportunity_expected_work_zone) * FROM Opportunities');
    const opportunities = result.rows;
    client.release();

    res.json(opportunities);
  } catch (error) {
    console.error('Error fetching unique opportunities records', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// DELETE endpoint to remove an opportunity by ID
app.delete('/api/delete/opportunities/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM Opportunities WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Opportunity not found' });
    } else {
      const deletedOpportunity = result.rows[0];
      client.release();
      res.json(deletedOpportunity);
    }
  } catch (error) {
    console.error('Error deleting opportunity', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename files to prevent collisions
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

// Modify your route to handle file upload
app.post('/api/opportunity', upload.single('photo'), async (req, res) => {
  // Extract other form fields from req.body
  const {
    opportunity_type_id,
    opportunity_name,
    opportunity_description,
    opportunity_provider,
    opportunity_start_date,
    opportunity_end_date,
    opportunity_problem_statement,
    opportunity_expected_solution,
    opportunity_expected_work_zone,
    opportunity_expected_work_time,
    opportunity_work_type,
    opportunity_budget_available,
    opportunity_estimate_budget,
    budget_currency,
    opportunity_resource_volume,
    opportunity_status,
    opportunity_code,
    revised_volume,
    revised_budget,
    email,
    member_id,
    file_upload
  } = req.body;

  // Get the file name from req.file
  const photo = req.file.filename;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO Opportunities (opportunity_type_id, opportunity_name, opportunity_description, opportunity_provider, opportunity_start_date, opportunity_end_date, opportunity_problem_statement, opportunity_expected_solution, opportunity_expected_work_zone, opportunity_expected_work_time, opportunity_work_type, opportunity_budget_available, opportunity_estimate_budget, budget_currency, opportunity_resource_volume, opportunity_status, opportunity_code, revised_volume, revised_budget, create_date, email, member_id, file_upload, photos) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, CURRENT_DATE, $20, $21, $22, $23)',
      [
        opportunity_type_id,
        opportunity_name,
        opportunity_description,
        opportunity_provider,
        opportunity_start_date,
        opportunity_end_date,
        opportunity_problem_statement,
        opportunity_expected_solution,
        opportunity_expected_work_zone,
        opportunity_expected_work_time,
        opportunity_work_type,
        opportunity_budget_available,
        opportunity_estimate_budget,
        budget_currency,
        opportunity_resource_volume,
        opportunity_status,
        opportunity_code,
        revised_volume,
        revised_budget,
        email,
        member_id,
        file_upload, 
        photo 
      ]
    );
    client.release();
    const newOpportunity = result.rows[0];
    res.status(201).json(newOpportunity);
  } catch (error) {
    console.error('Error adding opportunity', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



///////////////////////////////////////

// Function to update opportunity statuses
const updateOpportunityStatus = async () => {
  try {
    const client = await pool.connect();
    const currentDate = new Date().toISOString().split('T')[0];
    const query = {
      text: 'UPDATE Opportunities SET opportunity_status = $1 WHERE opportunity_end_date < $2',
      values: ['inactive', currentDate],
    };
    const result = await client.query(query);
    client.release();
    console.log(`Updated ${result.rowCount} opportunities`);
  } catch (error) {
    console.error('Error updating opportunity status:', error);
  }
};

updateOpportunityStatus();

setInterval(updateOpportunityStatus, 3600000);


const currentDate = new Date(); // Create a Date object representing the current date
app.get('/api/opportunity/date-gap/:gap', async (req, res) => {
  const { gap } = req.params;

  try {
    const endDate = new Date(currentDate.getTime() + (gap * 24 * 60 * 60 * 1000));
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM Opportunities WHERE opportunity_start_date >= $1 AND opportunity_start_date <= $2`,
      [currentDate.toISOString(), endDate.toISOString()]
    );
    client.release();
    const Gaps = result.rows;
    res.status(200).json(Gaps);
  } catch (error) {
    console.error('Error fetching opportunities based on date gap', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
///
app.get('/api/opportunity/provider/:provider', async (req, res) => {
  const { provider } = req.params;

  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM Opportunities WHERE opportunity_provider = $1`,
      [provider]
    );
    client.release();
    const providers = result.rows;
    res.status(200).json(providers);
  } catch (error) {
    console.error('Error fetching opportunities by provider', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//////
app.get('/api/opportunity/work-zone/:workZone', async (req, res) => {
  const { workZone } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM Opportunities WHERE opportunity_expected_work_zone = $1`,
      [workZone]
    );
    client.release();
    const zonew = result.rows;
    res.status(200).json(zonew);
  } catch (error) {
    console.error('Error fetching opportunities by work zone', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
///
app.get('/api/opportunity/work-type/:workType', async (req, res) => {
  const { workType } = req.params;

  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM Opportunities WHERE opportunity_work_type = $1`,
      [workType]
    );
    client.release();
    const worktype = result.rows;
    res.status(200).json(worktype);
  } catch (error) {
    console.error('Error fetching opportunities by work type', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// /////////////////////////////////////////
app.put('/api/update/opportunity/:id', async (req, res) => {
  const id = req.params.id;

  const {
    opportunity_type,
    opportunity_name,
    opportunity_description,
    opportunity_provider,
    opportunity_start_date,
    opportunity_end_date,
    opportunity_problem_statement,
    opportunity_expected_solution,
    opportunity_expected_work_zone,
    opportunity_expected_work_time,
    opportunity_work_type,
    opportunity_budget_available,
    opportunity_estimate_budget,
    budget_currency,
    opportunity_resource_volume,
    opportunity_status
  } = req.body;

  // Convert empty date strings to null
  const start_date = opportunity_start_date || null;
  const end_date = opportunity_end_date || null;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE Opportunities SET opportunity_type = $1, opportunity_name = $2, opportunity_description = $3, opportunity_provider = $4, opportunity_start_date = $5, opportunity_end_date = $6, opportunity_problem_statement = $7, opportunity_expected_solution = $8, opportunity_expected_work_zone = $9, opportunity_expected_work_time = $10, opportunity_work_type = $11, opportunity_budget_available = $12, opportunity_estimate_budget = $13, budget_currency = $14, opportunity_resource_volume = $15, opportunity_status = $16 WHERE id = $17 RETURNING *',
      [
        opportunity_type,
        opportunity_name,
        opportunity_description,
        opportunity_provider,
        start_date,
        end_date,
        opportunity_problem_statement,
        opportunity_expected_solution,
        opportunity_expected_work_zone,
        opportunity_expected_work_time,
        opportunity_work_type,
        opportunity_budget_available,
        opportunity_estimate_budget,
        budget_currency,
        opportunity_resource_volume,
        opportunity_status,
        id
      ]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Opportunity not found' });
    } else {
      const updatedOpportunity = result.rows[0];
      client.release();
      res.json(updatedOpportunity);
    }
  } catch (error) {
    console.error('Error updating opportunity', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// GET endpoint to retrieve details of an opportunity by ID
app.get('/api/opportunitys/:opportunity_type_id', async (req, res) => {
  try {
    const opportunityTypeId = parseInt(req.params.opportunity_type_id);

    const client = await pool.connect();
    const query = {
      text: 'SELECT * FROM opportunities WHERE opportunity_type_id = $1',
      values: [opportunityTypeId],
    };
    const result = await client.query(query);

    client.release();

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Opportunities not found for the given opportunity type ID' });
    } else {
      const opportunityDetails = result.rows;
      res.json(opportunityDetails);
    }
  } catch (error) {
    console.error('Error fetching opportunities by opportunity_type_id from database', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// GET endpoint to retrieve details of an opportunity by ID
app.get('/api/opportunity/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Opportunities WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Opportunity not found' });
    } else {
      const opportunityDetails = result.rows[0];
      client.release();
      res.json(opportunityDetails);
    }
  } catch (error) {
    console.error('Error fetching opportunity details from database', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/send-email', async (req, res) => {
  const { selectedOpportunities, recipientEmails } = req.body;
  if (!Array.isArray(recipientEmails)) {
    return res.status(400).json({ error: 'recipientEmails must be an array' });
  }
  if (recipientEmails.length === 0) {
    return res.status(400).json({ error: 'recipientEmails array is empty' });
  }
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'jadhavhemantbalkrushna@gmail.com',
      pass: 'hyct mbxz cmhj rimd',
    }
  });

  try {
    let text = 'Dear Member,\n\n';
    selectedOpportunities.forEach((opportunity, index) => {
      text += `${index + 1}. ${opportunity.name}\n`;
    });
    text += '\nFor details, please log on to our site.\n\nThanks,\nThe pcombinator and passionit team';

    let mailOptions = {
      from: 'jadhavhemantbalkrushna@gmail.com',
      to: recipientEmails.join(','),
      subject: 'Opportunity',
      text: text
    };

    // Send email for all selected opportunities
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Error sending emails' });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET endpoint to retrieve all Opportunity_Allocation records
app.get('/api/get/opportunityallocation', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Opportunity_Allocation');
    const opportunityAllocations = result.rows;
    client.release();
    res.json(opportunityAllocations);
  } catch (error) {
    console.error('Error fetching data from database', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// POST endpoint to insert data into Opportunity_Allocation

app.post('/api/post/opportunityallocation', async (req, res) => {
  const {
    opportunity_id,
    opportunity_allocated_by,
    opportunity_allocated_to,
    opportunity_for,
    opportunity_allocation_date,
    opportunity_allocation_status,
    opportunity_allocation_remark,
    opportunity_details_doc,
    memberrole
  } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO Opportunity_Allocation (opportunity_id, opportunity_allocated_by, opportunity_allocated_to, opportunity_for, opportunity_allocation_date, opportunity_allocation_status, opportunity_allocation_remark, opportunity_details_doc,memberrole) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9) RETURNING *',
      [
        opportunity_id,
        opportunity_allocated_by,
        opportunity_allocated_to,
        opportunity_for,
        opportunity_allocation_date,
        opportunity_allocation_status,
        opportunity_allocation_remark,
        opportunity_details_doc,
        memberrole
      ]
    );
    const newOpportunityAllocation = result.rows[0];
    client.release();
    res.status(201).json(newOpportunityAllocation);
  } catch (error) {
    console.error('Error adding Opportunity Allocation', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// ///////////////////////
app.post('/api/update/opportunityallocation/:id', async (req, res) => {
  const id = req.params.id;
  const {
    opportunity_allocated_by,
    opportunity_allocated_to,
    opportunity_for,
    opportunity_allocation_date,
    opportunity_allocation_status,
    opportunity_allocation_remark,
    opportunity_details_doc,
    memberrole
  } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE Opportunity_Allocation SET opportunity_allocated_by = $1, opportunity_allocated_to = $2, opportunity_for = $3, opportunity_allocation_date = $4, opportunity_allocation_status = $5, opportunity_allocation_remark = $6, opportunity_details_doc = $7, memberrole = $8 WHERE id = $9 RETURNING *',
      [
        opportunity_allocated_by,
        opportunity_allocated_to,
        opportunity_for,
        opportunity_allocation_date,
        opportunity_allocation_status,
        opportunity_allocation_remark,
        opportunity_details_doc,
        memberrole,
        id
      ]
    );

    const updatedOpportunityAllocation = result.rows[0];
    client.release();

    if (updatedOpportunityAllocation) {
      res.json(updatedOpportunityAllocation);
    } else {
      res.status(404).json({ error: 'Opportunity Allocation not found' });
    }
  } catch (error) {
    console.error('Error updating Opportunity Allocation', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


///////
app.delete('/api/opportunityallocation/:id', async (req, res) => {
  const id = req.params.id;

  try {
    console.log('Attempting to delete opportunity allocation with ID:', id);

    const client = await pool.connect();
    const result = await client.query('DELETE FROM Opportunity_Allocation  WHERE id = $1 RETURNING *', [id]);

    const deletedOpportunityAllocation = result.rows[0];
    client.release();

    if (deletedOpportunityAllocation) {
      res.json(deletedOpportunityAllocation);
    } else {
      console.log('Opportunity Allocation not found');
      res.status(404).json({ error: 'Opportunity Allocation not found' });
    }
  } catch (error) {
    console.error('Error deleting Opportunity Allocation', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



/////////////////////////////////////////
app.get('/api/opportunity_allocation/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Opportunity_Allocation WHERE id = $1', [id]);

    const opportunityAllocation = result.rows[0];
    client.release();

    if (opportunityAllocation) {
      res.json(opportunityAllocation);
    } else {
      res.status(404).json({ error: 'Opportunity Allocation not found' });
    }
  } catch (error) {
    console.error('Error fetching Opportunity Allocation by ID', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ///////////////////////////////////////////////////////////////////////////
app.get('/api/get/memberinterviewrecords', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Member_Interview_Records ');

    const interviewRecords = result.rows;
    client.release();
    res.status(200).json(interviewRecords);
  } catch (error) {
    console.error('Error retrieving interview records', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/post/memberinterviewrecords', async (req, res) => {
  const {
    interviewed_by,
    interview_assessment,
    interview_score,
    interview_video_link,
    opportunity_id
  } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO Member_Interview_Records  (Interviewed_By, Interview_Assessment, Interview_Score, Interview_Video_Link, id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        interviewed_by,
        interview_assessment,
        interview_score,
        interview_video_link,
        opportunity_id
      ]
    );

    const newInterviewRecord = result.rows[0];
    client.release();
    res.status(201).json(newInterviewRecord);
  } catch (error) {
    console.error('Error adding interview record', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.put('/api/member_interview_records/:interviewId', async (req, res) => {
  const interviewId = req.params.interviewId;
  const {
    Interviewed_By,
    Interview_Assessment,
    Interview_Score,
    Interview_Video_Link,
    id
  } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE Member_Interview_Records  SET Interviewed_By = $1, Interview_Assessment = $2, Interview_Score = $3, Interview_Video_Link = $4, id = $5 WHERE Interview_id = $6 RETURNING *',
      [
        Interviewed_By,
        Interview_Assessment,
        Interview_Score,
        Interview_Video_Link,
        id,
        interviewId
      ]
    );

    const updatedInterviewRecord = result.rows[0];
    client.release();

    if (!updatedInterviewRecord) {
      return res.status(404).json({ error: 'Interview record not found' });
    }

    res.json(updatedInterviewRecord);
  } catch (error) {
    console.error('Error updating interview record', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.delete('/api/memberinterviewrecords/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'DELETE FROM Member_Interview_Records WHERE id = $1 RETURNING *',
      [id]
    );

    const deletedInterviewRecord = result.rows[0];
    client.release();

    if (!deletedInterviewRecord) {
      return res.status(404).json({ error: 'Interview record not found' });
    }

    res.json({ message: 'Interview record deleted successfully', deletedInterviewRecord });
  } catch (error) {
    console.error('Error deleting interview record', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/member_interview_records/:interviewId', async (req, res) => {
  const interviewId = req.params.interviewId;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT * FROM Member_Interview_Records  WHERE Interview_id = $1',
      [interviewId]
    );

    const interviewRecord = result.rows[0];
    client.release();

    if (!interviewRecord) {
      return res.status(404).json({ error: 'Interview record not found' });
    }

    res.json(interviewRecord);
  } catch (error) {
    console.error('Error fetching interview record', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// /////////////////////////////////////////////
// Create a new member reference
app.post('/api/memberrefrence', async (req, res) => {
  try {
    const { name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone, membre_id } = req.body;
    const result = await pool.query('INSERT INTO refre_members (name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone,membre_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *',
      [name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone, membre_id]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all students
app.get('/api/memberrefrence', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM refre_members');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific student by ID
app.get('/api/memberrefrence/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM refre_members WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a specific student by ID
app.put('/api/memberrefrence/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone } = req.body;

    const result = await pool.query('UPDATE refre_members SET name = $1, srnumber = $2, referencename = $3, college = $4, discipline = $5, cla_ss = $6, rollnumber = $7, referenceemail = $8, referencephone = $9 WHERE id = $10 RETURNING *',
      [name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone, id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a specific student by ID
app.delete('/api/memberrefrence/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM refre_members WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json({ message: 'Student deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// ///////////////////////////////
app.post('/api/resourcemaster', async (req, res) => {
  try {
    const { resourcename, designation, status, empcode, fromdate, todate } = req.body;
    const result = await pool.query('INSERT INTO resourcemaster (resourcename, designation, status,empcode,fromdate,todate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [resourcename, designation, status, empcode, fromdate, todate]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all students

app.get('/api/resourcemaster', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM resourcemaster');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific student by ID
app.get('/api/resourcemaster/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM refre_members WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a specific student by ID
app.put('/api/resourcemaster/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone } = req.body;

    const result = await pool.query('UPDATE refre_members SET name = $1, srnumber = $2, referencename = $3, college = $4, discipline = $5, cla_ss = $6, rollnumber = $7, referenceemail = $8, referencephone = $9 WHERE id = $10 RETURNING *',
      [name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone, id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a specific student by ID
app.delete('/api/resourcemaster/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM refre_members WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json({ message: 'Student deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


////////////////////////////////////////////////

app.post('/send-email/single/usr/data', async (req, res) => {
  const { recipientEmail } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: "jadhavhemantbalkrushna@gmail.com",
        pass: "hyct mbxz cmhj rimd",
      },
    });

    let mailOptions = {
      from: "jadhavhemantbalkrushna@gmail.com",
      to: recipientEmail,
      subject: "check",
      text: "testing",
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/api/opportunity_incentive', async (req, res) => {
  try {
    const { opportunity_id, designation, incentivepercentage } = req.body;
    const result = await pool.query('INSERT INTO opportunity_incentive (opportunity_id, designation, incentivepercentage) VALUES ($1, $2, $3) RETURNING *',
      [opportunity_id, designation, incentivepercentage]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all students

app.get('/api/opportunity_incentive', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM opportunity_incentive');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific student by ID
app.get('/api/opportunity_incentive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM opportunity_incentive WHERE incentive_id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a specific student by ID

app.put('/api/opportunity_incentive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { opportunity_id, designation, incentivepercentage } = req.body;

    const result = await pool.query('UPDATE opportunity_incentive SET opportunity_id = $1, designation = $2, incentivepercentage = $3 WHERE incentive_id = $4 RETURNING *',
      [opportunity_id, designation, incentivepercentage, id]); 
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Opportunity incentive not found' }); 
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Delete a specific student by ID
app.delete('/api/opportunity_incentive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM opportunity_incentive WHERE incentive_id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json({ message: ' deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'logos'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  } 
});
const uploadS = multer({ storage: storage1 });
app.post('/api/create-group', uploadS.single('groupLogo'), async (req, res) => {
  const { memberid, groupcode, groupname, groupcaption, groupwebsitelink, group_owner, email, phone, transactionvalue } = req.body;
  const groupLogoPath = req.file ? req.file.path : null;
  try {
    const client = await pool.connect();
    const query = `INSERT INTO group_s (memberid, groupcode, groupname, groupcaption, groupwebsitelink, group_owner, email, phone, transactionvalue, grouplogo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    const values = [memberid, groupcode, groupname, groupcaption, groupwebsitelink, group_owner, email, phone, transactionvalue, groupLogoPath];
    await client.query(query, values);
    client.release();
    res.status(201).json({ message: 'Group created successfully' });
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all groups
app.get('/api/groups', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM group_s');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific student by ID
app.get('/api/group/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM group_s WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a specific student by ID
app.put('/api/group/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {memberid, groupcode, groupname, grouplogo, groupcaption, groupwebsitelink, group_owner, email, phone, transactionvalue } = req.body;
    const result = await pool.query('UPDATE group_s SET memberid=$1, groupcode=$2, groupname=$3, grouplogo=$4, groupcaption=$5, groupwebsitelink=$6, group_owner=$7, email=$8, phone=$9, transactionvalue=$10 WHERE id = $11 RETURNING *',
      [memberid, groupcode, groupname, grouplogo, groupcaption, groupwebsitelink, group_owner, email, phone, transactionvalue, id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a specific student by ID
app.delete('/api/groups/:id', async (req, res) => {
  const groupId = req.params.id;
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM group_member WHERE group_id = $1', [groupId]);
    const result = await client.query('DELETE FROM group_s WHERE id = $1 RETURNING *', [groupId]);
    const deletedGroup = result.rows[0];
    if (deletedGroup) {
      res.status(200).json({ message: 'Group deleted successfully', deletedGroup });
    } else {
      res.status(404).json({ error: 'Group not found' });
    }
    client.release();
  } catch (error) {
    console.error('Error deleting group', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// /////////////////////////////////////////////////////////////////////////////////////////////
app.post('f', async (req, res) => {
  try {
    const { resourcename, designation, status, empcode, fromdate, todate } = req.body;
    const result = await pool.query('INSERT INTO group_member (resourcename, designation, status,empcode,fromdate,todate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [resourcename, designation, status, empcode, fromdate, todate]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all students

app.get('/api/group_member', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM group_member');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific student by ID
app.get('/api/group_member/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM group_member WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a specific group member by ID
app.put('/api/group_member/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { group_id, memberid, membername, email, phone, transactionvalue } = req.body;
    const result = await pool.query(
      'UPDATE group_member SET group_id=$1, memberid=$2, membername=$3, email=$4, phone=$5, transactionvalue=$6 WHERE id = $7 RETURNING *',
      [group_id, memberid, membername, email, phone, transactionvalue, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Group member not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Delete a specific group member by ID
app.delete('/api/group_member/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Delete related records from other tables first
    await pool.query('DELETE FROM other_table WHERE group_member_id = $1', [id]);

    // Now delete the record from group_member table
    const result = await pool.query('DELETE FROM group_member WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Group member not found' });
    } else {
      res.json({ message: 'Group member deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

       


////////////////////////////////////////////////////////////////////////////////////////////////
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
