const descVal = function(val) {
        return Object.create({}, {
            "value": val,
            "configurable": true
        }, desc);
    },
    stackSeparator = `\n${" ".repeat(4)}at `,
    CustomError = function CustomError(name, message, trace) {
        var stack;

        if(typeof(trace) === "undefined") {
            const tmp = new Error();

            if(tmp.stack) {
                stack = tmp.stack;
            }
        } else if(Array.isArray(trace)) {
            stack = trace.map((pos) => `${pos.file}:${pos.line}:${pos.column}`).join(stackSeparator);
        } else {
            stack = trace;
        }

        Object.defineProperties(this, {
            "name": descVal(name),
            "message": descVal(message),
            "stack": descVal(stack)
        });
    };

Object.defineProperties(CustomError.prototype, {
    "toString": descVal(function() {
        return `${this.name}: ${this.message}`;
    })
});

export default CustomError;
