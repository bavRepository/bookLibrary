import "./bookForm.scss"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { addBook } from "../../redux/books/actionCreators"
import { v4 as uuidv4 } from "uuid"
import useBookService from "../../data/BookService"

const BookForm = () => {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const dispatch = useDispatch()
	const { getRandomBook } = useBookService()

	const handleSubmit = e => {
		e.preventDefault()

		if (title && author) {
			const book = {
				title,
				author,
				isFavorite: false,
				id: uuidv4()
			}
			console.log(addBook(book))
			dispatch(addBook(book))

			setTitle("")
			setAuthor("")
		}
	}

	const handleAddRandomBook = async () => {
		const data = await getRandomBook().then(data => {
			const randomIndex = (Math.random() * data.length).toFixed()

			const book = {
				...data[randomIndex],
				isFavorite: false,
				id: uuidv4()
			}
			dispatch(addBook(book))
			return book
		})
		console.log(data)
	}

	return (
		<div className='app-block book-form'>
			<h2>Add new Book</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='title'>Title:</label>
					<input
						type='text'
						id='title'
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<label htmlFor='title'>Author:</label>
					<input
						type='text'
						id='author'
						value={author}
						onChange={e => setAuthor(e.target.value)}
					/>
					<button type='submit'>Add Book</button>
					<button onClick={handleAddRandomBook}>Add random Book</button>
				</div>
			</form>
		</div>
	)
}

export default BookForm
