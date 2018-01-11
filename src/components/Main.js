import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

import HeaderComponent from './Header';
import Products from './Products';
import Pagination from './Pagination';
import Footer from './Footer';
import QuickView from './QuickView';
import Login from './Login';

export default class Main extends Component {
	constructor() {
		super();
		this.state = {
			products: [],
			cart: [],
			totalItems: 0,
			totalAmount: 0,
			term: '',
			category: '',
			cartBounce: false,
			quantity: 1,
			quickViewProduct: {},
			modalActive: false,
			modalCartActive: false
		};
		this.handleSearch = this.handleSearch.bind(this);
		this.handleMobileSearch = this.handleMobileSearch.bind(this);
		this.handleCategory = this.handleCategory.bind(this);
		this.handleAddToCart = this.handleAddToCart.bind(this);
		this.sumTotalItems = this.sumTotalItems.bind(this);
		this.sumTotalAmount = this.sumTotalAmount.bind(this);
		this.checkProduct = this.checkProduct.bind(this);
		this.updateQuantity = this.updateQuantity.bind(this);
		this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.openCartModal = this.openCartModal.bind(this);
		this.closeCartModal = this.closeCartModal.bind(this);
	}

	getProducts() {
		axios.get('https://api.mlab.com/api/1/databases/db_mummakill/collections/products?apiKey=zHrF8dJm-5rKELK9RJ-GO0EGtecbooPD')
			.then(response => {
				this.setState({
					products: response.data
				})
			})
	}

	componentWillMount() {
		this.getProducts();
	}

	handleSearch(event) {
		this.setState({ term: event.target.value });
	}

	handleMobileSearch() {
		this.setState({ term: "" });
	}

	handleCategory(event) {
		this.setState({ category: event.target.value });
		console.log(this.state.category);
	}

	handleAddToCart(selectedProducts) {
		let cartItem = this.state.cart;
		let productID = selectedProducts.id;
		let productQty = selectedProducts.quantity;
		if (this.checkProduct(productID)) {
			console.log('hi');
			let index = cartItem.findIndex((x => x.id == productID));
			cartItem[index].quantity = Number(cartItem[index].quantity) + Number(productQty);
			this.setState({
				cart: cartItem
			})
		} else {
			cartItem.push(selectedProducts);
		}
		this.setState({
			cart: cartItem,
			cartBounce: true,
		});
		setTimeout(function () {
			this.setState({
				cartBounce: false,
				quantity: 1
			});
			console.log(this.state.quantity);
			console.log(this.state.cart);
		}.bind(this), 1000);
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
	}

	handleRemoveProduct(id, e) {
		let cart = this.state.cart;
		let index = cart.findIndex((x => x.id == id));
		cart.splice(index, 1);
		this.setState({
			cart: cart
		})
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
		e.preventDefault();
	}

	checkProduct(productID) {
		let cart = this.state.cart;
		return cart.some(function (item) {
			return item.id === productID;
		});
	}

	sumTotalItems() {
		let total = 0;
		let cart = this.state.cart;
		total = cart.length;
		this.setState({
			totalItems: total
		})
	}

	sumTotalAmount() {
		let total = 0;
		let cart = this.state.cart;
		for (var i = 0; i < cart.length; i++) {
			total += cart[i].price * parseInt(cart[i].quantity);
		}
		this.setState({
			totalAmount: total
		})
	}

	updateQuantity(qty) {
		console.log("quantity added...")
		this.setState({
			quantity: qty
		})
	}

	openModal(product) {
		this.setState({
			quickViewProduct: product,
			modalActive: true
		})
	}

	closeModal() {
		this.setState({
			modalActive: false
		})
	}

	openCartModal() {
		this.setState({
			modalCartActive: true
		})
	}

	closeCartModal() {
		this.setState({
			modalCartActive: false
		})
	}

	render() {
		if (window.localStorage.getItem('sessionID')) {
			return (
				<div className="container">
					<HeaderComponent
						cartBounce={this.state.cartBounce}
						total={this.state.totalAmount}
						totalItems={this.state.totalItems}
						cartItems={this.state.cart}
						removeProduct={this.handleRemoveProduct}
						handleSearch={this.handleSearch}
						handleMobileSearch={this.handleMobileSearch}
						handleCategory={this.handleCategory}
						categoryTerm={this.state.category}
						updateQuantity={this.updateQuantity}
						productQuantity={this.state.moq}
						openModal={this.openModal}
					/>
					<Products
						productsList={this.state.products}
						searchTerm={this.state.term}
						addToCart={this.handleAddToCart}
						productQuantity={this.state.quantity}
						updateQuantity={this.updateQuantity}
						openModal={this.openModal}
					/>
					<Footer />
					<QuickView
						openModal={this.state.modalActive}
						closeModal={this.closeModal} 
						product={this.state.quickViewProduct} />
				</div>
			)
		} else {
			return (
				<Login />
			)
		}
	}
}