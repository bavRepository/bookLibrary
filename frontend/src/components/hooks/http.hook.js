import { useCallback } from "react"

export const useHttp = () => {
	const request = useCallback(
		async (
			url,
			method = "GET",
			body = null,
			headers = { "Content-Type": "application/json" }
		) => {
			let pr
			try {
				const response = await fetch(url, { method, body, headers }).catch(e =>
					//never work with local file request
					console.log("Error1")
				)

				if (!response.ok) {
					//never work with local file request
					throw new Error(`Could not fetch ${url}, status: ${response.status}`)
				}
				const data = await response.json()
				pr = new Promise(resolved => {
					setTimeout(() => {
						resolved(data)
					}, 500)
				})
			} catch (e) {
				//only point on the Error in our promise
				console.log("Error2")
			}
			return pr
		},
		[]
	)

	return { request }
}
