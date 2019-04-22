import { Component, Prop, State, Method } from "@stencil/core";

@Component({
  tag: "sb3-side-drawer",
  styleUrl: "./side-drawer.css",
  shadow: true
})
export class SideDrawer {
  @State() showContanctInfo: boolean = false;
  @Prop({ reflectToAttr: true }) title: string;
  @Prop({ reflectToAttr: true, mutable: true }) opened: boolean;

  onCloseDrawer() {
    this.opened = false;
  }
  onContentChange(content: string) {
    console.log(content);
    this.showContanctInfo = content === "contact";
  }

  @Method()
  open() {
    this.opened = true;
  }

  render() {
    // let content = null;
    // if(this.opened){
    //     content = (
    //         <aside>
    //           <header>
    //             <h1>{this.title}</h1>
    //           </header>
    //           <main>
    //             <slot />
    //           </main>
    //         </aside>
    //       );
    // }
    // return content;
    let mainContent = <slot />;
    if (this.showContanctInfo) {
      mainContent = (
        <div id="contact-information">
          <h2>Contact Information</h2>
          <p>You can reach us via phone or email</p>
          <ul>
            <li>Phone : +91-8744096752</li>
            <li>
              Email :
              <a href="mailto:sagar13912@gmail.com">sagar13912@gmail.com</a>
            </li>
          </ul>
        </div>
      );
    }

    return [
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)} />,
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <section id="tabs">
          <button
            class={!this.showContanctInfo ? "active" : ""}
            onClick={this.onContentChange.bind(this, "nav")}
          >
            Navigation
          </button>
          <button
            class={this.showContanctInfo ? "active" : ""}
            onClick={this.onContentChange.bind(this, "contact")}
          >
            Contact
          </button>
        </section>
        <main>{mainContent}</main>
      </aside>
    ];
  }
}
