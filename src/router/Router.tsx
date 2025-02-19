import { Route, Routes } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { CardsDetail } from "@/components/pages/cards/:id/CardsDetail";
import { Cards } from "@/components/pages/cards/Cards";
import { Register } from "@/components/pages/register/Register";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cards">
        <Route index element={<Cards />} />
        <Route path=":id" element={<CardsDetail />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};
