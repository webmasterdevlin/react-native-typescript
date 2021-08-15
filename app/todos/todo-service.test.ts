import * as todo_service from "./todo-service"
// @ponicode
describe("todo_service.getTodos", () => {
    test("0", async () => {
        await todo_service.getTodos()
    })
})

// @ponicode
describe("todo_service.postTodo", () => {
    test("0", async () => {
        await todo_service.postTodo(undefined)
    })
})

// @ponicode
describe("todo_service.putTodo", () => {
    test("0", async () => {
        await todo_service.putTodo(undefined)
    })
})
