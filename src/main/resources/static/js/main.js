$(document).ready(function () {

        class User {
            constructor(id, username, password, firstName, lastName, activity, roles) {
                this.id = id;
                this.username = username;
                this.password = password;
                this.firstName = firstName;
                this.lastName = lastName;
                this.activity = activity;
                this.roles = roles;
            }
        }

        class Role {
            constructor(id, name) {
                this.id = id;
                this.name = name;
            }
        }

        run();
        fillAddUser();

        async function fillAddUser() {
            let responseRole = await fetch("http://localhost:8080/admin/role");
            let roles = await responseRole.json();
            let select = $("#user-addform select");
            for (let i = 0; i < roles.length; i++) {
                let option = new Option(roles[i].name, roles[i].id);
                select.append(option);
            }
        }

        async function run() {
            await fillCurrentUser();
            let response = await fetch("http://localhost:8080/admin/users");
            let users = await response.json();
            fillTable(users);
            addEditAndDeleteEventListeners();
        }

        async function fillCurrentUser() {
            let responseCurrentUser = await fetch("http://localhost:8080/user/current");
            let user = await responseCurrentUser.json();
            let roles = "";
            for (let i = 0; i < user.roles.length; i++) {
                roles += user.roles[i].name + " ";
            }
            $("#company").text(user.username + " with roles: " + roles);
        }


        function addEditAndDeleteEventListeners() {
            let buttons = $("table button");
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener("click", function () {
                    showModel(buttons[i]);
                });
            }
        }

        document.getElementById("modelButton").addEventListener("click", sendRequest);
        document.getElementById("addButton").addEventListener("click", addUser);

        async function addUser() {
            await fetch($("#user-addform").attr("action"), {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(getUser("#user-addform"))
            });
            run();
            clearAddForm();
            alert("New user added.");
        }

        function clearAddForm() {
            $("#user-addform .username").val("");
            $("#user-addform .password").val("");
            $("#user-addform .firstName").val("");
            $("#user-addform .lastName").val("");
            $("#user-addform .activity").prop("checked", false);
        }

        async function sendRequest() {
            if ($("#modelButton").text() === "Edit") {
                await fetch($("#userInfo form").attr("action"), {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(getUser("#userInfo"))
                });
            } else {
                await fetch($("#userInfo form").attr("action"), {method: "POST"});
            }
            run();
            $("#userInfo").modal("hide");
        }

        function getUser(form) {
            let roles = [];
            let i = 0;
            $(form + " option:selected").each(function () {
                roles[i] = new Role(this.value, this.text);
                i++;
            });
            let id = null;
            if (form === "#userInfo") {
                id = $(form + " #id").val();
            }
            return new User(id, $(form + " .username").val(), $(form + " .password").val(),
                $(form + " .firstName").val(), $(form + " .lastName").val(), $(form + " .activity").is(':checked'),
                roles);
        }

        function fillTable(users) {
            let tableBody = document.getElementsByTagName("tbody")[0];
            $("#usersTable tbody tr").remove();
            for (let i = 0; i < users.length; i++) {
                let row = tableBody.insertRow();
                let cellId = row.insertCell();
                let cellUsername = row.insertCell();
                let cellFirstName = row.insertCell();
                let cellLastName = row.insertCell();
                let cellActivity = row.insertCell();
                let cellRoles = row.insertCell();
                let cellEdit = row.insertCell();
                let cellDelete = row.insertCell();
                cellId.innerHTML = users[i].id;
                cellUsername.innerHTML = users[i].username;
                cellFirstName.innerHTML = users[i].firstName;
                cellLastName.innerHTML = users[i].lastName;
                cellActivity.innerHTML = users[i].activity;
                let roles = "";
                for (let k = 0; k < users[i].roles.length; k++) {
                    roles += users[i].roles[k].name + " ";
                }
                cellRoles.innerHTML = roles;
                let editButton = document.createElement("BUTTON");   // Create a <button> element
                editButton.innerHTML = "Edit";
                editButton.className = "btn btn-info";
                editButton.value = users[i].id;
                editButton.name = "Edit";
                editButton.type = "button";
                cellEdit.appendChild(editButton);
                let deleteButton = document.createElement("BUTTON");   // Create a <button> element
                deleteButton.innerHTML = "Delete";
                deleteButton.className = "btn btn-danger";
                deleteButton.value = users[i].id;
                deleteButton.name = "Delete";
                deleteButton.type = "button";
                cellDelete.appendChild(deleteButton);
            }
        }

        async function showModel(button) {
            await fillModel(button.value);
            if (button.name === "Edit") {
                getEditModel(button.value);
            } else {
                getDeleteModel(button.value);
            }
            $("#userInfo").modal("show");
        }

        async function fillModel(id) {
            let responseUser = await fetch("http://localhost:8080/admin/users/" + id);
            let responseRole = await fetch("http://localhost:8080/admin/role");
            let user = await responseUser.json();
            let roles = await responseRole.json();
            $("#userInfo #id").val(user.id);
            $("#userInfo .username").val(user.username);
            $("#userInfo .firstName").val(user.firstName);
            $("#userInfo .lastName").val(user.lastName);
            $("#userInfo .activity").prop("checked", user.activity);
            let select = $("#userInfo #roles");
            select.empty();
            for (let i = 0; i < roles.length; i++) {
                let option = new Option(roles[i].name, roles[i].id);
                for (let j = 0; j < user.roles.length; j++) {
                    if (roles[i].id === user.roles[j].id) {
                        option.selected = true;
                    }
                }
                select.append(option);
            }
        }

        function getEditModel(id) {
            $("#userInfo .modal-header h3").text("Edit User");
            $("#userInfo .username").prop("disabled", false);
            $("#userInfo .password").prop("disabled", false);
            $("#userInfo .firstName").prop("disabled", false);
            $("#userInfo .lastName").prop("disabled", false);
            $("#userInfo .activity").prop("disabled", false);
            $("#userInfo #roles").prop("disabled", false);
            $("#userInfo form").attr("action", "http://localhost:8080/admin/users/" + id + "/edit");
            let button = $("#userInfo button");
            if (button.hasClass("btn-danger")) {
                button.removeClass("btn-danger");
                button.addClass("btn-primary")
            }
            $("#userInfo .btn-primary").text("Edit");
        }

        function getDeleteModel(id) {
            $("#userInfo .modal-header h3").text("Delete User");
            $("#userInfo .username").prop("disabled", true);
            $("#userInfo .password").prop("disabled", true);
            $("#userInfo .firstName").prop("disabled", true);
            $("#userInfo .lastName").prop("disabled", true);
            $("#userInfo .activity").prop("disabled", true);
            $("#userInfo #roles").prop("disabled", true);
            $("#userInfo form").attr("action", "http://localhost:8080/admin/users/" + id + "/delete");
            let button = $("#userInfo button");
            if (button.hasClass("btn-primary")) {
                button.removeClass("btn-primary");
                button.addClass("btn-danger")
            }
            $("#userInfo .btn-danger").text("Delete");
        }
    }
)