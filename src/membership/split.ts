import * as XLSX from "xlsx";
import * as fs from "fs";
import * as path from "path";

interface SplitOptions {
  recordsPerFile?: number;
  outputDir?: string;
  outputFormat?: "xlsx" | "csv";
  outputFilePrefix?: string;
}

async function splitAndSaveCSV(
  inputFilePath: string,
  options: SplitOptions = {}
): Promise<string[]> {
  const {
    recordsPerFile = 5000,
    outputDir = "./output",
    outputFormat = "csv",
    outputFilePrefix = "split",
  } = options;

  const outputFiles: string[] = [];

  try {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Read the CSV file
    const workbook = XLSX.readFile(inputFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const allRecords: any[] = XLSX.utils.sheet_to_json(worksheet);
    const totalRecords = allRecords.length;
    const numberOfFiles = Math.ceil(totalRecords / recordsPerFile);

    console.log(
      `Processing ${totalRecords} records into ${numberOfFiles} files...`
    );

    for (let i = 0; i < numberOfFiles; i++) {
      const startIndex = i * recordsPerFile;
      const endIndex = Math.min((i + 1) * recordsPerFile, totalRecords);
      const recordsChunk = allRecords.slice(startIndex, endIndex);

      const newWorkbook = XLSX.utils.book_new();
      const newWorksheet = XLSX.utils.json_to_sheet(recordsChunk);
      XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Sheet1");

      const outputFileName = path.join(
        outputDir,
        `${outputFilePrefix}_${i + 1}_${startIndex + 1}-${endIndex}.${outputFormat}`
      );

      if (outputFormat === "csv") {
        XLSX.writeFile(newWorkbook, outputFileName, { bookType: "csv" });
      } else {
        XLSX.writeFile(newWorkbook, outputFileName);
      }

      outputFiles.push(outputFileName);
      console.log(
        `Created file: ${outputFileName} with ${recordsChunk.length} records`
      );
    }

    console.log("File splitting completed successfully!");
    return outputFiles;
  } catch (error) {
    console.error("Error splitting file:", error);
    throw error;
  }
}

async function main() {
  try {
    const files = await splitAndSaveCSV("src/membership/ilms.csv", {
      recordsPerFile: 5000,
      outputDir: "./split_files_csv",
      outputFormat: "csv",
      outputFilePrefix: "chunk",
    });

    console.log("Created files:", files);
  } catch (error) {
    console.error("Failed to split CSV file:", error);
  }
}

main();
