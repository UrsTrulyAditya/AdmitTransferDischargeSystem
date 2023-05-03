import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const HealthNews = () => {
    const [news, setNews] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=9f89a2ccdc2842c18393fe5f6d4ab0d7')
            .then(response => response.json())
            .then(data => setNews(data.articles.slice(1, 7)));
    }, []);

    return (
        <>
            <h1>Latest Blogs</h1>
            <div className="news-grid" style={{height:'550px', backgroundColor:'#ffffff'}}>
                {news.map((article, index) => (
                    <a href={article.url}  target="_blank" className="news-box" key={article.url} style={{ color:'#000000',textDecoration:'none', border: "none", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <img style={{ width: '30%', height: '100px', marginRight: '25px' }} src={article.urlToImage||''} alt={article.title} />
                        <div style={{ width: '50%' }}>
                            <h4>{article.title}</h4>
                        </div>
                    </a>
                ))}
            </div>
        </>
    );
};

export default HealthNews;
