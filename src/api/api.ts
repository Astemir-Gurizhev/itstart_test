import { Seminar } from '../types/types'

const BASE_URL = 'http://localhost:5000/seminars'

export const fetchSeminars = async (): Promise<Seminar[]> => {
	const response = await fetch(BASE_URL)
	if (!response.ok) throw new Error('Ошибка при загрузке данных')
	return await response.json()
}

export const deleteSeminar = async (id: number): Promise<Response> => {
	return await fetch(`${BASE_URL}/${id}`, {
		method: 'DELETE',
	})
}

export const updateSeminar = async (
	updatedSeminar: Seminar
): Promise<Response> => {
	return await fetch(`${BASE_URL}/${updatedSeminar.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updatedSeminar),
	})
}
