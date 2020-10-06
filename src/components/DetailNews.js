import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function DetailNews({ displayTopNews, displayIndiaNews, match}) {
    useEffect(()=>{
        console.log(displayIndiaNews, displayTopNews);
        if(displayTopNews !== null ){
            displayTopNews(match.params.id)
        }
        else {
            displayIndiaNews(match.params.id)
        }
    }, [])
    return(
        <div>
            Details about 
        </div>
    )
}

export default withRouter(DetailNews);