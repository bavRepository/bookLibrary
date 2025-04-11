import "./bookList.scss"
import { useSelector, useDispatch } from "react-redux"
import { deleteBook } from "../../redux/books/actionCreators"
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs"
import { toggleFavorite } from "../../redux/books/actionCreators"
import {
	selectTitleFilter,
	selectAuthorFilter,
	selectFavoriteFilter
} from "../../redux/slices/filterSlice"

const highlightMatch = (text, filter) => {
	if (!filter) return text
	const regex = new RegExp(`(${filter})`, "gi")
	return text.split(regex).map((subString, i) => {
		if (subString.toLowerCase() === filter.toLowerCase()) {
			return (
				<span key={i} className='highlight'>
					{subString}
				</span>
			)
		}
		return subString
	})
}

const BookList = () => {
	const books = useSelector(state => state.books)
	const titleFilter = useSelector(selectTitleFilter)
	const authorFilter = useSelector(selectAuthorFilter)
	const favoriteFilter = useSelector(selectFavoriteFilter)
	const dispatch = useDispatch()
	const filterBooks = books.filter(book => {
		const matchesTitle = book.title
			.toLowerCase()
			.includes(titleFilter.toLowerCase())
		const matchesAuthor = book.author
			.toLowerCase()
			.includes(authorFilter.toLowerCase())
		const matchesFavorite = favoriteFilter ? book.isFavorite : true

		return matchesTitle && matchesAuthor && matchesFavorite
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
									{++i}. {highlightMatch(book.title, titleFilter)} by{" "}
									<strong>{highlightMatch(book.author, authorFilter)}</strong>
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
