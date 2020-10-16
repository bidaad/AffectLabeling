import React, { Component } from 'react'
import axios from 'axios'
import Pagination from "react-js-pagination";

const qs = require('qs');

const APIUrl = 'http://api.netsima.ir/api/'
export default class PersonList extends Component {
    constructor(props) {

        super(props)

        this.state = {
            data: [],
            dataCombo: [],
            singleData: [],
            isLoading: true,
            message: '',
            PageNo: 1,
            itemEditing: false,
            id: null,
            CatName: null,
            NewEdit: 'New',
            ResourseSiteCats: [],
            activePage: 1,
            pageSize: 10,
            totalCount: 0

        };
    };



    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber });
        var url = APIUrl + 'persons/?pageNo=' + pageNumber + '&takeCount=' + this.state.pageSize
        this.getData(url);
    }

    handleClick = (Id) => {
        var url = APIUrl + 'person/' + Id
        this.setState({
            isLoading: true,
            NewEdit: 'Edit',
        }
        )

        this.getSingleData(url);

    }

    deleteRecord = (Id, event) => {
        this.setState(
            {
                isLoading: true
            }
        )
        this.deleteData(Id);

        event.stopPropagation();
    }

    getTotalCount(url) {
        var url = APIUrl + 'persons/count'

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    totalCount: res,
                });
            })
            .catch(error => {
                this.setState({ message: 'بارگزاری با خطا مواجه شد', isLoading: false });
                this.error('ERROR=' + error);
            });

    }

    getData(url) {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res,
                    isLoading: false,
                    message: '',
                    PageNo: this.state.PageNo + 1,
                });
            })
            .catch(error => {
                this.setState({ message: 'بارگزاری با خطا مواجه شد', isLoading: false });
                this.error('ERROR=' + error);
            });

    }

    getComboData() {
        const url = APIUrl + 'HCResourceSitesCats'
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    dataCombo: this.state.data.concat(res),
                });
            })
            .catch(error => {
                this.setState({ message: 'بارگزاری با خطا مواجه شد', isLoading: false });
                this.error('ERROR=' + error);
            });

    }

    getSingleData(url) {
        //console.log('vvvvvvvvvv');
        
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    singleData: res,
                    isLoading: false,
                    message: '',
                    itemEditing: true,
                    id: res[0].ID,
                });
            })
            .catch(error => {
                this.setState({ message: 'بارگزاری با خطا مواجه شد', isLoading: false });
                console.log('ERROR=' + error);
            });
    }

    deleteData(Id) {
        axios.get(APIUrl + 'ResourceSites/delete/' + Id
        )
            .then(response => {
                this.setState(
                    {
                        data: this.state.data.filter(function (item) {
                            return item._id !== Id;
                        }),
                        isLoading: false
                    }
                )
            })
            .catch(err => {
                //handle error
                alert('ERROR: ' + err.response.data);
            });
    }

    componentDidMount() {
        var url = APIUrl + 'persons/?pageNo=' + this.state.activePage + '&takeCount=' + this.state.pageSize
        this.getTotalCount(url);
        this.getData(url);
    }

    error = (msg) => {
        this.setState(
            { message: msg }
        )
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const fullName = event.target.elements.FullName.value;
        const personCode = event.target.elements.PersonCode.value;

        let data = {
            id: this.state.id,
            fullName: fullName,
            personCode: personCode,
        }

        //console.log(this.state.id);
        //axios.defaults.headers.put['Content-Type'] = 'application/json';
        if (this.state.NewEdit === 'New')
            axios.post(APIUrl + 'person', qs.stringify(data))
                .then(response => {
                    //handle success
                    this.setState(
                        {
                            itemEditing: false,
                            data: [],
                            isLoading: true,
                        }
                    )

                    this.getData(APIUrl + 'persons');

                    //alert(response);
                })
                .catch(err => {
                    //handle error
                    console.log(err);

                    //alert('ERROR111: ' + err);
                });
        else
            axios.put('http://api.netsima.ir/api/person', qs.stringify(data))
                .then(response => {
                    //handle success
                    this.setState(
                        {
                            itemEditing: false,
                            data: [],
                            isLoading: true,
                        }
                    )

                    this.getData(APIUrl + 'persons');

                    //alert(response);
                })
                .catch(err => {
                    //handle error
                    console.log( err);
                });

    }
    ChangeResourceSiteCats = (SaveType, data) => {
        this.setState(
            {
                ResourseSiteCats: data
            }
        )
        //alert(SaveType)
    }

    handleHCResourceSiteCats = (target) => {
        this.setState(
            {
                CatName: target.label
            }
        )
        //alert(target.value)
    }

    render() {

        const Loading = this.state.isLoading ? <div className="spinner-border" role="status">        <span className="sr-only">Loading...</span>      </div> : '';

        const ItemList = () => (
            this.state.data.map((item) => {
                return (
                    <tr onClick={() => this.handleClick(item.ID)} key={item.ID}>
                        <td >{item.PersonCode}</td>
                        <td >{item.FullName}</td>

                        <td onClick={(e) => this.deleteRecord(item.ID, e)}>
                            <span href="#">
                                <span className="text-danger glyphicon glyphicon-trash"></span>
                            </span>
                        </td>
                    </tr>
                )
            })

        );

        if (!this.state.itemEditing)
            return (

                <div>
                    <div>
                        <h1>Person List</h1>
                    </div>
                    <table className="tblRecords table table-hover table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Person Code</th>
                                <th scope="col">Full Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ItemList />
                        </tbody>
                    </table>
                    {Loading}
                    <div>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.pageSize}
                            totalItemsCount={this.state.totalCount}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                        />
                    </div>
                    <div className="text-right">
                        <button type="button" onClick={() => { this.setState({ itemEditing: true, singleData: [], NewEdit: 'New' }) }} className="btn btn-primary">Create</button>
                    </div>

                </div>
            )
        else {
            const { FullName, PersonCode } = this.state.singleData.length > 0 ? this.state.singleData[0] : [];

            return (
                <div>
                    <div className="card border-secondary mb-3" >
                        <div className="card-header">Edit Resource Site</div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="InputFullName">Full Name</label>
                                    <input type="name" className="form-control" id="FullName" aria-describedby="FullNameHelp" defaultValue={FullName} placeholder="Full Name" />
                                    <small id="FullNameHelp" className="form-text text-muted">Full Name</small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="InputPersonCode">Person Code</label>
                                    <input type="text" className="form-control" id="PersonCode" aria-describedby="PersonCodeHelp" defaultValue={PersonCode} placeholder="Person Code" />
                                    <small id="PersonCodeHelp" className="form-text text-muted">Person Code</small>
                                </div>

                                <div className="text-right">
                                    <button type="button" onClick={() => { this.setState({ itemEditing: false }) }} className="btn btn-info mr-1">Back</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>

                    </div>
                    {Loading}
                </div>
            )
        }

    }
}
