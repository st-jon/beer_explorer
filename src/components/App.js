import React from "react"
import axios from 'axios'

import BeerList from './BeerList'

class App extends React.Component{

  	constructor(props) {
    	super(props)
		this.state = {
			data: null,
		}
  	}

	componentDidMount() {
		axios.get("https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beers/?key=79b5010c64efbbbf5069235e43665fe9")
			.then(res => this.setState({ data: res.data.data }))
			.catch(err => console.log(err.message))
	}

  	render(){
    	return (
			<div className="App">
				<header className="title">Brewery API</header>
				<BeerList list={this.state}></BeerList>
			</div>
		)	
  	}
}

export default App