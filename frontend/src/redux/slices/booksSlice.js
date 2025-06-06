import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import createBookWithId from "../../utils/createBookWithId"
import { setError } from "./errorSlice"

const initialState = {
	booksList: [],
	isLoadingViaAPI: false
}

export const fetchBook = createAsyncThunk(
	"books/fetchBook",
	async (url, thunkAPI) => {
		try {
			const res = await axios.get(url)
			return res.data
		} catch (error) {
			thunkAPI.dispatch(setError(error.message))
			// Option 1
			return thunkAPI.rejectWithValue(error)
			// Option 2
			//throw error
		}
	}
)

const booksSlice = createSlice({
	name: "books",
	initialState,
	reducers: {
		addBook: (state, action) => {
			state.booksList.push(action.payload)
		},
		deleteBook: (state, action) => {
			return {
				...state,
				booksList: state.booksList.filter(book => book.id !== action.payload)
			}
		},
		setLoading: (state, action) => {
			state.isLoadingViaAPI = action.payload
		}
	},
	// Option 1
	extraReducers: builder => {
		builder.addCase(fetchBook.pending, state => {
			state.isLoadingViaAPI = true
		})
		builder.addCase(fetchBook.fulfilled, (state, action) => {
			state.isLoadingViaAPI = false
			if (action?.payload?.title && action?.payload?.author) {
				state.booksList.push(createBookWithId(action.payload, "API"))
			}
		})
		builder.addCase(fetchBook.rejected, state => {
			state.isLoadingViaAPI = false
		})
	}
	// Option 2
	// extraReducers: {
	// 	[fetchBook.pending]: state => {
	// 		state.isLoadingViaAPI = true
	// 	},
	// 	[fetchBook.fulfilled]: (state, action) => {
	// 		state.isLoadingViaAPI = false
	// 		if (action.payload.title && action.payload.author) {
	// 			state.booksList.push(createBookWithId(action.payload, "API"))
	// 		}
	// 	},
	// 	[fetchBook.rejected]: state => {
	// 		state.isLoadingViaAPI = false
	// 	}
	// }
})

export const { addBook, deleteBook, toggleFavorite, setLoading } =
	booksSlice.actions

export const selectBooks = state => state.books.booksList
export const selectIsLoadingViaAPI = state => state.books.isLoadingViaAPI

export default booksSlice.reducer
