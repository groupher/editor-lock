/**
 * Build styles
 */
import "./index.css";

/**
 * Lock Tool for the Editor.js
 *
 * Allows to wrap inline fragment and style it somehow.
 */
export default class Lock {
  /**
   * Class name for term-tag
   *
   * @type {string}
   */
  static get CSS() {
    return "cdx-lock";
  }

  /**
   * @param {{api: object}}  - Editor.js API
   */
  constructor({ api }) {
    this.api = api;

    /**
     * Toolbar Button
     *
     * @type {HTMLElement|null}
     */
    this.button = null;

    /**
     * Tag represented the term
     *
     * @type {string}
     */
    this.tag = "ADDR";

    /**
     * CSS classes
     */
    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive,
    };
  }

  /**
   * Specifies Tool as Inline Toolbar Tool
   *
   * @return {boolean}
   */
  static get isInline() {
    return true;
  }

  /**
   * Get Tool icon's title
   * @return {string}
   */
  static get title() {
    return "防剧透";
  }

  /**
   * Get Tool icon's SVG
   * @return {string}
   */
  get toolboxIcon() {
    return '<svg t="1610937191745" width="16" height="16" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5410" width="200" height="200"><path d="M756.184615 317.046154l39.384616-39.384616c13.784615-13.784615 13.784615-35.446154 0-49.230769s-35.446154-13.784615-49.230769 0l-53.169231 53.169231c-57.107692-27.569231-118.153846-41.353846-183.138462-41.353846-165.415385 0-309.169231 96.492308-393.846154 244.184615-9.846154 17.723077-9.846154 39.384615 0 57.107693 39.384615 66.953846 90.584615 124.061538 151.63077 167.384615l-39.384616 39.384615c-13.784615 13.784615-13.784615 35.446154 0 49.23077s35.446154 13.784615 49.230769 0l53.169231-53.169231c57.107692 27.569231 118.153846 41.353846 183.138462 41.353846 165.415385 0 309.169231-96.492308 393.846154-244.184615 9.846154-17.723077 9.846154-39.384615 0-57.107693-41.353846-68.923077-92.553846-126.030769-151.63077-167.384615z m-437.16923 340.676923c-55.138462-35.446154-102.4-84.676923-137.846154-145.723077 74.830769-128 200.861538-204.8 332.8-204.8 45.292308 0 88.615385 9.846154 129.969231 25.6l-49.23077 49.230769c-23.630769-15.753846-51.2-23.630769-80.738461-23.630769-84.676923 0-153.6 68.923077-153.6 153.6 0 29.538462 9.846154 57.107692 23.630769 80.738462l-64.984615 64.984615z m271.753846-177.230769c3.938462 9.846154 5.907692 19.692308 5.907692 31.507692 0 47.261538-37.415385 84.676923-84.676923 84.676923-9.846154 0-21.661538-1.969231-31.507692-5.907692l110.276923-110.276923z m-157.538462 63.015384c-3.938462-9.846154-5.907692-19.692308-5.907692-31.507692 0-47.261538 37.415385-84.676923 84.676923-84.676923 11.815385 0 21.661538 1.969231 31.507692 5.907692l-110.276923 110.276923z m78.769231 173.292308c-45.292308 0-88.615385-9.846154-129.969231-25.6l49.230769-49.230769c23.630769 15.753846 51.2 23.630769 80.738462 23.630769 84.676923 0 153.6-68.923077 153.6-153.6 0-29.538462-9.846154-57.107692-23.630769-80.738462l63.015384-63.015384c55.138462 35.446154 102.4 84.676923 137.846154 145.723077-74.830769 124.061538-198.892308 202.830769-330.830769 202.830769z" p-id="5411"></path></svg>';
  }

  /**
   * Create button element for Toolbar
   *
   * @return {HTMLElement}
   */
  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.classList.add(this.iconClasses.base);
    this.button.innerHTML = this.toolboxIcon;

    return this.button;
  }

  /**
   * Wrap/Unwrap selected fragment
   *
   * @param {Range} range - selected fragment
   */
  surround(range) {
    if (!range) {
      return;
    }

    let termWrapper = this.api.selection.findParentTag(this.tag, Lock.CSS);

    /**
     * If start or end of selection is in the highlighted block
     */
    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  /**
   * Wrap selection with term-tag
   *
   * @param {Range} range - selected fragment
   */
  wrap(range) {
    /**
     * Create a wrapper for highlighting
     */
    let lock = document.createElement(this.tag);

    lock.classList.add(Lock.CSS);

    /**
     * SurroundContent throws an error if the Range splits a non-Text node with only one of its boundary points
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Range/surroundContents}
     *
     * // range.surroundContents(span);
     */
    lock.appendChild(range.extractContents());

    // encode with Base64
    lock.innerText = btoa(lock.innerText);
    range.insertNode(lock);

    /**
     * Expand (add) selection to highlighted block
     */
    this.api.selection.expandToTag(lock);
  }

  /**
   * Unwrap term-tag
   *
   * @param {HTMLElement} termWrapper - term wrapper tag
   */
  unwrap(termWrapper) {
    /**
     * Expand selection to all term-tag
     */
    this.api.selection.expandToTag(termWrapper);

    let sel = window.getSelection();
    let range = sel.getRangeAt(0);

    let unwrappedContent = range.extractContents();

    /**
     * Remove empty term-tag
     */
    termWrapper.parentNode.removeChild(termWrapper);

    /**
     * Insert extracted and decoded base64 content
     */
    unwrappedContent.textContent = atob(unwrappedContent.textContent);
    range.insertNode(unwrappedContent);

    /**
     * Restore selection
     */
    sel.removeAllRanges();
    sel.addRange(range);
  }

  /**
   * Check and change Term's state for current selection
   */
  checkState() {
    const termTag = this.api.selection.findParentTag(this.tag, Lock.CSS);

    this.button.classList.toggle(this.iconClasses.active, !!termTag);
  }

  /**
   * Sanitizer rule
   * @return {span: {class: string}}}
   */
  static get sanitize() {
    return {
      addr: {
        class: Lock.CSS,
      },
    };
  }
}
