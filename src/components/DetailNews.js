import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

function DetailNews({ displayTopNews, displayIndiaNews, match}) {

    const [news, setNews] = useState({})
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        let data=null;
        console.log(displayIndiaNews, displayTopNews);
        if(displayTopNews !== null ){
            data = displayTopNews(match.params.id)

        }
        else {
            data = displayIndiaNews(match.params.id)
        }
        if(Object.keys(news).length === 0) {
            console.log(data);
            setNews(data);
            setLoaded(true);
        }
    }, [])
    return(
        <div style={{padding: '2%'}}>
            <img src={news.urlToImage} alt='no img' width='100%' height='350px' style={{position:'absolute',left:0, top:80, zIndex: -1, filter: 'blur(2px)'}}/>
            <div style={{ height: '300px', display: 'flex', justifyContent: 'center', verticalAlign: 'center'}}>
                <img src={news.urlToImage} alt='' height='300px'/>
                </div>
            <h3>{news.title}</h3>
            <hr/>
            <h5>Descripiton: {news.description}...</h5>
            <p>{loaded && news.content.substring(0, news.content.indexOf('['))} read further <a href={news.url} target='_blank'>here</a></p>
            <p style={{textAlign: 'end'}}>source: <b>{loaded && news.author}, {loaded && news.source.name}</b></p>
            <p style={{textAlign: 'end'}}>published on: <b>{loaded && news.publishedAt}</b></p>
        </div>
    )
}

export default withRouter(DetailNews);