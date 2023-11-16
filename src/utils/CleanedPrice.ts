const cleanPrice = (num: any) => {
  const cleanValue =
    typeof num === "number" ? num.toString().replace(/\D/g, "") : num;
  const formattedValue = cleanValue?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  return formattedValue;
};

export default cleanPrice;
