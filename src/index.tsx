import { SPA } from "@alumis/spa";
import { IndexPage } from "./pages/IndexPage";
import "./theme/_reboot.scss";

class MyApp extends SPA {
    constructor() {
        super(new IndexPage());
    }
}

new MyApp().invalidateLocationAsync();
