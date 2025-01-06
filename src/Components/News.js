import React, { useEffect, useState } from 'react';
import NewsItem from '../NewsItem';
import Spinner from './spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import { cleanup } from '@testing-library/react';


const News =(props)=> {
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalResults,setTotalResults]=useState(0)
  // document.title=`${props.category} - nNewsApp`
  
  // constructor(props) {
  //   super(props);
    
  // }
  const updateNews=async (pageNo)=>{
    props.setprogress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=13767b4a3d774ac094ffebb8f5efb93a&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setprogress(30);
    let parsedData = await data.json();
    props.setprogress(50);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setprogress(100);
  }
  const handelPrevClick=async()=>{
    setPage(page-1)
    updateNews();
  }
  const handelNextClick=async()=>{
    setPage(page+1)
    updateNews();
  }
  
  useEffect(()=>{
    updateNews();
  },[])


  const fetchMoreData = async() => {
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=13767b4a3d774ac094ffebb8f5efb93a&page=${page}&pagesize=${props.pageSize}`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

    return (
      <>
         <h1 className="text-center" style={{margin:'30px 0px'}}>NewsMonkey - Top {props.category} Headlines</h1>
        {loading&&<Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>} 
        >
        <div className="container">
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem 
                  title={element.title ? element.title: ""} 
                  description={element.description ? element.description: ""} 
                  imageUrl={element.urlToImage} 
                  newsUrl={element.url} 
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>

      </>
    );
  
}

News.defaultProps={
  country:"us",
  pageSize:6,
  category:'general'
}
News.propsTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}

export default News;
