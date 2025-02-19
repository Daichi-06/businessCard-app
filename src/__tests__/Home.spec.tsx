import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "@/components/pages/Home";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

// const mockSkillData = jest.fn();
// const mockInsertUserData = jest.fn();

// React Routerのモック
const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

// // ユーザーデータ取得APIのモック
// jest.mock("@/lib/api/getUserData", () => ({
//   getSkillData: () => mockSkillData(),
//   insertUserData: () => mockInsertUserData(),
// }));

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

Element.prototype.scrollTo = jest.fn();

describe("testHome", () => {
  beforeEach(() => {
    render(
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </ChakraProvider>
    );
  });

  it("タイトルが表示されている", async () => {
    const title = await screen.getByTestId("home-title");
    expect(title).toHaveTextContent("ホーム");
  });

  it("IDを入力してボタンを押すと/cards/:idに遷移する(useNavigateのパスをみる)", async () => {
    await userEvent.type(screen.getByTestId("input-id"), "sample-id");
    await userEvent.click(screen.getByRole("button", { name: "ログイン" }));

    expect(mockedNavigator).toHaveBeenCalledWith("/cards/sample-id");
  });

  it("IDを入力しないでボタンを押すとエラーメッセージが出る", async () => {
    await userEvent.click(screen.getByRole("button", { name: "ログイン" }));

    const errorMessage = await screen.getByTestId("error-message");
    expect(errorMessage).toHaveTextContent("IDを入力してください");
  });

  it("新規登録ボタンを押すと/cards/registerに遷移する(useNavigateのパスをみる)", async () => {
    await userEvent.click(screen.getByRole("button", { name: "新規登録" }));

    expect(mockedNavigator).toHaveBeenCalledWith("/cards/register");
  });
});
