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
    return '<svg t="1611557270721" width="17" height="17" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27836" width="200" height="200"><path d="M256 554.666667c-23.466667 0-42.666667 19.2-42.666667 42.666666s19.2 42.666667 42.666667 42.666667 42.666667-19.2 42.666667-42.666667-19.2-42.666667-42.666667-42.666666z m0 170.666666c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666667 42.666667-19.2 42.666667-42.666667-19.2-42.666667-42.666667-42.666667z m0-341.333333c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666666 42.666667-19.2 42.666667-42.666666-19.2-42.666667-42.666667-42.666667z m-128 21.333333c-11.946667 0-21.333333 9.386667-21.333333 21.333334s9.386667 21.333333 21.333333 21.333333 21.333333-9.386667 21.333333-21.333333-9.386667-21.333333-21.333333-21.333334zM256 213.333333c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666667 42.666667-19.2 42.666667-42.666667-19.2-42.666667-42.666667-42.666667z m640 234.666667c11.946667 0 21.333333-9.386667 21.333333-21.333333s-9.386667-21.333333-21.333333-21.333334-21.333333 9.386667-21.333333 21.333334 9.386667 21.333333 21.333333 21.333333zM597.333333 298.666667c23.466667 0 42.666667-19.2 42.666667-42.666667s-19.2-42.666667-42.666667-42.666667-42.666667 19.2-42.666666 42.666667 19.2 42.666667 42.666666 42.666667z m0-149.333334c11.946667 0 21.333333-9.386667 21.333334-21.333333s-9.386667-21.333333-21.333334-21.333333-21.333333 9.386667-21.333333 21.333333 9.386667 21.333333 21.333333 21.333333z m-469.333333 426.666667c-11.946667 0-21.333333 9.386667-21.333333 21.333333s9.386667 21.333333 21.333333 21.333334 21.333333-9.386667 21.333333-21.333334-9.386667-21.333333-21.333333-21.333333z m298.666667 298.666667c-11.946667 0-21.333333 9.386667-21.333334 21.333333s9.386667 21.333333 21.333334 21.333333 21.333333-9.386667 21.333333-21.333333-9.386667-21.333333-21.333333-21.333333z m0-725.333334c11.946667 0 21.333333-9.386667 21.333333-21.333333s-9.386667-21.333333-21.333333-21.333333-21.333333 9.386667-21.333334 21.333333 9.386667 21.333333 21.333334 21.333333zM426.666667 298.666667c23.466667 0 42.666667-19.2 42.666666-42.666667s-19.2-42.666667-42.666666-42.666667-42.666667 19.2-42.666667 42.666667 19.2 42.666667 42.666667 42.666667z m0 234.666666c-35.413333 0-64 28.586667-64 64s28.586667 64 64 64 64-28.586667 64-64-28.586667-64-64-64z m341.333333 21.333334c-23.466667 0-42.666667 19.2-42.666667 42.666666s19.2 42.666667 42.666667 42.666667 42.666667-19.2 42.666667-42.666667-19.2-42.666667-42.666667-42.666666z m0 170.666666c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666667 42.666667-19.2 42.666667-42.666667-19.2-42.666667-42.666667-42.666667z m0-341.333333c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666666 42.666667-19.2 42.666667-42.666666-19.2-42.666667-42.666667-42.666667z m0-170.666667c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666667 42.666667-19.2 42.666667-42.666667-19.2-42.666667-42.666667-42.666667z m128 362.666667c-11.946667 0-21.333333 9.386667-21.333333 21.333333s9.386667 21.333333 21.333333 21.333334 21.333333-9.386667 21.333333-21.333334-9.386667-21.333333-21.333333-21.333333zM597.333333 725.333333c-23.466667 0-42.666667 19.2-42.666666 42.666667s19.2 42.666667 42.666666 42.666667 42.666667-19.2 42.666667-42.666667-19.2-42.666667-42.666667-42.666667z m0 149.333334c-11.946667 0-21.333333 9.386667-21.333333 21.333333s9.386667 21.333333 21.333333 21.333333 21.333333-9.386667 21.333334-21.333333-9.386667-21.333333-21.333334-21.333333z m-170.666666-512c-35.413333 0-64 28.586667-64 64s28.586667 64 64 64 64-28.586667 64-64-28.586667-64-64-64z m0 362.666666c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666667 42.666667-19.2 42.666666-42.666667-19.2-42.666667-42.666666-42.666667z m170.666666-192c-35.413333 0-64 28.586667-64 64s28.586667 64 64 64 64-28.586667 64-64-28.586667-64-64-64z m0-170.666666c-35.413333 0-64 28.586667-64 64s28.586667 64 64 64 64-28.586667 64-64-28.586667-64-64-64z" p-id="27837"></path></svg>';
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
