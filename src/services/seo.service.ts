import { Injectable } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

    constructor(
        private title: Title
    ) { }

    updateTitle(title: string) {
        this.title.setTitle(`${title} | GitHub Manager`);
    }

}
