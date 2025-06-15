
function guestTo(description, category, timeAdded){
    this.description = description;
    this.category = category;
    this.timeAdded = timeAdded;
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
     const inputC = document.getElementById("category").value;
    
    if (guestCome.guests.length >=10) {
        alert("Guest List is full");
        return;
    };
  
         if (inputF && inputL && inputE && inputA) {
        const guestDescription = `${inputF}, ${inputL}, ${inputE}, Age: ${inputA}, Category: ${inputC}`;
        const now = new Date().toLocaleString();
        const user = new guestTo(guestDescription, inputC, now);
        guestCome.addGuest(user);
        displayGuests();
        form.reset();
        
  
    }
    
})
function displayGuests(){
    guestList.innerHTML = "";
    guestCome.guests.forEach((user,index)=> {
        const li = document.createElement("li");
        li.innerHTML = `
        <span class="category-tag ${user.category.toLowerCase()}">${user.category}</span><br>
        <span style="text-decoration: 'none'}">
        ${user.description} <br>
        <strong>Added:</strong> ${user.timeAdded} <br>
        <strong>RSVP:</strong> ${user.done ? 'Attending' : 'Not Attending'}
        </span>
         <button onClick="toggleRSVP(${index})" class="toggle-rsvp">Toggle RSVP</button>
        <button onClick= "deleteUser(${index})" class="remove-user">Remove</button>
         <button onClick="editGuest(${index})" class="edit-user">Edit</button>
        
        `;
        guestList.appendChild(li);
    
    });

    
    window.toggleRSVP = function(index) {
        const user = guestCome.guests[index];
      
        user.done = !user.done;
        displayGuests();
    }
    window.deleteUser = function(index) {
        guestCome.removeGuest(index);
        displayGuests();
    }
     window.editGuest = function(index) {
        const guest = guestCome.guests[index];
        
         const parts = guest.description.split(',');

    const currentFirst = parts[0]?.trim();  
    const currentLast = parts[1]?.trim();   

    const newFirst = prompt("Enter new first name:", currentFirst);
    const newLast = prompt("Enter new last name:", currentLast);

        
        
             if (newFirst && newLast) {
        parts[0] = newFirst.trim();          
        parts[1] = ' ' + newLast.trim();      
        guest.description = parts.join(',');
        displayGuests();
        }
    }
}
console.log("we are connected ")