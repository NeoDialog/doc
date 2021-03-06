'use strict';
/**
 * @title Neo Dialog
 * @param o{Object} options
 * @desc Uha Group
 * @property
 * @author Hassan Jalali
 * @version 1.0.0
 * @return {NeoDialog}
 */
const NeoDialog = function (o = {}) {

    this.options = {};

    if ( typeof nd_def_var !== "undefined" && typeof nd_def_var === "object" ) {
        if (nd_def_var.hasOwnProperty("title")) this.options.title = nd_def_var.title;
        if (nd_def_var.hasOwnProperty("text")) this.options.text = nd_def_var.text;
        if (nd_def_var.hasOwnProperty("timeout")) this.options.timeout = nd_def_var.timeout;
        if (nd_def_var.hasOwnProperty("confirm")) this.options.confirm = nd_def_var.confirm;
        if (nd_def_var.hasOwnProperty("cancel")) this.options.cancel = nd_def_var.cancel;
        if (nd_def_var.hasOwnProperty("reject")) this.options.reject = nd_def_var.reject;
        if (nd_def_var.hasOwnProperty("rtl")) this.options.rtl = nd_def_var.rtl;
        if (nd_def_var.hasOwnProperty("closeButton")) this.options.closeButton = nd_def_var.closeButton;
    }else {
        const nd_def_var = {};
    }

    if (typeof o === "object" && Object.keys(o).length > 0 ) {
        if( ! o.hasOwnProperty("type") ) o.type = "alert";
        Object.assign(this.options,o);
    }else{
        this.options = {type : "alert"};
    }

    this.inputs = [];

    this.cbValues = {
        isCancel : false,
        isReject : false,
        isConfirm : false,
        values : {}
    };

    this.buttonSet = false;

    let anim_enter = "flip-in-hor-top";
    let anim_leave = "flip-out-hor-bottom";

    let container = document.createElement("div");

    const wrapper = document.createElement("div");

    const content = document.createElement("div");

    const buttonsContainer = document.createElement("div");

    // functions
    function uniqID(prefix = "", suffix = "") {
        return `_nd_${prefix}${Date.now().toString(36) + Math.random().toString(36).substring(2)}${suffix}`;
    }

    // create elements
    const closeButton = ( ndClass = "nAlert-close" ) => {
        this.buttonSet = true;
        const span = document.createElement("span");
        span.classList.add(ndClass);
        span.onclick = destroy ;
        content.appendChild(span);
    }

    const destroy = () => {
        switch (this.options.type) {
            case nd.type_toast :
                anim_enter = "slide-in-elliptic-bottom-fwd";
                anim_leave = "flip-out-hor-top";
                break;
            case "snackbar" :
            case nd.type_snack :
                anim_enter = "swing-in-bottom-fwd";
                anim_leave = "swing-out-bottom-bck";
                break;

            case nd.type_alert :
                anim_enter = "tilt-in-fwd-tr";
                anim_leave = "swing-out-bottom-bck";
                anim_leave = "slit-out-horizontal";
        }

        if (this.options.hasOwnProperty("anim")) {
            if (this.options.anim.hasOwnProperty("in"))
                anim_enter = this.options.anim["in"];

            if (this.options.anim.hasOwnProperty("out"))
                anim_leave = this.options.anim["out"];
        }

        wrapper.classList.remove(anim_enter);
        wrapper.classList.add(anim_leave);

        setTimeout( () => {
            if ( this.options.type === "alert" || this.options.type === "dialog" ) {
                document.querySelector(`.${container.classList.item(1)}`).remove();
                Array.from(document.body.children).map( e => e.classList.remove("nd-blur") );
            }else if( this.options.type === "toast" || this.options.type === "snack" || this.options.type === "snackbar" ) {
                if (document.querySelector(`.${container.classList.item(1)}`)) {
                    let children = document.querySelector(`.${container.classList.item(1)}`).children;
                    if( children.length === 1 && children[0] === wrapper ) {
                        document.querySelector(`.${container.classList.item(1)}`).remove();
                    }else{
                        wrapper.remove();
                    }
                }else{
                    wrapper.remove();
                }
            }
        } , 605 );
    };

    const icons = {
        newsletter : `<svg enable-background="new 0 0 144 144" viewBox="0 0 144 144" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g><path d="M124.36,129.055h-94V74.441c-1-1.31-3.5-3.598-4.215-3.741 c-1.072-0.214-1.785,1.838-1.785,3.741v53.944c0,1.509,0.698,3.016,2.053,3.485c1.71,1.493,4.234,2.609,5.921,2.609l90.504-0.02 c1.903,0,3.435-1.245,4.785-2.604l0.757,0.696" fill="#110F48" opacity="0.3"/><g><path d="M26.045,70.16 c-1.392,1.444-2.251,3.404-2.251,5.556v50.749c0,4.408,3.607,8.015,8.015,8.015h90.442c4.408,0,8.015-3.607,8.015-8.015V75.715 c0-2.151-0.859-4.112-2.251-5.555" fill="none" stroke="#110F48" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/> <line fill="none" stroke="#110F48" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="91.621" x2="127.988" y1="100.892" y2="70.139"/> <line fill="none" stroke="#110F48" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="26.069" x2="62.341" y1="70.136" y2="100.81"/> <line fill="none" stroke="#110F48" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="32.608" x2="26.069" y1="63.599" y2="70.136"/> <polyline fill="none" points=" 99.073,41.227 77.03,19.186 54.965,41.247 " stroke="#110F48" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/> <line fill="none" stroke="#110F48" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="127.988" x2="121.493" y1="70.139" y2="63.644"/> <line fill="none" stroke="#110F48" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="77.028" x2="25.821" y1="88.9" y2="131.778"/> <line fill="none" stroke="#110F48" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="77.028" x2="127.988" y1="88.9" y2="131.844"/></g><polyline fill="none" points=" 121.453,75.666 121.568,41.227 32.608,41.227 32.608,75.666 " stroke="#FFA200" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><g><ellipse cx="59.468" cy="66.892" fill="#FFA200" opacity="0.3" rx="4.479" ry="4.479" transform="matrix(0.993 -0.1177 0.1177 0.993 -7.4614 7.4661)"/> <ellipse cx="59.468" cy="66.892" fill="none" rx="4.479" ry="4.479" stroke="#FFA200" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" transform="matrix(0.993 -0.1177 0.1177 0.993 -7.4614 7.4661)"/></g><g><ellipse cx="77.838" cy="66.892" fill="#FFA200" opacity="0.3" rx="4.479" ry="4.479" transform="matrix(0.993 -0.1177 0.1177 0.993 -7.3337 9.6288)"/> <ellipse cx="77.838" cy="66.892" fill="none" rx="4.479" ry="4.479" stroke="#FFA200" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" transform="matrix(0.993 -0.1177 0.1177 0.993 -7.3337 9.6288)"/></g><g><ellipse cx="96.209" cy="66.892" fill="#FFA200" opacity="0.3" rx="4.479" ry="4.479" transform="matrix(0.993 -0.1177 0.1177 0.993 -7.2059 11.7915)"/> <ellipse cx="96.209" cy="66.892" fill="none" rx="4.479" ry="4.479" stroke="#FFA200" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" transform="matrix(0.993 -0.1177 0.1177 0.993 -7.2059 11.7915)"/></g><g><line fill="none" stroke="#FFA200" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="115.727" x2="115.727" y1="11.498" y2="23.343"/> <line fill="none" stroke="#FFA200" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="121.649" x2="109.805" y1="17.421" y2="17.421"/></g><g><line fill="none" stroke="#FFA200" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="8.967" x2="8.967" y1="47.564" y2="59.408"/> <line fill="none" stroke="#FFA200" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="3.045" x2="14.889" y1="53.486" y2="53.486"/></g><g><line fill="none" stroke="#FFA200" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="136.994" x2="136.994" y1="51.95" y2="59.041"/> <line fill="none" stroke="#FFA200" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="140.539" x2="133.448" y1="55.496" y2="55.496"/></g></g> <g/> <g/> <g/> <g/> <g/> <g/></svg>`,
        trash : `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 400px; height: 400px;"><style>.line-bin1{animation:line-bin1-lid 4s infinite; transform-origin: 24px 48px;}@keyframes line-bin1-lid{0%{transform: rotate(0);}20%{transform: rotate(0);}40%{transform: rotate(-40deg);}60%{transform: rotate(-40deg);}80%{transform: rotate(0);}100%{transform: rotate(0);}}@media (prefers-reduced-motion: reduce){.line-bin1{animation: none;}}</style><path class="stroke1 fill1" d="M28 48H72V94C72 96.2091 70.2091 98 68 98H32C29.7909 98 28 96.2091 28 94V48Z" fill="#fff" stroke="rgba(17,15,72,1)" stroke-width="2.3px" style="animation-duration: 2.6s;"></path><g class="line-bin1 stroke2 fill2" style="animation-duration: 2.6s;"><rect class="stroke2" x="37" y="33" width="25" height="13" rx="2" fill="white" stroke="rgba(255,179,0,1)" stroke-width="2.3px"></rect><rect class="stroke2 fill2" x="24" y="42" width="51" height="8" rx="2" fill="#fff" stroke="rgba(255,179,0,1)" stroke-width="2.3px"></rect></g><line class="stroke1" x1="40" y1="56" x2="40" y2="90" stroke="rgba(17,15,72,1)" stroke-width="2.3px" style="animation-duration: 2.6s;"></line><line class="stroke1" x1="50" y1="56" x2="50" y2="90" stroke="rgba(17,15,72,1)" stroke-width="2.3px" style="animation-duration: 2.6s;"></line><line class="stroke1" x1="60" y1="56" x2="60" y2="90" stroke="rgba(17,15,72,1)" stroke-width="2.3px" style="animation-duration: 2.6s;"></line></svg>`,
        upload : `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 400px; height: 400px;"><style>.line-upload1 {animation:line-upload1 2s infinite;}  @keyframes line-upload1 { 0%{transform:translate3d(0, 0px, 0);} 50%{transform:translate3d(0, 6px, 0);} 100%{transform:translate3d(0, 0px, 0);}}@media (prefers-reduced-motion: reduce) {.line-upload1 {animation: none;}  }</style><path class="line-upload1 stroke1" d="M51.2948 71.5L51.2948 16.5M51.2948 16.5L37.2916 30.4407M51.2948 16.5L65 30.4407" stroke="rgba(255,179,0,1)" stroke-width="4.0px" stroke-linecap="round" style="animation-duration: 1.6s;"></path><path class="stroke2" d="M13 52V79C13 84.5228 17.4772 89 23 89H78C83.5228 89 88 84.5228 88 79V52" stroke="rgba(17,15,72,1)" stroke-width="4.0px" style="animation-duration: 1.6s;"></path></svg>`,
        mail : `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 400px; height: 400px;"><style>.line-mail4{animation:line-mail4 1.6s infinite;}@keyframes line-mail4{0%{transform: translate3d(0, -2px, 0);}50%{transform: translate3d(0, 2px, 0);}100%{transform: translate3d(0, -2px, 0);}}@media (prefers-reduced-motion: reduce){.line-mail4{animation: none;}}</style><rect class="stroke1 fill1" x="19" y="48.0808" width="63" height="44" rx="6" fill="#fff" stroke="rgba(17,15,72,1)" stroke-width="2.9px" style="animation-duration: 1.3s;"></rect><path class="stroke1 fill1" d="M77.6232 90.3464L51.8459 66.5245C51.0843 65.8207 49.9111 65.8157 49.1436 66.513L22.9155 90.3406C22.2388 90.9554 22.6737 92.0808 23.5879 92.0808H76.9445C77.8545 92.0808 78.2916 90.964 77.6232 90.3464Z" fill="#fff" stroke="rgba(17,15,72,1)" stroke-width="2.9px" style="animation-duration: 1.3s;"></path><path class="stroke1 fill2" d="M77.6232 50.0152L51.8459 73.8371C51.0843 74.5408 49.9111 74.5458 49.1436 73.8486L22.9155 50.0209C22.2388 49.4062 22.6737 48.2808 23.5879 48.2808H76.9445C77.8545 48.2808 78.2916 49.3975 77.6232 50.0152Z" fill="#fff" stroke="rgba(17,15,72,1)" stroke-width="2.9px" style="animation-duration: 1.3s;"></path><path class="line-mail4 stroke2" d="M50.75 39.3684L50.75 9.99999M50.75 9.99999L39 21.6976M50.75 9.99999L62.25 21.6976" stroke="rgba(255,179,0,1)" stroke-width="2.9px" stroke-linecap="round" style="animation-duration: 1.3s;"></path></svg>`,
        download : `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 400px; height: 400px;"><style>.line-download1{animation:line-download1-arrow 2s infinite;}@keyframes line-download1-arrow{0%{transform:translate3d(0, 0px, 0);}50%{transform:translate3d(0, 6px, 0);}100%{transform:translate3d(0, 0px, 0);}}@media (prefers-reduced-motion: reduce){.line-download1{animation: none;}}</style><path class="stroke1" d="M36 65C36 65 9 62.5 9 40.5C9 18.5 26.9391 11 35 11C43.0609 11 48.8314 12.2672 54.75 17C60.0465 21.2353 63.5 32 63.5 32C63.5 32 71.5 25.9212 80.25 29.75C87.3707 32.8658 91 39.7274 91 47.5C91 67.5 66 65 66 65" stroke="rgba(17,15,72,1)" stroke-width="2.3px" style="animation-duration: 1.4s;"></path><path class="line-download1 stroke2" d="M52.0802 50.5L52.0802 85.5M52.0802 85.5L66.0833 71.5593M52.0802 85.5L38.375 71.5593" stroke="rgba(255,179,0,1)" stroke-width="2.3px" stroke-linecap="round" style="animation-duration: 1.4s;"></path></svg>`,
        exit : `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 400px; height: 400px;"><style>.line-exit2{animation:line-exit2 2s infinite;}@keyframes line-exit2{0%{transform:translate3d(0, 0px, 0);}50%{transform:translate3d(4px, 0, 0);}100%{transform:translate3d(0, 0px, 0);}}@media (prefers-reduced-motion: reduce){.line-exit2{animation: none;}}</style><path class="line-exit2 stroke2" d="M31 50.9969L86 50.9969M86 50.9969L72.0593 65M86 50.9969L72.0593 37.2917" stroke="rgba(255,179,0,1)" stroke-width="2.3px" stroke-linecap="round" style="animation-duration: 1.4s;"></path><path class="stroke1" d="M50.5 13L17.5 13C15.2909 13 13.5 14.7909 13.5 17L13.5 84C13.5 86.2091 15.2909 88 17.5 88L50.5 88" stroke="rgba(17,15,72,1)" stroke-width="2.3px" style="animation-duration: 1.4s;"></path></svg>`,
        edit : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 430 430" style="width: 400px; height: 400px;enable-background:new 0 0 430 430;" xml:space="preserve"><style type="text/css">.st0{fill:#121330;}.st1{fill:#ffb300;}.st2{fill:none;stroke:#ffb300;stroke-width:12.25;stroke-miterlimit:14;}.st3{fill-opacity:0;}.st4{fill:#131432;}.st5{fill:none;}</style><g><g><path class="st3" d="M247.44,99.64h-64.88V56.83h64.88V99.64z"/><path class="st1" d="M247.44,105.77h-64.88c-3.38,0-6.13-2.74-6.13-6.13V56.83c0-3.38,2.74-6.13,6.13-6.13h64.88c3.38,0,6.13,2.74,6.13,6.13v42.81C253.56,103.02,250.82,105.77,247.44,105.77z M188.69,93.52h52.63V62.96h-52.63V93.52z"/></g><path class="st0" d="M215,379.29c-2.19,0-4.21-1.17-5.3-3.06l-32.44-56.18c-1.09-1.89-1.09-4.23,0-6.13c1.09-1.9,3.12-3.06,5.3-3.06h64.88c2.19,0,4.21,1.17,5.3,3.06c1.09,1.9,1.09,4.23,0,6.13l-32.44,56.18C219.21,378.13,217.19,379.29,215,379.29z M193.17,323.11L215,360.92l21.83-37.81H193.17z"/><path class="st0" d="M247.44,323.11h-64.88c-3.38,0-6.13-2.74-6.13-6.13V99.64c0-3.38,2.74-6.13,6.13-6.13h64.88c3.38,0,6.13,2.74,6.13,6.13v217.35C253.56,320.37,250.82,323.11,247.44,323.11z M188.69,310.86h52.63v-205.1h-52.63V310.86z"/><path class="st1" d="M215,230.25c-3.38,0-6.13-2.74-6.13-6.13v-97.48c0-3.38,2.74-6.13,6.13-6.13s6.13,2.74,6.13,6.13v97.48C221.13,227.51,218.38,230.25,215,230.25z"/></g></svg>`,
        user : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 430 430" style="width: 400px; height: 400px;enable-background:new 0 0 430 430;" xml:space="preserve"><style type="text/css">.st0{fill:#121330;}.st1{fill:#ffb300;}.st2{fill:none;stroke:#ffb300;stroke-width:12.25;stroke-miterlimit:14;}.st3{fill-opacity:0;}.st4{fill:#131432;}.st5{fill:none;}</style><g><path class="st0" d="M368.35,367.33H61.19c-1.65,0-3.23-0.67-4.38-1.86c-1.15-1.19-1.77-2.79-1.71-4.44l0.46-14.31c0.06-57.19,46.6-103.71,103.81-103.71H271.1c57.24,0,103.81,46.57,103.81,103.81c0,0.06,0,0.13,0,0.19l-0.46,14.41C374.34,364.72,371.64,367.33,368.35,367.33z M67.49,355.14h294.96l0.27-8.4c-0.05-50.47-41.13-91.52-91.61-91.52H159.36c-50.52,0-91.61,41.1-91.61,91.61c0,0.06,0,0.13,0,0.19L67.49,355.14z"/><path class="st1" d="M215.23,216.33c-42.36,0-76.83-34.47-76.83-76.83s34.47-76.83,76.83-76.83c22.76,0,44.21,10,58.86,27.45c11.59,13.79,17.97,31.33,17.97,49.38C292.06,181.86,257.6,216.33,215.23,216.33z M215.23,74.86c-35.64,0-64.63,28.99-64.63,64.63s28.99,64.63,64.63,64.63s64.63-28.99,64.63-64.63c0-15.19-5.37-29.94-15.11-41.54v0C252.43,83.28,234.38,74.86,215.23,74.86z"/></g></svg>`,
        thump_down : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 430 430" style="width: 400px; height: 400px;enable-background:new 0 0 430 430;" xml:space="preserve"><style type="text/css">.st0{fill:#110f48;}.st1{fill:#ffb300;}</style><g><path class="st0" d="M251.06,353.67c-0.41,0-0.81-0.01-1.22-0.03c-16.38-0.78-20.95-11.66-21.07-17.3c0-0.05,0-0.1,0-0.14l0.06-36.8c0-5.66-1.35-11.27-3.92-16.21c-17.9-34.52-48.66-42.61-53.34-43.66h-26.02c-3.31,0-6-2.69-6-6V103.57c0-3.31,2.69-6,6-6c31.32,0,33.33-1.11,41.78-5.76c2.2-1.21,4.93-2.71,8.54-4.45c3.52-1.69,6.96-3.25,10.22-4.62c10.06-4.25,20.7-6.41,31.6-6.41h92.26c0.4,0,0.74,0.03,0.99,0.06c11.42,0.69,20.36,9.77,20.84,21.22c0.19,4.52-1.03,8.23-3.04,11.23c10.63,2.77,18.07,12.15,18.07,23.95v3.46c0,5.66-2.14,10.6-5.49,14.54c10.07,3.18,17.19,12.69,17.19,24.23v6.57c0,7.85-4.4,14.29-10.64,18.51c6.47,5.1,10.94,12.56,10.94,20.09v3.84c0,14.09-11.52,25.56-25.69,25.56h-54.23c-6.57,0-11.32,1.37-13.74,3.96c-1.91,2.04-1.91,4.45-1.89,4.88c0.04,0.25,0.03,0.31,0.03,0.59c0.01,1.96,0.33,48.12,0,59.61c-0.27,9.31-5.3,19.84-12.83,26.81C264.67,350.85,257.98,353.67,251.06,353.67z M240.77,336c0.15,1.34,1.31,5.26,9.64,5.66c5.12,0.25,9.31-2.58,11.91-4.99c5.12-4.74,8.81-12.29,8.99-18.35c0.31-10.89,0.02-55.45,0-58.97c-0.12-1.8-0.14-8.1,4.79-13.63c4.79-5.38,12.47-8.11,22.81-8.11h54.23c7.42,0,13.69-6.21,13.69-13.56v-3.84c0-6.98-8.73-14.64-16.68-14.64c-3.31,0-6-2.69-6-6s2.69-6,6-6c7.73,0,16.38-5.12,16.38-11.96v-6.57c0-7.62-5.44-13.37-12.66-13.37c-0.11,0-0.22,0-0.33-0.01l-13.13-0.73c-2.87-0.16-5.22-2.33-5.61-5.18c-0.22-1.65,0.24-3.35,1.29-4.64s2.59-2.11,4.25-2.22c7-0.46,14.49-5.64,14.49-12.62v-3.46c0-7.41-5.38-12.78-12.78-12.78l-13.16-0.18c-3.13-0.04-5.7-2.49-5.9-5.61c-0.2-3.12,2.03-5.88,5.13-6.33c0.47-0.07,12.03-1.94,11.7-9.77c0,0,0,0,0,0c-0.22-5.31-4.39-9.5-9.7-9.76c-0.13-0.01-0.27-0.02-0.4-0.03h-92c-9.29,0-18.36,1.84-26.93,5.46c-3.09,1.3-6.35,2.78-9.7,4.39c-3.31,1.59-5.77,2.95-7.95,4.14c-9.97,5.49-13.92,7.05-41.57,7.23v117.98h20.32c0.64,0,1.28,0.07,1.91,0.2c4.14,0.88,40.94,9.74,61.79,49.94c3.44,6.64,5.26,14.16,5.26,21.74L240.77,336z M240.77,336.1v0.12c0,0.01,0,0.01,0,0.01S240.77,336.15,240.77,336.1z M240.77,336.07L240.77,336.07L240.77,336.07z"/><path class="st1" d="M145.55,257.89H57.17c-3.31,0-6-2.69-6-6V97.45c0-3.31,2.69-6,6-6h88.38c3.31,0,6,2.69,6,6v154.44C151.55,255.2,148.86,257.89,145.55,257.89z M63.17,245.89h76.38V103.45H63.17V245.89z"/></g></svg>`,
        search : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 430 430" style="width: 400px; height: 400px;enable-background:new 0 0 430 430;" xml:space="preserve"><style type="text/css">.st0{fill:#110f48;}.st1{fill:#ffb300;}.st2{fill:none;stroke:#08A88A;stroke-width:12.25;stroke-miterlimit:14;}.st3{fill-opacity:0;}.st4{fill:#131432;}.st5{fill:none;}</style><g><path class="st0" d="M191.03,343.28c-40.41,0-78.4-15.74-106.97-44.31c-58.98-58.98-58.98-154.96,0-213.94c28.57-28.57,66.56-44.31,106.97-44.31c40.41,0,78.4,15.74,106.97,44.31c58.98,58.98,58.98,154.96,0,213.94C269.43,327.54,231.44,343.28,191.03,343.28z M191.03,52.97c-37.14,0-72.05,14.46-98.31,40.72c-54.21,54.21-54.21,142.41,0,196.62c26.26,26.26,61.17,40.72,98.31,40.72c37.14,0,72.05-14.46,98.31-40.72c54.21-54.21,54.21-142.41,0-196.62l0,0C263.09,67.43,228.17,52.97,191.03,52.97z"/><path class="st1" d="M82.11,153.84c-0.79,0-1.6-0.15-2.38-0.46c-3.26-1.32-4.84-5.03-3.53-8.29c6.18-15.32,15.29-29.07,27.07-40.85c13.9-13.9,31.09-24.36,49.71-30.25c3.35-1.06,6.93,0.8,8,4.15c1.06,3.35-0.8,6.93-4.15,8c-16.92,5.36-31.91,14.48-44.55,27.12c-10.56,10.56-18.73,22.88-24.26,36.6C87.02,152.33,84.63,153.84,82.11,153.84z"/><path class="st0" d="M384.12,390.51c-1.86,0-3.72-0.7-5.15-2.11l-88.05-86.54c-2.9-2.85-2.94-7.5-0.09-10.39c2.85-2.89,7.5-2.94,10.39-0.09l88.05,86.54c2.9,2.85,2.94,7.5,0.09,10.39C387.93,389.77,386.03,390.51,384.12,390.51z"/></g></svg>`,
        remove : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 430 430" style="width: 400px; height: 400px;enable-background:new 0 0 430 430;" xml:space="preserve"><style type="text/css">.st0{fill:#110f48;}.st1{fill:#ffb300;}.st2{fill:none;stroke:#08A88A;stroke-width:12.25;stroke-miterlimit:14;}.st3{fill-opacity:0;}.st4{fill:#131432;}.st5{fill:none;}</style><g><path class="st0" d="M215,390.67c-96.86,0-175.67-78.8-175.67-175.67c0-31.95,8.67-63.24,25.07-90.48l0,0c15.35-25.5,37.08-46.84,62.85-61.73c26.56-15.35,56.91-23.46,87.76-23.46c96.86,0,175.67,78.8,175.67,175.67S311.86,390.67,215,390.67z M78.1,132.77c-14.9,24.75-22.77,53.18-22.77,82.23c0,88.04,71.63,159.67,159.67,159.67S374.67,303.04,374.67,215S303.04,55.33,215,55.33C158.47,55.33,107.3,84.28,78.1,132.77L78.1,132.77z"/><path class="st1" d="M115.2,220.9c-0.62,0-1.23-0.01-1.85-0.03c-3.25-0.08-5.83-2.78-5.75-6.03c0.08-3.25,2.78-5.79,6.03-5.75c0.52,0.01,1.04,0.02,1.56,0.02l200.24,0c0.31,0,0.63,0,0.95-0.01c3.25-0.09,5.94,2.52,6,5.78c0.06,3.25-2.52,5.94-5.78,6c-0.39,0.01-0.79,0.01-1.18,0.01L115.2,220.9z"/></g></svg>`,
        add : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 430 430" style="width: 400px; height: 400px;enable-background:new 0 0 430 430;" xml:space="preserve"><style type="text/css">.st0{fill:#110f48;}.st1{fill:#ffb300;}.st2{fill:none;stroke:#08A88A;stroke-width:12.25;stroke-miterlimit:14;}.st3{fill-opacity:0;}.st4{fill:#131432;}.st5{fill:none;}</style><g><path class="st0" d="M215,409.6c-107.3,0-194.6-87.3-194.6-194.6c0-35.4,9.6-70.06,27.77-100.23l0,0c17.01-28.25,41.08-51.89,69.62-68.38c29.43-17,63.04-25.99,97.21-25.99c107.3,0,194.6,87.3,194.6,194.6S322.3,409.6,215,409.6z M62.73,123.54C46.16,151.07,37.4,182.69,37.4,215c0,97.93,79.67,177.6,177.6,177.6S392.6,312.93,392.6,215S312.93,37.4,215,37.4C152.13,37.4,95.2,69.6,62.73,123.54L62.73,123.54z"/><path class="st1" d="M102.48,223.69c-0.69,0-1.37-0.01-2.05-0.03c-3.59-0.09-6.43-3.07-6.34-6.66c0.09-3.59,3.11-6.41,6.66-6.34c0.58,0.01,1.15,0.02,1.73,0.02l222.49,0c0.35,0,0.7,0,1.05-0.01c3.61-0.12,6.56,2.78,6.63,6.37s-2.78,6.56-6.37,6.63c-0.44,0.01-0.87,0.01-1.31,0.01L102.48,223.69z"/><path class="st1" d="M217.07,336.82c-0.05,0-0.11,0-0.16,0c-3.59-0.09-6.43-3.07-6.34-6.66c0.01-0.58,0.02-1.15,0.02-1.73l0-222.49c0-0.35,0-0.7-0.01-1.05c-0.07-3.59,2.78-6.56,6.37-6.63c3.61-0.06,6.56,2.78,6.63,6.37c0.01,0.44,0.01,0.87,0.01,1.31l0,222.49c0,0.69-0.01,1.37-0.03,2.05C223.48,334.02,220.58,336.82,217.07,336.82z"/></g></svg>`,
        gift : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 430 430" style="width: 400px; height: 400px;enable-background:new 0 0 430 430;" xml:space="preserve"><style type="text/css">.st0{fill:#ffb300;}.st1{fill:#110f48;}.st2{fill:#ffb300;fill-opacity:0;}.st3{fill:none;}</style><g><path class="st1" d="M215.45,223.85c-0.52,0-1.05-0.06-1.56-0.2L48.35,181.41c-2.77-0.71-4.71-3.19-4.74-6.04l-0.44-44.02c-0.06-0.36-0.1-0.72-0.1-1.1c0-2.87,1.94-5.38,4.73-6.1L213.43,81.4c1.03-0.27,2.12-0.27,3.15,0l165.63,42.75c2.78,0.72,4.73,3.23,4.73,6.1c0,0.23-0.01,0.46-0.04,0.68l-0.44,43.48c-0.03,2.84-1.95,5.31-4.7,6.03l-164.7,43.2C216.52,223.78,215.99,223.85,215.45,223.85z M56.16,170.39l159.27,40.64l158.47-41.57l0.32-31.06L216.57,179.1c-1.03,0.27-2.12,0.27-3.15,0L55.84,138.42L56.16,170.39z M74.58,130.25L215,166.49l140.42-36.24L215,94L74.58,130.25z"/><path class="st1" d="M215.82,401.6c-0.61,0-1.23-0.09-1.82-0.27L70.93,358.18c-2.65-0.8-4.47-3.23-4.48-6l-0.79-169.2c-0.01-1.93,0.86-3.75,2.37-4.95c1.5-1.2,3.48-1.65,5.35-1.22l141.08,32.58c0.39-0.08,0.8-0.12,1.22-0.12c0,0,0,0,0.01,0c0.47,0,0.93,0.05,1.37,0.15l139.66-34.45c1.88-0.46,3.87-0.04,5.39,1.16c1.52,1.19,2.42,3.02,2.42,4.96l0.02,170.1c0,2.76-1.8,5.2-4.44,6.02l-142.41,44.1C217.08,401.5,216.45,401.6,215.82,401.6z M79.03,347.47l130.51,39.36l-0.16-165.67L78.29,190.88L79.03,347.47z M221.98,221.19l0.16,165.56l129.79-40.19l-0.02-157.41L221.98,221.19z"/><path class="st0" d="M136.52,377.69c0,0-0.01,0-0.01,0c-3.48-0.01-6.29-2.83-6.29-6.31l0.37-168.2l-8.8-2.52c-2.7-0.78-4.56-3.25-4.56-6.06v-0.5l0.12-41.82c0.01-2.72,1.76-5.12,4.34-5.97l91.8-29.97c1.69-0.55,3.44-0.35,4.89,0.42l90.81,29.55c2.6,0.84,4.36,3.27,4.35,6.01l-0.12,40.95c-0.01,2.73-1.78,5.15-4.39,5.98l-8.98,2.87L300.53,371c0.01,3.48-2.8,6.31-6.28,6.32c-0.01,0-0.01,0-0.02,0c-3.47,0-6.29-2.81-6.3-6.28l-0.48-173.49c-0.01-2.75,1.76-5.18,4.38-6.02l9.01-2.89l0.09-31.77l-0.96-0.31L215.31,129l-85.37,27.87l-0.1,32.99l8.79,2.51c2.71,0.77,4.57,3.25,4.57,6.07l-0.38,172.96C142.81,374.87,139.99,377.69,136.52,377.69z"/><path class="st0" d="M218.1,129.19c-2.01,0-3.89-0.97-5.07-2.56c-36.17-5.18-64.15-14.12-83.19-26.58c-16.85-11.02-26.07-24.76-25.98-38.7c0.11-16.53,13.82-30.23,32.6-32.58c28.39-3.56,68.41,18.55,87.73,92.52c0.88,3.37-1.14,6.81-4.5,7.69C219.16,129.12,218.62,129.19,218.1,129.19z M142.45,41c-1.51,0-2.99,0.09-4.43,0.27c-12.63,1.58-21.5,9.87-21.57,20.16c-0.11,17.37,24.19,40.92,92.32,51.81C192.01,59.85,163.97,41,142.45,41z"/><path class="st0" d="M215.99,129.19c-0.52,0-1.05-0.07-1.58-0.2c-3.37-0.87-5.4-4.3-4.53-7.67c19.04-73.82,58.53-96,86.56-92.56c18.65,2.29,32.3,15.97,32.44,32.53C329,75.21,319.9,88.96,303.26,100c-18.81,12.48-46.46,21.43-82.2,26.62C219.89,128.22,218,129.19,215.99,129.19z M290.7,41c-21.2,0-48.88,18.85-65.43,72.23c67.22-10.9,91.17-34.46,91.01-51.83c-0.09-10.33-8.88-18.61-21.37-20.14C293.54,41.09,292.13,41,290.7,41z"/></g></svg>`,
        warning : `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><style>.warning_scaleY{animation: warning_scale_Y 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) alternate-reverse infinite;}@keyframes warning_scale_Y{0%{-webkit-transform: scaleY(.8); transform: scaleY(.8);}100%{-webkit-transform: scaleY(1); transform: scaleY(1);}}</style> <g data-name="Group 25"> <path data-name="Path 4" d="M354.03,354.43H75.97a19.035,19.035,0,0,1-16.48-28.55L198.52,85.08a19.024,19.024,0,0,1,32.96,0h0l139.03,240.8a19.035,19.035,0,0,1-16.48,28.55ZM214.744,96.84c-1.22,0,2.086-1.673.256,1.507L82.491,338.91c-1.482,2.568-11.4-2.208-11.4-2.208s1.045-1.722,1.161-1.522c.61,1.06,10.422,0,14.082,0h267.7c3.67,0-5.806,17.031-5.2,15.971s-.157-12.8-1.987-15.971L215,98.348C213.17,95.178,215.964,96.84,214.744,96.84Z" fill="#110f48"/> <g data-name="Group 24"> <path class="warning_scaleY" data-name="Path 5" d="M217.7,264.59h-5.41a19.825,19.825,0,0,1-19.82-18.88l-2.83-57.89a22.393,22.393,0,0,1,22.37-23.49h5.96a22.393,22.393,0,0,1,22.37,23.49l-2.83,57.89A19.8,19.8,0,0,1,217.7,264.59Zm-5.68-88.26a10.409,10.409,0,0,0-10.39,10.91l2.83,57.89a7.837,7.837,0,0,0,7.83,7.46h5.41a7.83,7.83,0,0,0,7.83-7.46l2.83-57.89a10.409,10.409,0,0,0-10.39-10.91Z" fill="#ffb300"/> <path data-name="Path 6" d="M215,322.33a21.85,21.85,0,1,1,21.85-21.85A21.872,21.872,0,0,1,215,322.33Zm0-31.7a9.85,9.85,0,1,0,9.85,9.85A9.863,9.863,0,0,0,215,290.63Z" fill="#ffb300"/> </g> </g></svg>`,
        basket : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 430 430" style="width: 400px; height: 400px;enable-background:new 0 0 430 430;" xml:space="preserve"><style type="text/css">.st0{fill:#ffb300;}.st1{fill:#110f48;}.st2{fill:none;}.st3{fill-opacity:0;}</style><g><path class="st0" d="M293.06,159.71c-2.16,0-4.26-1.1-5.44-3.09L241.93,79.7l-33.18,21.86c-1.23,0.81-2.64,1.13-4.01,1.02l28.73,47.49c1.81,2.99,0.85,6.87-2.14,8.68c-2.99,1.81-6.87,0.85-8.68-2.14l-55.39-91.56l-89.92,57.78L92.8,148.9c1.78,3,0.79,6.88-2.21,8.66c-3,1.78-6.88,0.79-8.66-2.21l-18.56-31.3c-1.74-2.93-0.84-6.7,2.02-8.54L165.9,50.92c1.44-0.92,3.19-1.23,4.84-0.84c1.66,0.38,3.1,1.43,3.98,2.89l24.72,40.87c0.47-1.12,1.26-2.11,2.35-2.83l38.71-25.5c1.44-0.95,3.21-1.27,4.89-0.88c1.68,0.39,3.13,1.45,4.02,2.93l28,47.13c0.43-0.58,0.98-1.09,1.62-1.5l40.63-26.23c1.46-0.94,3.24-1.24,4.92-0.83c1.69,0.41,3.13,1.49,3.99,3L362.92,149c1.74,3.03,0.69,6.89-2.34,8.63c-3.03,1.74-6.89,0.69-8.63-2.34l-31.03-54.1l-35.03,22.62c-0.78,0.5-1.63,0.81-2.5,0.94l15.09,25.41c1.78,3,0.79,6.88-2.21,8.66C295.27,159.42,294.16,159.71,293.06,159.71z"/><path class="st0" d="M133.21,342.11c-2.86,0-5.45-1.95-6.14-4.86l-26.13-109.59c-0.81-3.4,1.29-6.8,4.68-7.61c3.39-0.82,6.8,1.29,7.61,4.68l26.13,109.59c0.81,3.4-1.29,6.8-4.68,7.61C134.18,342.06,133.69,342.11,133.21,342.11z M260.27,342c-0.25,0-0.51-0.01-0.76-0.04c-3.47-0.42-5.94-3.56-5.52-7.03l10.92-90.94c0.42-3.46,3.56-5.93,7.03-5.52c3.47,0.42,5.94,3.56,5.52,7.03l-10.92,90.94C266.15,339.64,263.42,342,260.27,342z M217.04,342c-0.01,0-0.02,0-0.03,0c-3.49-0.02-6.31-2.86-6.29-6.35l0.4-78.81c0.02-3.48,2.84-6.29,6.32-6.29c0.01,0,0.02,0,0.03,0c3.49,0.02,6.31,2.86,6.29,6.35l-0.4,78.81C223.34,339.19,220.51,342,217.04,342z M301.22,341.96c-0.48,0-0.97-0.05-1.46-0.17c-3.4-0.8-5.5-4.21-4.7-7.6l25.87-109.55c0.8-3.4,4.21-5.5,7.6-4.7c3.4,0.8,5.5,4.21,4.7,7.6l-25.87,109.55C306.68,340,304.08,341.96,301.22,341.96z M174.25,341.25c-3.14,0-5.86-2.34-6.26-5.54l-11.08-88.44c-0.43-3.46,2.02-6.62,5.49-7.06c3.47-0.43,6.62,2.02,7.06,5.49l11.08,88.44c0.43,3.46-2.02,6.62-5.49,7.06C174.78,341.24,174.52,341.25,174.25,341.25z"/><path class="st1" d="M216.98,208.2c0,0-0.01,0-0.01,0c-2.81-0.01-5.18-1.84-6-4.37c-2.79-0.66-4.86-3.16-4.86-6.15c0-2.89,1.93-5.32,4.58-6.08l0.3-133.7c0.01-3.49,2.84-6.31,6.32-6.31c0,0,0.01,0,0.01,0c3.49,0.01,6.31,2.84,6.31,6.34l-0.31,135.01c1.3,1.16,2.12,2.84,2.12,4.72c0,1.9-0.84,3.6-2.16,4.76C223.01,205.66,220.29,208.2,216.98,208.2z"/><path class="st1" d="M387,203.45H43c-10.6,0-19.22-8.62-19.22-19.22v-17.2c0-10.6,8.62-19.22,19.22-19.22h344c10.6,0,19.22,8.62,19.22,19.22v17.2C406.22,194.83,397.6,203.45,387,203.45z M43,160.45c-3.63,0-6.58,2.95-6.58,6.58v17.2c0,3.63,2.95,6.58,6.58,6.58h344c3.63,0,6.58-2.95,6.58-6.58v-17.2c0-3.63-2.95-6.58-6.58-6.58H43z"/><path class="st1" d="M312.46,380.09H119.12c-14.7,0-29.5-11.03-33.71-25.11L39.09,200.01c-1-3.35,0.9-6.87,4.25-7.87c3.35-1,6.87,0.9,7.87,4.25l46.32,154.96c2.61,8.72,12.5,16.09,21.6,16.09h193.33c9.08,0,18.87-7.37,21.38-16.09l44.94-155.98c0.97-3.35,4.47-5.29,7.82-4.32c3.35,0.97,5.29,4.47,4.32,7.82l-44.94,155.98C341.9,369,327.18,380.09,312.46,380.09z"/><ellipse class="st1" cx="215.8" cy="208.65" rx="17.67" ry="16.45"/></g></svg>`,
        clock : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 430 430" style="width: 400px; height: 400px;enable-background:new 0 0 430 430;" xml:space="preserve"><style type="text/css">.st0{fill:#110f48;}.st1{fill:#ffb300;}.st2{fill:none;stroke:#08A88A;stroke-width:12.25;stroke-miterlimit:14;}.st3{fill-opacity:0;}.st4{fill:#131432;}.st5{fill:none;}</style><g><path class="st0" d="M215,389.16c-46.52,0-90.25-18.12-123.15-51.01C58.96,305.25,40.84,261.52,40.84,215s18.12-90.25,51.01-123.15C124.75,58.96,168.48,40.84,215,40.84s90.25,18.12,123.15,51.01c32.89,32.89,51.01,76.63,51.01,123.15s-18.12,90.25-51.01,123.15l0,0l0,0C305.25,371.04,261.52,389.16,215,389.16z M215,52.17c-43.49,0-84.39,16.94-115.14,47.69S52.17,171.51,52.17,215s16.94,84.39,47.69,115.14s71.65,47.69,115.14,47.69s84.39-16.94,115.14-47.69l0,0c30.76-30.76,47.69-71.65,47.69-115.14s-16.94-84.39-47.69-115.14S258.49,52.17,215,52.17z"/><path class="st1" d="M215,217.43c-3.13,0-5.66-2.53-5.66-5.66V95.97c0-3.13,2.53-5.66,5.66-5.66s5.66,2.53,5.66,5.66v115.79C220.66,214.89,218.13,217.43,215,217.43z"/><path class="st1" d="M215,220.66c-1.45,0-2.9-0.55-4-1.66c-2.21-2.21-2.21-5.79,0-8.01l60.22-60.22c2.21-2.21,5.79-2.21,8.01,0s2.21,5.79,0,8.01L219,219C217.9,220.11,216.45,220.66,215,220.66z"/></g></svg>`,
        share : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 430 430" style="width: 400px; height: 400px;enable-background:new 0 0 430 430;" xml:space="preserve"><style type="text/css">.st0{fill:#110f48;}.st1{fill:#ffb300;}.st2{fill:none;stroke:#121331;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}.st3{fill:none;stroke:#08A88A;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}.st4{fill:#08A789;}</style><g><path class="st0" d="M310.33,354.5H81.57c-3.31,0-6-2.69-6-6V119.62c0-24.33,19.78-44.12,44.1-44.12H215c3.31,0,6,2.69,6,6s-2.69,6-6,6h-95.33c-17.7,0-32.1,14.41-32.1,32.12V342.5h222.76c17.7,0,32.1-14.41,32.1-32.12v-96.44c0-3.31,2.69-6,6-6c3.31,0,6,2.69,6,6v96.44C354.43,334.71,334.65,354.5,310.33,354.5z"/><path class="st1" d="M348.43,175.74c-3.31,0-6-2.69-6-6V87.5H260c-3.31,0-6-2.69-6-6s2.69-6,6-6h88.43c3.31,0,6,2.69,6,6v88.25C354.43,173.06,351.75,175.74,348.43,175.74z"/><path class="st1" d="M215.14,220.86c-1.54,0-3.07-0.59-4.24-1.76c-2.34-2.34-2.34-6.14,0-8.49L344.19,77.26c2.34-2.34,6.14-2.34,8.49,0c2.34,2.34,2.34,6.14,0,8.49L219.38,219.1C218.21,220.28,216.67,220.86,215.14,220.86z"/></g></svg>`,
        photo : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 430 430" style="width: 400px; height: 400px;enable-background:new 0 0 430 430;" xml:space="preserve"><style type="text/css">.st0{fill:#110f48;}.st1{fill:#ffb300;}.st2{fill-opacity:0;}.st3{fill:none;}</style><g><g><path class="st2" d="M310.23,151.82c0,17.02-13.79,30.81-30.81,30.81c-17.02,0-30.81-13.79-30.81-30.81s13.79-30.81,30.81-30.81C296.44,121.01,310.23,134.81,310.23,151.82z"/><path class="st1" d="M279.43,189.07c-20.54,0-37.25-16.71-37.25-37.25s16.71-37.25,37.25-37.25s37.25,16.71,37.25,37.25S299.96,189.07,279.43,189.07z M279.43,127.45c-13.44,0-24.37,10.93-24.37,24.37s10.93,24.37,24.37,24.37s24.37-10.93,24.37-24.37S292.86,127.45,279.43,127.45z"/></g><g><path class="st2" d="M243.32,348.06l51.81-89.57l52.37,89.65"/><path class="st1" d="M347.52,354.58c-2.21,0-4.37-1.14-5.57-3.19l-46.79-80.08l-46.27,79.99c-1.78,3.08-5.72,4.13-8.8,2.35c-3.08-1.78-4.13-5.72-2.35-8.8l51.81-89.58c1.15-1.99,3.27-3.21,5.56-3.22c0,0,0.01,0,0.01,0c2.29,0,4.41,1.21,5.56,3.19l52.37,89.65c1.79,3.07,0.76,7.02-2.31,8.81C349.74,354.29,348.62,354.58,347.52,354.58z"/></g><g><path class="st2" d="M83.89,347.76l106.18-182.58l79.43,136.46"/><path class="st1" d="M83.89,354.2c-1.1,0-2.21-0.28-3.23-0.87c-3.07-1.79-4.12-5.73-2.33-8.8l106.18-182.58c1.15-1.98,3.27-3.2,5.57-3.2c2.29,0,4.41,1.22,5.57,3.2l79.43,136.46c1.79,3.07,0.75,7.02-2.33,8.81c-3.07,1.79-7.02,0.75-8.81-2.33l-73.86-126.89L89.46,350.99C88.26,353.05,86.1,354.2,83.89,354.2z"/></g><g><path class="st2" d="M375.94,349.25H54.06V80.75h321.87V349.25z"/><path class="st0" d="M375.94,355.69H54.06c-3.56,0-6.44-2.88-6.44-6.44V80.75c0-3.56,2.88-6.44,6.44-6.44h321.88c3.56,0,6.44,2.88,6.44,6.44v268.5C382.38,352.81,379.49,355.69,375.94,355.69z M60.5,342.81h309V87.19h-309V342.81z"/></g></g></svg>`,
        home : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 430 430" style="width: 400px; height: 400px;enable-background:new 0 0 430 430;" xml:space="preserve"><style type="text/css">.st0{fill:#110f48;}.st1{fill:#ffb300;}.st2{fill-opacity:0;}.st3{fill:none;}</style><g><path class="st0" d="M379.33,210.9h-0.12c-1.63,0-3.2-0.62-4.39-1.72l-67.54-62.62c-2.62-2.43-2.77-6.52-0.35-9.13c2.43-2.62,6.52-2.77,9.13-0.35l66.85,61.97c1.74,1.16,2.88,3.14,2.88,5.38C385.79,208.01,382.9,210.9,379.33,210.9z M249.49,90.65c-1.57,0-3.15-0.57-4.39-1.72c-19.33-17.91-32.91-30.51-32.91-30.51c-1.75-1.62-2.46-4.07-1.86-6.38s2.43-4.09,4.75-4.65l1.21-0.29c3.44-0.82,6.9,1.28,7.77,4.7c5.06,4.69,15.97,14.81,29.83,27.65c2.62,2.43,2.77,6.52,0.35,9.13C252.96,89.95,251.23,90.65,249.49,90.65z"/><path class="st0" d="M346.92,383.08c-3.34,0-6.17-2.57-6.44-5.95c-0.11-1.4,0.23-2.73,0.9-3.84v-168.9c0-3.57,2.89-6.46,6.46-6.46s6.46,2.89,6.46,6.46v172.16c0,3.37-2.59,6.17-5.95,6.44l-0.92,0.07C347.26,383.07,347.09,383.08,346.92,383.08z"/><path class="st1" d="M317.87,140.19c-3.56,0-6.46-2.88-6.46-6.45l-0.12-56.97c-2.73-0.8-4.69-3.34-4.64-6.32c0.07-3.57,3.04-6.44,6.58-6.34l4.63,0.08c3.52,0.06,6.34,2.93,6.34,6.45l0.13,63.07c0.01,3.57-2.88,6.47-6.45,6.48C317.88,140.19,317.88,140.19,317.87,140.19z"/><path class="st1" d="M317.56,150.81c-3.57,0-6.46-2.89-6.46-6.46V76.3h-34.21v24.09c0,3.57-2.89,6.46-6.46,6.46s-6.46-2.89-6.46-6.46V69.84c0-3.57,2.89-6.46,6.46-6.46h47.14c3.57,0,6.46,2.89,6.46,6.46v74.51C324.03,147.92,321.13,150.81,317.56,150.81z"/><path class="st1" d="M257.44,383.06c-3.57,0-6.46-2.89-6.46-6.46V244.83h-70.71v131.76c0,3.57-2.89,6.46-6.46,6.46s-6.46-2.89-6.46-6.46V238.37c0-3.57,2.89-6.46,6.46-6.46h83.64c3.57,0,6.46,2.89,6.46,6.46v138.23C263.9,380.16,261.01,383.06,257.44,383.06z"/><path class="st0" d="M50.67,210.9c-1.75,0-3.5-0.71-4.77-2.1c-2.41-2.63-2.22-6.72,0.41-9.13L211.26,48.9c2.48-2.27,6.29-2.26,8.75,0.03L382.64,199.7c2.62,2.43,2.77,6.52,0.35,9.13c-2.43,2.62-6.51,2.77-9.13,0.35L215.59,62.45L55.03,209.21C53.79,210.34,52.23,210.9,50.67,210.9z"/><path class="st0" d="M347.9,383.06H81.63c-3.57,0-6.46-2.89-6.46-6.46V180.28c0-3.57,2.89-6.46,6.46-6.46s6.46,2.89,6.46,6.46v189.85h253.34V186.09c0-3.57,2.89-6.46,6.46-6.46s6.46,2.89,6.46,6.46v190.5C354.36,380.16,351.47,383.06,347.9,383.06z"/></g></svg>`,
        home2 : `<svg style="width:400px;height:400px;" xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <polyline stroke="#FFA200" points="9 22 9 12 15 12 15 22"/> <path stroke="#110F48" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
        free : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 430 430" style="width: 400px; height: 400px;enable-background:new 0 0 430 430;" xml:space="preserve"><style type="text/css">.st0{fill:#ffb300;}.st1{fill:#110f48;}</style><path class="st0" d="M133.9,257.3c-3.3,0-6-2.7-6-6v-69.1c0-3.3,2.7-6,6-6h24.5c3.3,0,6,2.7,6,6s-2.7,6-6,6h-18.5v63.1C139.9,254.6,137.2,257.3,133.9,257.3z"/><path class="st0" d="M179,257.3c-3.3,0-6-2.7-6-6v-69.1c0-2.8,1.9-5.2,4.6-5.8c1.5-0.4,15.2-3.3,24.4,4c3.4,2.7,7.4,7.9,7.4,17.2c0,9.5-1.9,15.8-6.1,19.9c-5.2,5.1-12.2,5-18.4,4.9v29C185,254.6,182.3,257.3,179,257.3z M185,210.3C185,210.3,185.1,210.3,185,210.3c4.5,0.1,8.3,0.2,10-1.5c0.9-0.9,2.5-3.6,2.5-11.3c0-5.5-2.2-7.2-2.9-7.8c-2.4-1.9-6.4-2.3-9.6-2.2V210.3z"/><path class="st0" d="M249.1,257.3h-24.5c-3.3,0-6-2.7-6-6v-69.1c0-3.3,2.7-6,6-6h24.5c3.3,0,6,2.7,6,6s-2.7,6-6,6h-18.5v57.1h18.5c3.3,0,6,2.7,6,6S252.4,257.3,249.1,257.3z"/><path class="st0" d="M153.3,222h-19.4c-3.3,0-6-2.7-6-6s2.7-6,6-6h19.4c3.3,0,6,2.7,6,6S156.6,222,153.3,222z"/><path class="st0" d="M203.5,257.3c-2.6,0-4.9-1.7-5.7-4.2l-10.8-35.2c-1-3.2,0.8-6.5,4-7.5c3.2-1,6.5,0.8,7.5,4l10.8,35.2c1,3.2-0.8,6.5-4,7.5C204.7,257.2,204.1,257.3,203.5,257.3z"/><path class="st0" d="M243.8,222.3h-17.8c-3.3,0-6-2.7-6-6s2.7-6,6-6h17.8c3.3,0,6,2.7,6,6S247.1,222.3,243.8,222.3z"/><path class="st0" d="M295.2,257.3h-24.5c-3.3,0-6-2.7-6-6v-69.1c0-3.3,2.7-6,6-6h24.5c3.3,0,6,2.7,6,6s-2.7,6-6,6h-18.5v57.1h18.5c3.3,0,6,2.7,6,6S298.5,257.3,295.2,257.3z"/><path class="st0" d="M289.9,222.3h-17.8c-3.3,0-6-2.7-6-6s2.7-6,6-6h17.8c3.3,0,6,2.7,6,6S293.2,222.3,289.9,222.3z"/><path class="st1" d="M329.7,147.9c-2.4,0-4.7-1.5-5.6-3.9c-15.6-41.1-55.7-44.3-57.4-44.4c-3.3-0.2-5.8-3.1-5.6-6.4s3.1-5.8,6.4-5.6c2,0.1,49.4,3.7,67.9,52.1c1.2,3.1-0.4,6.6-3.5,7.7C331.2,147.7,330.4,147.9,329.7,147.9z"/><circle class="st1" cx="335.9" cy="166" r="6.1"/><path class="st1" d="M213.9,390.5c-17.9,0-39.3-5.8-62.3-24c-5.6-0.8-22.8-3.9-40.6-13.7c-27.9-15.4-43.9-40.2-46.3-71.7c-3.9-4.7-14.7-18.8-20.6-38.8c-6.6-22.2-8.1-55.9,21.2-91.1c0.2-6,1.7-22.5,10.2-39.4c9.7-19.1,30.4-42.1,74.4-44.8c4.5-4.6,17.1-16.1,35.5-22.6c20.9-7.5,53.5-9.8,90.3,21c6.1-0.1,22.4,0.7,39.5,8.9c19.5,9.4,43.8,30.5,49.7,77.9c4.1,4.3,14.8,17,20.8,35.6c6.7,20.8,8.4,53.1-20.6,89.5c-0.3,6.1-1.9,23.8-11.1,42c-10.3,20.1-32.4,44.4-78.7,46.7c-4.5,4.1-17,14.5-35.2,20.4C232.7,388.7,223.9,390.5,213.9,390.5z M212.8,51.4c-7.8,0-15.6,1.4-23.3,4.1c-20,7.1-32.2,21-32.3,21.1c-1.1,1.2-2.6,2-4.3,2.1c-32,1.4-54.4,14.3-66.6,38.4c-9.2,18.2-9,36-9,36.1c0,1.5-0.5,2.9-1.4,4C54,182.7,47.2,210,55.5,238.5c6.3,21.6,19.3,36,19.5,36.1c0.9,1,1.5,2.3,1.6,3.7c1.7,28.6,15.2,50.1,40.3,63.9c19,10.5,37.6,12.5,37.8,12.5c1.2,0.1,2.3,0.6,3.2,1.3c25.6,20.9,51.9,27.3,78.1,19c19.9-6.3,32.4-19.1,32.5-19.2c1.1-1.1,2.6-1.8,4.1-1.8c33.6-1.1,57.3-14.5,70.5-39.9c10.1-19.3,10.1-38.8,10.1-39c0-1.4,0.5-2.8,1.4-3.8c21.5-26.2,28.2-52.9,19.9-79.4c-6.3-20-19.2-32.6-19.4-32.7c-1-1-1.7-2.3-1.8-3.7c-3.9-34.6-18.3-58.3-42.8-70.3c-18.5-9.1-36.3-7.9-36.5-7.9c-1.6,0.1-3.2-0.4-4.4-1.4C250.8,59.6,231.7,51.4,212.8,51.4z"/></svg>`,
        help : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 430 430" style="width: 400px; height: 400px;enable-background:new 0 0 430 430;" xml:space="preserve"><style type="text/css">.st0{fill:#ffb300;}.st1{fill:#110f48;}.st2{fill:none;}.st3{fill:#08A88A;fill-opacity:0;}</style><g><path class="st1" d="M215,391.41c-97.27,0-176.41-79.14-176.41-176.41S117.73,38.59,215,38.59S391.41,117.73,391.41,215S312.27,391.41,215,391.41z M215,50.49c-90.71,0-164.51,73.8-164.51,164.51S124.29,379.51,215,379.51S379.51,305.71,379.51,215S305.71,50.49,215,50.49z M215,333.35c-65.26,0-118.35-53.09-118.35-118.35c0-65.26,53.09-118.35,118.35-118.35S333.35,149.74,333.35,215C333.35,280.26,280.26,333.35,215,333.35z M215,108.55c-58.7,0-106.45,47.75-106.45,106.45c0,58.7,47.75,106.45,106.45,106.45S321.45,273.7,321.45,215C321.45,156.3,273.7,108.55,215,108.55z"/><path class="st0" d="M214.87,391.82c-22.94,0-45.33-4.38-66.58-13.03c-3.22-1.31-4.77-4.99-3.46-8.21l21.88-53.79c0.63-1.55,1.85-2.78,3.39-3.43s3.27-0.66,4.82-0.03c12.96,5.27,26.65,7.88,40.65,7.82c14-0.08,27.64-2.89,40.55-8.33c3.21-1.35,6.9,0.15,8.25,3.36l22.56,53.5c0.65,1.54,0.66,3.27,0.03,4.82c-0.63,1.55-1.85,2.78-3.39,3.43c-21.5,9.06-44.23,13.74-67.56,13.88C215.64,391.82,215.25,391.82,214.87,391.82z M158.92,369.39c18.3,6.65,37.45,9.93,57.02,9.83c19.57-0.12,38.67-3.67,56.9-10.55l-17.69-41.93c-12.68,4.58-25.94,6.94-39.5,7.02c-13.57,0.12-26.85-2.11-39.58-6.52L158.92,369.39z M57.87,287.43c-0.81,0-1.61-0.15-2.37-0.46c-1.55-0.63-2.78-1.85-3.43-3.39c-9.06-21.5-13.73-44.23-13.88-67.56c-0.15-23.34,4.23-46.13,13.02-67.73c1.31-3.22,4.99-4.77,8.21-3.46l53.79,21.88c1.55,0.63,2.78,1.85,3.43,3.39c0.65,1.54,0.66,3.27,0.03,4.82c-5.27,12.96-7.9,26.63-7.82,40.65c0.09,14,2.89,27.64,8.33,40.55c1.35,3.21-0.15,6.9-3.36,8.25l-53.5,22.56C59.53,287.27,58.7,287.43,57.87,287.43z M60.61,158.92c-6.65,18.3-9.95,37.45-9.83,57.02c0.12,19.57,3.67,38.68,10.56,56.9l41.93-17.69c-4.58-12.68-6.94-25.94-7.02-39.5c-0.08-13.57,2.11-26.85,6.52-39.58L60.61,158.92z M372.96,285.64c-0.79,0-1.59-0.15-2.37-0.47l-53.79-21.88c-1.55-0.63-2.78-1.85-3.43-3.39c-0.65-1.54-0.66-3.27-0.03-4.82c5.27-12.96,7.9-26.63,7.82-40.65c-0.09-14-2.89-27.64-8.33-40.55c-1.35-3.21,0.15-6.9,3.36-8.25l53.5-22.56c1.54-0.65,3.27-0.66,4.82-0.03c1.55,0.63,2.78,1.85,3.43,3.39c9.06,21.5,13.73,44.23,13.88,67.56c0.15,23.34-4.23,46.13-13.02,67.73C377.8,284.16,375.45,285.64,372.96,285.64z M327.23,253.93l42.16,17.15c6.65-18.3,9.95-37.45,9.83-57.02c-0.12-19.57-3.67-38.67-10.56-56.9l-41.93,17.69c4.58,12.68,6.94,25.94,7.02,39.5C333.84,227.92,331.65,241.2,327.23,253.93z M171.43,117.67c-2.46,0-4.79-1.45-5.81-3.85l-22.56-53.5c-0.65-1.54-0.66-3.27-0.03-4.82c0.63-1.55,1.85-2.78,3.39-3.43c21.5-9.06,44.23-13.73,67.56-13.88c23.37-0.15,46.13,4.23,67.73,13.02c3.22,1.31,4.77,4.99,3.46,8.21l-21.88,53.79c-0.63,1.55-1.85,2.78-3.39,3.43c-1.54,0.65-3.27,0.66-4.82,0.03c-12.96-5.27-26.66-7.92-40.65-7.82c-14,0.09-27.64,2.89-40.55,8.33C173.08,117.51,172.25,117.67,171.43,117.67z M157.17,61.33l17.69,41.93c12.68-4.58,25.94-6.94,39.5-7.02c13.58-0.1,26.85,2.11,39.58,6.52l17.15-42.16c-18.3-6.65-37.45-9.94-57.02-9.83C194.5,50.9,175.39,54.45,157.17,61.33z"/></g></svg>`,
        policy : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 430 430" style="width: 400px; height: 400px;enable-background:new 0 0 430 430;" xml:space="preserve"><style type="text/css">.st0{fill:#110f48;}.st1{fill:#ffb300;}.st2{fill:#ffb300;}.st3{fill:none;stroke:#08A789;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><g><path class="st1" d="M215,353.43c-1.31,0-2.61-0.43-3.7-1.28L197.06,341c-7.26-5.78-12.42-13.89-14.57-22.87c-0.04-0.15-0.06-0.29-0.09-0.44l-4.53-28.13c-0.51-3.16,1.55-6.16,4.68-6.82c12.74-2.69,25.82-6.94,28-9.09c1.14-1.27,2.75-1.98,4.46-1.98c1.7,0,3.32,0.74,4.45,2.01c2.16,2.13,15.24,6.38,27.97,9.07c3.13,0.66,5.19,3.66,4.68,6.82l-4.53,28.13c-0.02,0.15-0.05,0.3-0.09,0.44c-2.15,8.98-7.31,17.1-14.54,22.85l-14.27,11.19C217.61,353.01,216.31,353.43,215,353.43z M194.21,315.54c1.56,6.31,5.21,11.99,10.29,16.04l10.5,8.23l10.53-8.26c5.05-4.02,8.69-9.71,10.25-16.01l3.6-22.32c-7.55-1.8-17.95-4.69-24.38-8.25c-6.43,3.55-16.83,6.45-24.38,8.25L194.21,315.54z"/><path class="st0" d="M334.41,121.39c0-0.07-0.01-0.13-0.01-0.2c-0.02-0.26-0.05-0.51-0.09-0.76c0,0,0,0,0,0c-0.05-0.26-0.12-0.5-0.21-0.75c-0.02-0.06-0.04-0.12-0.06-0.18c-0.09-0.24-0.19-0.47-0.3-0.69c0-0.01-0.01-0.02-0.01-0.03c-0.12-0.23-0.27-0.45-0.42-0.67c-0.04-0.05-0.07-0.1-0.11-0.15c-0.16-0.21-0.33-0.42-0.52-0.61l-66.72-66.72c-0.19-0.19-0.39-0.36-0.6-0.52c-0.05-0.04-0.11-0.08-0.16-0.12c-0.21-0.15-0.43-0.29-0.66-0.41c-0.02-0.01-0.03-0.01-0.05-0.02c-0.22-0.11-0.44-0.21-0.67-0.29c-0.06-0.02-0.13-0.05-0.19-0.07c-0.24-0.08-0.49-0.15-0.74-0.2c-0.01,0-0.01,0-0.02,0c-0.25-0.05-0.5-0.08-0.75-0.09c-0.07,0-0.14-0.01-0.21-0.01c-0.07,0-0.13-0.01-0.2-0.01H101.58c-3.31,0-6,2.69-6,6v320.24c0,3.31,2.69,6,6,6h226.84c3.31,0,6-2.69,6-6V121.6C334.42,121.53,334.41,121.46,334.41,121.39z M313.93,115.6H267.7V69.37L313.93,115.6z M107.58,369.12V60.88H255.7v60.72c0,3.31,2.69,6,6,6h60.72v241.52H107.58z"/><g><path class="st0" d="M290.03,164.67H139.97c-3.31,0-6-2.69-6-6s2.69-6,6-6h150.06c3.31,0,6,2.69,6,6S293.34,164.67,290.03,164.67z"/><path class="st0" d="M290.03,205.08H139.97c-3.31,0-6-2.69-6-6s2.69-6,6-6h150.06c3.31,0,6,2.69,6,6S293.34,205.08,290.03,205.08z"/><path class="st0" d="M217.19,245.5h-77.22c-3.31,0-6-2.69-6-6s2.69-6,6-6h77.22c3.31,0,6,2.69,6,6S220.5,245.5,217.19,245.5z"/><path class="st0" d="M290.03,245.5h-40.98c-3.31,0-6-2.69-6-6s2.69-6,6-6h40.98c3.31,0,6,2.69,6,6S293.34,245.5,290.03,245.5z"/></g></g></svg>`,
        lock : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;width: 400px; height: 400px;" xml:space="preserve"><g><g><path fill="#110f48" d="M397.86,247.03c0.01-0.179-0.49-0.331-0.49-0.512V128c0-70.579-58.343-128-131.514-128h-19.042c-73.171,0-133.889,57.421-133.889,128v118.518c0,0.181,0.685,0.332,0.696,0.512c-18.003,27.039-28.251,59.454-28.251,94.303C85.37,435.435,162.079,512,256.185,512S426.63,435.435,426.63,341.333C426.63,306.484,415.862,274.069,397.86,247.03z M131.889,128c0-60.125,52.208-109.037,114.926-109.037h19.042c62.713,0,112.551,48.912,112.551,109.037v95.61c-30.815-32.545-74.8-52.943-123.259-52.943c-48.459,0-90.074,20.398-123.259,52.943V128z M256.333,493.037c-83.648,0-151.704-68.055-151.704-151.704S172.685,189.63,256.333,189.63s151.704,68.055,151.704,151.704S339.982,493.037,256.333,493.037z"/></g></g><g><g><path fill="#ffb300" d="M256.333,274.963c-36.597,0-66.37,29.778-66.37,66.37s29.773,66.37,66.37,66.37c36.597,0,66.37-29.778,66.37-66.37S292.931,274.963,256.333,274.963z M256.333,388.741c-26.139,0-47.407-21.269-47.407-47.407c0-26.139,21.269-47.407,47.407-47.407s47.407,21.269,47.407,47.407C303.741,367.472,282.472,388.741,256.333,388.741z"/></g></g></svg>`,
        unlock : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;width: 400px; height: 400px;" xml:space="preserve"><g><g><path fill="#110f48" d="M397.86,247.03c0.01-0.179-0.49-0.331-0.49-0.512V128c0-70.579-58.343-128-131.514-128h-19.042c-73.171,0-132.704,57.421-132.704,128c0,5.236,4.245,9.482,9.481,9.482s9.482-4.245,9.482-9.482c0-60.125,51.023-109.037,113.741-109.037h19.042c62.713,0,112.551,48.912,112.551,109.037v95.61c-30.815-32.545-74.207-52.943-122.667-52.943c-94.107,0-170.37,76.56-170.37,170.667C85.37,435.435,162.079,512,256.185,512S426.63,435.435,426.63,341.333C426.63,306.484,415.862,274.069,397.86,247.03z M256.333,493.037c-83.648,0-151.704-68.055-151.704-151.704S172.685,189.63,256.333,189.63s151.704,68.055,151.704,151.704S339.982,493.037,256.333,493.037z"/></g></g><g><g><path fill="#ffb300" d="M256.333,274.963c-36.597,0-66.37,29.778-66.37,66.37s29.773,66.37,66.37,66.37c36.597,0,66.37-29.778,66.37-66.37S292.931,274.963,256.333,274.963z M256.333,388.741c-26.139,0-47.407-21.269-47.407-47.407c0-26.139,21.269-47.407,47.407-47.407c26.139,0,47.407,21.269,47.407,47.407C303.741,367.472,282.472,388.741,256.333,388.741z"/></g></g></svg>`,
        error : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" height="400" viewBox="0 0 400 400" xml:space="preserve"><defs></defs><g transform="translate(200 200)"><g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(-175.05 -175.05) scale(3.89 3.89)" ><path class="jello-vertical" d="M 28.5 65.5 c -1.024 0 -2.047 -0.391 -2.829 -1.172 c -1.562 -1.562 -1.562 -4.095 0 -5.656 l 33 -33 c 1.561 -1.562 4.096 -1.562 5.656 0 c 1.563 1.563 1.563 4.095 0 5.657 l -33 33 C 30.547 65.109 29.524 65.5 28.5 65.5 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,0,82); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/><path class="jello-vertical" d="M 61.5 65.5 c -1.023 0 -2.048 -0.391 -2.828 -1.172 l -33 -33 c -1.562 -1.563 -1.562 -4.095 0 -5.657 c 1.563 -1.562 4.095 -1.562 5.657 0 l 33 33 c 1.563 1.562 1.563 4.095 0 5.656 C 63.548 65.109 62.523 65.5 61.5 65.5 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,0,82); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/><path class="/*jello-vertical*/" d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z M 45 8 C 24.598 8 8 24.598 8 45 c 0 20.402 16.598 37 37 37 c 20.402 0 37 -16.598 37 -37 C 82 24.598 65.402 8 45 8 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,0,82); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/></g></g></svg>`,
        info : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 281.488 281.488" style="enable-background:new 0 0 281.488 281.488;width: 400px; height: 400px;" xml:space="preserve"><g><path fill="#0dc7f2" d="M140.744,0C63.138,0,0,63.138,0,140.744s63.138,140.744,140.744,140.744s140.744-63.138,140.744-140.744S218.351,0,140.744,0z M140.744,263.488C73.063,263.488,18,208.426,18,140.744S73.063,18,140.744,18s122.744,55.063,122.744,122.744S208.425,263.488,140.744,263.488z"/><path fill="#0dc7f2" d="M163.374,181.765l-16.824,9.849v-71.791c0-3.143-1.64-6.058-4.325-7.69c-2.686-1.632-6.027-1.747-8.818-0.299l-23.981,12.436c-4.413,2.288-6.135,7.72-3.847,12.132c2.289,4.413,7.72,6.136,12.133,3.847l10.838-5.62v72.684c0,3.225,1.726,6.203,4.523,7.808c1.387,0.795,2.932,1.192,4.477,1.192c1.572,0,3.143-0.411,4.546-1.232l30.371-17.778c4.29-2.512,5.732-8.024,3.221-12.314S167.663,179.255,163.374,181.765z"/><circle fill="#0dc7f2" cx="137.549" cy="86.612" r="12.435"/></g></svg>`,
        success : `<svg width="400px" height="400px" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"> <g fill-rule="evenodd"> <path fill="#cff09e" d="M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7z"/> <path d="M13 7A6 6 0 1 0 1 7a6 6 0 0 0 12 0z" fill="#FFF" style="fill: #fff;"/> <path fill="#507c5c" d="M6.278 7.697L5.045 6.464a.296.296 0 0 0-.42-.002l-.613.614a.298.298 0 0 0 .002.42l1.91 1.909a.5.5 0 0 0 .703.005l.265-.265L9.997 6.04a.291.291 0 0 0-.009-.408l-.614-.614a.29.29 0 0 0-.408-.009L6.278 7.697z"/> </g></svg>`,
        add_file : `<svg width="400" height="400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 400px; height: 400px;"><style>.line-file3{animation:line-file3 2s -1.3s infinite; stroke-dasharray: 40; stroke-dashoffset: 40;}@keyframes line-file3{20%{stroke-dashoffset: 40;}60%{stroke-dashoffset: 0;}100%{stroke-dashoffset: 0;}}@media (prefers-reduced-motion: reduce){.line-file3{animation: none;}}</style><path class="fill1" d="M65 79H25C21.6863 79 19 76.3137 19 73V17C19 13.6863 21.6863 11 25 11H52.5L71 29.5V73C71 76.3137 68.3137 79 65 79Z" fill="#fff" stroke-width="2px" style="animation-duration: 2s;"></path><path class="stroke1" d="M52.5 11H25C21.6863 11 19 13.6863 19 17V73C19 76.3137 21.6863 79 25 79H65C68.3137 79 71 76.3137 71 73V29.5M52.5 11V23.5C52.5 26.8137 55.1863 29.5 58.5 29.5H71M52.5 11L71 29.5" stroke="rgba(17,15,72,1)" stroke-width="2px" style="animation-duration: 2s;"></path><circle class="stroke2 fill2" cx="71" cy="75" r="19" fill="#fff" stroke="rgba(255,179,0,1)" stroke-width="2px" style="animation-duration: 2s;"></circle><g class="line-file3" style="animation-duration: 2s;"><line class="stroke2" x1="61" y1="75.5" x2="82" y2="75.5" stroke="rgba(255,179,0,1)" stroke-width="2px" style="animation-duration: 2s;"></line><line class="stroke2" x1="71.5" y1="65" x2="71.5" y2="86" stroke="rgba(255,179,0,1)" stroke-width="2px" style="animation-duration: 2s;"></line></g></svg>`,
        token : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" height="400" viewBox="0 0 400 400"><image id="token" width="400" height="400" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAC4jAAAuIwF4pT92AAAGWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTAyLTExVDAwOjQ3OjAxKzAzOjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMi0xMVQwMDo1NjoxNCswMzozMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wMi0xMVQwMDo1NjoxNCswMzozMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiYjkzMTU3OS02ZWUyLTVhNDEtOWY0Ni1hMmEzZDk4Yzc2YzkiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpmNWNmNmQwYS1hYmUzLWM2NDAtYTE1Zi1mYjJjNWRlNDNlNzkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjNzk1NDg5Yi1jOGMxLWI3NDItOGU1My1mNzhjNTkwN2Q5ZjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM3OTU0ODliLWM4YzEtYjc0Mi04ZTUzLWY3OGM1OTA3ZDlmMSIgc3RFdnQ6d2hlbj0iMjAyMi0wMi0xMVQwMDo0NzowMSswMzozMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmJiOTMxNTc5LTZlZTItNWE0MS05ZjQ2LWEyYTNkOThjNzZjOSIgc3RFdnQ6d2hlbj0iMjAyMi0wMi0xMVQwMDo1NjoxNCswMzozMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrKZ8L4AAIzlSURBVHic7Z13nGbz9cffs2sLaxlXL8uyeu+dRM1d0YUIl4guapCQhChJBIlO9CS4ES1E3av3zup9sTqLa7HW9vn9cZ757VizOzPPObc9z3m/XvNS7/l+d+aZ+z3fUz6npa2tDcdxHMdx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"/></svg>`,
        login : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><style type="text/css">.st0{fill:none;}.st1{fill:#110f48}.st2{fill:#ffb300;-webkit-animation: slide-right 1s cubic-bezier(.9,.03,.69,.22) infinite alternate-reverse both; animation: slide-right 1s cubic-bezier(.9,.03,.69,.22) infinite alternate-reverse both;}@-webkit-keyframes slide-right{0%{-webkit-transform: translateX(0);transform: translateX(0);}100%{-webkit-transform: translateX(-2px);transform: translateX(-2px);}}@keyframes slide-right{0%{-webkit-transform: translateX(0);transform: translateX(0);}100%{-webkit-transform: translateX(-2px);transform: translateX(-2px);}}</style> <g><rect class="st0" width="24" height="24"/></g> <g><g><path class="st1" d="M18.11,21H11c-0.55,0-1-0.45-1-1s0.45-1,1-1h7.11C18.6,19,19,18.58,19,18.06V5.94C19,5.42,18.6,5,18.11,5H11c-0.55,0-1-0.45-1-1s0.45-1,1-1h7.11C19.7,3,21,4.32,21,5.94v12.12C21,19.68,19.7,21,18.11,21z"/><path class="st2" d="M16,12c0,0.09-0.01,0.17-0.04,0.25c0,0.05-0.02,0.09-0.04,0.14c-0.05,0.12-0.12,0.23-0.21,0.32l-4,4C11.51,16.9,11.26,17,11,17c-0.25,0-0.51-0.1-0.71-0.29c-0.39-0.39-0.39-1.03,0-1.42l2.3-2.29H4c-0.55,0-1-0.45-1-1s0.45-1,1-1h8.59l-2.3-2.29c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0l4,4c0.09,0.09,0.16,0.2,0.21,0.32c0.02,0.05,0.04,0.09,0.04,0.14C15.99,11.83,16,11.91,16,12z"/></g></g></svg>`,
        logout : `<svg xmlns="http://www.w3.org/2000/svg" width="350.33" height="300.426" viewBox="0 0 350.33 300.426"><style type="text/css">.st2{fill:#ffb300;-webkit-animation: slide-right .8s linear infinite alternate-reverse both;animation: slide-right .8s linear infinite alternate-reverse both;}@-webkit-keyframes slide-right{0%{-webkit-transform: translateX(0) translate(-3px , 59.5px);transform: translateX(0) translate(-3px , 59.5px);}100%{-webkit-transform: translateX(20px) translate(-3px , 59.5px);transform: translateX(20px) translate(-3px , 59.5px);}}@keyframes slide-right{0%{-webkit-transform: translateX(0) translate(-3px , 59.5px);transform: translateX(0) translate(-3px , 59.5px);}100%{-webkit-transform: translateX(20px) translate(-3px , 59.5px);transform: translateX(20px) translate(-3px , 59.5px);}}</style><g transform="translate(0 -49.904)"><g transform="translate(0 49.904)"><rect width="350" height="300" transform="translate(0 0.096)" fill="none"/></g><g transform="translate(49.904 49.904)"><g><path d="M144.908,303.426H26.635a16.69,16.69,0,0,1,0-33.381H144.908c8.151,0,14.8-7.01,14.8-15.689V52.07c0-8.679-6.654-15.689-14.8-15.689H26.635A16.69,16.69,0,0,1,26.635,3H144.908c26.449,0,48.074,22.031,48.074,49.07V254.356C192.982,281.394,171.357,303.426,144.908,303.426Z" transform="translate(107.443 -3)" fill="#110f48"/><path class="st2" d="M3,90.713A11.617,11.617,0,0,0,3.665,94.9a6.234,6.234,0,0,0,.665,2.343,16.542,16.542,0,0,0,3.493,5.355l66.539,66.939a16.987,16.987,0,0,0,11.811,4.853,17.286,17.286,0,0,0,11.811-4.853,16.94,16.94,0,0,0,0-23.763l-38.26-38.323H202.617a16.735,16.735,0,0,0,0-33.469H59.724l38.26-38.323a16.94,16.94,0,0,0,0-23.763,16.7,16.7,0,0,0-23.621,0L7.824,78.831a16.542,16.542,0,0,0-3.493,5.355,6.233,6.233,0,0,0-.665,2.343A11.618,11.618,0,0,0,3,90.713Z" transform="translate(-3 59.5)" fill="#ffb300"/></g></g></g></svg>`,
        cookie : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="fill:#FFE6A1;" d="M479.632,248.36l-24.341,4.868c-8.1,1.62-16.241-2.593-19.596-10.142l-26.073-58.666c-2.207-4.967-6.579-8.639-11.851-9.958l-13.583-3.395c-7.86-1.965-13.373-9.026-13.373-17.128V59.803c0-4.399-1.643-8.64-4.606-11.892l-32.794-35.986c-29.567-9.363-61.439-13.54-94.575-11.358C111.485,8.957,8.316,112.557,0.545,239.95C-8.522,388.608,109.356,512,256.055,512c139.923,0,253.554-112.275,255.89-251.641l-20.954-10.477C487.479,248.125,483.482,247.59,479.632,248.36z"/><g><path style="fill:#FFD796;" d="M335.503,432.551c-1.554,0-3.085-0.089-4.632-0.117c-9.7,10.881-23.782,17.772-39.506,17.772c-23.16,0-42.796-14.89-49.993-35.598c-31.679-12.537-60.253-31.189-84.267-54.537c-3.633,1.095-7.406,1.859-11.396,1.859c-21.939,0-39.724-17.785-39.724-39.724c0-7.662,2.272-14.753,6.03-20.821c-0.269-0.481-0.556-0.948-0.823-1.431c-27.555-1.868-49.344-24.753-49.344-52.782c0-16.519,7.566-31.264,19.417-40.978c-1.123-9.731-1.762-19.609-1.762-29.643c0-50.349,14.594-97.262,39.697-136.854C47.614,85.085,0.055,164.964,0.055,256c0,141.385,114.615,256,256,256c91.036,0,170.914-47.559,216.303-119.145C432.766,417.958,385.853,432.551,335.503,432.551z"/><circle style="fill:#FFD796;" cx="198.676" cy="189.793" r="22.069"/><circle style="fill:#FFD796;" cx="432.607" cy="335.448" r="22.069"/><circle style="fill:#FFD796;" cx="231.779" cy="342.069" r="15.448"/><circle style="fill:#FFD796;" cx="350.952" cy="200.827" r="15.448"/><circle style="fill:#FFD796;" cx="289.159" cy="64" r="15.448"/></g><g><path style="fill:#B97850;" d="M243.209,227.386l-10.205,17.009c-6.1,10.166-0.644,23.336,10.857,26.211l30.376,7.594c9.46,2.365,19.046-3.386,21.41-12.846l3.475-13.9c0.703-2.812,0.703-5.752,0-8.564l-3.674-14.697c-2.285-9.143-11.349-14.879-20.59-13.031l-19.972,3.994C250.008,220.133,245.769,223.121,243.209,227.386z"/><path style="fill:#B97850;" d="M294.162,336.673l-10.643,17.738c-5.291,8.819-1.955,20.276,7.243,24.875l33.882,16.941c10.102,5.052,22.284-0.552,25.024-11.509l3.49-13.96l4.079-16.319c2.539-10.156-4.267-20.279-14.632-21.76l-30.809-4.402C304.766,327.273,297.816,330.582,294.162,336.673z"/><path style="fill:#B97850;" d="M108.413,231.358l-12.989,21.649c-4.168,6.947-3.073,15.839,2.655,21.568l20.442,20.443c7.441,7.441,19.697,6.762,26.271-1.455l17.525-21.907c3.442-4.302,4.678-9.965,3.341-15.311l-3.997-15.988c-1.655-6.62-6.975-11.692-13.665-13.031l-20.982-4.196C119.698,221.666,112.252,224.96,108.413,231.358z"/><path style="fill:#B97850;" d="M180.291,88.019l-10.016,16.694c-5.811,9.685-1.159,22.261,9.556,25.833l21.735,7.245c6.344,2.114,13.338,0.463,18.067-4.265l11.699-11.699c4.385-4.385,6.148-10.75,4.644-16.766l-3.06-12.239c-1.965-7.861-9.027-13.375-17.129-13.375h-20.358C189.229,79.448,183.482,82.702,180.291,88.019z"/><path style="fill:#B97850;" d="M393.516,224.47l-10.219,10.219c-6.894,6.894-6.894,18.073,0,24.968l5.001,5.001c5.374,5.374,13.582,6.706,20.38,3.307l28.917-14.458c7.401-3.701,11.24-12.045,9.233-20.073l-1.31-5.239c-2.285-9.143-11.349-14.879-20.59-13.031l-22.389,4.478C399.12,220.324,395.981,222.005,393.516,224.47z"/><path style="fill:#B97850;" d="M327.869,98.456l-11.725,15.634c-4.307,5.742-4.708,13.522-1.015,19.677l10.849,18.081c5.186,8.644,16.545,11.198,24.932,5.607l22.03-14.687c8.434-5.622,10.412-17.175,4.331-25.283l-11.976-15.968c-2.155-2.873-5.134-5.021-8.541-6.156l-9.178-3.06C340.366,89.896,332.428,92.376,327.869,98.456z"/><path style="fill:#B97850;" d="M176.789,377.385l-11.528,14.41c-7.401,9.251-3.77,23.021,7.23,27.422l15.485,6.194c4.21,1.684,8.905,1.684,13.114,0l17.378-6.952c10.412-4.164,14.354-16.855,8.134-26.186l-2.985-4.477c-1.705-2.557-4.046-4.623-6.794-5.998l-18.35-9.175C191.024,368.9,181.989,370.885,176.789,377.385z"/></g><g><path style="fill:#A5694B;" d="M140.428,292.921l-20.442-20.442c-5.728-5.728-6.824-14.621-2.655-21.567l12.989-21.649c1.108-1.846,2.572-3.345,4.191-4.633l-7.496-1.498c-7.316-1.463-14.763,1.831-18.602,8.228l-12.989,21.649c-4.168,6.947-3.073,15.839,2.655,21.568l20.442,20.442c6.897,6.897,17.875,6.731,24.685,0.139C142.23,294.511,141.29,293.784,140.428,292.921z"/><path style="fill:#A5694B;" d="M219.248,131.506l-21.735-7.244c-10.714-3.572-15.368-16.148-9.556-25.833l10.016-16.694c0.509-0.85,1.182-1.549,1.813-2.287h-4.358c-6.201,0-11.948,3.254-15.139,8.572l-10.016,16.693c-5.812,9.685-1.16,22.261,9.556,25.833l21.735,7.245c6.344,2.114,13.338,0.463,18.067-4.265l1.645-1.645C220.6,131.741,219.914,131.728,219.248,131.506z"/><path style="fill:#A5694B;" d="M290.988,273.124l-30.376-7.594c-11.502-2.876-16.958-16.045-10.857-26.211l10.205-17.009c1.215-2.025,2.829-3.734,4.69-5.105l-9.764,1.953c-4.877,0.975-9.118,3.964-11.677,8.23l-10.205,17.009c-6.1,10.166-0.644,23.336,10.857,26.211l30.376,7.594c6.399,1.6,12.799-0.572,17.038-5.035C291.179,273.143,291.084,273.148,290.988,273.124z"/><path style="fill:#A5694B;" d="M342.469,150.321L331.62,132.24c-3.693-6.155-3.292-13.933,1.015-19.677L344.36,96.93c1.284-1.713,2.878-3.055,4.606-4.168l-1.391-0.463c-7.21-2.403-15.148,0.077-19.708,6.156l-11.724,15.633c-4.307,5.743-4.708,13.522-1.015,19.677l10.849,18.081c5.169,8.615,16.466,11.17,24.844,5.653C347.464,156.102,344.492,153.692,342.469,150.321z"/><path style="fill:#A5694B;" d="M402.467,263.482c-6.895-6.895-6.895-18.073,0-24.968l10.219-10.219c2.464-2.464,5.603-4.145,9.022-4.828l18.845-3.769c-4.032-3.832-9.789-5.703-15.626-4.535l-22.389,4.478c-3.418,0.684-6.557,2.364-9.022,4.828l-10.219,10.219c-6.894,6.895-6.894,18.073,0,24.968l5.001,5.001c5.041,5.041,12.541,6.362,19.065,3.723L402.467,263.482z"/><path style="fill:#A5694B;" d="M312.633,377.805c-9.198-4.599-12.535-16.056-7.243-24.875l10.643-17.737c1.396-2.325,3.369-4.088,5.545-5.517l-9.78-1.397c-7.032-1.005-13.981,2.303-17.635,8.394l-10.643,17.738c-5.291,8.819-1.955,20.276,7.243,24.875l33.882,16.941c6.753,3.377,14.374,1.919,19.543-2.643L312.633,377.805z"/><path style="fill:#A5694B;" d="M205.631,422.46l-15.485-6.194c-10.999-4.399-14.63-18.171-7.23-27.422l11.528-14.41c0.732-0.915,1.554-1.715,2.422-2.447c-7.106-2.721-15.242-0.647-20.077,5.398l-11.528,14.41c-7.401,9.251-3.77,23.021,7.23,27.422l15.485,6.194c4.21,1.684,8.905,1.684,13.114,0l6.177-2.471C206.72,422.781,206.163,422.673,205.631,422.46z"/></g><path style="fill:#C98850;" d="M70.665,361.922c-1.323,0-2.673-0.301-3.939-0.931c-4.362-2.181-6.13-7.482-3.948-11.844l8.828-17.655c2.182-4.362,7.47-6.112,11.844-3.948c4.362,2.182,6.13,7.482,3.948,11.844l-8.828,17.655C77.023,360.137,73.907,361.922,70.665,361.922z"/><path style="fill:#925F4A;" d="M229.572,476.689h-8.828c-4.875,0-8.828-3.948-8.828-8.828c0-4.879,3.953-8.828,8.828-8.828h8.828c4.875,0,8.828,3.948,8.828,8.828C238.4,472.741,234.447,476.689,229.572,476.689z"/><path style="fill:#C98850;" d="M194.253,308.965c-1.323,0-2.673-0.301-3.939-0.931c-4.362-2.182-6.13-7.483-3.948-11.844l8.828-17.655c2.177-4.353,7.466-6.112,11.844-3.948c4.362,2.182,6.13,7.482,3.948,11.844l-8.828,17.655C200.611,307.181,197.494,308.965,194.253,308.965z"/><g><path style="fill:#925F4A;" d="M141.288,167.724c-1.323,0-2.673-0.301-3.939-0.931l-17.655-8.828c-4.362-2.182-6.13-7.482-3.948-11.844c2.177-4.353,7.47-6.121,11.844-3.948L145.245,151c4.362,2.182,6.13,7.482,3.948,11.844C147.646,165.939,144.529,167.724,141.288,167.724z"/><path style="fill:#925F4A;" d="M247.228,44.137h-17.655c-4.875,0-8.828-3.948-8.828-8.828s3.953-8.828,8.828-8.828h17.655c4.875,0,8.828,3.948,8.828,8.828S252.103,44.137,247.228,44.137z"/></g><path style="fill:#C98850;" d="M282.547,176.551c-3.242,0-6.358-1.784-7.905-4.879l-8.828-17.655c-2.182-4.362-0.414-9.664,3.948-11.844c4.371-2.173,9.668-0.405,11.844,3.948l8.828,17.655c2.182,4.362,0.414,9.664-3.948,11.844C285.218,176.25,283.87,176.551,282.547,176.551z"/><g><path style="fill:#925F4A;" d="M40.286,219.777c-1.187-0.585-2.264-1.452-3.123-2.577c-2.95-3.884-2.191-9.421,1.694-12.37l15.722-11.936c3.881-2.951,9.414-2.185,12.37,1.694c2.95,3.884,2.191,9.421-1.694,12.37l-15.721,11.935C46.777,220.985,43.193,221.209,40.286,219.777z"/><path style="fill:#925F4A;" d="M370.814,317.793c-2.259,0-4.518-0.862-6.241-2.586l-17.655-17.655c-3.448-3.448-3.448-9.035,0-12.483s9.035-3.448,12.483,0l17.655,17.655c3.448,3.448,3.448,9.035,0,12.483C375.331,316.931,373.072,317.793,370.814,317.793z"/></g><path style="fill:#C98850;" d="M388.469,406.069c-2.259,0-4.518-0.862-6.241-2.586c-3.448-3.448-3.448-9.035,0-12.483l8.828-8.828c3.448-3.448,9.035-3.448,12.483,0c3.448,3.448,3.448,9.035,0,12.483l-8.828,8.828C392.986,405.207,390.728,406.069,388.469,406.069z"/><g><path style="fill:#FFE6A1;" d="M406.124,35.31v22.272c0,6.246,6.307,10.516,12.106,8.196l26.483-10.593c3.351-1.341,5.549-4.587,5.549-8.196V35.31c0-4.875-3.953-8.828-8.828-8.828h-26.483C410.077,26.482,406.124,30.435,406.124,35.31z"/><path style="fill:#FFE6A1;" d="M424.997,104.904l-5.633,39.434c-1.325,9.276,4.828,17.972,14.015,19.809l16.167,3.233c7.016,1.404,14.184-1.566,18.153-7.519l6.08-9.12c3.149-4.725,3.835-10.676,1.841-15.992l-18.417-49.111c-2.291-6.108-10.126-7.805-14.739-3.192l-12.472,12.471C427.29,97.618,425.538,101.123,424.997,104.904z"/></g><g><path style="fill:#FFD796;" d="M469.253,151.699l-16.167-3.233c-9.188-1.838-15.34-10.534-14.015-19.809l5.633-39.433c0.503-3.517,2.143-6.729,4.529-9.343c-2.396-0.121-4.856,0.65-6.769,2.562l-12.473,12.472c-2.701,2.701-4.454,6.206-4.993,9.987l-5.633,39.433c-1.325,9.277,4.828,17.972,14.015,19.809l16.167,3.233c7.015,1.402,14.184-1.566,18.153-7.519l5.319-7.978C471.767,151.905,470.514,151.952,469.253,151.699z"/><path style="fill:#FFD796;" d="M435.885,48.122c-5.799,2.319-12.106-1.951-12.106-8.196V26.482h-8.828c-4.875,0-8.828,3.953-8.828,8.828v22.272c0,6.246,6.307,10.516,12.106,8.196l26.483-10.593c3.351-1.341,5.549-4.586,5.549-8.196v-4.617L435.885,48.122z"/><path style="fill:#FFD796;" d="M472.318,192.523l-5.218,10.436c-1.242,2.485-1.242,5.41,0,7.895l2.381,4.764c2.375,4.749,8.374,6.343,12.792,3.398l14.231-9.487c2.456-1.638,3.931-4.394,3.931-7.345v-9.511c0-6.025-5.903-10.28-11.619-8.374l-11.395,3.798C475.201,188.836,473.365,190.428,472.318,192.523z"/></g></svg>`,
    };

    const animIcon = ( ndClass = "nAlert-icon" ) => {
        const div = document.createElement("div");
        div.classList.add(ndClass);
        const svg = document.createElement("svg");
        if (!this.options.hasOwnProperty("icon") || (!this.options.icon.hasOwnProperty("id") && !this.options.icon.hasOwnProperty("svg")) ) return;
        svg.id = "nAlert-svg";
        div.appendChild(svg);
        wrapper.appendChild(div);
        wrapper.querySelector("#nAlert-svg").outerHTML = (this.options.icon.hasOwnProperty("id")) ? icons[this.options.icon.id] : this.options.icon.svg;
    };

    const title = ( ndClass = "nAlert-title" ) => {

        const titleContainer = document.createElement("div");
        titleContainer.classList.add(ndClass);

        const custom = prepareCustomElement();

        if (custom !== false) {
            titleContainer.appendChild(custom);
        } else {
            const h2 = document.createElement("h2");
            h2.innerText = this.options.title;
            h2.classList.add("nd-h2");
            titleContainer.appendChild(h2);
        }

        const append = prepareAppendHTML();
        if (append !== false) {

        }

        content.appendChild(titleContainer);

    };

    const text = ( ndClass = "nAlert-text" ) => {

        const textContainer = document.createElement("div");
        textContainer.classList.add(ndClass);

        const custom = prepareCustomElement("text");
        if (custom !== false) {
            textContainer.appendChild(custom);
        }else{
            const p = document.createElement( (ndClass === "nd-toast-text") ? "div" : "p");
            p.innerText = this.options.text;
            p.classList.add("nd-p");
            textContainer.appendChild(p);
        }

        content.appendChild(textContainer);
    };

    const form = () => {

        if( typeof this.options.form !== "object" || this.options.form.length === 0 ) return;

        const formContainer = document.createElement("div");
        formContainer.classList.add("nAlert-inputs");

        this.options.form.map( (item, i) => {

            if (!item.hasOwnProperty("type") ) item.type = "text";

            let element;
            if( item.type === "text" ||
                item.type === "number" ||
                item.type === "password" ||
                item.type === "file" ||
                item.type === "textarea" ||
                item.type === "tags") element = createInput(item,i);

            if(item.type === "select") {
                element = document.createElement("div");
                element.classList.add("nAlert-selects");
                element.appendChild(createSelect(item,i));
            }

            if(item.type === "checkbox") {
                element = document.createElement("div");
                element.classList.add("nAlert-checkbox");
                element.appendChild(createCheckBox(item,i));
            }


            if (element) formContainer.appendChild(element);

        });

        container.addEventListener("click", function ({target}) {
            if (!target.classList.contains("nAlert-select-item") && !target.parentNode.classList.contains("nAlert-select-item")) {
                document.querySelectorAll('.nAlert-select .nAlert-select-item').forEach( e => {
                    let select = e.parentNode;
                    if (!e.tagName.toLowerCase().includes("div"))  select = e.parentNode.parentNode;
                    select.querySelector("ul").classList.remove("flipInY");
                    select.querySelector("ul").classList.add("flipOutY");

                    setTimeout( () => {
                        select.classList.remove("nAlert-select-show");
                        select.querySelector("ul").classList.add("flipInY");
                        select.querySelector("ul").classList.remove("flipOutY");
                    } , 300);
                });
            }
        });
        content.appendChild(formContainer);
    };

    const createInput = (value,i) => {
        const divInput = document.createElement("div");

        let input , tagWrapper, fileName;
        if ( value.hasOwnProperty("type") ) {
            const type =  value.type.toLowerCase();

            switch (type) {
                case 'textarea' :
                    input = document.createElement("textarea");
                    divInput.classList.add("nAlert-textarea");
                    break;
                case 'tags' :
                    input = document.createElement("input");
                    tagWrapper = document.createElement("div");
                    divInput.classList.add("nAlert-tags");
                    tagWrapper.classList.add("tags-wrapper");
                    input.onkeyup = function (e) {
                        if(e.key.toLowerCase() === "enter") {
                            const span =  document.createElement("span");
                            span.innerText = e.target.value;
                            span.onclick = function ({target}) {
                                target.remove();
                            };
                            e.target.nextElementSibling.appendChild(span);
                            e.target.value = "";

                        }
                    }

                    break;
                case 'number' :
                case 'email' :
                case 'password' :
                case 'text' :
                    input = document.createElement("input");
                    divInput.classList.add("nAlert-input");
                    input.setAttribute("type",type);
                    break;
                case 'file' :
                    input = document.createElement("input");
                    input.setAttribute("hidden","");
                    input.onchange = function ({target}) {
                        let fullPath = target.value;
                        if (fullPath) {
                            let startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
                            let filename = fullPath.substring(startIndex);
                            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) filename = filename.substring(1);
                            target.nextElementSibling.innerText = filename;
                        }
                    }
                    divInput.classList.add("nAlert-input");
                    input.setAttribute("type",type);
                    fileName = document.createElement("p");
                    fileName.innerText = "...";
                    fileName.onclick = function ({target}) {
                        target.previousElementSibling.click();
                    }
                    break
            }

        }else{
            if (!value.hasOwnProperty("type")) value.type = "text";
            input = document.createElement("input");
            divInput.classList.add("nAlert-input");
            input.setAttribute("type",value.type);
        }

        // id
        let id = uniqID("input-");
        input.id = id;

        const o = {};
        o["index"] = (value.hasOwnProperty("id")) ? value.id : i ;
        o["id"] = id;
        o["tag"] = (value.type.toLowerCase() === "tags") ? "tags" : "input";
        this.inputs.push(o);

        // placeholder
        input.setAttribute("placeholder",(value.hasOwnProperty("placeholder")) ? value.placeholder : " ... ");
        input.value = (value.hasOwnProperty("value")) ? value.value : "";
        input.setAttribute("nAlert-Property","");

        // label
        if (value.hasOwnProperty("label")) {
            const label = document.createElement("label");
            label.setAttribute("for",id);
            label.innerText = `${value.label}`;
            divInput.appendChild(label);
        }

        // validation
        if (value.hasOwnProperty("validation")) {
            if ( typeof value.validation === "function" ) {
                input.addEventListener("keyup" , value.validation);
            }else {
                if ( typeof value.validation === "object" ) {

                    if (value.validation.hasOwnProperty("max"))
                        input.setAttribute("maxlength",value.validation.max);

                    if (value.validation.hasOwnProperty("min")) {
                        input.setAttribute("minlength",value.validation.min);
                        input.setAttribute("onchange","nd.onchangeInput(this)");
                        input.setAttribute("onkeyup","nd.onchangeInput(this)");
                    }

                    if (value.validation.hasOwnProperty("only") ) {
                        input.setAttribute("onlyValid",value.validation.only);
                        input.setAttribute("onchange","nd.onchangeInput(this)");
                        input.setAttribute("onkeyup","nd.onchangeInput(this)");
                    }
                    if (value.validation.hasOwnProperty("error") ) {
                        input.setAttribute("invalid-error",value.validation.error);
                    }

                    input.setAttribute("na-valid","0");

                }

            }
        }

        // readonly
        if ( value.hasOwnProperty("readonly") && value.readonly === true ) {
            input.setAttribute("readonly","");
        }

        // require
        if (value.hasOwnProperty("require") && value.require === true )  input.setAttribute("require","");

        // event
        input.addEventListener("focus" , ({target}) => {
            const parent = target.parentNode;
            const label = parent.querySelector("label");
            parent.classList.add("nd-active-input");
            if (label) {
                label.style.color = "#110f48";
                label.style.fontWeight = "Bold";
                label.style.fontSize = "1.1em";
            }
        }, true);

        input.addEventListener("blur" , ({target}) => {
            const parent = target.parentNode;
            const label = parent.querySelector("label");
            parent.classList.remove("nd-active-input");
            if (label) {
                label.style.color = "#444";
                label.style.fontWeight = "unset";
                label.style.fontSize = "unset";
            }
        }, true);

        divInput.appendChild(input);

        if (tagWrapper) divInput.appendChild(tagWrapper);

        if (fileName) divInput.appendChild(fileName);

        if( value.hasOwnProperty("type") && value.type === "password" ) {
            const showPass = document.createElement("span");
            showPass.classList.add("icn-remove_red_eye");
            showPass.style.margin = "10px";
            showPass.style.color = "#ffb300";
            showPass.onclick = function ({target}) {
                const input = target.previousElementSibling;
                if (input.getAttribute("type") === "text") {
                    input.setAttribute("type","password");
                    target.classList.remove("icn-visibility_off");
                    target.classList.add("icn-remove_red_eye");
                } else {
                    input.setAttribute("type","text");
                    target.classList.remove("icn-remove_red_eye");
                    target.classList.add("icn-visibility_off");
                }
            }

            divInput.appendChild(showPass);
        }

        // check password strength
        function testPasswordStrength(value) {
            let strongRegex = new RegExp(
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=/()%??????!@#$%^&*])(?=.{8,})"
                ),
                mediumRegex = new RegExp(
                    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
                );

            if (strongRegex.test(value)) {
                return "green";
            } else if (mediumRegex.test(value)) {
                return "orange";
            } else {
                return "red";
            }
        }

        return divInput;
    };

    const createSelect = (value,i) => {
        // nAlert-select
        const divSelect = document.createElement("div");
        divSelect.classList.add("nAlert-select");
        divSelect.setAttribute("tabindex",`${i}`);


        // id
        let id =  uniqID("select-");
        divSelect.id = id;

        const o = {};
        o["index"] = (value.hasOwnProperty("id")) ? value.id : i ;
        o["id"] = id;
        o["tag"] = "select";
        this.inputs.push(o);


        // nAlert-select-item
        const item = document.createElement("div");
        item.classList.add("nAlert-select-item");

        item.onclick = function ({target}) {
            let select = target.parentNode;
            if (!target.tagName.toLowerCase().includes("div"))  select = target.parentNode.parentNode;
            select.classList.toggle("nAlert-select-show");

            if (select.classList.contains("nAlert-select-show")) {
                select.querySelector("ul").classList.add("flipInY");
                select.querySelector("ul").classList.remove("flipOutY");
            }else{
                select.querySelector("ul").classList.remove("flipInY");
                select.querySelector("ul").classList.add("flipOutY");
            }

        };

        // label
        if (value.hasOwnProperty("label")) {
            const label = document.createElement("label");
            label.setAttribute("for",id);
            label.innerText = value.label;
            item.appendChild(label);
        }

        // placeholder
        const p = document.createElement("p");
        p.classList.add("nAlert-select-item-text");
        p.classList.add("nAlert-select-item-placeholder");
        p.innerText = (value.hasOwnProperty("placeholder")) ? value.placeholder : "...";
        item.appendChild(p);
        divSelect.appendChild(item);

        // ul
        const ul = document.createElement("ul");

        if( value.items.length === 0 ) return;

        value.items.map( (v  ) => {
            const li = document.createElement("li");
            li.setAttribute("value", `${(v.hasOwnProperty("value") ? v.value : v.text)}`);
            li.innerText = v.text;
            li.onclick = function ({target}) {
                const select = target.parentNode.parentNode;
                select.setAttribute("value",target.getAttribute("value"));
                select.querySelector(".nAlert-select-item-text").innerText = target.innerText;
                select.querySelector(".nAlert-select-item-text").classList.remove("nAlert-select-item-placeholder");
            }
            ul.appendChild(li);
        });

        // require
        if (value.hasOwnProperty("require") && value.require === true  ) divSelect.setAttribute("require","");

        divSelect.appendChild(ul);
        return divSelect;
    };

    const createCheckBox = (value,i) => {
        // nAlert-checkbox
        const divCheckbox = document.createElement("div");
        divCheckbox.classList.add("nAlert-check");

        if( value.items.length === 0 ) return;

        // id
        let id =  uniqID("checkbox-");
        divCheckbox.id = id;

        const o = {};
        o["index"] = (value.hasOwnProperty("id")) ? value.id : i ;
        o["id"] = id;
        o["tag"] = "checkbox";
        this.inputs.push(o);

        // label
        if (value.hasOwnProperty("label")) {
            const label = document.createElement("label");
            label.setAttribute("for",id);
            label.innerText = value.label;
            divCheckbox.appendChild(label);
        }


        // nAlert-checkbox-items
        const items = document.createElement("div");
        items.classList.add("nAlert-checkbox-items");

        value.items.map( (v  ,ii) => {
            const div = document.createElement("div");
            div.classList.add("cb-item");
            const cb = document.createElement("input");
            cb.setAttribute("type","checkbox");

            let id = `na-cb-${ii}`;
            cb.id = id;

            div.appendChild(cb);

            const label = document.createElement("label");
            label.setAttribute("for",id);
            label.innerText = v.text;
            div.appendChild(label);

            items.appendChild(div);
        });

        // require
        if (value.hasOwnProperty("require") && value.require === true ) {
            divCheckbox.setAttribute("require","");
        }

        divCheckbox.appendChild(items)

        return divCheckbox;

    };

    const input = (ndClass = "nAlert-inputs") => {

        const inputsContainer = document.createElement("div");
        inputsContainer.classList.add(ndClass);

        const custom = prepareCustomElement("input");
        if (custom !== false) {
            inputsContainer.appendChild(custom);
        }else{
            if(this.options.input.length === 0 ) return;

            this.options.input.map( ( value , i) => {
                inputsContainer.appendChild(createInput(value,i));
            });
        }

        content.appendChild(inputsContainer);
    };

    const select = () => {
        const selectsContainer = document.createElement("div");
        selectsContainer.classList.add("nAlert-selects");

        if(this.options.select.length === 0 ) return;

        this.options.select.map( ( value , i) => {
            selectsContainer.appendChild(createSelect(value,i));
        });

        container.addEventListener("click", function ({target}) {
            if (!target.classList.contains("nAlert-select-item") && !target.parentNode.classList.contains("nAlert-select-item")) {
                document.querySelectorAll('.nAlert-select .nAlert-select-item').forEach( e => {
                    let select = e.parentNode;
                    if (!e.tagName.toLowerCase().includes("div"))  select = e.parentNode.parentNode;
                    select.querySelector("ul").classList.remove("flipInY");
                    select.querySelector("ul").classList.add("flipOutY");

                    setTimeout( () => {
                        select.classList.remove("nAlert-select-show");
                        select.querySelector("ul").classList.add("flipInY");
                        select.querySelector("ul").classList.remove("flipOutY");
                    } , 300);
                });
            }
        });

        content.appendChild(selectsContainer);
    };

    const checkbox = () => {

        const checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add("nAlert-checkbox");

        if(this.options.checkbox.length === 0 ) return;

        this.options.checkbox.map( ( value , i) => {
            checkboxContainer.appendChild(createCheckBox(value,i));
        });

        content.appendChild(checkboxContainer);

    };

    const buttons = (w) => {

        const custom = prepareCustomElement("button");
        if (custom !== false) {
            buttonsContainer.innerHTML = "";
            buttonsContainer.appendChild(custom);
            this.buttonSet = true;
            return;
        }

        this.buttonSet = true;
        const value = this.options[w];
        // const prefix = "&#x";
        //span.setAttribute("data-icon" , `&#x${icon};`);

        const btn = document.createElement("button");
        const span = document.createElement("span");
        const i = document.createElement("i");
        let icon;
        switch (w) {
            case 'confirm' :
                btn.classList.add("nAlert-ok");
                icon = "ebe4";
                icon = "done";
                break;
            case 'cancel' :
                btn.classList.add("nAlert-cancel");
                icon = "e999";
                icon = "clear";
                break;
            case 'reject' :
                btn.classList.add("nAlert-reject");
                icon = "ebf2";
                icon = "highlight_remove";
                break;
        }

        if (value.hasOwnProperty("icon")) {
            icon = value.icon;
            i.classList.add(`icn-${icon}`);
            btn.appendChild(i);
        }else{
            btn.appendChild(i);
        }

        span.textContent = value.text;
        btn.appendChild(span);
        btn.addEventListener("click" , callback);
        buttonsContainer.appendChild(btn);
    };

    const desc = () => {
        const descContainer = document.createElement("div");
        descContainer.classList.add("nAlert-desc");

        const custom = prepareCustomElement("desc");
        if (custom !== false) {
            descContainer.appendChild(custom);
        }else{
            const p = document.createElement("p");
            p.innerText = this.options.desc;
            p.classList.add("nd-p");
            const left = document.createElement("span");
            const right = document.createElement("span");
            left.classList.add("nAlert-separate-left");
            right.classList.add("nAlert-separate-right");
            descContainer.appendChild(left);
            descContainer.appendChild(right);
            descContainer.appendChild(p);
        }

        content.appendChild(descContainer);
    };

    const timeOut = () => {
        const spanGray = document.createElement("span");
        const spanLoader = document.createElement("span");
        spanGray.classList.add("nd-toast-timeout-gray");
        spanLoader.classList.add("nd-toast-timeout-loader");

        content.appendChild(spanGray);
        content.appendChild(spanLoader);
    }

    const prepareCustomElement = (property = "title") => {
        if ( !this.options.hasOwnProperty("custom") ) return false;
        if (this.options.custom.hasOwnProperty(property)) {
            if( this.options.custom[property] instanceof HTMLElement ) {
                return this.options.custom[property];
            }else{
                throw new Error(`custom -> '${property}' isn't instanceof HTMLElement`);
            }
        }else{
            return false;
        }
    }

    const prepareAppendHTML = (property = "title", parent) => {
        if ( !this.options.hasOwnProperty("append") ) return false;

    }

    const prepare = () => {
        // base container
        if(document.querySelector('.nd-alert-container'))
           document.querySelector('.nd-alert-container').remove();

        container.classList.add("neoDialog-Container");
        container.classList.add("nd-alert-container");
        container.classList.add("no-print");

        // background
        const span = document.createElement("span");
        span.classList.add("nAlert-background");
        container.appendChild(span);
        // wrapper
        wrapper.classList.add("nAlert-wrapper");
        wrapper.classList.add(anim_enter);
        // content
        content.classList.add("nAlert-content");

        // @anim icon
        if ( this.options.hasOwnProperty("icon") ) {
            animIcon();
            if (this.options.icon.hasOwnProperty("pos")) {
                switch (this.options.icon.pos) {
                    case 'top' :
                        wrapper.classList.add("nAlert-flex-top");
                        break;
                    case 'left' :
                        wrapper.classList.add("nAlert-grid2");
                        wrapper.firstElementChild.style.gridArea = "1/2";
                        wrapper.style.gridTemplateColumns = "55% 45%";
                        break;
                    case 'right' :
                        wrapper.classList.add("nAlert-grid2");
                        break;
                }
            }else{
                wrapper.classList.add("nAlert-grid2");
            }
        }else{
            content.style.width = "100%";
        }

        // @show close button
        if ( this.options.hasOwnProperty("closeButton") ) closeButton();

        // @title
        if (
            this.options.hasOwnProperty("title") ||
            ( this.options.hasOwnProperty("custom") && this.options.custom.hasOwnProperty("title") )
        ) title();

        // @text
        if (
            !this.options.hasOwnProperty("text") &&
            !( this.options.hasOwnProperty("custom") && this.options.custom.hasOwnProperty("text") )
        ) throw new Error(" @require : 'text' ");
        text();

        // @form
        if ( this.options.hasOwnProperty("form") ) form();

        // @inputs
        if (
            this.options.hasOwnProperty("input") ||
            ( this.options.hasOwnProperty("custom") && this.options.custom.hasOwnProperty("input") )
        ) input();

        // @selects
        if ( this.options.hasOwnProperty("select") ) select();

        // @checkbox
        if ( this.options.hasOwnProperty("checkbox") ) checkbox();

        // @buttons
        if ( this.options.hasOwnProperty("confirm") ) buttons("confirm");
        if ( this.options.hasOwnProperty("cancel") ) buttons("cancel");
        if ( this.options.hasOwnProperty("reject") ) buttons("reject");
        if ( this.options.hasOwnProperty("custom") && this.options.custom.hasOwnProperty("button") ) buttons("custom");

        if ( this.options.hasOwnProperty("confirm") ||
            this.options.hasOwnProperty("cancel") ||
            this.options.hasOwnProperty("reject") ||
            ( this.options.hasOwnProperty("custom") && this.options.custom.hasOwnProperty("button") )
        ) {
            buttonsContainer.classList.add("nAlert-buttons");
            content.appendChild(buttonsContainer);
        }

        // @desc
        if ( this.options.hasOwnProperty("desc") ||
            this.options.hasOwnProperty("custom") && this.options.custom.hasOwnProperty("desc") ) desc();

        // check if not any button not exist
        // @desc
        if ( !this.options.hasOwnProperty("timeout") && !this.buttonSet ) closeButton();

        wrapper.appendChild(content);
        container.appendChild(wrapper);
    };

    const toast = () => {
        // base container
        if(document.querySelector('.nd-toast-container')) {
            container = document.querySelector('.nd-toast-container');
        }else{
            container.classList.add("neoDialog-Container");
            container.style.pointerEvents = "none";
            container.classList.add("nd-toast-container");
            container.classList.add("no-print");
            // background
            // const span = document.createElement("span");
            // container.appendChild(span);
        }

        // wrapper
        wrapper.id = uniqID("tw-");
        wrapper.classList.add("nd-toast-wrapper");
        wrapper.classList.add(anim_enter);
        // content
        content.classList.add("nd-toast-content");

        // @color
        wrapper.style.borderInlineStartColor = ( this.options.hasOwnProperty("color") && this.options.color !== false ) ? this.options.color : "#FFF0";

        // @pos
        if ( this.options.hasOwnProperty("pos") ) {
            container.classList.remove("nd-toast-start-top");
            container.classList.remove("nd-toast-start-bottom");
            container.classList.remove("nd-toast-end-top");
            container.classList.remove("nd-toast-end-bottom");
            container.classList.remove("nd-toast-center-bottom");
            container.classList.remove("nd-toast-center-top");

            switch (this.options.pos) {
                case nd.toast_pos.start_top :
                    container.classList.add("nd-toast-start-top");
                    break;
                case nd.toast_pos.start_bottom :
                    container.classList.add("nd-toast-start-bottom");
                    break;
                case nd.toast_pos.end_top :
                    container.classList.add("nd-toast-end-top");
                    break;
                case nd.toast_pos.end_bottom :
                    container.classList.add("nd-toast-end-bottom");
                    break;
                case nd.toast_pos.center_bottom :
                    container.classList.add("nd-toast-center-bottom");
                    break;
                case nd.toast_pos.center_top :
                    container.classList.add("nd-toast-center-top");
                    break;
            }
        }

        // @anim icon
        if ( this.options.hasOwnProperty("icon") ) {
            animIcon("nd-toast-icon");
            wrapper.classList.add("nd-toast-grid");
        }else{
            content.style.width = "100%";
        }

        // @show close button
        if ( this.options.hasOwnProperty("closeButton") || !this.options.hasOwnProperty("timeout")) closeButton("nd-toast-close");

        // @title
        if (
            this.options.length === 0 ||
            !this.options.hasOwnProperty("title") && !this.options.hasOwnProperty("text") &&
            !( this.options.hasOwnProperty("custom") && this.options.custom.hasOwnProperty("title") ) &&
            !( this.options.hasOwnProperty("custom") && this.options.custom.hasOwnProperty("text") )
        ) throw new Error(" @require : 'title' ");
        title("nd-toast-title");

        // @text
        if ( this.options.hasOwnProperty("text")  ||
            ( this.options.hasOwnProperty("custom") && this.options.custom.hasOwnProperty("text") )
        ) text("nd-toast-text");

        // @time Out
        if ( this.options.hasOwnProperty("timeout") ) timeOut();

        wrapper.appendChild(content);
        container.appendChild(wrapper);

    }

    const snack = () => {
        // base container
        if(document.querySelector('.nd-snack-container')) {
            container = document.querySelector('.nd-snack-container');
            if (container.children.length > 0) {
                container.innerHTML = "";
            }
        }else{
            container.classList.add("neoDialog-Container");
            container.style.pointerEvents = "none";
            container.classList.add("nd-snack-container");
            container.classList.add("no-print");
        }

        // wrapper
        wrapper.id = uniqID("tw-");
        wrapper.classList.add("nd-snack-wrapper");
        wrapper.classList.add(anim_enter);
        // content
        content.classList.add("nd-snack-content");

        // @anim icon
        if ( this.options.hasOwnProperty("icon") )  animIcon("nd-snack-icon");

        // @title
        if (
            this.options.hasOwnProperty("title")  ||
            ( this.options.hasOwnProperty("custom") && this.options.custom.hasOwnProperty("title") )
        ) title("nd-snack-title");

        // @text
        if ( this.options.length === 0 || !this.options.hasOwnProperty("text") &&
            !( this.options.hasOwnProperty("custom") && this.options.custom.hasOwnProperty("text") ) ) throw new Error(" @require : 'text' ");
        if ( this.options.hasOwnProperty("text")   ||
            ( this.options.hasOwnProperty("custom") && this.options.custom.hasOwnProperty("text") )) text("nd-snack-text");

        // @inputs
        if ( this.options.hasOwnProperty("input")   ||
            ( this.options.hasOwnProperty("custom") && this.options.custom.hasOwnProperty("input") ) ) input("nd-snack-inputs");

        // @closeButton
        if ( this.options.hasOwnProperty("closeButton") || !this.options.hasOwnProperty("timeout")) closeButton("nd-snack-close");

        // @time Out
        if ( this.options.hasOwnProperty("timeout") ) timeOut();

        // @buttons
        if ( this.options.hasOwnProperty("confirm") ) buttons("confirm");
        if ( this.options.hasOwnProperty("cancel") ) buttons("cancel");
        if ( this.options.hasOwnProperty("reject") ) buttons("reject");
        if ( this.options.hasOwnProperty("custom") && this.options.custom.hasOwnProperty("button") ) buttons("");

        if ( this.options.hasOwnProperty("confirm") ||
            this.options.hasOwnProperty("reject") ||
            ( this.options.hasOwnProperty("custom") && this.options.custom.hasOwnProperty("button") ) ||
            this.options.hasOwnProperty("cancel") ) {
            buttonsContainer.classList.add("nd-snack-buttons");
            content.appendChild(buttonsContainer);
        }

        wrapper.appendChild(content);
        container.appendChild(wrapper);
    }

    const callback = ({target}) => {

        if ( !this.options.hasOwnProperty("callback") ) {
            destroy({target});
            return;
        }

        this.cbValues = {
            isCancel : false,
            isReject : false,
            isConfirm : false,
            values : []
        };

        let btn = (target.tagName.toLowerCase() === "span" || target.tagName.toLowerCase() === "i" ) ? target.parentNode : target;
        btn = (btn.classList.contains("nAlert-ok")) ? nd.isConfirm
            : (btn.classList.contains("nAlert-cancel")) ? nd.isCancel
                : (btn.classList.contains("nAlert-reject")) ? nd.isReject : null;

        if (!btn) return;

        switch (btn) {
            case nd.isCancel :
                this.cbValues.isCancel = true;

                break;
            case nd.isReject :
                this.cbValues.isReject = true;
                break;
            case nd.isConfirm :
                this.cbValues.isConfirm = true;
                if( this.inputs.length > 0 ) grabValues({target});
                break;
        }


        if ( btn !== nd.isConfirm || ( btn === nd.isConfirm &&  this.inputs.length === 0 ) )  {
            if ( this.options.callback !== null ) {

                this.options.callback(this.cbValues);
            }
            destroy({target});
        }


    };

    const grabValues = ({target}) => {
        let stop = false;

        this.inputs.map( e => {

              if ( e.tag === "input" ) {
                  const input = document.getElementById(e.id);

                  if (input.hasAttribute("require") && input.value === "" || input.getAttribute("na-valid") === "0" ) {
                      input.setCustomValidity( input.getAttribute("invalid-error") || "require!"  );
                      input.reportValidity();
                      stop = true;
                      return;
                  }

                  this.cbValues.values[e.index] = input.value;

              }else if ( e.tag === "tags" ) {

                  const input = document.getElementById(e.id);
                  if (input.hasAttribute("require") && input.nextElementSibling.children.length === 0 ) {
                      input.setCustomValidity( input.getAttribute("invalid-error") || "require!"  );
                      input.reportValidity();
                      stop = true;
                      return;
                  }

                  let tags = [];
                  Array.from(input.nextElementSibling.children).map( span => tags.push(span.innerText) );

                  this.cbValues.values[e.index] = tags;

              } else if ( e.tag === "select" ) {
                  const select = document.getElementById(e.id);
                  let isSel = select.hasAttribute("value");
                  if ( select.hasAttribute("require") && !isSel ) {
                      select.querySelector('.nAlert-select-item').style.borderColor = "red";
                      stop = true;
                      return;
                  }
                  select.querySelector('.nAlert-select-item').style.borderColor = "#bbc0c4";

                  this.cbValues.values[e.index] = {
                      value : (isSel) ? select.getAttribute("value") : null ,
                      text : (isSel) ? select.querySelector(`ul li[value="${select.getAttribute("value")}"]`).innerText : null
                  };

              }else if ( e.tag === "checkbox" ) {
                  let values = [];
                  const checkbox = document.getElementById(e.id);

                  checkbox.querySelectorAll('input[type="checkbox"]').forEach( e => {
                        if ( e.checked ) values.push(e.nextElementSibling.innerText);
                  });

                  this.cbValues.values[e.index] = values;

              }

        });

        if ( this.options.callback === null || stop ) return;

        this.options.callback(this.cbValues);

        destroy({target});
    }

    const shortcut = () => {
        document.addEventListener("keyup" , ({keyCode}) => {
            if (keyCode === 27) {
                const closeButton = document.querySelector(`#${wrapper.id} .nd-close-button`);
                if(closeButton) {
                    closeButton.click();
                }
            } // ESC
        });
    }
    //@property
    /**
     * @param {function|null}callback
     * @returns {NeoDialog}
     */
    this.show = function (callback = null) {

        // convert keys to lowercase
        let key, keys = Object.keys(this.options);
        let n = keys.length;
        let newO = {}
        while (n--) {
            key = keys[n];
            if(keys[n].toLowerCase() === "closebutton") {
                newO["closeButton"] = this.options[key];
            }else {
                newO[key.toLowerCase()] = this.options[key];
            }

        }
        this.options = Object.assign({},newO);

        switch (this.options.type) {
            case nd.type_toast :
                anim_enter = "slide-in-elliptic-bottom-fwd";
                anim_leave = "flip-out-hor-top";
                break;
            case "snackbar" :
            case nd.type_snack :
                anim_enter = "swing-in-bottom-fwd";
                anim_leave = "swing-out-bottom-bck";
                break;

            case nd.type_alert :
                anim_enter = "tilt-in-fwd-tr";
                anim_leave = "swing-out-bottom-bck";
                anim_leave = "slit-out-horizontal";
        }
        if (this.options.hasOwnProperty("anim")) {
            if (this.options.anim.hasOwnProperty("in"))
                anim_enter = this.options.anim["in"];

            if (this.options.anim.hasOwnProperty("out"))
                anim_leave = this.options.anim["out"];
        }

        wrapper.classList.remove(anim_enter);
        wrapper.classList.remove(anim_leave);

        if ( Array.from(container.children).length > 0 ) {
            wrapper.className = "";
            wrapper.innerHTML = "";
            content.className = "";
            content.innerHTML = "";
            buttonsContainer.className = "";
            buttonsContainer.innerHTML = "";
            this.inputs = [];
            this.cbValues = {
                isCancel : false,
                isReject : false,
                isConfirm : false,
                values : {}
            };

            this.buttonSet = false;

            if ( this.options.type === nd.type_alert ||  this.options.type === nd.type_dialog ) {
                container.className = "";
                container.innerHTML = "";
            }
        }

        // @callback
        if ( callback ) this.options.callback = callback;

        if (!this.options.hasOwnProperty("type")) this.options.type = "alert" ;

        // @prepare
        switch (this.options.type) {
            case nd.type_alert:
            case nd.type_dialog:
            case "dialog" :
            case "alert":
                prepare();
                // @blur
                Array.from(document.body.children).map( e => {
                    if (!e.classList.contains("neoDialog-Container"))
                        e.classList.add("nd-blur");
                });
                document.body.appendChild(container);
                break;
            case nd.type_toast:
            case "toast" :
                toast();
                container.classList.add("toast");
                if(!document.querySelector('.nd-toast-container')) {
                    document.body.appendChild(container);
                }

                if ( this.options.hasOwnProperty("timeout") ) {
                    this.options.timeout = parseInt(this.options.timeout);
                    if ( isNaN(this.options.timeout) || this.options.timeout < 5000 ) this.options.timeout = 5000;
                    const toutL = Math.ceil((this.options.timeout - 3000) / 1000);
                    const toutG = Math.ceil(this.options.timeout / 1000);
                    const loader = wrapper.querySelector(".nd-toast-timeout-loader");
                    const loaderG = wrapper.querySelector(".nd-toast-timeout-gray");
                    if (loader) {
                        loader.style.animationDuration = `${toutL}s`;
                        loaderG.style.animationDuration = `${toutG}s`;
                        loader.classList.add("scale-out-horizontal");
                        loaderG.classList.add("scale-out-horizontal");
                    }
                    setTimeout( destroy ,this.options.timeout );
                }

                break;

            case nd.type_snack:
            case "snackbar" :
                snack();
                container.classList.add("snack");
                if(!document.querySelector('.nd-snack-container')) {
                    document.body.appendChild(container);
                }

                if ( this.options.hasOwnProperty("timeout") ) {
                    this.options.timeout = parseInt(this.options.timeout);
                    if ( isNaN(this.options.timeout) || this.options.timeout < 5000 ) this.options.timeout = 5000;
                    const toutL = Math.ceil((this.options.timeout - 3000) / 1000);
                    const toutG = Math.ceil(this.options.timeout / 1000);
                    const loader = wrapper.querySelector(".nd-toast-timeout-loader");
                    const loaderG = wrapper.querySelector(".nd-toast-timeout-gray");
                    if (loader) {
                        loader.style.animationDuration = `${toutL}s`;
                        loaderG.style.animationDuration = `${toutG}s`;
                        loader.classList.add("scale-out-horizontal");
                        loaderG.classList.add("scale-out-horizontal");
                    }
                    setTimeout( destroy ,this.options.timeout );
                }

                break;
        }

        // @right to left
        if (this.options.hasOwnProperty("rtl") && this.options.rtl) {
            container.classList.add("neoDialog-rtl");
        }

        // @shortcut
        shortcut();

        return this;

    }

    // fun
    this.destroy = destroy;

    // setter
    /**
     * @param {boolean}value
     * @returns {NeoDialog}
     */
    this.setRtl = function (value) {
        this.options.rtl = value;
        return this;
    }
    /**
     * @param {string|int}value
     * @returns {NeoDialog}
     */
    this.setIcon = function (value) {
        this.options.icon = value;
        return this;
    }
    /**
     * @param {string}value
     * @returns {NeoDialog}
     */
    this.setTitle = function (value) {
        this.options.title = value;
        return this;
    }
    /**
     * @param {string}value
     * @returns {NeoDialog}
     */
    this.setText = function (value) {
        this.options.text = value;
        return this;
    }
    /**
     * @param {string}value
     * @returns {NeoDialog}
     */
    this.setDesc = function (value) {
        this.options.desc = value;
        return this;
    }
    /**
     * @param {int}value second
     * @returns {NeoDialog}
     */
    this.setTimeout = function (value) {
        this.options.timeout = value;
        return this;
    }
    /**
     * @param {int}value na.type_alert 1| na.type_toast 2| na.type_snackbar 3
     * @returns {NeoDialog}
     */
    this.setType = function (value) {
        this.options.type = value;
        return this;
    }
    /**
     * @param {object}value
     * @returns {NeoDialog}
     */
    this.setConfirmButton = function (value) {
        this.options.confirm = value;
        return this;
    }
    /**
     * @param {object}value
     * @returns {NeoDialog}
     */
    this.setCancelButton = function (value) {
        this.options.cancel = value;
        return this;
    }
    /**
     * @param {object}value
     * @returns {NeoDialog}
     */
    this.setRejectButton = function (value) {
        this.options.reject = value;
        return this;
    }
    /**
     * @param {object}value
     * @returns {NeoDialog}
     */
    this.setForm = function (value) {
        this.options.form = value;
        return this;
    }
    /**
     * @param {object}value
     * @returns {NeoDialog}
     */
    this.setInput = function (value) {
        this.options.input = value;
        return this;
    }
    /**
     * @param {object}value
     * @returns {NeoDialog}
     */
    this.setSelect = function (value) {
        this.options.select = value;
        return this;
    }
    /**
     * @param {object}value
     * @returns {NeoDialog}
     */
    this.setCheckbox = function (value) {
        this.options.checkbox = value;
        return this;
    }
    /**
     * @param {object}value
     * @returns {NeoDialog}
     */
    this.setCustomAnimation = function (value) {
        this.options.anim = value;
        return this;
    }
    /**
     * @param {boolean}value
     * @returns {NeoDialog}
     */
    this.setShowCloseButton = function (value) {
        this.options.closeButton = value;
        return this;
    }
    /**
     * @param {boolean}value
     * @returns {NeoDialog}
     */
    this.setActiveShortcut = function (value) {
        this.options.shortcut = value;
        return this;
    }
    /**
     * @param {Object}value
     * @returns {NeoDialog}
     */
    this.setCustomElement = function (value) {
        this.options.custom = value;
        return this;
    }
    //getter
    this.getListOfIcons = function () {
        return icons;
    }

    this.title = "Uha NeoDialog";
    this.version = "1.0.0";
    return this;
}

