var person = {
    name: ""
};
// 不能修改属性的值
Object.defineProperty(person, "name", {
    writable: false,
    value: "okok"
});
console.log(person.name); // "小生方勤"

$('.navbar-toggle').on('click', function (e) {
    const newClassName = $('#navmenu').attr('class');
    if (newClassName === "navmenu navmenu-default navmenu-fixed-left offcanvas-sm shadow") {
        $(".navbar-toggle").attr('class', 'navbar-toggle').finish();
    } else {
        $(".navbar-toggle").attr('class', 'navbar-toggle collapsed').finish();
    }
});
