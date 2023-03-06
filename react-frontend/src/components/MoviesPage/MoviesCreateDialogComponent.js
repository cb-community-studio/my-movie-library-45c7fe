
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';


 
const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const MoviesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        set_entity({})
    },[props.show])
    const onSave = async () => {
        let _data = {
            title: _entity.title,
            genre: _entity.genre,
            language: _entity.language,
            date: _entity.date,
            duration: _entity.duration,
            rating: _entity.rating

        };

        setLoading(true);
        try {
            const result = await client.service("movies").create(_data);
            props.onHide();
            props.alert({ type: "success", title: "Create", message: "Created successfully" });
            props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="movies-create-dialog-component">
                <div>
                    <p className="m-0" >Title:</p>
                    <InputText className="w-full mb-3" value={_entity?.title} onChange={(e) => setValByKey("title", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Genre:</p>
                    <InputText className="w-full mb-3" value={_entity?.genre} onChange={(e) => setValByKey("genre", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Language:</p>
                    <InputText className="w-full mb-3" value={_entity?.language} onChange={(e) => setValByKey("language", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Release Date:</p>
                    <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={_entity?.date} onChange={ (e) => setValByKey("date", e.target.value)} showTime ></Calendar>
                </div>
                <div>
                    <p className="m-0" >Duration (Minutes):</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.duration} onChange={(e) => setValByKey("duration", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Rating:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.rating} onChange={(e) => setValByKey("rating", e.target.value)}  />
                </div>


                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    //
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(MoviesCreateDialogComponent);
// createDialog_code.template