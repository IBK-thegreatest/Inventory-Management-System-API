import HttpException from "../exceptions/HttpException";
import bcrypt from "bcrypt"
import { db } from "../dbConfig/dbConfig";
import { User } from "../interfaces/user.interface";
import { emailValidator, schema } from "../middleware/validation.middleware";
import { State } from "../interfaces/state.interface";
import { statesWithLgas } from "../dbConfig/data";

export const registerService = async (userData: User): Promise<User> => {
    const ifAlreadyExists = await db.UserModel.findOne({ where: { email: userData.email }})
    if(ifAlreadyExists) throw new HttpException(409, "This User already Exists")

    const state: State = await db.StateModel.findOne({ where: { state: userData.state }}) as unknown as State
    switch (true) {
        case !emailValidator.validate(userData.email):
            throw new HttpException(403, "Invalid Email Address, Email Address has to be in the format foo@bar.com")
            break;
        case !state:
            throw new HttpException(404, `${userData.state} is not a State in Nigeria`)
            break;
        case state.isDisabled:
            throw new HttpException(401, "We are not currently taking applicants from this state")
            break;
        case !statesWithLgas[userData.state].includes(userData.localGovernmentArea):
            throw new HttpException(403, `${userData.localGovernmentArea} is not a local government in ${userData.state} state`)
            break;
        case !schema.validate(userData.password):
            throw new HttpException(403, "Invalid Password, Password mus contain an uppercase letter, lowercase letter, no whitespaces and at least 2 digits")
            break;
        default:
            const [localGovernmentArea, createdLocalGovernmentArea] = await db.LocalGovernmentModel.findOrCreate({
                where: { localGovernmentArea: userData.localGovernmentArea },
                defaults: { state: userData.state }
            })
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(userData.password, salt)
            const maxUser: string = await db.UserModel.max('userId');
            let newId = (maxUser ? parseInt(maxUser.split('-')[1], 10) + 1 : 1);
            let userId = `IMS-${newId.toString().padStart(3, '0')}`;
            while (await db.UserModel.findOne({ where: { userId } })) {
                newId++;
                userId = `IMS-${newId.toString().padStart(3, '0')}`;
            }
            const data = {
                userId: userId,
                email: userData.email,
                state: userData.state,
                localGovernmentArea: userData.localGovernmentArea,
                password: hashedPassword,
                role: userData.role
            }
            const newUser = await db.UserModel.create(data) as unknown as User
            return newUser
    }
}