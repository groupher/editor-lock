/**
 * Build styles
 */
import './index.css'

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
    return "Base64 编/解码";
  }

  /**
   * Get Tool icon's SVG
   * @return {string}
   */
  get toolboxIcon() {
    return '<svg width="16" height="16" t="1577325952338" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7776" width="200" height="200"><path d="M788.8 444.8v-104c0-150.4-120-273.6-268.8-276.8-156.8-3.2-284.8 128-284.8 283.2v96H160c-17.6 0-32 14.4-32 32V928c0 17.6 14.4 32 32 32h704c17.6 0 32-14.4 32-32V476.8c0-17.6-14.4-32-32-32h-75.2z m-489.6-104C299.2 224 395.2 128 512 128s212.8 96 212.8 212.8v104H299.2v-104z m536 558.4H188.8V505.6h644.8v393.6h1.6z" p-id="7777"></path><path d="M521.6 806.4c28.8-4.8 51.2-28.8 51.2-57.6 0-22.4-11.2-43.2-28.8-52.8v-48c0-17.6-14.4-32-32-32s-32 14.4-32 32v48c-17.6 11.2-28.8 30.4-28.8 51.2 0 35.2 32 64 70.4 59.2z" p-id="7778"></path></svg>';
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
