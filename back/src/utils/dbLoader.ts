import Product from '../models/product';
import Sale from '../models/sale';
import { parseCSV } from './csvToJSON';
import { Product as ProductType, Sale as SaleType } from '../types';
import connectDB from '../db/connection';

const seedDatabase = async () => {
  // Parse CSV files with defined types
  try{
    await connectDB()

    const products = await parseCSV<ProductType>('data/products.csv');
    const sales = await parseCSV<SaleType>('data/sales.csv');
  
    // Clear existing data
    await Product.deleteMany({});
    await Sale.deleteMany({});
  
    // Insert new data
    await Product.insertMany(products);
    
    await Sale.insertMany(sales);
  
    console.log('Database seeded successfully!');
    process.exit(0);
  }catch(error){
    console.log('seedDatabase error', error)
    process.exit(1);
  }

};

seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
