import { Component, State, Element, Prop, Watch } from "@stencil/core";
import { API_KEY } from "../../global/global";
@Component({
  tag: "sb3-stock-price",
  styleUrl: "./stock-price.css",
  shadow: true
})
export class StockPrice {
  @State() fetchPrice: number;
  //intialStockSymbol: string;
  stockInput: HTMLInputElement;
  @State() stockUserInput: string;
  @State() stockUserInputValid = false;
  @Element() el: HTMLElement;
  @State() error: string;
  @Prop({ mutable: true, reflectToAttr: true }) stockSymbol: string;

  @Watch("stockSymbol")
  stockSymobolChanged(newValue, oldValue) {
    if (newValue != oldValue) {
      this.fetchStockPrice(newValue);
      this.stockUserInput = newValue;
    }
  }

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    if (this.stockUserInput.trim() !== "") {
      this.stockUserInputValid = true;
    } else {
      this.stockUserInputValid = false;
    }
  }
  onFetchStockPrice(event) {
    event.preventDefault();
    this.stockSymbol = this.stockInput.value;
    //this.fetchStockPrice(this.stockSymbol);
    //console.log("submitted");
  }

  componentWillLoad() {}

  componentWillUpdate() {}
  componentDidUpdate() {
    // if (this.stockSymbol! == this.intialStockSymbol) {
    //   this.intialStockSymbol = this.stockSymbol;
    //   this.fetchStockPrice(this.intialStockSymbol);
    // }
  }

  componentDidUnload() {}
  componentDidLoad() {
    if (this.stockSymbol) {
      //this.intialStockSymbol = this.stockSymbol;
      this.stockUserInput = this.stockSymbol;
      this.stockUserInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  fetchStockPrice(stockSymbol) {
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`
    )
      .then(res => {
        if (res.status !== 200) {
          throw new Error("Invalid!.");
        }
        return res.json();
      })
      .then(parsedResponse => {
        //console.log(parsedResponse["Global Quote"]["05. price"]);
        if (!parsedResponse["Global Quote"]["05. price"]) {
          throw new Error("Invalid Symbol");
        }
        this.error = null;
        this.fetchPrice = Number(parsedResponse["Global Quote"]["05. price"]);
      })
      .catch(err => {
        console.log(err);
        this.error = err.message;
      });
  }

  render() {
    let dataContent = <p>Please enter a symbol</p>;
    if (this.error) {
      dataContent = <p>{this.error}</p>;
    } else {
      if (this.fetchPrice) {
        dataContent = <p>Price $ {this.fetchPrice}</p>;
      }
    }

    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input
          id="stock-symbol"
          type="text"
          ref={el => (this.stockInput = el)}
          value={this.stockUserInput}
          onInput={this.onUserInput.bind(this)}
        />
        <button type="submit" disabled={!this.stockUserInputValid}>
          Fetch
        </button>
      </form>,
      <div>{dataContent}</div>
    ];
  }
}
