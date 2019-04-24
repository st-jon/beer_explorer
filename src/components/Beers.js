import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import BeerDetails from './BeerDetails'


const Beers = () => {
  const [beerData, setBeerData] = useState([])
  const [beerDetails, setBeerDetails] = useState(null)
  const [showBeerDetails, setshowBeerDetails] = useState(false)
  const [currentPage, setCurrentPage] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const ref = useRef(null)


    // USE EFFECT  

    useEffect(() => {
        async function fetchData() {
            const result = await axios(
                "https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beers/?key=79b5010c64efbbbf5069235e43665fe9&limit=10"
            )
            return result
        }
        fetchData()
            .then(res => {
                setBeerData(res.data.data)
                setCurrentPage(res.data.currentPage)
            })
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (!isFetching) {
            return
        } 
        fetchMoreListItems(currentPage + 1)
    }, [isFetching])



    // FUNCTION


    async function fetchMoreListItems(page) {
        let result = await axios(
            `https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beers/?key=79b5010c64efbbbf5069235e43665fe9&p=${page}`
        )
        setBeerData([...beerData, ... result.data.data])
        setCurrentPage(result.data.currentPage)
        setIsFetching(false)
    }

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop < ref.current.offsetTop){
            return
        } else {
            setIsFetching(true)
        }   
    }

    async function getBeerDetails(id) {
        const beer = await axios(
            `https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beer/${id}/?key=79b5010c64efbbbf5069235e43665fe9`
        )
        setBeerDetails(beer.data.data)
        setshowBeerDetails(true)
    }
    // console.log(beerDetails, showBeerDetails)


    // RETURN 

    if (beerData.length < 1) {
        return ( 
            <div className="loader__container"> 
                <img className="loader" src="images/loader.gif"></img>
                loading ...
            </div>
            )
    } 
    else {
        return (
            <div className="app__container">
                <content className="beerList__container"  >
                    {beerData.map(beer => {
                        return (
                            <div className="beer__container" key={beer.id} ref={ref} onClick={() => getBeerDetails(beer.id)}>
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
                    {isFetching && 
                        <div className="loadmore">
                            <img className="loader" src="images/loader.gif"></img>
                        </div>}
                </content>
                {showBeerDetails && <BeerDetails details={beerDetails} show={setshowBeerDetails}/>}
            </div>
            
        )
    } 
}

export default Beers