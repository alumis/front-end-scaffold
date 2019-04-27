import "./theme/_reboot.scss";

import { createNode } from "@alumis/observables-dom";
import { Button } from "./components/Button/Button";
createNode;

var a = "hei";
var b = <div>hei</div>;

console.log("hmmm");
document.body.appendChild(<div><Button>Test</Button></div>);