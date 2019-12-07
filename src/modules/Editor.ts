import {createAction} from 'typesafe-actions';
//import { createReducer } from 'lib/utils';

//액션 타입
const WRITE_EDITOR = 'write/EDITOR';

//액션 객체
export const editorActions =  {
    write: createAction(WRITE_EDITOR)<string>()
}

// 액션 객체타입
type WriteAction = ReturnType<typeof editorActions.write>;
type Actions = WriteAction;

// Editor enum
export enum EditorMode {
    MARKDOWN = 'MARKDOWN',
    WYSIWYG = 'WYSIWYG',
}

// Editor state
export type EditorState = {
    mode: EditorMode;
    title: string;
    html: string;
}

// Editor init state
const initalState: EditorState ={
    mode: EditorMode.MARKDOWN,
    title: '123',
    html: ''
}

// 리듀서
const editor = (state:EditorState = initalState, action:Actions) => {
    switch(action.type) {
        case WRITE_EDITOR:
            return {
                ...state,
                html: action.payload
            };
        default:
            return state;
    }
}
export default editor;
