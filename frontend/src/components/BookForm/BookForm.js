import "./bookForm.scss"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { setError } from "../../redux/slices/errorSlice"
import { getRandomBook } from "../../utils/mathFunctions"
import { FaSpinner } from "react-icons/fa"
import createBookWithId from "../../utils/createBookWithId"
import useBookService from "../../services/BookService"
import {
	addBook,
	fetchBook,
	selectIsLoadingViaAPI
} from "../../redux/slices/booksSlice"
const BookForm = () => {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const dispatch = useDispatch()
	const { getBooks } = useBookService()
	const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI)
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
		dispatch(fetchBook(`http://localhost:4000/random-book-delayed`))
	}

	const handleAddRandomBook = async () => {
		const data = await getBooks()
		const book = getRandomBook(data)

		dispatch(addBook(createBookWithId(book, "random")))
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

					<button
						disabled={isLoadingViaAPI}
						onClick={handleAddRandomBookViaAPI}
						type='button'>
						{isLoadingViaAPI ? (
							<>
								<span>Loading book...</span>
								<FaSpinner className='spinner' />
							</>
						) : (
							"Add random Book via Api"
						)}
					</button>
				</div>
			</form>
		</div>
	)
}

export default BookForm
