import {
    getBlogsEntry,
    getBlogByIdEntry,
    createBlogEntry,
    updateBlogEntry,
    deleteBlogEntry,
} from '../models/BlogModel.js';

// Obtener todos los blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await getBlogsEntry();
        res.json(blogs.map(blog => ({ ...blog.toObject(), id: blog._id })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un blog por ID
export const getBlog = async (req, res) => {
    try {
        const blog = await getBlogByIdEntry(req.params.id); // Llama a la función del modelo
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Blog no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo blog
export const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: 'El título y el contenido son requeridos' });
        }
        const newBlog = await createBlogEntry(title, content, 'n');
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un blog existente
export const updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'El título y el contenido son requeridos' });
        }

        const blog = await getBlogByIdEntry(req.params.id);

        if(!blog){
            return res.status(404).json({message: 'Blog no encontrado'})
        }

        if(blog.isAdminPost === 'y'){
            return res.status(403).json({ 
                message: 'No se pueden editar las publicaciones realizadas por el admin' 
            });
        }

        const updatedBlog = await updateBlogEntry(req.params.id, title, content);
        if (updatedBlog) {
            res.json(updatedBlog);
        } else {
            res.status(404).json({ message: 'Blog no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un blog por ID
export const deleteBlog = async (req, res) => {
    try {

        const blog = await getBlogByIdEntry(req.params.id);

        if(!blog){
            return res.status(404).json({message: 'Blog no encontrado'})
        }

        if(blog.isAdminPost === 'y'){
            return res.status(403).json({ 
                message: 'No se pueden editar las publicaciones realizadas por el admin' 
            });
        }

        const deletedBlog = await deleteBlogEntry(req.params.id);
        if (deletedBlog) {
            res.json({ message: 'Registro eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Blog no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
