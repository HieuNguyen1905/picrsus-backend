const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");
const bcrypt = require("bcrypt");

class Post extends Model {}

Post.init({
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    img:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    gallery:{
        type: DataTypes.STRING,
    },
    date:{
        type:DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        // allowNull:false
    }
},{
    sequelize
})

module.exports=Post