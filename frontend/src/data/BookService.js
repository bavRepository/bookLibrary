import { useHttp } from "../components/hooks/http.hook"

const useBookService = () => {
	const { request } = useHttp()

	const getRandomBook = async () => {
		return await request(`./books.json`)
	}

	return {
		getRandomBook
	}
}

export default useBookService
