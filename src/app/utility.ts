import { Injectable } from '@angular/core';


export class Utility {
    constructor() { }

    static favouriteKey = "FAVOURITE"
    static favoriteList = [];
    static getFavouriteList() {
        let favList = localStorage.getItem(this.favouriteKey);
    if (favList)
            return JSON.parse(favList);
        return this.favoriteList;

    }

    static setFavourite(favList) {
      localStorage.setItem(this.favouriteKey, JSON.stringify(favList));
    }
    

}
