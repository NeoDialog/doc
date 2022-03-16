(document.readyState === "complete" || document.readyState === "interactive") ? setTimeout(ready, .5) : document.addEventListener("DOMContentLoaded", ready);

function highlightAll() {

    Prism.plugins.NormalizeWhitespace.setDefaults({
        'remove-trailing': true,
        'remove-indent': true,
        'left-trim': true,
        'right-trim': true,
    });
    Prism.hooks.add('before-sanity-check', function (env) {
        env.code = env.element.innerText;
    });

    Prism.highlightAll();
}

function ready() {
    highlightAll();

    // add icons
    let tbody_icons = document.querySelector('.icons-wrapper');
    let i = 0;
    let o = {
      type : nd.type_toast,
      title : "Icons",
      text : "Preview for this icon",
      closeButton : true,
      timeout : 10000,
      icon : {id : ""}
    };

    if (tbody_icons) {
        for ( const [key,svg] of Object.entries(new nd().getListOfIcons())) {
            i = i++;
            let div = document.createElement("div");
            let p = document.createElement("p");
            p.innerText = `nd.icon_${key}`;
            let btn = document.createElement("button");
            let span = document.createElement("span");
            span.innerText = "Try it!";
            btn.classList.add("nd-doc-btn");
            btn.setAttribute("type","button");
            btn.appendChild(span);
            btn.onclick = function () {
                o.icon.id = nd[`icon_${key}`];
                nd.fire(o);
            };

            div.appendChild(p);
            div.appendChild(btn);

            // let tr = document.createElement("tr");
            // let title = document.createElement("td");
            //
            // let tdPreview = document.createElement("td");

            // tdPreview.appendChild(btn);
            // tr.appendChild(title);
            // tr.appendChild(tdPreview);
            tbody_icons.appendChild(div);
        }
    }
}