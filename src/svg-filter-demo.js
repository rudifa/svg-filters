
/**
 * https://stackoverflow.com/questions/20671502/can-i-blend-gradients-in-svg
 * 
 * I would like to fill an SVG shape with two gradients, where one is at a 45 degree angle to the other.
 * Is there a way to blend (multiply) these gradients? 
 * answered Dec 19 '13 at 1:04 by Michael Mullany
 * You can do this with an SVG filter, and do multiply, screen, lighten or darken blending. 
 * (Although it will only work completely correctly in Chrome/Safari because they support 
 * both object imports into filters with feImage, and correct sizing of feImage imports - 
 * if you want this to work in Firefox as well, then use an inline data URI as input for 
 * feImage rather than an object reference) Below is an example using multiply blending.
*/

// LitElement and html are the basic required imports
import { LitElement, html, css} from 'lit-element';

class FilterBlend1 extends LitElement {
  render() {
    return html`
      <div>
        <svg width="100%" height="100%" viewbox="0 0 600 600">
            <defs>
                <linearGradient id="wave" x1="0%" x2="100%" y1="0%" y2="0%" 
                    spreadMethod="pad">
                    <stop offset="0%"   stop-color="gray" />
                    <stop offset="25%"  stop-color="black"/>
                    <stop offset="65%"  stop-color="white"/>
                    <stop offset="100%" stop-color="gray" />
                </linearGradient>
                <linearGradient id="red-yellow" x1="0%" x2="100%" y1="0%" y2="100%" 
                    spreadMethod="pad" gradientTransform="rotate(7)">
                    <stop offset="0%"   stop-color="gold" />
                    <stop offset="30%"  stop-color="gold"/>
                    <stop offset="50%"  stop-color="red"/>
                    <stop offset="100%" stop-color="red" />
                </linearGradient>
                <rect id="wave-rect" x="0" y="0" width="400" height="400" fill="url(#wave)"/>
                <rect id="ry-rect" x="0" y="0" width="400" height="400" fill="url(#red-yellow)"/>
                <filter id="blend-it" x="0%" y="0%" width="100%" height="100%">
                    <feImage xlink:href="#wave-rect" result="myWave" x="100" y="100"/>
                    <feImage xlink:href="#ry-rect" result="myRY"  x="100" y="100"/>
                    <feBlend in="myWave" in2="myRY" mode="multiply" result="blendedGrad"/>
                    <feComposite in="blendedGrad" in2="SourceGraphic" operator="in"/>
                </filter>
            </defs>
            <circle filter="url(#blend-it)" cx="300" cy="300" r="200"/>

        </svg>
      </div>
    `;
  }
}

customElements.define('filter-blend1', FilterBlend1);
