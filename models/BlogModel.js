import pool from '../database/db.js';

// Obtener todos los blogs
export const getBlogsEntry = async () => {
    const query = 'SELECT * FROM blogs ORDER BY id;';
    const { rows } = await pool.query(query);
    return rows;
};

// Obtener un blog por ID
export const getBlogByIdEntry = async (id) => {
    const query = 'SELECT * FROM blogs WHERE id = $1;';
    const { rows } = await pool.query(query, [id]);
    return rows[0]; // Devuelve el primer resultado
};

export const createBlogEntry = async (title, content) => {
    const query = `
        INSERT INTO blogs (title, content, created_at, updated_at)
        VALUES ($1, $2, NOW(), NOW())
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [title, content]);
    return rows[0];
};

// Actualizar un blog por ID
export const updateBlogEntry = async (id, title, content) => {
    const query = `
        UPDATE blogs
        SET title = $1, content = $2, updated_at = NOW()
        WHERE id = $3
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [title, content, id]);
    return rows[0];
};

// Eliminar un blog por ID
export const deleteBlogEntry = async (id) => {
    const query = 'DELETE FROM blogs WHERE id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};
