import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import EditSeminar from '../edit-seminar/EditSeminar';
import styles from './Seminars.module.css';

interface Seminar {
	id: number;
	title: string;
	description: string;
	date: string;
	time: string;
	photo: string;
}

const Seminars: React.FC = () => {
	const [seminars, setSeminars] = useState<Seminar[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [currentSeminar, setCurrentSeminar] = useState<Seminar | null>(null);

	useEffect(() => {
		const fetchSeminars = async () => {
			try {
				await new Promise(resolve => setTimeout(resolve, 1000));
				const response = await fetch('http://localhost:5000/seminars');
				if (!response.ok) throw new Error('Ошибка при загрузке данных');
				const data: Seminar[] = await response.json();
				setSeminars(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message); // Приведение к типу Error
				} else {
					setError('Неизвестная ошибка'); // Обработка других типов ошибок
				}
			} finally {
				setLoading(false);
			}
		};

		fetchSeminars();
	}, []);

	useEffect(() => {
		document.body.style.overflow = loading ? 'hidden' : 'auto';
	}, [loading]);

	const handleDelete = async (id: number) => {
		if (window.confirm('Вы уверены, что хотите удалить семинар?')) {
			await fetch(`http://localhost:5000/seminars/${id}`, {
				method: 'DELETE',
			});
			setSeminars(seminars.filter(seminar => seminar.id !== id));
		}
	};

	const handleEdit = (seminar: Seminar) => {
		setCurrentSeminar(seminar);
		setIsModalOpen(true);
	};

	const handleSave = async (updatedSeminar: Seminar) => {
		await fetch(`http://localhost:5000/seminars/${updatedSeminar.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedSeminar),
		});
		setSeminars(
			seminars.map(seminar =>
				seminar.id === updatedSeminar.id ? updatedSeminar : seminar
			)
		);
	};

	if (loading)
		return (
			<div className={styles.spinner}>
				<FaSpinner />
			</div>
		);
	if (error)
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: 50,
				}}
			>
				{error}
			</div>
		);

	return (
		<div>
			<h1>Семинары</h1>
			<div className={styles.posts}>
				{seminars.map(seminar => (
					<div className={styles.post} key={seminar.id}>
						<h2 style={{ display: 'inline-block', marginRight: '10px' }}>
							{seminar.title}
						</h2>
						<button onClick={() => handleEdit(seminar)}>Редактировать</button>
						<button onClick={() => handleDelete(seminar.id)}>Удалить</button>
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
	 );
};

export default Seminars;