import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import ReactLogo from '../../components/ReactLogo/ReactLogo';
import DownloadLogo from '../../components/DownloadLogo/DownloadLogo';
import './Layout.css'
class Layout extends Component {

	state = {
		logoColor: '#61DAFB',
		backgroundColor: '#000',
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
				shades: ['#536DFC', '#3F51B5', '#2F3F9F']
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
				shades: ['#B2DFDA', '#469689', '#387A6B']
			},
			{
				name: 'GREEN',
				color: '#59AF50',
				shades: ['#C8E6C9', '#59AF50', '#478F3D']
			}
		],
		colorName: null,
		colorIndex: null,
		buttonClicked: false
	};

	changeBackgroundColor = (event) => {
		this.setState({
			...this.state,
			backgroundColor: event.target.value
		});
	};

	selectColor = (colorName, colorIndex) => {
		if (colorIndex === this.state.colorIndex) {
			this.setState({
				...this.state,
				buttonClicked: !this.state.buttonClicked
			});
		} else {
			this.setState({
				...this.state,
				colorName,
				colorIndex,
				buttonClicked: true
			});
		}
	};

	selectLogoColor = (logoColor) => {
		this.setState({
			...this.state,
			logoColor
		});
	};

	downloadSVG = () => {
		let logoSVG = document.getElementById("logo-svg");
		let svgData = logoSVG.outerHTML;
		let svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
		let svgUrl = URL.createObjectURL(svgBlob);
		let downloadLink = document.getElementById("downloadLink");
		downloadLink.href = svgUrl;

		var dl = document.createElement("a");
		document.body.appendChild(dl); // This line makes it work in Firefox.
		dl.setAttribute("href", downloadLink.href);
		dl.setAttribute("download", "react-logo.svg");
		dl.click();
	};

	downloadImage = () => {
		let svg = document.getElementById("logo-svg");
		let svgSize = svg.getBoundingClientRect();
		var svgData = new XMLSerializer().serializeToString(svg);

		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");

		var img = document.createElement("img");

		canvas.width = svgSize.width;
		canvas.height = svgSize.height;

		img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));

		img.onload = function () {
			ctx.drawImage(img, 0, 0);
			var imgsrc = canvas.toDataURL("image/png");
			let a = document.getElementById("downloadLinkForImage");
			a.href = imgsrc;
			var dl = document.createElement("a");
			document.body.appendChild(dl);
			dl.setAttribute("href", a.href);
			dl.setAttribute("download", "react-logo.jpg");
			dl.click();
		};
	}

	render() {
		let colors = null;
		if (this.state.colorIndex !== null) {
			colors = this.state.color[this.state.colorIndex].shades.map(data => {
				return (
					<span
						className="dot"
						key={data}
						style={{ background: data }}
						onClick={() => this.selectLogoColor(data)}></span>
				);
			});
		}
		let colorButton = this.state.color.map((item, colorIndex) => {
			return (
				<div className="color col-md-3" key={colorIndex}>
					{
						this.state.buttonClicked && (this.state.colorIndex === colorIndex) ?
							<div className="color-shades">
								{colors}
							</div>
							:
							<div className="color-shades">
								&nbsp;
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
					<div className="react-logo col-md-4 mt-5">
						<ReactLogo logoColor={this.state.logoColor} backgroundColor={this.state.backgroundColor} />
						<DownloadLogo downloadSVG={() => this.downloadSVG()} downloadImage={() => this.downloadImage()} />
					</div>
					<div className="col-md-7 border ml-5 mt-5">
						<div className="select-background w-100 row pt-1">
							<div className="select-background-title col-md-4">Select Background</div>
							<div className="select-background-color col-md-1 offset-7 mr-0">
								<input type="color" onChange={(event) => this.changeBackgroundColor(event)} />
							</div>
						</div>
						<div className="select-color ml-2" >
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
