const initialState = {
    visibilityButtonsAndMenu: false,
    activeCategory: '',
    siteName: null,
    siteContent: null,
    isUserLogged: false,
    user: null,
    pass: null,
    favouritesId: null,
}



function reducer(state=initialState, action){
    switch(action.type){
        case 'CHANGE_VISIBILITY_BUTTONS_AND_MENU':
            return {...state, visibilityButtonsAndMenu: !state.visibilityButtonsAndMenu}
        case 'CHANGE_ACTIVE_CATEGORY':
            return {...state, activeCategory: action.activeCategory}
        case 'CHANGE_ACTIVE_SITE_NAME':
            return {...state, siteName: action.sitename}
        case 'CHANGE_ACTIVE_SITE_CONTENT':
            return {...state, siteContent: action.content}
        case 'CHANGE_IS_USER_LOGGED':
            return {...state, isUserLogged: !state.isUserLogged}
        case 'SET_USER_IN_STORE':
            return {...state, user: action.user }
        case 'SET_PASSWORD_IN_STORE':
            return {...state, pass: action.pass}
        case 'SET_FAVOURITES_ID':
            return {...state, favouritesId: action.favouritesId}
       
        default:
            return {...state}
    }
}

export default reducer;