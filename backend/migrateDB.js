const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const migrateDB = async () => {
  try {
    // Connect to old database (test)
    const oldDB = await mongoose
      .createConnection(process.env.OLD_MONGO_URI)
      .asPromise();

    // Connect to new database (mernapp)
    const newDB = await mongoose
      .createConnection(process.env.NEW_MONGO_URI)
      .asPromise();

    console.log("Connected to both databases");

    // Get all collections from test database
    const collections = await oldDB.db.listCollections().toArray();

    for (const collection of collections) {
      const collectionName = collection.name;

      console.log(`Migrating ${collectionName}...`);

      const data = await oldDB.db.collection(collectionName).find({}).toArray();

      if (data.length > 0) {
        await newDB.db.collection(collectionName).insertMany(data);

        console.log(`${collectionName}: ${data.length} documents migrated`);
      } else {
        console.log(`${collectionName}: No data found`);
      }
    }

    console.log("\nMigration completed successfully!");

    await oldDB.close();
    await newDB.close();

    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrateDB();
