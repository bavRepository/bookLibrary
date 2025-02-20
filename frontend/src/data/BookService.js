import { useHttp } from "../components/hooks/http.hook"

const useBookService = () => {
	const { request } = useHttp()

	const getBooks = async () => {
		return await request(`./books.json`)
	}

	return {
		getBooks
	}
}

export default useBookService
