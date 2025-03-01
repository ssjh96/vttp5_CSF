export interface Member 
{
    name: string;
    email: string;
    phone: string;
    hobbies: string[];    
}

export class MemberClass
{
    name: string;
    email: string;
    phone: string;
    hobbies: string[];    

    constructor(name: string, email: string, phone: string, hobbies: string[]) 
    {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.hobbies = hobbies;
    }
}

