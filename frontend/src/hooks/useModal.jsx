import { useContext } from 'react';
import ModalContext from '../context/ModalContext';

// Custom Hook untuk mengakses state modal
export const useModal = () => useContext(ModalContext);