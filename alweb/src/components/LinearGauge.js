import React, { Component } from 'react';

export default class LinearGauge extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             num: this.props.num
        }
    }
    
    setValue = (val) => {
        this.props.setSUDS(this.state.num, val);
    }
    render() {
        return (
            <div className="HorItems">
                
                <div>
                    <img alt="" className="hand" src={require('../images/gauge.png')} />
                </div>
                <div className="VerItems">
                    <div  className="GaugeItem"><label for="100" >
                        100</label>
                        <input id="100" type="radio" onChange={()=> this.setValue(100)}  name={'Guage' + this.state.num} /><label for="100" >
                        بالاترین اضطراب و پریشانی که تاکنون احساس کرده اید.
                        </label>
                    </div>
                    <div className="GaugeItem"><label for="90" >
                        90</label>&nbsp;
                        <input id="90" type="radio" onChange={()=> this.setValue(90)} name={'Guage' + this.state.num} /><label for="90"> 
                        تا حدی مضطرب و پریشان که عملکردتان را مختل کند
                        </label>
                    </div>
                    <div className="GaugeItem"><label for="80" >
                        80</label>&nbsp;
                        <input id="80" type="radio" onChange={()=> this.setValue(80)} name={'Guage' + this.state.num} /><label for="80"> 
                        کاملا مضطرب و پریشان ، قادر به تمرکز نیستید.
                        </label>
                    </div>
                    <div className="GaugeItem"><label for="70" >
                        70</label>&nbsp;
                        <input id="70" type="radio" onChange={()=> this.setValue(70)} name={'Guage' + this.state.num} /><label for="70"> 
                        بسیار مضطرب و پریشان
                        </label>
                    </div>
                    <div className="GaugeItem"><label for="60" >
                        60</label>&nbsp;
                        <input id="60" type="radio" onChange={()=> this.setValue(60)} name={'Guage' + this.state.num} /><label for="60"> 
                        
                        </label>
                    </div>
                    <div className="GaugeItem"><label for="50" >
                        50</label>&nbsp;
                        <input id="50" type="radio" onChange={()=> this.setValue(50)} name={'Guage' + this.state.num} /><label for="50"> 
                        اضطراب و پریشانی متوسط ، ناراحت کننده است اما می توانید عملکرد خود را ادامه دهید.
                        </label>
                    </div>
                    <div className="GaugeItem"><label for="40" >
                        40</label>&nbsp;
                        <input id="40" type="radio" onChange={()=> this.setValue(40)} name={'Guage' + this.state.num} /><label for="40"> 
                        
                        </label>
                    </div>
                    <div className="GaugeItem"><label for="30" >
                        30</label>&nbsp;
                        <input id="30" type="radio" onChange={()=> this.setValue(30)} name={'Guage' + this.state.num} /><label for="30"> 
                        اضطراب و پریشانی کم و خفیف
                        </label>
                    </div>
                    <div className="GaugeItem"><label for="20" >
                        20</label>&nbsp;
                        <input id="20" type="radio" onChange={()=> this.setValue(20)} name={'Guage' + this.state.num} /><label for="20"> 
                        اضطراب و پریشانی حداقل که هیچپونه دخالت در عملکردتان ندارد
                        </label>
                    </div>
                    <div className="GaugeItem"><label for="10" >
                        10</label>&nbsp;
                        <input id="10" type="radio" onChange={()=> this.setValue(10)} name={'Guage' + this.state.num} /><label for="10"> 
                        کاملا آرام و با تمرکز
                        </label>
                    </div>
                    <div className="GaugeItem"><label for="1" >
                        0</label>&nbsp;&nbsp;
                        <input id="1" type="radio" onChange={()=> this.setValue(1)} name={'Guage' + this.state.num} /><label for="1"> 
                        کاملاً آرام
                        </label>
                    </div>
                </div>


            </div>
        )
    }
}