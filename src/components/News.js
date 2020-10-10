import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/news.css';

function News(props) {

    const { topNews, indiaNews, loaded } = props;

    useEffect(() => {
        if(!loaded) {
            props.loadNews();
        }
    }, [])

    return(
        <div>
            <div style={{width: '100%'}}>
                <div style={{width: '100%', display: 'flex', whiteSpace: 'nowrap'}}>
                <div style={{width: '300px'}}><h5 style={{paddingLeft: '3%'}}><b>COVID-19 News</b></h5></div>
                </div>
                <div style={{height: '350px', width: '100%'}}>
                        {loaded && topNews.map((item, index) => {
                            console.log(index);
                            return (
                                <Link to={'/news/'+index}>
                                <div className='news-card'>
                                    <img style={{borderRadius: '5px 5px 0px 0px'}} height='200px' src={item.urlToImage} width='100%'/>
                                    <div className='hover-overlay'></div>
                                    <p><b>{item.title}</b></p>
                                </div>
                                </Link>
                            )
                            })
                        }
                </div>
            </div>
            <div style={{width: '100%'}}>
                <div style={{width: '100%', display: 'flex', whiteSpace: 'nowrap'}}>
                <div style={{width: '300px'}}><h5 style={{paddingLeft: '3%'}}><b>COVID-19 India News</b></h5></div>
                </div>
                <div style={{height: '350px', width: '100%'}}>
                        {loaded && indiaNews.map((item, index) => {
                            console.log(item.urlToImage);
                            return (
                                <Link to={'/news/india/'+index}>
                                <div className='news-card'>
                                    <img style={{borderRadius: '5px 5px 0px 0px'}} height='200px' src={item.urlToImage} width='100%'/>
                                    <div className='hover-overlay'></div>
                                    <p><b>{item.title}</b></p>
                                </div>
                                </Link>
                            )
                            })
                        }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    if(state.newsLoaded) {
        return {
            topNews: state.topNews,
            indiaNews: state.indiaNews,
            loaded: state.newsLoaded,
        }
    }
    return{}
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadNews: () => {
            var topNews = [];
            var indiaNews = [];
            Promise.all([
                fetch('https://newsapi.org/v2/top-headlines?q=covid&language=en&apiKey=0ebce8cb15b04905a0b4c57203d56907'),
                fetch('https://newsapi.org/v2/top-headlines?q=covid&language=en&country=in&apiKey=0ebce8cb15b04905a0b4c57203d56907'),  
            ]).then(async ([top, india]) => [await top.json(), await india.json()]).then(([top, india]) => {
                top = top.articles.filter(item => item.source !== null && item.content !== null && item.title !== null && item.description !== null);
                india = india.articles.filter(item => item.source !== null && item.content !== null && item.title !== null && item.description !== null);
                topNews = top;
                indiaNews = india;
            }).then(res => dispatch({type: 'LOAD_NEWS', topNews: topNews, indiaNews: indiaNews}));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News);