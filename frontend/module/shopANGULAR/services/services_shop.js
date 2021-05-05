getyourcar.factory('services_shop', function() {
    let service = {setArray: setArray};
    return service;

    function setArray(obj) {
        let arr = [];

        if (Array.isArray(obj)) {
            for (row in obj) {
                arr.push(obj[row].carPlate);
            }// end_for
        }// end_if
        return arr;
    }// end_setArray
    
});