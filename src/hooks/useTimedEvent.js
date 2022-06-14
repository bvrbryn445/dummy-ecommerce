import { useEffect, useReducer } from 'react';

const initialState = {
	timer: null,
	isTimerRunning: false,
	callback: null,
}

// setup reducer props
function reducer(state, action) {
	switch (action.type) {
		case 'setup_event':
			return {
				...state,
				callback: action.payload,
				isTimerRunning: true,
			}
		case 'start':
			return { ...state, timer: action.payload }
		case 'stop':
			return { ...state, isTimerRunning: false }
		case 'reset':
			clearTimeout(state.timer);
			return { ...state, ...initialState }
		default:
			return state;
	}
}

export default function useTimedEvent(milliseconds = 5000) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { isTimerRunning, timer, callback } = state;

	useEffect(() => {
		// setup timeout timer once it is started running
		if (isTimerRunning && callback !== null && timer === null) {
			const timer = setTimeout(() => {
				callback();
				
				// dispatch reset action after event call
				dispatch({ type: 'reset' });
			}, milliseconds);

			dispatch({ type: 'start', payload: timer });
			return () => clearTimeout(timer);
		}
	}, [isTimerRunning]);

	return [isTimerRunning, dispatch];
}