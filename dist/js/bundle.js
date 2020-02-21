(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * SmartDomElement_ base class foo
 * @param propsOpt {object} props [optional]
 */
class SmartDomElement_{
    /**
     * propsOpt when defined is a dictionary with optional members:
     * <table class="classtable">
     * <tr><td>tag</td><td>HTML tag name [ default : "div" ]</td>
     * <tr><td>id</td><td>element id</td>
     * </table>
     */
    constructor(propsOpt){
        let props = propsOpt || {}

        let tag = props.tag || "div"

        this.id = props.id

        this.childs = []

        this.e = document.createElement(tag)
    }

    a(...childs){
        let childList = []

        for(let child of childs){
            if(child instanceof Array) childList = childList.concat(child)
            else childList.push(child)
        }

        let index = 0

        for(let child of childList){
            child.parent = this
            child.index = index++
            this.childs.push(child)
            this.e.appendChild(child.e)
        }        

        return this
    }

    addStyle(name, value){
        this.e.style[name] = value
        return this
    }

    w(x)        {return this.addStyle("width", x + "px")}
    h(x)        {return this.addStyle("height", x + "px")}    
    pad(x)      {return this.addStyle("padding", x + "px")}
    c(x)        {return this.addStyle("color", x)}
    bc(x)       {return this.addStyle("backgroundColor", x)}
    html(x)     {this.e.innerHTML = x;return this}
}

/**
 * Div
 */
class div_ extends SmartDomElement_{
    constructor(props){
        super(props)
    }
}
/**
 * returns a div_
 * @param props {object} props <opt-param />
 * @example
 * // creates a div with content "I'm a div."
 * div().html("I'm a div.")
 */
function div(props){return new div_(props)}

module.exports = {
    div: div
}

},{}],2:[function(require,module,exports){
const { div } = require('@aestheticbookshelf/smartdom')

let app = div()
    .w(200).h(200).pad(20).bc("#0f0")
    .html("Minimal App")

document.querySelector("#root").appendChild(app.e)

},{"@aestheticbookshelf/smartdom":1}]},{},[2]);
