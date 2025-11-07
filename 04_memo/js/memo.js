"use strict"
addEventListener("DOMContentLoaded",
function() {
    if(typeof localStorage == "undefined") {
        window.alert("このブラウザはLocal Storage機能が実装されていません");
        return;
    }else {
        viewStorage();
        saveLocalStorage();
    }
}, false
)

function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
    function(e) {
        e.preventDefault();
        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;

        if(key == "" || value == ""){
            window.alert("key, Memoはいずれも必須です。")
        }else {
             localStorage.setItem(key, value);
             viewStorage();
             window.alert("Key: " + key + "、Memo: " + value + " を保存しました！");
             document.getElementById("textKey").value = "";
             document.getElementById("textMemo").value = "";
        }
    }, false
    );
};

function viewStorage() {
    const list = document.getElementById("list");

    // Clear existing rows
    while (list.rows[0]) list.deleteRow(0);

    // Loop through localStorage items
    for (let i = 0; i < localStorage.length; i++) {
        const w_key = localStorage.key(i);
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");

        td1.innerHTML = "<input name='radio1' type='radio'>";
        td2.textContent = w_key;
        td3.innerHTML = localStorage.getItem(w_key);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        list.appendChild(tr);
    }
}