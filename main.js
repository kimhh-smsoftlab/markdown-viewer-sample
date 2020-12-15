(function () {
    const $preview = $(".right-content"),
        $selected = $(".select"),
        $sidebar = $(".sidebar"),
        $inputFolder = $(".input-folder"),
        config = {
            jsonfile: "./test.json",
            files: [],
        };
    const server = window.location.protocol == "file:" ? 0 : 1;
    init();

    function init() {
        if (server) {
            getJson(config.jsonfile);
        }
        // 이벤트 등록
        $inputFolder.on("change", (event) => fillList(event.target.files));
        $sidebar.on("click", selectFile);
    }
    function getJson(jsonfile) {
        fetch(jsonfile)
            .then((res) => res.json())
            .then((jsonContent) => fillList(jsonContent.files))
            .catch(function (err) {
                $preview.html(
                    `<h2>Something went wrong with '${jsonfile}:<br>${err}'</h2>`
                );
            });
    }
    function fillList(data) {
        $sidebar.empty();
        data = Array.isArray(data) ? data : Array.from(data);
        data.forEach((file) => {
            let div = document.createElement("div");
            div.value = file.path ? file.path : file;
            div.className = "md-file";
            div.innerText = `${file.name}`;
            $sidebar.append(div);
        });
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function selectFile(event) {
        event.preventDefault();
        const fileToRender = event.target.value;
        getFile(fileToRender, transformFile);
    }

    function transformFile(file, data) {
        // md → html 변환
        let md = new markdownit();
        $preview.html(md.render(data));

        // Store current status
        $selected.text(`Selected Now → ${file.name}`);
    }

    function getFile(file, callback) {
        debugger;
        if (typeof file == "string") {
            fetch(file)
                .then(function (response) {
                    if (!response.ok) {
                        const err = `HTTP error on ${file}. Status:${response.status}`;
                        $preview.innerHTML = err;
                        throw new Error(err);
                    }
                    return response.blob();
                })
                .then(function (myBlob) {
                    var reader = new FileReader();
                    var textFile = /text.*/;
                    if (myBlob.type.match(textFile)) {
                        reader.onload = function (event) {
                            callback(file, event.target.result);
                        };
                    } else {
                        const err = `HTTP exception on ${file}`;
                        $preview.innerHTML = err;
                        console.log(err);
                    }
                    reader.readAsText(myBlob);
                })
                .catch(function (error) {
                    const err = `HTTP exception on ${file}. ${error}`;
                    $preview.innerHTML = err;
                    console.log(err);
                });
        } else {
            var reader = new FileReader();
            reader.onload = function (event) {
                callback(file, event.target.result);
            };
            reader.readAsText(file);
        }
    }
})();
