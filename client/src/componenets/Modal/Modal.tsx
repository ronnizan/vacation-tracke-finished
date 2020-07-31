import React, { Component, ChangeEvent } from 'react'
import 'react-responsive-modal/styles.css';
import { Modal as ReactModal } from 'react-responsive-modal';
import './Modal.css'
import axios from 'axios';
import setAuthToken from '../../utills/setAuthToken';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../redux/types/auth/auth-actions-types';
import { bindActionCreators } from 'redux';
import { popUpAlert } from '../../redux/actions/alert-actions';
import { Alert } from '../../redux/types/alert/alert-type';
import { connect } from 'react-redux';
import { Config } from '../../config';
import { VacationModel } from '../../models/vacation-model';
import { loadUser, refreshPage } from '../../redux/actions/auth-actions';



interface ModalProps {
    showModal: boolean;
    vacationId: number;
    closeModal: () => void;


}

interface ModalState {
    image: any
    destination: string;
    description: string;
    price: string;
    startDate: string;
    endDate: string;
    imageFileName: string
}

type Props = LinkDispatchProps & ModalProps;


class Modal extends Component<Props, ModalState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            image: undefined,
            destination: "",
            description: "",
            price: "",
            startDate: "",
            endDate: "",
            imageFileName: "",
        }

    }

    componentDidMount = async () => {
        try {
            this.props.loadUser();

            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }
            const res = await axios.get<VacationModel>(Config.serverUrl + "/api/vacations/get-one-vacation/" + this.props.vacationId);
            const vacation = res.data;

            //format date for correct value
            let receivedVacationStartDate = new Date(vacation.startVacationDate);
            receivedVacationStartDate.setDate(receivedVacationStartDate.getDate() + 1);
            let startVacationDate = receivedVacationStartDate.toISOString().split("T")[0];
            let receivedVacationEndDate = new Date(vacation.endVacationDate);
            receivedVacationEndDate.setDate(receivedVacationEndDate.getDate() + 1);
            let endVacationDate = receivedVacationEndDate.toISOString().split("T")[0];
            this.setState({
                destination: vacation.destination,
                description: vacation.description,
                price: vacation.price.toString(),
                startDate: startVacationDate,
                endDate: endVacationDate,
                imageFileName: vacation.imageFileName
            })

        } catch (error) {
            this.props.popUpAlert({ alertType: "danger", msg: error.response.data.msg, timeout: 5000 });

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

    };

    private onChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    };

    private onSubmit = async () => {
        try {
            let { destination, description, price, startDate, endDate, imageFileName } = this.state;
            let vacationPrice = +price;
            let formData = new FormData();
            const newVacation = { price: vacationPrice, destination, description, startVacationDate: startDate, endVacationDate: endDate, imageFileName, vacationId: this.props.vacationId }
            if (this.state.image) {
                formData.append("image", this.state.image);
            }

            formData.append('vacation', JSON.stringify(newVacation))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.patch(Config.serverUrl + "/api/vacations/update", formData, config);

            this.props.popUpAlert({ alertType: "success", msg: res.data.msg, timeout: 5000 })
            this.props.refreshPage();

        } catch (error) {
            this.props.popUpAlert({ alertType: "danger", msg: error.response.data.msg, timeout: 5000 });
        }

    };

    render() {
        return (
            <>

                <ReactModal open={this.props.showModal} onClose={this.props.closeModal} center
                    classNames={{
                        overlay: 'customOverlay',
                        modal: 'customModal',
                    }}>

                    <h5 className="card-title text-center">Edit Vacation:</h5>
                    <form onSubmit={() => { this.props.closeModal(); this.onSubmit(); }}>
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
                        <span className="uploaded-image-name" >{this.state.image ? this.state.image.name + " - Selected Image" : ""}</span><br />
                        <div className="current-img-container">
                            <p>Current Image:  </p>
                            <img className="current-img" src={window.location.origin + "/assets/images/" + this.state.imageFileName} alt="" />

                        </div>

                        <button className="btn btn-lg btn-primary btn-block text-uppercase" >Edit Vacation</button>
                    </form>
                </ReactModal>
            </>
        )
    }
}
interface LinkDispatchProps {
    popUpAlert?: (alert: Alert) => void;
    refreshPage?: () => void;
    loadUser?: () => void;

}
const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
    popUpAlert: bindActionCreators(popUpAlert, dispatch),
    refreshPage: bindActionCreators(refreshPage, dispatch),
    loadUser: bindActionCreators(loadUser, dispatch)
});
export default connect(
    null,
    mapDispatchToProps
)(Modal);