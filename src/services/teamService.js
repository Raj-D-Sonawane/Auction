import { Databases, ID } from "appwrite";
import { client } from "./appwrite";
import { DATABASE_ID, TEAMS_COLLECTION_ID } from "../utils/constants";

const database = new Databases(client);



const teamService = {
    addTeam: async (data) => {
        return await database.createDocument(
            DATABASE_ID,
            TEAMS_COLLECTION_ID,
            ID.unique(),
            data
        );
    },

    getTeams: async () => {
        const res = await database.listDocuments(
            DATABASE_ID,
            TEAMS_COLLECTION_ID
        );
        return res.documents;
    },

    updateTeam: async (id, data) => {
        return await database.updateDocument(
            DATABASE_ID,
            TEAMS_COLLECTION_ID,
            id,
            data
        )
    },

    deleteTeam: async (id) => {
        return await database.deleteDocument(
            DATABASE_ID,
            TEAMS_COLLECTION_ID,
            id
        )
    }
};

export default teamService;
