import React from "react";
import {mount, redirect, route, map} from "navi";
import Home from "../pages/Home";
import SimpleStorage from "../pages/SimpleStorage";
import CoinFlip from "../pages/CoinFlip";
import Lender from "../pages/Lender";

const home = {title: "Home", view: <Home/>}

export default mount({

    '/': route(home),
    
    '/SimpleStorage' :
        map((req, ctx) => {
            if (ctx.web3obj === undefined || ctx.web3obj.web3 === null) {
                return route(home);
            } else {
                return route({
                    title: "Simple Storage",
                    view: <SimpleStorage />
                });
            }
    }),
    
    '/CoinFlip' :
        route({
            title: "Coin Flip Game",
            view: <CoinFlip />
        }),
    
    
    '/Lender' :
        map((req, ctx) => {
            if (ctx.web3obj === undefined || ctx.web3obj.web3 === null) {
                return route(home);
            } else {
                return route({
                    title: "Lender",
                    view: <Lender/>
                });
            }
        })
});

