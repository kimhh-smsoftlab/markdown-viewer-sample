(function() {
  const $preview = $(".right-content");
  const $selected = $(".select");

  const config = {
    jsonfile: "md-files.json",
    files: [],
    currentFile: 0
  };

  init();

  function init() {
    getJson(config.jsonfile);

    // 이벤트 등록
    document.querySelector(".sidebar").addEventListener("click", selectFile);
  }

  function getJson(jsonfile) {
    fetch(jsonfile)
      .then(res => res.json())
      .then(jsonContent => fillList(jsonContent))
      .catch(function(err) {
        preview.innerHTML = `<h2>Something went wrong with '${jsonfile}:<br>${err}'</h2>`;
      });
  }

  function fillList(data) {
    config.files = data.files;
    const filesContainer = document.querySelector(".sidebar");

    data.files.forEach(file => {
      let div = document.createElement("div");
      div.setAttribute("data-file", file.path);
      div.className = "md-file";
      div.innerText = `${file.name}`;
      filesContainer.appendChild(div);
    });
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  function selectFile(event) {
    event.preventDefault();
    const fileToRender = event.target.getAttribute("data-file");
    getFile(fileToRender, transformFile);
  }

  function transformFile(file, data) {
    // Transform md → html
    let md = new markdownit();
    $preview.html(md.render(data));

    // Store current status
    $selected.text(`Selected Now → ${file}`);
    localStorage["lastOpened"] = file;
    config.currentFile = config.files.indexOf(file);
  }

  function getFile(file, callback) {
    debugger;
    fetch(file)
      .then(function(response) {
        if (!response.ok) {
          const err = `HTTP error on ${file}. Status:${response.status}`;
          $preview.innerHTML = err;
          throw new Error(err);
        }
        return response.blob();
      })
      .then(function(myBlob) {
        var reader = new FileReader();
        var textFile = /text.*/;
        if (myBlob.type.match(textFile)) {
          reader.onload = function(event) {
            callback(file, event.target.result);
          };
        } else {
          const err = `HTTP exception on ${file}`;
          $preview.innerHTML = err;
          console.log(err);
        }
        reader.readAsText(myBlob);
      })
      .catch(function(error) {
        const err = `HTTP exception on ${file}. ${error}`;
        $preview.innerHTML = err;
        console.log(err);
      });
  }
})();
