export const checkErr = (e) => {
   if (e?.response?.data?.responseMessage !== undefined) {
      return (e.response.data.responseMessage);
   } else {
      return (e?.message);
   }
}

export const toPrice = (value) => {
   let j = 0
   let handle = ''
   for (let i = value.length-1; i > -1; i--) {
      handle = value[i] + handle
      j = j + 1
      if (j%3==0) {
         handle = '.' + handle
      }
   }
   const res = 'Rp. ' + `${value}` + ',00'
   return res
}