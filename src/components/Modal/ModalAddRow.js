import React from 'react';
import './ModalAddRow.css';

class ModalAddRow extends React.Component {

    render() {
        return (
            <div className="add-row">
                <form onSubmit={this.props.submitHandle}>

                        {/*<label>id</label> <br/>*/}
                        <input
                            className="add-row-input"
                            type="text"
                            name="id"
                            onChange={this.props.changeHandle}
                            placeholder="... id ..."
                            required
                        />


                    {/*<label>firstName</label>*/}
                    <input
                        className="add-row-input"
                        type="text"
                        name="firstName"
                        onChange={this.props.changeHandle}
                        placeholder="... firstname ..."
                        required
                    />
                    {/*<label>lastName</label>*/}
                    <input
                        className="add-row-input"
                        type="text"
                        name="lastName"
                        onChange={this.props.changeHandle}
                        placeholder="... lastName ..."
                        required
                    />
                    {/*<label>email</label>*/}
                    <input
                        className="add-row-input"
                        type="email"
                        name="email"
                        onChange={this.props.changeHandle}
                        placeholder="... email ..."
                        required
                    />
                    {/*<label>phone</label>*/}
                    <input
                        className="add-row-input"
                        type="tel"
                        name="phone"
                        onChange={this.props.changeHandle}
                        placeholder="... phone ..."
                        required
                    />

                    {

                    }

                        <button
                            className="add-row-button"
                        > Добавить
                        </button>


                </form>

            </div>
        )
    }
}

export {ModalAddRow};




