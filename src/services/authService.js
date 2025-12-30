import { account } from "./appwrite";
import { ID } from "appwrite"

const authService = {
    signup: async ({ email, password, name }) => {
        console.log("AuthService signup called");
        return await account.create(ID.unique(), email, password, name);
    },

    login: async ({ email, password }) => {
        return await account.createEmailPasswordSession(email, password);
    },

    logout: async () => {
        return await account.deleteSession("current");
    },

    getCurrentUser: async () => {
        try {
            return await account.get();
        } catch (err) {
            if (err.code === 401) {
                return null; // silent fail
            }
            throw err;
        }
    },
};


export default authService;