import "./bookForm.scss"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { addBook } from "../../redux/books/actionCreators"
import { v4 as uuidv4 } from "uuid"

const BookForm = () => {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const dispatch = useDispatch()
	const handleSubmit = e => {
		e.preventDefault()

		if (title && author) {
			const book = {
				title,
				author,
				id: uuidv4()
			}
			console.log(addBook(book))
			dispatch(addBook(book))

			setTitle("")
			setAuthor("")
		}
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
				</div>
			</form>
		</div>
	)
}

export default BookForm
