import { Product } from './product'
import { Sale } from './sale'
import { ProductBySales } from './productBySales'
import { SalesByCategory } from './salesByCategory'
import { SalesByProduct } from './salesByProduct'
import { Pagination } from './pagination'
import { Dataset } from './dataset'

declare global {
  type ProductType = Product
  type SaleType = Sale
  type ProductBySalesType = ProductBySales
  type SalesByCategoryType = SalesByCategory
  type SalesByProductType = SalesByProduct
  type PaginationType = Pagination
  type DatasetType = Dataset
}
