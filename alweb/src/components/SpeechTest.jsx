import React, { Component } from 'react'
import ReactLoading from 'react-loading';
import LinearGauge from './LinearGauge';
import Clock from './Clock';
import axios from 'axios'

//import { IgrLinearGaugeModule } from "igniteui-react-gauges/ES5/igr-linear-gauge-module";
//import { IgrLinearGauge } from "igniteui-react-gauges/ES5/igr-linear-gauge";
//import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


//IgrLinearGaugeModule.register();
var Scroll = require('react-scroll');

var Link = Scroll.Link;
var Element = Scroll.Element;
var Events = Scroll.Events;
var scroll = Scroll.animateScroll;
var scrollSpy = Scroll.scrollSpy;

const APIUrl = 'http://api.netsima.ir/api/'

export default class SpeechTest extends Component {
    constructor(props) {
        super(props)

        this.state = {
            counter: 45,
            personID: null,
            speechID: null,
            isLoading: false,
            personCode: '',
            speechCode: '',
            personFullName: null,
            speechTitle: null,
            message: '',
            startTest: false,
            SUDS1: null,
            SUDS2: null,
            SUDS3: null,
            myFeeling: 'a;b;c',
            myFeelingDesc: '',
            othersFeeling: '',
            othersFeelingDesc: '',
            futureFeeling: '',
            futureFeelingDesc: '',

            myFeelingAnswer: 'null',
            myFeelingAfterSpeechAnswer: null,
            othersFeelingAnswer: null,
            futureFeelingAnswer: null,
            stage: 1,

            MyFeeling: '',
            OthersFeeling: '',
            MyFeelingAfterSpeech: '',
            FutureFeeling: '',
            saveError: false,

        };
    };


