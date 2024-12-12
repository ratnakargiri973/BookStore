import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog } from '../Controller/blogsController.js';
import upload from '../Middleware/Multer.js';

const blogRouter = express.Router();

blogRouter.post("/post/blog", upload.single("image"),createBlog);
blogRouter.get('/get/allBlogs', getAllBlogs);
blogRouter.get('/get/blog/:id', getSingleBlog);
blogRouter.put('/update/blog/:id', updateBlog);
blogRouter.delete('/delete/blog/:id', deleteBlog);

export default blogRouter;