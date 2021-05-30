import { createHeader } from "./header";
import { createContent } from "./content";
import { createFooter } from "./footer";

createHeader();
createContent();
createFooter();

var div = document.createElement("div");
div.innerText = "hello world";

document.body.appendChild(div);