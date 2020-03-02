import React from 'react';

import LeftBar from "./components/LeftBar/LeftBar";
import Header from "./components/Header";
import Table from "./components/Table/Table";
import Loader from "./components/Loader/Loader";
import FullInfo from "./components/FullInfo/FullInfo";
import Search from "./components/Search/Search";
import {ModalAddRow} from "./components/Modal/ModalAddRow";

import ReactPaginate from 'react-paginate';
import _ from 'lodash';


class App extends React.Component {

    /**
     * States по умолчанию.
     *
     * @type {{isLoading: boolean, isLoad: boolean, sortDirection: string, data: [], sortedField: string, row: null}}
     * @description:{
     *     isLoading: флаг, указывающий, что идёт загрузка (для спиннера)
     *     isLoad: флаг, указывающий, что массив data пустой (что бы в map не передавался undefined вместо массива)
     *     sortDirection: направление сортировки по умолчанию
     *     sortField: поле сортировки по умолчанию
     *     row: строка по умолчанию пустая
     * }
     */

    state = {
        isLoading: false,
        isLoad: false,
        openAddRow: false,
        data: [],
        sortDirection: 'asc',
        sortedField: 'id',
        search: '',
        row: null,
        currentPage: 0,

        // данные для таблицы
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    };

    pageSize = 25; // выбор количества строк на одной странице

    /**
     * @description метод для получения данных с сервера
     * Отправляет data в стейты. Меняет стейт isLoading
     */

    getTableInfo = async (numberRows) => {
        const apiUrl = await fetch(`http://www.filltext.com/?rows=${numberRows}&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`);
        const data = await apiUrl.json(); // TODO: <-- Добавить catch и обработку ошибок

        this.setState({
            isLoading: false,
            data: _.orderBy(data, this.state.sortedField, this.state.sortDirection)
        })
    };

    /**
     * @description onSort - метод для сортировки таблицы.
     * В стейты передаём отсортированный столбец, поле для сортировки и меняет направление сортировки на противоположный
     * @param sortedField - поле таблицы для сортировки
     */
    onSort = sortedField => { // TODO: <=== реализовать стрелки
        const cloneData = this.state.data.concat();
        const sortDirection = this.state.sortDirection ===
        'asc'
            ? 'desc' // сначала последние
            : 'asc'; // сначала первые
        const orderedData = _.orderBy(cloneData, sortedField, sortDirection);

        this.setState({
            data: orderedData,
            sortDirection,
            sortedField
        });
    };

    /**
     *
     * @param numberRows количество записей, передаваемых в таблицу.
     */

    selectBaseHandler = numberRows => {
        this.setState({
            isLoading: true,
            isLoad: true
        });
        this.getTableInfo(numberRows);
    };

    onRowSelect = row => {
        this.setState({
            row
        })
    };

    // pagination and search

    pageChangeHandler = ({selected}) => (
        this.setState({currentPage: selected})
    );

    searchHandler = search => {
        this.setState({search, currentPage: 0})
    };

    getFilteredData() {
        const {data, search} = this.state;

        if (!search) {
            return data
        }
        let result = data.filter(item => {
            return (
                item["firstName"].toLowerCase().includes(search.toLowerCase()) ||
                item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
                item["email"].toLowerCase().includes(search.toLowerCase())
            );
        });
        if (!result.length) {
            result = this.state.data
        }
        return result
    }

    // отображать/не отображать форму добавления записи
    OpenAddRow = () => {    // открываем и закрываем форму добавления записи
        this.setState({openAddRow: !this.state.openAddRow})
    };

    /**
     * @description Обрабатываем кнопку "отправить"
     * добавляем в начало массива data стейты, потом обнуляем значения
     *
     */
    handleFormSubmit = e => {
        e.preventDefault();
        let data = this.state.data;
        data.unshift({
            'id': this.state.id,
            'firstName': this.state.firstName,
            'lastName': this.state.lastName,
            'email': this.state.email,
            'phone': this.state.phone
        });
        this.setState({
            data: data,
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        });
       // console.log('data after submit - ', this.state.data)
    };

    // вводим из инпутов в массив newData
    handleInputChange = e => {

        let input = e.target;
        let name = e.target.name;
        let value = input.value;

        this.setState({
            [name]: value
        });
    };


    render() {
        const pageSize = 50;
        // Проверяем загружены ли данные, если нет - таблицу не показываем, иначе передаётся undefined и возникает ошибка
        if (!this.state.isLoad) {
            return (<div>
                    <Header/>
                    <main>
                        <LeftBar
                            getInfo={this.selectBaseHandler}
                            addRowShow={this.OpenAddRow}
                            visible={this.state.isLoad}
                        />
                    </main>
                </div>
            )
        }
        const filteredData = this.getFilteredData();
        // для пагинации разбиваем массив data на количество страниц
        const displayData = _.chunk(filteredData, this.pageSize)[this.state.currentPage];
        const pageCount = Math.ceil(filteredData.length / pageSize);
        return (
            <div>
                <Header/>
                <main>
                    <LeftBar
                        getInfo={this.selectBaseHandler}
                        addRowShow={this.OpenAddRow}
                        visible={this.state.isLoad}
                    />
                    {
                        <div className="table-wrapper">
                            {    // table
                                (this.state.isLoading)
                                    ? <Loader/>
                                    :
                                    <React.Fragment>
                                        <Search
                                            onSearch={this.searchHandler}
                                        />
                                        {
                                            (this.state.openAddRow) ?
                                                <ModalAddRow
                                                    submitHandle={this.handleFormSubmit}
                                                    changeHandle={this.handleInputChange}
                                                />
                                                : null
                                        }
                                        <Table
                                            data={displayData}
                                            onSort={this.onSort}
                                            sortDirection={this.state.sortDirection}
                                            sortedField={this.state.sortedField}
                                            onRowSelect={this.onRowSelect}
                                        />
                                    </React.Fragment>
                            }
                            {    // pagination
                                this.state.data.length > pageSize
                                    ? <ReactPaginate
                                        previousLabel={'<'}
                                        nextLabel={'>'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={this.pageChangeHandler}
                                        containerClassName={'pagination'}
                                        subContainerClassName={'pages pagination'}
                                        activeClassName={'active'}
                                        forcePage={this.state.currentPage}
                                    /> : null
                            }
                            {   // full info проверяем isLoading что бы блок не отображался при новой загрузке таблицы
                                (this.state.row && (!this.state.isLoading)) ? <FullInfo person={this.state.row}/> : null
                            }
                        </div>
                    }
                </main>
            </div>
        )
    }

}

export default App;
