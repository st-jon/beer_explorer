import React from "react"

import Beers from './Beers'

class App extends React.Component{

  	render(){
    	return (
			<div className="App" >
				<header className="header">
					<img className='header__logo' src='images/logo_reverse.jpg'/>
					<div className="header__title">Beer Explorer</div>
					<img className='header__logo' src='images/logo.jpg'/>
				</header>
				<Beers></Beers>
			</div>
		)	
  	}
}

export default App