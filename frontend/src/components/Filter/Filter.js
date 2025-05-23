import "./filter.scss"
import {
	setTitleFilter,
	setAuthorFilter,
	setFavoriteFilter,
	resetFilters,
	selectTitleFilter,
	selectAuthorFilter,
	selectFavoriteFilter
} from "../../redux/slices/filterSlice"
import { useDispatch, useSelector } from "react-redux"

const Filter = () => {
	const dispatch = useDispatch()
	const titleFilter = useSelector(selectTitleFilter)
	const authorFilter = useSelector(selectAuthorFilter)
	const favoriteFilter = useSelector(selectFavoriteFilter)
	const handleTitleFilterChange = e => {
		dispatch(setTitleFilter(e.target.value))
	}
	const handleAuthorFilterChange = e => {
		dispatch(setAuthorFilter(e.target.value))
	}
	const handleResetFilterChange = () => {
		dispatch(resetFilters())
	}

	const handleFavoriteChange = () => {
		dispatch(setFavoriteFilter())
	}

	return (
		<div className='app-block filter'>
			<div className='filter-row'>
				<div className='filter-group'>
					<input
						value={titleFilter}
						onChange={handleTitleFilterChange}
						type='text'
						placeholder='Filter by title...'
					/>
				</div>
				<div className='filter-group'>
					<input
						value={authorFilter}
						onChange={handleAuthorFilterChange}
						type='text'
						placeholder='Filter by author...'
					/>
				</div>

				<div className='filter-group'>
					<label>
						<input
							onChange={handleFavoriteChange}
							type='checkbox'
							checked={favoriteFilter}
						/>
						Only Favorite
					</label>
				</div>

				<button type='button' onClick={handleResetFilterChange}>
					Reset Filters
				</button>
			</div>
		</div>
	)
}

export default Filter
