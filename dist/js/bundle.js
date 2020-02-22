(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

let alertElement = null
let alertTimeout = null

/**
 * alert<br> 
 * <props-opt></props-opt>     
 * <table class="classtable">     
 * <tr><td>msg</td><td>message [ default: "Alert!"]</td>     
 * <tr><td>delay</td><td>delay ms</td>     
 * <tr><td>kind</td><td>kind [ info / success / error ]</td>     
 * </table>
 * @param props {object} props <opt-param />
 */
function alert(propsOpt){
    let props = propsOpt || {}

    if(!alertElement) alertElement = div().poa().ac("alertelement")

    let de = document.documentElement

    de.style.position = "relative"

    de.appendChild(alertElement.e)

    alertElement.html(props.msg || "Alert!").dispi().rc("info success error")

    if(props.kind) alertElement.ac(props.kind)

    if(alertTimeout) clearTimeout(alertTimeout)
    alertTimeout = setTimeout(_ => {        
        alertElement.x().dispn()
    }, props.delay || 3000)
}

/**
 * get a value from localStorage
 * @param path {string} path 
 * @param defaultValue {any} default value ( returned if stored value is not available or non parsable )
 */
function getLocal(path, defaultValue){
    let stored = localStorage.getItem(path)
    if(stored){
        try{
            let value = JSON.parse(stored)
            return value
        }catch(err){}
    }
    return defaultValue
}

/**
 * store a value in localStorage
 * @param path {string} path 
 * @param value {any} value ( should be JSON serializable )
 * @returns true on success, false otherwise
 */
function storeLocal(path, value){
    try{
        localStorage.setItem(path, JSON.stringify(value))
        return true
    }catch(err){}  
    return false  
}

/**
 * translate option initializer
 * @param obj {*} dicionary / array / string
 */
function translateOption(obj){
    if(obj instanceof Array){
        return ({
            value: obj[0],
            display: obj[1]
        })
    }    
    if(typeof obj == "string"){
        return ({
            value: obj,
            display: obj
        })
    }
    return obj
}

/**
 * Classes
 */

/**
 * base class of smartdom wrapper
 * <props-opt></props-opt>
 * @param props {object} props <opt-param />
 */
class SmartDomElement_{
    constructor(props){        
        this.props = props || {}

        let tag = this.props.tag || "div"

        this.id = this.props.id

        this.childs = []

        this.e = document.createElement(tag)

        this.state = {}
    }

    /**
     * append childs
     * @param childs {...any} child elements, either single elements or arrays of elements
     * @example
     * div().a(
     *  div().html("Single div appended."),
     *  [
     *      div().html("Div appended as array element 0."),
     *      div().html("Div appended as array element 1."),
     *  ]
     * )
     */
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

    /**
     * add style and return the instance
     * @param name {string} style name 
     * @param value {string} style value 
     */
    addStyle(name, value){
        this.e.style[name] = value
        return this
    }

    /**
     * add classes
     * @param classes {string} space separated list of classes
     */
    ac(classes){
        for(let klass of classes.split(" ")) this.e.classList.add(klass)
        return this
    }

    /**
     * remove classes
     * @param classes {string} space separated list of classes
     */
    rc(classes){
        for(let klass of classes.split(" ")) this.e.classList.remove(klass)
        return this
    }

    /**
     * set HTML element attribute
     * @param name {string} name 
     * @param value {any} value 
     */
    setAttribute(name, value){
        this.e.setAttribute(name, value)
        return this
    }

    /**
     * get HTML element attribute
     * @param name {string} name 
     */
    getAttribute(name){
        return this.e.getAttribute(name)
    }

    /**
     * return element value
     */
    value(){
        return this.e.value
    }

    /**
     * set element value
     * @param value {any} value 
     */
    setValue(value){
        this.e.value = value
    }

    /**
     * add event listeners with a callback
     * @param events {string} events separated by space
     * @param callback {function} callback
     */
    ae(events, callback){
        for(let event of events.split(" ")){
            this.e.addEventListener(event, callback)
        }
    }

    /**
     * delete content of element
     */
    x()        {this.e.innerHTML="";return this}
    /**
     * set display
     * @param x {string} display
     */
    disp(x)    {return this.addStyle("display", x)}
    /**
     * display none     
     */
    dispn()    {return this.disp("none")}
    /**
     * display initial     
     */
    dispi()    {return this.disp("initial")}
    /**
     * set width
     * @param x {number} width in pixels
     */
    w(x)        {return this.addStyle("width", x + "px")}
    /**
     * set height
     * @param x {number} height in pixels
     */
    h(x)        {return this.addStyle("height", x + "px")}    
    /**
     * set padding
     * @param x {number} padding in pixels
     */
    pad(x)      {return this.addStyle("padding", x + "px")}
    /**
     * set color
     * @param x {string} color
     */
    c(x)        {return this.addStyle("color", x)}
    /**
     * set background-color
     * @param x {string} background color
     */
    bc(x)       {return this.addStyle("backgroundColor", x)}
    /**
     * set position
     * @param x {string} position
     */
    pos(x)       {return this.addStyle("position", x)}
    /**
     * position relative
     */
    por()        {return this.pos("relative")}
    /**
     * position absolute
     */
    poa()        {return this.pos("absolute")}
    /**
     * set inner html
     * @param x {string} HTML string
     */
    html(x)     {this.e.innerHTML = x;return this}

    /**
     * the id used as a path element
     */
    pathId(){
        return this.id
    }

    /**
     * list of path ids leading to the element
     */
    pathList(){
        let pathList = []
        let current = this
        while(current){
            if(current.pathId()) pathList.unshift(current.pathId())
            current = current.parent
        }
        return pathList
    }

    /**
     * path to the element
     */
    path(){
        let pathList = this.pathList()
        if(!pathList.length) return null
        return pathList.join("/")
    }

    /**
     * store path of the element, by default it is the element path,
     * but this can be overridden with props.forceStorePath
     */
    storePath(){
        if(this.props.forceStorePath) return this.props.forceStorePath
        return this.path()
    }

    /**
     * store the element state in localStorage if it has a path
     */
    storeState(){
        if(this.storePath()){
            storeLocal(this.storePath(), this.state)
        }
    }

    /**
     * retrieve the element state from localStorage if it has a path
     */
    retrieveState(){
        if(this.storePath()){
            this.state = getLocal(this.storePath(), this.state)
        }
    }

    /**
     * initialize state from props, should be implemented by derived classes
     */
    initState(){
        // abstract
    }

    /**
     * build element from scratch, should be implemented by derived classes
     */
    build(){
        // abstract
    }

    /**
     * mount element
     */
    mount(){        
        this.retrieveState()
        this.initState()
        this.build()
        this.mountChilds()
    }

    /**
     * mount childs of the element
     */
    mountChilds(){
        for(let child of this.childs){
            child.mount()
        }
    }
}

/**
 * wrapper class for HTML div element
 */
class div_ extends SmartDomElement_{
    constructor(props){
        super(props)
    }
}
/**
 * returns a new div_ instance
 * @param props {object} props <opt-param />
 * @example
 * // creates a div with content "I'm a div."
 * div().html("I'm a div.")
 */
function div(props){return new div_(props)}

/**
 * wrapper class for HTML button element
 */
class Button_ extends SmartDomElement_{
    /**
     * @param caption {string} caption 
     * @param callback {function} callback
     * @param props {object} props <opt-param />
     */
    constructor(caption, callback, props){
        super({...props, ...{
            tag: "button"
        }})

        this.html(caption)

        if(callback) this.ae("click", callback)
    }
}
/**
 * returns a new Button_ instance
 * @param caption {string} caption 
 * @param callback {function} callback
 * @param props {object} props <opt-param />
 */
function Button(caption, callback, props){return new Button_(caption, callback, props)}

/**
 * wrapper for HTML input element
 * @param props (object) props <opt-param /> 
 */
class input_ extends SmartDomElement_{
    /**
     * <props-opt></props-opt>     
     * <table class="classtable">     
     * <tr><td>type</td><td>input type [ default: "text" ]</td>     
     * </table>
     */
    constructor(props){
        super({...props, ...{
            tag: "input"
        }})
        this.setAttribute("type", props.type || "text")
    }
}
/**
 * returns a new input_ instance
 * @param props {object} props <opt-param /> 
 */
function input(props){return input_(props)}

/**
 * wrapper class for HTML table element
 * @param props {object} props <opt-param />
 */
class table_ extends SmartDomElement_{
    /**
     * <props-opt></props-opt>
     * <table class="classtable">     
     * <tr><td>cellpadding</td><td>cell padding</td>     
     * <tr><td>cellspacing</td><td>cell spacing</td>     
     * <tr><td>border</td><td>border width</td>     
     * </table>
     */
    constructor(props){
        super({...props, ...{
            tag: "table"
        }})
        if(typeof this.props.cellpadding != "undefined") this.setAttribute("cellpadding", this.props.cellpadding)
        if(typeof this.props.cellspacing != "undefined") this.setAttribute("cellspacing", this.props.cellspacing)
        if(typeof this.props.border != "undefined") this.setAttribute("border", this.props.border)
    }
}
/**
 * returns a new table_ instance
 * @param props {object} props <opt-param /> 
 */
function table(props){return new table_(props)}

/**
 * wrapper class for HTML table head element
 */
class thead_ extends SmartDomElement_{
    constructor(props){
        super({...props, ...{
            tag: "thead"
        }})
    }
}
/**
 * returns a new thead_ instance
 * @param props {object} props <opt-param /> 
 */
function thead(props){return new thead_(props)}

/**
 * wrapper class for HTML table body element
 */
class tbody_ extends SmartDomElement_{
    constructor(props){
        super({...props, ...{
            tag: "tbody"
        }})
    }
}
/**
 * returns a new tbody_ instance
 * @param props {object} props <opt-param /> 
 */
function tbody(props){return new tbody_(props)}

/**
 * wrapper class for HTML table row element
 */
class tr_ extends SmartDomElement_{
    constructor(props){
        super({...props, ...{
            tag: "tr"
        }})
    }
}
/**
 * returns a new tr_ instance
 * @param props {object} props <opt-param /> 
 */
function tr(props){return new tr_(props)}

/**
 * wrapper class for HTML select element
 */
class select_ extends SmartDomElement_{
    constructor(props){
        super({...props, ...{
            tag: "select"
        }})
    }
}
/**
 * returns a new select_ instance
 * @param props {object} props <opt-param /> 
 */
function select(props){return new select_(props)}

/**
 * wrapper class for HTML option element
 * @param props {object} props <opt-param />, see class constructor 
 */
class option_ extends SmartDomElement_{
    /**
     * <props-opt></props-opt>
     * <table class="classtable">     
     * <tr><td>value</td><td>option value</td>     
     * <tr><td>display</td><td>option display</td>     
     * </table>
     */
    constructor(props){
        super({...props, ...{
            tag: "option"
        }})

        if(this.props.value) this.setAttribute("value", this.props.value)
        if(this.props.display) this.html(this.props.display)
    }
}
/**
 * returns a new option_ instance
 * @param props {object} props <opt-param />, see class constructor
 */
function option(props){return new option_(props)}

/**
 * wrapper class for HTML checkbox input element
 * @param props {object} props <opt-param />, see class constructor 
 */
class CheckBoxInput_ extends input_{
    /**
     * <props-opt></props-opt>
     * <table class="classtable">     
     * <tr><td>forceChecked</td><td>boolean, force checked status to true or false</td>     
     * <tr><td>changeCallback</td><td>change callback</td>     
     * </table>
     */
    constructor(props){
        super({...props, ...{
            type: "checkbox"
        }})

        this.ae("change", this.changed.bind(this))
    }

    /**
     * handle change event
     */
    changed(){
        this.state.checked = this.e.checked
        this.storeState()

        if(this.props.changeCallback) this.props.changeCallback(this.state.checked)
    }

    /**
     * init state
     */
    initState(){        
        if(typeof this.props.forceChecked != "undefined") this.state.checked = this.props.forceChecked
    }

    /**
     * build
     */
    build(){
        this.e.checked = this.state.checked
    }
}
/**
 * returns a new CheckBoxInput_ instance
 * @param props {object} props <opt-param />, see class constructor
 */
function CheckBoxInput(props){return new CheckBoxInput_(props)}

/**
 * wrapper class for HTML table cell element
 */
class td_ extends SmartDomElement_{
    constructor(props){
        super({...props, ...{
            tag: "td"
        }})
    }
}
/**
 * returns a new td_ instance
 * @param props {object} props <opt-param /> 
 */
function td(props){return new td_(props)}

/**
 * combo
 * @param props {object} props <opt-param />, see class constructor 
 */
class Combo_ extends select_{
    /**
     * <props-opt></props-opt>
     * <table class="classtable">     
     * <tr><td>forceOptions</td><td>list of options, allowed option formats {value: "foo", display: "bar"} / ["foo", "bar"] / "foo" ( display will also be "foo")</td>     
     * <tr><td>forceSelected</td><td>selected option value</td>     
     * <tr><td>changeCallback</td><td>change callback</td>     
     * </table>
     */
    constructor(props){
        super({...props, ...{            
        }})

        this.ae("change", this.changed.bind(this))
    }

    /**
     * handle change event
     */
    changed(){
        this.state.selected = this.value()

        this.storeState()

        if(this.props.changeCallback) this.props.changeCallback(this.state.selected)
    }

    /**
     * init state
     */
    initState(){
        if(!this.state.options) this.state.options = []
        if(this.props.forceOptions) this.state.options = this.props.forceOptions
        if(this.props.forceSelected) this.state.selected = this.props.forceSelected
        this.translateOptions()
        this.storeState()
    }

    /**
     * translate options
     */
    translateOptions(){
        this.state.options = this.state.options.map(opt => translateOption(opt))
    }

    /**
     * build
     */
    build(){
        this.translateOptions()
        this.x().a(
            this.state.options.map(
                opt => {
                    let o = option(opt)
                    if(opt.value == this.state.selected) o.setAttribute("selected", true)
                    return o
                }
            )
        )
    }
}
/**
 * returns a new Combo_ instance
 * @param props {object} props <opt-param />, see class constructor
 */
function Combo(props){return new Combo_(props)}

/**
 * options table
 * @param props {object} see class constructor 
 */
class OptionsTable_ extends table_{
    /**     
     * props should have an options field
     * <table class="classtable">     
     * <tr><td>options</td><td>array of input elements,
     * each input element should have a display field in its props, telling the name of the option</td>          
     * </table>
     */
    constructor(props){
        super({...props, ...{
            
        }})        
    }

    /**
     * build
     */
    build(){        
        this.a(
            thead().a(
                tr().a(
                    td().html("Option Name"),
                    td().html("Option Value"),
                )
            ),
            tbody().a(
                this.props.options.map(option => tr().a(
                    td().html(option.props.display),
                    td().a(option),
                ))                
            )
        )
    }
}
/**
 * returns a new OptionsTable_ instance
 * @param props {object} props, see class constructor
 */
function OptionsTable(props){return new OptionsTable_(props)}

module.exports = {
    div: div,
    input: input,
    CheckBoxInput: CheckBoxInput,
    table: table,
    thead: thead,
    tbody: tbody,
    tr: tr,
    td: td,
    OptionsTable: OptionsTable,
    select: select,
    option: option,
    Combo: Combo,
    Button: Button,
    alert: alert,
}

},{}],2:[function(require,module,exports){
const { div, Button } = require('@aestheticbookshelf/smartdom')

let app = div().a(
    Button("Login with lichess", () => document.location.href = "/auth/lichess"),
    Button("Login with lichess-bot", () => document.location.href = "/auth/lichess/bot"),
    div().html(`user id: ${PROPS.USER.id}`)
)    

document.querySelector("#root").appendChild(app.e)

},{"@aestheticbookshelf/smartdom":1}]},{},[2]);
