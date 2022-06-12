const powers = [
	1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7,
	1e8, 1e9, 1e10, 1e11, 1e12, 1e13, 1e14, 1e15,
	1e16, 1e17, 1e18, 1e19, 1e20, 1e21, 1e22,
];

const DecimalPrecision = (function () {
	if (Number.EPSILON === undefined) {
		Number.EPSILON = Math.pow(2, -52);
	}
	if (Math.trunc === undefined) {
		Math.trunc = function (v) {
			return v < 0 ? Math.ceil(v) : Math.floor(v);
		};
	}
	const intpow10 = function (power) {
		if (power < 0 || power > 22) {
			return Math.pow(10, power);
		}
		return powers[power];
	};
	const isRound = function (num, decimalPlaces) {
		//return decimalPlaces >= 0 &&
		//    +num.toFixed(decimalPlaces) === num;
		const p = intpow10(decimalPlaces);
		return Math.round(num * p) / p === num;
	};
	const decimalAdjust = function (type, num, decimalPlaces) {
		if (type !== 'round' && isRound(num, decimalPlaces || 0))
			return num;
		const p = intpow10(decimalPlaces || 0);
		const n = (num * p) * (1 + Number.EPSILON);
		return Math[type](n) / p;
	};
	return {
		// Decimal round (half away from zero)
		round: function (num, decimalPlaces) {
			return decimalAdjust('round', num, decimalPlaces);
		},
		// Decimal ceil
		ceil: function (num, decimalPlaces) {
			return decimalAdjust('ceil', num, decimalPlaces);
		},
		// Decimal floor
		floor: function (num, decimalPlaces) {
			return decimalAdjust('floor', num, decimalPlaces);
		},
		// Decimal trunc
		trunc: function (num, decimalPlaces) {
			return decimalAdjust('trunc', num, decimalPlaces);
		},
		// Format using fixed-point notation
		toFixed: function (num, decimalPlaces) {
			return decimalAdjust('round', num, decimalPlaces).toFixed(decimalPlaces);
		},
	};
})();

export default DecimalPrecision;