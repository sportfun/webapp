import React from 'react'

class ProgressBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stats: {}
        }
    }

    render() {
        return (
            <div id="bar-1" className={"bar-main-container " + this.props.backgroundStyle}>
                <div className="wrap">
                    <div className="bar-percentage">{this.props.percentage}%</div>
                    <div className="bar-container">
                        <div className="bar" style={{ width: this.props.percentage + '%' }}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProgressBar