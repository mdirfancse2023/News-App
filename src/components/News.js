import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropsTypes from "prop-types";
export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
  };
  static PropsTypes = {
    country: PropsTypes.string,
    category: PropsTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba9cada9271e493b96d02878c05c7ca7&page=${this.state.page}&pagesize=1`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  prevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=ba9cada9271e493b96d02878c05c7ca7&page=${
      this.state.page - 1
    }&pagesize=1`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };
  nextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=ba9cada9271e493b96d02878c05c7ca7&page=${
      this.state.page + 1
    }&pagesize=1`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
  };
  render() {
    return (
      <div className="container my-3">
        <div className="container d-flex justify-content-center">
          <h3>NewsApp - Top Headlines</h3>
        </div>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imgurl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://seeg.eco.br/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
                    }
                    newsurl={element.url}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between fixed-bottom my-3">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.prevClick}
            className="btn btn-dark"
          >
            &larr; Prev
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 4)
            }
            type="button"
            onClick={this.nextClick}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
