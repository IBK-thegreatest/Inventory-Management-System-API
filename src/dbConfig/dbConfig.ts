import { Sequelize } from "sequelize";
import dotenv from "dotenv"
import { dbConfig } from "../interfaces/dbConfig.interface";
dotenv.config();

const configDetails: dbConfig = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
    DIALECT: 'mysql',
    POOL: {
        MAX: 5,
        MIN: 0,
        ACQUIRE: 30000,
        IDLE: 10000
    }
}

export const sequelize = new Sequelize(
    configDetails.DATABASE,
    configDetails.USER,
    configDetails.PASSWORD, {
        host: configDetails.HOST,
        dialect: configDetails.DIALECT,
        pool: {
            max: configDetails.POOL.MAX,
            min: configDetails.POOL.MIN,
            acquire: configDetails.POOL.ACQUIRE,
            idle: configDetails.POOL.IDLE
        }
    }
)

import StateModel from "../models/State";
import LocalGovernmentModel from "../models/LocalGovernment";
import UserModel from "../models/User"

StateModel.hasMany(LocalGovernmentModel, { foreignKey: "state", onDelete: "cascade" })
StateModel.hasMany(UserModel, { foreignKey: "state", onDelete: "cascade" })
LocalGovernmentModel.hasMany(UserModel, { foreignKey: "localGovernmentArea", onDelete: "cascade" })
LocalGovernmentModel.belongsTo(StateModel, { foreignKey: "state", onDelete: "cascade" })
UserModel.belongsTo(StateModel, { foreignKey: "state", onDelete: "cascade" })
UserModel.belongsTo(LocalGovernmentModel, { foreignKey: "localGovernmentArea", onDelete: "cascade" })

export const db = {
    sequelize,
    Sequelize,
    StateModel,
    LocalGovernmentModel,
    UserModel
}