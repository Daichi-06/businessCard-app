import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Register } from "@/components/pages/register/Register";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

const mockSkillData = jest.fn();
const mockInsertUserData = jest.fn();

// React Routerのモック
const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

// ユーザーデータ取得APIのモック
jest.mock("@/lib/api/getUserData", () => ({
  getSkillData: () => mockSkillData(),
  insertUserData: () => mockInsertUserData(),
}));

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

Element.prototype.scrollTo = jest.fn();

const mockSkills = [
  {
    id: "1",
    name: "test-skill",
  },
  {
    id: "2",
    name: "test-skill2",
  },
];

describe("CardsDetailのテスト", () => {
  beforeEach(() => {
    mockSkillData.mockResolvedValue(mockSkills);
    mockInsertUserData.mockResolvedValue(Promise.resolve());
    render(
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </ChakraProvider>
    );
  });

  it("タイトルが表示されている", async () => {
    const title = await screen.getByTestId("register-title");
    expect(title).toHaveTextContent("新規登録");
  });

  it("全項目入力して登録ボタンを押すと/に遷移する(useNavigateのパスが/であることをみる)", async () => {
    await userEvent.type(screen.getByTestId("input-user_id"), "test-userid");
    await userEvent.type(screen.getByTestId("input-user_name"), "test-user-name");
    await userEvent.type(screen.getByTestId("input-description"), "test-user-description");
    await userEvent.click(
      screen.getByRole("combobox", {
        name: "好きな技術",
      })
    );
    await userEvent.click(screen.getByText("test-skill"));
    await userEvent.type(screen.getByTestId("input-github-id"), "test-user-github-id");
    await userEvent.type(screen.getByTestId("input-qiita-id"), "test-user-qiita-id");
    await userEvent.type(screen.getByTestId("input-x-id"), "test-user-x-id");

    const registerButton = await screen.findByTestId("register-button");
    await userEvent.click(registerButton);

    // 登録成功の確認
    await waitFor(() => {
      expect(mockInsertUserData).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/");
    });
  });
  it("idがない場合エラーメッセージが出る)", async () => {
    await userEvent.type(screen.getByTestId("input-user_name"), "test-user-name");
    await userEvent.type(screen.getByTestId("input-description"), "test-user-description");
    await userEvent.click(
      screen.getByRole("combobox", {
        name: "好きな技術",
      })
    );
    await userEvent.click(screen.getByText("test-skill"));
    await userEvent.type(screen.getByTestId("input-github-id"), "test-user-github-id");
    await userEvent.type(screen.getByTestId("input-qiita-id"), "test-user-qiita-id");
    await userEvent.type(screen.getByTestId("input-x-id"), "test-user-x-id");

    const registerButton = await screen.getByTestId("register-button");
    await userEvent.click(registerButton);

    const errorMessage = await screen.findByText("内容の入力は必須です");
    expect(errorMessage).toBeInTheDocument();
  });
  it("名前がない場合エラーメッセージが出る)", async () => {
    await userEvent.type(screen.getByTestId("input-user_id"), "test-userid");
    await userEvent.type(screen.getByTestId("input-description"), "test-user-description");
    await userEvent.click(
      screen.getByRole("combobox", {
        name: "好きな技術",
      })
    );
    await userEvent.click(screen.getByText("test-skill"));
    await userEvent.type(screen.getByTestId("input-github-id"), "test-user-github-id");
    await userEvent.type(screen.getByTestId("input-qiita-id"), "test-user-qiita-id");
    await userEvent.type(screen.getByTestId("input-x-id"), "test-user-x-id");

    const registerButton = await screen.getByTestId("register-button");
    await userEvent.click(registerButton);

    const errorMessage = await screen.findByText("内容の入力は必須です");
    expect(errorMessage).toBeInTheDocument();
  });
  it("自己紹介がない場合エラーメッセージが出る)", async () => {
    await userEvent.type(screen.getByTestId("input-user_id"), "test-userid");
    await userEvent.type(screen.getByTestId("input-user_name"), "test-user-name");
    await userEvent.click(
      screen.getByRole("combobox", {
        name: "好きな技術",
      })
    );
    await userEvent.click(screen.getByText("test-skill"));
    await userEvent.type(screen.getByTestId("input-github-id"), "test-user-github-id");
    await userEvent.type(screen.getByTestId("input-qiita-id"), "test-user-qiita-id");
    await userEvent.type(screen.getByTestId("input-x-id"), "test-user-x-id");

    const registerButton = await screen.getByTestId("register-button");
    await userEvent.click(registerButton);

    const errorMessage = await screen.findByText("入力は必須です");
    expect(errorMessage).toBeInTheDocument();
  });
  it("好きな技術がない場合エラーメッセージが出る)", async () => {
    await userEvent.type(screen.getByTestId("input-user_id"), "test-userid");
    await userEvent.type(screen.getByTestId("input-user_name"), "test-user-name");
    await userEvent.type(screen.getByTestId("input-description"), "test-user-description");

    const registerButton = await screen.getByTestId("register-button");
    await userEvent.click(registerButton);

    const errorMessage = await screen.findByText("好きな技術の入力は必須です");
    expect(errorMessage).toBeInTheDocument();
  });
  it("オプションがなくてもエラーがでない)", async () => {
    await userEvent.type(screen.getByTestId("input-user_id"), "test-userid");
    await userEvent.type(screen.getByTestId("input-user_name"), "test-user-name");
    await userEvent.type(screen.getByTestId("input-description"), "test-user-description");
    await userEvent.click(
      screen.getByRole("combobox", {
        name: "好きな技術",
      })
    );
    await userEvent.click(screen.getByText("test-skill"));
    const registerButton = await screen.getByTestId("register-button");
    await userEvent.click(registerButton);

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/");
    });
  });
});
