import mongoose from "mongoose";

/**
 * Connect to the MongoDB database using Mongoose.
 * @param {string} uri - The MongoDB connection URI.
 * @param {object} [options] - Optional Mongoose connection options. Defaults to an empty object.
 * @returns {Promise<void>} Resolves when the connection is successful.
 */

const connectToDatabase = async (
    uri: string,
    options: mongoose.ConnectOptions = {}
): Promise<void> => {
    try {
        await mongoose.connect(uri, options);
        console.log("Successfully connected to the database.");
    } catch (error) {
        console.log("Error connecting to the database: ", error);

        process.exitCode = 1;
    }
};

export default connectToDatabase;
