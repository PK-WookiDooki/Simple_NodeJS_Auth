import express from "express";
import cors from "cors";
import sql from "mysql2";
import bodyParser from "body-parser";
import router from "./routes/usersRoute.js";

const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const port = 9990;
export const db = sql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "pk2001111",
  database: "nodejs_react",
});

//userRoute
app.use(router);

// app.get("/", async (req, res) => {
//   const q = "SELECT * FROM users";
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     if (!(name && email && password)) {
//       return res.json({ success: false, message: "All input is required!" });
//     }

//     const hashPws = hashSync(password, 10);
//     // return res.json({ data: hashPws });

//     const findQ = "SELECT * FROM users WHERE email = ? ";
//     const q =
//       "INSERT INTO users (`name`, `email`, `password`, `role`) VALUES (?)";
//     const values = [name, email, hashPws, role];
//     db.query(findQ, [email], (err, data) => {
//       if (data?.length > 0) {
//         res.json({
//           success: false,
//           message: "User already exist! Please Login.",
//         });
//       } else {
//         db.query(q, [values], (err, data) => {
//           if (err) return res.json({ success: false, message: err });
//           return res.json({ success: true, data: data });
//         });
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   // return res.json({ data: [email, password] });

//   if (!(email && password) || !email || !password) {
//     return res.json({ success: false, message: "All input is required!" });
//   }

//   if (password.trim().length < 8) {
//     return res.json({ success: false, message: "Password is incorrect!" });
//   }

//   const q = " SELECT * FROM users WHERE email = ? ";
//   db.query(q, [email], (err, data) => {
//     if (data?.length < 1) {
//       res.json({ success: false, message: "Email or password is wrong!" });
//     } else {
//       const isCorrect = compareSync(password, data[0].password);

//       if (!isCorrect) {
//         res.json({ success: false, message: "Password is incorrect!" });
//       } else {
//         const token = Math.random(100000, 999999).toString(36).substring(2);
//         res.json({
//           success: true,
//           user: data[0],
//           token: token,
//           message: "Login successful!",
//         });
//       }
//     }
//   });
// });

// app.post("/remove/:id", (req, res) => {
//   const { id } = req.params;
//   const { password } = req.body;

//   if (!password || password.trim().length < 8) {
//     return res.json({
//       success: false,
//       message: "Password must be at least 8.",
//     });
//   }
//   // Check for empty inputs and validate the length of password
//   const q = "SELECT * FROM users WHERE id = ?";
//   db.query(q, [id], (err, data) => {
//     if (err) {
//       throw new Error(err);
//     } else {
//       const isCorrect = compareSync(password, data[0].password);

//       if (!isCorrect) {
//         res.json({ success: false, message: "Password is incorrect!" });
//       } else {
//         const q = "DELETE FROM users WHERE id = ?";
//         db.query(q, [id], (err, data) => {
//           if (err) throw new Error(err);
//           return res.json({
//             success: true,
//             message: "Account Delete Successfully!",
//           });
//         });
//       }
//     }
//   });
// });

// password changing
// app.post("/change_password/:id", (req, res) => {
//   const { id } = req.params;
//   const { current_password, new_password } = req.body;
//   if (!current_password || !new_password) {
//     return res.json({ success: false, message: "All input is required!" });
//   }

//   if (current_password.trim().length < 8 || new_password.trim().length < 8) {
//     return res.json({
//       success: false,
//       message: "Password must be at least 8!",
//     });
//   }

//   const q = "SELECT * FROM users WHERE id = ?";
//   db.query(q, [id], (err, data) => {
//     if (err) {
//       return res.json({ success: false, data: err });
//     } else {
//       const isCorrect = compareSync(current_password, data[0].password);
//       if (isCorrect) {
//         const hashPassword = hashSync(new_password, 10);
//         const q = " UPDATE users SET password = ? WHERE id = ? ";
//         db.query(q, [hashPassword, id], (err, data) => {
//           if (err) throw new Error(err);
//           return res.json({
//             success: true,
//             message: "Password change successfully!",
//           });
//         });
//       } else {
//         return res.json({ success: false, message: "Password is incorrect!" });
//       }
//     }
//   });
// });

// app.post("/logout/:id", (req, res) => {
//   const { id } = req.params;
//   const q = " SELECT * FROM users WHERE id = ? ";
//   db.query(q, [id], (err, data) => {
//     if (err) return res.json(err);
//     return res.json({ success: true, message: "Logout successful!" });
//   });
// });

app.listen(port, () => {
  if (db) {
    console.log("Connected to database");
  } else {
    console.error("Error connecting to the database");
  }
});