// @Static Method
Object.assign(NeoDialog, {
    fire : function (options = {}) {
        const instance = new this(options);
        return instance.show();
    },
    // @desc
    version: "1.0.0",
    title: "Uha NeoDialog"
});

// fast and less code
Object.assign(NeoDialog,{

    alert : {
        /**
         * @title alert - success
         * @param {Object} options
         * @return neoDialog
         */
        success : function (options= {} ) {
            if ( typeof nd_def_var === "undefined" ) var nd_def_var = {};
            const rtl = ( options.hasOwnProperty("rtl") )
                ? options.rtl : ( nd_def_var.hasOwnProperty("rtl") ) ? nd_def_var.rtl : false;

              const confirmText = (rtl) ? "??????????" : "Ok";

              return nd.fire(Object.assign({
                  type : nd.type_alert,
                  icon : {id : nd.icon_success},
                  confirm : { text : confirmText , icon : nd.i_confirm},
                  closeButton : true,
              },options));
          },
            /**
             * @title alert - warning
             * @param {Object} options
             * @return neoDialog
             */
        warning : function (options= {} ) {
                if ( typeof nd_def_var === "undefined" ) var nd_def_var = {};
                const rtl = ( options.hasOwnProperty("rtl") )
                    ? options.rtl : ( nd_def_var.hasOwnProperty("rtl") ) ? nd_def_var.rtl : false;

                const confirmText = (rtl) ? "??????????" : "Ok";

                return nd.fire(Object.assign({
                    type : nd.type_alert,
                    icon : {id : nd.icon_warning},
                    confirm : { text : confirmText , icon : nd.i_confirm},
                    closeButton : true,
                },options));
          },
            /**
             * @title alert - error
             * @param {Object} options
             * @return neoDialog
             */
        error : function (options= {} ) {
                if ( typeof nd_def_var === "undefined" ) var nd_def_var = {};
                const rtl = ( options.hasOwnProperty("rtl") )
                    ? options.rtl : ( nd_def_var.hasOwnProperty("rtl") ) ? nd_def_var.rtl : false;

                const confirmText = (rtl) ? "??????????" : "Ok";

                return nd.fire(Object.assign({
                    type : nd.type_alert,
                    icon : {id : nd.icon_error},
                    confirm : { text : confirmText , icon : nd.i_confirm},
                    closeButton : true,
                },options));
        },
            /**
             * @title alert - info
             * @param {Object} options
             * @return neoDialog
             */
        info : function (options= {} ) {
                if ( typeof nd_def_var === "undefined" ) var nd_def_var = {};
                const rtl = ( options.hasOwnProperty("rtl") )
                    ? options.rtl : ( nd_def_var.hasOwnProperty("rtl") ) ? nd_def_var.rtl : false;

                const confirmText = (rtl) ? "??????????" : "Ok";

                return nd.fire(Object.assign({
                    type : nd.type_alert,
                    icon : {id : nd.icon_info},
                    confirm : { text : confirmText , icon : nd.i_confirm},
                    closeButton : true,
                },options));
        },
    },

    toast : {
        /**
         * @title toast - success
         * @param {Object} options
         * @return neoDialog
         */
        success : function (options= {} ) {
            return nd.fire(Object.assign({
                type : nd.type_toast,
                icon : {id : nd.icon_success},
                color : nd.color_success,
                closeButton : true,
            },options));
        },
        /**
         * @title toast - warning
         * @param {Object} options
         * @return neoDialog
         */
        warning : function (options= {} ) {
            return nd.fire(Object.assign({
                type : nd.type_toast,
                icon : {id : nd.icon_warning},
                color : nd.color_warning,
                closeButton : true,
            },options));
        },
        /**
         * @title toast - error
         * @param {Object} options
         * @return neoDialog
         */
        error : function (options= {} ) {
            return nd.fire(Object.assign({
                type : nd.type_toast,
                icon : {id : nd.icon_error},
                color : nd.color_error,
                closeButton : true,
            },options));
        },
        /**
         * @title toast - info
         * @param {Object} options
         * @return neoDialog
         */
        info : function (options= {} ) {
            return nd.fire(Object.assign({
                type : nd.type_toast,
                icon : {id : nd.icon_info},
                color : nd.color_info,
                closeButton : true,
            },options));
        },
    },

    dialog : {
        /**
         * @title dialog - login
         * @param {Object} options
         * @return neoDialog
         */
        login : function (options= {}) {

            if ( typeof nd_def_var === "undefined" ) var nd_def_var = {};
            const rtl = ( options.hasOwnProperty("rtl") )
                            ? options.rtl : ( nd_def_var.hasOwnProperty("rtl") ) ? nd_def_var.rtl : false;

            const confirmText = (rtl) ? "????????" : "login";
            const cancelText = (rtl) ? "????????????" : "cancel";
            const usernameText = (rtl) ? "?????? ???????????? :" : "username :";
            const passwordText = (rtl) ? "?????????????? :" : "password :";
            const title = (rtl) ? "????????" : "Login";
            const text = (rtl) ? "???????? ???????? ?????? ???????????? ?? ?????????????? ?????? ???? ???????? ????????." : "Enter your username and password to login.";

            return nd.fire(Object.assign({
                type : nd.type_dialog,
                title : title,
                text : text,
                icon : {id : nd.icon_login},
                confirm : { text : confirmText , icon : nd.i_login},
                cancel : { text : cancelText , icon : nd.i_cancel},
                form : [
                      {
                          type : "text",
                          label : usernameText,
                          id : "username",
                          require : true,
                      },
                      {
                          type : "password",
                          label : passwordText,
                          id : "password",
                          require : true,
                      },
                ],
                closeButton : true,
            },options));
        },
        sign_up : function (options) {
            if ( typeof nd_def_var === "undefined" ) var nd_def_var = {};
            const rtl = ( options.hasOwnProperty("rtl") )
                ? options.rtl : ( nd_def_var.hasOwnProperty("rtl") ) ? nd_def_var.rtl : false;

            const confirmText = (rtl) ? "?????? ??????" : "sign up";
            const cancelText = (rtl) ? "????????????" : "cancel";
            const usernameText = (rtl) ? "?????? ???????????? :" : "username :";
            const passwordText = (rtl) ? "?????????????? :" : "password :";
            const emailText = (rtl) ? "?????????? :" : "email :";
            const firstText = (rtl) ? "?????? :" : "name :";
            const lastText = (rtl) ? "?????? ???????????????? :" : "last name :";
            const sexText = (rtl) ? "?????????? :" : "gender :";
            const title = (rtl) ? "?????? ??????" : "Sign up";
            const text = (rtl) ? "???????????? ?????? ???? ?????? ?????? ????????." : "let's get you set up.";

            return nd.fire(Object.assign({
                type : nd.type_dialog,
                title : title,
                text : text,
                icon : {id : nd.icon_user},
                confirm : { text : confirmText , icon : nd.i_login},
                cancel : { text : cancelText , icon : nd.i_cancel},
                form : [
                    {
                        label : firstText,
                        id : "name",
                        require : true,
                        validation : {only :"text"},
                    },
                    {
                        label : lastText,
                        id : "lastname",
                        require : true,
                        validation : {only :"text"},
                    },
                    {
                        label : usernameText,
                        id : "username",
                        require : true,
                    },
                    {
                        type : "password",
                        label : passwordText,
                        id : "password",
                        require : true,
                    },
                    {
                        label : emailText,
                        id : "email",
                        validation : {only :"email"},
                        require : true,
                    },
                    {
                        type : "select",
                        label : sexText,
                        id : "gender",
                        items : [ {value :"m" , text : "Male"} , {value :"f" , text : "Female"} , {value :"r" , text : "Rather not say"} ],
                        require : true,
                    },
                ],
                closeButton : true,
            },options));
        },
        /**
         * @title dialog - validation Code
         * @param {Object} options
         * @return neoDialog
         */
        validationCode : function (options = {}) {
            if ( typeof nd_def_var === "undefined" ) var nd_def_var = {};
            const rtl = ( options.hasOwnProperty("rtl") )
                ? options.rtl : ( nd_def_var.hasOwnProperty("rtl") ) ? nd_def_var.rtl : false;

            const confirmText = (rtl) ? "??????????" : "done";
            const cancelText = (rtl) ? "????????????" : "cancel";
            const usernameText = (rtl) ? "???? :" : "code :";
            const title = (rtl) ? "???? ???????????? ????????" : "validation Code";
            const text = (rtl) ? "???????? ???? ???????????? ???????? ???? ???????? ????????." : "Please Enter Validation Code.";

            return nd.fire(Object.assign({
                type : nd.type_dialog,
                title : title,
                text : text,
                confirm : { text : confirmText , icon : nd.i_done},
                cancel : { text : cancelText , icon : nd.i_cancel},
                form : [
                    {
                        type : "text",
                        label : usernameText,
                        id : "code",
                        require : true,
                    },
                ],
                closeButton : true,
            },options));
        },
    },

    snackbar : {
        /**
         * @title snackbar - get cookies permission
         * @param {Object} options
         * @return neoDialog
         */
        cookies : function (options= {}) {
            if ( typeof nd_def_var === "undefined" ) var nd_def_var = {};
            const rtl = ( options.hasOwnProperty("rtl") )
                ? options.rtl : ( nd_def_var.hasOwnProperty("rtl") ) ? nd_def_var.rtl : false;

            const confirmText = (rtl) ? "??????????" : "accept";
            const rejectText = (rtl) ? "???? ????????" : "deny";

            const title = (rtl) ? "???????? ????" : "cookies";
            const text = (rtl) ? "???????? ???? ???? ???? ?????? ???? ???????? ???? ?????????? ?????? ?????????? ???? ?????????????? ???? ?????????? ???? ?????????? ???????? ???? ?????????? ???????? ?? ?????????????? ???????? ???????? ???? ?????????? ???????? ?????????? ??????????." : "Cookies help us display personalized product recommendations and ensure you have great shopping experience";

            return nd.fire(Object.assign({
                type : nd.type_snack,
                title : title,
                text : text,
                icon : {id : nd.icon_cookie},
                confirm : { text : confirmText , icon : nd.i_done},
                reject : { text : rejectText},
                closeButton : true,
            },options));

        },
        /**
         * @title snackbar - subscribe
         * @param {Object} options
         * @return neoDialog
         */
        subscribe : function (options= {}) {
            if ( typeof nd_def_var === "undefined" ) var nd_def_var = {};
            const rtl = ( options.hasOwnProperty("rtl") )
                ? options.rtl : ( nd_def_var.hasOwnProperty("rtl") ) ? nd_def_var.rtl : false;

            const emailText = (rtl) ? "?????????? :" : "email :";
            const confirmText = (rtl) ? "??????????" : "accept";
            const rejectText = (rtl) ? "???? ????????" : "deny";

            const title = (rtl) ? "??????????" : "subscribe";
            const text = (rtl) ? "???????? ???????? ???????????? ???? ?????????????? ???? ?????????? ?????? ???? ???????? ????????." : "Please enter your email to subscribe to our newsletter.";

            return nd.fire(Object.assign({
                type : nd.type_snack,
                title : title,
                text : text,
                input : [{id:"email",label : emailText , placeholder : "...@email.com" , validation : {only : "email"} }],
                icon : {id : nd.icon_newsletter},
                confirm : { text : confirmText , icon : nd.i_done},
                reject : { text : rejectText},
                closeButton : true,
            },options));

        },
    },

});

