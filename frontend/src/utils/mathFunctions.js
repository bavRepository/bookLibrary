export function getRandomBook(books) {
	const randomIndex = Math.floor(Math.random() * books.length)
	const randomBook = books[randomIndex]
	return randomBook
}
