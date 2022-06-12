export const capitalizeFirstLetter = ([first, ...rest]) => {
	const lowercaseRest = rest.join('').toLowerCase().split('');
	return [first.toUpperCase(), ...lowercaseRest].join('');
}

export const discountedPrice = (price, discount) => {
	return (price - ((discount / 100) * price));
}

export const mutationFilter = (arr, cb) => {
  for (let l = arr.length - 1; l >= 0; l--) {
    if (!cb(arr[l])) arr.splice(l, 1);
  }
}

export const removeDuplicates = (array) => {
	return Array.from(new Set(array));
}

