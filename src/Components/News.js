import React, { Component } from 'react';
import NewsItem from '../NewsItem';

export class News extends Component {
  constructor() {
    super();
    console.log("constructor from news component");
    this.state = {
      articles: []
    };
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=13767b4a3d774ac094ffebb8f5efb93a";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles });
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
      </div>
    );
  }
}

export default News;
