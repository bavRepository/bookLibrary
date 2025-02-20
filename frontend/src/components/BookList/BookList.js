import "./bookList.scss"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { deleteBook } from "../../redux/books/actionCreators"
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs"
import { toggleFavorite } from "../../redux/books/actionCreators"

const BookList = () => {
	const books = useSelector(state => state.books)
	const dispatch = useDispatch()

	const onClickHandler = id => {
		dispatch(deleteBook(id))
	}

	return (
		<div className='app-block book-list'>
			<h2>Book list</h2>

			{books.length === 0 ? (
				<p>No books available</p>
			) : (
				<ul>
					{books.map((book, i) => {
						return (
							<li key={book.id}>
								<div className='book-info'>
									{++i}. {book.title} by <strong>{book.author}</strong>
								</div>
								<button onClick={() => onClickHandler(book.id)}>Clear</button>
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}

export default BookList
