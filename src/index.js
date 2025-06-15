function guestTo(description){
    this.description = description;
    this.done = false;
};
guestTo.prototype.markDone = function(){
    this.done = true;
};
guestTo.prototype.markUndone = function(){
    this.done = false;
};
function guestToCome(){
    this.guests = [];
};
guestToCome.prototype.addGuest= function(user) {
    this.guests.push(user);
};
guestToCome.prototype.removeGuest = function(index){
    this.guests.splice(index,1);
}
const guestCome= new guestToCome();
const guestList = document.getElementById("guestlist");
const form = document.getElementById("guest")
form.addEventListener("submit", function(event){
    event.preventDefault();
    const inputF = document.getElementById("fname").value.trim();
    const inputL = document.getElementById("lname").value.trim();
    const inputE = document.getElementById("email").value.trim();
    const inputA = document.getElementById("age").value.trim();

    
    if (guestCome.guests.lenght >=10) {
        alert("Guest List is full");
        return;
    };
   // if(inputF && inputL && inputE && inputA) {
        // const user = {
        //     firstName: inputF,
        //     lastName:inputL,
        //     email: inputE,
        //     age: inputA
        // };
         if (inputF && inputL && inputE && inputA) {
        const guestDescription = `${inputF} ${inputL}, ${inputE}, Age: ${inputA}`;
        const user = new guestTo(guestDescription);
        guestCome.addGuest(user);
        displayGuests();
        form.reset();
        //  guestCome.addGuest(new guestTo(`${user.firstName} ${user.lastName}, ${user.email}, Age: ${user.age}`));
        // displayGuests();
        // document.getElementById("guest").reset();
    } else {
        alert("Please fill in all fields.");
    }
    
})
function displayGuests(){
    guestList.innerHTML = "";
    guestCome.guests.forEach((user,index)=> {
        const li = document.createElement("li");
        li.innerHTML = `
        <span style="text-decoration: ${user.done ? 'none' : 'none'}">
        ${user.description}
        <strong>RSVP:</strong> ${user.done ? 'Attending' : 'Not Attending'}
        </span>
         <button onClick="toggleRSVP(${index})">Toggle RSVP</button>
        <button onClick= "deleteUser(${index})">Remove</button>

        `;
        guestList.appendChild(li);
    });
    window.toggleRSVP = function(index) {
        const user = guestCome.guests[index];
        //user.done ? user.markDone() : user.markUNdone();
        user.done = !user.done;
        displayGuests();
    }
    window.deleteUser = function(index) {
        guestCome.removeGuest(index);
        displayGuests();
    }
}