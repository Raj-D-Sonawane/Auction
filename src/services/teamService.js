import { Databases, ID } from "appwrite";
import { client } from "./appwrite";

const database = new Databases(client);

const DATABASE_ID = "auction-db";
const COLLECTION_ID = "teams";

const teamService = {
    addTeam: async (data) => {
        return await database.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            data
        );
    },

    getTeams: async () => {
        const res = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID
        );
        return res.documents;
    },
};

export default teamService;
