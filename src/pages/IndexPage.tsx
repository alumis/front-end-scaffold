import { PageDirection, IDirectoryPage, IPage } from "@alumis/spa";
import { createNode } from "@alumis/observables-dom"; createNode;
import { r, availableLanguages, currentLanguage } from "@alumis/observables-i18n";
import { Button } from "../components/Button/Button";
import { o } from "@alumis/observables";
import { ComponentsPage } from "./ComponentsPage";
import { setSingleChildNode } from "@alumis/utils/src/setSingleChildNode";
import { ButtonTheme } from "@alumis/button";


export class IndexPage implements IDirectoryPage {

    constructor() {
    }

    childElement: HTMLElement;
    componentsPage: ComponentsPage;
    element: HTMLElement;

    currentPage = o<IPage>(null);

    async loadAsync(args: { [name: string]: string; }, pageDirection: PageDirection, ev?: PopStateEvent) {

        throw new Error("Method not implemented.");
    }

    async loadPathAsync(path: string[], args: { [name: string]: string; }, pageDirection: PageDirection, ev?: PopStateEvent) {

        if (!this.element) {

            document.body.appendChild(this.element =
                <div style="padding:1rem">
                    <h1>{() => r("Welcome").value + "!"}</h1>{ //// "Welcome", { "nob": "Velkommen", "eng": "Welcome" }
                    }<p>{() => r("AvailableLanguages").value + ":"}</p>{ //// "AvailableLanguages", { "nob": "Tilgjengelige språk", "eng": "Available languages" }
                    }<ol>{availableLanguages.map(l =>
                        <li>
                            <Button theme={ButtonTheme.Success} pressed={() => currentLanguage.value === l} onclick={() => currentLanguage.value = l}>{l.nativeName}</Button>
                        </li>
                    )}</ol>
                    <p>Available pages:</p>
                    <ul>
                        <li>
                            <a href={"components"}>Komponenter</a>
                        </li>
                    </ul>
                    <hr />
                    {this.childElement = <div></div>}
                </div>
            );
        }

        let newPage: IPage;

        if (path.length) {

            switch (path[0]) {

                case "components":
                case "komponenter":

                    newPage = this.componentsPage || new (await import("./ComponentsPage")).ComponentsPage();
                    break;

                default:

                    break;
            }
        }

        else newPage = null;

        let currentPage = this.currentPage.value;
        let unloadPromise: Promise<void>;

        if (currentPage && currentPage !== newPage)
            unloadPromise = currentPage.unloadAsync();

        if (newPage) {

            try {

                if ((newPage as IDirectoryPage).loadPathAsync)
                    await (newPage as IDirectoryPage).loadPathAsync(path, args, pageDirection, ev);

                else await newPage.loadAsync(args, pageDirection, ev);

                if (unloadPromise)
                    await unloadPromise;
            }

            catch (e) {

                // TODO: 500
                throw e;
            }
        }

        this.currentPage.value = newPage;

        if (newPage)
            setSingleChildNode(this.childElement, newPage.element);

        else {

            while (this.childElement.lastChild)
                this.childElement.lastChild.remove();
        }
    }

    unloadAsync() {

    }

    getTitle() {

        return r("Welcome").value + "!";
    }

    dispose() {

    }
}