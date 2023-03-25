import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from './breedsPage.module.css';

import { v4 as uuidv4 } from 'uuid';
import { getNewData } from "../../asyncAction/data";
import { newApiDataCreator } from "../../store/dataReducer";
import { counterCreator } from "../../store/breedsReducer";

import { themeDarkCreator } from "../../store/themeReducer";
import { themeLightCreator } from "../../store/themeReducer";

// Добавьте это в ваш файл с компонентом
// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);

const Breeds = () => {

    const counterState = useSelector(state => state.breeds.counter);
    const newApiData = useSelector(state => state.data.apiDataNew);
    const primaryColor = useSelector(state => state.theme.themeColorPrimary);

    const themeAct = useSelector(state => state.theme.themeActive);

    const dispatch = useDispatch();

    if ( themeAct === true ) {
        dispatch( themeDarkCreator() );
    }
    else {
        dispatch( themeLightCreator() );
    }

    function useLoadData() {
        dispatch(counterCreator(1));
        fetch(`https://rickandmortyapi.com/api/character/?page=${counterState}`)
            .then(res => res.json())
            .then(data => {
                data.results.forEach(element => {
                    dispatch(newApiDataCreator(element));
                });
            })
    }

    return (
        <div style = { { color: primaryColor } }>
            breeds page! You can see all characters here!
            <div className={classes.breedsList}>
                {
                    newApiData.map(elData =>
                        <div
                            className={classes.breedsItem}
                            key={uuidv4()}>
                            <div>
                                <img src={elData.image} />
                            </div>
                            <div style = { { color: primaryColor } }> {elData.name} </div>
                        </div>
                    )
                }
            </div>

            <button
                onClick={useLoadData}
                className={classes.loadMore} > load more </button>
        </div>
    )
}

export default Breeds;