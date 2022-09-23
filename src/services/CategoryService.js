export const CategoryService = ({ doPost, doGet }) => {
    const doGetCategories = async () => {
       try {
          return await doGet({
             url: '/category/'
          });
       } catch (err) {
          throw err;
       }
    }
 
    return { doGetCategories };
 }