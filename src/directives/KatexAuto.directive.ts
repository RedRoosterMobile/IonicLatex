import {Directive, ElementRef, Input} from '@angular/core';
import katex from 'katex';
// import renderMathInElement from 'katex/contrib';
// dunno..
// import { renderMathInElement } from 'auto-renderer';
// import { renderMathInElement } from "../../node_modules/katex/dist/contrib/auto-renderer.min.js";

@Directive({
    selector: '[KatexAuto]'
})
export class KatexAutoDirective {
    @Input('KatexAuto') KatexInput: string;

    defaultOptions : any;

    constructor(private el: ElementRef) {
      // todo: interface for options
      this.defaultOptions = {
        delimiters: [
          {left: "$$", right: "$$", display: true},
          {left: "$", right: "$", display: false}
        ],
        ignoredTags: [
            "script", "noscript", "style", "textarea", "pre", "code",
        ]
      };
    }

    ngOnChanges() {
      this.el.nativeElement.innerHTML = this.KatexInput;
      this.renderMathInElement(this.el.nativeElement, this.defaultOptions);
    }

    private renderMathInElement(elem: ElementRef, options: any) {
        if (!elem) {
            throw new Error("No element provided to render");
        }

        this.renderElem(elem, options.delimiters, options.ignoredTags);
    };

    /*this.defaultOptions = {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "\\[", right: "\\]", display: true},
            {left: "\\(", right: "\\)", display: false},
            // LaTeX uses this, but it ruins the display of normal `$` in text:
            // {left: "$", right: "$", display: false},
        ],

        ignoredTags: [
            "script", "noscript", "style", "textarea", "pre", "code",
        ],
    };*/

    private splitWithDelimiters(text, delimiters) {
        let data = [{type: "text", data: text,display: null, rawData: null}];
        for (let i = 0; i < delimiters.length; i++) {
            let delimiter = delimiters[i];
            data = this.splitAtDelimiters(
                data, delimiter.left, delimiter.right,
                delimiter.display || false);
        }
        return data;
    };

    private renderMathInText(text, delimiters) {
        let data = this.splitWithDelimiters(text, delimiters);

        let fragment = document.createDocumentFragment();

        for (let i = 0; i < data.length; i++) {
            if (data[i].type === "text") {
                fragment.appendChild(document.createTextNode(data[i].data));
            } else {
                let span = document.createElement("span");
                let math = data[i].data;
                try {
                    katex.render(math, span, {
                        displayMode: data[i].display,
                    });
                } catch (e) {
                    if (!(e instanceof katex.ParseError)) {
                        throw e;
                    }
                    console.error(
                        "KaTeX auto-render: Failed to parse `" + data[i].data +
                        "` with ",
                        e
                    );
                    fragment.appendChild(document.createTextNode(data[i].rawData));
                    continue;
                }
                fragment.appendChild(span);
            }
        }

        return fragment;
    };

    private renderElem(elem, delimiters, ignoredTags) {
        for (let i = 0; i < elem.childNodes.length; i++) {
            let childNode = elem.childNodes[i];
            if (childNode.nodeType === 3) {
                // Text node
                let frag = this.renderMathInText(childNode.textContent, delimiters);
                i += frag.childNodes.length - 1;
                elem.replaceChild(frag, childNode);
            } else if (childNode.nodeType === 1) {
                // Element node
                let shouldRender = ignoredTags.indexOf(
                    childNode.nodeName.toLowerCase()) === -1;

                if (shouldRender) {
                    this.renderElem(childNode, delimiters, ignoredTags);
                }
            }
            // Otherwise, it's something else, and ignore it.
        }
    };

    // todo: types
    private findEndOfMath(delimiter, text, startIndex) {
        // Adapted from
        // https://github.com/Khan/perseus/blob/master/src/perseus-markdown.jsx
        let index = startIndex;
        let braceLevel = 0;

        let delimLength = delimiter.length;

        while (index < text.length) {
            let character = text[index];

            if (braceLevel <= 0 &&
                text.slice(index, index + delimLength) === delimiter) {
                return index;
            } else if (character === "\\") {
                index++;
            } else if (character === "{") {
                braceLevel++;
            } else if (character === "}") {
                braceLevel--;
            }

            index++;
        }

        return -1;
    };

    private splitAtDelimiters(startData, leftDelim, rightDelim, display) {
        let finalData = [];

        for (let i = 0; i < startData.length; i++) {
            if (startData[i].type === "text") {
                let text = startData[i].data;

                let lookingForLeft = true;
                let currIndex = 0;
                let nextIndex;

                nextIndex = text.indexOf(leftDelim);
                if (nextIndex !== -1) {
                    currIndex = nextIndex;
                    finalData.push({
                        type: "text",
                        data: text.slice(0, currIndex),
                    });
                    lookingForLeft = false;
                }

                while (true) {
                    if (lookingForLeft) {
                        nextIndex = text.indexOf(leftDelim, currIndex);
                        if (nextIndex === -1) {
                            break;
                        }

                        finalData.push({
                            type: "text",
                            data: text.slice(currIndex, nextIndex),
                        });

                        currIndex = nextIndex;
                    } else {
                        nextIndex = this.findEndOfMath(
                            rightDelim,
                            text,
                            currIndex + leftDelim.length);
                        if (nextIndex === -1) {
                            break;
                        }

                        finalData.push({
                            type: "math",
                            data: text.slice(
                                currIndex + leftDelim.length,
                                nextIndex),
                            rawData: text.slice(
                                currIndex,
                                nextIndex + rightDelim.length),
                            display: display,
                        });

                        currIndex = nextIndex + rightDelim.length;
                    }

                    lookingForLeft = !lookingForLeft;
                }

                finalData.push({
                    type: "text",
                    data: text.slice(currIndex),
                });
            } else {
                finalData.push(startData[i]);
            }
        }

        return finalData;
    };
}
