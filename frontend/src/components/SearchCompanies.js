
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from 'html-react-parser';
import { useNavigate } from "react-router-dom";


const SearchCompanies = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [responseData, setResponseData] = useState("");
    const [selectedTarget, setSelectedTarget] = useState("");
    const navigate = useNavigate();
    const CONST_NO_COMPANY = "No Company found";

    window.addEventListener('click', function (e) {
        try {
            if (document.getElementById('inputText').contains(e.target) ||
                document.getElementById('result').contains(e.target) ||
                document.getElementById('push').contains(e.target)) {
            } else {
                hideAutoSuggestion();
               
            }
        } catch (err) {
        }
    });

    const handleItemClick = (e) => {

        if (e.target.innerText !== CONST_NO_COMPANY) {
            setSearchQuery(e.target.innerText);
            setSelectedTarget(e.target);
        }
        hideAutoSuggestion();
    };

    const hideAutoSuggestion = () => {
        if (document.querySelector(".main-div") &&
            !document.querySelector(".main-div").classList.contains("is-hidden")) {
            document.querySelector(".main-div").classList.add("is-hidden");
        }
    }

    const showAutoSuggestion = () => {
        if (document.querySelector(".main-div") &&
            document.querySelector(".main-div").classList.contains("is-hidden")) {
            document.querySelector(".main-div").classList.remove("is-hidden");
        }
    }

    const insertData = async () => {

        if (selectedTarget && selectedTarget.id) {
            var id = selectedTarget.id;
            var cin = id.split("/")[2];

            try {

                const body = { name: selectedTarget.innerText, cin: cin };
                await fetch("http://localhost:5000/data", {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(body),
                });
                navigate("/companies");
            } catch (e) {
            }
        }
    }

    useEffect(() => {
        const getData = setTimeout(() => {
            searchQuery === "" ?
                setResponseData("") :
                axios
                    .post("https://www.zaubacorp.com/custom-search", {
                        search: searchQuery,
                        filter: "company",
                    })
                    .then((response) => {
                        setResponseData(response.data);
                    }).catch((err) => {
                    });
        }, 175);

        return () => clearTimeout(getData);

    }, [searchQuery]);

    return (

        <div className="container">
            <div id="newtask">
                <input
                    type="text"
                    id="inputText"
                    autocomplete="off"
                    placeholder="Search companies.."
                    onKeyDown={showAutoSuggestion}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery} />

                <button id="push" onClick={insertData}>
                    SUBMIT
                </button>
            </div>

            <div id="newtask">
                {responseData.length > 0 &&
                    (
                        <div id="result" className="main-div" onClick={handleItemClick}>
                            {parse(responseData)}
                        </div>
                    )}
            </div>

        </div>
    )
}

export default SearchCompanies