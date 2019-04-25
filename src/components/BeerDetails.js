import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'


const BeerDetails = (props) => {
    console.log(props)
    const ref = useRef(null)

    useEffect(() => {
        document.addEventListener("mousedown", handleClick)
        return () => {
          document.removeEventListener("mousedown", handleClick)
        }
    }, [])

    const handleClick = e => {
        if (ref.current.contains(e.target)) {
          return
        }
        props.show(false)
    }

    // const [glassData, setGlassData] = useState([])

    // useEffect(() => {
    //     console.log(props.details.glass.id)
    //     async function fetchData() {
    //         const result = await axios(
    //             `https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/glass/${props.details.glass.id}/?key=79b5010c64efbbbf506935e43665fe9`
    //         )
    //         return result
    //     }
    //     if (props.details.glass.id) {
    //         fetchData()
    //         .then(res => setGlassData(res.data.data))
    //     }     
    // }, [])

    return (
        <div className="modal__container">
            <div className="modal" ref={ref}>
                <img className="modal__close" src="images/close.png" onClick={() => props.show(false)}/>
                <div className="modal__picture__container">
                    {!props.details.labels && <img className="modal__picture" src="images/beer_default-img.png"/>}
                    {props.details.labels && <img className="modal__picture" src={props.details.labels.medium} />}
                </div>
                <div className="modal__text">
                    <div className="modal__text__name"><strong>{props.details.name}</strong></div>
                    <div><strong>Abv: </strong>{props.details.abv || "unknow"}</div>   
                    <div><strong>Ibu: </strong>{props.details.ibu || "unknow"}</div>  
                    <div><strong>Organic: </strong>{props.details.isOrganic === "N" ? 'No': "Yes"}</div>   
                    <div><strong>Year: </strong>{props.details.year || "unknow"}</div>   
                    <div><strong>Status: </strong>{props.details.status}</div>
                    {props.details.glass && <div><strong>Glass: </strong>{props.details.glass.name}</div>}
                </div>           
           </div>
        </div>
    )
}

export default BeerDetails


//name, abv, ibu, isOrganic, labels, year, status, if available: related glass data 