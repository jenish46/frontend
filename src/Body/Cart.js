
import { CallRounded } from '@material-ui/icons'
import axios from 'axios'
import {Component,state, deleteBooking,updateBooking,order,changeHandler,plus,minus} from 'react'
import {Link} from 'react-router-dom'

import { Redirect } from "react-router";
import {ToastContainer,toast,Zoom,Bounce} from 'react-toastify'
import { Toast } from 'bootstrap';
class Cart extends Component{
   

state ={

    success:false,
    data:[],
    count:0,
    Qty:0,
    total:0,
    config : {
		headers : {'Authorization': `Bearer ${localStorage.getItem('token')}`}
	  },
    


}
changeHandler = (e) =>{

	this.setState({
	
		[e.target.name] :e.target.value
	})
}
componentDidMount(){

axios.get('http://localhost:3000/booking/show',this.state.config).then((response)=>{


	if(response.data.data===null||response.data.data.length==0)
	{
alert('Your cart is empty')
window.location.href='/'
	}
	else
	{
		this.setState({

			success:response.data.success,
			data:response.data.data.ProductId,
			count:response.data.count,
			Qty:response.data.data.ProductId.qty,
			total:response.data.total
			
			})
	}



})

}



order =()=>{
	toast(<div style={{margin:"20px;"}} >
    <p className="text-center"><i className="fa fa-shopping-cart"></i> Confirm Order?</p>

    <button className="btn btn-dark"><Link to="/checkOut">Yes</Link></button>
    <button className="btn btn-danger">No</button>
    </div>,{position:"top-center"})
	
}

    deleteBooking = (bid) => {
       axios.put('http://localhost:3000/delete/booking/'+bid,this.state,this.state.config).then((response)=>{
		   toast.success("Product Deleted!")
		window.location.href='/cart'
           console.log(response)
       })
    }

    updateBooking=(pid) =>{

        axios.put('http://localhost:3000/updatebooking/'+pid,this.state,this.state.config).then((response)=>{console.log(response)})

    }




plus=(value)=>{

console.log(value)
	let qty = document.querySelector(`.qty${value._id}`);
	let quan = parseInt(qty.innerHTML);

	quan = quan+1;
	console.log(quan)
	const form = new FormData()
	form.append('Qty',quan)
	
	console.log(form);
	axios.put('http://localhost:3000/updatebooking/'+value.food._id,{Qty:quan},this.state.config).then((response)=>{
		toast.success("Quantity Added")
	console.log(response)
	
	window.location.reload();
	})




}


minus =(value)=>{


	console.log(value)
	let qty = document.querySelector(`.qty${value._id}`);
	let quan = parseInt(qty.innerHTML);

	quan = quan-1;
	console.log(quan)
	const form = new FormData()
	form.append('Qty',quan)
	
	console.log(form);
	axios.put('http://localhost:3000/updatebooking/'+value.food._id,{Qty:quan},this.state.config).then((response)=>{
		toast.success("Quantity Decreased")
	console.log(response)
	window.location.reload();
	})




}

    render(){

        return(

            <div>
<ToastContainer/>
<div className="container main-section">
		<div className="row">
			<div className="col-lg-12 pb-2">
				<h4>Welcome to Mero Food</h4>
			</div>
			<div className="col-lg-12 pl-3 pt-3">
				<table className="table table-hover border bg-white">
				    <thead>
				      	<tr>
					        <th>Product</th>
					        <th>Price</th>
					        <th >Quantity</th>
					        <th>Subtotal</th>
					        <th>Action</th>
				      	</tr>
				    </thead>
				    <tbody>
{

    this.state.data.map((booking,i)=>{

        return(

<tr>
					        <td>
					        	<div className="row">
									<div className="col-lg-2 Product-img">
										<img src={"http://localhost:3000/images/"+booking.food.Image} alt="..." className="img-responsive"/>
									</div>
									<div className="col-lg-10">
										<h4 className="nomargin">{booking.food.Name}</h4>
										<p>{booking.food.Description}</p>
									</div>
								</div>
					        </td>
					        <td> {booking.food.Price}</td>
					        <td data-th="Quantity" className="actions">
							
<div className="row">

	<div className="col-lg-4">
<button className="btn " onClick={this.plus.bind(this,booking)}>+</button>
	</div>
	<div className="col-lg-4">
		<h6 className={`qty${booking._id}`} style={{marginTop:"7px",marginLeft:"5px"}}>{booking.qty}</h6>
	</div>
	<div className="col-lg-4">
	<button className="btn"  onClick={this.minus.bind(this,booking)}>-</button>

	</div>
</div>

						
	

								

							</td>
							<td><strong>{booking.qty * booking.food.Price}</strong></td>
					        <td className="actions" data-th="" width="10%;">
								<button className="btn btn-info btn-sm" onClick={this.updateBooking.bind(this,booking.food._id)}><i className="fa fa-refresh"></i></button>
								<button className="btn btn-danger btn-sm" onClick={this.deleteBooking.bind(this,booking._id)}><i className="fa fa-trash-o"></i></button>								
							</td>
				      	</tr>

        )
    })
}
				      	
				    </tbody>
				    <tfoot>
						<tr>
							<td><a href="#" className="btn btn-warning text-white"><i className="fa fa-angle-left"></i> Continue Shopping</a></td>
							<td colspan="2" className="hidden-xs"></td>
							<td className="hidden-xs text-center" width="10%;"><strong>Total : {this.state.total}</strong></td>
							<td><button onClick={this.order} className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></button></td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</div>
                        </div>
						
					


           
        )
    }

}
export default Cart