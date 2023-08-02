import { db } from "../index.js";

export const getAllBlogs = async (req, res) => {
    try {
        const q = "SELECT * FROM blogs";
        db.query(q, (err, data) => {
            if (err) throw new Error(err);

            if (data?.length < 1)
                return res.json({ message: "No blogs for now!" });
            return res.json({ success: true, data: data });
        });
    } catch (error) {
        throw new Error(error);
    }
};

//create new Blog
export const createNewBlog = (req, res) => {
    try {
        const { title, description, userId } = req.body;

        if (!title || !description || !userId)
            return res.json({
                success: false,
                message: "All fields is required!",
            });

        const q =
            "INSERT INTO blogs (`title`, `description`, `userId`) VALUES (?) ";
        const values = [title, description, userId];

        db.query(q, [values], (err, data) => {
            if (err) return res.json({ success: false, data: err });
            return res.json({ success: true, data: data });
        });
    } catch (error) {
        throw new Error(error);
    }
};

//update blog
export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, description, userId } = req.body;

    if (!id)
        return res
            .status(401)
            .json({ message: "ID is required to update the blog!" });

    if (!title || !description || !userId)
        return res.json({
            success: false,
            message: "All fields is required!",
        });

    const findBlogQ = "SELECT * FROM blogs WHERE id = ?";

    db.query(findBlogQ, [id], (err, data) => {
        if (data.length < 0) {
            return res
                .status(404)
                .json({ message: `Blog with ID ${id} not found!` });
        } else {
            const q =
                "UPDATE blogs SET `title` = ?, `description` = ?, `userId` = ? WHERE id = ? ";

            db.query(q, [title, description, userId, id], (err, data) => {
                if (err) throw new Error(err);
                return res.json({ success: true, data: data });
            });
        }
    });
};

//delete blog
export const deleteBlog = async (req, res) => {
    const { id } = req.params;

    if (!id)
        return res.status(400).json({
            success: false,
            message: "ID is required to delete the post!",
        });

    const q = "DELETE FROM blogs WHERE id = ? ";
    db.query(q, [id], (err, data) => {
        if (err) throw new Error(err);

        return res.json({
            success: true,
            message: `Blog ID ${id} has been deleted!`,
        });
    });
};

//get single blog
export const getSingleBlogById = async (req, res) => {
    const { id } = req.params;
    if (!id)
        return res
            .status(400)
            .json({ success: false, message: "Blog ID is required!" });

    const q = "SELECT * FROM blogs WHERE id = ?";
    db.query(q, id, (err, data) => {
        if (err) return res.json({ success: false, data: err });
        return res.json({ success: true, data: data[0] });
    });
};
