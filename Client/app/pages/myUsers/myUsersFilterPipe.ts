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
		return users.filter(user =>
			(user.name.toLowerCase().indexOf(query) > -1 ||
			user.firstname.toLowerCase().indexOf(query) > -1 ||
			user.lastname.toLowerCase().indexOf(query) > -1
			));
	}
}