/**
 * Copyright 2025 eman1230
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/rpg-character/rpg-character.js';


/**
 * `project-1`
 * 
 * @demo index.html
 * @element project-1
 */
export class Project1 extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "project-1";
  }

  constructor() {
    super();
    this.items = []
    this.org=''
    this.repo=''
    this.title = "";
    this.limit = 25;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/project-1.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      items: { type: Array},
      org: {type: String},
      repo: {type: String},
      limit: {type: Number}
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--project-1-label-font-size, var(--ddd-font-size-s));
      }
      .rpg-wrapper {
        display: inline-flex;
      }
    `];
  }

  updated(changedProperties){
    super.updated(changedProperties);
    if (changedProperties.has('org') || changedProperties.has('repo')){
      this.getData();
    }
  }
getData() {
  const url = `https://api.github.com/repos/${this.org}/${this.repo}/contributors`;
  try {
    fetch(url).then(d => d.ok ? d.json(): {}).then(data => {
      if (data) {
        this.items = [];
        this.items = data;
      }});
  } catch (error) {
    console.error("HI");
  }}

  render() {
    return html`
  <div class="wrapper">
    <h3>GitHub Repo: <a href="https://github.com/${this.org}/${this.repo}">${this.org}/${this.repo}</a></h3>
    <slot></slot>
    ${this.items.filter((item, index) => index < this.limit).map((item) => 
        html`
        <div class="rpg-wrapper">
        <rpg-character  seed="${item.login}"></rpg-character>
        <div class="contdetails">
        ${item.login}
        Contributions: ${item.contributions}
        </div>
        </div>
        `)}
  </div>`;
  }
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(Project1.tag, Project1);