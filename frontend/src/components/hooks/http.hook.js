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
				//it is a simple emulation of the server's request operation
				// we get book data from our local file in 500 ms
				pr = new Promise(resolve => {
					setTimeout(async () => {
						const response = await fetch(url, { method, body, headers }).catch(
							error =>
								//if we have some troubles with access to local file in our case
								console.error(error)
						)

						if (!response.ok) {
							//will never work with local file request if file ok
							throw new Error(
								`Could not fetch ${url}, status: ${response.status}`
							)
						}
						const data = await response.json()

						resolve(data)
					}, 1500)
				})
			} catch (error) {
				//only point on the Error in our promise
				console.error(error)
			}
			return pr
		},
		[]
	)

	return { request }
}
