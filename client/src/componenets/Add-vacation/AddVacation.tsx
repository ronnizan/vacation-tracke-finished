import React, { Component, ChangeEvent, FormEvent } from 'react';
import "./AddVacation.css"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadUser } from '../../redux/actions/auth-actions';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../redux/types/auth/auth-actions-types';
import axios from 'axios';
import { Config } from '../../config';
import setAuthToken from '../../utills/setAuthToken';
import { popUpAlert } from '../../redux/actions/alert-actions';
import { Alert } from '../../redux/types/alert/alert-type';

type Props = LinkDispatchProps;
interface AddVacationState {
    image: any
    destination: string;
    description: string;
    price: string;
    startDate: string;
    endDate: string;
    imageFileName: string

}

class AddVacation extends Component<Props, AddVacationState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            image: null,
            destination: "",
            description: "",
            price: "",
            startDate: "",
            endDate: "",
            imageFileName: ""
        }

    }

    componentDidMount = async () => {
        try {
            this.props.loadUser();
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }
        } catch (error) {
            console.log(error)
        }
    }

    private handleChangeStartDate = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state, startDate: event.target.value
        });
    };
    private handleChangeEndDate = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state, endDate: event.target.value
        });
    };
    onChangeImage = (event: any) => {
        this.setState({
            image: event.target.files[0]
        });
        if (event.target.files[0]) {
            this.props.popUpAlert({ alertType: "success", msg: "successfully Uploaded An Image", timeout: 5000 });
        }

    };

    private onChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    };

    private onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            let { destination, description, price, startDate, endDate, image } = this.state;
            let vacationPrice = +price;
            if (!image) {
                return this.props.popUpAlert({ alertType: "danger", msg: "You Must Upload An Image ", timeout: 5000 });
            }

            let formData = new FormData();
            const newVacation = { price: vacationPrice, destination, description, startVacationDate: startDate, endVacationDate: endDate }
            formData.append("image", image);
            formData.append('vacation', JSON.stringify(newVacation))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await axios.post(Config.serverUrl + "/api/vacations", formData, config)

            this.props.popUpAlert({ alertType: "success", msg: "successfully added Vacation", timeout: 5000 })
            setTimeout(() => {
                this.props.history.push('/admin-vacations')
            }, 2000);

        } catch (error) {
            this.props.popUpAlert({ alertType: "danger", msg: error.response.data.msg, timeout: 5000 });
        }

    };



    render() {


        return (

            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Add Vacation</h5>
                                <form onSubmit={(event) => this.onSubmit(event)} className="form-signin">
                                    <div className="form-label-group">
                                        <input type="text"
                                            id="inputDestination"
                                            className="form-control"
                                            placeholder="Destination"
                                            value={this.state.destination}
                                            onChange={(e) => this.onChange(e)}
                                            name='destination'
                                            required
                                            autoComplete="off"
                                            autoFocus />
                                        <label htmlFor="inputDestination">Destination </label>
                                    </div>
                                    <div className="form-label-group">
                                        <textarea
                                            id="inputDescription"
                                            className="form-control"
                                            rows={5}
                                            placeholder="Description"
                                            value={this.state.description}
                                            onChange={(e) => this.onChange(e)}
                                            maxLength={1000}
                                            name='description'
                                            required
                                            autoComplete="off"
                                            autoFocus />
                                        <label htmlFor="inputDescription"> </label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="number"
                                            id="inputPrice"
                                            className="form-control"
                                            placeholder="Price"
                                            max={10000}
                                            value={this.state.price}
                                            onChange={(e) => this.onChange(e)}
                                            name='price'
                                            required
                                            autoComplete="off"
                                            autoFocus />
                                        <label htmlFor="inputPrice">Price </label>
                                    </div>
                                    <label htmlFor="">Choose Start Vacation Date: </label>
                                    &nbsp;
                                    <input onChange={this.handleChangeStartDate} value={this.state.startDate}
                                        min={new Date().toISOString().split("T")[0]}
                                        max={this.state.endDate}
                                        required type="date" name="startTime" id="startTime" />
                                    <br />
                                    <label htmlFor="">Choose End Vacation Date: </label>
                                    &nbsp;&nbsp;
                                    <input onChange={this.handleChangeEndDate} value={this.state.endDate}
                                        min={this.state.startDate}
                                        required type="date" name="startTime" id="startTime" />

                                    <input onChange={this.onChangeImage} type="file" id="fileUploadInput" name="vacationImage" accept=".jpg,.png,.gif,.jpeg" />
                                    <label className="image-upload-label" htmlFor="fileUploadInput"><i className="fas fa-file-upload"></i> &nbsp; Choose Image</label>
                                    <span>{this.state.image ? this.state.image.name : ""}</span>
                                    <br /><br />

                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" >Add Vacation</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


interface LinkDispatchProps {
    popUpAlert?: (alert: Alert) => void;
    loadUser?: () => void;
    history?: any
}
const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
    popUpAlert: bindActionCreators(popUpAlert, dispatch),
    loadUser: bindActionCreators(loadUser, dispatch)
});
export default connect(
    null,
    mapDispatchToProps
)(AddVacation);
