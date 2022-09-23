import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const CONST_ITEM_PER_PAGE = 5;

function Items({ currentItems }) {
    return (
        <>
            {currentItems && currentItems.map((item) => (
                <tr key={item.cin}>
                    <td className="col-cin">{item.cin}</td>
                    <td>{item.name}</td>
                </tr>
            ))}
        </>
    );
}

function FetchCompanies() {

    const [currentItems, setCurrentItems] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const repsonse = await fetch("http://localhost:5000/data")
            const jsonData = await repsonse.json();
            setData(jsonData);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    const gotoPrevPage = () => {
        navigate(-1);
    }

    useEffect(() => {
        const endOffset = itemOffset + CONST_ITEM_PER_PAGE;
        setCurrentItems(data.slice(itemOffset, endOffset));
        // setPageCount(Math.ceil(data.length / CONST_ITEM_PER_PAGE));
    }, [data, itemOffset, CONST_ITEM_PER_PAGE]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * CONST_ITEM_PER_PAGE) % data.length;
        setItemOffset(newOffset);
    };

    return (
        <div>
            <div className='table-data'>
                <button className='add-company' onClick={gotoPrevPage}>COMPANY +</button>
                <div className="table-parent">
                    <table>
                        <thead>
                            <tr>
                                <th className="col-cin">CIN</th>
                                <th>Name</th>
                            </tr>
                        </thead>

                        <tbody>
                            <Items currentItems={currentItems} />
                        </tbody>
                    </table>
                </div>
            </div>

            <ReactPaginate
                previousLabel="previous"
                nextLabel="next"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={Math.ceil(data.length / 5)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
            />
        </div>
    );
}

export default FetchCompanies;
