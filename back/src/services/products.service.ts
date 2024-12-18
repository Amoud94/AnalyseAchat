import Product from "../models/product";

export const getProducts = async (page: string, limit: string) => {
  const _page = parseInt(page, 10) || 1;
  const _limit = parseInt(limit, 10) || 10;

  const totalProducts = await Product.countDocuments();
  const totalPages = Math.ceil(totalProducts / _limit);

  const skip = (_page - 1) * _limit;

  const products = await Product.find().skip(skip).limit(_limit);

  return {
    products,
    pagination: {
      currentPage: _page,
      totalPages,
      pageSize: _limit,
      totalCount: totalProducts,
      hasNextPage: _page < totalPages,
      hasPreviousPage: _page > 1,
    },
  };
};
