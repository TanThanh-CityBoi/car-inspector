export const FormatNumberVND = (value: any) => {
   return value?.toLocaleString("vi", { style: "currency", currency: "VND" });
};
