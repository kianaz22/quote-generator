import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { FaQuoteLeft, FaTwitter } from 'react-icons/fa'

class QuoteGenerator extends React.Component {
  constructor(props){
      super(props);
      this.state={
          text:'',
          author:'',
          bgColor:'teal'
      };
      this.newQuote=this.newQuote.bind(this);
      this.getRandomInt=this.getRandomInt.bind(this);

  }
   getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  newQuote(){
      let random = Math.floor(Math.random() * 100 );
      let randomColor = `rgb(${this.getRandomInt(50,180)} , ${this.getRandomInt(50,180)} , ${this.getRandomInt(50,180)})`;
      this.setState({bgColor:randomColor})
      
      fetch('https://type.fit/api/quotes')
       .then(response => response.json())
       .then(res => this.setState({text:res[random].text , author:res[random].author}))
       .catch(err => console.error(err))
    }

   componentDidMount(){
     this.newQuote();
  }

  render(){
      const url=`https://www.twitter.com/intent/tweet?text=${this.state.text}`
      return(
        <div id='app' style={{backgroundColor:`${this.state.bgColor}`}}>
          <div id='quote-box' style={{width:`${this.state.text.length*15}px`}}>
              <div>
                  <FaQuoteLeft size={25} /> 
                  <span className='fade-in' id='text'>{this.state.text}</span>
              </div>
              <div id='author'>- {this.state.author}</div>
              <div className='buttons'>
                  <a id='tweet-quote' href={url} title='share on twitter' target='_blank' style={{backgroundColor:`${this.state.bgColor}`}}><FaTwitter /></a>
                  <button type='button' id='new-quote' onClick={this.newQuote} style={{backgroundColor:`${this.state.bgColor}`}} >New Quote</button>
              </div>
          </div>
          </div>
      )
  }
}

ReactDOM.render(<QuoteGenerator />,document.getElementById('root'));


