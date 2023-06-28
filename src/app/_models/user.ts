export class User {
    uid?: string;
    email?: string;
    authdata?: string;
	tokenJWT?: string;
	
	constructor(uid: string, email: string){
		this.uid = uid;
		this.email = email;
	}
}