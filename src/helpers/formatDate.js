const formatDate = (date) => {
  let year = date.slice(0,4),
    month  = date.slice(5,7),
    day = date.slice(8,10);
    
  return  new Date(year+'-'+month+'-'+day+'T23:59:59')
}

export default formatDate