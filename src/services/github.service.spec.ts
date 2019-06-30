import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {USER, USER_SEARCH_RESULTS} from '../mocks/github-mocks';

import {GithubService} from './github.service';

describe('GithubService', () => {
    let service: GithubService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [HttpClientTestingModule]});
        service = TestBed.get(GithubService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('search users', () => {
        service.searchUsers({q: 'bruno chikuji'}).subscribe(
            result => {
                expect(result.total_count).toEqual(773);
                expect(result.nextPage).toEqual(2);
                expect(result.previousPage).toEqual(undefined);
                expect(result.lastPage).toEqual(26);
                expect(result.items[0].login).toEqual('brunochikuji');
            },
            () => {throw new Error('This get not return error'); });
        const req = httpTestingController.expectOne('https://api.github.com/search/users?q=bruno+chikuji');
        req.flush(USER_SEARCH_RESULTS);
    });

    it('search users without query search', () => {
        service.searchUsers({}).subscribe(
            () => {throw new Error('This get return error'); },
            error => {
                expect(error.status).toEqual(422);
            });
        const req = httpTestingController.expectOne('https://api.github.com/search/users?');
        req.flush({
            'message': 'Validation Failed',
            'errors': [
                {
                    'resource': 'Search',
                    'field': 'q',
                    'code': 'missing'
                }
            ],
            'documentation_url': 'https://developer.github.com/v3/search'
        }, { status: 422, statusText: 'Unprocessable Entity' });
    });

    it('get user', () => {
        service.getUser('brunochikuji').subscribe(user => {
            expect(user.name).toEqual('Bruno Chikuji');
            expect(user.type).toEqual('User');
        });
        const req = httpTestingController.expectOne('https://api.github.com/users/brunochikuji');
        req.flush(USER);
    });

    it('get user not found', () => {
        const errorMessage = {
            'message': 'Not Found',
            'documentation_url': 'https://developer.github.com/v3/users/#get-a-single-user'
        };
        service.getUser('brunochikuji12').subscribe(
            () => {throw new Error('This get return error'); },
            error => {
                expect(error.status).toEqual(404);
                expect(error.error).toEqual(errorMessage);
            });
        const req = httpTestingController.expectOne('https://api.github.com/users/brunochikuji12');
        req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });

});
