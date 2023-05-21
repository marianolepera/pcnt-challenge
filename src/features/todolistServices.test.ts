import toDoListServices from "./todolistServices";

describe("Testing API services", () => {
  it("Testing getUserId service", async () => {
    const data = await toDoListServices.getUserId();

    expect(typeof data).toBe("string");
  });

  it("Testing addNewItem service", async () => {
    const body = {
      title: "nuevo item",
      message: "nuevo item",
    };

    const data = await toDoListServices.addNewItem("1516269a-d2bd-4999-b7ed-17ce397bf71c", body);


    const responseExpected = {
      completed: false,
      title: "nuevo item",
      message: "nuevo item",
      todoId: data.todoId
    };

    expect(typeof data).toEqual("object");
    expect(data).toEqual(responseExpected);
  });


  it("Testing resetList service", async () => {
    const { ok } = await toDoListServices.resetList(
      "1516269a-d2bd-4999-b7ed-17ce397bf71c",
    );

    expect(ok).toEqual("true");
  });

  it("Testing getAllItems service", async () => {
    const data = await toDoListServices.getAllItems("1516269a-d2bd-4999-b7ed-17ce397bf71c",);

    expect(typeof data).toBe("object");
  });

  it("Testing GetItemsCompletedOrNot service", async () => {
    const dataTrue = await toDoListServices.getItemsCompletedOrNot("1516269a-d2bd-4999-b7ed-17ce397bf71c",true)
    const dataFalse = await toDoListServices.getItemsCompletedOrNot("1516269a-d2bd-4999-b7ed-17ce397bf71c",false)
    expect(typeof dataTrue).toEqual("object");
    expect(typeof dataFalse).toEqual("object");
  });

  it("Testing deleteItem service", async () => {
    const { ok } = await toDoListServices.deleteItem(
      "1516269a-d2bd-4999-b7ed-17ce397bf71c","ab6ce42e-0fa5-4165-8356-073bcb682a60"
    );

    expect(ok).toEqual("true");
  });

 
});