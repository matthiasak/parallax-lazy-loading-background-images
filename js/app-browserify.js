require("es5-shim")
require("babel/polyfill")
import React, {Component} from 'react'
import {Promise} from 'es6-promise'

let qs = (s, el) => (el || document).querySelector(s)

class App extends Component {
    constructor(...p){
        super(...p)
        this.state = {
            parallax: [
                {title: 'Winter', url: 'https://unsplash.imgix.net/28/tree-sky.jpg?dpr=2&fit=crop&fm=jpg&h=1100&q=75&w=725'},
                {title: 'Summer', url: 'https://ununsplash.imgix.net/reserve/tdedkQnQGCgIhk9eoEkP_DSC_0983.JPG?dpr=2&fit=crop&fm=jpg&h=500&q=75&w=725'},
                {title: 'Autumn', url: 'https://unsplash.imgix.net/32/L3APwvISQ7i8XcFsQYwQ_IMG_1820.jpg?dpr=2&fit=crop&fm=jpg&h=500&q=75&w=725'},
                {title: 'Spring', url: 'https://unsplash.imgix.net/reserve/vNE8214NS9GOvXOy7DCu_DSC_0266.JPG?dpr=2&fit=crop&fm=jpg&h=500&q=75&w=725'}
            ]
        }
    }
    render(){
        return (<div>
            {this.state.parallax.map(({title, url}) => <ParallaxComponent background={<Image src={url} />}> <h1>{title}</h1> </ParallaxComponent> )}
        </div>)
    }
}

let clamp = (x, low, high) => Math.min(Math.max(x, low), high)
function debounce(func, wait) {
    var timeout
    return function() {
        var context = this, args = arguments
        var later = function() {
            timeout = null
            func.apply(context, args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

class Image extends Component {
    constructor(...p){
        super(p)
        this.state = {
            opacity: 0,
            backgroundImage: ''
        }
        this.fadeIn = () => this.setState({
            opacity: 1,
            backgroundImage: 'url('+this.props.src+')'
        })
    }
    componentDidMount(){
        var img = this.img = document.createElement('img')
        img.src = this.props.src
        img.addEventListener('load', this.fadeIn)
    }
    componentDidUnmount(){
        this.img.removeEventListener('load', this.fadeIn)
    }
    render(){
        return (<div className='bgImageContainer' src={this.props.src} style={{opacity: this.state.opacity, backgroundImage: this.state.backgroundImage}} />)
    }
}

class ParallaxComponent extends Component {
    constructor(...p){
        super(...p)

        this.state = {
            style: {
                transform: ''
            }
        }

        this._calcPosition = () => {
            let {scrollY} = window,
                el = React.findDOMNode(this),
                {offsetTop, offsetHeight} = el,
                d = (scrollY - offsetTop) * .75 / offsetHeight,
                t = `translateY(${clamp( (d*100).toFixed(0), (-.25*offsetHeight).toFixed(0), (.75*offsetHeight).toFixed(0) )}px) translateZ(0)`

            this.setState({
                style: {
                    transform: t
                }
            })
        }
    }
    componentDidMount(){
        window.addEventListener('scroll', this._calcPosition)
    }
    componentDidUnmount(){
        window.removeEventListener('scroll', this._calcPosition)
    }
    render(){
        return (
            <div className="parallax">
                <div style={this.state.style} className="parallax-back">
                    {this.props.background}
                </div>
                <div className="parallax-base">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

window.onload = () => {
    React.render(<App />, qs('.container'))
}