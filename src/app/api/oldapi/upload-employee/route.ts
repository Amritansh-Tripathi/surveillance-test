import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import csvParser from "csv-parser";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parser
  },
};

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = "ARIS";

export async function POST(req: NextRequest) {
  try {
    const form = formidable({
      uploadDir: path.join(process.cwd(), "/uploads"),
      keepExtensions: true,
      multiples: true,
    });

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const csvFile = files.csvFile as formidable.File;
    const imageFiles = files.images as formidable.File[];

    if (!csvFile || !imageFiles) {
      return NextResponse.json({ message: "CSV file or images missing." }, { status: 400 });
    }

    const employees: any[] = [];
    const imageMap: { [key: string]: string } = {};

    // Convert images to Base64
    for (const file of imageFiles) {
      const fileBuffer = fs.readFileSync(file.filepath);
      const base64Image = `data:${file.mimetype};base64,${fileBuffer.toString("base64")}`;
      const fileName = path.basename(file.originalFilename || "");
      imageMap[fileName] = base64Image;
      fs.unlinkSync(file.filepath); // Clean up uploaded image
    }

    // Parse CSV
    const csvFilePath = csvFile.filepath;
    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on("data", (row) => {
          const profilePicture = imageMap[row.profilePicture]; // Match image with the profilePicture field in CSV
          employees.push({ ...row, profilePicture });
        })
        .on("end", resolve)
        .on("error", reject);
    });

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("employees");

    await collection.insertMany(employees);

    client.close();
    fs.unlinkSync(csvFilePath); // Clean up uploaded CSV file

    return NextResponse.json({ message: "File uploaded and data inserted." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to process the file." }, { status: 500 });
  }
}
