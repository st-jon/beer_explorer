import React from 'react'


const BeerDetails = (props) => {
    console.log(props)

    return (
        <div className="modal__container">
            <div className="modal">
                <img className="modal__close" src="images/close.png" onClick={() => props.show(false)}/>
                <img className="modal__picture" src={props.details.labels.medium} />
                <div>Name: {props.details.name}</div>
                <div>Abv: {props.details.abv || "unknow"}</div>   
                <div>Ibu: {props.details.ibu || "unknow"}</div>  
                <div>Organic: {props.details.isOrganic === "N" ? 'Yes': "No"}</div>   
                <div>Year: {props.details.year || "unknow"}</div>   
                <div>Status: {props.details.status}</div>   
           </div>
        </div>
    )
}

export default BeerDetails


//name, abv, ibu, isOrganic, labels, year, status, if available: related glass data 