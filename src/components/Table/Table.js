import React from 'react';
import './Table.css';

export default props => (

    <div>
        <div className="table-wrapper">
            <table className="main-table">
                <thead>
                <tr>
                    <th onClick={props.onSort.bind(null, 'id')}>
                        id {props.sortedField === 'id' ?
                        <small>{props.sortDirection}</small> : null}
                    </th>
                    <th
                        onClick={props.onSort.bind(null, 'firstName')}>
                        First Name {props.sortedField === 'firstName' ?
                        <small>{props.sortDirection}</small> : null}
                    </th>
                    <th onClick={props.onSort.bind(null, 'lastName')}>
                        Last Name {props.sortedField === 'lastName' ?
                        <small>{props.sortDirection}</small> : null}
                    </th>
                    <th onClick={props.onSort.bind(null, 'email')}>
                        email {props.sortedField === 'email' ?
                        <small>{props.sortDirection}</small> : null}
                    </th>
                    <th onClick={props.onSort.bind(null, 'phone')}>
                        phone number {props.sortedField === 'phone' ?
                        <small>{props.sortDirection}</small> : null}
                    </th>
                </tr>
                </thead>

                <tbody>

                {props.data.map(item => (
                    <tr key={item.id + Math.floor((Math.random() * 999999))}
                        onClick={props.onRowSelect.bind(null, item)}>
                        <td>{item.id}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    </div>


)

