import "./bookForm.scss"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { addBook, fetchBook } from "../../redux/slices/booksSlice"
import { setError } from "../../redux/slices/errorSlice"
import createBookWithId from "../../utils/createBookWithId"
import useBookService from "../../services/BookService"

const BookForm = () => {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const dispatch = useDispatch()
	const { getBooks } = useBookService()

	const handleSubmit = e => {
		e.preventDefault()

		if (title && author) {
			const book = createBookWithId({ title, author }, "manual")
			dispatch(addBook(book))

			setTitle("")
			setAuthor("")
		} else {
			dispatch(setError("You must fill title and author"))
		}
	}

	const handleAddRandomBookViaAPI = () => {
		dispatch(fetchBook(`http://localhost:4000/random-book`))
	}

	const handleAddRandomBook = async () => {
		const data = await getBooks()
		const randomIndex = (Math.random() * data.length).toFixed()

		const book = createBookWithId({ ...data[randomIndex] }, "random")
		dispatch(addBook(book))
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
					<button type='button' onClick={handleAddRandomBook}>
						Add random Book
					</button>
					<button onClick={handleAddRandomBookViaAPI} type='button'>
						Add random Book via Api
					</button>
				</div>
			</form>
		</div>
	)
}

export default BookForm
