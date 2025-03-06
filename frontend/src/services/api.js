var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var baseUrl = "http://127.0.0.1:8000";
function getTodos() {
    return __awaiter(this, void 0, void 0, function () {
        var todosRequestEndpoint, urlToFetch, response, todos, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    todosRequestEndpoint = "/todos";
                    urlToFetch = baseUrl + todosRequestEndpoint;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch(urlToFetch)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    todos = _a.sent();
                    return [2 /*return*/, todos];
                case 4: throw new Error("HTTP error status: ".concat(response.status));
                case 5:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function addTodo(text) {
    return __awaiter(this, void 0, void 0, function () {
        var addTodoEndpoint, urlToFetch, objToFetch, response, todo, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    addTodoEndpoint = "/todos";
                    urlToFetch = baseUrl + addTodoEndpoint;
                    objToFetch = {
                        method: "POST",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({ text: text })
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch(urlToFetch, objToFetch)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    todo = _a.sent();
                    return [2 /*return*/, todo];
                case 4: throw new Error("HTTP error status: ".concat(response.status));
                case 5:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function updateTodo(todo) {
    return __awaiter(this, void 0, void 0, function () {
        var updateTodoEndpoint, urlToFetch, objToFetch, response, todo_1, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateTodoEndpoint = "/todos/".concat(todo.id);
                    urlToFetch = baseUrl + updateTodoEndpoint;
                    objToFetch = {
                        method: "PUT",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({ "text": todo.text, "completed": todo.completed })
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch(urlToFetch, objToFetch)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    todo_1 = _a.sent();
                    return [2 /*return*/, todo_1];
                case 4: throw new Error("HTTP error status: ".concat(response.status));
                case 5:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function removeTodo(todoId) {
    return __awaiter(this, void 0, void 0, function () {
        var updateTodoEndpoint, urlToFetch, objToFetch, response, todo, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateTodoEndpoint = "/todos/".concat(todoId);
                    urlToFetch = baseUrl + updateTodoEndpoint;
                    objToFetch = {
                        method: "DELETE",
                        headers: { "Content-type": "application/json" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch(urlToFetch, objToFetch)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    todo = _a.sent();
                    return [2 /*return*/, todo];
                case 4: throw new Error("HTTP error status: ".concat(response.status));
                case 5:
                    error_4 = _a.sent();
                    console.log(error_4);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
removeTodo(7).then(function (data) { return console.log(data); });
