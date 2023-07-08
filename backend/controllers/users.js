import { hashSync, compareSync } from "bcrypt";
import { db } from "../index.js";
import jwt from "jsonwebtoken";

export const getAllUser = async (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json({ success: true, data: data });
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!(name && email && password)) {
      return res.json({ success: false, message: "All input is required!" });
    }

    const hashPws = hashSync(password, 10);
    // return res.json({ data: hashPws });

    const findQ = "SELECT * FROM users WHERE email = ? ";
    const q =
      "INSERT INTO users (`name`, `email`, `password`, `role`) VALUES (?)";
    const values = [name, email, hashPws, role];
    db.query(findQ, [email], (err, data) => {
      if (data.length > 0) {
        res.status(209).json({
          success: false,
          message: "User already exist!.",
        });
      } else {
        db.query(q, [values], (err, data) => {
          if (err) return res.json({ success: false, message: err });
          return res.json({ success: true, data: data });
        });
      }
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password) || !email || !password) {
    return res.json({ success: false, message: "All input is required!" });
  }

  if (password.trim().length < 8) {
    return res.json({ success: false, message: "Password is incorrect!" });
  }

  const q = " SELECT * FROM users WHERE email = ? ";
  db.query(q, [email], (err, data) => {
    if (data?.length < 1) {
      res.json({ success: false, message: "Email or password is wrong!" });
    } else {
      const isCorrect = compareSync(password, data[0].password);

      if (!isCorrect) {
        res.json({ success: false, message: "Password is incorrect!" });
      } else {
        const token = jwt.sign(
          { email: email },
          process.env.ACCESS_SECRET_TOKEN,
          { expiresIn: 60 * 60 * 24 }
        );
        res.json({
          success: true,
          user: data[0],
          token: token,
          message: "Login successful!",
        });
      }
    }
  });
};

export const userLogout = async (req, res) => {
  const { id } = req.params;
  const q = " SELECT * FROM users WHERE id = ? ";
  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ success: true, message: "Logout successful!" });
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password || password.trim().length < 8) {
    return res.json({
      success: false,
      message: "Password must be at least 8.",
    });
  }
  // Check for empty inputs and validate the length of password
  const q = "SELECT * FROM users WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) {
      throw new Error(err);
    } else {
      const isCorrect = compareSync(password, data[0].password);

      if (!isCorrect) {
        res.json({ success: false, message: "Password is incorrect!" });
      } else {
        const q = "DELETE FROM users WHERE id = ?";
        db.query(q, [id], (err, data) => {
          if (err) throw new Error(err);
          return res.json({
            success: true,
            message: "Account Delete Successfully!",
          });
        });
      }
    }
  });
};

export const passwordChanging = async (req, res) => {
  const { id } = req.params;
  const { current_password, new_password } = req.body;
  if (!current_password || !new_password) {
    return res.json({ success: false, message: "All input is required!" });
  }

  if (current_password.trim().length < 8 || new_password.trim().length < 8) {
    return res.json({
      success: false,
      message: "Password must be at least 8!",
    });
  }

  const q = "SELECT * FROM users WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) {
      return res.json({ success: false, data: err });
    } else {
      const isCorrect = compareSync(current_password, data[0].password);
      if (isCorrect) {
        const hashPassword = hashSync(new_password, 10);
        const q = " UPDATE users SET password = ? WHERE id = ? ";
        db.query(q, [hashPassword, id], (err, data) => {
          if (err) throw new Error(err);
          return res.json({
            success: true,
            message: "Password change successfully!",
          });
        });
      } else {
        return res.json({ success: false, message: "Password is incorrect!" });
      }
    }
  });
};

export const changeUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, password } = req.body;

    const q = "SELECT * FROM users WHERE id = ?";
    db.query(q, [id], (err, data) => {
      if (err) {
        return res.json({ success: false, message: err });
      } else {
        const isCorrect = compareSync(password, data[0].password);
        if (isCorrect) {
          const q = "UPDATE users SET name = ? WHERE id = ?";
          db.query(q, [name, id], (err, data) => {
            if (err)
              return res.json({
                success: false,
                message: err,
              });

            return res.json({ success: true, data: data });
          });
        } else {
          return res.json({
            success: false,
            message: "Password is incorrect!",
          });
        }
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};
