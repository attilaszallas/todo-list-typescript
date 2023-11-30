var form = document.getElementById('form');
var input = document.getElementById('input');
var list = document.getElementById('list');
list.setAttribute("style", "list-style-type:none;");
document.addEventListener("submit", function (e) {
    e.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) == "" || (input === null || input === void 0 ? void 0 : input.value) == null) {
        console.log("no input");
        return;
    }
    console.log("input: " + input.value);
    var newTask = {
        title: input.value,
        completed: false
    };
    addListItem(newTask);
});
function addListItem(task) {
    console.log("add list item: " + task.title);
    var item = document.createElement("li");
    var label = document.createElement("label");
    var div = document.createElement("div");
    div.setAttribute("text-align", "center");
    var completeButton = document.createElement("button");
    completeButton.textContent = "Task Completed";
    completeButton.setAttribute("id", "completeButton");
    completeButton.setAttribute("type", "completeButton");
    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove Task";
    removeButton.setAttribute("id", "removeButton");
    removeButton.setAttribute("type", "removeButton");
    div.append(task.title, completeButton, removeButton);
    item.append(div);
    list === null || list === void 0 ? void 0 : list.append(item);
    console.log("list item appended");
}
document.addEventListener("removeButton", function (e) {
    e.preventDefault();
    console.log("removeButton activated");
});
