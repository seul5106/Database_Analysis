class Member{
    constructor(name, state) {
        this.name = name;
        this.state = state
    }

    getName(){
        return this
    }
}

const date = new Date();
const member = new Member("한슬", 123);


console.log(member.getName());