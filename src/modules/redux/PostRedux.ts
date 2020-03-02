import {TbPost} from 'modules/Types'
import { createReducer } from 'lib/utils'

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
    TagID: 0
}

const post = createReducer<TbPost, Actions>(initialState, {
    [SETPOST]: (state, action) => ({...action.paylod}),
})

export default post