    componentDidMount() {

        Events.scrollEvent.register('begin', function (to, element) {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function (to, element) {
            console.log("end", arguments);
        });

        scrollSpy.update();

    }

    startAgain = () => {
        this.setState(
            {
                personFullName: null,
                speechTitle: null
            }
        )
        this.scrollToTop();
    }

    startTest = () => {
        this.setState(
            {
                startTest: true,
            }
        )


        this.scrollToTop();
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }
    scrollToTop() {
        scroll.scrollToTop();
    }
    scrollToBottom() {
        scroll.scrollToBottom();
    }

    updatePersonCodeValue = (e) => {
        this.setState({
            personCode: e.target.value
        });
    }
    updateSpeechCodeValue = (e) => {
        this.setState({
            speechCode: e.target.value
        });
    }
    getInitInfo = () => {
        const personCode = this.state.personCode;
        const speechCode = this.state.speechCode;
        console.log('personCode=' + personCode);

        this.setState({ isLoading: true, message: '' })
        fetch(APIUrl + `personcode/${personCode}`)
            .then(res => res.json())
            .then(res => {
                if (res.length > 0) {
                    this.setState({
                        personFullName: res[0].FullName,
                        personID: res[0].ID,
                        isLoading: false,
                    });
                    this.scrollToBottom();
                }
                else {
                    this.setState({ message: 'Incorrect person code', isLoading: false });
                }
            })
            .catch(error => {
                this.setState({ message: 'Loading error. please try again later.', isLoading: false });
            });
        fetch(APIUrl + `speechcode/${speechCode}`)
            .then(res => res.json())
            .then(res => {
                if (res.length > 0) {
                    this.setState({
                        speechID: res[0].ID,
                        speechTitle: res[0].Title,
                        myFeeling: res[0].MyFeeling,
                        myFeelingDesc: res[0].MyFeelingDescriptions,
                        othersFeeling: res[0].OthersFeeling,
                        othersFeelingDesc: res[0].OthersFeelingDescriptions,
                        futureFeeling: res[0].FutureFeeling,
                        futureFeelingDesc: res[0].FutureFeelingDescriptions,
                        isLoading: false,
                    });
                    this.scrollToBottom();
                }
                else {
                    this.setState({ message: 'Incorrect speech code', isLoading: false });
                }
            })
            .catch(error => {
                this.setState({ message: 'Loading error. please try again later.', isLoading: false });
            });
    }

    updateValue(e) {
        return this.setState({
            value: e.target.value
        })
    }

    setMyFeeling = (param) => {
        this.setState({ myFeelingAnswer: param })

    }
    setMyFeelingAfterSpeech = (param) => {
        this.setState({ myFeelingAfterSpeechAnswer: param })

    }
    setOthersFeeling = (param) => {
        this.setState({ othersFeelingAnswer: param })

    }
    setFutureFeeling = (param) => {
        this.setState({ futureFeelingAnswer: param })
    }

    goToNextStage = () => {
        const curStage = this.state.stage;
        switch (curStage) {
            case 1:
                if (this.state.SUDS1 === null) {
                    this.setState({ message: 'لطفا عدد دماسنج اضطراب را تعیین کنید' })
                    return;
                }
                break;
            case 2:
                if (this.state.myFeelingAnswer === null) {
                    this.setState({ message: 'لطفا احساس خود را ثبت کنید' })
                    return;
                }
                break;
            case 3:
                if (this.state.othersFeelingAnswer === null) {
                    this.setState({ message: 'لطفا احساس خود را ثبت کنید' })
                    return;
                }
                break;
            case 4:
                if (this.state.SUDS2 === null) {
                    this.setState({ message: 'لطفا عدد دماسنج اضطراب را تعیین کنید' })
                    return;
                }
                break;
            case 6:
                if (this.state.myFeelingAfterSpeechAnswer === null) {
                    this.setState({ message: 'لطفا احساس خود را ثبت کنید' })
                    return;
                }
                break;
            case 7:
                if (this.state.futureFeelingAnswer === null) {
                    this.setState({ message: 'لطفا احساس خود را ثبت کنید' })
                    return;
                }
                break;
            case 8:
                if (this.state.SUDS3 === null) {
                    this.setState({ message: 'لطفا عدد دماسنج اضطراب را تعیین کنید' })
                    return;
                }
                break;

            default:
                break;
        }

        if (curStage === 4) {
            this.runCounter();
            setTimeout(() => {
                this.goToNextStage()
            }, 45000);
        }

        if (curStage === 8)
            this.submitResults();
        this.setState(
            {
                message: '',
                stage: curStage + 1,
            }
        )
    }

    runCounter = () => {
        setTimeout(() => {
            if (this.state.counter === 0)
                return;
            this.setState({ counter: this.state.counter - 1 })
            this.runCounter();
        }, 1000);
    }

    setSUDS = (num, val) => {
        switch (num) {
            case 1:
                this.setState({ SUDS1: val });
                break;
            case 2:
                this.setState({ SUDS2: val });
                break;
            case 3:
                this.setState({ SUDS3: val });
                break;
            default:
                break;
        }
    }

    updateMiscMyFeelingValue = e => {
        this.setState({ MyFeeling: e.target.value });
    }
    updateMiscOthersFeelingValue = e => {
        this.setState({ OthersFeeling: e.target.value });
    }
    updateMiscMyFeelingAfterSpeechValue = e => {
        this.setState({ MyFeelingAfterSpeech: e.target.value });
    }
    updateMiscFutureFeelingValue = e => {
        this.setState({ FutureFeeling: e.target.value });
    }



    submitResults = () => {
        this.setState({ isLoading: true, })
        axios.post(APIUrl + 'stats/', {
            PersonID: this.state.personID,
            SpeechID: this.state.speechID,
            SUDS1: this.state.SUDS1,
            SUDS2: this.state.SUDS2,
            SUDS3: this.state.SUDS3,
            MyFeelingAnswer: this.state.myFeelingAnswer,
            OthersFeelingAnswer: this.state.othersFeelingAnswer,
            MyFeelingAfterSpeechAnswer: this.state.myFeelingAfterSpeechAnswer,
            FutureFeelingAnswer: this.state.futureFeelingAnswer,

            MyFeeling: this.state.MyFeeling,
            OthersFeeling: this.state.OthersFeeling,
            MyFeelingAfterSpeech: this.state.MyFeelingAfterSpeech,
            FutureFeeling: this.state.FutureFeeling,
        }
        )
            .then(response => {
                this.setState(
                    {
                        message: 'اطلاعات با موفقیت ارسال شد',
                        saveError: false,
                        isLoading: false
                    }
                )
            })
            .catch(err => {
                //handle error
                alert('ERROR: ' + err.response.data);
                this.setState(
                    {
                        message: 'بروز خطا در ارسال اطلاعات',
                        saveError: true,
                        isLoading: false
                    }
                )

            });
    }


    render() {
        const myFeelings = this.state.myFeeling.split(';');
        const othersFeelings = this.state.othersFeeling.split(';');
        const futureFeelings = this.state.futureFeeling.split(';');

        var myFeelingClass1 = "btn-dark";
        var myFeelingClass2 = "btn-dark";
        var myFeelingClass3 = "btn-dark";

        var othersFeelingClass1 = "btn-dark";
        var othersFeelingClass2 = "btn-dark";
        var othersFeelingClass3 = "btn-dark";

        if (this.state.myFeelingAnswer === 1)
            myFeelingClass1 = "btn-warning";
        else if (this.state.myFeelingAnswer === 2)
            myFeelingClass2 = "btn-warning";
        else if (this.state.myFeelingAnswer === 3)
            myFeelingClass3 = "btn-warning";

        if (this.state.othersFeelingAnswer === 1)
            othersFeelingClass1 = "btn-warning";
        else if (this.state.othersFeelingAnswer === 2)
            othersFeelingClass2 = "btn-warning";
        else if (this.state.othersFeelingAnswer === 3)
            othersFeelingClass3 = "btn-warning";

        var TestStage = null
        if (this.state.stage === 1)
            TestStage = <div className="m-4">
                <div className="mb-3 text-right">
                    1-	دماسنج اضطراب
                </div>
                <div className="HorItems">
                    <div className="text-center">
                        <div >
                            <LinearGauge num={1} setSUDS={this.setSUDS} />
                        </div>

                        {/* <div><input width="10" onChange={this.updateValue.bind(this)} value={this.state.value} type="number" /></div> */}
                    </div>

                </div>
                <button type="button" onClick={this.goToNextStage} className="btn btn-primary">مرحله بعد</button>
            </div>;
        else if (this.state.stage === 2)
            TestStage = <div className="m-4">
                <div className="mb-3 text-right">
                    2- من احساس می‌کنم ........ هستم.
                </div>
                <div>
                    <div className="radio">
                        <input id="MyFeeling1" value="MF1" checked={this.state.myFeelingAnswer === 1} name="MyFeeling" onChange={() => this.setMyFeeling(1)} type="radio" /><label for="MyFeeling1"> {myFeelings[0]} </label>
                    </div>
                    <div className="radio">
                        <input id="MyFeeling2" value="MF2" checked={this.state.myFeelingAnswer === 2} name="MyFeeling" onChange={() => this.setMyFeeling(2)} type="radio" /><label for="MyFeeling2"> {myFeelings[1]} </label>
                    </div>
                    <div className="radio">
                        <input id="MyFeeling3" value="MF3" checked={this.state.myFeelingAnswer === 3} name="MyFeeling" onChange={() => this.setMyFeeling(3)} type="radio" /><label for="MyFeeling3"> {myFeelings[2]} </label>
                    </div>
                    <div className="radio">
                        <input id="MyFeeling4" value="MF4" checked={this.state.myFeelingAnswer === 4} name="MyFeeling" onChange={() => this.setMyFeeling(4)} type="radio" /><label for="MyFeeling4"> احساس دیگری دارم</label>
                        {this.state.myFeelingAnswer === 4 ?
                            <input type="text" onChange={this.updateMiscMyFeelingValue} className="form-control" id="MiscMyFeeling" placeholder="احساس خود را توضیح دهید" />
                            : null}
                    </div>
                </div>
                <button type="button" onClick={this.goToNextStage} className="btn btn-primary">مرحله بعد</button>
            </div>;
        else if (this.state.stage === 3)
            TestStage = <div>
                <div className="mb-3 text-right">
                    3- فکر می کنم مخاطبین من........
                </div>
                <div>
                    <div className="radio">
                        <input id="OthersFeeling1" checked={this.state.othersFeelingAnswer === 1} value="OF1" name="OthersFeeling" type="radio" onChange={() => this.setOthersFeeling(1)} /><label for="OthersFeeling1"> {othersFeelings[0]} </label>
                    </div>
                    <div className="radio">
                        <input id="OthersFeeling2" checked={this.state.othersFeelingAnswer === 2} value="OF2" name="OthersFeeling" type="radio" onChange={() => this.setOthersFeeling(2)} /><label for="OthersFeeling2"> {othersFeelings[1]} </label>
                    </div>
                    <div className="radio">
                        <input id="OthersFeeling3" checked={this.state.othersFeelingAnswer === 3} value="OF3" name="OthersFeeling" type="radio" onChange={() => this.setOthersFeeling(3)} /><label for="OthersFeeling3"> {othersFeelings[2]} </label>
                    </div>
                    <div className="radio">
                        <input id="OthersFeeling4" checked={this.state.othersFeelingAnswer === 4} value="OF4" name="OthersFeeling" type="radio" onChange={() => this.setOthersFeeling(4)} /><label for="OthersFeeling4"> مورد دیگر</label>
                        {this.state.othersFeelingAnswer === 4 ?
                            <input type="text" onChange={this.updateMiscOthersFeelingValue} className="form-control" id="MiscMyFeeling" placeholder="احساس خود را توضیح دهید" />
                            : null}
                    </div>
                </div>
                <button type="button" onClick={this.goToNextStage} className="btn btn-primary">مرحله بعد</button>

            </div>;
        else if (this.state.stage === 4)
            TestStage = <div>
                <div className="m-4">
                    <div className="mb-3 text-right">
                        4-	دماسنج اضطراب
                    </div>
                    <div className="HorItems">
                        <div className="text-center">
                            <div >
                                <LinearGauge num={2} setSUDS={this.setSUDS} />
                            </div>

                        </div>

                    </div>
                </div>
                <button type="button" onClick={this.goToNextStage} className="btn btn-primary">مرحله بعد</button>
            </div>;
        else if (this.state.stage === 5)
            TestStage = <div>
                <div className="text-right">
                    5-	ارائه سخنرانی
                    </div>
                <div className="text-center w-100">
                    <ReactLoading type={'balls'} color={'#ff0000'} height={'200px'} width={'200px'} />
                </div>
                <div>
                    {this.state.counter}
                </div>
                <button type="button" onClick={this.goToNextStage} className="btn btn-primary">مرحله بعد</button>
            </div>;
        else if (this.state.stage === 6)
            TestStage = <div className="m-4">
                <div className="mb-3 text-right">
                    6- من احساس می‌کنم ........ هستم
                </div>
                <div>
                    <div className="radio">
                        <input id="MFAS1" name="MFAS" checked={this.state.myFeelingAfterSpeechAnswer === 1} type="radio" name="MyFeelingAfterSpeech" onChange={() => this.setMyFeelingAfterSpeech(1)} /><label for="MFAS1"> {myFeelings[0]} </label>
                    </div>
                    <div className="radio">
                        <input id="MFAS2" name="MFAS" checked={this.state.myFeelingAfterSpeechAnswer === 2} type="radio" name="MyFeelingAfterSpeech" onChange={() => this.setMyFeelingAfterSpeech(2)} /><label for="MFAS2"> {myFeelings[1]} </label>
                    </div>
                    <div className="radio">
                        <input id="MFAS3" name="MFAS" checked={this.state.myFeelingAfterSpeechAnswer === 3} type="radio" name="MyFeelingAfterSpeech" onChange={() => this.setMyFeelingAfterSpeech(3)} /><label for="MFAS3"> {myFeelings[2]} </label>
                    </div>
                    <div className="radio">
                        <input id="MFAS4" name="MFAS" checked={this.state.myFeelingAfterSpeechAnswer === 4} type="radio" name="MyFeelingAfterSpeech" onChange={() => this.setMyFeelingAfterSpeech(4)} /><label for="MFAS4"> مورد دیگر</label>
                        {this.state.myFeelingAfterSpeechAnswer === 4 ?
                            <input type="text" onChange={this.updateMiscMyFeelingAfterSpeechValue} className="form-control" id="MiscMyFeeling" placeholder="احساس خود را توضیح دهید" />
                            : null}
                    </div>
                </div>
                <button type="button" onClick={this.goToNextStage} className="btn btn-primary">مرحله بعد</button>
            </div>;
        else if (this.state.stage === 7)
            TestStage = <div>
                <div className="mb-3 text-right">
                    7- مخاطبین من ...............  .
            </div>
                <div>
                    <div className="radio">
                        <input id="FF1" checked={this.state.futureFeelingAnswer === 1} type="radio" name="FutureFeeling" onChange={() => this.setFutureFeeling(1)} /><label for="FF1"> {futureFeelings[0]} </label>
                    </div>
                    <div className="radio">
                        <input id="FF2" checked={this.state.futureFeelingAnswer === 2} type="radio" name="FutureFeeling" onChange={() => this.setFutureFeeling(2)} /><label for="FF2"> {futureFeelings[1]} </label>
                    </div>
                    <div className="radio">
                        <input id="FF3" checked={this.state.futureFeelingAnswer === 3} type="radio" name="FutureFeeling" onChange={() => this.setFutureFeeling(3)} /><label for="FF3"> {futureFeelings[2]} </label>
                    </div>
                    <div className="radio">
                        <input id="FF4" checked={this.state.futureFeelingAnswer === 4} type="radio" name="FutureFeeling" onChange={() => this.setFutureFeeling(4)} /><label for="FF4"> احساس دیگری دارم</label>
                        {this.state.futureFeelingAnswer === 4 ?
                            <input type="text" onChange={this.updateMiscFutureFeelingValue} className="form-control" id="MiscMyFeeling" placeholder="احساس خود را توضیح دهید" />
                            : null}
                    </div>
                </div>
                <button type="button" onClick={this.goToNextStage} className="btn btn-primary">مرحله بعد</button>

            </div>;
        else if (this.state.stage === 8)
            TestStage = <div>
                <div className="m-4">
                    <div className="mb-3 text-right">
                        8-	دماسنج اضطراب
                </div>
                    <div className="HorItems">
                        <div className="text-center">
                            <div >
                                <LinearGauge num={3} setSUDS={this.setSUDS} />
                            </div>

                        </div>

                    </div>
                </div>
                <button type="button" onClick={this.goToNextStage} className="btn btn-success mr-1">پایان </button>
            </div>;
        else if (this.state.stage === 9)
            TestStage =
                <div>
                    <div className="m-4">
                        <div className="mb-3 text-right">
                            {this.state.saveError ?
                                <button type="button" onClick={this.submitResults} className="btn btn-success mr-1">ارسال و ثبت اطلاعات </button>
                                : null}
                        </div>
                    </div>
                </div>;


        return (
            <div>


                {this.state.message != '' ? <div className="alert alert-warning">{this.state.message}</div> : null}

                {!this.state.startTest ?
                    <div className="card border-secondary mb-3" >
                        <div className="card-header">ورود اطلاعات شخص و سخنرانی</div>
                        <div className="card-body">

                            <div className="form-group">
                                <label htmlFor="InputFullName">کد شخص</label>
                                <input type="name" onChange={this.updatePersonCodeValue} className="form-control" id="PersonCode" defaultValue="" aria-describedby="FullNameHelp" placeholder="Person Code" />
                                <small id="FullNameHelp" className="form-text text-muted">کد شخص را وارد کنید تا نام کامل شخص را مشاهده کنید</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="InputSpeechCode">کد سخنرانی</label>
                                <input type="text" onChange={this.updateSpeechCodeValue} className="form-control" id="SpeechCode" defaultValue="" aria-describedby="SpeechCodeHelp" placeholder="Speech Code" />
                                <small id="SpeechCodeHelp" className="form-text text-muted">کد سخنرانی را وارد کنید تا اطلاعات صخنرانی را مشاهده کنید</small>
                            </div>

                            <div className="text-right">

                                <button type="button" onClick={this.getInitInfo} className="btn btn-primary">ارسال</button>
                                {this.state.isLoading ? <ReactLoading type={'spin'} color={'#ff0000'} height={'40px'} width={'40px'} /> : null
                                }
                            </div>

                        </div>
                    </div>
                    : null}

                {!this.state.startTest ?
                    <div>
                        {this.state.personFullName != null && this.state.speechTitle != null ?
                            <div className="card border-secondary mb-3" >
                                <div className="card-header">مشاهده اطلاعات</div>
                                <div className="card-body">

                                    <div className="form-group">
                                        <label htmlFor="InputFullName">نام کامل شخص</label>
                                        <div className="form-control">{this.state.personFullName}</div>

                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="InputSpeechCode">عنوان سخنرانی</label>
                                        <div className="form-control">{this.state.speechTitle}</div>
                                    </div>

                                    <div className="text-right">
                                        <button type="button" onClick={this.startAgain} className="btn btn-info mr-1">وارد کردن کد شخص جدید</button>
                                        <button type="button" onClick={this.startTest} className="btn btn-success mr-1">شروع آزمون</button>
                                        {this.state.isLoading ? <ReactLoading type={'spin'} color={'#ff0000'} height={'40px'} width={'40px'} /> : null
                                        }
                                    </div>

                                </div>
                            </div>
                            : null}
                    </div>
                    : null}


                {this.state.startTest ?
                    <div className="card border-secondary mb-3" >
                        {/* <div className="card-header">آزمون
                            <div className="float-left"><Clock /></div>
                        </div> */}
                        <div className="card-body">
                            {/* <div className="form-group">
                                <label htmlFor="InputSpeechCode">عنوان سخنرانی</label>
                                <div className="form-control">{this.state.speechTitle}</div>
                            </div> */}

                            {TestStage}

                            <div className="text-right">

                                {this.state.isLoading ? <ReactLoading type={'spin'} color={'#ff0000'} height={'40px'} width={'40px'} /> : null
                                }
                            </div>

                        </div>
                    </div>
                    : null}


            </div>
        )
    }
}
