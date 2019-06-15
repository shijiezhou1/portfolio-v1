module.exports = {
    firstName: "James",
    lastName: "Bond",
    getName: (first, last) => {
        var full = `${first} ${last}`;
        return full;
    },
    getNameFromObj: () => {
        console.log("called");
        console.log(Object.value(""));
        return `${this.firstName} ${this.lastName}`;
    },
};

const first = "shijie";
const last = "zhou";

const fullname = () => {
    return first + " " + last;
};

fullname();
