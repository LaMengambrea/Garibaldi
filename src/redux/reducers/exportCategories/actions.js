import * as types from './actionTypes'

export const loadExportCategories = (artPieces) => {
    //TODO: Change to Thunk and call service.loadTemplates
    return { type: types.EXPORT_CATEGORIES_LOAD_CATEGORIES, payload: artPieces }
}

export const resetExportCategories = () => {
    return { type: types.EXPORT_CATEGORIES_RESET }
}
