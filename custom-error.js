const stackSeparator = `\n${" ".repeat(4)}at `;

export default class {
    constructor(name, message, trace) {
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
    }

    toString() {
        return `${this.name}: ${this.message}`;
    }
}
