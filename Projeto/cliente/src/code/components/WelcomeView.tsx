import React, { useState } from "react";

const WelcomeView = ({ state }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    setErrorMessage(null);
    try {
      await state.doLogin();
    } catch (error) {
      setErrorMessage("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="container">
      <div className="register-section">
        <h1>Novo Aqui?</h1>
        <p>Registe-se gratuitamente.</p>
        <button
          className="register-button"
          onClick={() => state.setState({ currentView: "register" })}
        >
          CLIQUE AQUI E REGISTE-SE
        </button>
      </div>

      <div className="login-section">
        <h2>Login</h2>
        <form>
          <input
            type="email"
            id="userEmail"
            value={state.userEmail}
            onChange={state.fieldChangeHandler}
            placeholder="Email"
          />
          <input
            type="password"
            id="userPass"
            value={state.userPass}
            onChange={state.fieldChangeHandler}
            placeholder="Senha"
          />
          <button type="button" onClick={handleLogin}>
            ENTRAR
          </button>
        </form>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default WelcomeView;
