import React, {useCallback} from "react";

const ModelContext = React.createContext({
    open: false
});

function modelReducer(state: any, action: any) {
    switch (action.type) {
        case 'OPEN': {
            return {open: true}
        }
        case 'CLOSE': {
            return {open: false}
        }
        default: {
            throw new Error(`Unsupported action type: ${action.type}`)
        }
    }
}

function ModelProvider(props: any) {
    const [state, dispatch] = React.useReducer(modelReducer, props && props.value ? {
        open: props.value.open
    } : {
        open: false
    });
    const value = React.useMemo(() => [state, dispatch], [state])
    // @ts-ignore
    return <ModelContext.Provider value={value} >{props.children}</ModelContext.Provider>
}

function useModal() {
    const context = React.useContext(ModelContext)
    if (!context) {
        throw new Error(`useModel must be used within a ModelProvider`)
    }
    // @ts-ignore
    const [state, dispatch] = context
    const open = useCallback(() => dispatch({type: 'OPEN'}), [dispatch]);
    const close = useCallback(() => dispatch({type: 'CLOSE'}), [dispatch]);

    return {
        state,
        open,
        close
    }
}

export {ModelProvider, useModal}