import "./bookForm.scss"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { addBook } from "../../redux/books/actionCreators"
import useBookService from "../../data/BookService"
import createBookWithId from "../../utils/createBookWithId"

const BookForm = () => {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const dispatch = useDispatch()
	const { getBooks } = useBookService()
	const handleSubmit = e => {
		e.preventDefault()

		if (title && author) {
			const book = createBookWithId({ title, author })
			dispatch(addBook(book))

			setTitle("")
			setAuthor("")
		}
	}

	const handleAddRandomBook = async () => {
		const data = await getBooks().then(data => {
			const randomIndex = (Math.random() * data.length).toFixed()

			const book = createBookWithId({ ...data[randomIndex] })
			dispatch(addBook(book))
		})
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
