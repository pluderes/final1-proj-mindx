import { styleInLine } from "./style.js";

class basic2 extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    this.props = {
      avatar: "",
      href: "",
      name: "",
      age: "",
      time: "",
      like: "",
      id: "",
    };
  }

  connectedCallback() {
    //mounting
    let arg = this.props.name;
    arg = arg.replace(/\s/g, "-");

    const inner = `
        ${styleInLine}
        <div class="card">
                <div class="image pull-left col-5 m-0 pl-0">
                  <img
                    src="${this.props.avatar}"
                    alt=""
                  />
                </div>
                <div class="content pull-left col-7">
                  <div>
                    <h6 class="title">
                      <a href="movie-intro.html?fn=${arg}">${this.props.name}</a>
                    </h6>
                    <div class="desc_movie d-flex align-items-center my-2">
                      <div class="badge badge-secondary mr-2">${this.props.age}+</div>
                      <span class="text-white" style="font-weight: bold"
                        >${this.props.time} min</span
                      >
                    </div>
                  </div>
                  <div class="Btn row m-0">
                    <span class="btnPlay btn-hover p-1"
                      ><i class="fa fa-play mr-1" aria-hidden="true"></i> Play
                      Now</span
                    >
                    <span class="btnUnfollow btn-hover p-1"
                      ><i class="fa fa-close mr-1" aria-hidden="true"></i>
                      UnFollow</span
                    >
                  </div>
                </div>
              </div>
    `;
    this.shadow.innerHTML += inner;

    let playButton = this.shadow.querySelector(`.btnPlay`);
    let unFollowButton = this.shadow.querySelector(`.btnUnfollow`);

    playButton.onclick = () => {
      let dirURL = "movie-watch.html" + `?fn=${arg}`;
      // window.location.replace(dirURL);
      window.location.href = dirURL;
    };

    unFollowButton.onclick = () => {

    }
  }

  static get observedAttributes() {
    return ["avatar", "href", "name", "age", "time", "like", "id"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue) {
      this.props[name] = newValue;
    }
    // console.log(this.props);
  }

  disconnectedCallback() {
    // console.log("Unmouting");
  }
}

customElements.define("basic2-para", basic2);
