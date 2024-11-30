import React, { Component } from 'react';
import NewsItem from '../NewsItem';
import Spinner from './spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps={
    country:"us",
    pageSize:6,
    category:'general'
  }
  static propsTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      articles:[],
      loading:false,
      page:1
    };
  }
  async updateNews(pageNo){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=13767b4a3d774ac094ffebb8f5efb93a&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ 
      articles: parsedData.articles ,
      totalResults:parsedData.totalResults,
      loading:false
    });

  }
  handelPrevClick=async()=>{
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }
  handelNextClick=async()=>{
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

  async componentDidMount() {
    this.updateNews();
  }

  render() {
    return (
      <div className="container my-4">
         <h1 className="text-center" style={{margin:'30px 0px'}}>NewsMonkey - Top Headlines</h1>
        {this.state.loading&&<Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
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
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-2 my-2" onClick={this.handelPrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark mx-2 my-2" onClick={this.handelNextClick}>Next &rarr; </button>
        </div>
      </div>
    );
  }
}

export default News;
