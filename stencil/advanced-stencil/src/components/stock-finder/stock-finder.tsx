import { Component, State, Event, EventEmitter } from "@stencil/core";
import { API_KEY } from "../../global/global";
@Component({
  tag: "sb3-stock-finder",
  styleUrl: "./stock-finder.css",
  shadow: true
})
export class StockFinder {
  stockNameInput: HTMLInputElement;
  @State() searchResults: { symbol: string; name: string }[] = [];
  @State() loading = false;
  @Event({
    bubbles: true,
    composed: true
  })
  sb3SymbolSelected: EventEmitter<string>;
  onFindStock(event: Event) {
    event.preventDefault();
    this.loading = true;
    const stockName = this.stockNameInput.value;
    fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${API_KEY}`
    )
      .then(res => {
        if (res.status !== 200) {
          throw new Error("Invalid input");
        }
        return res.json();
      })
      .then(parseResponse => {
        this.searchResults = parseResponse["bestMatches"].map(match => {
          return {
            name: match["2. name"],
            symbol: match["1. symbol"]
          };
        });
        //console.log(this.searchResults);
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
        this.loading = false;
      });
  }
  onSelectSymbol(symbol: string) {
    this.sb3SymbolSelected.emit(symbol);
  }
  render() {
    let content = null;

    if (this.loading) {
      content = <sb3-spinner />;
    }
    return [
      <form onSubmit={this.onFindStock.bind(this)}>
        <input
          id="stock-symbol"
          type="text"
          ref={el => (this.stockNameInput = el)}
        />
        <button type="submit">Find</button>
      </form>,
      <ul>
        {this.searchResults.map(result => (
          <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>
            <strong>{result.symbol}</strong>-{result.name}
          </li>
        ))}
      </ul>,
      content
    ];
  }
}
