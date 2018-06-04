import React from "react"
import ReactDOM from "react-dom"

class NumberButton extends React.Component {
    constructor(props) {
        super(props)
        this.buttonClick = this.buttonClick.bind(this)
    }

    buttonClick() {
        this.props.updateScreen(this.props.symbol);
    }   

    render() {
        return (
            <button onClick={this.buttonClick} value='{this.props.symbol}'>{this.props.symbol}</button>
        )
    }
}

class Screen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            screen:props.screen,
            nextClears:false
        }
        this.updateScreen = this.updateScreen.bind(this)
    }   

    updateScreen(character) {
        if(this.state.nextClears) {
            this.setState({screen:"", nextClears:false})
        }
        this.setState({screen:this.state.screen + character})
        if(character == "=") {
            let output
            try {
                output = eval(this.state.screen)
            } catch(e) {
                output = e;
            }
            this.setState({screen:output, nextClears:true})
        } else if(character == "c") {
            this.setState({screen:""})
        }
    }   

    render() {
        let elements = []
        for (let i = 1; i <= 9; i++) {
            elements.push(<NumberButton updateScreen={this.updateScreen} symbol={i}></NumberButton>)
            if(i % 3 == 0) {
                elements.push(<br/>)
            }
        }
        elements.push(<NumberButton updateScreen={this.updateScreen} symbol="0"></NumberButton>)
        elements.push(<br/>)
        let other_buttons = ["+","-","*","/","c","="]
        for(let x in other_buttons) {
            elements.push(<NumberButton updateScreen={this.updateScreen} symbol={other_buttons[x]}></NumberButton>)
            if(x % 3 == 0) {
                elements.push(<br/>)
            }
        }
        return (
            <div> 
                <div id="screen">
                    {this.state.screen}
                </div>
                <br/>
                {elements}
            </div>
        )
    }
}

ReactDOM.render(<Screen screen=""></Screen>, document.getElementById("root"))
