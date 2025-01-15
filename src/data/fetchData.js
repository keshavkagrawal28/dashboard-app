import {
  dataAffiliateStat,
  dataOverallStat,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataUser,
} from './data';

export const getUserById = (id) => dataUser.find((user) => user._id === id);

export const getProducts = () => {
  return dataProduct.map((i) => ({
    ...i,
    stat: dataProductStat.find((stat) => stat.productId === i._id),
  }));
};

export const getCustomers = () =>
  dataUser.filter((user) => user.role === 'user');

export const getTransactions = (
  page = 0,
  pagesize = 20,
  sort = null,
  search = ''
) => {
  let transactionData = JSON.parse(JSON.stringify(dataTransaction));
  const searchlower = search.toLowerCase();
  const searchResults = searchlower
    ? transactionData.filter((transaction) => {
        return Object.values(transaction).some((value) =>
          value.toString().toLowerCase().includes(searchlower)
        );
      })
    : transactionData;

  let sortResults = searchResults;
  if (sort && sort.field && sort.sort) {
    sortResults = searchResults.sort((a, b) => {
      const field = sort.field;
      const order = sort.sort === 'asc' ? 1 : -1;

      const valueA = a[field];
      const valueB = b[field];

      if (Array.isArray(valueA) && Array.isArray(valueB)) {
        return (valueA.length - valueB.length) * order;
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return (valueA - valueB) * order;
      } else if (typeof valueA === 'string' && typeof valueB === 'string') {
        if (valueA < valueB) return -1 * order;
        else if (valueA > valueB) return 1 * order;
        else return 0;
      } else {
        return 0;
      }
    });
  }

  const count = searchResults.length;

  const start = page * pagesize;
  const end = start + pagesize;
  const pageResults = sortResults.slice(start, end);

  return { transactions: pageResults, total: count };
};

export const getSales = () => dataOverallStat[0];

export const getAdmins = () =>
  dataUser
    .filter((user) => user.role === 'admin')
    .map(({ password, ...rest }) => rest);

export const getUserPerformance = (id) => {
  const user = getUserById(id);
  const affiliateStat = dataAffiliateStat.find((stat) => stat.userId === id);

  const affilicateTransactions = affiliateStat.affiliateSales;
  const sales = affilicateTransactions
    .map((tId) =>
      dataTransaction.find((transaction) => transaction._id === tId)
    )
    .filter((t) => t);

  return { user: { ...user, affiliateStat }, sales };
};
