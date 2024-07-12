import { statesInNigeria } from "../dbConfig/data";
import { sequelize } from "../dbConfig/dbConfig";
import Sequelize from "sequelize"

const StateModel = sequelize.define("State", {
    state: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    isDisabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})
StateModel.afterSync(async () => {
    const validStates = statesInNigeria;
    const existingStates = await StateModel.findAll({ attributes: ['state'] }) as unknown as any;
    const existingStateNames = existingStates.map(s => s.state);

    const newStates = validStates.filter(s => !existingStateNames.includes(s));
    const stateRecords = newStates.map(s => ({ state: s }));

    if (stateRecords.length) {
      await StateModel.bulkCreate(stateRecords);
    }
});


export default StateModel