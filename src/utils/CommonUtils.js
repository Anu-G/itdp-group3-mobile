export const checkErr = (e) => {
   if (e?.response?.data?.responseMessage !== undefined) {
      return (e.response.data.responseMessage);
   } else {
      return (e?.message);
   }
}