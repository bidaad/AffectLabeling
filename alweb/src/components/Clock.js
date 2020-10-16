import React, { Component } from 'react'

export default class Clock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            seconds: 0,
            minutes: 0,
            hours: 0,
        }
    }

    IncrementTime = () => {
        var curSeconds = parseInt(this.state.seconds, 10);
        var curMinutes = parseInt(this.state.minutes, 10);
        var curHours = parseInt(this.state.hours, 10);

        curSeconds++;
        if (curSeconds === 60) {
            curSeconds = 0;
            curMinutes++;
            if (curMinutes === 60) {
                curMinutes = 0;
                curHours++;
            }
        }
        this.setState({ seconds: curSeconds, minutes: curMinutes, hours: curHours });
        setTimeout(() => this.IncrementTime(), 1000);
    }

    componentDidMount() {
        this.IncrementTime();
    }
    render() {
        return (
            <div className="HorItems clock-border dir-ltr">
                <div>
                    {this.state.hours.toString().length === 1 ? "0" + this.state.hours : this.state.hours} :
                </div>
                <div>
                    {this.state.minutes.toString().length === 1 ? "0" + this.state.minutes : this.state.minutes} :
                </div>
                <div>
                    {this.state.seconds.toString().length === 1 ? "0" + this.state.seconds : this.state.seconds}
                </div>


            </div>
        )
    }
}
