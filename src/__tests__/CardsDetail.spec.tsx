import { fireEvent, render, screen } from "@testing-library/react";
import { CardsDetail } from "@/components/pages/cards/:id/CardsDetail";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

const mockFetchAllCards = jest.fn();

// React Routerのモック
const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
  useNavigate: () => mockedNavigator,
}));

// ユーザーデータ取得APIのモック
jest.mock("@/lib/api/getUserData", () => ({
  getUserSkillData: () => mockFetchAllCards(),
}));

const mockUserWithSkills = {
  user_id: "1",
  name: "test-name",
  description: "test-description",
  skills: [{ id: "1", name: "test-skill" }],
  github_id: "test-github-id",
  qiita_id: "test-qiita-id",
  x_id: "test-x-id",
};

describe("CardsDetailのテスト", () => {
  beforeEach(() => {
    mockFetchAllCards.mockResolvedValue(mockUserWithSkills);
    console.log("mockUserWithSkills", mockUserWithSkills);
    render(
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <CardsDetail />
        </BrowserRouter>
      </ChakraProvider>
    );
  });

  it("名前が表示されている", async () => {
    screen.debug();
    const userName = await screen.findByTestId("user-name");

    expect(userName).toBeInTheDocument();
    expect(userName).toHaveTextContent("test-name");
  });

  it("自己紹介文が表示されている", async () => {
    const userDescription = await screen.findByTestId("user-description");

    expect(userDescription).toBeInTheDocument();
    expect(userDescription).toHaveTextContent("test-description");
  });

  it("技術スタックが表示されている", async () => {
    const userSkills = await screen.findByTestId("user-skills");

    expect(userSkills).toBeInTheDocument();
    expect(userSkills).toHaveTextContent("test-skill");
  });

  it("Githubアイコンが表示されている", async () => {
    const userGitHubLink = await screen.findByTestId("user-github-link");

    expect(userGitHubLink).toBeInTheDocument();
  });

  it("Qiitaアイコンが表示されている", async () => {
    const userQiitaLink = await screen.findByTestId("user-qiita-link");

    expect(userQiitaLink).toBeInTheDocument();
  });

  it("Xアイコンが表示されている", async () => {
    const userXLink = await screen.findByTestId("user-x-link");

    expect(userXLink).toBeInTheDocument();
  });

  it("戻るボタンが表示されている", async () => {
    const backButton = await screen.findByText("戻る");

    expect(backButton).toBeInTheDocument();
  });

  it("戻るボタンがクリックされたら、トップページに遷移する", async () => {
    const backButton = await screen.findByText("戻る");

    fireEvent.click(backButton);

    expect(mockedNavigator).toHaveBeenCalledWith("/");
  });
});
