
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
        <svg width="100%" height="100%" viewbox="0 0 1500 1500">
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
                <rect id="wave-rect" x="0" y="0" width="1000" height="1000" fill="url(#wave)"/>
                <rect id="ry-rect" x="0" y="0" width="1000" height="1000" fill="url(#red-yellow)"/>
                <filter id="blend-it" x="0%" y="0%" width="100%" height="100%">
                    <feImage xlink:href="#wave-rect" result="myWave" x="250" y="250"/>
                    <feImage xlink:href="#ry-rect" result="myRY"  x="250" y="250"/>
                    <feBlend in="myWave" in2="myRY" mode="multiply" result="blendedGrad"/>
                    <feComposite in="blendedGrad" in2="SourceGraphic" operator="in"/>
                </filter>
            </defs>
            <circle filter="url(#blend-it)" cx="750" cy="750" r="500"/>
            <rect x="250" y="250" width="1000" height="1000" style="fill: none; stroke: black"></rect>

            <path id="triangle120" />
        </svg>
      </div>
    `;
  }
}

class FilterPenta extends LitElement {

  render() {
    return html`
    <div>
    <svg width="100%" height="100%" viewbox="0 0 1500 1500"> 
        <g transform="translate(750,750) rotate(30)">
          <circle r="500" style="fill:none;stroke:black"/>
          <g transform="rotate(0)">
          <path d="M0 0 l 250 -433 250 144.3 0 577.3 -250 144.3 Z" style="fill:none;stroke:red" />
          </g>
          <g transform="rotate(120)">
          <path d="M0 0 l 250 -433 250 144.3 0 577.3 -250 144.3 Z" style="fill:none;stroke:green" />
          </g>
          <g transform="rotate(240)">
          <path d="M0 0 l 250 -433 250 144.3 0 577.3 -250 144.3 Z" style="fill:none;stroke:blue" />
          </g>  
        </g>  
      </svg>
    </div>
    `;
  }
}


class FilterRadgrad extends LitElement {

  render() {
    return html`
    <div>
      <svg width="100%" height="100%" viewbox="0 0 1500 1500">
        <defs>
          <radialGradient id = "g0" cx = "50%" cy = "50%" r = "50%" fx = "0%" fy = "50%">
            <stop stop-color = "black" offset = "0%"/>
            <stop stop-color = "red" offset = "70%"/>
            <stop stop-color = "white" offset = "100%"/>
          </radialGradient>
          <radialGradient id = "g1" cx = "50%" cy = "50%" r = "50%" fx = "0%" fy = "50%">
            <stop stop-color = "black" offset = "0%"/>
            <stop stop-color = "green" offset = "70%"/>
            <stop stop-color = "white" offset = "100%"/>
          </radialGradient>
          <radialGradient id = "g2" cx = "50%" cy = "50%" r = "50%" fx = "0%" fy = "50%">
            <stop stop-color = "black" offset = "0%"/>
            <stop stop-color = "blue" offset = "50%"/>
            <stop stop-color = "white" offset = "100%"/>
          </radialGradient>
        </defs>

        <g transform="translate(750,750) rotate(30)">
          <circle r="500" style="fill:none;stroke:black"/>
          <g transform="rotate(0)">
          <path d="M0 0 l 250 -433 250 144.3 0 577.3 -250 144.3 Z" style="stroke:red" fill="url(#g0)"/>
          </g>
          <g transform="rotate(120)">
          <path d="M0 0 l 250 -433 250 144.3 0 577.3 -250 144.3 Z" style="stroke:green" fill="url(#g1)"/>
          </g>
          <g transform="rotate(240)">
          <path d="M0 0 l 250 -433 250 144.3 0 577.3 -250 144.3 Z" style="stroke:blue" fill="url(#g2)"/>
          </g>  
        </g>  
      </svg>
    </div>
    `;
  }
}


class FilterLingrad extends LitElement {

  render() {
    return html`
    <div>
      <svg width="100%" height="100%" viewbox="0 0 1500 1500">
        <defs>
          <linearGradient id="lg0" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgb(0,0,0);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
        </linearGradient>
        <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgb(0,0,0);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(0,255,0);stop-opacity:1" />
        </linearGradient>
        <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgb(0,0,0);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
        </linearGradient>
        <mask id="imask">
          <circle id="outer" cx="0" cy="0" r="500" fill="white"/>
        </mask>

        </defs>
        <g transform="translate(750,750) rotate(30)"  mask="url(#imask)">
          <circle r="500" style="fill:none;stroke:black"/>
          <g transform="rotate(0)">
          <path d="M0 0 l 250 -433 250 144.3 0 577.3 -250 144.3 Z" style="stroke:red" fill="url(#lg0)"/>
          </g>
          <g transform="rotate(120)">
          <path d="M0 0 l 250 -433 250 144.3 0 577.3 -250 144.3 Z" style="stroke:green" fill="url(#lg1)"/>
          </g>
          <g transform="rotate(240)">
          <path d="M0 0 l 250 -433 250 144.3 0 577.3 -250 144.3 Z" style="stroke:blue" fill="url(#lg2)"/>
          </g>  
        </g>  
      </svg>
    </div>
    `;
  }
}

customElements.define('filter-blend1', FilterBlend1);
customElements.define('filter-penta', FilterPenta);
customElements.define('filter-radgrad', FilterRadgrad);
customElements.define('filter-lingrad', FilterLingrad);

// returns array of [x,y] absolute coordinates for a pentagon
function pentagonCoords(r = 1.0) {
  let rpd = Math.PI / 180
  let c = Math.cos(60*rpd)
  let s = Math.sin(60*rpd)
  let out = []
    out.push([0,0])
    out.push([c,-s])
    out.push([1,-(2*s - 1/s)])   
    out.push([1,(2*s - 1/s)])     
    out.push([c,s])   
    out.push([0,0])
  return out.map(x => x.map(y => r*y))
}

// returns array of [x,y] successive differences
function diff(A) {return A.slice(1).map((n, i) => [ n[0] - A[i][0], n[1] - A[i][1] ] )};

/**
 * > pc500 = pentagonCoords(500)
[
  [ 0, 0 ],
  [ 250.00000000000006, -433.0127018922193 ],
  [ 500, -288.67513459481273 ],
  [ 500, 288.67513459481273 ],
  [ 250.00000000000006, 433.0127018922193 ],
  [ 0, 0 ]
]
> diff(pc500)
[
  [ 250.00000000000006, -433.0127018922193 ],
  [ 249.99999999999994, 144.33756729740657 ],
  [ 0, 577.3502691896255 ],
  [ -249.99999999999994, 144.33756729740657 ],
  [ -250.00000000000006, -433.0127018922193 ]
]
> 

 */