import { useEffect, useState } from 'react'
import { deleteSeminar, fetchSeminars, updateSeminar } from '../api/api'
import { Seminar } from '../types/types'

export const useSeminars = () => {
	const [seminars, setSeminars] = useState<Seminar[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadSeminars = async () => {
			try {
				await new Promise(resolve => setTimeout(resolve, 1000))
				const data = await fetchSeminars()
				setSeminars(data)
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message)
				} else {
					setError('Неизвестная ошибка')
				}
			} finally {
				setLoading(false)
			}
		}

		loadSeminars()
	}, [])

	useEffect(() => {
		document.body.style.overflow = loading ? 'hidden' : 'auto'
	}, [loading])

	const handleDelete = async (id: number) => {
		if (window.confirm('Вы уверены, что хотите удалить семинар?')) {
			await deleteSeminar(id)
			setSeminars(seminars.filter(seminar => seminar.id !== id))
		}
	}

	const handleSave = async (updatedSeminar: Seminar) => {
		await updateSeminar(updatedSeminar)
		setSeminars(
			seminars.map(seminar =>
				seminar.id === updatedSeminar.id ? updatedSeminar : seminar
			)
		)
	}

	return { seminars, loading, error, handleDelete, handleSave }
}
