import{r,n as l,a as c,j as t,H as s,P as f,I as u,T as x,O as p}from"./index-DK97D4BR.js";function d(){const[e,a]=r.useState(!1),i=l(),n=c();return t.jsx(s,{to:f.login,variant:"medium",forceActive:e,paddingHorizontal:!1,onClick:async o=>{o.preventDefault(),a(!0),await n(u()),a(!1),i("/login")},children:e?"Запрос на выход...":"Выход"})}const h=[{text:"Профиль",href:"/profile"},{text:"История заказов",href:"/profile/orders"}];function g(){return t.jsxs("nav",{className:"flex flex-col m-right-60",children:[t.jsxs("div",{className:"flex flex-col ",children:[h.map(({text:e,href:a})=>t.jsx(s,{to:a,variant:"medium",paddingHorizontal:!1,children:e},e)),t.jsx(d,{})]}),t.jsx(x,{isInactive:!0,extraClass:"w-320px margin-top-80px",children:"В этом разделе вы можете изменить свои персональные данные"})]})}function j(){return t.jsxs("div",{className:"p-horizontal m-top-120 m-right-auto flex",children:[t.jsx(g,{}),t.jsx(p,{})]})}export{j as default};
