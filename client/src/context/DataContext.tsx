import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { DataContextState, Log, Review } from '@/types/types';

type Action =
| { type: 'SET_LOGS'; payload: { items: Log[] } }
| { type: 'SET_REVIEWS'; payload: { items: Review[] } }
| { type: 'SET_LOGS_LOADING'; payload: boolean }
| { type: 'SET_REVIEWS_LOADING'; payload: boolean }
| { type: 'SET_LOGS_ERROR'; payload: string }
| { type: 'SET_REVIEWS_ERROR'; payload: string }
| { type: 'CLEAR_LOGS' }
| { type: 'CLEAR_REVIEWS' }
| { type: 'CLEAR_ALL' };

const initialState: DataContextState = {
logs: {
    items: [],
    isLoading: false,
    error: null,
},
reviews: {
    items: [],
    isLoading: false,
    error: null,
},
};

const DataContext = createContext<{
state: DataContextState;
dispatch: React.Dispatch<Action>;
} | null>(null);

function dataReducer(state: DataContextState, action: Action): DataContextState {
    switch (action.type) {
        case 'SET_LOGS':
        return {
            ...state,
            logs: {
            ...state.logs,
            items: action.payload.items,
            error: null,
            },
        };
        case 'SET_REVIEWS':
        return {
            ...state,
            reviews: {
            ...state.reviews,
            items: action.payload.items,
            error: null,
            },
        };
        case 'SET_LOGS_LOADING':
        return {
            ...state,
            logs: { ...state.logs, isLoading: action.payload },
        };
        case 'SET_REVIEWS_LOADING':
        return {
            ...state,
            reviews: { ...state.reviews, isLoading: action.payload },
        };
        case 'SET_LOGS_ERROR':
        return {
            ...state,
            logs: { ...state.logs, error: action.payload, isLoading: false },
        };
        case 'SET_REVIEWS_ERROR':
        return {
            ...state,
            reviews: { ...state.reviews, error: action.payload, isLoading: false },
        };
        case 'CLEAR_LOGS':
        return {
            ...state,
            logs: initialState.logs,
        };
        case 'CLEAR_REVIEWS':
        return {
            ...state,
            reviews: initialState.reviews,
        };
        case 'CLEAR_ALL':
        return initialState;
        default:
        return state;
    }
}

export function DataProvider({ children }: { children: ReactNode }) {
const [state, dispatch] = useReducer(dataReducer, initialState);

return (
    <DataContext.Provider value={{ state, dispatch }}>
        {children}
    </DataContext.Provider>
);
}

export function useData() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}