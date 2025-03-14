import "./bookList.scss"
import { useSelector, useDispatch } from "react-redux"
import { deleteBook } from "../../redux/books/actionCreators"
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs"
import { toggleFavorite } from "../../redux/books/actionCreators"
import { selectTitleFilter } from "../../redux/slices/filterSlice"

const BookList = () => {
	const books = useSelector(state => state.books)
	const titleFilter = useSelector(selectTitleFilter)
	const dispatch = useDispatch()
	console.log(books)
	const filterBooks = books.filter(book => {
		const matchesTitle = book.title
			.toLowerCase()
			.includes(titleFilter.toLowerCase())
		return matchesTitle
	})
	const handleDeleteBook = id => {
		dispatch(deleteBook(id))
	}
	const handleToggleBook = id => {
		dispatch(toggleFavorite(id))
	}

	return (
		<div className='app-block book-list'>
			<h2>Book list</h2>

			{books.length === 0 ? (
				<p>No books available</p>
			) : (
				<ul>
					{filterBooks.map((book, i) => {
						return (
							<li key={book.id}>
								<div className='book-info'>
									{++i}. {book.title} by <strong>{book.author}</strong>
								</div>
								<div className='book-actions'>
									<span onClick={() => handleToggleBook(book.id)}>
										{book.isFavorite ? (
											<BsBookmarkStarFill className='star-icon' />
										) : (
											<BsBookmarkStar className='star-icon' />
										)}
									</span>
									<button onClick={() => handleDeleteBook(book.id)}>
										Clear
									</button>
								</div>
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}

export default BookList
