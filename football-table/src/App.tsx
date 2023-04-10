import React, {useEffect, useState} from 'react';
import './App.css';
import {v1} from "uuid";


export type ResultType = "win" | "lose" | "draw"
export type teamsType = {
    id: number,
    teamName: string,
    pts: number
}
export type matchType = {
    id: string,
    homeTeam: string,
    guestTeam: string,
    homeTeamGoals: number,
    guestTeamGoals: number,
    homeResult: ResultType
}

function App() {

    const [teams, setTeams] = useState<teamsType[]>([
        {id: 1, teamName: "Barcelona", pts: 6},
        {id: 2, teamName: "Real Madrid", pts: 1},
        {id: 3, teamName: "Athletico", pts: 1}
    ]);

    const [matches, setMatches] = useState<matchType[]>([
        {
            id: v1(),
            homeTeam: "Barcelona",
            guestTeam: "Real Madrid",
            homeTeamGoals: 4,
            guestTeamGoals: 0,
            homeResult: "win"
        },
        {
            id: v1(),
            homeTeam: "Athletico",
            guestTeam: "Barcelona",
            homeTeamGoals: 1,
            guestTeamGoals: 2,
            homeResult: "lose"
        },
        {
            id: v1(),
            homeTeam: "Athletico",
            guestTeam: "Real Madrid",
            homeTeamGoals: 1,
            guestTeamGoals: 1,
            homeResult: "draw"
        }
    ]);


    const [homeTeam, setHomeTeam] = useState<string>("")
    const [guestTeam, setGuestTeam] = useState<string>("")

    const [homeTeamGoals, setHomeTeamGoals] = useState<number>(0)
    const [guestTeamGoals, setGuestTeamGoals] = useState<number>(0)

    const [error, setError] = useState<boolean>(false)

    const selectedTeam = teams.map((e, index) => {
        return <option key={index} value={e.teamName}>{e.teamName}</option>
    });

    const addNewMatchResult = () => {
        const newMatchResult: matchType = {
            id: v1(),
            homeTeam: homeTeam,
            guestTeam: guestTeam,
            homeTeamGoals: homeTeamGoals,
            guestTeamGoals: guestTeamGoals,
            homeResult: homeTeamGoals > guestTeamGoals ? "win" : guestTeamGoals > homeTeamGoals ? "lose" : "draw"
        };
        const copyMatches = [...matches, newMatchResult];
        setMatches(copyMatches);
    }
    useEffect(() => {
        updateScore();
    }, [matches]);

    const updateScore = () => {
        let updatedTeams: teamsType[];
        const copyMatches = matches.map(e => ({...e}));
        const lastMatch = copyMatches[matches.length - 1];
        if (lastMatch.homeResult === "win") {
            updatedTeams = teams.map(e => e.teamName === homeTeam ? {...e, pts: e.pts.valueOf() + 3} : e);
        } else if (lastMatch.homeResult === "lose") {
            updatedTeams = teams.map(e => e.teamName === guestTeam ? {...e, pts: e.pts.valueOf() + 3} : e);
        } else {
            updatedTeams = teams.map(e => e.teamName === guestTeam || e.teamName === homeTeam ? {
                ...e,
                pts: e.pts.valueOf() + 1
            } : e);
        }
        setTeams(updatedTeams);
    }

    const matchesList = matches.map((e) => {
        //TODO: implement date picker to add to matchList and new match
        const matchDate = new Date();
        const date = matchDate.toLocaleString("en-US", {month: "short", day: "numeric"})
        return (
            <li key={e.id}>
                <span>{date}</span> {e.homeTeam}&nbsp;
                <span>{e.homeTeamGoals} - {e.guestTeamGoals}</span>&nbsp;{e.guestTeam}
            </li>
        )
    })
    const tableScore = teams.map(e => {
        return (
            <>
                <span>{e.teamName}</span><span>{e.pts}</span>

            </>
        )
    })

    return (
        <div className="App">
            <div>
                <select name="home-team"
                        id="home-team"
                        value={homeTeam}
                        onChange={(event) => {
                            setHomeTeam(event.target.value)
                        }}
                >
                    {selectedTeam}
                </select>
                <input className={"score_type"}
                       type="number"
                       onChange={(event) => {
                           setHomeTeamGoals(+(event.target.value))
                       }}
                />

                <input className={"score_type"}
                       type="number"
                       onChange={(event) => {
                           setGuestTeamGoals(+(event.target.value))
                       }}
                />
                <select name="home-team"
                        id="guest-team"
                        value={guestTeam}
                        onChange={(event) => {
                            setGuestTeam(event.target.value)
                        }}
                >
                    {selectedTeam}
                </select>
                <button onClick={addNewMatchResult}>+</button>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                {matchesList}
            </div>
            {/*{//TODO: do the fucking table}*/}
            {tableScore}
        </div>
    );
}

export default App;
