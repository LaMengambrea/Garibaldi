import * as actionTypes from './actionTypes'

export const initialState = {
}

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.EXPORT_FILE_UPDATE_FILE:
            return Object.assign({}, state, action.payload)
        case actionTypes.EXPORT_FILE_RESET:
            return initialState
        default:
            return state;
    }
}

// SELECTORS
export function getExportFile(state) {
    return state.exportFile
}
