import React, { useEffect, useState } from "react";

import classes from './votingPage.module.css';
import logo from '../../assets/images/logo.png';

import NavList from "../navList/NavList";
import SearchBar from "../searchBar/SearchBar";
import VotingBlock from "../votingBlock/VotingBlock";

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { themeDarkCreator } from "../../store/themeReducer";
import { themeLightCreator } from "../../store/themeReducer";

const Voting = () => {

    const themeAct = useSelector(state => state.theme.themeActive);
    const dispatch = useDispatch();

    if ( themeAct === true ) {
        dispatch( themeDarkCreator() );
    }
    else {
        dispatch( themeLightCreator() );
    }

    const primaryColor = useSelector(state => state.theme.themeColorPrimary);
    const secondaryColor = useSelector(state => state.theme.themeColorSecondary);

    const bgDark = useSelector(state => state.theme.customBg);

    return (
        <div className={classes.votingInner}>
            <div className={classes.votingPrimary} >
                <div className="logo">
                    <img src={logo} alt="This project's logo" />
                </div>
                <h1 className="primaryTitle" style={ {color: primaryColor} }>
                    Hi guest!
                    <span className="primarySubtitle" style={ {color: secondaryColor} }> Welcome to my 2023 Front-end page </span>
                </h1>
                <h2 className="secondaryTitle" style={ {color: primaryColor} }>
                    Lets start using The Rick and Morty API
                </h2>
                <NavList></NavList>
            </div>
            <div className={classes.votingSecondary}>
                <SearchBar></SearchBar>
                <div className={ classes.votingSecondaryMain } style = { { backgroundColor: bgDark } }>
                    <VotingBlock></VotingBlock>
                </div>
            </div>
        </div>
    )
}

export default Voting;