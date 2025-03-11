const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');


const { createBlogPostValidators, updateBlogPostValidators, deleteBlogPostValidators } = require('../controllers/blogController');


router.get('/', blogController.getAllBlogPosts);


router.post('/', authMiddleware, createBlogPostValidators, blogController.createBlogPost);


router.put('/:id', authMiddleware, updateBlogPostValidators, blogController.updateBlogPost);


router.delete('/:id', authMiddleware, deleteBlogPostValidators, blogController.deleteBlogPost);


router.put('/toggle-visibility', authMiddleware, blogController.toggleBlogVisibility);

module.exports = router;
