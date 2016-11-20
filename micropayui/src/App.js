import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

const ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const contractABI = [{"constant":true,"inputs":[],"name":"getPayers","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"payers","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_email","type":"bytes32"}],"name":"addPayer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newPrice","type":"uint256"}],"name":"changePrice","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}];

const contractAddress = '0xf91577919a9d60e8a09de29c10909dbceca380c2';

const microPayK = ETHEREUM_CLIENT.eth.contract(contractABI).at(contractAddress);
class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            emails: []
        }
    }

  componentWillMount(){
      console.log("client!!", ETHEREUM_CLIENT);
      const data = microPayK.getPayers();
      console.log("data!!", data)
      this.setState({
          emails: String(data).split(','),
      });
  }
  render() {

    const TableRows = this.state.emails.map((person, index) => {
        return (
            <tr>
                <td>{ETHEREUM_CLIENT.toAscii(this.state.emails[index])}</td>
            </tr>
        )
    });

    return (
      <div className="App">
        <div className="App-header">Super Cool Ethereum MicroPayment App
        </div>
        <div className="App-Content">
          <table>
            <thead>
              <tr>
                <th>Paid Up</th>
              </tr>
            </thead>
            <tbody>
                {TableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
