(function(){

    'use strict';


    const doc = (document._currentScript || document.currentScript).ownerDocument;
    const template = doc.querySelector('#sfo-cam');

    window.customElements.define('sfo-cam', class extends HTMLElement {


        constructor() {

            super();

            console.log('created');
        }


        connectedCallback() {

            console.log('added to dom');

            const tpl = template.content.cloneNode(true);
            this.appendChild(tpl);
            let camera = document.getElementById('my_camera');
            Webcam.attach(camera);

            this.getSnapshot();

        }

        getSnapshot () {

            let btn = document.getElementById('btn');
            btn.addEventListener('click', function () {
                Webcam.snap(function (data_uri) {
                    let elem = document.querySelectorAll('.wrapper');
                    if (elem.length < 6) {
                        let element = document.createElement('div');
                        element.classList.add('wrapper');
                        element.innerHTML = `<div class="snap">
                                                <img src="${data_uri}"/>
                                            </div>
                                            <label class="input">
                                              <input class="input__radio" type="radio" checked="checked" name="photo">
                                              <!--<span class="input__label">Radio</span>-->
                                              <!--<i class="i-material">radio_button_unchecked</i>-->
                                              <!--<i class="i-material i-material&#45;&#45;checked">radio_button_checked</i>-->
                                            </label>`;

                        let parent = document.querySelector('sfo-cam');
                        parent.appendChild(element);

                    }
                    else {
                        return;
                    }

                });

            });

        }

    });

})();