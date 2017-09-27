import React from 'react'
import { Link } from 'react-router'

const SingleOils = (props) => {
  const productsList = props.list
  return (
    <div className = "container-fluid products-bkg">

      <ul>
      {
        productsList.length
        ? (
            <h3 className='text-white script-font'>Single Oils</h3>
          )
        : (
            <h3 className='text-white script-font'>No products.</h3>
          )
      }
      {
        productsList.map(product => {
          return (
            <div className="row list-group-item" key={ product.id }>
              <div className="row">
                <div className="col-md-2">
                  <img className="col-xs-12 photo-sm mx-auto d-block" src={product.photo}/>
                </div>
                <div className="col-md-10">
                  <h3><Link to= {`/products/${product.id}`}>{product.name}</Link></h3>
                  <h4 className='retail-price'>Retail Price: ${product.retail.toFixed(2)}</h4>
                  <h4 className='member-price'>Member Price: ${product.wholesale.toFixed(2)}</h4>
                  <p>{product.summary}</p>
                  <Link className = 'btn btn-primary' to={`/products/${product.id}`}>More Information</Link>
                  <Link className = 'btn btn-success margin-left' to={`/products/${product.id}`}>Add to Cart</Link>
                </div>
              </div>
            </div>
          )
        })
      }
      </ul>
    </div>
  )
}

export default SingleOils
