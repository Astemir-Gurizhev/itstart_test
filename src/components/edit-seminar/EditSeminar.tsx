import { useState } from 'react'
import Modal from 'react-modal'
import { EditSeminarProps } from '../../types/types'
import styles from './EditSeminar.module.css'
import { IoIosCloseCircle } from 'react-icons/io'
import { FaRegSave } from 'react-icons/fa'

export const EditSeminar = ({
	isOpen,
	onRequestClose,
	seminar,
	onSave,
}: EditSeminarProps) => {
	const [title, setTitle] = useState<string>(seminar.title)
	const [description, setDescription] = useState<string>(seminar.description)
	const [date, setDate] = useState<string>(seminar.date)
	const [time, setTime] = useState<string>(seminar.time)
	const [photo, setPhoto] = useState<string>(seminar.photo)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const updatedSeminar = { ...seminar, title, description, date, time, photo }
		await onSave(updatedSeminar)
		onRequestClose()
	}

	return (
		<Modal
			className={styles.modal}
			isOpen={isOpen}
			onRequestClose={onRequestClose}
		>
			<h2>Редактировать семинар</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Заголовок:
					<input
						type='text'
						value={title}
						onChange={e => setTitle(e.target.value)}
						required
					/>
				</label>
				<label>
					Описание:
					<textarea
						value={description}
						onChange={e => setDescription(e.target.value)}
						required
					/>
				</label>
				<label>
					Дата:
					<input
						type='date'
						value={date}
						onChange={e => setDate(e.target.value)}
						required
					/>
				</label>
				<label>
					Время:
					<input
						type='time'
						value={time}
						onChange={e => setTime(e.target.value)}
						required
					/>
				</label>
				<label>
					Фото URL:
					<input
						type='text'
						value={photo}
						onChange={e => setPhoto(e.target.value)}
						required
					/>
				</label>
				<button className={styles.btnSave} type='submit'>Сохранить <FaRegSave/></button>
				
				<IoIosCloseCircle className={styles.btnClose} type='button' onClick={onRequestClose}/>
				
			</form>
		</Modal>
	)
}
