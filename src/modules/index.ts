import editor, {EditorState, editorActions} from './Editor';
import { combineReducers } from 'redux';

export type RootState = {
    editor: EditorState
};

export const rootReducer = combineReducers({
    editor
});

export {editorActions};