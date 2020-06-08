import React, {useCallback} from "react";

type MessageType = {
    open: boolean,
    message: string,
    type: string
}

const SnackbarContext = React.createContext<{
    state: MessageType;
    dispatch: React.Dispatch<any>;
}>({
    state: {open: false,
    message: '',
    type: ''},
    dispatch: () => null
});

function snackbarReducer(state: any, action: any) {
    switch (action.type) {
        case 'ERROR': {
            return {open: true, message: action.message, type: 'error'}
        }
        case 'SUCCESS': {
            return {open: true, message: action.message, type: 'success'}
        }
        case 'CLOSE': {
            return {open: false, message: state.message, type: state.type}
        }
        default: {
            throw new Error(`Unsupported action type: ${action.type}`)
        }
    }
}

const SnackbarProvider = (props: any) => {
    const [state, dispatch] = React.useReducer(snackbarReducer, props && props.value ? {
        open: props.value.open,
        message: props.value.message,
        type: props.value.type
    } : {
        open: false,
        message: '',
        type: ''
    });
    //const value = React.useMemo(() => [state, dispatch], [state])
    return <SnackbarContext.Provider value={{state, dispatch}} >{props.children}</SnackbarContext.Provider>
}

const useSnackbar = () => {
    const context = React.useContext(SnackbarContext)
    if (!context) {
        throw new Error(`useSnackbar must be used within a SnackbarProvider`)
    }

    const {state, dispatch} = context,
        displayError = useCallback((message: string) => dispatch({type: 'ERROR', message}), [dispatch]),
        displaySuccess = useCallback((message: string) => dispatch({type: 'SUCCESS', message}), [dispatch]),
        close = () => dispatch({type: 'CLOSE', open: false});
    return {
        state,
        dispatch,
        displayError,
        displaySuccess,
        close
    }
}

export {SnackbarProvider, useSnackbar}