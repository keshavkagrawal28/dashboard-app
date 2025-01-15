import { Box, useMediaQuery } from '@mui/material';
import Header from 'components/Header';
import ProductCard from 'components/ProductCard';
import { getProducts } from 'data/fetchData';

const Products = () => {
  const data = getProducts();
  const isNonMobile = useMediaQuery('(min-width: 1000px)');

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='PRODUCTS' subtitle='See your list of products' />
      {data ? (
        <Box
          mt='20px'
          display='grid'
          gridTemplateColumns='repeat(4, minmax(0, 1fr))'
          justifyContent='space-between'
          rowGap='20px'
          columnGap='1.33%'
          sx={{
            '& > div': {
              gridColumn: isNonMobile ? undefined : 'span 4',
            },
          }}
        >
          {data.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Products;
