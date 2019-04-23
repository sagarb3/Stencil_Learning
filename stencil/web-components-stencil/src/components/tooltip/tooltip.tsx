import { Component, Prop, State } from "@stencil/core";

@Component({
  tag: "sb3-tooltip",
  styleUrl: "./tooltip.css",
  shadow: true
})
export class Tooltip {
  @Prop({
    reflectToAttr: true
  })
  tooltipContent: string;
  @State() showContent = false;

  toggleClick() {
    this.showContent = !this.showContent;
  }
  render() {
    let main = null;
    if (this.showContent) {
      main = <div id="txt">{this.tooltipContent}</div>;
    }
    return [
      <slot />,
      <span class="icon" onClick={this.toggleClick.bind(this)}>
        (?)
      </span>,
      main
    ];
  }
}
