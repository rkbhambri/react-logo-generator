import React from 'react';

const DownloadLogo = (props) => {
    return (
        <div className="download">
            <div className="row ml-1 pt-5">
                <div className="downloadSvg" style={{ width: '47%' }}>
                    <button
                        id="downloadLink"
                        className="btn btn-primary downloadLink w-100"
                        onClick={() => props.downloadSVG()}
                        style={{ background: '#448AFA', borderColor: '#448AFA' }}>Download SVG</button>

                </div>
                <div className="downloadJpg" style={{ width: '49%', paddingLeft: '10px' }}>
                    <button
                        id="downloadLinkForImage"
                        className="btn btn-primary downloadLink w-100"
                        onClick={() => props.downloadImage()}
                        style={{ background: '#448AFA', borderColor: '#448AFA' }}>Download Image</button>
                </div>
            </div>
        </div>
    );
};

export default DownloadLogo;
