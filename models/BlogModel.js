import db from "../database/db.js";
import { DataTypes } from "sequelize";

const BlogModel = db.define('blogs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
});

export default BlogModel;
