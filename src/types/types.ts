export interface Seminar {
	id: number
	title: string
	description: string
	date: string
	time: string
	photo: string
}

export interface EditSeminarProps {
	isOpen: boolean
	onRequestClose: () => void
	seminar: Seminar
	onSave: (seminar: Seminar) => Promise<void>
}