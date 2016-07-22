import {Pipe, PipeTransform} from '@angular/core';
import {MyUsers} from './myUsers';

@Pipe({
	name: 'myUsersFilter',
	pure: false
})
export class MyUsersFilterPipe implements PipeTransform {
	transform(users: any[], params: string[]) {
		if(users == null) { return null; }
		if (!params[0]) return users;
		let query = params[0] ? params[0].toLowerCase() : null;
		var paramsT = [];
		for(var i = 0; i < params.length; i++){
			paramsT.push(params[i]);
		}
		var paramsC = paramsT.join('');
		let querySplitted= paramsC.split(':',2);
		if(querySplitted[0] === 'authority'){
			return users.filter(user => 
					(user.authority === querySplitted[1])
				);
		}
		return users.filter(user =>
			(user.name.toLowerCase().indexOf(query) > -1 ||
				user.firstname.toLowerCase().indexOf(query) > -1 ||
				user.lastname.toLowerCase().indexOf(query) > -1
				)
			);
	}
}