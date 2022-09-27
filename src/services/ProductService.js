import uuid from 'react-native-uuid'

const ProductService = ({ doPost }) => {
   const doGetProductByAccount = async (user) => {
      try {
         return await doPost({
            url: '/product/get/by-account',
            data: user
         });
      } catch (err) {
         throw err;
      }
   }

   const doGetProductSearch = async (productData) => {
      try {
         return await doPost({
            url: '/product/search',
            data: productData
         });
      } catch (err) {
         throw err;
      }
   }

   const doPostProductData = async (user) => {
      try {
         return await doPost({
            url: '/product/add/product',
            data: user
         })
      } catch (err) {
         throw (err);
      }
   }

   const doUpdateProductData = async (user) => {
      try {
         return await doPost({
            url: '/product/update',
            data: user
         })
      } catch (err) {
         throw (err);
      }
   }

   const doDeleteProductData = async (user) => {
      try {
         return await doPost({
            url: '/product/delete/product',
            data: user
         })
      } catch (err) {
         throw (err);
      }
   }

   return { doGetProductByAccount, doGetProductSearch, doPostProductData, doUpdateProductData, doDeleteProductData };
}

export default ProductService;

export const ProductImageService = ({ doStoreMultipleFiles }) => {
   const doPostProductImage = async (image) => {
      try {
        let newDate = new Date()
        let date = newDate.toISOString().slice(0, 10)
        let time = newDate.toTimeString().slice(0, 8)
        let newUuid = uuid.v4().toString()
        let folderName = `${date} ${time} ${newUuid}`
        return await doStoreMultipleFiles({
            url: `/product/${folderName}`,
            data: image
         });
      } catch (err) {
         throw err;
      }
   }

   return { doPostProductImage };
}