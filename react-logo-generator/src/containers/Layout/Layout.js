import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import ReactLogo from '../../components/ReactLogo/ReactLogo';
import './Layout.css'
class Layout extends Component {

    state = {
        logoColor: '#61DAFB',
        backgroundColor: '#213',
        color: [
            {
                name: 'RED',
                color: '#E94033',
                shades: ['#EA4D4E', '#E94033', '#D3382F']
            },
            {
                name: 'PINK',
                color: '#E94363',
                shades: ['#E9467F', '#E94363', '#C3375B']
            },
            {
                name: 'PURPLE',
                color: '#9E3FB0',
                shades: ['#E25EFB', '#9E3FB0', '#7C36A2']
            },
            {
                name: 'INDIGO',
                color: '#3F51B5',
                shades: ['#3F51B5', '#3F51B5', '#2F3F9F']
            },
            {
                name: 'BLUE',
                color: '#448AFB',
                shades: ['#3097F3', '#448AFB', '#1D76D2']
            },
            {
                name: 'CYAN',
                color: '#54BDD5',
                shades: ['#B2EAF2', '#54BDD5', '#4398A7']
            },
            {
                name: 'TEAL',
                color: '#469689',
                shades: ['#B2DFDA', '#469689', '#4696#59AF50']
            },
            {
                name: 'GREEN',
                color: '#59AF50',
                shades: ['#C8E6C9', '#59AF50', '#478F3D']
            }
        ],
        colorName: null,
        colorIndex: null
    };

    changeBackgroundColor = (event) => {
        this.setState({
            ...this.state,
            backgroundColor: event.target.value
        });
    };

    selectColor = (colorName, colorIndex) => {
        this.setState({
            ...this.state,
            colorName,
            colorIndex
        });
    };

    render() {
        let colors = null;
        if (this.state.colorIndex !== null) {
            colors = this.state.color[this.state.colorIndex].shades.map(data => {
                return (
                    <React.Fragment>
                        <span className="dot" key={data} style={{ background: data }}></span>
                    </React.Fragment>
                );
            });
        }
        console.log('colors====', colors)
        let colorButton = this.state.color.map((item, colorIndex) => {
            return (
                <div className="color col-md-3" key={colorIndex}>
                    {
                        this.state.colorIndex === colorIndex &&
                        <div className="color-shades">
                            {colors}
                        </div>
                    }
                    <button
                        className="btn btn-md btn-default w-100"
                        style={{ background: item.color }}
                        onClick={() => this.selectColor(item.name, colorIndex)}>
                        {item.name}
                    </button>
                </div>
            );
        });
        return (
            <div className="layout">
                <Header />
                <div className="react-logo-container w-100 row ml-2">
                    <div className="react-logo col-md-4 border mt-5">
                        <ReactLogo logoColor={this.state.logoColor} backgroundColor={this.state.backgroundColor} />
                    </div>
                    <div className="col-md-7 border ml-5 mt-5">
                        <div className="select-background w-100 row pt-1">
                            <div className="select-background-title col-md-4">Select Background</div>
                            <div className="select-background-color col-md-1 offset-7 mr-0">
                                <input type="color" onChange={(event) => this.changeBackgroundColor(event)} />
                            </div>
                        </div>
                        <div className="select-color ml-2 mt-1" >
                            <div className="color-wrapper row mr-1">
                                {colorButton}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Layout;

// style={{ height: '316px', width: '450px' }}
