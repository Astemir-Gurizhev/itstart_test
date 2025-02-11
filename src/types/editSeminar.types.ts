import { Seminar } from './seminar.types'

export interface EditSeminarProps {
	isOpen: boolean
	onRequestClose: () => void
	seminar: Seminar
	onSave: (seminar: Seminar) => Promise<void>
}