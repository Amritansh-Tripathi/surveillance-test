import { NextResponse } from "next/server";
import { Workbook } from "exceljs";
import { promises as fs } from "fs";
import path from "path";

// Middleware configuration for file uploads
export const config = {
  api: {
    bodyParser: false, // Disable body parsing for file uploads
  },
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    // Save the file temporarily
    const tempFilePath = path.join(process.cwd(), "uploads", file.name);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(tempFilePath, fileBuffer);

    // Read the file using exceljs
    const workbook = new Workbook();
    await workbook.xlsx.readFile(tempFilePath);

    // Extract data from the first worksheet
    const worksheet = workbook.worksheets[0];
    const rows: Array<Record<string, string | number | boolean | null>> = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        const rowData: Record<string, string | number | boolean | null> = {};

        // Transform and validate data
        row.eachCell((cell, colNumber) => {
          const value = cell.value;

          switch (colNumber) {
            case 1:
              rowData["name"] = typeof value === "string" ? value : null;
              break;
            case 2:
              rowData["email"] = typeof value === "string" ? value : null;
              break;
            case 3:
              rowData["phone"] = typeof value === "string" || typeof value === "number" ? value : null;
              break;
            case 4:
              rowData["department"] = typeof value === "string" ? value : null;
              break;
            case 5:
              rowData["age"] = typeof value === "number" ? value : null;
              break;
            case 6:
              rowData["role"] = typeof value === "string" ? value : null;
              break;
            case 7:
              rowData["status"] = typeof value === "boolean" ? value : true; // Default to true if not a boolean
              break;
            default:
              rowData[`Column ${colNumber}`] = value !== undefined ? value : null;
          }
        });

        rows.push(rowData);
      }
    });

    // Extract images (if any)
    const images: Array<{ id: string; base64: string; location: string }> = [];
    let imageCounter = 0;

    workbook.eachSheet((sheet) => {
      const sheetImages = sheet.getImages();
      sheetImages.forEach((image) => {
        const media = workbook.media.find((m) => m.index === image.imageId);
        if (media && media.type === "image") {
          images.push({
            id: `image-${imageCounter++}`,
            base64: `data:image/${media.extension};base64,${media.buffer.toString("base64")}`,
            location: `Row: ${image.range.tl.row}, Column: ${image.range.tl.col}`,
          });
        }
      });
    });

    // Cleanup temporary file
    await fs.unlink(tempFilePath);

    // Return extracted data and images
    return NextResponse.json({ data: rows, images });
  } catch (error) {
    console.error("Error processing Excel file:", error);
    return NextResponse.json({ error: "Error processing Excel file" }, { status: 500 });
  }
}
