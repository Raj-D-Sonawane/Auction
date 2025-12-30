import { Databases, ID } from "appwrite";
import { client } from "./appwrite";

const database = new Databases(client);

const DATABASE_ID = "695366140002488ba2b5";
const COLLECTION_ID = "players"

const playerService = {
    addPlayer: async (data) => {
        return await database.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            data
        );
    },

    getPlayers: async () => {
        const res = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID
        );
        return res.document;
    },
};

export default playerService;