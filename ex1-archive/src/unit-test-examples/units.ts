// Super Simple Unit Functions

export const add = (a: number, b: number) => {
	return a + b
}

export const divide = (a: number, b: number) => {
	if (b === 0) {
		throw new Error('div by 0')
	}
	return a / b
}

export const concat = (str1: string, str2: string) => {
	if (!str1 || !str2) {
		throw new Error('one or both strings empty')
	}
	return str1 + str2
}
