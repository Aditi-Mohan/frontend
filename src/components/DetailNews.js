import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

function DetailNews(props) {

    const { news, india, loaded } = props;

    return(
        <div>
        {loaded && <div style={{padding: '2%'}}>
            <img src={news.urlToImage} alt='no img' width='100%' height='350px' style={{position:'absolute',left:0, top:80, zIndex: -1, filter: 'blur(2px)'}}/>
            <div style={{ height: '300px', display: 'flex', justifyContent: 'center', verticalAlign: 'center'}}>
                <img src={news.urlToImage} alt='' height='300px'/>
                </div>
            <h3>{news.title}</h3>
            <hr/>
            <h5>{news.description}... read further <a href={news.url} target='_blank'>here</a></h5>
            <p style={{textAlign: 'end'}}>source: <b>{news.author}, {news.source.name}</b></p>
            <p style={{textAlign: 'end'}}>published on: <b>{ news.publishedAt}</b></p>
        </div>}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {

    let id = ownProps.match.params.id;
    let india = ownProps.india;

    if(state.newsLoaded) {
        return {
            india,
            news: india ? state.indiaNews[id] : state.topNews[id],
            loaded: state.newsLoaded,
        }
    }
    else {
        return {
            loaded: false,
        }
    }
}

export default withRouter(connect(mapStateToProps)(DetailNews));