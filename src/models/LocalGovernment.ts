import { sequelize } from "../dbConfig/dbConfig";
import Sequelize from "sequelize"

const LocalGovernmentModel = sequelize.define("local_government", {
    localGovernmentArea: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


export default LocalGovernmentModel