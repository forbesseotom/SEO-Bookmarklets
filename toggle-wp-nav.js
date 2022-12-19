let style = `<style>
.bookmarklet-display-none{
 display: none;
};
</style>`;
document.body.insertAdjacentHTML("afterbegin",style);
document.querySelector("#wpadminbar").classList.toggle("bookmarklet-display-none");
