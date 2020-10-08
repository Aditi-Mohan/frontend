import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TopNews(props) {
    
    const [topNews, setTopNews] = useState([]);
    const [indiaNews, setIndiaNews] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch('https://newsapi.org/v2/top-headlines?q=covid&language=en&apiKey=0ebce8cb15b04905a0b4c57203d56907'),
            fetch('https://newsapi.org/v2/top-headlines?q=covid&language=en&country=in&apiKey=0ebce8cb15b04905a0b4c57203d56907'),  
        ]).then(async ([top, india]) => [await top.json(), await india.json()]).then(([top, india]) => {
            top = top.articles.filter(item => item.source !== null && item.content !== null && item.title !== null && item.description !== null);
            india = india.articles.filter(item => item.source !== null && item.content !== null && item.title !== null && item.description !== null);
            props.getNews(top, india);
            setTopNews(top);
            setIndiaNews(india);
        })
    }, [])

    return(
        <div>
    <div>
        <br/>
        <h5 style={{paddingLeft: '3%'}}><b>Covid News</b></h5>
        <ul type='none' style={{paddingLeft: '4%'}}>
            {topNews.map((item, index) => <li><Link style={{color: 'rgba(64, 69, 82, 1)'}} to={'/news/'+index}>{item.title}</Link></li>)}
        </ul>
    </div>
    <br/>
    <div>
        <h5 style={{paddingLeft: '3%'}}><b>Covid in India</b></h5>
        <ul type='none' style={{paddingLeft: '4%'}}>
            {indiaNews.map((item, index) => <li><Link style={{color: 'rgba(64, 69, 82, 1)'}} to={'/news/india/'+index}>{item.title}</Link></li>)}
        </ul>
    </div>
    </div>
    )
}

export default TopNews;