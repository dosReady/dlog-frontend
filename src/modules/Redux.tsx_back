import {TbPost} from 'modules/Types'
import { createReducer } from 'lib/utils'
import { combineReducers } from 'redux'

const SETPOST = 'post/SET'

export const postActions = {
    setPost: (post: TbPost) => ( {type: SETPOST, paylod: post}),
}

type SetPostAction = ReturnType<typeof postActions.setPost>
type Actions = SetPostAction

const initialState: TbPost = {
    PostID: 0,
    MainTitle: "",
    SubTitle: "",
    Content: "",
    CtgID: 0
}

const post = createReducer<TbPost, Actions>(initialState, {
    [SETPOST]: (state, action) => ({...action.paylod}),
})

export const rootReducer = combineReducers({
    post
})

// 루트 리듀서의 반환값를 유추해줍니다
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내줍니다.
export type RootState = ReturnType<typeof rootReducer>
