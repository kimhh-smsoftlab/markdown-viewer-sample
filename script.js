(function() {
  const $preview = $(".right-content"),
    $selected = $(".select"),
    $sidebar = $(".sidebar"),
    config = {
      jsonfile: "md-files.json",
      files: []
    };

  init();

  function init() {
    getJson(config.jsonfile);

    // 이벤트 등록
    $sidebar.on("click", selectFile);
  }

  function getJson(jsonfile) {
    fetch(jsonfile)
      .then(res => res.json())
      .then(jsonContent => fillList(jsonContent))
      .catch(function(err) {
        $preview.html(
          `<h2>Something went wrong with '${jsonfile}:<br>${err}'</h2>`
        );
      });
  }

  function fillList(data) {
    config.files = data.files;

    data.files.forEach(file => {
      let div = document.createElement("div");
      div.setAttribute("data-file", file.path);
      div.className = "md-file";
      div.innerText = `${file.name}`;
      $sidebar.append(div);
    });
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  function selectFile(event) {
    event.preventDefault();
    const fileToRender = event.target.getAttribute("data-file");
    getFile(fileToRender, transformFile);
  }

  function transformFile(file, data) {
    // md → html 변환
    let md = new markdownit();
    $preview.html(md.render(data));

    // Store current status
    $selected.text(`Selected Now → ${file}`);
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
