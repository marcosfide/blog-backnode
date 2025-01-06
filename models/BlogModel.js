import mongoose from 'mongoose';

// Definir el esquema del blog
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    isAdminPost: { type: String, default: 'n', enum: ['y', 'n'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Crear el modelo
const Blog = mongoose.model('Blog', blogSchema);

// Obtener todos los blogs
export const getBlogsEntry = async () => {
    return await Blog.find().sort({ _id: 1 }); // Devuelve todos los blogs ordenados por ID
};

// Obtener un blog por ID
export const getBlogByIdEntry = async (id) => {
    return await Blog.findById(id); // Encuentra un blog por su ID
};

// Crear un nuevo blog
export const createBlogEntry = async (title, content, isAdminPost) => {
    const newBlog = new Blog({ title, content, isAdminPost });
    return await newBlog.save(); // Guarda el nuevo blog en la base de datos
};

// Actualizar un blog por ID
export const updateBlogEntry = async (id, title, content) => {
    return await Blog.findByIdAndUpdate(
        id,
        { title, content, updatedAt: Date.now() },
        { new: true } // Devuelve el blog actualizado
    );
};

// Eliminar un blog por ID
export const deleteBlogEntry = async (id) => {
    return await Blog.findByIdAndDelete(id); // Elimina un blog por su ID
};