// type
Object.assign(NeoDialog,{
    type_dialog : "dialog",
    type_alert : "alert",
    type_toast : "toast",
    type_snack : "snack",
});

// event
Object.assign(NeoDialog,{
    isConfirm : 1,
    isCancel : 2,
    isReject : 3,
});

// toast pos
Object.assign(NeoDialog,{
    toast_pos : {
        start_top : 0,
        end_top : 1,
        end_bottom : 2,
        start_bottom : 3,
        center_bottom : 4,
        center_top : 5,
    }
});

// colors
Object.assign(NeoDialog,{
    color_success : "#83ff06",
    color_error : "#ff0658",
    color_warning : "#f29e0d",
    color_info : "#0dc7f2",
    color_default : "#110f48",
});

// onchangeInput
Object.assign(NeoDialog,{
    onchangeInput : function (e) {
        if (e.hasAttribute("onlyValid")) {
            let only = e.getAttribute("onlyValid");
            switch (only) {
                case 'text' :
                    if(! /^[A-Za-z]+$/.test(e.value)) {
                        let error = e.getAttribute("invalid-error") || "invalid value!" ;
                        e.setCustomValidity(error);
                        e.reportValidity();
                        e.style.color = "red";
                        e.setAttribute("na-valid","0");
                    } else {
                        e.style.color = "#110f48";
                        e.setAttribute("na-valid","1");
                    }
                    break;
                case 'number' :
                    if (/\D/.test(e.value) || e.value === "" ) {
                        let error = e.getAttribute("invalid-error") || "invalid value!";
                        e.setCustomValidity(error);
                        e.reportValidity();
                        e.style.color = "red";
                        e.setAttribute("na-valid","0");
                    } else {
                        e.style.color = "#110f48";
                        e.setAttribute("na-valid","1");
                    }
                    break;
                case 'email' :
                    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(e.value)) {
                        let error = e.getAttribute("invalid-error") || "invalid email!" ;
                        e.setCustomValidity(error);
                        e.reportValidity();
                        e.style.color = "red";
                        e.setAttribute("na-valid","0");
                    } else {
                        e.style.color = "#110f48";
                        e.setAttribute("na-valid","1");
                    }
                    break;
                case 'ar-fa' :
                    if (! /^[ ???????????????????????????????????????????????????????????????????????]+$/u.test(e.value)) {
                        let error = e.getAttribute("invalid-error") || "invalid value!" ;
                        e.setCustomValidity(error);
                        e.reportValidity();
                        e.style.color = "red";
                        e.setAttribute("na-valid","0");
                    }else {
                        e.style.color = "#110f48";
                        e.setAttribute("na-valid","1");
                    }
                    break;
            }
        }

        if ( e.hasAttribute("minlength") || e.hasAttribute("maxlength") ) {
            let min = (!e.hasAttribute("minlength")) ? false : e.getAttribute("minlength");
            let max = (!e.hasAttribute("maxlength")) ? false : e.getAttribute("maxlength");

            if ( min && max ) {
                if ( parseInt(min) > e.value.length || parseInt(max) < e.value.length ) {
                    let error = e.getAttribute("invalid-error") || `Minlength(${min}) - Maxlength(${max})` ;
                    e.setCustomValidity(error);
                    e.reportValidity();
                    e.style.color = "red";
                    e.setAttribute("na-valid","0");
                }else {
                    e.style.color = "#110f48";
                    e.setAttribute("na-valid","1");
                }
            } else if (min && !max) {
                if (parseInt(min) > e.value.length) {
                    let error = e.getAttribute("invalid-error") || `@minlength = ${min}!` ;
                    e.setCustomValidity(error);
                    e.reportValidity();
                    e.style.color = "red";
                    e.setAttribute("na-valid","0");
                }else {
                    e.style.color = "#110f48";
                    e.setAttribute("na-valid","1");
                }
            } else if (max && !min) {
                if ( parseInt(max) < e.value.length ) {
                    let error = e.getAttribute("invalid-error") || `@maxlength = ${max}!` ;
                    e.setCustomValidity(error);
                    e.reportValidity();
                    e.style.color = "red";
                    e.setAttribute("na-valid","0");
                }else {
                    e.style.color = "#110f48";
                    e.setAttribute("na-valid","1");
                }
            }
        }

    }
});

