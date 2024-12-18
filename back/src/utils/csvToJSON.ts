import fs from 'fs';
import csvParser from 'csv-parser';

export const parseCSV = <T>(filePath: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data as T))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};
