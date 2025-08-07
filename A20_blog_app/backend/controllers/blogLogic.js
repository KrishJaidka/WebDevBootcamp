const Blog = require('../models/BlogModel')
const path = require('path')
const cloudinary = require('cloudinary').v2


const postLogic = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({
                success: false,
                message: "Data is missing"
            })
        }

        let blog;

        if (req?.files?.coverImg) {
            const { coverImg } = req.files;
            const supportedTypes = ['.jpg', '.jpeg', '.png']
            const FileExt = path.extname(coverImg.name).toLowerCase()

            if (supportedTypes.includes(FileExt)) {
                const uploadResult = await cloudinary.uploader.upload(coverImg.tempFilePath, {
                    folder: 'BlogApp',
                    resource_type: 'auto'
                });

                blog = await Blog.create({
                    title: title,
                    author: author,
                    content: content,
                    coverImg: uploadResult.secure_url
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: "this file extension is not supported"
                })
            }
        } else {
            blog = await Blog.create({
                title: title,
                author: author,
                content: content
            })
        }

        return res.status(200).json({
            success: true,
            message: "Blog created successfully",
            blog
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

const getLogic = async (req, res) => {
    try {
        const blogs = await Blog.find()
        
        if (!blogs || blogs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No blogs found"
            })
        }
        
        return res.status(200).json({
            success: true,
            message: "Blogs retrieved successfully",
            blogs
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const getOneLogic = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "missing ID parameters"
            })
        }
        const blog = await Blog.findById(id)

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "blog not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "blog fetched successfully",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const deleteLogic = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "missing ID parameter"
            })
        }

        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "blog not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "blog deleted successfully",
            deletedBlog: blog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

module.exports = { getLogic, postLogic, getOneLogic, deleteLogic }