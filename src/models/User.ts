import { sequelize } from "../dbConfig/dbConfig";
import Sequelize from "sequelize"

const UserModel = sequelize.define("User", {
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    localGovernmentArea: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "customer",
        validate: {
            isIn: [["admin", "manager", "supplier", "customer"]]
        }
    }
})


export default UserModel