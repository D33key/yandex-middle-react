import{j as a,T as s}from"./index-DK97D4BR.js";const l="_modalOverlay_9sdjy_1",o="_modalContent_9sdjy_25",r="_name_9sdjy_39",c={modalOverlay:l,modalContent:o,name:r},m=[{title:"Калории,ккал",type:"calories"},{title:"Белки, г",type:"proteins"},{title:"Жиры, г",type:"fat"},{title:"Углеводы, г",type:"carbohydrates"}],d="_info_1auvh_1",_="_gap_1auvh_17",i={info:d,gap:_};function x(e){return a.jsx("div",{className:`${i.gap} flex flex-row`,children:m.map(({title:n,type:t})=>a.jsxs("div",{className:i.info,children:[a.jsx(s,{isInactive:!0,children:n}),a.jsx(s,{type:"digits",isInactive:!0,children:e[t]})]},n+t))})}function y({product:e}){return a.jsxs("div",{className:"flex flex-col items-center",children:[a.jsx("img",{src:e.image_large,alt:e.name}),a.jsx(s,{size:"medium",extraClass:c.name,children:e.name}),a.jsx(x,{calories:e.calories,carbohydrates:e.carbohydrates,fat:e.fat,proteins:e.proteins})]})}export{y as I};
