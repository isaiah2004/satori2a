const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://isaiah1994:TVUL2SJDZZ5mU7Fn@cluster0.yds1vgj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri);
  try {
    console.log("Connecting to the database...");
    await client.connect();
    console.log("Connected to the database!");
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};