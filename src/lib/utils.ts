export type Handlers<S extends any, A extends any> = {
    [type: string]: (state: S, action: A) => S;
};

export const createReducer = <S extends any, A extends any> (initialState: S, handlers: Handlers<S,A>) => 
    (state: S = initialState, action: A) => {
    const handler = handlers[action.type]
    if(!handler) return state
    return handler(state, action)
}

export function updateKey<S, K extends keyof S>(
    state: S,
    key: K,
    value: S[K],
): S {
    return {
        ...state,
        [key]: value,
    };
}

export const getScrollTop = () => {
    if (!document.body) return 0;
    const scrollTop = document.documentElement
      ? document.documentElement.scrollTop || document.body.scrollTop
      : document.body.scrollTop;
    return scrollTop;
  };