const initState = {
    newsLoaded: false,
}

const newsReducer = (state = initState, action) => {
    if(action.type === 'LOAD_NEWS') {
        return {
            topNews: action.topNews,
            indiaNews: action.indiaNews,
            newsLoaded: true,
        }
    }
    return state;
}

export default newsReducer;