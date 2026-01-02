import { Databases, ID } from "appwrite";
import { client } from "./appwrite";
import { DATABASE_ID, PLAYERS_COLLECTION_ID } from "../utils/constants";

const database = new Databases(client);



const playerService = {
    addPlayer: async (data) => {

        return await database.createDocument(
            DATABASE_ID,
            PLAYERS_COLLECTION_ID,
            ID.unique(),
            data
        );
    },

    getPlayers: async () => {
        const res = await database.listDocuments(
            DATABASE_ID,
            PLAYERS_COLLECTION_ID
        );
        return res.documents;
    },

    deletePlayer: async (id) => {
        await database.deleteDocument(
            DATABASE_ID,
            PLAYERS_COLLECTION_ID,
            id
        );
        return id;
    },

    updatePlayer: async ({ id, data }) => {
        return await database.updateDocument(
            DATABASE_ID,
            PLAYERS_COLLECTION_ID,
            id,
            data
        )
    }

};

export default playerService;