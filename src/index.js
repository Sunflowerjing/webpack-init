import { createLogo } from "./logo";
import { createHeader } from "./header";
import { createContent } from "./content";
import { createFooter } from "./footer";
import "./styles/header.css";

createLogo();
createHeader();
createContent();
createFooter();

var div = document.createElement("div");
div.innerText = "hello world";

document.body.appendChild(div);