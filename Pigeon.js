(function() {
    window.pigeonCage = [];

    window.pigeOn = (ComponentDotFunction, dataObject) => {
        const parts = ComponentDotFunction.split(".");
        const cls = parts[0]
        const fnc = parts[1];

        try {
            window.pigeonCage.filter(c => c.constructor.name === cls)[0][fnc](dataObject)
        }catch (e) {
            throw new Error("The Component " + cls + " is not in cage. Did you forget to release it?");
        }
    }

    const isInCage = (cls) => {
        return window.pigeonCage.filter(c => c.constructor.name === cls).length > 0;
    }

    window.release = function (cls){
        if(!isInCage(cls.constructor.name)){
            window.pigeonCage.push(cls);
        }else{
            console.warn("The Component " + cls.constructor.name + " is already in cage.")
        }
    }
})();
