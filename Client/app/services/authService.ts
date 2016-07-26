import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Storage, LocalStorage, Events} from 'ionic-angular';

@Injectable()
export class AuthService {

    HAS_LOGGED_IN = 'demAppHasLoggedIn';
    storage = new Storage(LocalStorage);
    authUser;
    user: any;
    userCreate: any;
    users: any;

    constructor(private http: Http, private events: Events) {  
    }

    /* logged */
    hasLoggedIn() {
        return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
            return value;
        });
    }

    /* user */
    storeUser(user) {
        this.storage.set('demAppUser', JSON.stringify(user));
    }

    loadUser() {
        return this.storage.get('demAppUser').then((value) => {
            return JSON.parse(value);
        });
    }

    /* user creds */
    storeUserCredentials(token) {
        this.storage.set('demAppToken', token);   
    }
    
    
    loadUserCredentials() {
        return this.storage.get('demAppToken').then((value) => {
            return value;
        });
    }

    loadHeaders(){
        return this.loadUserCredentials().then((token) =>{
            var headers = new Headers();
            if(token){
                headers.append('Authorization', 'Bearer ' + token);
            }
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            return headers;
        });
    }
    
    destroyUserCredentials() {
        console.log('destroyUserCredentials called')
        this.storage.clear();
    }
    
    /* ---------------auth--------------- */
    authenticate(user) {
        var creds = "name=" + user.name + "&password=" + user.password;

        if (this.authUser){
            return Promise.resolve(this.authUser);
        }
        
        return new Promise(resolve => {
            this.loadHeaders().then((headers) => {
                this.http.post('http://localhost:3000/authenticate', creds, {headers: headers}).subscribe(data => {
                    if(data.json().success){
                        this.storage.set(this.HAS_LOGGED_IN, true);
                        this.storeUser(data.json().user);
                        this.storeUserCredentials(data.json().token);
                        this.events.publish('user:login', {
                            user: data.json().user
                        });
                        resolve(data.json());
                    }
                    else
                        resolve(false);
                },
                err => {
                    resolve(false);
                });
            });
        });
    }

    logout() {
        this.destroyUserCredentials();
        this.events.publish('user:logout');
    }

    /* ---------------create--------------- */
    registerUser(user) {
        var creds = "name=" + user.name + "&password=" + user.password + "&firstname=" + user.firstname + "&lastname=" + user.lastname;

        if (this.userCreate){
            return Promise.resolve(this.userCreate);
        }

        return new Promise(resolve => {
            this.loadHeaders().then((headers) => {
                this.http.post('http://localhost:3000/register', creds, {headers: headers}).subscribe(data => {
                    if(data.json().success){
                        this.storage.set(this.HAS_LOGGED_IN, true);
                        this.storeUser(data.json().user);
                        this.storeUserCredentials(data.json().token);
                        this.events.publish('user:login', {
                            user: data.json().user
                        });
                        resolve(data.json());
                    }
                    else
                        resolve(false);
                },
                err => {
                    resolve(false);
                });
            });
        });
    }



    createUser(user) {
        var creds = "name=" + user.name + "&password=" + user.password + "&firstname=" + user.firstname + "&lastname=" + user.lastname;

        if (this.userCreate){
            return Promise.resolve(this.userCreate);
        }

        return new Promise(resolve => {
            this.loadHeaders().then((headers) => {
                this.http.post('http://localhost:3000/', creds, {headers: headers}).subscribe(data => {
                    if(data.json().success){
                        this.storage.set(this.HAS_LOGGED_IN, true);
                        this.events.publish('user:event', {
                        });
                        resolve(data.json());
                    }
                    else
                        resolve(false);
                });
            },
            err => {
                resolve(false);
            });
        });
    }      


    /* ---------------get--------------- */
    getUser(user) {

        if (this.user) {
            return Promise.resolve(this.user);
        }

        return new Promise(resolve => {
            this.loadHeaders().then((headers) => {
                this.http.get('http://localhost:3000/' + user.name , {headers: headers}).subscribe(data => {
                    if(data.json().success)
                        resolve(data.json());
                    else
                        resolve(false);
                });
            });
        })
    }

    getUsers() {    

        if (this.users) {
            return Promise.resolve(this.users);
        }

        return new Promise(resolve => {
            this.loadHeaders().then((headers) => {
                this.http.get('http://localhost:3000/' , {headers: headers}).subscribe(data => {
                    if(data.json().success){
                        resolve(data.json());
                    }
                    else
                        resolve(false);
                });
            });
        });       
    }


    /* ---------------update--------------- */
    updateUser(user, detail){

        var creds = "&detailName=" + detail.name + "&detailValue=" + detail.value;

        return new Promise(resolve => {
            this.loadHeaders().then((headers) => {
                this.http.put('http://localhost:3000/' + user.name + '/edit', creds, {headers: headers}).subscribe(data => {
                    if(data.json().success){
                        /* store updated user self */
                        if(user.name === data.json().user.name){
                            this.storeUser(data.json().user);
                        }
                        this.events.publish('user:update', {
                        });
                        resolve(true);
                    }
                    else
                        resolve(false);
                },
                err => {
                    resolve(false);
                });
            });
        });
    }  

    /* ---------------delete--------------- */
    deleteUser(user){

        return new Promise(resolve => {
            this.loadHeaders().then((headers) => {
                this.http.delete('http://localhost:3000/' + user.name , {headers: headers}).subscribe(data => {
                    if(data.json().success){
                        this.events.publish('user:event', {
                        });
                        resolve(true);
                    }
                    else
                        resolve(false);
                });
            });
        });
    }

}