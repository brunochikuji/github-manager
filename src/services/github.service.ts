import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SearchUserParams, SearchUsersResult, User} from '../interfaces/github';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

    public apiUrl = 'https://api.github.com';
    public apiKey = '088d0ebb94c3efa4c9b9741216c4aa9f68570f9a';
    constructor(
        private http: HttpClient
    ) { }

    searchUsers(searchParams: SearchUserParams): Observable<SearchUsersResult> {
        const params: Array<string> = [];
        Object.keys(searchParams).forEach(param => {
            if (searchParams[param]) {
                params.push(`${param}=${searchParams[param]}`);
            }
        });
        return new Observable<SearchUsersResult>(observer => {
            this.http.get<SearchUsersResult>(
                `${this.apiUrl}/search/users?${new URLSearchParams(params.join('&'))}`).subscribe(
                    response => {
                        if (searchParams.page && searchParams.page > 1) {
                            response.previousPage = searchParams.page - 1;
                        }
                        const resultsPerPage = 30;
                        if (response.total_count && response.total_count > resultsPerPage) {
                            response.lastPage = Math.floor(response.total_count / resultsPerPage);
                            if (response.total_count % resultsPerPage !== 0) {
                                response.lastPage += 1;
                            }
                            if (!searchParams.page) {
                                response.nextPage = 2;
                            } else if (searchParams.page < response.lastPage) {
                                response.nextPage = searchParams.page + 1;
                            }
                        }
                        observer.next(response);
                    },
                error => {
                        observer.error(error);
                        observer.complete();
                    },
                    () => observer.complete()
            );
        });
    }

    getUser(userName: string): Observable<User> {
        return new Observable<User>(observer => {
            this.http.get<User>(
                `${this.apiUrl}/users/${userName}`).subscribe(
                userDetails => {
                    observer.next(userDetails);
                },
                error => {
                    observer.error(error);
                    observer.complete();
                },
                () => observer.complete()
            );
        });
    }

    get httpHeaders() {
        return {
            headers: {
                Authorization: `Basic ${this.apiKey}`
            }
        };
    }


}