// icons
Object.assign(NeoDialog,{
    icon_newsletter : "newsletter",
    icon_receiveEmail : "newsletter",
    icon_trash : "trash",
    icon_upload : "upload",
    icon_mail : "mail",
    icon_download : "download",
    icon_exit : "exit",
    icon_edit : "edit",
    icon_user : "user",
    icon_thump_down : "thump_down",
    icon_search : "search",
    icon_remove : "remove",
    icon_add : "add",
    icon_gift : "gift",
    icon_warning : "warning",
    icon_basket : "basket",
    icon_clock : "clock",
    icon_share : "share",
    icon_photo : "photo",
    icon_home : "home",
    icon_home2 : "home2",
    icon_free : "free",
    icon_help : "help",
    icon_policy : "policy",
    icon_lock : "lock",
    icon_unlock : "unlock",
    icon_error : "error",
    icon_info : "info",
    icon_success : "success",
    icon_add_file : "add_file",
    icon_token : "token",
    icon_login : "login",
    icon_sign_in : "login",
    icon_logout : "logout",
    icon_sign_out : "logout",
    icon_cookie : "cookie",
});

// button icons
Object.assign(NeoDialog,{
    i_confirm : "done",
    i_done : "done",
    i_done_all : "done_all",
    i_cancel : "clear",
    i_clear : "clear",
    i_reject : "highlight_remove",
    i_thump_up : "thumb_up_alt",
    i_thump_down : "thumb_down_alt",
    i_error : "error_outline",
    i_warning: "warning",
    i_refresh: "refresh",
    i_add: "add",
    i_add_box: "add_box",
    i_add_circle: "add_circle_outline",
    i_archive: "archive",
    i_copy: "content_copy",
    i_edit: "create",
    i_mic: "mic_none",
    i_phone: "phone",
    i_report: "report",
    i_send: "send",
    i_save: "save",
    i_download: "file_download",
    i_upload: "file_upload",
    i_add_person: "person_add",
    i_verified: "verified",
    i_search: "search",
    i_restore: "settings_backup_restore",
    i_login: "login",
    i_sign_in: "login",
    i_logout: "logout",
    i_sign_out: "logout",
});

// anim class
Object.assign(NeoDialog,{
   anim : [
       "scale-up-hor-center",
       "flip-horizontal-top",
       "swing-in-bottom-fwd",
       "swing-out-bottom-bck",
       "flip-in-hor-top",
       "flip-out-hor-bottom",
       "slit-in-horizontal",
       "slit-out-horizontal",
       "swirl-out-left-bck",
       "tilt-in-fwd-tr",
       "slide-out-blurred-top",
       "slide-in-blurred-bottom",
       "slide-in-elliptic-bottom-fwd",
       "scale-out-horizontal",
       "jello-vertical1",
       "swing-out-bottom-bck",
   ]
});

const neoDialog = NeoDialog;
const nd = NeoDialog;





