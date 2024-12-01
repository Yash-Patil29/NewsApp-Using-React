import React, { Component } from 'react';
import NewsItem from '../NewsItem';
import Spinner from './spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


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
  constructor(props) {
    super(props);
    this.state = {
      articles:[],
      loading:false,
      page:1,
      totalResults:0
    };
    document.title=`${this.props.category} - nNewsApp`
  }
  async updateNews(pageNo){
    this.props.setprogress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=13767b4a3d774ac094ffebb8f5efb93a&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    this.props.setprogress(30);
    let parsedData = await data.json();
    this.props.setprogress(50);
    this.setState({ 
      articles: parsedData.articles ,
      totalResults:parsedData.totalResults,
      loading:false
    });
    this.props.setprogress(100);

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

  fetchMoreData = async() => {
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=13767b4a3d774ac094ffebb8f5efb93a&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ 
      articles: this.state.articles.concat(parsedData.articles) ,
      totalResults:parsedData.totalResults
    });
  };

  render() {
    return (
      <>
         <h1 className="text-center" style={{margin:'30px 0px'}}>NewsMonkey - Top {this.props.category} Headlines</h1>
        {this.state.loading&&<Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>} 
        >
        <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
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
}

export default News;
