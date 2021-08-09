$(document).ready(function () {

        fillCurrentUser();

        async function fillCurrentUser() {
            let responseCurrentUser = await fetch("http://localhost:8080/user/current");
            let user = await responseCurrentUser.json();
            let roles = "";
            for (let i = 0; i < user.roles.length; i++) {
                roles += user.roles[i].name + " ";
            }
            $("#company").text(user.username + " with roles: " + roles);
            fillTable(user);
        }

        function fillTable(user){
            let tableBody = document.getElementsByTagName("tbody")[0];
            let row = tableBody.insertRow();
            let cellId = row.insertCell();
            let cellUsername = row.insertCell();
            let cellFirstName = row.insertCell();
            let cellLastName = row.insertCell();
            let cellActivity = row.insertCell();
            let cellRoles = row.insertCell();
            cellId.innerHTML = user.id;
            cellUsername.innerHTML = user.username;
            cellFirstName.innerHTML = user.firstName;
            cellLastName.innerHTML = user.lastName;
            cellActivity.innerHTML = user.activity;
            let roles = "";
            for (let k = 0; k < user.roles.length; k++) {
                roles += user.roles[k].name + " ";
            }
            cellRoles.innerHTML = roles;
        }

    }
)