const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// fake DB
let users = [];

// serve HTML form
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Register</title>

  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #1f1c2c, #928dab);
    }

    .card {
      background: white;
      padding: 30px;
      border-radius: 15px;
      width: 320px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      text-align: center;
    }

    h2 {
      margin-bottom: 20px;
      color: #333;
    }

    input {
      width: 100%;
      padding: 10px;
      margin: 8px 0;
      border: 1px solid #ccc;
      border-radius: 8px;
      outline: none;
      transition: 0.3s;
    }

    input:focus {
      border-color: #6c63ff;
      box-shadow: 0 0 5px rgba(108,99,255,0.5);
    }

    button {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      background: #6c63ff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      transition: 0.3s;
    }

    button:hover {
      background: #574b90;
    }

    .msg {
      margin-top: 10px;
      font-size: 14px;
      color: green;
    }
  </style>

</head>

<body>

  <div class="card">
    <h2>Registration Form</h2>

    <form method="POST" action="/register">
      <input name="username" placeholder="Username" required />
      <input name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>

  </div>

</body>
</html>
  `);
});
// register API
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.send('All fields required');
  }

  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.send('User already exists');
  }

  users.push({ username, email, password });

  res.send('Registration successful');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
