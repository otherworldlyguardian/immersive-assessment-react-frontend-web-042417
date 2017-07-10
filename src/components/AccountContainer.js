import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'

class AccountContainer extends Component {

  constructor() {
    super()

    // we have provided this default state for you,
    // use this to get the functionality working
    // and then replace the default transactions with a call to the API

    this.state = {
      searchTerm: '',
      transactions: []
    }
  }

  componentWillMount () {
    fetch('https://boiling-brook-94902.herokuapp.com/transactions')
    .then(res => res.json())
    .then(data => this.setState({
      transactions: data
    }))
  }

  handleChange(event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  searchArr () {
    return this.state.searchTerm === '' ? this.state.transactions : this.state.transactions.filter((transaction) => transaction.description.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || transaction.category.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || transaction.amount.toString().includes(this.state.searchTerm))
  }

  render() {
    return (
      <div>
        <Search searchTerm={this.state.searchTerm} handleChange={this.handleChange.bind(this)} />
        <TransactionsList transactions={this.searchArr()} searchTerm={this.state.searchTerm} />
      </div>
    )
  }
}

export default AccountContainer
