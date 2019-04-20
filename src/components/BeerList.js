import React from 'react'

class BeerList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {data} = this.props.list
        console.log(data)
        if (!data) {
            return null
        }
        return (
            <content className="beerList__container">
                {data.map(beer => {
                    return (
                        <div className="beer__container" key={beer.id}>
                            <div className="infos__container">
                                {beer.labels && <img className="icon" src={beer.labels.icon || "./images/beer_default-img.png"}/>}
                                {!beer.labels && <img className="icon__default" src="./images/beer_default-img.png"/>}
                                <div className="text__container">
                                    <div className="name">{beer.name}</div>
                                    <div className="abv">abv: {beer.abv || "unknow"}</div>
                                    <div className="ibu">ibu: {beer.ibu || "unknow"}</div>
                                </div>
                                
                            </div>
                        </div>
                    )  
                })}
            </content>
        )
    }
}

export default BeerList