"use strict"
addEventListener("DOMContentLoaded",
    function () {
        if (typeof localStorage == "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage();
            saveLocalStorage();
            delLocalStorage();
            allClearLocalStorage();
            selectTable();


        }
    }, false
);

function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            if (key == "" || value == "") {
                Swal.fire({
                    title: "Memo app",
                    html: "key, Memoはいずれも必須です。",
                    type: "error",
                    allowOutsideClick: false
                });
                return;
            } else {
                let w_msg = "LocalStorageに\n「" + key + " " + value + "」\nを保存(save)しますか？"
                Swal.fire({
                    title: "Memo app",
                    html: w_msg,
                    type: "question",
                    showCancelButton: true
                }).then(function (result) {
                    if (result.value === true) {
                        localStorage.setItem(key, value);
                        viewStorage();
                        let w_msg = "LocalStorageに" + key + " " + value + "を保存（ほぞん）しました。";
                        Swal.fire({
                            title: "Memo app",
                            html: w_msg,
                            type: "success",
                            allowOutsideClick: false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
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
        const td4 = document.createElement("td");


        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.textContent = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src='./img/trash_icon.png' class='trash'>";

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        list.appendChild(tr);
        tr.appendChild(td4);
    }
    $("#table1").tablesorter({
        sortList: [[1, 0]]
    });

    $("#table1").trigger("update");

};


function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectCheckBox("select");
        }, false
    );
};

function selectCheckBox(mode) {

    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");

    let w_textKey = "";
    let w_textMemo = "";

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
            }
            w_cnt++;
        }
    }

    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;


    if (mode === "select") {
        if (w_cnt === 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo app",
                html: "1つ選択（select）してください。",
                type: "warning"
            });
            return 0;
        }
    }

    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo app",
                html: "1つ以上選択(select)してください。",
                type: "warning"
            });
            return 0;
        }
    }

    return 0;
}

function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click", function (e) {
        e.preventDefault();

        const chkbox1 = document.getElementsByName("chkbox1");
        const table1 = document.getElementById("table1");
      
        let w_cnt = selectCheckBox("del");
        if (w_cnt < 1) return;

        Swal.fire({
            title: "Memo app",
            html: `LocalStorageから ${w_cnt}件を削除 (delete) しますか？`,
            type: "question",
            showCancelButton: true,
            confirmButtonText: "削除",
            cancelButtonText: "キャンセル"
        }).then((result) => {

            if (result.value === true) {

                for (let i = chkbox1.length - 1; i >= 0; i--) {
                    if (chkbox1[i].checked) {
                        const key = table1.rows[i + 1].cells[1].textContent;
                        localStorage.removeItem(key);
                    }
                }

                viewStorage();

                Swal.fire({
                    title: "Memo app",
                    html: `${w_cnt}件を削除しました。`,
                    type: "success",
                    allowOutsideClick: false
                });

                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        });

    }, false);

    const table1 = document.getElementById("table1");

    table1.addEventListener("click", function (e) {

        if (!e.target.classList.contains("trash")) return;
        e.preventDefault();

        const tr = e.target.closest("tr");
        const key = tr.cells[1].textContent;
        const memo = tr.cells[2].textContent; 

        Swal.fire({
            title: "Memo app",
            html: `LocalStorageから「${memo}」を削除 (delete) しますか？`,
            type: "question",
            showCancelButton: true,
            confirmButtonText: "削除",
            cancelButtonText: "キャンセル"
        }).then((result) => {

            if (result.value === true) {
                localStorage.removeItem(key);
                viewStorage();

                Swal.fire({
                    title: "Memo app",
                    html: `「${memo}」を削除しました。`,
                    type: "success",
                    allowOutsideClick: false
                });

                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        });

    }, false);
}



function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            Swal.fire({
                title: "Memo-app",
                html: "LocalStorageのデータをすべて削除 (all clear) します。\nよろしいですか？",
                type: "question",
                showCancelButton: true
            }).then(function (result) {
                if (result.value === true) {
                    localStorage.clear();
                    viewStorage();
                    let w_msg = "LocalStorageのデータをすべて削除 (all clear) しました。";
                    Swal.fire({
                        title: "Memo app",
                        html: w_msg,
                        type: "success",
                        allowOutsideClick: false

                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });

        }, false

    );
};