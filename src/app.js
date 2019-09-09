
import './index.less'
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends Component {

  componentDidMount(){
    axios.get('/react/api/header.json')
    .then((res)=>{
      console.log(res)
    })
  }

  render(){
    return (
      <div>jjjjjjeeeeedd</div>
    );
  }
}

ReactDOM.render(<App/>,document.getElementById('app'))
