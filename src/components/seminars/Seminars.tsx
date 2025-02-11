import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useSeminars } from '../../hooks/useSeminars'
import { Seminar } from '../../types/types'
import { EditSeminar } from '../edit-seminar/EditSeminar'
import styles from './Seminars.module.css'
import { MdModeEdit } from 'react-icons/md'

export const Seminars = () => {
	const { seminars, loading, error, handleDelete, handleSave } = useSeminars()
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [currentSeminar, setCurrentSeminar] = useState<Seminar | null>(null)

	const handleEdit = (seminar: Seminar) => {
		setCurrentSeminar(seminar)
		setIsModalOpen(true)
	}

	if (loading)
		return (
			<div className={styles.spinner}>
				<FaSpinner />
			</div>
		)
	if (error) return <div className='error'>{error}</div>

	return (
		<div className={styles.seminars}>
			<h1>Семинары</h1>
			<div className={styles.posts}>
				{seminars.map(seminar => (
					<div className={styles.post} key={seminar.id}>
						<h2>{seminar.title}</h2>
						<div className={styles.actionBtns}>
							<MdModeEdit className={styles.editBtn}  onClick={() => handleEdit(seminar)}/>
							<RiDeleteBin5Line className={styles.deleteBtn} onClick={() => handleDelete(seminar.id)} />
						</div>
						<p>{seminar.description}</p>
						<p>
							{seminar.date} в {seminar.time}
						</p>
						<img src={seminar.photo} alt={seminar.title} />
					</div>
				))}
			</div>
			{currentSeminar && (
				<EditSeminar
					isOpen={isModalOpen}
					onRequestClose={() => setIsModalOpen(false)}
					seminar={currentSeminar}
					onSave={handleSave}
				/>
			)}
		</div>
	)
}
