const CHANGE_TAB = 'CHANGE_TAB';

const tabReducer = (state = [], action) => {
    const { type } = action;

    switch (type) {
        case CHANGE_TAB:
            return ([
                ...state,
                action.page
            ]);
        default:
            return state;
    }
};