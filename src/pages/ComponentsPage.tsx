import { IPage, PageDirection } from "@alumis/spa";
import { createNode, disposeNode } from "@alumis/observables-dom"; createNode;
import { r } from "@alumis/observables-i18n";
import { Button } from "../components/Button/Button";
import { TextInput } from "../components/TextInput/TextInput";


export class ComponentsPage implements IPage {

    element: HTMLElement;

    async loadAsync(args: { [name: string]: string; }, pageDirection: PageDirection, ev?: PopStateEvent) {

        if (!this.element) {

            this.element =
                <div>
                    <h2>{r("Components")}</h2>{ //// "Components", { "nob": "Komponenter", "eng": "Components" }
                    }<Button>{"This is a button"}</Button>
                    <TextInput label={"Text label"} help={"Some help text"}></TextInput>
                </div>;
        }
    }

    unloadAsync() {

        if (this.element) {

            disposeNode(this.element);
            delete this.element;
        }
    }

    getTitle() {

        return r("Welcome").value + "!";
    }

    dispose() {

        if (this.element) {

            disposeNode(this.element);
            delete this.element;
        }
    }
}