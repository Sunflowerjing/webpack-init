import Logo from "./assets/f.png";

export function createLogo() {
   const myLogo = new Image();
   myLogo.src = Logo;
   document.body.appendChild(myLogo);
}