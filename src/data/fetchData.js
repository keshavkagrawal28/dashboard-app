import { dataProduct, dataProductStat, dataUser } from './data';

export const getUserById = (id) => dataUser.find((user) => user._id === id);

export const getProducts = () => {
  return dataProduct.map((i) => ({
    ...i,
    stat: dataProductStat.find((stat) => stat.productId === i._id),
  }));
};

export const getCustomers = () =>
  dataUser.filter((user) => user.role === 'user');
