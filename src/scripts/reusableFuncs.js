export const discountedPrice = (price, discount) => {
	return (price - ((discount / 100) * price));
}
export const removeDuplicates = (array) => {
	return Array.from(new Set(array));
}