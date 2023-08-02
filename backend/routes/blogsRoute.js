import { Router } from "express";
import {
    createNewBlog,
    deleteBlog,
    getAllBlogs,
    getSingleBlogById,
    updateBlog,
} from "../controllers/blogs.js";

const router = Router();

router.route("/").get(getAllBlogs).post(createNewBlog);

router.route("/:id").get(getSingleBlogById).put(updateBlog).delete(deleteBlog);

export const BlogRouter = router;
