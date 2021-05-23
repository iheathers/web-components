class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tootTipContentContainer;
    this._toolTipText = 'Default text';
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        div {
          background: blue;
        }
      </style>
      <slot>Default slot value</slot>
      <span> (?) </span>
    `;
  }

  connectedCallback() {
    // console.log('Connected Callback Method called.');
    // console.dir(this);
    if (this.hasAttribute('tooltip-text')) {
      this._toolTipText = this.getAttribute('tooltip-text');
    }

    const tooltipIcon = this.shadowRoot.querySelector('span');
    tooltipIcon.addEventListener('mouseover', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
  }

  _showTooltip() {
    // console.log('showTooptip() called');

    this._tootTipContentContainer = document.createElement('div');
    this._tootTipContentContainer.textContent = this._toolTipText;
    this.shadowRoot.appendChild(this._tootTipContentContainer);
  }

  _hideTooltip() {
    // console.log('hideTooltip called');

    this.shadowRoot.removeChild(this._tootTipContentContainer);
  }
}

customElements.define('tb-tooltip', Tooltip);
