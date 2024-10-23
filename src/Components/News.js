import React, { Component } from 'react';
import NewsItem from '../NewsItem';

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles:[],
      page:1
    };
  }
  handelPrevClick=async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=13767b4a3d774ac094ffebb8f5efb93a&page=${this.state.page - 1}&pagesize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page:this.state.page - 1,
      articles: parsedData.articles
    })

  }
  handelNextClick=async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=13767b4a3d774ac094ffebb8f5efb93a&page=${this.state.page + 1}&pagesize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page:this.state.page + 1,
      articles: parsedData.articles
    })

  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=13767b4a3d774ac094ffebb8f5efb93a&page=1";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ 
      articles: parsedData.articles ,
      totalArticles:parsedData.totalResults
    });
  }

  render() {
    return (
      <div className="container my-4">
        <h2>NewsMonkey - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem 
                  title={element.title ? element.title: ""} 
                  description={element.description ? element.description: ""} 
                  imageUrl={element.urlToImage} 
                  newsUrl={element.url} 
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark mx-2 my-2" onClick={this.handelPrevClick}> &larr; Previous</button>
        <button type="button" class="btn btn-dark mx-2 my-2" onClick={this.handelNextClick}>Next &rarr; </button>
        </div>
      </div>
    );
  }
}

export default News;
