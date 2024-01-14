import "./PioneersList.sass"
import SearchBar from "../../components/SearchBar/SearchBar";
import React, {useEffect, useState} from "react";
import PioneerCard from "./PioneerCard/PioneerCard";
import {iPioneersMock, requestTime} from "../../utils/consts";
import {Pioneer} from "../../utils/types";
import {FaSearch} from "react-icons/fa";

const PioneersList = () => {

    const [Pioneers, setPioneers] = useState<Pioneer[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchPioneers = async () => {

        try {

            const response = await fetch(`http://localhost:8000/api/pioneers/search?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const raw = await response.json()
            const pioneers: Pioneer[] = raw["pioneers"]

            setPioneers(pioneers)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true)
        setPioneers(iPioneersMock.filter(pioneer => pioneer.name.toLowerCase().includes(query)))

    }

    useEffect(() => {
        searchPioneers()
    }, [])

    const cards = Pioneers.map(pioneer  => (
        <PioneerCard pioneer={pioneer} key={pioneer.id} isMock={isMock}/>
    ))

    const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault()
        searchPioneers()
    }

    return (
        <div className="cards-list-wrapper" >

            <div className="top">

                <h2>Поиск первооткрывателей</h2>

                <form className="search-form-wrapper" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} />

                    <button type="submit">
                        <FaSearch className={"search-icon"}/>
                    </button>

                </form>
            </div>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default PioneersList;