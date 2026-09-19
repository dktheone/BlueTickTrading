import { MongoClient, Binary } from "mongodb";
import fs from "fs";
import path from "path";

const envLocalPath = path.resolve(".env.local");
let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB || "bluetick_trading";

if (fs.existsSync(envLocalPath)) {
  for (const line of fs.readFileSync(envLocalPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("MONGODB_URI=") && !uri) {
      uri = trimmed.replace("MONGODB_URI=", "").trim();
    }
  }
}

if (!uri) {
  console.error("MONGODB_URI missing.");
  process.exit(1);
}

async function syncMedia() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const mediaCollection = db.collection("uploaded_media");

  // 1. Sync ibloom banner if exists
  const ibloomPath = path.join(process.cwd(), "public", "uploads", "banners", "banner_1789246739015_ibloom_banner.png");
  if (fs.existsSync(ibloomPath)) {
    const buf = fs.readFileSync(ibloomPath);
    await mediaCollection.updateOne(
      { filename: "banner_1789246739015_ibloom_banner.png" },
      {
        $set: {
          filename: "banner_1789246739015_ibloom_banner.png",
          contentType: "image/png",
          data: new Binary(buf),
          size: buf.length,
          uploadedAt: new Date(),
        },
      },
      { upsert: true }
    );
    console.log("Synced ibloom banner to MongoDB.");
  }

  // 2. Also map the missing banner_1789453259015_chatgpt_image_sep_15__2026__09_49_45_am.png
  // so any cached or existing links get the high-res masterclass banner immediately!
  const masterclassPath = path.join(process.cwd(), "public", "images", "traderoom", "time-cycle-trading.jpg");
  if (fs.existsSync(masterclassPath)) {
    const buf = fs.readFileSync(masterclassPath);
    await mediaCollection.updateOne(
      { filename: "banner_1789453259015_chatgpt_image_sep_15__2026__09_49_45_am.png" },
      {
        $set: {
          filename: "banner_1789453259015_chatgpt_image_sep_15__2026__09_49_45_am.png",
          contentType: "image/jpeg",
          data: new Binary(buf),
          size: buf.length,
          uploadedAt: new Date(),
        },
      },
      { upsert: true }
    );
    console.log("Mapped missing chatgpt banner to masterclass banner in MongoDB.");
  }

  const count = await mediaCollection.countDocuments();
  console.log(`Total uploaded_media records: ${count}`);

  await client.close();
}

syncMedia().catch(console.error);
