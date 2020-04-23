function isEmptyObject(obj) {
    var name;
    for (name in obj) {
        if (obj.hasOwnProperty(name)) {
            return false;
        }
    }
    return true;
}
// from https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
// more info: https://en.wikipedia.org/wiki/Schwartzian_transform
function sortByAttribute(array, ...attrs) {
    // generate an array of predicate-objects contains
    // property getter, and descending indicator
    let predicates = attrs.map(pred => {
        let descending = pred.charAt(0) === '-' ? -1 : 1;
        pred = pred.replace(/^-/, '');
        return {
            getter: o => o[pred],
            descend: descending
        };
    });
    // schwartzian transform idiom implementation. aka: "decorate-sort-undecorate"
    return array.map(item => {
        return {
            src: item,
            compareValues: predicates.map(predicate => predicate.getter(item))
        };
    })
        .sort((o1, o2) => {
        let i = -1, result = 0;
        while (++i < predicates.length) {
            if (o1.compareValues[i] < o2.compareValues[i])
                result = -1;
            if (o1.compareValues[i] > o2.compareValues[i])
                result = 1;
            if (result *= predicates[i].descend)
                break;
        }
        return result;
    })
        .map(item => item.src);
}
function openSafariWindow() {
    var myWindow = window.open("index.html", "", "dialog=yes,width=500,height=400,left=500,top=500,titlebar=no,status=no,scrollbars=no,resizable=no,menubar=no,location=no");
}
//# sourceMappingURL=util.js.map