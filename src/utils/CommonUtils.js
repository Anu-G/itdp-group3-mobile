export const checkErr = (e) => {
   if (e?.response?.data?.responseMessage !== undefined) {
      return (e.response.data.responseMessage);
   } else {
      return (e?.message);
   }
}

export const price = new Intl.NumberFormat('id-ID', {
   style: 'currency',
   currency: 'IDR'
})